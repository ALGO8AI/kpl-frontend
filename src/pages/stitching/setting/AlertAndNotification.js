import React, { useState, useEffect } from "react";
import Grid from "@material-ui/core/Grid";
import "./alertAndNotification.scss";
import ReportProblemIcon from "@material-ui/icons/ReportProblem";
import Checkbox from "@material-ui/core/Checkbox";
import Button from "@material-ui/core/Button";
import EmailIcon from "@material-ui/icons/Email";
import ChatBubbleIcon from "@material-ui/icons/ChatBubble";
import StayPrimaryPortraitIcon from "@material-ui/icons/StayPrimaryPortrait";
import MaterialTable from "material-table";
import {
  FormControl,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  Snackbar,
  TextField,
} from "@material-ui/core";
import {
  loadStitchingAlertData,
  stitchingAlert,
} from "../../../services/api.service";
import { Alert } from "@material-ui/lab";
import RoleBasedNotification from "./RoleBasedNotification";
import ManageRoles from "./ManageRoles";

function AlertAndNotification() {
  const [crowding, setCrowding] = useState({
    alertCrowding: false,
    manager: "",
    plantHead: "",
    supervisor: "",
    priority: "",
  });
  const [workerIdle, setWorkerIdle] = useState({
    alertWorker: false,
    manager: "",
    plantHead: "",
    supervisor: "",
    priority: "",
  });
  const [feed, setFeed] = useState({
    alertFeed: false,
    manager: "",
    plantHead: "",
    supervisor: "",
    priority: "",
  });
  const [msg, setMsg] = useState("");
  const [open, setOpen] = useState(false);
  const submitHandler = async () => {
    // console.log(crowding);
    // console.log(workerIdle);
    // console.log(feed);
    const DATA = {
      crowding: {
        instance: "crowding",
        alertStatus: crowding.alertCrowding ? 1 : 0,
        manager: Number(crowding.manager),
        supervisor: Number(crowding.supervisor),
        plantHead: Number(crowding.plantHead),
        priority: crowding.priority,
      },
      feedUnavailability: {
        instance: "feedUnavailability",
        alertStatus: feed.alertFeed ? 1 : 0,
        manager: Number(feed.manager),
        supervisor: Number(feed.supervisor),
        plantHead: Number(feed.plantHead),
        priority: feed.priority,
      },
      workerIdle: {
        instance: "workerIdle",
        alertStatus: workerIdle.alertWorker ? 1 : 0,
        manager: Number(workerIdle.manager),
        supervisor: Number(workerIdle.supervisor),
        plantHead: Number(workerIdle.plantHead),
        priority: workerIdle.priority,
      },
    };

    // console.log(DATA);
    await stitchingAlert(DATA).then((x) => {
      console.log(x);
      setMsg(x.msg);
      setOpen(true);
    });
  };
  const loadData = async () => {
    try {
      const x = await loadStitchingAlertData();
      let CROWD = x.crowding[0];
      let IDLE = x.workerIdle[0];
      let FEED = x.feedUnavailability[0];
      setCrowding({
        ...crowding,
        manager: CROWD.manager,
        plantHead: CROWD.plantHead,
        supervisor: CROWD.supervisor,
        priority: CROWD.priority,
        alertCrowding: Boolean(CROWD.alertStatus) ? true : false,
      });
      setWorkerIdle({
        ...workerIdle,
        manager: IDLE.manager,
        plantHead: IDLE.plantHead,
        supervisor: IDLE.supervisor,
        priority: IDLE.priority,
        alertWorker: Boolean(IDLE.alertStatus) ? true : false,
      });
      setFeed({
        ...feed,
        manager: FEED.manager,
        plantHead: FEED.plantHead,
        supervisor: FEED.supervisor,
        priority: FEED.priority,
        alertFeed: Boolean(FEED.alertStatus) ? true : false,
      });
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    loadData();
  }, []);
  return (
    <Grid container>
      <Grid container item xs={12} md={12} lg={9} style={{ padding: "12px" }}>
        <Grid item xs={12}>
          <h4 style={{ textAlign: "center" }}>Manage Alerts</h4>
        </Grid>
        <Grid
          container
          item
          xs={12}
          style={{ alignItems: "unset", marginBottom: "12px" }}
        >
          <Grid item xs={3}>
            <h4>
              <ReportProblemIcon />
            </h4>
          </Grid>
          <Grid item xs={1}>
            <h4>Alert</h4>
          </Grid>
          <Grid item xs={2}>
            <h4>Manager</h4>
          </Grid>
          <Grid item xs={2}>
            <h4>Plant Head</h4>
          </Grid>
          <Grid item xs={2}>
            <h4>Supervisor</h4>
          </Grid>
          <Grid item xs={2}>
            <h4>Priority</h4>
          </Grid>
        </Grid>

        <Grid
          container
          spacing={1}
          item
          xs={12}
          style={{ alignItems: "center", marginBottom: "12px" }}
        >
          <Grid item xs={3}>
            Crowding
          </Grid>
          <Grid item xs={1}>
            <Checkbox
              value={crowding.alertCrowding}
              checked={crowding.alertCrowding}
              name="alertCrowding"
              color="primary"
              inputProps={{ "aria-label": "secondary checkbox" }}
              onChange={(e) =>
                setCrowding({
                  ...crowding,
                  alertCrowding: e.target.checked,
                })
              }
            />
          </Grid>

          <Grid item xs={2}>
            <TextField
              id="outlined-basic"
              label="Duration"
              variant="outlined"
              placeholder="in Mins"
              inputProps={{ type: "number" }}
              onChange={(e) =>
                setCrowding({ ...crowding, manager: e.target.value })
              }
              value={crowding.manager}
            />
          </Grid>
          <Grid item xs={2}>
            <TextField
              id="outlined-basic"
              label="Duration"
              variant="outlined"
              placeholder="in Mins"
              inputProps={{ type: "number" }}
              onChange={(e) =>
                setCrowding({ ...crowding, plantHead: e.target.value })
              }
              value={crowding.plantHead}
            />
          </Grid>

          <Grid item xs={2}>
            <TextField
              id="outlined-basic"
              label="Duration"
              variant="outlined"
              placeholder="in Mins"
              inputProps={{ type: "number" }}
              onChange={(e) =>
                setCrowding({ ...crowding, supervisor: e.target.value })
              }
              value={crowding.supervisor}
            />
          </Grid>
          <Grid item xs={2}>
            <FormControl variant="outlined" fullWidth>
              {/* <InputLabel id="demo-simple-select-outlined-label">
                  Priority
                </InputLabel> */}
              <Select
                value={crowding.priority}
                onChange={(e) => {
                  setCrowding({ ...crowding, priority: e.target.value });
                }}

                // label="Priority"
              >
                <MenuItem value={"low"}>Low</MenuItem>
                <MenuItem value={"medium"}>Medium</MenuItem>
                <MenuItem value={"high"}>High</MenuItem>
              </Select>
            </FormControl>
          </Grid>
        </Grid>

        <Grid
          container
          spacing={1}
          item
          xs={12}
          style={{ alignItems: "center", marginBottom: "12px" }}
        >
          <Grid item xs={3}>
            Worker Idle
          </Grid>
          <Grid item xs={1}>
            <Checkbox
              value={workerIdle.alertWorker}
              checked={workerIdle.alertWorker}
              name="alertCrowding"
              color="primary"
              inputProps={{ "aria-label": "secondary checkbox" }}
              onChange={(e) =>
                setWorkerIdle({
                  ...workerIdle,
                  alertWorker: e.target.checked,
                })
              }
            />
          </Grid>

          <Grid item xs={2}>
            <TextField
              id="outlined-basic"
              label="Duration"
              variant="outlined"
              placeholder="in Mins"
              inputProps={{ type: "number" }}
              onChange={(e) =>
                setWorkerIdle({ ...workerIdle, manager: e.target.value })
              }
              value={workerIdle.manager}
            />
          </Grid>
          <Grid item xs={2}>
            <TextField
              id="outlined-basic"
              label="Duration"
              variant="outlined"
              placeholder="in Mins"
              inputProps={{ type: "number" }}
              onChange={(e) =>
                setWorkerIdle({ ...workerIdle, plantHead: e.target.value })
              }
              value={workerIdle.plantHead}
            />
          </Grid>

          <Grid item xs={2}>
            <TextField
              id="outlined-basic"
              label="Duration"
              variant="outlined"
              placeholder="in Mins"
              inputProps={{ type: "number" }}
              onChange={(e) =>
                setWorkerIdle({ ...workerIdle, supervisor: e.target.value })
              }
              value={workerIdle.supervisor}
            />
          </Grid>
          <Grid item xs={2}>
            <FormControl variant="outlined" fullWidth>
              {/* <InputLabel id="demo-simple-select-outlined-label">
                  Priority
                </InputLabel> */}
              <Select
                value={workerIdle.priority}
                onChange={(e) => {
                  setWorkerIdle({
                    ...workerIdle,
                    priority: e.target.value,
                  });
                }}
                // label="Priority"
              >
                <MenuItem value={"low"}>Low</MenuItem>
                <MenuItem value={"medium"}>Medium</MenuItem>
                <MenuItem value={"high"}>High</MenuItem>
              </Select>
            </FormControl>
          </Grid>
        </Grid>

        <Grid
          container
          spacing={1}
          item
          xs={12}
          style={{ alignItems: "center", marginBottom: "12px" }}
        >
          <Grid item xs={3}>
            Feed Availability
          </Grid>
          <Grid item xs={1}>
            <Checkbox
              value={feed.alertFeed}
              checked={feed.alertFeed}
              name="alertCrowding"
              color="primary"
              inputProps={{ "aria-label": "secondary checkbox" }}
              onChange={(e) =>
                setFeed({
                  ...feed,
                  alertFeed: e.target.checked,
                })
              }
            />
          </Grid>

          <Grid item xs={2}>
            <TextField
              id="outlined-basic"
              label="Duration"
              variant="outlined"
              placeholder="in Mins"
              inputProps={{ type: "number" }}
              onChange={(e) => setFeed({ ...feed, manager: e.target.value })}
              value={feed.manager}
            />
          </Grid>
          <Grid item xs={2}>
            <TextField
              id="outlined-basic"
              label="Duration"
              variant="outlined"
              placeholder="in Mins"
              inputProps={{ type: "number" }}
              onChange={(e) => setFeed({ ...feed, plantHead: e.target.value })}
              value={feed.plantHead}
            />
          </Grid>

          <Grid item xs={2}>
            <TextField
              id="outlined-basic"
              label="Duration"
              variant="outlined"
              placeholder="in Mins"
              inputProps={{ type: "number" }}
              onChange={(e) => setFeed({ ...feed, supervisor: e.target.value })}
              value={feed.supervisor}
            />
          </Grid>
          <Grid item xs={2}>
            <FormControl variant="outlined" fullWidth>
              {/* <InputLabel id="demo-simple-select-outlined-label">
                  Priority
                </InputLabel> */}
              <Select
                onChange={(e) => setFeed({ ...feed, priority: e.target.value })}
                value={feed.priority}
                // label="Priority"
              >
                <MenuItem value={"low"}>Low</MenuItem>
                <MenuItem value={"medium"}>Medium</MenuItem>
                <MenuItem value={"high"}>High</MenuItem>
              </Select>
            </FormControl>
          </Grid>
        </Grid>
        <Grid item xs={3}>
          <Button
            variant="contained"
            style={{
              backgroundColor: "#0e4a7b",
              color: "#FFF",
              marginTop: "12px",
            }}
            onClick={submitHandler}
          >
            Apply
          </Button>
          <Grid item xs={9}>
            <Snackbar
              open={open}
              autoHideDuration={2000}
              onClose={() => setOpen(false)}
            >
              <Alert onClose={() => setOpen(false)} severity="success">
                {msg}
              </Alert>
            </Snackbar>
          </Grid>
        </Grid>
        {/* end of left block */}
      </Grid>
      <Grid container item xs={12} md={5} lg={3}>
        <RoleBasedNotification />
      </Grid>
      <Grid container item xs={12}>
        <ManageRoles />
      </Grid>
    </Grid>
  );
}

export default AlertAndNotification;
