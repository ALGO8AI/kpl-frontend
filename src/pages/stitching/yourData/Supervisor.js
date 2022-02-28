/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import PropTypes from "prop-types";
import {
  FormControl,
  FormControlLabel,
  InputLabel,
  Select,
  Snackbar,
  Switch,
} from "@material-ui/core";
import "./Worker.scss";
import MaterialTable from "material-table";
import TextField from "@material-ui/core/TextField";
import MenuItem from "@material-ui/core/MenuItem";
import Button from "@material-ui/core/Button";
import {
  getStitchingSupervisorSchedule,
  getStitchingSupervisorCopy,
  addStitchingSupervisorSingle,
  updateStitchingSupervisorSingle,
  getAllSupervisorList,
  deleteStitchingSupervisorSchedule,
} from "../../../services/api.service";
import { Alert } from "@material-ui/lab";
import FilterListIcon from "@material-ui/icons/FilterList";
import RefreshIcon from "@material-ui/icons/Refresh";
import moment from "moment";
import { useDispatch, useSelector } from "react-redux";
import {
  openSnackbar,
  openSnackbar_FROM,
  openSnackbar_TO,
} from "../../../redux/CommonReducer/CommonAction";
import { theme } from "../../../Utility/constants";

// import { Switch } from "react-router";

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function Supervisor(props) {
  const [workerData, setWorkerData] = useState();
  const [edit, setEdit] = useState(false);
  const [inputData, setInputData] = React.useState({
    filterDateFrom: "",
    filterDateTo: "",
  });
  const [supervisorList, setSupervisorList] = useState([]);

  // redux dispatch & selector
  const Dispatch = useDispatch();
  const { role } = useSelector((state) => state.Common);

  const loadData = async () => {
    const bodyData = {
      username: localStorage.getItem("kpl_username"),
    };
    try {
      const x = await getStitchingSupervisorSchedule(bodyData);
      // console.log(x.data);
      setWorkerData(x.data);
      const supData = await getAllSupervisorList();
      setSupervisorList(supData);
    } catch (err) {}
  };
  const filterData = async () => {
    try {
      const x = await getStitchingSupervisorSchedule(inputData);
      setWorkerData(x.data);
    } catch (err) {}
  };
  const getFirstDay_LastDay = async () => {
    var myDate = new Date();
    var newDateWeekBack = new Date(myDate.getTime() - 60 * 60 * 24 * 7 * 1000);
    setInputData({
      filterDateFrom: newDateWeekBack.toISOString().slice(0, 10),
      filterDateTo: myDate.toISOString().slice(0, 10),
    });
  };
  useEffect(() => {
    loadData();
    getFirstDay_LastDay();
  }, []);
  const columns = [
    {
      title: "Date",
      render: (rowData) => (
        <p>
          {moment(new Date(rowData.date))
            .format("DD/MM/YYYY")
            .toString()}
        </p>
      ),
    },
    { title: "Supervisor Id", field: "supervisorId" },
    { title: "Supervisor Name", field: "supervisorName" },
    {
      title: "Kit Supervisor",
      field: "kitSupervisor",
      render: (x) =>
        x.kitSupervisor === "true" ? (
          <p style={{ color: "rgb(74, 170, 22)" }}>
            <i class="fa fa-check" aria-hidden="true"></i>
          </p>
        ) : (
          <p style={{ color: "rgb(249, 54, 54)" }}>
            <i class="fa fa-times" aria-hidden="true"></i>
          </p>
        ),
    },

    {
      title: "Line Supervisor",
      field: "lineSupervisor",
      render: (x) =>
        x.lineSupervisor === "true" ? (
          <p style={{ color: "rgb(74, 170, 22)" }}>
            <i class="fa fa-check" aria-hidden="true"></i>
          </p>
        ) : (
          <p style={{ color: "rgb(249, 54, 54)" }}>
            <i class="fa fa-times" aria-hidden="true"></i>
          </p>
        ),
    },

    { title: "Line", field: "line" },
    { title: "Wing", field: "wing" },
    { title: "Shift", field: "shift" },
    {
      title: "Edit",
      render: (x) => (
        <button
          style={{
            color: "#0e4a7b",
            textDecoration: "underline",
            backgroundColor: "white",
            padding: "8px 16px",
            border: "none",
            outline: "none",
            cursor: "pointer",
            fontSize: "1rem",
          }}
          onClick={() => {
            if (role === "Admin" || role === "Head User") {
              setEdit(true);
              setUserData({
                ...userdata,
                id: x.id,
                supervisorName: x.supervisorName,
                supervisorId: x.supervisorId,
                // date: new Date(x.date).toISOString().slice(0, 10),
                date: `${
                  new Date(x.date).toLocaleDateString("en-GB").split("/")[2]
                }-${
                  +new Date(x.date).toLocaleDateString("en-GB").split("/")[1]
                    ?.length === 1
                    ? +0 +
                      new Date(x.date).toLocaleDateString("en-GB").split("/")[1]
                    : new Date(x.date).toLocaleDateString("en-GB").split("/")[1]
                }-${
                  +new Date(x.date).toLocaleDateString("en-GB").split("/")[0]
                    ?.length === 1
                    ? +0 +
                      new Date(x.date).toLocaleDateString("en-GB").split("/")[0]
                    : new Date(x.date).toLocaleDateString("en-GB").split("/")[0]
                }`,
                shift: x.shift,
                wing: x.wing,
                line: x.line,
                kitSupervisor: x.kitSupervisor === "true" ? true : false,
                lineSupervisor: x.lineSupervisor === "true" ? true : false,
              });
            } else {
              Dispatch(
                openSnackbar(
                  true,
                  "error",
                  `This option is not available to ${role}`
                )
              );
            }
          }}
        >
          EDIT
        </button>
      ),
    },
    {
      title: "Delete",
      render: (x) => (
        <button
          style={{
            color: "#0e4a7b",
            textDecoration: "underline",
            backgroundColor: "white",
            padding: "8px 16px",
            border: "none",
            outline: "none",
            cursor: "pointer",
            fontSize: "1rem",
          }}
          onClick={() => {
            if (role === "Admin" || role === "Head User") {
              deleteSUpervisor(x.id);
            } else {
              Dispatch(
                openSnackbar(
                  true,
                  "error",
                  `This option is not available to ${role}`
                )
              );
            }
          }}
        >
          DELETE
        </button>
      ),
    },
  ];
  const [userdata, setUserData] = useState({
    id: "",
    supervisorName: "",
    supervisorId: "",
    date: "",
    shift: "",
    wing: "",
    line: "",
    kitSupervisor: false,
    lineSupervisor: false,
  });

  const onInputChange = (e) => {
    console.log(e);
    setUserData({ ...userdata, [e.target.name]: e.target.value });
  };

  const onUserChange = (e) => {
    const i = supervisorList.findIndex(
      (item) =>
        item.username === e.target.value || item.workerID === e.target.value
    );
    if (i !== -1) {
      setUserData({
        ...userdata,
        supervisorName: supervisorList[i].username,
        supervisorId: supervisorList[i].workerID,
      });
    } else {
      setUserData({
        ...userdata,
        supervisorName: "",
        supervisorId: "",
      });
    }
  };

  //   const submitImageDetails = async () => {
  //     try {
  //       const resp = await AddWorkerStitching(userdata);
  //       console.log(resp);
  //       setMsg(resp.msg);
  //       setOpen(true);
  //     } catch (e) {
  //       console.log(e.message);
  //     }
  //   };

  const copy = async () => {
    if (role === "Admin" || role === "Head User" || role === "Non Admin") {
      try {
        const resp = await getStitchingSupervisorCopy();
        Dispatch(openSnackbar(true, "success", resp?.msg));
        loadData();
      } catch (e) {
        console.log(e);
      }
    } else {
      Dispatch(
        openSnackbar(true, "error", `This option is not available to ${role}`)
      );
    }
  };

  const addSupervisor = async (data) => {
    if (role === "Admin" || role === "Head User" || role === "Non Admin") {
      try {
        const resp = await addStitchingSupervisorSingle(data);
        // console.log(resp);
        Dispatch(openSnackbar(true, "success", "Supervisor Added"));
        loadData();
        setUserData({
          id: "",
          supervisorName: "",
          supervisorId: "",
          date: "",
          shift: "",
          wing: "",
          line: "",
          kitSupervisor: false,
          lineSupervisor: false,
        });
      } catch (err) {}
    } else {
      Dispatch(
        openSnackbar(true, "error", `This option is not available to ${role}`)
      );
    }
  };

  const updateSupervisor = async () => {
    try {
      const resp = await updateStitchingSupervisorSingle(userdata);
      setEdit(false);
      Dispatch(openSnackbar(true, "success", "Schedule Updated"));
      loadData();
      setUserData({
        id: "",
        supervisorName: "",
        supervisorId: "",
        date: "",
        shift: "",
        wing: "",
        line: "",
        kitSupervisor: false,
        lineSupervisor: false,
      });
    } catch (err) {}
  };

  const deleteSUpervisor = async (id) => {
    try {
      const confirm = window.confirm(
        "Are you sure you want to delete the schedule?"
      );
      if (confirm) {
        const resp = await deleteStitchingSupervisorSchedule({
          id,
        });
        console.log(resp);
        if (resp?.data) {
          Dispatch(openSnackbar(true, "success", "Schedule Deleted"));
          setUserData({
            id: "",
            supervisorName: "",
            supervisorId: "",
            date: "",
            shift: "",
            wing: "",
            line: "",
            kitSupervisor: false,
            lineSupervisor: false,
          });
          setEdit(false);
          loadData();
        }
      } else {
        Dispatch(openSnackbar(true, "error", "Operation Cancelled"));
      }
    } catch (e) {}
  };

  return (
    <Grid container spacing={4}>
      <Grid item xs={12} md={4}>
        {/* <TextField
          id="outlined-basic"
          label="Supervisor Name"
          variant="outlined"
          style={{ marginBottom: "12px" }}
          value={userdata.supervisorName}
          name="supervisorName"
          fullWidth
          onChange={onInputChange}
        /> */}
        {edit ? (
          <TextField
            id="outlined-basic"
            label="Supervisor Name"
            variant="outlined"
            style={{ marginBottom: "12px" }}
            value={userdata.supervisorId}
            name="supervisorId"
            fullWidth
            onChange={onInputChange}
          />
        ) : (
          <FormControl
            variant="outlined"
            fullWidth
            style={{ marginBottom: "12px" }}
          >
            <InputLabel keyid="demo-simple-select-outlined-label">
              Supervisor Id
            </InputLabel>
            <Select
              labelId="demo-simple-select-outlined-label"
              id="demo-simple-select-outlined"
              value={userdata.supervisorId}
              name="supervisorId"
              fullWidth
              onChange={onUserChange}
              label="Supervisor Id"
              // multiple
            >
              <MenuItem value="">
                <em>None</em>
              </MenuItem>
              {supervisorList.length > 0 &&
                supervisorList
                  ?.sort((a, b) => (a?.username > b?.username ? 1 : -1))
                  .map((item, index) => (
                    <MenuItem value={item.workerID} key={index}>
                      {item.workerID} - {item.username}
                    </MenuItem>
                  ))}
            </Select>
          </FormControl>
        )}
        {edit ? (
          <TextField
            id="outlined-basic"
            label="Supervisor Name"
            variant="outlined"
            style={{ marginBottom: "12px" }}
            value={userdata.supervisorName}
            name="supervisorName"
            fullWidth
            onChange={onInputChange}
          />
        ) : (
          <FormControl
            variant="outlined"
            fullWidth
            style={{ marginBottom: "12px" }}
            disabled
          >
            <InputLabel keyid="demo-simple-select-outlined-label">
              Supervisor Name
            </InputLabel>
            <Select
              labelId="demo-simple-select-outlined-label"
              id="demo-simple-select-outlined"
              value={userdata.supervisorName}
              name="supervisorName"
              fullWidth
              onChange={onUserChange}
              label="Supervisor Name"
              // multiple
            >
              <MenuItem value="">
                <em>None</em>
              </MenuItem>
              {supervisorList.length > 0 &&
                supervisorList.map((item, index) => (
                  <MenuItem value={item.username} key={index}>
                    {item.username}
                  </MenuItem>
                ))}
            </Select>
          </FormControl>
        )}
        {/* <TextField
          id="outlined-basic"
          label="Supervisor ID"
          variant="outlined"
          style={{ marginBottom: "12px" }}
          value={userdata.supervisorId}
          name="supervisorId"
          fullWidth
          onChange={onInputChange}
        /> */}

        {/* <TextField
          id="outlined-basic"
          label="Kit Supervisor"
          variant="outlined"
          style={{ marginBottom: "12px" }}
          value={userdata.kitSupervisor}
          name="kitSupervisor"
          fullWidth
          onChange={onInputChange}
        /> */}
        <FormControlLabel
          style={{ marginBottom: "12px" }}
          fullWidth
          control={
            <Switch
              value={userdata.kitSupervisor}
              checked={userdata.kitSupervisor}
              onChange={(e) =>
                setUserData({ ...userdata, kitSupervisor: e.target.checked })
              }
              name="checkedB"
              color="primary"
              fullWidth
            />
          }
          label="Kit Supervisor"
        />

        <FormControlLabel
          style={{ marginBottom: "12px" }}
          fullWidth
          control={
            <Switch
              value={userdata.lineSupervisor}
              checked={userdata.lineSupervisor}
              onChange={(e) =>
                setUserData({ ...userdata, lineSupervisor: e.target.checked })
              }
              name="checkedB"
              color="primary"
              fullWidth
            />
          }
          label="Line Supervisor"
        />

        {/* <TextField
          id="outlined-basic"
          label="Line Supervisor"
          variant="outlined"
          style={{ marginBottom: "12px" }}
          value={userdata.lineSupervisor}
          name="lineSupervisor"
          fullWidth
          onChange={onInputChange}
        /> */}

        <TextField
          key="from"
          label="Date"
          value={userdata.date}
          name="date"
          type="date"
          style={{ marginBottom: "12px" }}
          InputLabelProps={{
            shrink: true,
          }}
          variant="outlined"
          onChange={onInputChange}
          fullWidth
        />

        <FormControl
          variant="outlined"
          fullWidth
          style={{ marginBottom: "12px" }}
        >
          <InputLabel id="demo-simple-select-outlined-label">Wing</InputLabel>
          <Select
            labelId="demo-simple-select-outlined-label"
            id="demo-simple-select-outlined"
            value={userdata.wing}
            name="wing"
            onChange={onInputChange}
            label="Wing"
            // multiple
          >
            <MenuItem value="">
              <em>None</em>
            </MenuItem>
            {["FG-2"].map((item, index) => (
              <MenuItem value={item} key={index}>
                {item}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <FormControl
          variant="outlined"
          fullWidth
          style={{ marginBottom: "12px" }}
        >
          <InputLabel id="demo-simple-select-outlined-label">Shift</InputLabel>
          <Select
            labelId="demo-simple-select-outlined-label"
            id="demo-simple-select-outlined"
            value={userdata.shift}
            name="shift"
            onChange={onInputChange}
            label="Shift"
            // multiple
          >
            <MenuItem value="">
              <em>None</em>
            </MenuItem>
            {["A", "B"].map((item, index) => (
              <MenuItem value={item} key={index}>
                {item}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <FormControl
          variant="outlined"
          fullWidth
          style={{ marginBottom: "12px" }}
        >
          <InputLabel id="demo-simple-select-outlined-label">Line</InputLabel>
          <Select
            labelId="demo-simple-select-outlined-label"
            id="demo-simple-select-outlined"
            value={userdata.line}
            name="line"
            onChange={onInputChange}
            label="Line"
            // multiple
          >
            <MenuItem value="">
              <em>None</em>
            </MenuItem>
            {["Baffle", "Circular", "Two Row", "U+2"].map((item, index) => (
              <MenuItem value={item} key={index}>
                {item}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        {/* <label for="myfile" className="inputLabel">
          Select a file:
        </label>
        <input
          style={{ display: "none" }}
          type="file"
          id="myfile"
          name="myfile"
          accept=".jpg,.png,.jpeg"
          onChange={(e) => {
            uploadImage(e);
          }}
        /> */}
        {userdata.workerImage && (
          <img
            style={{ width: "100%", padding: "12px" }}
            src={userdata.workerImage}
            alt="User"
          />
        )}
        {edit ? (
          <Grid container xs={12}>
            <Grid container item xs={6} style={{ padding: "6px" }}>
              <Button
                variant="contained"
                style={{
                  backgroundColor: "#fff",
                  color: "#0e4a7b",
                  whiteSpace: "nowrap",
                  width: "100%",
                  height: "fit-content",
                  border: "1px solid #0e4a7b",
                }}
                onClick={() => {
                  setEdit(false);
                  setUserData({
                    ...userdata,
                    supervisorName: "",
                    supervisorId: "",
                    date: "",
                    shift: "",
                    wing: "",
                    line: "",
                    lineSupervisor: false,
                    kitSupervisor: false,
                  });
                }}
              >
                CANCEL
              </Button>
            </Grid>
            <Grid container item xs={6} style={{ padding: "6px" }}>
              <Button
                variant="contained"
                style={{
                  backgroundColor: "#0e4a7b",
                  color: "#FFF",
                  whiteSpace: "nowrap",
                  width: "100%",
                  height: "fit-content",
                  border: "1px solid #0e4a7b",
                }}
                onClick={updateSupervisor}
              >
                UPDATE
              </Button>
            </Grid>
          </Grid>
        ) : (
          <Grid container item xs={12} style={{ padding: "6px" }}>
            <Button
              variant="contained"
              style={{
                backgroundColor: "#0e4a7b",
                color: "#FFF",
                whiteSpace: "nowrap",
                width: "100%",
                height: "fit-content",
                border: "1px solid #0e4a7b",
              }}
              onClick={() => addSupervisor(userdata)}
            >
              SAVE
            </Button>
          </Grid>
        )}
      </Grid>
      <Grid item xs={12} md={8}>
        <Grid
          container
          item
          xs={12}
          style={{
            padding: "4px",
            marginBottom: "12px",
          }}
        >
          <Grid container item xs={6} md={3}>
            <TextField
              key="from"
              id="fromDate"
              label="From"
              value={inputData.filterDateFrom}
              type="date"
              style={{ marginRight: "6px" }}
              InputLabelProps={{
                shrink: true,
              }}
              variant="outlined"
              onChange={(e) => {
                e.target.value > inputData.filterDateTo
                  ? Dispatch(openSnackbar_FROM())
                  : setInputData({
                      ...inputData,
                      filterDateFrom: e.target.value,
                    });
              }}
              fullWidth
            />
          </Grid>
          <Grid container item xs={6} md={3}>
            <TextField
              key="to"
              id="fromDate"
              label="To"
              value={inputData.filterDateTo}
              type="date"
              style={{ marginRight: "6px" }}
              InputLabelProps={{
                shrink: true,
              }}
              variant="outlined"
              onChange={(e) => {
                e.target.value < inputData.filterDateFrom
                  ? Dispatch(openSnackbar_TO())
                  : setInputData({
                      ...inputData,
                      filterDateTo: e.target.value,
                    });
              }}
              fullWidth
            />
          </Grid>
          <Grid container item xs={6} md={2}></Grid>
          <Grid container item xs={6} md={2} style={{ paddingRight: "12px" }}>
            <Button
              variant="contained"
              style={{
                backgroundColor: theme.BLUE,
                color: "#FFF",
                whiteSpace: "nowrap",
                height: "100%",
              }}
              fullWidth
              onClick={filterData}
            >
              <FilterListIcon />
              Filter
            </Button>
          </Grid>
          <Grid container item xs={6} md={2} style={{ paddingRight: "12px" }}>
            <Button
              variant="contained"
              style={{
                backgroundColor: theme.BLUE,
                color: "#FFF",
                whiteSpace: "nowrap",
                height: "100%",
              }}
              fullWidth
              onClick={loadData}
            >
              <RefreshIcon />
              Refresh
            </Button>
          </Grid>
        </Grid>
        <Button
          variant="contained"
          style={{
            backgroundColor: "#0e4a7b",
            color: "#FFF",
            whiteSpace: "nowrap",
            width: "100%",
            height: "fit-content",
            border: "1px solid #0e4a7b",
          }}
          onClick={copy}
        >
          COPY TABLE
        </Button>
        <MaterialTable
          title="Workers Information"
          columns={columns}
          data={workerData}
          options={{
            exportButton: true,
            headerStyle: {
              backgroundColor: "#0e4a7b",
              color: "#FFF",
            },
            pageSizeOptions: [20, 50, 100, 200],
            pageSize: 20,
          }}
        />
      </Grid>
    </Grid>
  );
}

export default Supervisor;
