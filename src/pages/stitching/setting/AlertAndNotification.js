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
import AddUser from "./AddUser";

function AlertAndNotification() {
  const [crowding, setCrowding] = useState({
    alert: false,
    manager: "",
    helper: "",
    supervisor: "",
    priority: "",
    wingIncharge: "",
  });
  const [workerIdle, setWorkerIdle] = useState({
    alert: false,
    manager: "",
    helper: "",
    supervisor: "",
    priority: "",
    wingIncharge: "",
  });
  const [feed, setFeed] = useState({
    alert: false,
    manager: "",
    helper: "",
    supervisor: "",
    priority: "",
    wingIncharge: "",
  });
  const [machineBreak, setMachineBreak] = useState({
    alert: false,
    manager: "",
    helper: "",
    supervisor: "",
    priority: "",
    wingIncharge: "",
  });
  const [activeMonitor, setactiveMonitor] = useState({
    alert: false,
    manager: "",
    helper: "",
    supervisor: "",
    priority: "",
    wingIncharge: "",
  });
  const [msg, setMsg] = useState("");
  const [open, setOpen] = useState(false);
  const submitHandler = async () => {
    // console.log(crowding);
    // console.log(workerIdle);
    // console.log(feed);
    const DATA = {
      Crowding: {
        instance: "Crowding",
        alertStatus: crowding.alert ? 1 : 0,
        manager: Number(crowding.manager),
        supervisor: Number(crowding.supervisor),
        helper: Number(crowding.helper),
        priority: crowding.priority,
        wingIncharge: crowding.wingIncharge,
      },
      "Feed Availability": {
        instance: "Feed Availability",
        alertStatus: feed.alert ? 1 : 0,
        manager: Number(feed.manager),
        supervisor: Number(feed.supervisor),
        helper: Number(feed.helper),
        priority: feed.priority,
        wingIncharge: feed.wingIncharge,
      },
      "Worker Not Available": {
        instance: "Worker Not Available",
        alertStatus: workerIdle.alert ? 1 : 0,
        manager: Number(workerIdle.manager),
        supervisor: Number(workerIdle.supervisor),
        helper: Number(workerIdle.helper),
        priority: workerIdle.priority,
        wingIncharge: workerIdle.wingIncharge,
      },
      "Machine Breakdown": {
        instance: "Machine Breakdown",
        alertStatus: machineBreak.alert ? 1 : 0,
        manager: Number(machineBreak.manager),
        supervisor: Number(machineBreak.supervisor),
        helper: Number(machineBreak.helper),
        priority: machineBreak.priority,
        wingIncharge: machineBreak.wingIncharge,
      },

      "Checker Active Monitoring": {
        instance: "Checker Active Monitoring",
        alertStatus: activeMonitor.alert ? 1 : 0,
        manager: Number(activeMonitor.manager),
        supervisor: Number(activeMonitor.supervisor),
        helper: Number(activeMonitor.helper),
        priority: activeMonitor.priority,
        wingIncharge: activeMonitor.wingIncharge,
      },
    };

    // console.log(DATA);
    try {
      const x = await stitchingAlert(DATA);
      console.log(x);
      setMsg(x.msg);
      setOpen(true);
    } catch (err) {
      console.log(err);
    }
  };
  const loadData = async () => {
    try {
      const x = await loadStitchingAlertData();
      console.log(x);
      let CROWD = x.crowding[0];
      let IDLE = x.workerIdle[0];
      let FEED = x.feedUnavailability[0];
      let BREAK = x.machineBreakdown[0];
      let ACTIVE = x.checkerActiveMonitoring[0];
      setCrowding({
        ...crowding,
        manager: CROWD.manager,
        helper: CROWD.helper,
        supervisor: CROWD.supervisor,
        priority: CROWD.priority,
        wingIncharge: CROWD.wingIncharge,
        alert: Boolean(CROWD.alertStatus) ? true : false,
      });
      setWorkerIdle({
        ...workerIdle,
        manager: IDLE.manager,
        helper: IDLE.helper,
        supervisor: IDLE.supervisor,
        priority: IDLE.priority,
        wingIncharge: IDLE.wingIncharge,

        alert: Boolean(IDLE.alertStatus) ? true : false,
      });
      setFeed({
        ...feed,
        manager: FEED.manager,
        helper: FEED.helper,
        supervisor: FEED.supervisor,
        priority: FEED.priority,
        wingIncharge: FEED.wingIncharge,
        alert: Boolean(FEED.alertStatus) ? true : false,
      });

      setMachineBreak({
        ...machineBreak,
        manager: BREAK.manager,
        helper: BREAK.helper,
        supervisor: BREAK.supervisor,
        priority: BREAK.priority,
        wingIncharge: BREAK.wingIncharge,
        alert: Boolean(BREAK.alertStatus) ? true : false,
      });
      setactiveMonitor({
        ...activeMonitor,
        manager: ACTIVE.manager,
        helper: ACTIVE.helper,
        supervisor: ACTIVE.supervisor,
        priority: ACTIVE.priority,
        wingIncharge: ACTIVE.wingIncharge,
        alert: Boolean(ACTIVE.alertStatus) ? true : false,
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
          <Grid item xs={1}>
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
            <h4>Wing Incharge</h4>
          </Grid>
          <Grid item xs={2}>
            <h4>Helper</h4>
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
          <Grid item xs={1}>
            Crowding
          </Grid>
          <Grid item xs={1}>
            <Checkbox
              value={crowding.alert}
              checked={crowding.alert}
              name="alertCrowding"
              color="primary"
              inputProps={{ "aria-label": "secondary checkbox" }}
              onChange={(e) =>
                setCrowding({
                  ...crowding,
                  alert: e.target.checked,
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
                setCrowding({ ...crowding, wingIncharge: e.target.value })
              }
              value={crowding.wingIncharge}
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
                setCrowding({ ...crowding, helper: e.target.value })
              }
              value={crowding.helper}
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
          <Grid item xs={1}>
            Worker Idle
          </Grid>
          <Grid item xs={1}>
            <Checkbox
              value={workerIdle.alert}
              checked={workerIdle.alert}
              name="alertCrowding"
              color="primary"
              inputProps={{ "aria-label": "secondary checkbox" }}
              onChange={(e) =>
                setWorkerIdle({
                  ...workerIdle,
                  alert: e.target.checked,
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
                setWorkerIdle({ ...workerIdle, wingIncharge: e.target.value })
              }
              value={workerIdle.wingIncharge}
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
                setWorkerIdle({ ...workerIdle, helper: e.target.value })
              }
              value={workerIdle.helper}
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
          <Grid item xs={1}>
            Feed Availability
          </Grid>
          <Grid item xs={1}>
            <Checkbox
              value={feed.alert}
              checked={feed.alert}
              name="alertCrowding"
              color="primary"
              inputProps={{ "aria-label": "secondary checkbox" }}
              onChange={(e) =>
                setFeed({
                  ...feed,
                  alert: e.target.checked,
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
              onChange={(e) =>
                setFeed({ ...feed, wingIncharge: e.target.value })
              }
              value={feed.wingIncharge}
            />
          </Grid>
          <Grid item xs={2}>
            <TextField
              id="outlined-basic"
              label="Duration"
              variant="outlined"
              placeholder="in Mins"
              inputProps={{ type: "number" }}
              onChange={(e) => setFeed({ ...feed, helper: e.target.value })}
              value={feed.helper}
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

        <Grid
          container
          spacing={1}
          item
          xs={12}
          style={{ alignItems: "center", marginBottom: "12px" }}
        >
          <Grid item xs={1}>
            Machine Breakdown
          </Grid>
          <Grid item xs={1}>
            <Checkbox
              value={machineBreak.alert}
              checked={machineBreak.alert}
              name="alertCrowding"
              color="primary"
              inputProps={{ "aria-label": "secondary checkbox" }}
              onChange={(e) =>
                setMachineBreak({
                  ...machineBreak,
                  alert: e.target.checked,
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
                setMachineBreak({ ...machineBreak, manager: e.target.value })
              }
              value={machineBreak.manager}
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
                setMachineBreak({
                  ...machineBreak,
                  wingIncharge: e.target.value,
                })
              }
              value={machineBreak.wingIncharge}
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
                setMachineBreak({ ...machineBreak, helper: e.target.value })
              }
              value={machineBreak.helper}
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
                setMachineBreak({ ...machineBreak, supervisor: e.target.value })
              }
              value={machineBreak.supervisor}
            />
          </Grid>
          <Grid item xs={2}>
            <FormControl variant="outlined" fullWidth>
              {/* <InputLabel id="demo-simple-select-outlined-label">
                  Priority
                </InputLabel> */}
              <Select
                onChange={(e) =>
                  setMachineBreak({ ...machineBreak, priority: e.target.value })
                }
                value={machineBreak.priority}
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
          <Grid item xs={1}>
            Active Monitoring
          </Grid>
          <Grid item xs={1}>
            <Checkbox
              value={activeMonitor.alert}
              checked={activeMonitor.alert}
              name="alertCrowding"
              color="primary"
              inputProps={{ "aria-label": "secondary checkbox" }}
              onChange={(e) =>
                setactiveMonitor({
                  ...activeMonitor,
                  alert: e.target.checked,
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
                setactiveMonitor({ ...activeMonitor, manager: e.target.value })
              }
              value={activeMonitor.manager}
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
                setactiveMonitor({
                  ...activeMonitor,
                  wingIncharge: e.target.value,
                })
              }
              value={activeMonitor.wingIncharge}
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
                setactiveMonitor({ ...activeMonitor, helper: e.target.value })
              }
              value={activeMonitor.helper}
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
                setactiveMonitor({
                  ...activeMonitor,
                  supervisor: e.target.value,
                })
              }
              value={activeMonitor.supervisor}
            />
          </Grid>
          <Grid item xs={2}>
            <FormControl variant="outlined" fullWidth>
              {/* <InputLabel id="demo-simple-select-outlined-label">
                  Priority
                </InputLabel> */}
              <Select
                onChange={(e) =>
                  setactiveMonitor({
                    ...activeMonitor,
                    priority: e.target.value,
                  })
                }
                value={activeMonitor.priority}
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
      <Grid container item xs={4}>
        <AddUser />
      </Grid>
      <Grid container item xs={12}>
        <ManageRoles />
      </Grid>
    </Grid>
  );
}

export default AlertAndNotification;
