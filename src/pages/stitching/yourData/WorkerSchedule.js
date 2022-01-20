/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import Grid from "@material-ui/core/Grid";
import { DropzoneArea } from "material-ui-dropzone";
import CloudUploadIcon from "@material-ui/icons/CloudUpload";
import MaterialTable from "material-table";
import PropTypes from "prop-types";
import Paper from "@material-ui/core/Paper";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TablePagination from "@material-ui/core/TablePagination";
import TableRow from "@material-ui/core/TableRow";
import {
  addStitchingWorkerSchedule,
  copyScheduleStitching,
  ctr_machineID,
  deleteStitchingWorkerSchedule,
  getAllWorketrList,
  updateStitchingWorkerSchedule,
} from "../../../services/api.service";
import axios from "axios";
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
  withStyles,
} from "@material-ui/core";
import FilterListIcon from "@material-ui/icons/FilterList";
import RefreshIcon from "@material-ui/icons/Refresh";
import { StitchingContext } from "../../../context/StitchingContext";
import moment from "moment";
import { useDispatch } from "react-redux";
import {
  openSnackbar,
  openSnackbar_FROM,
  openSnackbar_TO,
} from "../../../redux/CommonReducer/CommonAction";
import { weekRange } from "../../../Utility/DateRange";
import { theme as THEME, wings } from "../../../Utility/constants";

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

function WorkerSchedule(props) {
  const { state, dispatch } = React.useContext(StitchingContext);

  // table state
  const StyledTableCell = withStyles((theme) => ({
    head: {
      backgroundColor: THEME.BLUE,
      color: theme.palette.common.white,
      fontSize: 16,
    },
    body: {
      fontSize: 24,
    },
  }))(TableCell);
  const StyledTableDataCell = withStyles((theme) => ({
    head: {
      fontSize: 16,
    },
  }))(TableCell);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  // state
  const [file, setFile] = React.useState();
  const [updateMode, setUpdateMode] = React.useState(false);
  const [inputData, setInputData] = React.useState({
    filterDateFrom: "",
    filterDateTo: "",
  });
  const [workerScheduleData, setWorkerScheduleData] = useState([]);
  const [workerList, setWorkerList] = React.useState([]);
  const [scheduleInput, setScheduleInput] = React.useState({
    workerId: "",
    workerName: "",
    date: "",
    wing: "",
    shift: "",
    machineId: "",
    machineOnOffStatus: 0,
    id: "",
  });

  const [value, setValue] = React.useState(0);

  // redux dispatch
  const Dispatch = useDispatch();

  // functions

  // TABCHANGE
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  // INITIAL DATA CALL
  const loadData = async () => {
    try {
      const ctr = await ctr_machineID();
      dispatch({
        type: "MACHINE_ID",
        payload: ctr.machineID,
      });
      const worker = await getAllWorketrList();
      setWorkerList(worker.data);
      const x = await getYourData();
      setWorkerScheduleData(x.latestScheduleData);
    } catch (err) {}
  };

  // FILTER
  const filterData = async () => {
    try {
      const x = await getYourData(inputData);
      setWorkerScheduleData(x.latestScheduleData);
    } catch (err) {}
  };

  // ADDING
  const addSchedule = async () => {
    try {
      setWorkerScheduleData([
        {
          ...scheduleInput,
          date: new Date(scheduleInput.date).toISOString(),
          Date: new Date(scheduleInput.date).toISOString(),
        },
        ...workerScheduleData,
      ]);
      const resp = await addStitchingWorkerSchedule(scheduleInput);
      if (resp?.msg === "Successfully Added") {
        Dispatch(openSnackbar(true, "success", "Schedule Added Successfully"));
        loadData();
      }
    } catch (e) {
      console.log(e);
    }
  };

  // UPDATING
  const updateSchedule = async () => {
    try {
      setWorkerScheduleData(
        workerScheduleData.map((item) =>
          item.id !== scheduleInput.id ? item : { ...item, ...scheduleInput }
        )
      );
      const resp = await updateStitchingWorkerSchedule(scheduleInput);
      console.log("Worker Update->", resp);
      if (resp?.msg) {
        setUpdateMode(false);
        setScheduleInput({
          workerId: "",
          workerName: "",
          date: "",
          wing: "",
          shift: "",
          machineId: "",
          machineOnOffStatus: 0,
          id: "",
        });
        Dispatch(
          openSnackbar(true, "success", "Schedule Updated Successfully")
        );

        loadData();
      }
    } catch (e) {
      console.log(e);
    }
  };

  // DELETING
  const deleteSchedule = async (id) => {
    console.log(workerScheduleData);
    try {
      const confirm = window.confirm(
        "Are you sure you want to delete the schedule?"
      );
      if (confirm) {
        setWorkerScheduleData(
          workerScheduleData.filter((item) => item.id !== id)
        );
        const resp = await deleteStitchingWorkerSchedule({ id });
        if (resp?.message) {
          Dispatch(openSnackbar(true, "success", "Schedule Deleted"));
          loadData();
        }
      } else {
        Dispatch(openSnackbar(true, "error", "Operation Cancelled"));
      }
    } catch (e) {}
  };

  // copy
  const copy = async () => {
    try {
      const response = await copyScheduleStitching();
      Dispatch(openSnackbar(true, "success", "Schedule Copied Successfully"));
      loadData();
    } catch (e) {}
  };

  // FILE INPUT
  const handleFileChange = (files) => {
    // console.log(files[0])
    setFile(files[0]);
    // console.log(file)
  };

  // FILE SUBMISION
  const submit = async () => {
    if (file) {
      const formData = new FormData();
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
                  //   Dispatch(openSnackbar(true, "success", "File Uploaded"));
                } else {
                  //   Dispatch(openSnackbar(true, "error", "Error"));
                }
              } else {
                // Dispatch(openSnackbar(true, "error", "Database Error"));
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

  // DROPDOWN USER SELECTION
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

  // USE EFFECT
  useEffect(() => {
    loadData();
    setInputData({
      filterDateFrom: weekRange()[0],
      filterDateTo: weekRange()[1],
    });
  }, []);

  return (
    <Grid container spacing={4}>
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
                workerList
                  ?.sort((a, b) => (a?.workerName > b?.workerName ? 1 : -1))
                  ?.map((item, index) => (
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
              Machine Id
            </InputLabel>
            <Select
              labelId="demo-simple-select-outlined-label"
              id="demo-simple-select-outlined"
              value={scheduleInput?.machineId}
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
              {state.machineIDs.length > 0 &&
                state.machineIDs
                  ?.sort((a, b) => (a?.machineID > b?.machineID ? 1 : -1))
                  .map((item, index) => (
                    <MenuItem value={item.machineID} key={index}>
                      {item.machineID}
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
            value={scheduleInput.date}
            onChange={(e) =>
              setScheduleInput({
                ...scheduleInput,
                date: e.target.value,
              })
            }
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
              name="supervisorName"
              fullWidth
              value={scheduleInput.wing}
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
              {wings.map((item, index) => (
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
              // value={userdata.supervisorName}
              name="supervisorName"
              fullWidth
              value={scheduleInput.shift}
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
                checked={
                  Boolean(scheduleInput?.machineOnOffStatus) ? true : false
                }
                onChange={(e) =>
                  setScheduleInput({
                    ...scheduleInput,
                    machineOnOffStatus: e.target.checked ? 1 : 0,
                  })
                }
                name="machineOnOffStatus"
                color="primary"
              />
            }
            label="Machine Status"
          />
          {/*  */}
          {updateMode ? (
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
                    setUpdateMode(false);
                    setScheduleInput({
                      workerId: "",
                      workerName: "",
                      date: "",
                      wing: "",
                      shift: "",
                      machineId: "",
                      machineOnOffStatus: 0,
                      id: "",
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
                  onClick={updateSchedule}
                >
                  UPDATE
                </Button>
              </Grid>
            </Grid>
          ) : (
            <Grid container item xs={12} style={{ padding: "6px" }}>
              <Button
                variant="contained"
                color="primary"
                fullWidth
                onClick={addSchedule}
              >
                Save
              </Button>
            </Grid>
          )}
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
          // onClick={() => console.log(workerScheduleData)}
        >
          COPY TABLE
        </Button>
        <Paper style={{ width: "100%", marginTop: "16px" }}>
          <TableContainer style={{ width: "100%" }}>
            <Table stickyHeader aria-label="sticky table">
              <TableHead style={{ backgroundColor: "red" }}>
                <TableRow>
                  {[
                    "Date",
                    "Worker ID",
                    "Worker Name",
                    "Shift",
                    "Wing",
                    "Machine ID",
                    "Machine Status",
                    "Edit",
                    "Delete",
                  ].map((column) => (
                    <StyledTableCell
                      key={column.id}
                      align={column.align}
                      style={{ minWidth: column.minWidth }}
                    >
                      {column}
                    </StyledTableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {workerScheduleData
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((row) => {
                    return (
                      <TableRow
                        hover
                        role="checkbox"
                        tabIndex={-1}
                        key={row.code}
                      >
                        <StyledTableDataCell>
                          {moment(new Date(row.Date))
                            .format("DD/MM/YYYY")
                            .toString()}
                        </StyledTableDataCell>
                        <StyledTableDataCell>
                          {row.workerId}
                        </StyledTableDataCell>
                        <StyledTableDataCell>
                          {row.workerName}
                        </StyledTableDataCell>
                        <StyledTableDataCell>{row.shift}</StyledTableDataCell>
                        <StyledTableDataCell>{row.wing}</StyledTableDataCell>
                        <StyledTableDataCell>
                          {row.machineId}
                        </StyledTableDataCell>
                        <StyledTableDataCell>
                          {Boolean(row.machineOnOffStatus) ? "On" : "Off"}
                        </StyledTableDataCell>
                        <StyledTableDataCell>
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
                              setUpdateMode(true);
                              setScheduleInput({
                                workerId: row.workerId,
                                workerName: row.workerName,
                                date: new Date(row.Date)
                                  .toISOString()
                                  .slice(0, 10),
                                wing: row.wing,
                                shift: row.shift,
                                machineId: row.machineId,
                                machineOnOffStatus: row.machineOnOffStatus,
                                id: row.id,
                              });
                            }}
                          >
                            EDIT
                          </button>
                        </StyledTableDataCell>
                        <StyledTableDataCell>
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
                            onClick={() => deleteSchedule(row.id)}
                          >
                            DELETE
                          </button>
                        </StyledTableDataCell>
                      </TableRow>
                    );
                  })}
              </TableBody>
            </Table>
          </TableContainer>
          <TablePagination
            rowsPerPageOptions={[10, 25, 100]}
            component="div"
            count={workerScheduleData.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </Paper>
      </Grid>
    </Grid>
  );
}

export default WorkerSchedule;
