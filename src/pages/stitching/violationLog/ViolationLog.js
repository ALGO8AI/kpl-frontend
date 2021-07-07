import React, { useEffect, useState } from "react";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import { makeStyles } from "@material-ui/core/styles";
import ReactPlayer from "react-player";
import Grid from "@material-ui/core/Grid";
import PropTypes from "prop-types";
import FilterListIcon from "@material-ui/icons/FilterList";
import RefreshIcon from "@material-ui/icons/Refresh";
import Typography from "@material-ui/core/Typography";

import PlayCircleOutlineIcon from "@material-ui/icons/PlayCircleOutline";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import {
  workerUnavailableViolation,
  feedUnavailableViolation,
  crowdingViolation,
  violationByWorkerF,
  ctr_machineID,
  getMachineViolation,
  postMachineViolation,
} from "../../../services/api.service";
import { Link } from "react-router-dom";
// import "./ViolationLog.css";
import * as moment from "moment";
// import { ViolationContext } from "../../context/ViolationContext";
import { AppBar, InputLabel, Tab, Tabs } from "@material-ui/core";
import ViolationTable from "./ViolationTable";
import { StitchingContext } from "../../../context/StitchingContext";

import ImageDialog from "../../../components/imageDialog/ImageDialog";
import WorkerPerformanceTable from "./WorkerPerformanceTable";

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <Grid
      // spacing={2}
      container
      item
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
      style={{
        // marginTop: "8px",
        maxHeight: "90vh",
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
  // context
  const { state, dispatch } = React.useContext(StitchingContext);

  const [selectedRow, setSelectedRow] = useState(null);
  const [idLabel, setIdLabel] = useState();
  const [link, setLink] = React.useState("");
  const [img, setImg] = React.useState("");
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
    try {
      var myDate = new Date();
      var newDateWeekBack = new Date(
        myDate.getTime() - 60 * 60 * 24 * 7 * 1000
      );

      dispatch({
        type: "VIO_FROM",
        payload: newDateWeekBack.toISOString().slice(0, 10),
      });

      dispatch({
        type: "VIO_TO",
        payload: myDate.toISOString().slice(0, 10),
      });

      const feed = await feedUnavailableViolation();
      // state.violationFrom,
      // state.violationTo
      console.log(feed.feedUnavailableData);
      dispatch({
        type: "FEED_VIO",
        payload: { data: feed.feedUnavailableData, loading: false },
      });

      const machineVio = await getMachineViolation();
      dispatch({
        type: "MACHINE_VIO",
        payload: {
          data: machineVio.machineBreakdownViolationtable,
          loading: false,
        },
      });

      const crowd = await crowdingViolation();
      // state.violationFrom,
      // state.violationTo
      console.log(crowd.crowdingData);
      if (crowd.crowdingData !== "no data") {
        dispatch({
          type: "CROWD_VIO",
          payload: { data: crowd.crowdingData, loading: false },
        });
      }

      const worker = await workerUnavailableViolation();
      // state.violationFrom,
      // state.violationTo
      console.log(worker.workerUnavailableDurationData);
      if (worker.workerUnavailableDurationData !== "no data") {
        dispatch({
          type: "WORKER_VIO",
          payload: {
            data: worker.workerUnavailableDurationData,
            loading: false,
          },
        });
      }

      const by_worker = await violationByWorkerF();
      // state.violationFrom,
      // state.violationTo
      console.log(by_worker.violationByWorkerData);
      dispatch({
        type: "BY_WORKER_VIO",
        payload: {
          data: by_worker.violationByWorkerData,
          loading: false,
        },
      });
    } catch (e) {}
  };

  const dateFilter = async () => {
    try {
      const machineViolation = await getMachineViolation(
        state.violationFrom,
        state.violationTo,
        inputMACHINEid.length > 0
          ? inputMACHINEid
          : machineID.map((item) => item.machineID),
        inputSHIFT
      );
      // console.log(machineViolation);
      dispatch({
        type: "MACHINE_VIO",
        payload: {
          data: machineViolation.machineBreakdownViolationtable,
          loading: false,
        },
      });
      const feed = await feedUnavailableViolation(
        state.violationFrom,
        state.violationTo,
        inputCTR.length > 0 ? inputCTR : clpCtr.map((item) => item.ctrs),
        inputMACHINEid.length > 0
          ? inputMACHINEid
          : machineID.map((item) => item.machineID),
        inputSHIFT
      );
      if (feed.feedUnavailableData !== "no data") {
        dispatch({
          type: "FEED_VIO",
          payload: { data: feed.feedUnavailableData, loading: false },
        });
      } else {
        dispatch({
          type: "FEED_VIO",
          payload: { data: [], loading: false },
        });
      }

      const crowd = await crowdingViolation(
        state.violationFrom,
        state.violationTo,
        inputCTR.length > 0 ? inputCTR : clpCtr.map((item) => item.ctrs),
        inputMACHINEid.length > 0
          ? inputMACHINEid
          : machineID.map((item) => item.machineID),
        inputSHIFT
      );
      if (crowd.crowdingData !== "no data") {
        dispatch({
          type: "CROWD_VIO",
          payload: { data: crowd.crowdingData, loading: false },
        });
      } else {
        dispatch({
          type: "CROWD_VIO",
          payload: { data: [], loading: false },
        });
      }

      const worker = await workerUnavailableViolation(
        state.violationFrom,
        state.violationTo,
        inputCTR.length > 0 ? inputCTR : clpCtr.map((item) => item.ctrs),
        inputMACHINEid.length > 0
          ? inputMACHINEid
          : machineID.map((item) => item.machineID),
        inputSHIFT
      );
      if (worker.workerUnavailableDurationData !== "no data") {
        dispatch({
          type: "WORKER_VIO",
          payload: {
            data: worker.workerUnavailableDurationData,
            loading: false,
          },
        });
      } else {
        dispatch({
          type: "WORKER_VIO",
          payload: {
            data: [],
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
          : machineID.map((item) => item.machineID),
        inputSHIFT
      );
      if (by_worker.violationByWorkerData !== "no data") {
        dispatch({
          type: "BY_WORKER_VIO",
          payload: {
            data: by_worker.violationByWorkerData,
            loading: false,
          },
        });
      } else {
        dispatch({
          type: "BY_WORKER_VIO",
          payload: {
            data: [],
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
  const [inputSHIFT, setInputSHIFT] = useState([]);

  const load_ctr_machine = async () => {
    try {
      const ctr = await ctr_machineID();
      setClpCtr(ctr.clpctr);
      setMachineID(ctr.machineID);

      // if (state.feed.loading) {
      const feed = await feedUnavailableViolation(
        state.violationFrom,
        state.violationTo
      );
      console.log(feed.feedUnavailableData);
      dispatch({
        type: "FEED_VIO",
        payload: { data: feed.feedUnavailableData, loading: false },
      });
      // }
      // if (state.machine.loading) {
      const machineVio = await getMachineViolation();
      console.log(machineVio);
      dispatch({
        type: "MACHINE_VIO",
        payload: {
          data: machineVio.machineBreakdownViolationtable,
          loading: false,
        },
      });
      // }

      // if (state.crowd.loading) {
      const crowd = await crowdingViolation(
        state.violationFrom,
        state.violationTo
      );
      if (crowd.crowdingData !== "no data") {
        dispatch({
          type: "CROWD_VIO",
          payload: { data: crowd.crowdingData, loading: false },
        });
      }
      // }

      // if (state.worker.loading) {
      const worker = await workerUnavailableViolation(
        state.violationFrom,
        state.violationTo
      );
      if (worker.workerUnavailableDurationData !== "no data") {
        dispatch({
          type: "WORKER_VIO",
          payload: {
            data: worker.workerUnavailableDurationData,
            loading: false,
          },
        });
      }
      // }

      // if (state.by_worker.loading) {
      const by_worker = await violationByWorkerF(
        state.violationFrom,
        state.violationTo
      );
      dispatch({
        type: "BY_WORKER_VIO",
        payload: {
          data: by_worker.violationByWorkerData,
          loading: false,
        },
      });
      // }
    } catch (err) {
      console.log(err.message);
    }
  };

  const getFirstDay_LastDay = async () => {
    var myDate = new Date();
    var newDateWeekBack = new Date(myDate.getTime() - 60 * 60 * 24 * 7 * 1000);

    if (Boolean(!state.violationFrom)) {
      dispatch({
        type: "VIO_FROM",
        payload: newDateWeekBack.toISOString().slice(0, 10),
      });
    }

    if (Boolean(!state.violationTo)) {
      dispatch({
        type: "VIO_TO",
        payload: myDate.toISOString().slice(0, 10),
      });
    }
  };

  useEffect(() => {
    getFirstDay_LastDay();
    load_ctr_machine();
  }, []);
  // const [state.violationTab, setTabValue] = React.useState(state.violationTab);

  const handleTabChange = (event, newValue) => {
    dispatch({ type: "VIOLATION_TAB", payload: newValue });
    setLink("");
    setImg("");
    setIdLabel();

    // setTabValue(newValue);
  };

  const rowClick = (evt, rowData) => {
    // setLink(null);
    setLink(rowData.video);
    setImg(rowData.img);
    setIdLabel(rowData.Id);
    setSelectedRow(rowData.Id);
    if (state.violationTab === 3) {
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

  const returnClassName = (type) => {
    switch (type) {
      case "INCORRECT VIOLATION":
        return "Link-btn-grey";
      case "OPEN":
        return "Link-btn-red";
      case "CLOSED":
        return "Link-btn-green";
      default:
        return "Link-btn-red";
    }
  };

  const returnStatus = (type) => {
    switch (type) {
      case "INCORRECT VIOLATION":
        return "Incorrect";
      case "OPEN":
        return "Unresolved";
      case "CLOSED":
        return "Resolved";
      default:
        return "Unresolved";
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
          <Grid item xs={6} sm={6} md={2}>
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

          <Grid item xs={6} sm={6} md={2}>
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

          <Grid item xs={6} sm={6} md={2}>
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

          <Grid item xs={6} sm={6} md={2}>
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
            sm={6}
            lg={2}
            style={{ justifyContent: "center" }}
          >
            <FormControl
              variant="outlined"
              fullWidth
              style={{ marginRight: "6px" }}
            >
              <InputLabel id="demo-simple-select-outlined-label">
                Shift
              </InputLabel>
              <Select
                labelId="demo-simple-select-outlined-label"
                id="demo-simple-select-outlined"
                multiple
                value={inputSHIFT}
                onChange={(e) => setInputSHIFT(e.target.value)}
                label="Shift"
                // multiple
              >
                <MenuItem value="">
                  <em>None</em>
                </MenuItem>
                <MenuItem value="A">A</MenuItem>
                <MenuItem value="B">B</MenuItem>
              </Select>
            </FormControl>
          </Grid>

          <Grid
            container
            item
            xs={6}
            md={1}
            sm={6}
            style={{ justifyContent: "center" }}
          >
            <Button
              variant="contained"
              color="primary"
              style={{ margin: "10px" }}
              onClick={dateFilter}
            >
              <FilterListIcon />
              Filter
            </Button>
          </Grid>

          <Grid
            container
            item
            xs={6}
            md={1}
            sm={6}
            style={{ justifyContent: "center" }}
          >
            <Button
              variant="contained"
              color="primary"
              style={{ margin: "10px" }}
              onClick={() => {
                refreshData();
                setInputCTR([]);
                setInputMACHINEid([]);
                setInputSHIFT([]);
              }}
            >
              <RefreshIcon />
              Refresh
            </Button>
          </Grid>
        </Grid>
      </Grid>

      <Grid container>
        {/* <Grid xs={12} style={{ textAlign: "center" }}>
          <Typography
            variant="body2"
            style={{ padding: "2px", color: "#f68f1d" }}
          >
            Select to view the violation video
            <br />
            Note: If The video is unable to play, it might be under Process.
          </Typography>
        </Grid> */}
        {/* <Grid container item xs={12} md={4} style={{ padding: "12px" }}>
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
                <span srtle={{ fontWeight: "bold" }}>{idLabel}</span>
              </Typography>
              {link && (
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
              )}
            </Grid>
          ) : null}
        </Grid> */}

        {/* <Grid
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
        </Grid> */}

        <Grid item xs={12} md={12} style={{ padding: "1rem" }}>
          <AppBar position="static" className="customTab">
            <Tabs
              value={state.violationTab}
              onChange={handleTabChange}
              aria-label="simple tabs example"
              variant="scrollable"
              scrollButtons="auto"
            >
              <Tab label="Feed Unavailable" {...a11yProps(0)} />
              <Tab label="Crowding Violation" {...a11yProps(1)} />
              <Tab label="Worker Violation" {...a11yProps(2)} />
              <Tab label="Machine Violation" {...a11yProps(3)} />
              <Tab label="Worker Performance" {...a11yProps(4)} />
            </Tabs>
          </AppBar>

          <TabPanel value={state.violationTab} index={0}>
            <Grid container item xs={12} style={{ padding: "12px" }}>
              <ViolationTable
                data={state.feed.data}
                rowClick={rowClick}
                selectedRow={selectedRow}
                columns={[
                  {
                    field: "view",
                    title: "Details",
                    render: (rowData) => (
                      <Link
                        to={`/stitching/violationDetails/${rowData.Id}`}
                        className={returnClassName(rowData.actionStatus)}
                        // className={`${
                        //   rowData.query === "Not Resolved"
                        //     ? "Link-btn-red"
                        //     : "Link-btn-green"
                        // }`}
                        onClick={() => {
                          localStorage.setItem("VIOLATION", "feedUnavailable");
                          localStorage.setItem(
                            "VIOLATION-TYPE",
                            "Feed Unavailable"
                          );
                          localStorage.setItem(
                            "VIOLATION-STATUS",
                            returnStatus(rowData.actionStatus)
                          );
                        }}
                      >
                        {returnStatus(rowData.actionStatus)}
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
                    field: "DateTime",
                    render: (rowData) => {
                      const NewDate = moment(new Date(rowData.DateTime))
                        .format("DD/MM/YYYY")
                        .toString();
                      return NewDate;
                    },
                  },
                  { title: "Worker Name", field: "workerName" },
                  { title: "Worker ID", field: "WorkerID" },

                  {
                    title: "Violation Duration(Min.)",
                    field: "UnavailableDuration",
                  },
                  { title: "Start Time", field: "StartTime" },

                  { title: "End Time", field: "EndTime" },
                  { title: "Feed ID", field: "FeedID" },

                  { title: "Machine ID", field: "MachineID" },

                  { title: "Wing", field: "Wing" },
                  { title: "Shift", field: "shift" },
                  // { title: "Violation Reason", field: "violationReason" },
                  // { title: "Action", field: "actionStatus" },
                  { title: "Supervisor Name", field: "supervisorName" },
                ]}
              />
            </Grid>
          </TabPanel>

          <TabPanel value={state.violationTab} index={1}>
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
                        className={returnClassName(rowData.actionStatus)}
                        // className={`${
                        //   rowData.query === "Not Resolved"
                        //     ? "Link-btn-red"
                        //     : "Link-btn-green"
                        // }`}
                        onClick={() => {
                          localStorage.setItem("VIOLATION", "crowding");
                          localStorage.setItem(
                            "VIOLATION-TYPE",
                            "Crowding Violation"
                          );
                          localStorage.setItem(
                            "VIOLATION-STATUS",
                            returnStatus(rowData.actionStatus)
                          );
                        }}
                      >
                        {returnStatus(rowData.actionStatus)}
                      </Link>
                    ),
                  },
                  { title: "Violation ID", field: "Id" },
                  // {
                  //   title: "Status",
                  // render: (rowData) => {
                  //   return rowData.status === 0 ? (
                  //     <p
                  //       style={{
                  //         color: "rgb(249, 54, 54)",
                  //         backgroundColor: "rgba(249, 54, 54,0.2)",
                  //         padding: "4px 8px",
                  //         borderRadius: "4px",
                  //       }}
                  //     >
                  //       Not Resolved
                  //     </p>
                  //   ) : (
                  //     <p
                  //       style={{
                  //         color: "rgb(74, 170, 22)",
                  //         backgroundColor: "rgba(74, 170, 22,0.2)",
                  //         padding: "4px 8px",
                  //         borderRadius: "4px",
                  //       }}
                  //     >
                  //       Resolved
                  //     </p>
                  //   );
                  // },
                  // },
                  // {
                  //   title: "Status",
                  //   // field: "query",
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
                    title: "Violation Duration(Min.)",
                    field: "CrowdingDuration",
                  },
                  { title: "Start Time", field: "crowdStartTime" },
                  { title: "End Time", field: "crowdEndTime" },

                  { title: "Person(Max)", field: "MaxPerson" },
                  // { title: "Person(Min)", field: "MinPerson" },
                  // { title: "Violation Reason", field: "ViolationReason" },
                  { title: "Wing", field: "Wing" },
                  { title: "Shift", field: "shift" },
                  // { title: "Violation Reason", field: "violationReason" },
                  // { title: "Action", field: "actionStatus" },

                  { title: "Supervisor Name", field: "supervisorName" },
                ]}
              />
            </Grid>
          </TabPanel>
          <TabPanel value={state.violationTab} index={2}>
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
                        to={`/stitching/violationDetails/${rowData.Id}`}
                        // className={`${
                        //   rowData.query === "Not Resolved"
                        //     ? "Link-btn-red"
                        //     : "Link-btn-green"
                        // }`}
                        className={returnClassName(rowData.actionStatus)}
                        onClick={() => {
                          localStorage.setItem("VIOLATION", "worker");
                          localStorage.setItem(
                            "VIOLATION-TYPE",
                            "Worker Violation"
                          );
                          localStorage.setItem(
                            "VIOLATION-STATUS",
                            returnStatus(rowData.actionStatus)
                          );
                        }}
                      >
                        {returnStatus(rowData.actionStatus)}
                      </Link>
                    ),
                  },
                  { title: "Violation ID", field: "Id" },
                  // {
                  //   title: "Status",
                  //   render: (rowData) => {
                  //     return rowData.status === 0 ? (
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
                  { title: "Worker ID", field: "workerID" },
                  { title: "Machine ID", field: "machineId" },

                  {
                    title: "Violation Duration(Min.)",
                    field: "ViolationDuration",
                  },
                  { title: "Start Time", field: "startTime" },
                  { title: "End Time", field: "endTime" },

                  { title: "Wing", field: "wing" },
                  { title: "Shift", field: "shift" },
                  // { title: "Violation Reason", field: "violationReason" },
                  // { title: "Action", field: "actionStatus" },

                  { title: "Supervisor Name", field: "supervisorName" },
                ]}
              />
            </Grid>
          </TabPanel>

          <TabPanel value={state.violationTab} index={4}>
            <Grid container item xs={12} style={{ padding: "12px" }}>
              <WorkerPerformanceTable
                // title=""
                data={state.by_worker.data}
                // rowClick={rowClick}
                columns={[
                  { title: "Worker ID", field: "workerId" },
                  { title: "Worker Name", field: "workerName" },

                  {
                    title: "Machine ID",
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
                  {
                    title: "Shift",
                    field: "shift",
                  },
                ]}
              />
            </Grid>
          </TabPanel>
          <TabPanel value={state.violationTab} index={3}>
            <Grid container item xs={12} style={{ padding: "12px" }}>
              <ViolationTable
                // title=""
                data={state.machine.data}
                rowClick={rowClick}
                columns={[
                  {
                    field: "view",
                    title: "Details",
                    render: (rowData) => (
                      <Link
                        to={`/stitching/violationDetails/${rowData.Id}`}
                        // className={"Link-btn-red"}
                        className={returnClassName(rowData.actionStatus)}
                        onClick={() => {
                          localStorage.setItem("VIOLATION", "mechineViolation");
                          localStorage.setItem(
                            "VIOLATION-TYPE",
                            "Machine Violation"
                          );
                          localStorage.setItem(
                            "VIOLATION-STATUS",
                            returnStatus(rowData.actionStatus)
                          );
                        }}
                      >
                        {returnStatus(rowData.actionStatus)}
                      </Link>
                    ),
                  },
                  {
                    title: "Violation Id",
                    field: "Id",
                  },
                  {
                    title: "Date",
                    field: "DateTime",
                    render: (rowData) => {
                      const NewDate = moment(new Date(rowData.Date_Hour))
                        .format("DD/MM/YYYY")
                        .toString();
                      return NewDate;
                    },
                  },
                  // {
                  //   title: "Time",
                  //   field: "DateTime",
                  //   render: (rowData) => {
                  //     const NewDate = moment(rowData.Date_Hour).format(
                  //       "hh:mm a"
                  //     );
                  //     return NewDate;
                  //   },
                  // },
                  {
                    title: "Worker Name",
                    field: "workerName",
                  },
                  {
                    title: "Worker Id",
                    field: "workerId",
                  },
                  {
                    title: "Breakdown (Mins.)",
                    field: "OffMinutes",
                  },

                  { title: "Start Time", field: "startTime" },
                  { title: "End Time", field: "endTime" },
                  {
                    title: "Machine Id",
                    field: "machineId",
                  },
                  {
                    title: "Wing",
                    field: "wing",
                  },
                  {
                    title: "Shift",
                    field: "shift",
                  },
                  // { title: "Violation Reason", field: "violationReason" },
                  // { title: "Action", field: "actionStatus" },

                  { title: "Supervisor Name", field: "supervisorName" },
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
