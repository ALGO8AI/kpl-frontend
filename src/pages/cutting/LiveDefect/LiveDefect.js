/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import React, { useState, useEffect, useRef } from "react";
import SendIcon from "@material-ui/icons/Send";
import { useHistory, Link } from "react-router-dom";
import Grid from "@material-ui/core/Grid";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";
import {
  FEED_UnavailableViolation,
  WORKER_UnavailableViolation,
  getAllSupervisorList,
} from "../../../services/api.service";
import * as moment from "moment";
import ReactPlayer from "react-player";
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";
import { FormControl, InputLabel, Paper, Typography } from "@material-ui/core";
import {
  cuttingViolationSupervisorUpdate,
  getViolationDetailData,
  cuttingCommunicatedTo,
  violationCommentCutting,
  cuttingViolationClosedByUpdate,
  liveDefect,
} from "../../../services/cuttingApi.service";

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
      to={`/stitching/violationDetails/${data.Id}`}
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
            style={{ width: "100%", height: "100%", border: "2px solid red" }}
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

function LiveDefect(props) {
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
        const x = await FEED_UnavailableViolation();
        setVIOLATION(x);
        // console.log(x.length);
      } else if (typeOfViolation === "worker") {
        const x = await WORKER_UnavailableViolation();
        setVIOLATION(x);
        // console.log(x.length);
      }
    } catch (err) {
      // console.log(err.message);
    }
  };
  const getData = async () => {
    try {
      const x = await liveDefect();
      // console.log(x);
      setData(x.liveDefectData[0]);
      setNewSupervisor(x.liveDefectData[0].supervisor);
      setClosedBy(x.liveDefectData[0].closingSupervisor);
      setLink(x.liveDefectData[0]?.video);
      if (x.liveDefectData[0].violationReason) {
        setReason(x.liveDefectData[0].violationReason);
      }
      if (
        !(
          x.liveDefectData[0].violationReason === "Machine Breakdown" ||
          x.liveDefectData[0].violationReason === "CTR Change"
        ) &&
        x.liveDefectData[0].confirmStatus === "true"
      ) {
        setReason("Add Reason");
        setReason1(x.liveDefectData[0].violationReason);
      }

      if (x.liveDefectData[0].action) {
        setAction(x.liveDefectData[0].action);
      }
      if (
        !(
          x.liveDefectData[0].action === "Penalty" ||
          x.liveDefectData[0].action === "Supervisor Informed" ||
          x.liveDefectData[0].action === "Worker Warned"
        ) &&
        x.liveDefectData[0].confirmStatus === "true"
      ) {
        setAction("Add Comment");
        setAction1(x.liveDefectData[0].action);
      }
      if (x.liveDefectData[0].incorrectViolationReason) {
        setIncorrect(x.liveDefectData[0].incorrectViolationReason);
      }
      if (
        !(
          x.liveDefectData[0].incorrectViolationReason === "Not a Violation" ||
          x.liveDefectData[0].incorrectViolationReason ===
            "Different Violation" ||
          x.liveDefectData[0].incorrectViolationReason === "Incorrect Details"
        ) &&
        x.liveDefectData[0].incorrectStatus === "true"
      ) {
        setIncorrect("Add Comment");
        setIncorrect1(x.liveDefectData[0].incorrectViolationReason);
      }
    } catch (err) {
      // console.log(err.message);
    }
  };

  const getSupervisor = async () => {
    try {
      const resp = await getAllSupervisorList();
      // console.log(resp);
      setSupervisor(resp);
    } catch (e) {}
  };

  useEffect(() => {
    function getAlerts() {
      getData();
    }
    getAlerts();
    const interval = setInterval(() => getAlerts(), 10000);
    return () => {
      clearInterval(interval);
    };
  }, []);

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
      const x = await violationCommentCutting(
        props.id,
        res,
        act,
        true,
        false,
        "",
        data?.actualSupervisor,
        reassigned
      );
      // console.log(x);
      setMsg(x.msg);
      setOpen1(true);
      //   setTimeout(() => {
      //     history.push("/cutting/defect");
      //   }, 2000);
    } catch (e) {
      // console.log(e);
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
      const x = await violationCommentCutting(
        props.id,
        "",
        "",
        false,
        true,
        inc
      );
      // console.log(x);
      setMsg(x.msg);
      setOpen1(true);
      setOpen(false);
      //   setTimeout(() => {
      //     history.push("/cutting/defect");
      //   }, 2000);
      // } else {
      //   setOpen(false);
      // }
    } catch (e) {}
  };

  const submitCommunication = async () => {
    try {
      const resp = await cuttingCommunicatedTo(
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
    //   `/stitching/violationDetails/${id}`,
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
      case "confirm defect":
        return "Link-btn-green";
      case "not a defect":
        return "Link-btn-yellow";
      case "not known":
        return "Link-btn-red";
      default:
        return "Link-btn-red";
    }
  };
  const onSupervisorChange = async (e) => {
    try {
      setNewSupervisor(e.target.value);
      const resp = await cuttingViolationSupervisorUpdate(
        props.id,
        e.target.value
      );
      setMsg(resp.liveDefectData);
      setOpen1(true);
    } catch (e) {
      // console.log(e);
    }
  };

  const onClosedByChange = async (e) => {
    try {
      setClosedBy(e.target.value);
      const resp = await cuttingViolationClosedByUpdate(
        props.id,
        e.target.value
      );
      setMsg(resp.msg);
      setOpen1(true);
    } catch (e) {
      // console.log(e);
    }
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      Magnify(10);
    }, 3500);
    return () => {
      clearTimeout(timer);
    };
  }, [data]);
  const Magnify = (zoom) => {
    var img, glass, w, h, bw;
    img = document.getElementById("myimage");
    // img = myImg.current;
    /*create magnifier glass:*/
    if (img) {
      glass = document.getElementById("img-magnifier-glass");

      /*insert magnifier glass:*/
      img.parentElement.insertBefore(glass, img);
      /*set background properties for the magnifier glass:*/
      glass.style.backgroundImage = "url('" + img.src + "')";
      glass.style.backgroundRepeat = "no-repeat";
      glass.style.backgroundSize =
        img.width * zoom + "px " + img.height * zoom + "px";
      bw = 3;
      w = glass.offsetWidth / 2;
      h = glass.offsetHeight / 2;
      /*execute a function when someone moves the magnifier glass over the image:*/
      glass.addEventListener("mousemove", moveMagnifier);
      img.addEventListener("mousemove", moveMagnifier);
      /*and also for touch screens:*/
      glass.addEventListener("touchmove", moveMagnifier);
      img.addEventListener("touchmove", moveMagnifier);
      function moveMagnifier(e) {
        var pos, x, y;
        /*prevent any other actions that may occur when moving over the image*/
        e.preventDefault();
        /*get the cursor's x and y positions:*/
        pos = getCursorPos(e);
        x = pos.x;
        y = pos.y;
        /*prevent the magnifier glass from being positioned outside the image:*/
        if (x > img.width - w / zoom) {
          x = img.width - w / zoom;
        }
        if (x < w / zoom) {
          x = w / zoom;
        }
        if (y > img.height - h / zoom) {
          y = img.height - h / zoom;
        }
        if (y < h / zoom) {
          y = h / zoom;
        }
        /*set the position of the magnifier glass:*/
        glass.style.left = x - w + "px";
        glass.style.top = y - h + "px";
        /*display what the magnifier glass "sees":*/
        glass.style.backgroundPosition =
          "-" + (x * zoom - w + bw) + "px -" + (y * zoom - h + bw) + "px";
      }
      function getCursorPos(e) {
        var a,
          x = 0,
          y = 0;
        e = e || window.event;
        /*get the x and y positions of the image:*/
        a = img.getBoundingClientRect();
        /*calculate the cursor's x and y coordinates, relative to the image:*/
        x = e.pageX - a.left;
        y = e.pageY - a.top;
        /*consider any page scrolling:*/
        x = x - window.pageXOffset;
        y = y - window.pageYOffset;
        return { x: x, y: y };
      }
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
          {/* {localStorage.getItem("VIOLATION-TYPE") && ( */}
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
              >
                {/* {localStorage.getItem("VIOLATION-TYPE")} */}
                LIVE DEFECT
              </Typography>
            </Grid>
            <Grid container item xs={4} md={3}>
              {/* <Typography
                style={{
                  lineHeight: "21px !important",
                  height: "max-content",
                }}
                className={returnClassName(
                  localStorage.getItem("VIOLATION-STATUS").toLowerCase()
                )}
              >
                {localStorage.getItem("VIOLATION-STATUS")}
              </Typography> */}
            </Grid>
          </>
          {/* )} */}
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
                <h3 style={{ color: "black " }}>
                  Defect Id : {data?.violationId}
                </h3>
                <p style={{ color: "black" }}>
                  {data &&
                    moment(new Date(data.date))
                      .format("DD/MM/YYYY")
                      .toString()}
                </p>
              </Grid>
              {/* VIDEO */}
              <Grid container item xs={12} className="mb-16">
                <ReactPlayer
                  key={link}
                  url={link?.replace(".avi", ".mp4")}
                  controls={true}
                  width="100%"
                  height="auto"
                />
              </Grid>
              {/* IMAGE */}
              <Grid
                container
                item
                xs={12}
                className="img-magnifier-container"
                style={{ overflow: "scroll" }}
              >
                {data && (
                  <>
                    <div
                      className="img-magnifier-glass"
                      id="img-magnifier-glass"
                    ></div>
                    <img
                      id="myimage"
                      src={data.img}
                      style={{
                        width: "100%",
                        // transform: "scale(1.5)",
                        userSelect: "none",
                      }}
                      alt="img"
                      // onMouseOver={() => Magnify(3)}
                      // onMouseLeave={() => console.log("out")}
                    />
                  </>
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
                About Defect
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
                {/* OPERATOR NAME */}
                {data?.operatorName && (
                  <NameValue
                    name="OPERATOR NAME"
                    value={data && data?.operatorName}
                  />
                )}

                {/*OPERATOR ID  */}
                {data?.operatorId && (
                  <NameValue
                    name="OPERATOR ID"
                    value={data && data?.operatorId}
                  />
                )}
                {/* MACHINE ID */}
                {data?.machineId && (
                  <NameValue
                    name="MACHINE ID"
                    value={data && data?.machineId}
                  />
                )}
                {/* ROLL BARCODE NUMBER*/}
                {data?.rollBarcodeNumber && (
                  <NameValue
                    name="ROLL BARCODE NO."
                    value={data && data.rollBarcodeNumber}
                  />
                )}
                {/* ROLL CATEGORY */}
                {data?.rollCategory && (
                  <NameValue
                    name="ROLL CATEGORY"
                    value={data && data?.rollCategory}
                  />
                )}
                {/* CTR */}
                {data?.CTR && (
                  <NameValue name="CTR NO." value={data && data.CTR} />
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
                          labelId="demo-simple-select-outlined-label"
                          id="demo-simple-select-outlined"
                          value={newSupervisor}
                          onChange={onSupervisorChange}
                          label="Supervisor"
                          // multiple
                        >
                          <MenuItem value="">
                            <em>None</em>
                          </MenuItem>
                          {supervisor.length > 0 &&
                            supervisor?.map((item, index) => (
                              <MenuItem value={item.username} key={index}>
                                {item.username}
                              </MenuItem>
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
                          labelId="demo-simple-select-outlined-label"
                          id="demo-simple-select-outlined"
                          value={closedBy}
                          onChange={onClosedByChange}
                          label="Supervisor"
                          // multiple
                        >
                          <MenuItem value="">
                            <em>None</em>
                          </MenuItem>
                          {supervisor.length > 0 &&
                            supervisor?.map((item, index) => (
                              <MenuItem value={item.username} key={index}>
                                {item.username}
                              </MenuItem>
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
                  Type Of Defect
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
                    labelId="demo-simple-select-outlined-label"
                    id="demo-simple-select-outlined"
                    value={reason}
                    onChange={handleReasonChange}
                    label="Choose Reason"
                  >
                    <MenuItem value="Add Reason">Add Reason</MenuItem>

                    {SelectDropdowndata.length > 0 &&
                      SelectDropdowndata.map((item, i) => (
                        <MenuItem key={i} value={item}>
                          {item}
                        </MenuItem>
                      ))}

                    <MenuItem value="Repeated Violation">
                      Repeated Violation
                    </MenuItem>
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
                    labelId="demo-simple-select-outlined-label"
                    id="demo-simple-select-outlined"
                    value={action}
                    onChange={handleActionChange}
                    label="Choose Action"
                  >
                    <MenuItem value="Add Comment">Add Comment</MenuItem>

                    {["Penalty", "Supervisor Informed", "Worker Warned"].map(
                      (item, i) => (
                        <MenuItem key={i} value={item}>
                          {item}
                        </MenuItem>
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
                  <Button
                    variant="contained"
                    style={{
                      width: "100%",
                      padding: "8px !important",
                    }}
                    onClick={handleOpen}
                    // className="violation-btn incorrect-btn"
                  >
                    NOT A DEFECT
                  </Button>
                </Grid>
                <Grid
                  container
                  item
                  xs={12}
                  sm={12}
                  md={6}
                  style={{ padding: "12px" }}
                >
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
                    CONFIRM DEFECT
                  </Button>
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
                    labelId="demo-simple-select-outlined-label"
                    id="demo-simple-select-outlined"
                    value={incorrect}
                    onChange={handleIncorrectChange}
                    label="Choose Reason"
                  >
                    <MenuItem value="" disabled>
                      Select Reason
                    </MenuItem>
                    <MenuItem value="Add Comment">Add Comment</MenuItem>
                    <MenuItem value="Not a Violation">Not a Violation</MenuItem>
                    <MenuItem value="Different Violation">
                      Different Violation
                    </MenuItem>
                    <MenuItem value="Incorrect Details">
                      Incorrect Details
                    </MenuItem>
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

export default LiveDefect;
