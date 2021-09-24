/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import { makeStyles } from "@material-ui/core/styles";
// import "./home.css";

import Grid from "@material-ui/core/Grid";
import PropTypes from "prop-types";

// import "./setting.css";

// import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import FilterListIcon from "@material-ui/icons/FilterList";
import RefreshIcon from "@material-ui/icons/Refresh";
import {
  violationByWorkerFChecking,
  ctr_machineID,
  crowdingViolationChecking,
  workerUnavailableViolationChecking,
  defectsViolation,
  getAllTableId,
} from "../../../services/api.service";
import { Link } from "react-router-dom";
// import "./ViolationLog.css";
import * as moment from "moment";
// import { ViolationContext } from "../../context/ViolationContext";
import { AppBar, InputLabel, Tab, Tabs, TextField } from "@material-ui/core";
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
    var myDate = new Date();
    var newDateWeekBack = new Date(myDate.getTime() - 60 * 60 * 24 * 7 * 1000);
    dispatch({
      type: "VIO_FROM",
      payload: newDateWeekBack.toISOString().slice(0, 10),
    });
    dispatch({
      type: "VIO_TO",
      payload: myDate.toISOString().slice(0, 10),
    });

    const crowd = await crowdingViolationChecking();
    console.log(crowd);
    if (crowd?.crowdingData !== "no data") {
      dispatch({
        type: "CROWD_VIO",
        payload: { data: crowd?.crowdingData, loading: false },
      });
    }

    const worker = await workerUnavailableViolationChecking();
    if (worker?.workerUnavailableDurationData === "no data") {
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
          data: worker?.workerUnavailableDurationData,
          loading: false,
        },
      });
    }

    const by_worker = await violationByWorkerFChecking();
    dispatch({
      type: "BY_WORKER_VIO",
      payload: {
        data: by_worker?.violationByWorkerData,
        loading: false,
      },
    });

    const defects = await defectsViolation();
    console.log(defects?.data);

    dispatch({
      type: "DEFECTS",
      payload: {
        data: defects?.data,
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
          : machineID.map((item) => item.tableId),
        inputSHIFT
      );
      console.log(crowd);
      if (crowd?.crowdingData !== "no data") {
        dispatch({
          type: "CROWD_VIO",
          payload: { data: crowd?.crowdingData, loading: false },
        });
      }

      const defects = await defectsViolation(
        state.violationFrom,
        state.violationTo,
        inputCTR.length > 0 ? inputCTR : clpCtr.map((item) => item.ctrs),
        inputMACHINEid.length > 0
          ? inputMACHINEid
          : machineID.map((item) => item.tableId),
        inputSHIFT
      );
      console.log(defects?.data);

      dispatch({
        type: "DEFECTS",
        payload: {
          data: defects?.data,
          loading: false,
        },
      });

      const worker = await workerUnavailableViolationChecking(
        state.violationFrom,
        state.violationTo,
        inputCTR.length > 0 ? inputCTR : clpCtr.map((item) => item.ctrs),
        inputMACHINEid.length > 0
          ? inputMACHINEid
          : machineID.map((item) => item.tableId),
        inputSHIFT
      );
      console.log(worker?.workerUnavailableDurationData);
      if (worker?.workerUnavailableDurationData !== "no data") {
        dispatch({
          type: "WORKER_VIO",
          payload: {
            data: worker?.workerUnavailableDurationData,
            loading: false,
          },
        });
      }

      const by_worker = await violationByWorkerFChecking(
        state.violationFrom,
        state.violationTo,
        inputCTR.length > 0 ? inputCTR : clpCtr.map((item) => item.ctrs),
        inputMACHINEid.length > 0
          ? inputMACHINEid
          : machineID.map((item) => item.tableId),
        inputSHIFT
      );
      console.log(by_worker?.violationByWorkerData);
      if (by_worker?.violationByWorkerData !== "no data") {
        dispatch({
          type: "BY_WORKER_VIO",
          payload: {
            data: by_worker?.violationByWorkerData,
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
      setClpCtr(ctr?.clpctr);
      // setMachineID(ctr.machineID);

      const tableID = await getAllTableId();
      // console.log(tableID);
      setMachineID(tableID?.data);

      if (state.crowd.loading) {
        const crowd = await crowdingViolationChecking();
        console.log(crowd);
        if (crowd.crowdingData !== "no data") {
          dispatch({
            type: "CROWD_VIO",
            payload: { data: crowd?.crowdingData, loading: false },
          });
        }
      }

      if (state.worker.loading) {
        const worker = await workerUnavailableViolationChecking();
        console.log(worker);
        if (worker.workerUnavailableDurationData === "no data") {
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
              data: worker?.workerUnavailableDurationData,
              loading: false,
            },
          });
        }
      }

      if (state.by_worker.loading) {
        const by_worker = await violationByWorkerFChecking();
        console.log(by_worker);

        dispatch({
          type: "BY_WORKER_VIO",
          payload: {
            data: by_worker?.violationByWorkerData,
            loading: false,
          },
        });
      }

      if (state.defects.loading) {
        const defects = await defectsViolation();
        console.log(defects?.data);

        dispatch({
          type: "DEFECTS",
          payload: {
            data: defects?.data,
            loading: false,
          },
        });
      }
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
  const [tabValue, setTabValue] = React.useState(state.violationTab);

  const handleTabChange = (event, newValue) => {
    // console.log(newValue);
    // setTabValue(newValue);
    dispatch({ type: "VIOLATION_TAB", payload: newValue });
    setLink("");
    setImg("");
    setIdLabel();
  };

  const rowClick = (event, rowData) => {
    // setLink(null);
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
  const returnStatusDefect = (type) => {
    switch (type) {
      case "INCORRECT VIOLATION":
        return "Rejected";
      case "Not Known":
        return "Not Repaired";
      case "OPEN":
        return "Not Repaired";
      case "CLOSED":
        return "Repaired";
      default:
        return "Not Repaired";
    }
  };

  const returnClassNameDefect = (type) => {
    switch (type) {
      case "incorrect violation":
        return "Link-btn-grey";
      case "okay bag":
        return "Link-btn-yellow";
      case "rejected":
        return "Link-btn-red";
      case "not-repaired":
        return "Link-btn-orange";
      case "repaired":
        return "Link-btn-green";
      default:
        return "Link-btn-green";
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
          <Grid item xs={6} md={2}>
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
                {clpCtr &&
                  clpCtr.map((item, index) => (
                    <MenuItem value={item.ctrs} key={index}>
                      {item.ctrs}
                    </MenuItem>
                  ))}
              </Select>
            </FormControl>
          </Grid>

          <Grid item xs={6} md={2}>
            <FormControl
              variant="outlined"
              className={classes.formControl}
              fullWidth
            >
              <InputLabel id="demo-simple-select-outlined-label">
                Table ID
              </InputLabel>
              <Select
                labelId="demo-simple-select-outlined-label"
                id="demo-simple-select-outlined"
                multiple
                value={inputMACHINEid}
                onChange={(e) => setInputMACHINEid(e.target.value)}
                label="Table ID"
                // multiple
              >
                {machineID &&
                  machineID.map((item, index) => (
                    <MenuItem value={item.tableId} key={index}>
                      {item.tableId}
                    </MenuItem>
                  ))}
              </Select>
            </FormControl>
          </Grid>

          <Grid item xs={6} md={2}>
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

          <Grid item xs={6} md={2}>
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
            xs={4}
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
                <MenuItem value="A">A</MenuItem>
                <MenuItem value="B">B</MenuItem>
              </Select>
            </FormControl>
          </Grid>

          <Grid
            container
            item
            xs={4}
            md={1}
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
            xs={4}
            md={1}
            style={{ justifyContent: "center" }}
          >
            <Button
              variant="contained"
              color="primary"
              style={{ margin: "10px" }}
              onClick={refreshData}
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
                <span style={{ fontWeight: "bold" }}>{idLabel}</span>
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
              )
             
              }
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
              value={state.violationTab}
              onChange={handleTabChange}
              aria-label="simple tabs example"
              variant="scrollable"
              scrollButtons="auto"
            >
              <Tab label="Crowding Violation" {...a11yProps(0)} />
              <Tab label="Worker Violation" {...a11yProps(1)} />
              <Tab label="Defects" {...a11yProps(2)} />
              <Tab label="Checker Performance" {...a11yProps(3)} />
              {/* <Tab label="By Table" {...a11yProps(3)} /> */}
            </Tabs>
          </AppBar>

          <TabPanel value={state.violationTab} index={0}>
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
                        to={`/checking/violationDetails/${rowData.Id}`}
                        className={returnClassName(rowData.actionStatus)}
                        // className={`${
                        //   rowData.query === "Not Resolved"
                        //     ? "Link-btn-red"
                        //     : "Link-btn-green"
                        // }`}
                        onClick={() => {
                          localStorage.setItem("VIOLATION", "crowd");
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
                    title: "Crowding Duration",
                    field: "CrowdingDuration",
                  },

                  { title: "Start Time", field: "crowdStartTime" },
                  { title: "End Time", field: "crowdEndTime" },

                  { title: "Number Of Person", field: "MaxPerson" },
                  // { title: "Person(Min)", field: "MinPerson" },
                  // { title: "Violation Reason", field: "ViolationReason" },
                  { title: "Wing", field: "Wing" },
                  { title: "Shift", field: "shift" },
                  { title: "Supervisor Name", field: "supervisorName" },
                ]}
              />
            </Grid>
          </TabPanel>
          <TabPanel value={state.violationTab} index={1}>
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
                        className={returnClassName(rowData.actionStatus)}
                        onClick={() => {
                          localStorage.setItem("VIOLATION", "feedUnavailable");
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
                  { title: "Table ID", field: "tableId" },

                  {
                    title: "Violation Duration(Min.)",
                    field: "ViolationDuration",
                  },

                  { title: "Start Time", field: "startTime" },
                  { title: "End Time", field: "endTime" },
                  // { title: "Machine ID", field: "machineID" },
                  { title: "Wing", field: "wing" },
                  { title: "Shift", field: "shift" },
                  { title: "Supervisor Name", field: "supervisorName" },
                ]}
              />
            </Grid>
          </TabPanel>

          <TabPanel value={state.violationTab} index={2}>
            <Grid container item xs={12} style={{ padding: "12px" }}>
              <ViolationTable
                data={state.defects.data}
                rowClick={rowClick}
                selectedRow={selectedRow}
                columns={[
                  {
                    field: "view",
                    title: "Details",
                    render: (rowData) => (
                      <Link
                        to={`/checking/violationDetails/${rowData.Id}`}
                        className={returnClassNameDefect(
                          rowData.actionStatus.toLowerCase()
                        )}
                        onClick={() => {
                          localStorage.setItem("VIOLATION", "defects");
                          localStorage.setItem(
                            "VIOLATION-TYPE",
                            "Defect Violation"
                          );
                          localStorage.setItem(
                            "VIOLATION-STATUS",
                            rowData.actionStatus
                          );
                        }}
                      >
                        {rowData.actionStatus.toLowerCase()}
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
                  { title: "Table No.", field: "table_no" },
                  {
                    title: "Date",
                    field: "DateTime",
                    render: (rowData) => {
                      const NewDate = moment(new Date(rowData.dateTime))
                        .format("DD/MM/YYYY")
                        .toString();
                      return NewDate;
                    },
                  },
                  { title: "CTR No.", field: "ctr_no" },
                  {
                    title: "Time",
                    field: "time",
                  },

                  { title: "Checker ID", field: "checker_emp_id" },
                  { title: "Checker Name", field: "checker_name" },

                  { title: "Tailor No.", field: "tailorNumber" },
                  { title: "Tailor Name", field: "tailorName" },

                  { title: "Defect Name", field: "defectName" },
                  { title: "Action Status", field: "actionStatus" },

                  { title: "Bag ID", field: "bagId" },

                  { title: "Wing", field: "wing" },
                  { title: "Line", field: "line" },
                  { title: "Shift", field: "shift" },
                  { title: "Supervisor ID", field: "supervisorId" },

                  { title: "Supervisor Name", field: "supervisorName" },
                ]}
              />
            </Grid>
          </TabPanel>

          <TabPanel value={state.violationTab} index={3}>
            <Grid container item xs={12} style={{ padding: "12px" }}>
              <ViolationTable
                data={state.by_worker.data}
                rowClick={rowClick}
                selectedRow={selectedRow}
                columns={[
                  { title: "Checker ID", field: "checkerID" },
                  { title: "Checker Name", field: "checkerName" },
                  {
                    title: "Table ID",
                    field: "tableId",
                  },
                  { title: "Shift", field: "shift" },

                  {
                    title: "Worker N/A Duration Hrs.",
                    field: "violationDuration",
                  },
                  {
                    title: "No. Of Bags Checked",
                    field: "NoOfBagsChecked",
                  },
                  {
                    title: "No. Of Defects",
                    field: "NoOfDefects",
                  },
                ]}
              />
            </Grid>
          </TabPanel>

          {/* <TabPanel value={tabValue} index={3}>
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
          </TabPanel> */}
        </Grid>
      </Grid>
    </>
  );
}

export default ViolationLog1;
