import React, { useState, useEffect, useContext } from "react";
import { useHistory, history, Link } from "react-router-dom";
import Grid from "@material-ui/core/Grid";
import "./ViolationDetails.scss";
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

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}
function VideoCard({ data, onClick }) {
  return (
    <Link to={`/stitching/violationDetails/${data.Id}`}>
      <Grid
        container
        item
        xs={12}
        style={{
          border: "1px solid #3f51b58a",
          padding: "1px",
          cursor: "pointer",
        }}
        // onClick={onClick}
      >
        <Grid item xs={5}>
          <img
            src={data.img}
            style={{ width: "100%", height: "100%" }}
            alt="img"
          />
        </Grid>
        <Grid item xs={7}>
          <div className="videoCard-content">
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
          </div>
        </Grid>
      </Grid>
    </Link>
  );
}

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

function ViolationDetails(props) {
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

    await violationComment(props.id, res, act, true, false, "").then((x) => {
      console.log(x);
      setMsg(x.msg);
      setOpen1(true);
      setTimeout(() => {
        history.push("/stitching/violationLog");
      }, 2000);
    });
  };

  const submitIncorrectViolation = async () => {
    let inc;
    if (incorrect === "Add Comment") {
      inc = incorrect1;
    } else {
      inc = incorrect;
    }

    await violationComment(props.id, "", "", false, true, inc).then((x) => {
      console.log(x);
      setMsg(x.msg);
      setOpen1(true);
      setOpen(false);
      setTimeout(() => {
        history.push("/stitching/violationLog");
      }, 2000);
    });
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

  return (
    <div>
      <Grid container>
        <Grid container item md={12} style={{ padding: "12px 12px 4px 12px" }}>
          {localStorage.getItem("VIOLATION-TYPE") && (
            <>
              <Typography
                variant="h6"
                style={{
                  color: "#0e4a7b",
                  borderBottom: "2px solid #0e4a7b",
                  padding: "0 8px",
                  marginRight: "12px",
                }}
              >
                {localStorage.getItem("VIOLATION-TYPE")}
              </Typography>
              <Typography
                variant="h6"
                className={`${
                  localStorage.getItem("VIOLATION-STATUS") === "Not Resolved"
                    ? "Link-btn-red"
                    : "Link-btn-green"
                }`}
              >
                {localStorage.getItem("VIOLATION-STATUS")}
              </Typography>
            </>
          )}
        </Grid>
        <Grid
          container
          item
          xs={12}
          sm={5}
          className="vd-outer-box"
          style={{ padding: "12px" }}
        >
          <Grid item xs={12} className="vd-white">
            <div className="vd-d1">
              Violation Id:{props.id}{" "}
              <span style={{ marginLeft: "auto" }}>
                {data &&
                  moment(new Date(data.date))
                    .format("DD/MM/YYYY")
                    .toString()}
              </span>
            </div>
            <div className="videoPlaceholder">
              {/* video player here */}
              <ReactPlayer
                key={link}
                url={link?.replace(".avi", ".mp4")}
                controls={true}
                //  muted={true}
                //  playing={false}
                width="100%"
                height="240px"
                style={{ postition: "fixed" }}
              />
            </div>
          </Grid>
          <Grid item xs={12} className="vd-white">
            <div className="vd-d1">
              {data && (
                <img src={data.img} style={{ width: "100%" }} alt="img" />
              )}
            </div>
          </Grid>
        </Grid>
        <Grid
          container
          item
          sm={4}
          xs={12}
          className="vd-outer-box grey-outline vd-d1"
          style={{ padding: "12px" }}
        >
          <Grid container item xs={12} className="vd-white">
            <Grid item xs={12} className="vd-d1 vd-d2">
              About Incident
            </Grid>
            <Grid item xs={6} className="vd-d3">
              Worker Name :
            </Grid>
            <Grid item xs={6} className="vd-d3">
              {data && data.workerName}
            </Grid>
            <Grid item xs={6} className="vd-d3">
              Worker Id :
            </Grid>
            <Grid item xs={6} className="vd-d3">
              {data && data.workerId}
            </Grid>

            {data?.machineId && (
              <>
                <Grid item xs={6} className="vd-d3">
                  Machine Status :
                </Grid>
                <Grid item xs={6} className="vd-d3">
                  {data && data.status === 0 ? "Off" : "On"}
                </Grid>
              </>
            )}

            {data?.machineId && (
              <>
                <Grid item xs={6} className="vd-d3">
                  Machine Id :
                </Grid>
                <Grid item xs={6} className="vd-d3">
                  {data && data.machineId}
                </Grid>
              </>
            )}

            <Grid item xs={6} className="vd-d3">
              CTR No. :
            </Grid>
            <Grid item xs={6} className="vd-d3">
              {data && data.CTR}
            </Grid>
            <Grid item xs={6} className="vd-d3">
              Wing :
            </Grid>
            <Grid item xs={6} className="vd-d3">
              {data && data.wing}
            </Grid>
            <Grid item xs={6} className="vd-d3">
              Shift :
            </Grid>
            <Grid item xs={6} className="vd-d3">
              {data && data.shift}
            </Grid>
            <Grid item xs={6} className="vd-d3">
              Line :
            </Grid>
            <Grid item xs={6} className="vd-d3">
              {data && data.line}
            </Grid>
            <Grid item xs={6} className="vd-d3">
              Zone :
            </Grid>
            <Grid item xs={6} className="vd-d3">
              {data && data.zone}
            </Grid>
            <Grid item xs={6} className="vd-d3">
              Supervisor :
            </Grid>
            <Grid item xs={6} className="vd-d3">
              {data && data.supervisor}
            </Grid>
          </Grid>
          <Grid item xs={12} className="vd-white">
            <Grid item xs={12} className="vd-d1 vd-d2">
              Violation Reason
            </Grid>
            <Grid
              item
              xs={12}
              className="vd-d1 vd-d2"
              style={{ marginTop: "10%" }}
            >
              <FormControl
                variant="outlined"
                className={classes.formControl}
                fullWidth="true"
              >
                <InputLabel htmlFor="outlined-age-native-simple">
                  Choose Reason
                </InputLabel>
                <Select native value={reason} onChange={handleReasonChange}>
                  <option aria-label="None" value="" />
                  <option value="Machine Breakdown">Machine Breakdown</option>
                  <option value="CTR Change">CTR Change</option>
                  <option value="Add Reason">Add Reason</option>
                </Select>
              </FormControl>
              {/* <Select
                labelId="demo-simple-select-outlined-label"
                id="demo-simple-select-outlined"
                value={reason}
                onChange={handleReasonChange}
                displayEmpty
                fullWidth
                // className={classes.selectEmpty}
                // inputProps={{ "aria-label": "Without label" }}
              >
                <MenuItem value="" disabled>
                  Choose Reason
                </MenuItem>
                <MenuItem value="Machine Breakdown">Machine Breakdown</MenuItem>
                <MenuItem value="CTR Change">CTR Change</MenuItem>
                <MenuItem value="Add Reason">Add Reason</MenuItem>
              </Select> */}
            </Grid>
            {reason === "Add Reason" ? (
              <Grid
                item
                xs={12}
                className="vd-d1 vd-d2"
                style={{ marginTop: "2px" }}
              >
                {/* text box here */}
                <TextField
                  placeholder="Write Your Own Reason"
                  fullWidth
                  onChange={customReason}
                  value={reason1}
                />
              </Grid>
            ) : null}
            <Grid style={{ textAlign: "center" }}>
              {/* <Button variant="contained" color="primary" style={{marginTop:'10px'}}>
                       Save
            </Button> */}
            </Grid>
          </Grid>
          <Grid item xs={12} className="vd-white">
            <Grid item xs={12} className="vd-d1 vd-d2">
              Action Taken
            </Grid>
            <Grid
              item
              xs={12}
              className="vd-d1 vd-d2"
              style={{ marginTop: "10%" }}
            >
              <FormControl
                variant="outlined"
                className={classes.formControl}
                fullWidth="true"
              >
                <InputLabel htmlFor="outlined-age-native-simple">
                  Choose Action
                </InputLabel>
                <Select native value={action} onChange={handleActionChange}>
                  <option aria-label="None" value="" />
                  <option value="Penalty">Penalty</option>
                  <option value="Supervisor Informed">
                    Supervisor Informed
                  </option>
                  <option value="Worker Warned">Worker Warned</option>
                  <option value="Add Comment">Add Comment</option>
                </Select>
              </FormControl>
              {/* <FormControl variant="outlined">
   
                <Select
                  labelId="demo-simple-select-outlined-label"
                  id="demo-simple-select-outlined"
                  value={action}
                  onChange={handleActionChange}
                  displayEmpty
                  fullWidth="true"
         
                >
                  <MenuItem value="" disabled>
                    Choose Action
                  </MenuItem>
                  <MenuItem value="Penalty">Penalty</MenuItem>
                  <MenuItem value="Supervisor Informed">
                    Supervisor Informed
                  </MenuItem>
                  <MenuItem value="Worker Warned">Worker Warned</MenuItem>
                  <MenuItem value="Add Comment">Add Comment</MenuItem>
                </Select>
              </FormControl> */}
            </Grid>
            {action === "Add Comment" ? (
              <Grid
                item
                xs={12}
                className="vd-d1 vd-d2"
                style={{ marginTop: "2px" }}
              >
                {/* text box here */}
                <TextField
                  placeholder="Write Your Own Reason"
                  fullWidth
                  onChange={customAction}
                  value={action1}
                />
              </Grid>
            ) : null}
          </Grid>
          <Grid item xs={12} className="vd-white">
            <Grid item xs={12} className="vd-d1 vd-d2">
              Communicated To
            </Grid>

            <Grid
              item
              container
              xs={12}
              className="vd-d1 vd-d2"
              style={{ marginTop: "2px" }}
            >
              <TextField
                placeholder="Communicated to"
                fullWidth
                onChange={(e) => setCommunicated(e.target.value)}
                value={communicated}
              />
            </Grid>
            <Grid container item xs={4}>
              <Button
                variant="contained"
                style={{ marginTop: "8px" }}
                onClick={submitCommunication}
              >
                SEND
              </Button>
            </Grid>
          </Grid>
          <Grid
            container
            item
            xs={12}
            className="vd-white"
            style={{ textAlign: "center" }}
          >
            <Grid item xs={6}>
              <Button
                variant="contained"
                style={{ marginTop: "10px" }}
                onClick={handleOpen}
                className="violation-btn incorrect-btn"
              >
                Incorrect Violation
              </Button>
            </Grid>
            <Grid item xs={6}>
              <Button
                className="violation-btn correct-btn"
                variant="contained"
                style={{
                  marginTop: "10px",
                  backgroundColor: "#f68f1d",
                  color: "white",
                }}
                onClick={submitConfirmViolation}
              >
                Confirm Violation
              </Button>
            </Grid>
            {/* <Grid item xs={12}>
            <Button variant="contained" color="primary" style={{marginTop:'10px',backgroundColor:'#f68f1d',color:'white'}} fullWidth>
                       Machine Breakdown
            </Button>
            </Grid> */}
          </Grid>
        </Grid>
        <Grid
          container
          item
          sm={3}
          xs={12}
          className="vd-outer-box grey-outline vd-d1"
          style={{ padding: "12px" }}
        >
          <Grid item xs={12} className="vd-white">
            <Grid item xs={12} className="vd-d1 vd-d2">
              Recent Violations
            </Grid>
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

        {/* <Grid container item xs={4} className="vd-outer-box">
          <Grid container item xs={12} className="vd-white">
              
            <Grid item container xs={12} style={{height:'12vh'}}>
                <Grid item xs={4}>
                <div className="videoPlaceholderMini"></div>
                </Grid>
                <Grid container item xs={8}>
                    <Grid item xs={6} className="vd-d3">CTR NO:</Grid><Grid item xs={6} className="vd-d3">14523</Grid>
                    <Grid item xs={6} className="vd-d3">Roll ID</Grid><Grid item xs={6} className="vd-d3">#5454</Grid>
                    <Grid item xs={6} className="vd-d3">Wing</Grid><Grid item xs={6} className="vd-d3">7</Grid>
                    <Grid item xs={6} className="vd-d3">Zone</Grid><Grid item xs={6} className="vd-d3">Zone 2</Grid>
                    <Grid item xs={6} className="vd-d3">Time</Grid><Grid item xs={6} className="vd-d3">12:56 PM</Grid>

                </Grid>
            </Grid>
          </Grid>
        </Grid>*/}
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
          <div className={classes.paper} style={{ textAlign: "center" }}>
            <h2 id="transition-modal-title">Incorrect Violation Reason</h2>
            <Grid container>
              <Grid item xs={12}>
                <Select
                  labelId="demo-simple-select-outlined-label"
                  id="demo-simple-select-outlined"
                  value={incorrect}
                  onChange={handleIncorrectChange}
                  displayEmpty
                  fullWidth
                >
                  <MenuItem value="" disabled>
                    Select Reason
                  </MenuItem>
                  <MenuItem value="Not a Violation">Not a Violation</MenuItem>
                  <MenuItem value="Different Violation">
                    Different Violation
                  </MenuItem>
                  <MenuItem value="Incorrect Details">
                    Incorrect Details
                  </MenuItem>
                  <MenuItem value="Add Comment">Add Comment</MenuItem>
                </Select>
              </Grid>
            </Grid>
            {incorrect === "Add Comment" ? (
              <Grid
                item
                xs={12}
                className="vd-d1 vd-d2"
                style={{ marginTop: "2px" }}
              >
                {/* text box here */}
                <TextField
                  placeholder="Write Your Own Reason"
                  fullWidth
                  onChange={customIncorrect}
                  value={incorrect1}
                />
              </Grid>
            ) : null}
            <Button
              variant="contained"
              color="primary"
              style={{ marginTop: "10px" }}
              onClick={submitIncorrectViolation}
            >
              Save
            </Button>
          </div>
        </Fade>
      </Modal>
      <Snackbar open={open1} autoHideDuration={2000} onClose={handleClose1}>
        <Alert onClose={handleClose1} severity="success">
          {msg}
        </Alert>
      </Snackbar>
    </div>
  );
}

export default ViolationDetails;
