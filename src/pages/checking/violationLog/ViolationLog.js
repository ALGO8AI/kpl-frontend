import React, { useContext, useEffect, useState } from "react";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import { makeStyles } from "@material-ui/core/styles";
// import "./home.css";
import MaterialTable from "material-table";
import ReactPlayer from "react-player";
import Grid from "@material-ui/core/Grid";
import PropTypes from "prop-types";

import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
// import "./setting.css";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormLabel from "@material-ui/core/FormLabel";
import PlayCircleOutlineIcon from "@material-ui/icons/PlayCircleOutline";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import {
  violationDateFilter,
  workerUnavailableViolation,
  feedUnavailableViolation,
  crowdingViolation,
  violationByWorkerF,
  ctr_machineID,
  crowdingViolationChecking,
  workerUnavailableViolationChecking,
  loadTableId,
} from "../../../services/api.service";
import { Link } from "react-router-dom";
// import "./ViolationLog.css";
import * as moment from "moment";
// import { ViolationContext } from "../../context/ViolationContext";
import { AppBar, InputLabel, Tab, Tabs } from "@material-ui/core";
import ViolationTable from "./ViolationTable";
import { CheckingContext } from "../../../context/CheckingContext";
import ImageDialog from "../../../components/imageDialog/ImageDialog";

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <Grid
      spacing={2}
      container
      item
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
      style={{
        marginTop: "8px",
        maxHeight: "50vh",
        overflow: "scroll",
      }}
    >
      {value === index && (
        <Grid container item>
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

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
    backgroundColor: "#fff",
    // padding: "12px 32px 12px 12px",
    borderRadius: "10px",
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));

function ViolationLog1() {
  const { state, dispatch } = React.useContext(CheckingContext);

  const [selectedRow, setSelectedRow] = useState(null);
  const [idLabel, setIdLabel] = useState();
  const [link, setLink] = React.useState("");
  const [img, setImg] = React.useState();
  const [profile, setProfile] = React.useState({
    name: "",
    wid: "",
    role: "",
    floor: "",
    pic: "",
    schedule: "",
    actual: "",
    idealBd: "",
    idealFu: "",
    others: "",
  });
  const [openDialog, setOpenDialog] = React.useState(false);
  const [linkDialog, setLinkDialog] = React.useState("");

  const handleClickOpenDialog = () => {
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };
  const getLink = (datas) => {
    setLinkDialog(datas);
    handleClickOpenDialog();
  };
  const classes = useStyles();

  const refreshData = async () => {
    var curr = new Date(); // get current date
    // console.log(new Date().toISOString().slice(0, 10));
    var first = curr.getDate() - curr.getDay() + 1; // First day is the day of the month - the day of the week
    var firstDay = new Date(curr.setDate(first)).toISOString().slice(0, 10);
    dispatch({ type: "VIO_FROM", payload: firstDay });
    dispatch({
      type: "VIO_TO",
      payload: new Date().toISOString().slice(0, 10),
    });

    const crowd = await crowdingViolationChecking();
    console.log(crowd);
    if (crowd.checkingCrowdingData !== "no data") {
      dispatch({
        type: "CROWD_VIO",
        payload: { data: crowd.checkingCrowdingData, loading: false },
      });
    }

    const worker = await workerUnavailableViolationChecking();
    if (worker.checkingWorkerUnavailableViolation === "no data") {
      dispatch({
        type: "WORKER_VIO",
        payload: {
          data: [],
          loading: false,
        },
      });
    } else {
      dispatch({
        type: "WORKER_VIO",
        payload: {
          data: worker.checkingWorkerUnavailableViolation,
          loading: false,
        },
      });
    }

    const by_worker = await violationByWorkerF();
    dispatch({
      type: "BY_WORKER_VIO",
      payload: {
        data: by_worker.violationByWorkerData,
        loading: false,
      },
    });
  };

  const dateFilter = async () => {
    try {
      const crowd = await crowdingViolationChecking(
        state.violationFrom,
        state.violationTo,
        inputCTR.length > 0 ? inputCTR : clpCtr.map((item) => item.ctrs),
        inputMACHINEid.length > 0
          ? inputMACHINEid
          : machineID.map((item) => item.tableId)
      );
      console.log(crowd);
      if (crowd.crowdingData !== "no data") {
        dispatch({
          type: "CROWD_VIO",
          payload: { data: crowd.crowdingData, loading: false },
        });
      }

      const worker = await workerUnavailableViolationChecking(
        state.violationFrom,
        state.violationTo,
        inputCTR.length > 0 ? inputCTR : clpCtr.map((item) => item.ctrs),
        inputMACHINEid.length > 0
          ? inputMACHINEid
          : machineID.map((item) => item.tableId)
      );
      console.log(worker.checkingWorkerUnavailableViolation);
      if (worker.checkingWorkerUnavailableViolation !== "no data") {
        dispatch({
          type: "WORKER_VIO",
          payload: {
            data: worker.checkingWorkerUnavailableViolation,
            loading: false,
          },
        });
      }

      const by_worker = await violationByWorkerF(
        state.violationFrom,
        state.violationTo,
        inputCTR.length > 0 ? inputCTR : clpCtr.map((item) => item.ctrs),
        inputMACHINEid.length > 0
          ? inputMACHINEid
          : machineID.map((item) => item.machineID)
      );
      console.log(by_worker.violationByWorkerData);
      if (by_worker.violationByWorkerData !== "no data") {
        dispatch({
          type: "BY_WORKER_VIO",
          payload: {
            data: by_worker.violationByWorkerData,
            loading: false,
          },
        });
      }
    } catch (err) {}
  };

  const [clpCtr, setClpCtr] = useState([]);
  const [machineID, setMachineID] = useState([]);
  const [inputCTR, setInputCTR] = useState([]);
  const [inputMACHINEid, setInputMACHINEid] = useState([]);

  const load_ctr_machine = async () => {
    try {
      const ctr = await ctr_machineID();
      setClpCtr(ctr.clpctr);
      // setMachineID(ctr.machineID);

      const tableID = await loadTableId();
      // console.log(tableID);
      setMachineID(tableID.data);

      if (state.crowd.loading) {
        const crowd = await crowdingViolationChecking();
        console.log(crowd);
        if (crowd.checkingCrowdingData !== "no data") {
          dispatch({
            type: "CROWD_VIO",
            payload: { data: crowd.checkingCrowdingData, loading: false },
          });
        }
      }

      if (state.worker.loading) {
        const worker = await workerUnavailableViolationChecking();
        console.log(worker);
        if (worker.checkingWorkerUnavailableViolation === "no data") {
          dispatch({
            type: "WORKER_VIO",
            payload: {
              data: [],
              loading: false,
            },
          });
        } else {
          dispatch({
            type: "WORKER_VIO",
            payload: {
              data: worker.checkingWorkerUnavailableViolation,
              loading: false,
            },
          });
        }
      }

      if (state.by_worker.loading) {
        const by_worker = await violationByWorkerF();
        console.log(by_worker);

        dispatch({
          type: "BY_WORKER_VIO",
          payload: {
            data: by_worker.violationByWorkerData,
            loading: false,
          },
        });
      }
    } catch (err) {
      console.log(err.message);
    }
  };

  const getFirstDay_LastDay = async () => {
    var curr = new Date(); // get current date
    // console.log(new Date().toISOString().slice(0, 10));
    var first = curr.getDate() - curr.getDay() + 1; // First day is the day of the month - the day of the week
    var firstDay = new Date(curr.setDate(first)).toISOString().slice(0, 10);

    if (Boolean(!state.violationFrom)) {
      dispatch({ type: "VIO_FROM", payload: firstDay });
    }

    if (Boolean(!state.violationTo)) {
      dispatch({
        type: "VIO_TO",
        payload: new Date().toISOString().slice(0, 10),
      });
    }
  };

  useEffect(() => {
    getFirstDay_LastDay();
    load_ctr_machine();
  }, []);
  const [tabValue, setTabValue] = React.useState(state.violationTab);

  const handleTabChange = (event, newValue) => {
    // console.log(newValue);
    setTabValue(newValue);
  };

  const rowClick = (event, rowData) => {
    setLink(null);
    setLink(rowData.video);
    setImg(rowData.img);
    setIdLabel(rowData.Id);
    setSelectedRow(rowData.Id);
    if (tabValue === 3) {
      console.log(rowData);
      setProfile({
        name: rowData.name,
        wid: rowData.wid,
        role: rowData.role,
        floor: rowData.floor,
        pic: rowData.pic,
        schedule: rowData.schedule,
        actual: rowData.actual,
        idealBd: rowData.idealBd,
        idealFu: rowData.idealFu,
        others: rowData.others,
      });
      setTimeout(() => {
        console.log(profile);
      }, 2000);
    }
  };
  return (
    <>
      <ImageDialog
        open={openDialog}
        handleClickOpen={handleClickOpenDialog}
        handleClose={handleCloseDialog}
        link={linkDialog}
      />
      <Grid container>
        <Grid
          container
          item
          xs={12}
          spacing={1}
          style={{
            padding: "8px",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Grid item xs={12} md={2}>
            <FormControl
              variant="outlined"
              className={classes.formControl}
              fullWidth
            >
              <InputLabel id="demo-simple-select-outlined-label">
                CTR
              </InputLabel>
              <Select
                labelId="demo-simple-select-outlined-label"
                id="demo-simple-select-outlined"
                multiple
                value={inputCTR}
                onChange={(e) => setInputCTR(e.target.value)}
                label="CTR"
                // multiple
              >
                <MenuItem value="">
                  <em>None</em>
                </MenuItem>
                {clpCtr &&
                  clpCtr.map((item, index) => (
                    <MenuItem value={item.ctrs} key={index}>
                      {item.ctrs}
                    </MenuItem>
                  ))}
              </Select>
            </FormControl>
          </Grid>

          <Grid item xs={12} md={2}>
            <FormControl
              variant="outlined"
              className={classes.formControl}
              fullWidth
            >
              <InputLabel id="demo-simple-select-outlined-label">
                Machine ID
              </InputLabel>
              <Select
                labelId="demo-simple-select-outlined-label"
                id="demo-simple-select-outlined"
                multiple
                value={inputMACHINEid}
                onChange={(e) => setInputMACHINEid(e.target.value)}
                label="Machine ID"
                // multiple
              >
                <MenuItem value="">
                  <em>None</em>
                </MenuItem>
                {machineID &&
                  machineID.map((item, index) => (
                    <MenuItem value={item.machineID} key={index}>
                      {item.machineID}
                    </MenuItem>
                  ))}
              </Select>
            </FormControl>
          </Grid>

          <Grid item xs={12} md={2}>
            <TextField
              id="fromDate"
              label="From"
              type="date"
              value={state.violationFrom}
              className={classes.textField}
              InputLabelProps={{
                shrink: true,
              }}
              onChange={(e) =>
                dispatch({ type: "VIO_FROM", payload: e.target.value })
              }
              fullWidth
              variant="outlined"
            />
          </Grid>

          <Grid item xs={12} md={2}>
            <TextField
              id="toDate"
              label="To"
              type="date"
              value={state.violationTo}
              className={classes.textField}
              InputLabelProps={{
                shrink: true,
              }}
              onChange={(e) =>
                dispatch({ type: "VIO_TO", payload: e.target.value })
              }
              fullWidth
              variant="outlined"
            />
          </Grid>

          <Grid
            container
            item
            xs={12}
            md={2}
            style={{ justifyContent: "center" }}
          >
            <Button
              variant="contained"
              color="primary"
              style={{ margin: "10px" }}
              onClick={dateFilter}
            >
              Filter
            </Button>
          </Grid>

          <Grid
            container
            item
            xs={12}
            md={2}
            style={{ justifyContent: "center" }}
          >
            <Button
              variant="contained"
              color="primary"
              style={{ margin: "10px" }}
              onClick={refreshData}
            >
              Refresh
            </Button>
          </Grid>
        </Grid>
      </Grid>

      <Grid container>
        <Grid xs={12} style={{ textAlign: "center" }}>
          <Typography
            variant="body2"
            style={{ padding: "2px", color: "#f68f1d" }}
          >
            Select to view the violation video
            <br />
            Note: If The video is unable to play, it might be under Process.
          </Typography>
        </Grid>
        <Grid container item xs={12} md={4} style={{ padding: "12px" }}>
          {idLabel ? (
            <Grid
              xs={12}
              style={{
                // backgroundColor: "#f68f1d",
                // color: "white",
                fontWeight: "600",
                fontSize: "16px",
                textAlign: "center",
                alignItems: "center",
                justifyContent: "center",
                display: "flex",
                flexDirection: "column",
              }}
            >
              <Typography
                variant="body1"
                style={{ padding: "6px", color: "#f68f1d" }}
              >
                {" "}
                Violation Id:{" "}
                <span style={{ fontWeight: "bold" }}>{idLabel}</span>
              </Typography>
              {link ? (
                <ReactPlayer
                  key={link}
                  url={link.replace(".avi", ".mp4")}
                  controls={true}
                  //  muted={true}
                  //  playing={false}
                  width="80%"
                  height="auto"
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                />
              ) : (
                <Grid
                  xs={12}
                  style={{
                    backgroundColor: "black",
                    color: "#fff",
                    minHeight: "240px",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <PlayCircleOutlineIcon />
                  <Grid xs={12} md={6}>
                    Select to view the violation video
                  </Grid>
                  <Typography
                    variant="h6"
                    style={{ color: "#0e4a7b", padding: "6px" }}
                  >
                    Note: If The video is unable to play, it might be under
                    Process.
                  </Typography>
                </Grid>
              )}
            </Grid>
          ) : null}
        </Grid>

        <Grid
          container
          item
          xs={12}
          sm={6}
          md={4}
          style={{
            padding: "12px",
            textAlign: "center",
            alignItems: "center",
            justifyContent: "center",
            flexDirection: "column",
          }}
        >
          {img ? (
            <>
              {" "}
              <Typography
                variant="body1"
                style={{ padding: "6px", color: "#f68f1d" }}
              >
                {" "}
                Snapshot 1
              </Typography>
              <img
                src={img}
                onClick={() => getLink(img)}
                style={{ width: "80%" }}
                alt="profile"
              />
            </>
          ) : null}
        </Grid>
        <Grid
          container
          item
          xs={12}
          sm={6}
          md={4}
          style={{
            padding: "12px",
            textAlign: "center",
            alignItems: "center",
            justifyContent: "center",
            flexDirection: "column",
          }}
        >
          {img ? (
            <>
              {" "}
              <Typography
                variant="body1"
                style={{ padding: "6px", color: "#f68f1d" }}
              >
                {" "}
                Snapshot 2
              </Typography>{" "}
              <img
                src={img}
                onClick={() => getLink(img)}
                style={{ width: "80%" }}
                alt="profile"
              />
            </>
          ) : null}
        </Grid>
        {/* <Grid
          container
          item
          md={4}
          xs={12}
          spacing={4}
          style={{ padding: "2rem" }}
        >
          <Grid xs={12}>
            {idLabel ? (
              <Grid
                xs={12}
                style={{
                  backgroundColor: "#f68f1d",
                  color: "white",
                  fontWeight: "600",
                  fontSize: "16px",
                }}
              >
                Violation Id:{idLabel}
              </Grid>
            ) : null}
            {link ? (
              <ReactPlayer
                key={link}
                url={link.replace(".avi", ".mp4")}
                controls={true}
                //  muted={true}
                //  playing={false}
                width="100%"
                height="240px"
                style={{ postition: "fixed" }}
              />
            ) : (
              <Grid
                xs={12}
                style={{
                  backgroundColor: "black",
                  color: "#fff",
                  minHeight: "240px",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <PlayCircleOutlineIcon />
                <Grid xs={12}>Select to view the violation video</Grid>
              </Grid>
            )}
            <Typography
              variant="h6"
              style={{ color: "#0e4a7b", padding: "6px" }}
            >
              Note: If The video is unable to play, it might be under Process.
            </Typography>
            {img ? (
              <Grid xs={12}>
                <img src={img} style={{ width: "100%" }} alt="profile" />
              </Grid>
            ) : null}
          </Grid>
        </Grid> */}
        <Grid item xs={12} md={12} style={{ padding: "1rem" }}>
          <AppBar position="static" className="customTab">
            <Tabs
              value={tabValue}
              onChange={handleTabChange}
              aria-label="simple tabs example"
            >
              <Tab label="Crowding Violation" {...a11yProps(0)} />
              <Tab label="Worker Violation" {...a11yProps(1)} />
              <Tab label="Worker Performance" {...a11yProps(2)} />
              <Tab label="By Table" {...a11yProps(3)} />
            </Tabs>
          </AppBar>

          <TabPanel value={tabValue} index={0}>
            <Grid container item xs={12} style={{ padding: "12px" }}>
              <ViolationTable
                data={state.crowd.data}
                rowClick={rowClick}
                selectedRow={selectedRow}
                columns={[
                  {
                    field: "view",
                    title: "Details",
                    render: (rowData) => (
                      <Link
                        to={`/stitching/violationDetails/${rowData.Id}`}
                        className={`${
                          rowData.query === "Not Resolved"
                            ? "Link-btn-red"
                            : "Link-btn-green"
                        }`}
                        onClick={() => {
                          localStorage.setItem("VIOLATION", "feedUnavailable");
                          localStorage.setItem(
                            "VIOLATION-TYPE",
                            "Crowding Violation"
                          );
                          localStorage.setItem(
                            "VIOLATION-STATUS",
                            rowData.query
                          );
                        }}
                      >
                        View
                      </Link>
                    ),
                  },
                  { title: "Violation ID", field: "Id" },
                  // {
                  //   title: "Status",
                  //   field: "query",
                  //   render: (rowData) => {
                  //     return rowData.query === "Not Resolved" ? (
                  //       <p
                  //         style={{
                  //           color: "rgb(249, 54, 54)",
                  //           backgroundColor: "rgba(249, 54, 54,0.2)",
                  //           padding: "4px 8px",
                  //           borderRadius: "4px",
                  //         }}
                  //       >
                  //         Not Resolved
                  //       </p>
                  //     ) : (
                  //       <p
                  //         style={{
                  //           color: "rgb(74, 170, 22)",
                  //           backgroundColor: "rgba(74, 170, 22,0.2)",
                  //           padding: "4px 8px",
                  //           borderRadius: "4px",
                  //         }}
                  //       >
                  //         Resolved
                  //       </p>
                  //     );
                  //   },
                  // },
                  // { title: "Violation Reason", field: "ViolationReason" },
                  { title: "Camera ID", field: "CamID" },
                  {
                    title: "Date",
                    field: "DateTime",
                    render: (rowData) => {
                      const NewDate = moment(new Date(rowData.DateTime))
                        .format("DD/MM/YYYY")
                        .toString();
                      return NewDate;
                    },
                  },
                  {
                    title: "Crowding Duration(Min.)",
                    field: "CrowdingDuration",
                  },

                  { title: "Crowding Start Time", field: "crowdStartTime" },
                  { title: "Crowding End Time", field: "crowdEndTime" },

                  { title: "Number Of Person", field: "MaxPerson" },
                  // { title: "Person(Min)", field: "MinPerson" },
                  // { title: "Violation Reason", field: "ViolationReason" },
                  { title: "Wing", field: "Wing" },
                  { title: "Shift", field: "shift" },
                ]}
              />
            </Grid>
          </TabPanel>
          <TabPanel value={tabValue} index={1}>
            <Grid container item xs={12} style={{ padding: "12px" }}>
              <ViolationTable
                data={state.worker.data}
                rowClick={rowClick}
                selectedRow={selectedRow}
                columns={[
                  {
                    field: "view",
                    title: "Details",
                    render: (rowData) => (
                      <Link
                        to={`/checking/violationDetails/${rowData.Id}`}
                        className={`${
                          rowData.query === "Not Resolved"
                            ? "Link-btn-red"
                            : "Link-btn-green"
                        }`}
                      >
                        View
                      </Link>
                    ),
                  },
                  { title: "Violation ID", field: "Id" },

                  // {
                  //   title: "Status",
                  //   field: "query",
                  //   render: (rowData) => {
                  //     return rowData.query === "Not Resolved" ? (
                  //       <p
                  //         style={{
                  //           color: "rgb(249, 54, 54)",
                  //           backgroundColor: "rgba(249, 54, 54,0.2)",
                  //           padding: "4px 8px",
                  //           borderRadius: "4px",
                  //         }}
                  //       >
                  //         Not Resolved
                  //       </p>
                  //     ) : (
                  //       <p
                  //         style={{
                  //           color: "rgb(74, 170, 22)",
                  //           backgroundColor: "rgba(74, 170, 22,0.2)",
                  //           padding: "4px 8px",
                  //           borderRadius: "4px",
                  //         }}
                  //       >
                  //         Resolved
                  //       </p>
                  //     );
                  //   },
                  // },
                  {
                    title: "Date",
                    field: "date",
                    render: (rowData) => {
                      const NewDate = moment(new Date(rowData.date))
                        .format("DD/MM/YYYY")
                        .toString();
                      return NewDate;
                    },
                  },
                  { title: "Worker Name", field: "workerName" },

                  { title: "Worker Id", field: "workerID" },
                  {
                    title: "Violation Duration(Min.)",
                    field: "ViolationDuration",
                  },

                  { title: "Start Time", field: "startTime" },
                  { title: "End Time", field: "endTime" },
                  // { title: "Machine ID", field: "machineID" },
                  { title: "Wing", field: "wing" },
                ]}
              />
            </Grid>
          </TabPanel>

          <TabPanel value={tabValue} index={2}>
            <Grid container item xs={12} style={{ padding: "12px" }}>
              <ViolationTable
                data={state.by_worker.data}
                rowClick={rowClick}
                selectedRow={selectedRow}
                columns={[
                  { title: "Worker ID", field: "workerId" },
                  { title: "Worker Name", field: "workerName" },
                  {
                    title: "Table ID",
                    field: "machineId",
                  },
                  {
                    title: "Feed N/A Duration(Hrs.)",
                    field: "feedUnavailibilityDuration",
                  },
                  {
                    title: "Worker N/A Duration(Hrs.)",
                    field: "workerUnavailableViolationDuration",
                  },
                  { title: "Shift", field: "shift" },
                ]}
              />
            </Grid>
          </TabPanel>

          <TabPanel value={tabValue} index={3}>
            <Grid container item xs={12} style={{ padding: "12px" }}>
              <ViolationTable
                data={state.by_worker.data}
                rowClick={rowClick}
                selectedRow={selectedRow}
                columns={[
                  { title: "Worker ID", field: "workerId" },
                  { title: "Worker Name", field: "workerName" },
                  {
                    title: "Table ID",
                    field: "machineId",
                  },
                  {
                    title: "Feed N/A Duration(Hrs.)",
                    field: "feedUnavailibilityDuration",
                  },
                  {
                    title: "Worker N/A Duration(Hrs.)",
                    field: "workerUnavailableViolationDuration",
                  },
                ]}
              />
            </Grid>
          </TabPanel>
        </Grid>
      </Grid>
    </>
  );
}

export default ViolationLog1;
