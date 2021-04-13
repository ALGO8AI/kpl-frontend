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
      style={{ marginTop: "8px" }}
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
  const [crowdingData, setCrowdingData] = useState([]);
  const [feedUnavailableData, setFeedUnavailableData] = useState([]);
  const [workerViolation, setWorkerViolation] = useState([]);
  const [violationByWorker, setViolationByWorker] = useState([]);
  const [selectedRow, setSelectedRow] = useState(null);
  const [idLabel, setIdLabel] = useState();
  const [value, setValue] = React.useState();
  const [timePeriod, setTimePeriod] = React.useState("weekly");
  const [zone, setZone] = React.useState("zone1");
  const [link, setLink] = React.useState("");
  const [img, setImg] = React.useState();
  const [tableby, setTableBy] = React.useState("violation");
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
  const [column, setColumn] = React.useState([]);
  const [data, setData] = React.useState([]);
  const [toDate, setToDate] = useState(null);
  const [fromDate, setFromDate] = useState(null);
  const classes = useStyles();

  const handleDateChange = (e) => {
    if (e.target.id === "fromDate") {
      setFromDate(e.target.value);
    } else if (e.target.id === "toDate") {
      setToDate(e.target.value);
    }
  };
  const dateFilter = async () => {
    console.log(
      inputCTR.length > 0 ? inputCTR : clpCtr.map((item) => item.ctrs)
    );
    console.log(
      inputMACHINEid.length > 0
        ? inputMACHINEid
        : machineID.map((item) => item.machineID)
    );
    try {
      const crowd = await crowdingViolationChecking(
        fromDate,
        toDate,
        inputCTR.length > 0 ? inputCTR : clpCtr.map((item) => item.ctrs),
        inputMACHINEid.length > 0
          ? inputMACHINEid
          : machineID.map((item) => item.tableId)
      );
      console.log(crowd.crowdingData.length);

      if (crowd.crowdingData !== "no data") {
        setCROWDING(crowd.crowdingData);
      }

      const worker = await workerUnavailableViolationChecking(
        fromDate,
        toDate,
        inputCTR.length > 0 ? inputCTR : clpCtr.map((item) => item.ctrs),
        inputMACHINEid.length > 0
          ? inputMACHINEid
          : machineID.map((item) => item.tableId)
      );
      console.log(worker);

      if (worker.checkingWorkerUnavailableViolation !== "no data") {
        // setWORKER(worker.workerUnavailableDurationData);
        setWORKER(worker.checkingWorkerUnavailableViolation);
      }

      const by_worker = await violationByWorkerF(
        fromDate,
        toDate,
        inputCTR.length > 0 ? inputCTR : clpCtr.map((item) => item.ctrs),
        inputMACHINEid.length > 0
          ? inputMACHINEid
          : machineID.map((item) => item.machineID)
      );
      console.log(by_worker.violationByWorkerData.length);

      if (by_worker.violationByWorkerData !== "no data") {
        setBY_WORKER(by_worker.violationByWorkerData);
      }
      // const feed = await feedUnavailableViolation(
      //   fromDate,
      //   toDate,
      //   inputCTR.length > 0 ? inputCTR : clpCtr.map((item) => item.ctrs),
      //   inputMACHINEid.length > 0
      //     ? inputMACHINEid
      //     : machineID.map((item) => item.machineID)
      // );
      // console.log(feed.feedUnavailableData);

      // if (feed.feedUnavailableData !== "no data") {
      //   setFEEDUNAVAILABLE(feed.feedUnavailableData);
      // } else {
      //   setFEEDUNAVAILABLE([]);
      // }

      // const crowd = await crowdingViolation(
      //   fromDate,
      //   toDate,
      //   inputCTR.length > 0 ? inputCTR : clpCtr.map((item) => item.ctrs),
      //   inputMACHINEid.length > 0
      //     ? inputMACHINEid
      //     : machineID.map((item) => item.machineID)
      // );
      // console.log(crowd.crowdingData);

      // if (crowd.crowdingData !== "no data") {
      //   setCROWDING(crowd.crowdingData);
      // } else {
      //   setCROWDING([]);
      // }

      // const worker = await workerUnavailableViolation(
      //   fromDate,
      //   toDate,
      //   inputCTR.length > 0 ? inputCTR : clpCtr.map((item) => item.ctrs),
      //   inputMACHINEid.length > 0
      //     ? inputMACHINEid
      //     : machineID.map((item) => item.machineID)
      // );
      // console.log(worker.workerUnavailableDurationData);

      // if (worker.workerUnavailableDurationData !== "no data") {
      //   setWORKER(worker.workerUnavailableDurationData);
      // } else {
      //   setWORKER([]);
      // }

      // const by_worker = await violationByWorkerF(
      //   fromDate,
      //   toDate,
      //   inputCTR.length > 0 ? inputCTR : clpCtr.map((item) => item.ctrs),
      //   inputMACHINEid.length > 0
      //     ? inputMACHINEid
      //     : machineID.map((item) => item.machineID)
      // );
      // console.log(by_worker.violationByWorkerData);

      // if (by_worker.violationByWorkerData !== "no data") {
      //   setBY_WORKER(by_worker.violationByWorkerData);
      // } else {
      //   setBY_WORKER([]);
      // }
    } catch (err) {}
  };

  const [clpCtr, setClpCtr] = useState([]);
  const [machineID, setMachineID] = useState([]);
  const [inputCTR, setInputCTR] = useState([]);
  const [inputMACHINEid, setInputMACHINEid] = useState([]);

  const [FEEDUNAVAILABLE, setFEEDUNAVAILABLE] = useState([]);
  const [CROWDING, setCROWDING] = useState([]);
  const [WORKER, setWORKER] = useState([]);
  const [BY_WORKER, setBY_WORKER] = useState([]);

  // const load_ctr_machine = async () => {
  //   try {
  //     const ctr = await ctr_machineID();
  //     setClpCtr(ctr.clpctr);
  //     setMachineID(ctr.machineID);

  //     const feed = await feedUnavailableViolation(fromDate, toDate);
  //     console.log(feed.feedUnavailableData);
  //     setFEEDUNAVAILABLE(feed.feedUnavailableData);

  //     const crowd = await crowdingViolation(fromDate, toDate);
  //     if (crowd.crowdingData !== "no data") {
  //       setCROWDING(crowd.crowdingData);
  //     }

  //     console.log(crowd.crowdingData);

  //     const worker = await workerUnavailableViolation(fromDate, toDate);
  //     console.log(worker.workerUnavailableDurationData);
  //     if (worker.workerUnavailableDurationData !== "no data") {
  //       setWORKER(worker.workerUnavailableDurationData);
  //     }

  //     const by_worker = await violationByWorkerF(fromDate, toDate);
  //     // console.log(by_worker.violationByWorkerData.length);
  //     console.log(by_worker.violationByWorkerData);

  //     setBY_WORKER(by_worker.violationByWorkerData);
  //   } catch (err) {
  //     console.log(err.message);
  //   }
  // };

  const load_ctr_machine = async () => {
    try {
      const ctr = await ctr_machineID();
      setClpCtr(ctr.clpctr);
      // setMachineID(ctr.machineID);

      const tableID = await loadTableId();
      console.log(tableID);
      setMachineID(tableID.data);

      // const feed = await feedUnavailableViolation(fromDate, toDate);
      // console.log(feed.feedUnavailableData.length);
      // setFEEDUNAVAILABLE(feed.feedUnavailableData);

      const crowd = await crowdingViolationChecking(fromDate, toDate);
      // console.log(crowd.checkingCrowdingData.length);
      if (crowd.checkingCrowdingData !== "no data") {
        setCROWDING(crowd.checkingCrowdingData);
      }

      const worker = await workerUnavailableViolationChecking(fromDate, toDate);
      console.log(worker);
      if (worker.checkingWorkerUnavailableViolation === "no data") {
        setWORKER([]);
      } else {
        setWORKER([worker.checkingWorkerUnavailableViolation]);
      }

      const by_worker = await violationByWorkerF(fromDate, toDate);
      // console.log(by_worker.violationByWorkerData.length);

      setBY_WORKER(by_worker.violationByWorkerData);
    } catch (err) {
      console.log(err.message);
    }
  };

  const getFirstDay_LastDay = async () => {
    var curr = new Date(); // get current date
    var first = curr.getDate() - curr.getDay() + 1; // First day is the day of the month - the day of the week
    var last = first + 6; // last day is the first day + 6

    var firstday = new Date(curr.setDate(first)).toISOString().slice(0, 10);
    var lastday = new Date(curr.setDate(last)).toISOString().slice(0, 10);

    setToDate(new Date().toISOString().slice(0, 10));
    setFromDate(firstday);
    // console.log(firstday, lastday);
  };

  useEffect(() => {
    getFirstDay_LastDay();
    load_ctr_machine();
  }, []);
  const [tabValue, setTabValue] = React.useState(0);

  const handleTabChange = (event, newValue) => {
    // console.log(newValue);
    setTabValue(newValue);
  };

  const rowClick = (event, rowData) => {
    setLink(null);
    setLink(rowData.video);
    setImg(rowData.img);
    setIdLabel(rowData.Id);
    setSelectedRow(rowData.tableData.id);
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
              value={fromDate}
              className={classes.textField}
              InputLabelProps={{
                shrink: true,
              }}
              onChange={handleDateChange}
              fullWidth
              variant="outlined"
            />
          </Grid>

          <Grid item xs={12} md={2}>
            <TextField
              id="toDate"
              label="To"
              type="date"
              value={toDate}
              className={classes.textField}
              InputLabelProps={{
                shrink: true,
              }}
              onChange={handleDateChange}
              fullWidth
              variant="outlined"
            />
          </Grid>

          <Grid item xs={12} md={2}>
            <Button
              variant="contained"
              color="primary"
              style={{ margin: "10px" }}
              onClick={dateFilter}
            >
              Filter
            </Button>
          </Grid>
        </Grid>
      </Grid>

      <Grid container>
        <Grid
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
        </Grid>
        <Grid item xs={12} md={8} style={{ padding: "1rem" }}>
          <AppBar position="static" className="customTab">
            <Tabs
              value={tabValue}
              onChange={handleTabChange}
              aria-label="simple tabs example"
            >
              <Tab label="Crowding Violation" {...a11yProps(0)} />
              <Tab label="Worker Violation" {...a11yProps(1)} />
              <Tab label="By Worker" {...a11yProps(2)} />
            </Tabs>
          </AppBar>

          <TabPanel value={tabValue} index={0}>
            <Grid container item xs={12} style={{ padding: "12px" }}>
              <ViolationTable
                data={CROWDING}
                rowClick={rowClick}
                columns={[
                  { title: "Violation ID", field: "Id" },
                  {
                    title: "Status",
                    field: "query",
                    render: (rowData) => {
                      return rowData.query === "Not Resolved" ? (
                        <p
                          style={{
                            color: "rgb(249, 54, 54)",
                            backgroundColor: "rgba(249, 54, 54,0.2)",
                            padding: "4px 8px",
                            borderRadius: "4px",
                          }}
                        >
                          Not Resolved
                        </p>
                      ) : (
                        <p
                          style={{
                            color: "rgb(74, 170, 22)",
                            backgroundColor: "rgba(74, 170, 22,0.2)",
                            padding: "4px 8px",
                            borderRadius: "4px",
                          }}
                        >
                          Resolved
                        </p>
                      );
                    },
                  },
                  { title: "Violation Reason", field: "ViolationReason" },
                  { title: "Camera ID", field: "CamID" },
                  {
                    title: "Crowding Duration(Min.)",
                    field: "CrowdingDuration",
                  },
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
                  { title: "Crowding Start Time", field: "crowdStartTime" },
                  { title: "Crowding End Time", field: "crowdEndTime" },

                  { title: "Person(Max)", field: "MaxPerson" },
                  { title: "Person(Min)", field: "MinPerson" },
                  { title: "Violation Reason", field: "ViolationReason" },
                  { title: "Wing", field: "Wing" },
                ]}
              />
            </Grid>
          </TabPanel>
          <TabPanel value={tabValue} index={1}>
            <Grid container item xs={12} style={{ padding: "12px" }}>
              <ViolationTable
                data={WORKER}
                rowClick={rowClick}
                columns={[
                  {
                    field: "view",
                    title: "Details",
                    render: (rowData) => (
                      <Link
                        to={`/checking/violationDetails/${rowData.Id}`}
                        className="Link-btn"
                      >
                        View
                      </Link>
                    ),
                  },
                  { title: "Violation ID", field: "Id" },

                  {
                    title: "Status",
                    field: "query",
                    render: (rowData) => {
                      return rowData.query === "Not Resolved" ? (
                        <p
                          style={{
                            color: "rgb(249, 54, 54)",
                            backgroundColor: "rgba(249, 54, 54,0.2)",
                            padding: "4px 8px",
                            borderRadius: "4px",
                          }}
                        >
                          Not Resolved
                        </p>
                      ) : (
                        <p
                          style={{
                            color: "rgb(74, 170, 22)",
                            backgroundColor: "rgba(74, 170, 22,0.2)",
                            padding: "4px 8px",
                            borderRadius: "4px",
                          }}
                        >
                          Resolved
                        </p>
                      );
                    },
                  },
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
                data={BY_WORKER}
                rowClick={rowClick}
                columns={[
                  { title: "Worker ID", field: "workerId" },
                  { title: "Worker Name", field: "workerName" },
                  {
                    title: "Machine ID",
                    field: "machineID",
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
