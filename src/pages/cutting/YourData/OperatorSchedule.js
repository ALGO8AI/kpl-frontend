/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import Grid from "@material-ui/core/Grid";
import { DropzoneArea } from "material-ui-dropzone";
import CloudUploadIcon from "@material-ui/icons/CloudUpload";
import MaterialTable from "material-table";
import PropTypes from "prop-types";

import {
  copyScheduleStitching,
  getAllWorketrList,
  updateStitchingWorkerSchedule,
} from "../../../services/api.service";
import axios from "axios";
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";
import { getYourData } from "../../../services/api.service";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContentText,
  DialogTitle,
  FormControlLabel,
  TextField,
  Switch,
  AppBar,
  Tabs,
  Tab,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Typography,
} from "@material-ui/core";
import FilterListIcon from "@material-ui/icons/FilterList";
import RefreshIcon from "@material-ui/icons/Refresh";
import { StitchingContext } from "../../../context/StitchingContext";
import moment from "moment";
import {
  addScheduleDetail,
  cuttingOperator,
  deleteOperatorSchedule,
  getCuttingOperatorCopy,
  getCuttingOperatorSchedule,
  updateScheduleDetail,
} from "../../../services/cuttingApi.service";

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <Grid
      container
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Grid container item xs={12} style={{ padding: "18px" }}>
          {children}
        </Grid>
      )}
    </Grid>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

function OperatorSchedule(props) {
  const [file, setFile] = React.useState();
  const [open, setOpen] = React.useState(false);
  const [severity, setSeverity] = React.useState(false);
  const [msg, setMsg] = React.useState(false);
  const [inputData, setInputData] = React.useState({
    filterDateFrom: "",
    filterDateTo: "",
    date: "",
    wing: "",
    shift: "",
    machineId: "",
    machineOnOff: 0,
  });
  const { state, dispatch } = React.useContext(StitchingContext);
  const [operatorScheduleList, setOperatorScheduleList] = useState([]);
  const [scheduleInput, setScheduleInput] = React.useState({
    operatorId: "",
    operatorName: "",
    date: "",
    wing: "",
    shift: "",
    machineId: "",
    machineOnOff: 0,
  });

  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const [workerList, setWorkerList] = React.useState([]);

  const loadData = async () => {
    try {
      const { data } = await cuttingOperator();
      setWorkerList(data);
      const resp = await getCuttingOperatorSchedule();
      setOperatorScheduleList(resp.data);
    } catch (err) {}
  };

  const refreshData = async () => {
    try {
      const x = await getYourData();
      dispatch({
        type: "WORKER_SCHEDULE",
        payload: { data: x.latestScheduleData, loading: false },
      });
      // setData(x.latestScheduleData);
    } catch (err) {}
  };

  const filterData = async () => {
    try {
      if (!inputData.filterDateFrom || !inputData.filterDateTo) {
        setMsg("Please include start date and end date");
        setSeverity("error");
        setOpen(true);
      } else if (inputData.filterDateFrom === inputData.filterDateTo) {
        const x = await getCuttingOperatorSchedule(inputData);
        setData(x.latestScheduleData);
      } else if (inputData.filterDateFrom < inputData.filterDateTo) {
        const x = await getCuttingOperatorSchedule(inputData);
        setData(x.latestScheduleData);
      } else {
        setMsg("Wrong date range selected");
        setSeverity("error");
        setOpen(true);
      }
    } catch (err) {}
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleClose = (event, reason) => {
    setOpen(false);
  };

  const copy = async () => {
    try {
      const response = await getCuttingOperatorCopy();
      setMsg(response.msg);
      setSeverity("success");
      setOpen(true);
      refreshData();
    } catch (e) {}
  };

  const addSchedule = async () => {
    try {
      const resp = await addScheduleDetail(scheduleInput);
      loadData();

      // if (resp?.msg === "Successfully New Schedule Updated") {
      setMsg(resp.msg);
      setSeverity("success");
      setOpen(true);
      setScheduleInput({
        operatorId: "",
        operatorName: "",
        date: "",
        wing: "",
        shift: "",
        machineId: "",
        machineOnOff: 0,
      });
      // refreshData();
      // }
    } catch (e) {}
  };

  const deleteSchedule = async (id) => {
    try {
      const permission = window.confirm(
        "Are you sure you want to delete the schedule ?"
      );
      if (permission) {
        const formData = {
          id: id,
        };
        // console.log(formData);
        const resp = await deleteOperatorSchedule(formData);
        if (resp?.msg === "successfully updated") {
          loadData();
          setOpen(true);
          setMsg("Successfully Deleted");
          setSeverity("success");
          // refreshData();
        }
      } else {
        setMsg("Operation Cancelled");
        setSeverity("error");
        setOpen(true);
      }
    } catch (e) {}
    // const permission = window.confirm(
    //   "Are you sure you want to delete the schedule ?"
    // );
    // if (permission) {
    //   try {
    //     const formData = {
    //       id: id,
    //     };
    //     // console.log(formData);
    //     const resp = await deleteOperatorSchedule(formData);
    //     if (resp?.msg === "successfully updated") {
    //       loadData();
    //       setMsg("Successfully Deleted");
    //       setSeverity("success");
    //       setOpen(true);
    //       refreshData();
    //     }
    //   } catch (e) {}
    // } else {
    //   setMsg("Operation Cancelled");
    //   setSeverity("error");
    //   setOpen(true);
    // }
  };

  const [columns, setColumns] = useState([
    {
      title: "Date",
      field: "Date",
      render: (rowData) => {
        const date1 = new Date(rowData.Date).toLocaleString().split(",");
        // return date1[0]
        const dd = date1[0].split("/");
        return moment(new Date(rowData.Date))
          .format("DD/MM/YYYY")
          .toString();
      },
    },
    // { title: "ID", field: "id" },

    { title: "Operator ID", field: "operatorId" },
    { title: "Operator Name", field: "operatorName" },

    { title: "Shift", field: "shift" },
    // { title: "Wing", field: "wing" },
    { title: "Machine ID", field: "machineId" },
    {
      title: "Machine Status",
      render: (x) => (Boolean(x.machineOnOff) ? "On" : "Off"),
    },
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
            handleClickOpenDialog();
            setScheduleData({
              date: new Date(x.Date).toISOString().slice(0, 10),
              operatorId: x.operatorId,
              operatorName: x.operatorName,
              shift: x.shift,
              wing: x.wing,
              machineId: x.machineId,
              machineOnOff: Boolean(x.machineOnOff),
              id: x.id,
            });
          }}
        >
          EDIT
        </button>
      ),
    },
    {
      title: "DELETE",
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
          onClick={() => deleteSchedule(x.id)}
        >
          DELETE
        </button>
      ),
    },
  ]);

  const [data, setData] = useState([]);
  const [openDialog, setOpenDialog] = React.useState(false);
  const [scheduleData, setScheduleData] = React.useState({
    date: "",
    operatorId: "",
    operatorName: "",
    shift: "",
    wing: "",
    machineId: "",
    id: "",
    machineOnOff: false,
  });

  const onScheduleDataChange = (e) => {
    setScheduleData({ ...scheduleData, [e.target.name]: e.target.value });
  };

  const handleClickOpenDialog = () => {
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  const handleFileChange = (files) => {
    // console.log(files[0])
    setFile(files[0]);
    // console.log(file)
  };

  const updateSchedule = async () => {
    try {
      console.log(scheduleData);
      const resp = await updateScheduleDetail({
        ...scheduleData,
        machineOnOff: scheduleData.machineOnOff ? 1 : 0,
      });
      loadData();
      // console.log(resp);
      setMsg(resp.msg);
      setSeverity("success");
      setOpen(true);
      refreshData();
      setOpenDialog(false);
    } catch (e) {
      console.log(e.message);
    }
  };

  const submit = async () => {
    if (file) {
      // console.log("the selected file is:")
      // console.log(file)
      const formData = new FormData();
      // const myFile=file
      formData.append("myFile", file, file.name);
      try {
        // await scheduleUpload(formData)
        await axios
          .post("http://52.66.200.163:3000/routes/scheduleUpdate", formData)
          .then((x) => {
            // console.log('return value:')
            if (x) {
              if (x.data) {
                if (x.data === "File uploaded") {
                  setMsg("File Uploaded");
                  setSeverity("success");
                  setOpen(true);
                } else {
                  setMsg("File Not Uploaded");
                  setSeverity("error");
                  setOpen(true);
                }
              } else {
                setMsg("Database Error");
                setSeverity("error");
                setOpen(true);
              }
            } else {
              alert("could not connect to internet");
            }
          });
      } catch (error) {
        alert(error);
      }
    } else {
      alert("Select a File!");
    }
  };

  const onUserChange = (e) => {
    const i = workerList.findIndex(
      (item) => item.operatorId === e.target.value
    );
    setScheduleInput({
      ...scheduleInput,
      operatorId: workerList[i].operatorId,
      operatorName: workerList[i].operatorName,
    });
  };

  return (
    <Grid container spacing={4} md={12}>
      <Grid item md={4} xs={12} style={{ backgroundColor: "#FFF" }}>
        <AppBar position="static" className="customTab">
          <Tabs
            value={value}
            onChange={handleChange}
            aria-label="simple tabs example"
            variant="scrollable"
            scrollButtons="auto"
          >
            <Tab label="Manual Entry" {...a11yProps(0)} />
            <Tab label="Upload" {...a11yProps(1)} />
            {/* <Tab label=" Layout" {...a11yProps(4)} /> */}
          </Tabs>
        </AppBar>
        <TabPanel value={value} index={0}>
          <FormControl
            variant="outlined"
            fullWidth
            style={{ marginBottom: "12px" }}
          >
            <InputLabel keyid="demo-simple-select-outlined-label">
              Operator Id
            </InputLabel>
            <Select
              labelId="demo-simple-select-outlined-label"
              id="demo-simple-select-outlined"
              value={scheduleInput.operatorId}
              name="supervisorName"
              fullWidth
              onChange={onUserChange}
              label="Worker Id"
              // multiple
            >
              <MenuItem value="">
                <em>None</em>
              </MenuItem>
              {workerList?.length > 0 &&
                workerList.map((item, index) => (
                  <MenuItem value={item.operatorId} key={index}>
                    {item.operatorId} - {item.operatorName}
                  </MenuItem>
                ))}
            </Select>
          </FormControl>
          <FormControl
            variant="outlined"
            fullWidth
            style={{ marginBottom: "12px" }}
            disabled
          >
            <InputLabel keyid="demo-simple-select-outlined-label">
              Operator Name
            </InputLabel>
            <Select
              labelId="demo-simple-select-outlined-label"
              id="demo-simple-select-outlined"
              value={scheduleInput.operatorName}
              name="supervisorName"
              fullWidth
              // onChange={onUserChange}
              label="Worker Name"
              // multiple
            >
              <MenuItem value="">
                <em>None</em>
              </MenuItem>
              {workerList.length > 0 &&
                workerList.map((item, index) => (
                  <MenuItem value={item.operatorName} key={index}>
                    {item.operatorName}
                  </MenuItem>
                ))}
            </Select>
          </FormControl>

          <FormControl
            variant="outlined"
            fullWidth
            style={{ marginBottom: "12px" }}
          >
            <InputLabel keyid="demo-simple-select-outlined-label">
              Machine Id
            </InputLabel>
            <Select
              labelId="demo-simple-select-outlined-label"
              id="demo-simple-select-outlined"
              // value={userdata.supervisorName}
              name="supervisorName"
              fullWidth
              onChange={(e) =>
                setScheduleInput({
                  ...scheduleInput,
                  machineId: e.target.value,
                })
              }
              label="Machine Id"
              // multiple
            >
              <MenuItem value="">
                <em>None</em>
              </MenuItem>
              {/* {state.machineIDs.length > 0 && */}
              {["MC04"].map((item, index) => (
                <MenuItem value={item} key={index}>
                  {item}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <TextField
            key="from"
            id="fromDate"
            label="Date"
            // value={state.from}
            type="date"
            style={{ marginBottom: "12px" }}
            InputLabelProps={{
              shrink: true,
            }}
            variant="outlined"
            onChange={(e) =>
              setScheduleInput({ ...scheduleInput, date: e.target.value })
            }
            fullWidth
          />
          {/* <FormControl
            variant="outlined"
            fullWidth
            style={{ marginBottom: "12px" }}
          >
            <InputLabel keyid="demo-simple-select-outlined-label">
              Wing
            </InputLabel>
            <Select
              labelId="demo-simple-select-outlined-label"
              id="demo-simple-select-outlined"
              // value={userdata.supervisorName}
              name="supervisorName"
              fullWidth
              onChange={(e) =>
                setScheduleInput({
                  ...scheduleInput,
                  wing: e.target.value,
                })
              }
              label="Wing"
            >
              <MenuItem value="">
                <em>None</em>
              </MenuItem>
              {["FG2"].map((item, index) => (
                <MenuItem value={item} key={index}>
                  {item}
                </MenuItem>
              ))}
            </Select>
          </FormControl> */}
          <FormControl
            variant="outlined"
            fullWidth
            style={{ marginBottom: "12px" }}
          >
            <InputLabel keyid="demo-simple-select-outlined-label">
              Shift
            </InputLabel>
            <Select
              labelId="demo-simple-select-outlined-label"
              id="demo-simple-select-outlined"
              // value={userdata.supervisorName}
              name="supervisorName"
              fullWidth
              onChange={(e) =>
                setScheduleInput({
                  ...scheduleInput,
                  shift: e.target.value,
                })
              }
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
          <FormControlLabel
            style={{ marginBottom: "12px" }}
            control={
              <Switch
                checked={scheduleInput?.machineOnOff === 1 ? true : false}
                onChange={(e) =>
                  setScheduleInput({
                    ...scheduleInput,
                    machineOnOff: e.target.checked ? 1 : 0,
                  })
                }
                name="machineOnOff"
                color="primary"
              />
            }
            label="Machine Status"
          />
          <Button
            variant="contained"
            color="primary"
            fullWidth
            // style={{ margin: "10px" }}
            onClick={addSchedule}
          >
            {/* <FilterListIcon /> */}
            Save
          </Button>
        </TabPanel>
        <TabPanel value={value} index={1}>
          <DropzoneArea
            onChange={handleFileChange}
            dropzoneText={"Drag and drop files or click here"}
            acceptedFiles={[".csv", ".xls", ".xlsx"]}
          />
          <br />
          <div
            className="customUpload"
            style={{ padding: "8px 0px", width: "100%" }}
            onClick={submit}
          >
            <CloudUploadIcon />
            &nbsp;Upload Schedule
          </div>
        </TabPanel>
      </Grid>
      <Grid container item md={8} xs={12}>
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
            <Button variant="contained" color="primary" onClick={refreshData}>
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
          title="Schedule Information"
          columns={columns}
          data={operatorScheduleList}
          options={{
            exportButton: true,
            headerStyle: {
              backgroundColor: "#0e4a7b",
              color: "#FFF",
            },
            pageSizeOptions: [20, 50, 100, 200],
            pageSize: 20,
          }}
          style={{ width: "100%" }}
        />
      </Grid>
      <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity={severity}>
          {msg}
        </Alert>
      </Snackbar>
      <Dialog
        open={openDialog}
        onClose={handleCloseDialog}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        style={{ width: "900px", margin: "auto" }}
      >
        <Grid
          xs={12}
          container
          item
          id="alert-dialog-title"
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            padding: "12px",
          }}
        >
          <Typography variant="h6">{"UPDATE OPERATOR SCHEDULE"}</Typography>
          {/* <Button
            onClick={deleteSchedule}
            variant="contained"
            color="secondary"
          >
            DELETE
          </Button> */}
        </Grid>
        <DialogContentText id="alert-dialog-description">
          <Grid container item style={{ padding: "12px", minWidth: "600px" }}>
            <Grid md={6} style={{ padding: "12px" }}>
              <TextField
                id="outlined-basic"
                label="Operator Name"
                variant="outlined"
                value={scheduleData.operatorName}
                name="operatorName"
                fullWidth
                onChange={onScheduleDataChange}
                disabled
              />
            </Grid>
            <Grid md={6} style={{ padding: "12px" }}>
              <TextField
                id="outlined-basic"
                label="Operator Id"
                variant="outlined"
                value={scheduleData.operatorId}
                name="operator"
                onChange={onScheduleDataChange}
                fullWidth
              />
            </Grid>
            <Grid md={6} style={{ padding: "12px" }}>
              <TextField
                id="outlined-basic"
                label="Date"
                variant="outlined"
                value={scheduleData.date}
                name="date"
                type="date"
                onChange={onScheduleDataChange}
                fullWidth
              />
            </Grid>
            {/* <Grid md={6} style={{ padding: "12px" }}>
               <TextField
                id="outlined-basic"
                label="Wing"
                variant="outlined"
                value={scheduleData.wing}
                name="wing"
                onChange={onScheduleDataChange}
                fullWidth
              /> 
              <FormControl
                variant="outlined"
                fullWidth
                style={{ marginBottom: "12px" }}
              >
                <InputLabel keyid="demo-simple-select-outlined-label">
                  Wing
                </InputLabel>
                <Select
                  labelId="demo-simple-select-outlined-label"
                  id="demo-simple-select-outlined"
                  // value={userdata.supervisorName}
                  fullWidth
                  value={scheduleData.wing}
                  name="wing"
                  onChange={onScheduleDataChange}
                  label="Wing"
                  // multiple
                >
                  <MenuItem value="">
                    <em>None</em>
                  </MenuItem>
                  {["FG2"].map((item, index) => (
                    <MenuItem value={item} key={index}>
                      {item}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid> */}
            <Grid md={6} style={{ padding: "12px" }}>
              {/* <TextField
                id="outlined-basic"
                label="Shift"
                variant="outlined"
                value={scheduleData.shift}
                name="shift"
                onChange={(e) =>
                  setScheduleData({ ...scheduleData, shift: e.target.value })
                }
                fullWidth
                disabled
              /> */}
              <FormControl
                variant="outlined"
                fullWidth
                style={{ marginBottom: "12px" }}
              >
                <InputLabel keyid="demo-simple-select-outlined-label">
                  Shift
                </InputLabel>
                <Select
                  labelId="demo-simple-select-outlined-label"
                  id="demo-simple-select-outlined"
                  // value={userdata.supervisorName}
                  fullWidth
                  value={scheduleData.shift}
                  name="shift"
                  onChange={(e) =>
                    setScheduleData({ ...scheduleData, shift: e.target.value })
                  }
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
            </Grid>
            <Grid
              md={6}
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <FormControlLabel
                control={
                  <Switch
                    checked={scheduleData.machineOnOff}
                    onChange={(e) =>
                      setScheduleData({
                        ...scheduleData,
                        machineOnOff: e.target.checked,
                      })
                    }
                    name="machineOnOff"
                    color="primary"
                  />
                }
                label="Machine Status"
                // disabled
              />
            </Grid>
          </Grid>
        </DialogContentText>

        <DialogActions>
          <Button
            onClick={handleCloseDialog}
            variant="contained"
            // color="secondary"
          >
            CANCEL
          </Button>
          <Button
            variant="contained"
            style={{
              backgroundColor: "#0e4a7b",
              color: "#FFF",
            }}
            onClick={updateSchedule}
            autoFocus
          >
            UPDATE
          </Button>
        </DialogActions>
      </Dialog>
    </Grid>
  );
}

export default OperatorSchedule;
