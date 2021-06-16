import React, { useState, useEffect, useContext } from "react";
import { useHistory, history, Link } from "react-router-dom";
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
  getViolationDetailData,
  FEED_UnavailableViolation,
  WORKER_UnavailableViolation,
  violationComment,
  communicatedTo,
} from "../../../services/api.service";
import * as moment from "moment";
import ReactPlayer from "react-player";
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";
import {
  FormControl,
  InputLabel,
  isWidthUp,
  Typography,
} from "@material-ui/core";

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

function ViolationDetail(props) {
  console.log(props);
  const history = useHistory();
  const classes = useStyles();
  const [data, setData] = useState();
  const [isCorrect, setIsCorrect] = useState(false);
  const [isIncorrect, setIsIncorrect] = useState(false);
  const [VIOLATION, setVIOLATION] = useState([]);
  const [communicated, setCommunicated] = useState("");

  const getRecentData = async () => {
    const typeOfViolation = localStorage.getItem("VIOLATION");
    try {
      if (typeOfViolation === "feedUnavailable") {
        const x = await FEED_UnavailableViolation();
        setVIOLATION(x);
        console.log(x.length);
      } else if (typeOfViolation === "worker") {
        const x = await WORKER_UnavailableViolation();
        setVIOLATION(x);
        console.log(x.length);
      }
    } catch (err) {
      console.log(err.message);
    }
  };
  const getData = async () => {
    try {
      const x = await getViolationDetailData(props.id);
      console.log(x);
      setData(x.volIdData[0]);
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

  useEffect(() => {
    getData();
    getRecentData();
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
      const x = await violationComment(
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
        history.push("/stitching/violationLog");
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
      var txt = window.confirm(
        "Are you want to mark this violation incorrect ?"
      );
      if (txt) {
        const x = await violationComment(props.id, "", "", false, true, inc);
        console.log(x);
        setMsg(x.msg);
        setOpen1(true);
        setOpen(false);
        setTimeout(() => {
          history.push("/stitching/violationLog");
        }, 2000);
      } else {
        setOpen(false);
      }
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
      case "Incorrect":
        return "Link-btn-grey";
      case "Unresolved":
        return "Link-btn-red";
      case "Resolved":
        return "Link-btn-green";
      default:
        return "Link-btn-red";
    }
  };
  return (
    <Grid container item style={{ padding: "12px" }}>
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
                onClick={() => history.push("/stitching/violationLog")}
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
                style={{ lineHeight: "21px !important", height: "max-content" }}
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
      <Grid container item xs={12} sm={12} md={12} style={{ padding: "12px" }}>
        <Grid
          container
          item
          xs={12}
          sm={12}
          md={6}
          style={{ border: "2px solid green", padding: "12px" }}
        >
          {/* CAMERA FEED */}
          <Grid container item xs={12} className="Details_CameraFeed">
            {/* DATE & ID */}
            <Grid ontainer item xs={12} className={"Header"}>
              <h3 style={{ color: "white " }}>Violation Id : {props.id}</h3>
              <p style={{ color: "white" }}>
                {data &&
                  moment(new Date(data.date))
                    .format("DD/MM/YYYY")
                    .toString()}
              </p>
            </Grid>
            {/* VIDEO */}
            <Grid container item xs={12}>
              <ReactPlayer
                key={link}
                url={link?.replace(".avi", ".mp4")}
                controls={true}
                width="100%"
                height="auto"
              />
            </Grid>
          </Grid>
        </Grid>
        <Grid
          container
          item
          xs={12}
          sm={12}
          md={6}
          style={{ border: "2px solid blue", padding: "12px" }}
        >
          {link}
        </Grid>
      </Grid>
    </Grid>
  );
}

export default ViolationDetail;
