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
import { Alert } from "@material-ui/lab";
import moment from "moment";
import FilterListIcon from "@material-ui/icons/FilterList";
import RefreshIcon from "@material-ui/icons/Refresh";
import { weekRange } from "../../../Utility/DateRange";
import { useDispatch, useSelector } from "react-redux";
import {
  openSnackbar,
  openSnackbar_FROM,
  openSnackbar_TO,
} from "../../../redux/CommonReducer/CommonAction";
import { shifts } from "../../../Utility/constants";
import {
  addCheckingSupervisorSingleV3,
  deleteCheckingSupervisorScheduleV3,
  getAllSupervisorListV3,
  getCheckingSupervisorCopyV3,
  getCheckingSupervisorScheduleV3,
  updateCheckingSupervisorSingleV3,
  wingWiseLine,
} from "../../../services/checking.api";

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

// const useStyles = makeStyles((theme) => ({
//   formControl: {
//     margin: theme.spacing(1),
//     minWidth: 120,
//     backgroundColor: "#fff",
//     boxShadow: "1px 1px 5px #555",
//     borderRadius: "10px",
//   },
//   selectEmpty: {
//     marginTop: theme.spacing(2),
//   },
// }));

function Supervisor(props) {
  const { role } = useSelector((state) => state.Common);
  const isEnable =
    role === "admin" || role === "Admin" || role === "user" || role === "User";
  // React Selector
  const { wingList, selectedWing } = useSelector((state) => state?.CheckV3);
  // Redux Dispatch
  const Dispatch = useDispatch();
  const [workerData, setWorkerData] = useState();
  const [edit, setEdit] = useState(false);
  const [supervisorList, setSupervisorList] = useState([]);

  const loadData = async () => {
    try {
      const x = await getCheckingSupervisorScheduleV3({
        wing: selectedWing || localStorage.getItem("kpl_wing"),
      });
      setWorkerData(x.data);
      const supData = await getAllSupervisorListV3();
      setSupervisorList(supData);
    } catch (err) {}
  };

  const filterData = async () => {
    try {
      if (!inputData.filterDateFrom || !inputData.filterDateTo) {
        setMsg("Please include start date and end date");
        setOpen(true);
      } else if (inputData.filterDateFrom === inputData.filterDateTo) {
        const x = await getCheckingSupervisorScheduleV3({
          ...inputData,
          wing: selectedWing || localStorage.getItem("kpl_wing"),
        });
        // console.log(x);
        setWorkerData(x.data);
      } else if (inputData.filterDateFrom < inputData.filterDateTo) {
        const x = await getCheckingSupervisorScheduleV3({
          ...inputData,
          wing: selectedWing || localStorage.getItem("kpl_wing"),
        });
        // console.log(x);
        setWorkerData(x.data);
      } else {
        setMsg("Wrong Date Range Selected");
        //  setSeverity("error");
        setOpen(true);
      }
    } catch (err) {}
  };

  useEffect(() => {
    loadData();
  }, [selectedWing]);
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
    {
      title: "Supervisor Id",
      field: "supervisorId",
    },
    {
      title: "Supervisor Name",
      field: "supervisorName",
    },
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
            if (isEnable) {
              setEdit(true);
              setUserData({
                ...userdata,
                id: x.id,
                supervisorName: x.supervisorName,
                supervisorId: x.supervisorId,
                date: new Date(x.date).toISOString().slice(0, 10),
                shift: x.shift,
                wing: x.wing,
                line: x.line,
                kitSupervisor: x.kitSupervisor === "true" ? true : false,
                lineSupervisor: x.lineSupervisor === "true" ? true : false,
              });
            } else {
              Dispatch(
                openSnackbar(true, "error", `Access denied for ${role}`)
              );
            }
          }}
        >
          EDIT
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

  const [inputData, setInputData] = React.useState({
    filterDateFrom: "",
    filterDateTo: "",
  });

  const [lineList, setLineList] = useState([]);

  const getLineDynamic = async (wing) => {
    try {
      // console.log("DYNAMIC CLPFILTER CALL");

      const resp = await wingWiseLine(wing);
      setLineList(resp?.data);
    } catch (e) {}
  };

  useEffect(() => {
    getLineDynamic(userdata?.wing);
  }, [userdata?.wing]);

  useEffect(() => {
    setInputData({
      filterDateFrom: weekRange()[0],
      filterDateTo: weekRange()[1],
    });
  }, []);

  const onInputChange = (e) => {
    setUserData({
      ...userdata,
      [e.target.name]: e.target.value,
    });
  };

  const [msg, setMsg] = React.useState("");
  const [open, setOpen] = useState(false);

  // const uploadImage = async (e) => {
  //   const file = e.target.files[0];
  //   const base64 = await convertBase64(file);
  //   setUserData({ ...userdata, workerImage: base64 });
  // };

  // const convertBase64 = (file) => {
  //   return new Promise((resolve, reject) => {
  //     const fileReader = new FileReader();
  //     fileReader.readAsDataURL(file);

  //     fileReader.onload = () => {
  //       resolve(fileReader.result);
  //     };

  //     fileReader.onerror = (error) => {
  //       reject(error);
  //     };
  //   });
  // };

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
    if (isEnable) {
      try {
        const resp = await getCheckingSupervisorCopyV3();
        // console.log(resp);
        setMsg(resp.msg);
        setOpen(true);
        loadData();
      } catch (e) {
        console.log(e);
      }
    } else {
      Dispatch(openSnackbar(true, "error", `Access denied for ${role}`));
    }
  };

  const addSupervisor = async () => {
    if (isEnable) {
      try {
        if (
          !userdata.supervisorName ||
          !userdata.supervisorId ||
          !userdata.date ||
          !userdata.wing ||
          !userdata.line ||
          !userdata?.shift
        ) {
          return Dispatch(
            openSnackbar(true, "error", "Please Fill All Fields")
          );
        }
        const resp = await addCheckingSupervisorSingleV3(userdata);
        setMsg(resp.msg);
        setOpen(true);
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
      Dispatch(openSnackbar(true, "error", `Access denied for ${role}`));
    }
  };

  const updateSupervisor = async (data) => {
    try {
      const resp = await updateCheckingSupervisorSingleV3(data);
      setMsg(resp.msg);
      setOpen(true);
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
      setEdit(false);
    } catch (err) {}
  };

  const deleteSUpervisor = async () => {
    try {
      const confirm = window.confirm(
        "Are you sure you want to delete the schedule?"
      );
      if (confirm) {
        const resp = await deleteCheckingSupervisorScheduleV3({
          id: userdata.id,
        });
        if (resp.message) {
          setMsg(resp.message);
          setOpen(true);
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
        setMsg("Operation Cancelled");
        setOpen(true);
      }
    } catch (e) {}
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
  return (
    <Grid container spacing={4}>
      <Grid item xs={12} md={4}>
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
              {supervisorList?.length > 0 &&
                supervisorList
                  .sort((a, b) => (a.username > b.username ? 1 : -1))
                  .map((item, index) => (
                    <MenuItem value={item.workerID} key={index}>
                      {item?.workerID} - {item?.username}
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
          label="Supervisor Name"
          variant="outlined"
          style={{ marginBottom: "12px" }}
          value={userdata.supervisorName}
          name="supervisorName"
          fullWidth
          onChange={onInputChange}
        /> */}
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

        <FormControlLabel
          style={{ marginBottom: "12px" }}
          fullWidth
          control={
            <Switch
              value={userdata.kitSupervisor}
              checked={userdata.kitSupervisor}
              onChange={(e) =>
                setUserData({
                  ...userdata,
                  kitSupervisor: e.target.checked,
                })
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
                setUserData({
                  ...userdata,
                  lineSupervisor: e.target.checked,
                })
              }
              name="checkedB"
              color="primary"
              fullWidth
            />
          }
          label="Line Supervisor"
        />

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
            {wingList?.length !== 0 &&
              wingList?.map((item, index) => (
                <MenuItem value={item.wing} key={index}>
                  {item?.wing}
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
            {lineList?.length !== 0 &&
              lineList?.map((item, index) => (
                <MenuItem value={item?.line} key={index}>
                  {item?.line}
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
            {shifts.map((item, index) => (
              <MenuItem key={index} value={item}>
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
            style={{
              width: "100%",
              padding: "12px",
            }}
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
                onClick={() => updateSupervisor(userdata)}
              >
                UPDATE
              </Button>
            </Grid>
            <Grid container item xs={12} style={{ padding: "6px" }}>
              <Button
                variant="contained"
                style={{
                  backgroundColor: "#b53f3f",
                  color: "#FFF",
                  whiteSpace: "nowrap",
                  width: "100%",
                  height: "fit-content",
                  border: "1px solid #b53f3f",
                }}
                onClick={deleteSUpervisor}
              >
                DELETE
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
              onClick={addSupervisor}
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
          <Grid container item xs={6} md={4}>
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
              // onChange={(e) =>
              //   setInputData({ ...inputData, filterDateFrom: e.target.value })
              // }
              fullWidth
            />
          </Grid>
          <Grid container item xs={6} md={4}>
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
              // onChange={(e) =>
              //   setInputData({ ...inputData, filterDateTo: e.target.value })
              // }
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
          <Grid
            container
            item
            xs={6}
            md={2}
            style={{
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Button variant="contained" color="primary" onClick={filterData}>
              <FilterListIcon />
              Filter
            </Button>
          </Grid>
          <Grid
            container
            item
            xs={6}
            md={2}
            style={{
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Button variant="contained" color="primary" onClick={loadData}>
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

      <Snackbar
        open={open}
        autoHideDuration={2000}
        onClose={() => setOpen(false)}
      >
        <Alert onClose={() => setOpen(false)} severity="success">
          {msg}
        </Alert>
      </Snackbar>
    </Grid>
  );
}

export default Supervisor;
