/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import SendIcon from "@material-ui/icons/Send";
import { useHistory, Link } from "react-router-dom";
import Grid from "@material-ui/core/Grid";
import "./ViolationDetail.scss";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";
import {
  violationCommentChecking,
  communicatedTo,
  getAllSupervisorList,
  checkingViolationSupervisorUpdate,
  getCheckingViolationDetailData,
  getRecentCheckingUnavailable,
  getRecentCheckingDefect,
  getRecentCheckingCrowd,
  checkingViolationClosedByUpdate,
} from "../../../services/api.service";
import * as moment from "moment";
import ReactPlayer from "react-player";
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";
import { FormControl, InputLabel, Paper, Typography } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    border: "2px solid #000",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));

function VideoCard({ data, onClick }) {
  return (
    <Grid
      container
      item
      component={Link}
      xs={12}
      sm={4}
      // md={2}
      to={`/checking/violationDetails/${data.Id}`}
      className="Recent"
    >
      <Grid
        container
        component={Paper}
        elevation={1}
        item
        xs={12}
        style={{
          cursor: "pointer",
          background: "white",
          paddingBottom: 16,
        }}
        className="Description"
      >
        <Grid
          container
          item
          xs={12}
          sm={12}
          style={{ margin: "auto", marginBottom: "8px" }}
        >
          <img
            src={data.img}
            style={{ width: "100%", height: "100%" }}
            alt="img"
          />
        </Grid>
        <Grid
          container
          item
          xs={10}
          sm={8}
          style={{ margin: "auto" }}
          className="Box"
        >
          <NameValue name="CTR NO" value="N/A" />
          <NameValue name="ID" value={data.Id} />
          <NameValue name="WING" value={data.wing} />
          <NameValue name="ZONE" value="N/A" />

          {/* <div className="videoCard-content">
            <p>CTR No:</p>
            <p>N/A</p>
          </div>
          <div className="videoCard-content">
            <p>ID:</p>
            <p>{data.Id}</p>
          </div>
          <div className="videoCard-content">
            <p>Wing:</p>
            <p>{data.wing}</p>
          </div>
          <div className="videoCard-content">
            <p>Zone:</p>
            <p>N/A</p>
          </div>

          <div className="videoCard-content">
            <p>Time:</p>
            <p>{moment(`2021-01-11 ${data.StartTime}`).format("hh:mm A")}</p>
          </div> */}
        </Grid>
      </Grid>
    </Grid>
  );
}

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

function NameValue({ name, value }) {
  return (
    <>
      <Grid
        xs={6}
        sm={6}
        md={6}
        component={Typography}
        variant="h6"
        className="Key"
      >
        {name}
      </Grid>
      <Grid
        xs={6}
        sm={6}
        md={6}
        component={Typography}
        variant="h6"
        className="Value"
      >
        {value}
      </Grid>
    </>
  );
}

function ViolationDetail(props) {
  console.log(props);
  const history = useHistory();
  const classes = useStyles();
  const [data, setData] = useState();
  const [isCorrect, setIsCorrect] = useState(false);
  const [VIOLATION, setVIOLATION] = useState([]);
  const [communicated, setCommunicated] = useState("");
  const [supervisor, setSupervisor] = useState("");
  const [newSupervisor, setNewSupervisor] = useState("");
  const [closedBy, setClosedBy] = useState("");

  const getRecentData = async () => {
    const typeOfViolation = localStorage.getItem("VIOLATION");
    try {
      if (typeOfViolation === "feedUnavailable") {
        const x = await getRecentCheckingUnavailable();
        console.log(x);
        setVIOLATION(x);
      } else if (typeOfViolation === "defects") {
        const x = await getRecentCheckingDefect();
        setVIOLATION(x);
        console.log(x);
      } else if (typeOfViolation === "crowd") {
        const x = await getRecentCheckingCrowd();
        setVIOLATION(x);
        console.log(x);
      }
    } catch (err) {
      console.log(err.message);
    }
  };
  const getData = async () => {
    try {
      const x = await getCheckingViolationDetailData(props.id);
      console.log(x);
      setData(x.volIdData[0]);
      setNewSupervisor(x.volIdData[0].supervisor);
      setClosedBy(x.volIdData[0].closingSupervisor);
      setLink(x.volIdData[0]?.video);
      if (x.volIdData[0].violationReason) {
        setReason(x.volIdData[0].violationReason);
      }
      if (
        !(
          x.volIdData[0].violationReason === "Machine Breakdown" ||
          x.volIdData[0].violationReason === "CTR Change"
        ) &&
        x.volIdData[0].confirmStatus === "true"
      ) {
        setReason("Add Reason");
        setReason1(x.volIdData[0].violationReason);
      }

      if (x.volIdData[0].action) {
        setAction(x.volIdData[0].action);
      }
      if (
        !(
          x.volIdData[0].action === "Penalty" ||
          x.volIdData[0].action === "Supervisor Informed" ||
          x.volIdData[0].action === "Worker Warned"
        ) &&
        x.volIdData[0].confirmStatus === "true"
      ) {
        setAction("Add Comment");
        setAction1(x.volIdData[0].action);
      }
      if (x.volIdData[0].incorrectViolationReason) {
        setIncorrect(x.volIdData[0].incorrectViolationReason);
      }
      if (
        !(
          x.volIdData[0].incorrectViolationReason === "Not a Violation" ||
          x.volIdData[0].incorrectViolationReason === "Different Violation" ||
          x.volIdData[0].incorrectViolationReason === "Incorrect Details"
        ) &&
        x.volIdData[0].incorrectStatus === "true"
      ) {
        setIncorrect("Add Comment");
        setIncorrect1(x.volIdData[0].incorrectViolationReason);
      }
    } catch (err) {
      console.log(err.message);
    }
  };

  const getSupervisor = async () => {
    try {
      const resp = await getAllSupervisorList();
      console.log(resp);
      setSupervisor(resp);
    } catch (e) {}
  };

  useEffect(() => {
    getData();
    getRecentData();
    getSupervisor();
    return () => {
      setReason("");
      setReason1("");
      setAction("");
      setAction1("");
      setIncorrect("");
      setIncorrect1("");
      setLink("");
    };
  }, [props.id]);

  const [reassigned, setReassigned] = React.useState("");
  const submitConfirmViolation = async () => {
    setIsCorrect(true);
    let res;
    let act;
    if (reason === "Add Reason") {
      res = reason1;
    } else {
      res = reason;
    }
    if (action === "Add Comment") {
      act = action1;
    } else {
      act = action;
    }

    try {
      if (!res.trim()) {
        setMsg("Reason can't be empty.");
        setOpen1(true);
        return;
      }
      const x = await violationCommentChecking(
        props.id,
        res,
        act,
        true,
        false,
        "",
        data?.actualSupervisor,
        reassigned
      );
      console.log(x);
      setMsg(x.msg);
      setOpen1(true);
      setTimeout(() => {
        history.push("/checking/violationLog");
      }, 2000);
    } catch (e) {
      console.log(e);
    }
  };

  const submitIncorrectViolation = async () => {
    let inc;
    if (incorrect === "Add Comment") {
      inc = incorrect1;
    } else {
      inc = incorrect;
    }

    try {
      // var txt = window.confirm(
      //   "Are you want to mark this violation incorrect ?"
      // );
      // if (txt) {
      const x = await violationCommentChecking(
        props.id,
        "",
        "",
        false,
        true,
        inc
      );
      console.log(x);
      setMsg(x.msg);
      setOpen1(true);
      setOpen(false);
      setTimeout(() => {
        history.push("/checking/violationLog");
      }, 2000);
      // } else {
      //   setOpen(false);
      // }
    } catch (e) {}
  };

  const submitCommunication = async () => {
    try {
      const resp = await communicatedTo(
        communicated,
        props.id,
        reason === "Add Reason" ? reason1 : reason
      );
      setMsg(resp.msg);
      setOpen1(true);
    } catch (e) {}
  };

  // console.log("inside v details");
  // console.log(props.id);
  const [reason, setReason] = useState("");
  const [reason1, setReason1] = useState("");

  const [action, setAction] = useState("");
  const [action1, setAction1] = useState("");

  const [incorrect, setIncorrect] = useState("");
  const [incorrect1, setIncorrect1] = useState("");

  const [link, setLink] = useState("");

  const [open, setOpen] = React.useState(false);
  const [open1, setOpen1] = React.useState(false);
  const [msg, setMsg] = useState("");

  const handleClose1 = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen1(false);
  };

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleReasonChange = (event) => {
    setReason(event.target.value);
  };

  const handleActionChange = (event) => {
    setAction(event.target.value);
  };

  const handleIncorrectChange = (event) => {
    setIncorrect(event.target.value);
  };

  const customReason = (event) => {
    setReason1(event.target.value);
  };

  const customAction = (event) => {
    setAction1(event.target.value);
  };

  const customIncorrect = (event) => {
    setIncorrect1(event.target.value);
  };

  const openPopUpWindow = (id) => {
    // window.open(
    //   `/checking/violationDetails/${id}`,
    //   "window",
    //   "menubar=no,screenX=0,screenY=0,top=0,left=0,location=no,status=no,toolbar=no,scrollbars=yes,resizable=no"
    // );
  };

  const [SelectDropdowndata, setSelectDropdowndata] = useState([]);

  const setDrop = () => {
    localStorage.getItem("VIOLATION-TYPE") === "Feed Unavailable" &&
      setSelectDropdowndata([
        "Zuki broke",
        "Acces 502 broke",
        "Acces 802 broke",
        "Mc Heatcutter Problem",
        "Orsan Pressure Down",
        "Power Cut",
        "No Zuki tailor",
        "No D/s F/s tailor",
        "No Orsan Tailor",
        "No Top Tailor",
        "Trolley Problem from cutting",
        "Allocation Problem Tailor left",
        "Allocation Problem Tailor sitting idle",
        "Cutting Size variation",
        "Cutting available Acces. not Ready",
        "Accessory stock not maintained",
        "Incomplete set from Cutting",
        "Doc Pocket Not Available",
        "Label Not Available",
        "Liner Not Available",
        "Webbing Not Available from NL",
        "Webbing cutting Not done",
        "Thread Not available",
        "Filler Cord Not available",
        "Felt Not available",
        "Fabric Quality Issue",
        "Temporary Machine not added",
        "Planned Line Closed",
        "Machine Close due to Accumulation",
        "CTR Change",
        "Sample Not Available",
        "Shortfall",
        "Bag incomplete due to Extra Work",
        "Late start",
        "Left Early",
        "Tailor used as Helper",
        "Tailor used in repairing",
        "Trainee tailor",
        "Tailor Left to the machine without information",
        "Tailor Left to collect webbing",
        "Tailor left for Water/Toilet break",
        "Cell Closed due to Other Manpower",
        "Material loading helper absent",
        "Material loading helper not available",
        "Material loading helper short",
      ]);

    localStorage.getItem("VIOLATION-TYPE") === "Crowding Violation" &&
      setSelectDropdowndata([
        "Supervisor Follow up",
        "Regular work follow up",
        "Quality issue follow up",
        "Worker No work",
        "Helper distributing material",
        "Production counting/Matching",
        "General meeting",
        "Negligence",
        "Worker M/c breakdown",
      ]);

    localStorage.getItem("VIOLATION-TYPE") === "Worker Violation" &&
      setSelectDropdowndata([
        "Zuki broke",
        "Herakle broke",
        "Safety broke",
        "Top broke",
        "Orsan Broke",
        "Acces 502 broke",
        "Acces 802 broke",
        "Mc Heatcutter Problem",
        "Checker Heatcutter Problem",
        "Orsan Pressure Down",
        "Power Cut",
        "No Zuki tailor",
        "No D/s F/s tailor",
        "No Orsan Tailor",
        "No Top Tailor",
        "Trolley Problem from cutting",
        "Allocation Problem Tailor left",
        "Allocation Problem Tailor sitting idle",
        "Advance kit tailor left",
        "Cutting Size variation",
        "Cutting available Acces. not Ready",
        "Accessory stock not maintained",
        "Incomplete set from Cutting",
        "Doc Pocket Not Available",
        "Label Not Available",
        "Liner Not Available",
        "Webbing Not Available from NL",
        "Webbing cutting Not done",
        "Thread Not available",
        "Filler Cord Not available",
        "Felt Not available",
        "Other kit not available",
        "Fabric Quality Issue",
        "Temporary Machine not added",
        "Planned Line Closed",
        "Machine Close due to Accumulation",
        "CTR Change",
        "Sample Not Available",
        "Shortfall",
        "Bag incomplete due to Extra Work",
        "Late start",
        "Left Early",
        "Tailor used as Helper",
        "Tailor used in repairing",
        "Trainee tailor",
        "Tailor Left to the machine without information",
        "Tailor Left to collect webbing",
        "Tailor left for Water/Toilet break",
        "Cell Closed due to Other Manpower",
        "Material loading helper absent",
        "Material loading helper not available",
        "Material loading helper short",
      ]);

    localStorage.getItem("VIOLATION-TYPE") === "Machine Violation" &&
      setSelectDropdowndata([
        "Ball Stud breakdown",
        "Ball Stud Setting",
        "Big Ball Stud breakdown",
        "Big Ball Stud Setting",
        "CAM breakdown",
        "CAM Setting",
        "Connecting rod breakdown",
        "Connecting rod setting",
        "Cross Looper breakdown",
        "Cross Looper Setting",
        "Electrical Issue",
        "Feeddog breakdown",
        "Feeddog Setting",
        "Heat cutter Issue",
        "High GSM setting issue",
        "Looper breakdown",
        "Looper Setting",
        "Lower Feeddog breakdown",
        "Lower Feeddog Setting",
        "Machine Oil issue",
        "Needle breakdown",
        "Needle gaurd breakdown",
        "Needle gaurd Setting",
        "Needle holder breakdown",
        "Needle holder Setting",
        "Needle Setting",
        "Other breakdown",
        "Other Chukka Issue",
        "Other Part setting issue",
        "PP thread setting issue",
        "Pressure foot breakdown",
        "Pressure foot Setting",
        "Screw breakdown",
        "Screw Setting",
        "Small Ball Stud breakdown",
        "Small Ball Stud Setting",
        "Spreader breakdown",
        "Spreader lever breakdown",
        "Spreader lever Setting",
        "Spreader Setting",
        "Throat plate breakdown",
        "Throat plate Setting",
        "Upper Feeddog breakdown",
        "Upper Feeddog Setting",
      ]);
  };

  useEffect(() => {
    setDrop();
  }, []);
  const returnClassName = (type) => {
    switch (type) {
      case "Incorrect":
        return "Link-btn-grey";
      case "Unresolved":
        return "Link-btn-red";
      case "Resolved":
        return "Link-btn-green";
      case "Rejected":
        return "Link-btn-grey";
      case "Not Repaired":
        return "Link-btn-red";
      case "Repaired":
        return "Link-btn-green";
      default:
        return "Link-btn-red";
    }
  };
  const onSupervisorChange = async (e) => {
    try {
      setNewSupervisor(e.target.value);
      const resp = await checkingViolationSupervisorUpdate(
        props.id,
        e.target.value
      );
      setMsg(resp.volIdData);
      setOpen1(true);
    } catch (e) {
      // console.log(e);
    }
  };

  const onClosedByChange = async (e) => {
    try {
      setClosedBy(e.target.value);
      const resp = await checkingViolationClosedByUpdate(
        props.id,
        e.target.value
      );
      setMsg(resp.msg);
      setOpen1(true);
    } catch (e) {
      // console.log(e);
    }
  };

  return (
    <>
      <Grid
        container
        item
        style={{ padding: "12px", backgroundColor: "#f8faff" }}
      >
        {/* HEADER */}
        <Grid
          container
          item
          xs={12}
          sm={12}
          md={12}
          style={{ marginBottom: "1rem" }}
        >
          {localStorage.getItem("VIOLATION-TYPE") && (
            <>
              <Grid
                container
                item
                xs={8}
                md={2}
                //   style={{ border: "2px solid red" }}
              >
                <Typography
                  variant="h6"
                  style={{
                    color: "#0e4a7b",
                    borderBottom: "2px solid #0e4a7b",
                    padding: "0 8px",
                    //   marginRight: "12px",
                    cursor: "pointer",
                  }}
                  onClick={() => history.push("/checking/violationLog")}
                >
                  <span>
                    <i
                      class="fa fa-arrow-left"
                      aria-hidden="true"
                      style={{ marginRight: "8px" }}
                    ></i>
                  </span>
                  {localStorage.getItem("VIOLATION-TYPE")}
                </Typography>
              </Grid>
              <Grid container item xs={4} md={3}>
                <Typography
                  style={{
                    lineHeight: "21px !important",
                    height: "max-content",
                  }}
                  className={returnClassName(
                    localStorage.getItem("VIOLATION-STATUS")
                  )}
                >
                  {localStorage.getItem("VIOLATION-STATUS")}
                </Typography>
              </Grid>
            </>
          )}
        </Grid>
        {/* BODY */}
        <Grid
          container
          item
          xs={12}
          sm={12}
          md={12}
          style={{ padding: "12px" }}
        >
          <Grid
            container
            item
            xs={12}
            sm={5}
            md={5}
            style={{ padding: "12px" }}
          >
            {/* CAMERA FEED */}
            <Grid container item xs={12} className="Details_CameraFeed">
              {/* DATE & ID */}
              <Grid ontainer item xs={12} className={"Header"}>
                <h3 style={{ color: "white " }}>
                  Violation Id : {props.id} <br />
                  {data?.bagId && <>Bag Id : {data?.bagId}</>}
                </h3>
                <p style={{ color: "white" }}>
                  {data?.dateTime &&
                    moment(new Date(data.dateTime))
                      .format("DD/MM/YYYY")
                      .toString()}
                  {data?.date &&
                    moment(new Date(data.date))
                      .format("DD/MM/YYYY")
                      .toString()}
                  <br />
                  {data?.time}
                </p>
              </Grid>
              {/* VIDEO */}
              {link && (
                <Grid container item xs={12} className="mb-16">
                  <ReactPlayer
                    key={link}
                    url={link?.replace(".avi", ".mp4")}
                    controls={true}
                    width="100%"
                    height="auto"
                  />
                </Grid>
              )}
              {/* IMAGE */}
              <Grid container item xs={12}>
                {data?.img && (
                  <img src={data.img} style={{ width: "100%" }} alt="img" />
                )}
                {data?.barcode && (
                  <div
                    style={{
                      width: "100%",
                      background: "white",
                      height: "fit-content",
                      padding: "12px",
                    }}
                  >
                    <img
                      src={data?.barcode}
                      style={{ width: "100%" }}
                      alt="barcode"
                    />
                  </div>
                )}
              </Grid>
            </Grid>
          </Grid>
          <Grid
            container
            item
            xs={12}
            sm={7}
            md={7}
            style={{
              padding: "12px",
              height: "max-content",
            }}
          >
            {/* ABOUT ICIDENT */}
            <Grid
              className="Details_Info"
              component={Paper}
              elevation={1}
              container
              item
              xs={12}
              sm={12}
              md={9}
            >
              <Typography variant="h5" style={{ fontWeight: "bold" }}>
                About Incident
              </Typography>
              <Grid
                container
                item
                className="Description"
                xs={12}
                sm={12}
                md={12}
                style={{ alignItems: "center" }}
              >
                {/* WORKER NAME */}
                {data?.workerName && (
                  <NameValue
                    name="WORKER NAME"
                    value={data && data?.workerName}
                  />
                )}

                {/*WORKER ID  */}
                {data?.workerId && (
                  <NameValue name="WORKER ID" value={data && data?.workerId} />
                )}
                {/* MACHINE ID */}
                {data?.machineId && (
                  <NameValue
                    name="MACHINE STATUS"
                    value={data && data?.status === 0 ? "Off" : "On"}
                  />
                )}
                {/* MACHINE ID */}
                {data?.machineId && (
                  <NameValue name="MACHINE ID" value={data && data.machineId} />
                )}
                {data?.ctr && (
                  <NameValue name="CTR NO." value={data && data.ctr} />
                )}

                {/* TAILOR NAME */}
                {data?.tailorName && (
                  <NameValue name="TAILOR" value={data && data.tailorName} />
                )}

                {/* DEFECT NAME */}
                {data?.defectName && (
                  <NameValue name="DEFECT" value={data && data.defectName} />
                )}

                {/* WING */}
                {data?.wing && (
                  <NameValue name="WING" value={data && data.wing} />
                )}
                {/* SHIFT */}
                {data?.shift && (
                  <NameValue name="SHIFT" value={data && data.shift} />
                )}
                {/* LINE */}
                {data?.line && (
                  <NameValue name="LINE" value={data && data.line} />
                )}
                {/* START TIME */}
                {data?.StartTime && (
                  <NameValue name="START TIME" value={data && data.StartTime} />
                )}
                {/* END TIME */}
                {data?.EndTime && (
                  <NameValue name="END TIME" value={data && data.EndTime} />
                )}
                {/* TABLE */}
                {data?.table_no && (
                  <NameValue name="TABLE NO." value={data && data.table_no} />
                )}
                {/* BAGID */}
                {data?.bagId && (
                  <NameValue name="BAG ID" value={data && data.bagId} />
                )}
                {/* CHECKER ID */}
                {data?.CheckerId && (
                  <NameValue name="CHECKER ID" value={data && data.CheckerId} />
                )}
                {/* CHECKER NAME*/}
                {data?.CheckerName && (
                  <NameValue
                    name="CHECKER NAME"
                    value={data && data.CheckerName}
                  />
                )}

                {/* CHECKER ID */}
                {data?.time && (
                  <NameValue name="TIME" value={data && data.time} />
                )}
                {/* SUPERVISOR */}
                {data && (
                  <>
                    <Grid
                      xs={6}
                      sm={6}
                      md={6}
                      component={Typography}
                      variant="h6"
                      className="Key"
                    >
                      SUPERVISOR
                    </Grid>
                    <Grid
                      xs={6}
                      sm={6}
                      md={6}
                      component={Typography}
                      variant="h6"
                      className="Value"
                    >
                      <FormControl
                        variant="outlined"
                        fullWidth
                        style={{ marginRight: "6px" }}
                      >
                        <InputLabel id="demo-simple-select-outlined-label">
                          Supervisor
                        </InputLabel>
                        <Select
                          native
                          labelId="demo-simple-select-outlined-label"
                          id="demo-simple-select-outlined"
                          value={newSupervisor}
                          onChange={onSupervisorChange}
                          label="Supervisor"
                          // multiple
                        >
                          {/* <option value=""></option> */}
                          {supervisor.length > 0 &&
                            supervisor?.map((item, index) => (
                              <option value={item.username} key={index}>
                                {item.username}
                              </option>
                            ))}
                        </Select>
                      </FormControl>
                    </Grid>
                  </>
                )}

                {/* CLOSED BY*/}
                {data && (
                  <>
                    <Grid
                      xs={6}
                      sm={6}
                      md={6}
                      component={Typography}
                      variant="h6"
                      className="Key"
                    >
                      VIOLATION CLOSED
                    </Grid>
                    <Grid
                      xs={6}
                      sm={6}
                      md={6}
                      component={Typography}
                      variant="h6"
                      className="Value"
                    >
                      <FormControl
                        variant="outlined"
                        fullWidth
                        style={{ marginRight: "6px" }}
                      >
                        <InputLabel id="demo-simple-select-outlined-label">
                          Supervisor
                        </InputLabel>
                        <Select
                          native
                          labelId="demo-simple-select-outlined-label"
                          id="demo-simple-select-outlined"
                          value={closedBy}
                          onChange={onClosedByChange}
                          label="Supervisor"
                          // multiple
                        >
                          {supervisor.length > 0 &&
                            supervisor?.map((item, index) => (
                              <option value={item.username} key={index}>
                                {item.username}
                              </option>
                            ))}
                        </Select>
                      </FormControl>
                    </Grid>
                  </>
                )}
                {/* {data?.supervisor && (
                  <NameValue
                    name="SUPERVISOR"
                    value={data && data.supervisor}
                  />
                )} */}
                {/* ACTUAL SUPERVISOR */}
                {/* {data?.actualSupervisor && (
                  <NameValue
                    name="ACTUAL SUPERVISOR"
                    value={data && data.actualSupervisor}
                  />
                )} */}
                {/* REASSIGNED SUPERVISOR */}
                {/* {data?.reassignedSupervisor && (
                  <NameValue
                    name="REASSIGNED SUPERVISOR"
                    value={data && data.reassignedSupervisor}
                  />
                )} */}
              </Grid>
            </Grid>
            <Grid
              className="Details_Info"
              style={{
                padding: "12px 0",
                display: "flex",
                alignItems: "start",
                justifyContent: "space-between",
              }}
              container
              item
              xs={12}
              sm={12}
              md={9}
            >
              <Grid
                container
                item
                xs={12}
                sm={5}
                md={5}
                component={Paper}
                elevation={1}
                style={{ padding: "6px 12px 6px 12px", marginBottom: "24px" }}
              >
                <Typography
                  variant="h5"
                  style={{ fontWeight: "bold", marginBottom: "12px" }}
                >
                  Violation Reason
                </Typography>
                <FormControl
                  fullWidth
                  variant="outlined"
                  className={classes.formControl}
                  style={{ marginBottom: "12px" }}
                >
                  <InputLabel id="demo-simple-select-outlined-label">
                    Choose Reason
                  </InputLabel>
                  <Select
                    native
                    labelId="demo-simple-select-outlined-label"
                    id="demo-simple-select-outlined"
                    value={reason}
                    onChange={handleReasonChange}
                    label="Choose Reason"
                  >
                    <option value="">Choose Reason</option>
                    <option value="Add Reason">Add Reason</option>

                    {SelectDropdowndata.length > 0 &&
                      SelectDropdowndata.map((item, i) => (
                        <option key={i} value={item}>
                          {item}
                        </option>
                      ))}

                    <option value="Repeated Violation">
                      Repeated Violation
                    </option>
                  </Select>
                </FormControl>
                {reason === "Add Reason" && (
                  <TextField
                    id="outlined-basic"
                    label="Reason"
                    variant="outlined"
                    fullWidth
                    onChange={customReason}
                    value={reason1}
                    style={{ marginBottom: "12px" }}
                  />
                )}
              </Grid>
              <Grid
                container
                item
                xs={12}
                sm={5}
                md={5}
                component={Paper}
                elevation={1}
                style={{ padding: "6px 12px 6px 12px", marginBottom: "24px" }}
              >
                <Typography
                  variant="h5"
                  style={{ fontWeight: "bold", marginBottom: "12px" }}
                >
                  Action Taken
                </Typography>
                <FormControl
                  fullWidth
                  variant="outlined"
                  className={classes.formControl}
                  style={{ marginBottom: "12px" }}
                >
                  <InputLabel id="demo-simple-select-outlined-label">
                    Choose Action
                  </InputLabel>
                  <Select
                    native
                    labelId="demo-simple-select-outlined-label"
                    id="demo-simple-select-outlined"
                    value={action}
                    onChange={handleActionChange}
                    label="Choose Action"
                  >
                    <option value="">Choose Action</option>
                    <option value="Add Comment">Add Comment</option>

                    {["Penalty", "Supervisor Informed", "Worker Warned"].map(
                      (item, i) => (
                        <option key={i} value={item}>
                          {item}
                        </option>
                      )
                    )}
                  </Select>
                </FormControl>
                {action === "Add Comment" && (
                  <TextField
                    id="outlined-basic"
                    label="Comment"
                    variant="outlined"
                    fullWidth
                    onChange={customAction}
                    value={action1}
                    style={{ marginBottom: "12px" }}
                  />
                )}
              </Grid>
              {/* <Grid
                container
                item
                xs={12}
                sm={12}
                md={12}
                component={Paper}
                elevation={1}
                style={{ padding: "6px 12px 6px 12px", marginBottom: "24px" }}
              >
                <Typography
                  variant="h5"
                  style={{ fontWeight: "bold", marginBottom: "12px" }}
                >
                  Reassign Supervisor
                </Typography>
                <TextField
                  id="outlined-basic"
                  label="Reassign Supervisor"
                  variant="outlined"
                  fullWidth
                  style={{ marginBottom: "12px" }}
                />
              </Grid> */}

              {/* COMMUNICATED TO */}
              <Grid
                container
                item
                xs={12}
                sm={12}
                md={12}
                component={Paper}
                elevation={1}
                style={{
                  padding: "6px 12px 6px 12px",
                  alignItems: "center",
                  marginBottom: "24px",
                }}
              >
                <Grid container item xs={12}>
                  <Typography
                    variant="h5"
                    style={{ fontWeight: "bold", marginBottom: "12px" }}
                  >
                    Communicated To
                  </Typography>
                </Grid>

                <Grid item container xs={9} sm={10}>
                  <TextField
                    id="outlined-basic"
                    label="Communicate To"
                    variant="outlined"
                    fullWidth
                    onChange={(e) => setCommunicated(e.target.value)}
                    value={communicated}
                    style={{ marginBottom: "12px" }}
                  />
                </Grid>
                <Grid
                  container
                  item
                  xs={3}
                  sm={2}
                  style={{ alignItems: "center", justifyContent: "center" }}
                >
                  <Button
                    variant="contained"
                    style={{ height: "max-content", marginBottom: "12px" }}
                    onClick={submitCommunication}
                  >
                    <SendIcon />
                  </Button>
                </Grid>
              </Grid>
              <Grid
                container
                item
                xs={12}
                sm={12}
                md={12}
                style={{ padding: "6px 12px 6px 12px", alignItems: "center" }}
              >
                <Grid
                  container
                  item
                  xs={12}
                  sm={12}
                  md={6}
                  style={{ padding: "12px" }}
                >
                  {localStorage.getItem("VIOLATION-TYPE") ===
                  "Defect Violation" ? (
                    <Button
                      variant="contained"
                      style={{
                        width: "100%",
                        padding: "8px !important",
                      }}
                      onClick={handleOpen}
                      // className="violation-btn incorrect-btn"
                    >
                      Bag Rejected
                    </Button>
                  ) : (
                    <Button
                      variant="contained"
                      style={{
                        width: "100%",
                        padding: "8px !important",
                      }}
                      onClick={handleOpen}
                      // className="violation-btn incorrect-btn"
                    >
                      Incorrect Violation
                    </Button>
                  )}
                </Grid>
                <Grid
                  container
                  item
                  xs={12}
                  sm={12}
                  md={6}
                  style={{ padding: "12px" }}
                >
                  {localStorage.getItem("VIOLATION-TYPE") ===
                  "Defect Violation" ? (
                    <Button
                      // className="violation-btn correct-btn"
                      variant="contained"
                      style={{
                        width: "100%",
                        backgroundColor: "#f68f1d",
                        color: "white",
                        padding: "8px !important",
                      }}
                      onClick={submitConfirmViolation}
                    >
                      Bag Repaired
                    </Button>
                  ) : (
                    <Button
                      // className="violation-btn correct-btn"
                      variant="contained"
                      style={{
                        width: "100%",
                        backgroundColor: "#f68f1d",
                        color: "white",
                        padding: "8px !important",
                      }}
                      onClick={submitConfirmViolation}
                    >
                      Confirm Violation
                    </Button>
                  )}
                </Grid>
              </Grid>
            </Grid>
          </Grid>
          {localStorage.getItem("VIOLATION") === "feedUnavailable" ||
          localStorage.getItem("VIOLATION") === "worker" ? (
            <Grid
              container
              item
              xs={12}
              sm={12}
              md={12}
              style={{ marginTop: "32px" }}
            >
              <Typography variant="h4">Recent Violation</Typography>
              <Grid container item xs={12} className="RecentVio_Container">
                {VIOLATION &&
                  VIOLATION.map((item, i) => (
                    <VideoCard
                      onClick={() => openPopUpWindow(item.Id)}
                      key={i}
                      data={item}
                    />
                  ))}
              </Grid>
            </Grid>
          ) : null}
        </Grid>
      </Grid>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className={classes.modal}
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={open}>
          <Paper elevation={3} style={{ textAlign: "center", padding: "1rem" }}>
            <Typography
              variant="h5"
              style={{ fontWeight: "bold", marginBottom: "12px" }}
            >
              Incorrect Violation Reason
            </Typography>
            <Grid container>
              <Grid container item xs={12} style={{ marginBottom: "12px" }}>
                <FormControl
                  variant="outlined"
                  className={classes.formControl}
                  fullWidth
                >
                  <InputLabel id="demo-simple-select-outlined-label">
                    Choose Reason
                  </InputLabel>
                  <Select
                    native
                    labelId="demo-simple-select-outlined-label"
                    id="demo-simple-select-outlined"
                    value={incorrect}
                    onChange={handleIncorrectChange}
                    label="Choose Reason"
                  >
                    <option value="Add Reason">Add Reason</option>

                    <option value="Add Comment">Add Comment</option>
                    <option value="Not a Violation">Not a Violation</option>
                    <option value="Different Violation">
                      Different Violation
                    </option>
                    <option value="Incorrect Details">Incorrect Details</option>
                  </Select>
                </FormControl>
              </Grid>
            </Grid>
            {incorrect === "Add Comment" && (
              <Grid
                item
                xs={12}
                className="vd-d1 vd-d2"
                style={{ marginBottom: "12px" }}
              >
                {/* text box here */}
                <TextField
                  id="outlined-basic"
                  label="Write Your Own Reason"
                  variant="outlined"
                  fullWidth
                  onChange={customIncorrect}
                  value={incorrect1}
                  style={{ marginBottom: "12px" }}
                />
                {/* <TextField
                  placeholder="Write Your Own Reason"
                  fullWidth
                  onChange={customIncorrect}
                  value={incorrect1}
                /> */}
              </Grid>
            )}
            <Button
              variant="contained"
              color="primary"
              style={{ marginTop: "10px" }}
              onClick={submitIncorrectViolation}
            >
              Save
            </Button>
          </Paper>
        </Fade>
      </Modal>
      <Snackbar open={open1} autoHideDuration={2000} onClose={handleClose1}>
        <Alert onClose={handleClose1} severity="success">
          {msg}
        </Alert>
      </Snackbar>
    </>
  );
}

export default ViolationDetail;
