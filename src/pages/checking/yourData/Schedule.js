/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import Grid from "@material-ui/core/Grid";
import { DropzoneArea } from "material-ui-dropzone";
import CloudUploadIcon from "@material-ui/icons/CloudUpload";
import MaterialTable from "material-table";
import PropTypes from "prop-types";
import FilterListIcon from "@material-ui/icons/FilterList";
import RefreshIcon from "@material-ui/icons/Refresh";

import {
  addCheckingWorkerSchedule,
  copyScheduleChecking,
  deleteCheckingWorkerSchedule,
  getAllWorketrList,
  getCheckingSchedule,
  updateCheckingWorkerSchedule,
} from "../../../services/api.service";
import axios from "axios";
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";
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
} from "@material-ui/core";
import { CheckingContext } from "../../../context/CheckingContext";

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

function Schedule(props) {
  const [file, setFile] = React.useState();
  const [open, setOpen] = React.useState(false);
  const [severity, setSeverity] = React.useState(false);
  const [msg, setMsg] = React.useState(false);

  const { state } = React.useContext(CheckingContext);

  const loadData = async () => {
    try {
      const worker = await getAllWorketrList();
      // console.log();
      setWorkerList(worker?.data);
      const x = await getCheckingSchedule();

      setData(x.data);
    } catch (err) {}
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleClose = (event, reason) => {
    setOpen(false);
  };

  const filterData = async () => {
    try {
      if (!inputData.filterDateFrom || !inputData.filterDateTo) {
        setMsg("Please include start date and end date");
        setSeverity("error");
        setOpen(true);
      } else if (inputData.filterDateFrom === inputData.filterDateTo) {
        const x = await getCheckingSchedule(inputData);
        setData(x.data);
      } else if (inputData.filterDateFrom < inputData.filterDateTo) {
        const x = await getCheckingSchedule(inputData);
        setData(x.data);
      } else {
        setMsg("Wrong date range selected");
        setSeverity("error");
        setOpen(true);
      }
    } catch (err) {}
    // try {
    // const x = await getCheckingSchedule(inputData);
    // setData(x.data);
    // } catch (err) {}
  };

  const copy = async () => {
    try {
      const response = await copyScheduleChecking();
      setMsg(response.msg);
      setSeverity("success");
      setOpen(true);
      loadData();
    } catch (e) {}
  };

  const deleteSchedule = async (id) => {
    try {
      const confirm = window.confirm(
        "Are you sure you want to delete the schedule?"
      );
      if (confirm) {
        const resp = await deleteCheckingWorkerSchedule({ id });
        if (resp?.msg) {
          setOpen(true);
          setMsg("Successfully Deleted");
          setSeverity("success");
          loadData();
        }
      } else {
        setOpen(true);
        setMsg("Operation Cancelled");
        setSeverity("error");
      }
    } catch (e) {}
  };

  const [columns, setColumns] = useState([
    {
      title: "Date",
      field: "Date",
      render: (rowData) => {
        const date1 = new Date(rowData.Date).toLocaleString().split(",");
        // return date1[0]
        const dd = date1[0].split("/");
        return dd[1] + "/" + dd[0] + "/" + dd[2];
      },
    },
    // { title: "ID", field: "id" },

    { title: "Worker ID", field: "workerId" },
    { title: "Worker Name", field: "workerName" },

    { title: "Shift", field: "shift" },
    { title: "Wing", field: "wing" },
    { title: "Table ID", field: "tableId" },
    {
      title: "Table Status",
      render: (x) => (Boolean(x.tableOnOff) ? "On" : "Off"),
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
              workerId: x.workerId,
              shift: x.shift,
              wing: x.wing,
              tableId: x.tableId,
              id: x.id,
              tableOnOff: Boolean(x.tableOnOff),
            });
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
          onClick={
            () => deleteSchedule(x.id)
            // handleClickOpenDialog();
            // setScheduleData({
            //   date: new Date(x.Date).toISOString().slice(0, 10),
            //   workerId: x.workerId,
            //   shift: x.shift,
            //   wing: x.wing,
            //   tableId: x.tableId,
            //   id: x.id,
            //   tableOnOff: Boolean(x.tableOnOff),
            // });
          }
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
    workerId: "",
    shift: "",
    wing: "",
    tableId: "",
    id: "",
    tableOnOff: false,
  });
  const [inputData, setInputData] = React.useState({
    filterDateFrom: "",
    filterDateTo: "",
  });

  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const [scheduleInput, setScheduleInput] = React.useState({
    workerId: "",
    workerName: "",
    date: "",
    wing: "",
    shift: "",
    tableId: "",
    tableOnOff: 0,
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
      const resp = await updateCheckingWorkerSchedule(scheduleData);
      console.log(scheduleData);
      console.log(resp);
      setMsg(resp.msg);
      setSeverity("success");
      setOpen(true);
      loadData();
      setOpenDialog(false);
    } catch (e) {
      console.log(e.message);
    }
  };

  const addSchedule = async () => {
    try {
      const resp = await addCheckingWorkerSchedule(scheduleInput);
      if (resp?.msg === "Successfully New Schedule Updated") {
        setMsg(resp.msg);
        setSeverity("success");
        setOpen(true);
        loadData();
      }
    } catch (e) {}
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

  const [workerList, setWorkerList] = React.useState([]);

  const onUserChange = (e) => {
    const i = workerList.findIndex((item) => item.workerId === e.target.value);
    if (i !== -1) {
      setScheduleInput({
        ...scheduleInput,
        workerId: workerList[i].workerId,
        workerName: workerList[i].workerName,
      });
    } else {
      setScheduleInput({
        ...scheduleInput,
        workerId: "",
        workerName: "",
      });
    }
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
              Worker Id
            </InputLabel>
            <Select
              labelId="demo-simple-select-outlined-label"
              id="demo-simple-select-outlined"
              value={scheduleInput.workerId}
              name="supervisorName"
              fullWidth
              onChange={onUserChange}
              label="Worker Id"
              // multiple
            >
              <MenuItem value="">
                <em>None</em>
              </MenuItem>
              {workerList.length > 0 &&
                workerList.map((item, index) => (
                  <MenuItem value={item.workerId} key={index}>
                    {item.workerId} - {item?.workerName}
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
              Worker Name
            </InputLabel>
            <Select
              labelId="demo-simple-select-outlined-label"
              id="demo-simple-select-outlined"
              value={scheduleInput.workerName}
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
                  <MenuItem value={item.workerName} key={index}>
                    {item.workerName}
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
              Table Id
            </InputLabel>
            <Select
              labelId="demo-simple-select-outlined-label"
              id="demo-simple-select-outlined"
              value={scheduleInput?.tableId}
              name="supervisorName"
              fullWidth
              onChange={(e) =>
                setScheduleInput({
                  ...scheduleInput,
                  tableId: e.target.value,
                })
              }
              label="Table Id"
              // multiple
            >
              <MenuItem value="">
                <em>None</em>
              </MenuItem>
              {state?.tableIDs?.length > 0 &&
                state?.tableIDs?.map((item, index) => (
                  <MenuItem value={item.tableId} key={index}>
                    {item.tableId}
                  </MenuItem>
                ))}
            </Select>
          </FormControl>

          {/* <FormControl
            variant="outlined"
            fullWidth
            style={{ marginBottom: "12px" }}
          >
            <InputLabel keyid="demo-simple-select-outlined-label">
              CTR
            </InputLabel>
            <Select
              labelId="demo-simple-select-outlined-label"
              id="demo-simple-select-outlined"
              // value={userdata.supervisorName}
              name="supervisorName"
              fullWidth
              // onChange={onUserChange}
              label="CTR"
              // multiple
            >
              <MenuItem value="">
                <em>None</em>
              </MenuItem>
              {state?.CTR?.length > 0 &&
                state?.CTR?.map((item, index) => (
                  <MenuItem value={item.ctrs} key={index}>
                    {item.ctrs}
                  </MenuItem>
                ))}
            </Select>
          </FormControl> */}

          <TextField
            key="from"
            id="fromDate"
            label="Date"
            value={scheduleInput?.date}
            onChange={(e) =>
              setScheduleInput({
                ...scheduleInput,
                date: e.target.value,
              })
            }
            type="date"
            style={{ marginBottom: "12px" }}
            InputLabelProps={{
              shrink: true,
            }}
            variant="outlined"
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
              value={scheduleInput?.wing}
              name="supervisorName"
              fullWidth
              onChange={(e) =>
                setScheduleInput({
                  ...scheduleInput,
                  wing: e.target.value,
                })
              }
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
              value={scheduleInput?.shift}
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
                checked={scheduleInput?.tableOnOff === 1 ? true : false}
                onChange={(e) =>
                  setScheduleInput({
                    ...scheduleInput,
                    tableOnOff: e.target.checked ? 1 : 0,
                  })
                }
                name="machineOnOffStatus"
                color="primary"
              />
            }
            label="Table Status"
          />
          {/* <FormControlLabel
            style={{ marginBottom: "12px" }}
            control={
              <Switch
                // checked={scheduleData.machineOnOffStatus}
                // onChange={(e) =>
                //   setScheduleData({
                //     ...scheduleData,
                //     machineOnOffStatus: e.target.checked,
                //   })
                // }
                name="machineOnOffStatus"
                color="primary"
              />
            }
            label="Machine Status"
          /> */}
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
            style={{ padding: "4px 0px" }}
            onClick={submit}
          >
            <CloudUploadIcon />
            &nbsp;Upload Schedule
          </div>
        </TabPanel>
      </Grid>
      <Grid item md={8} xs={12}>
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
          title="Schedule Information"
          columns={columns}
          data={data}
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
        <DialogTitle id="alert-dialog-title">
          {"UPDATE WORKER SCHEDULE"}
        </DialogTitle>
        <DialogContentText id="alert-dialog-description">
          <Grid container item style={{ padding: "12px", minWidth: "600px" }}>
            <Grid md={6} style={{ padding: "12px" }}>
              <TextField
                id="outlined-basic"
                label="Table Id"
                variant="outlined"
                value={scheduleData.tableId}
                name="tableId"
                fullWidth
                onChange={onScheduleDataChange}
                disabled
              />
            </Grid>
            <Grid md={6} style={{ padding: "12px" }}>
              <TextField
                id="outlined-basic"
                label="Worker Id"
                variant="outlined"
                value={scheduleData.workerId}
                name="workerId"
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
            <Grid md={6} style={{ padding: "12px" }}>
              <TextField
                id="outlined-basic"
                label="Wing"
                variant="outlined"
                value={scheduleData.wing}
                name="wing"
                onChange={onScheduleDataChange}
                fullWidth
              />
            </Grid>{" "}
            <Grid md={6} style={{ padding: "12px" }}>
              <TextField
                id="outlined-basic"
                label="Shift"
                variant="outlined"
                value={scheduleData.shift}
                name="shift"
                onChange={onScheduleDataChange}
                fullWidth
                disabled
              />
            </Grid>
            {/* <Grid
              md={6}
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <FormControl
                variant="outlined"
                fullWidth
                style={{ marginBottom: "12px" }}
              >
                <InputLabel keyid="demo-simple-select-outlined-label">
                  CTR
                </InputLabel>
                <Select
                  labelId="demo-simple-select-outlined-label"
                  id="demo-simple-select-outlined"
                  // value={userdata.supervisorName}
                  name="supervisorName"
                  fullWidth
                  // onChange={onUserChange}
                  label="CTR"
                  // multiple
                >
                  <MenuItem value="">
                    <em>None</em>
                  </MenuItem>
                  {state?.CTR?.length > 0 &&
                    state?.CTR?.map((item, index) => (
                      <MenuItem value={item.ctrs} key={index}>
                        {item.ctrs}
                      </MenuItem>
                    ))}
                </Select>
              </FormControl>
            </Grid> */}
            <Grid md={6}>
              <FormControlLabel
                style={{ marginBottom: "12px" }}
                control={
                  <Switch
                    checked={scheduleData.tableOnOff}
                    onChange={(e) =>
                      setScheduleData({
                        ...scheduleData,
                        tableOnOff: e.target.checked,
                      })
                    }
                    name="machineOnOffStatus"
                    color="primary"
                  />
                }
                label="Table Status"
              />
            </Grid>
          </Grid>
        </DialogContentText>

        <DialogActions>
          <Button
            onClick={handleCloseDialog}
            variant="contained"
            color="secondary"
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
            // onClick={() => console.log(scheduleData)}
            autoFocus
          >
            UPDATE
          </Button>
        </DialogActions>
      </Dialog>
    </Grid>
  );
}

export default Schedule;
