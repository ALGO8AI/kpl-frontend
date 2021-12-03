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
  getCheckingSupervisorSchedule,
  getCheckingSupervisorCopy,
  addCheckingSupervisorSingle,
  updateCheckingSupervisorSingle,
  getAllSupervisorList,
} from "../../../services/api.service";
import { Alert } from "@material-ui/lab";
import moment from "moment";
import FilterListIcon from "@material-ui/icons/FilterList";
import RefreshIcon from "@material-ui/icons/Refresh";

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
  const [workerData, setWorkerData] = useState();
  const [edit, setEdit] = useState(false);
  const [supervisorList, setSupervisorList] = useState([]);

  const loadData = async () => {
    try {
      const x = await getCheckingSupervisorSchedule();
      setWorkerData(x.data);
      const supData = await getAllSupervisorList();
      setSupervisorList(supData);
    } catch (err) {}
  };

  const filterData = async () => {
    try {
      if (!inputData.filterDateFrom || !inputData.filterDateTo) {
        setMsg("Please include start date and end date");
        setOpen(true);
      } else if (inputData.filterDateFrom === inputData.filterDateTo) {
        const x = await getCheckingSupervisorSchedule(inputData);
        // console.log(x);
        setWorkerData(x.data);
      } else if (inputData.filterDateFrom < inputData.filterDateTo) {
        const x = await getCheckingSupervisorSchedule(inputData);
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

  const onInputChange = (e) => {
    setUserData({ ...userdata, [e.target.name]: e.target.value });
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
    try {
      const resp = await getCheckingSupervisorCopy();
      console.log(resp);
      setMsg(resp.msg);
      setOpen(true);
      loadData();
    } catch (e) {
      console.log(e);
    }
  };

  const addSupervisor = async (data) => {
    try {
      const resp = await addCheckingSupervisorSingle(data);
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
  };

  const updateSupervisor = async (data) => {
    try {
      const resp = await updateCheckingSupervisorSingle(data);
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
              {supervisorList.length > 0 &&
                supervisorList.map((item, index) => (
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
            {["U+2", "Baffle", "Circular", "Two Row"].map((item, index) => (
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
              onChange={(e) =>
                setInputData({ ...inputData, filterDateFrom: e.target.value })
              }
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
              onChange={(e) =>
                setInputData({ ...inputData, filterDateTo: e.target.value })
              }
              fullWidth
            />
          </Grid>
          <Grid
            container
            item
            xs={6}
            md={2}
            style={{ justifyContent: "center", alignItems: "center" }}
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
            style={{ justifyContent: "center", alignItems: "center" }}
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
