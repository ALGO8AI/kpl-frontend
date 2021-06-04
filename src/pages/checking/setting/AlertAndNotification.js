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
  Typography,
} from "@material-ui/core";
import {
  loadStitchingAlertData,
  stitchingAlert,
  stitchingNotification,
} from "../../../services/api.service";
import { Alert } from "@material-ui/lab";
import RoleBasedNotification from "./RoleBasedNotification";
import ManageRoles from "./ManageRoles";
import AddUser from "./AddUser";

function AlertAndNotification() {
  const [manager, setManager] = useState({
    mail: false,
    text: false,
    push: false,
  });

  const [helper, setHelper] = useState({
    mail: false,
    text: false,
    push: false,
  });

  const [supervisor, setSupervisor] = useState({
    mail: false,
    text: false,
    push: false,
  });
  const [wingIncharge, setWingIncharge] = useState({
    mail: false,
    text: false,
    push: false,
  });
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

    const DATA_ROLE = {
      manager: {
        mail: manager.mail ? 1 : 0,
        sms: manager.text ? 1 : 0,
        push: manager.push ? 1 : 0,
      },
      helper: {
        mail: helper.mail ? 1 : 0,
        sms: helper.text ? 1 : 0,
        push: helper.push ? 1 : 0,
      },
      supervisor: {
        mail: supervisor.mail ? 1 : 0,
        sms: supervisor.text ? 1 : 0,
        push: supervisor.push ? 1 : 0,
      },
      wingIncharge: {
        mail: wingIncharge.mail ? 1 : 0,
        sms: wingIncharge.text ? 1 : 0,
        push: wingIncharge.push ? 1 : 0,
      },
    };

    // console.log(DATA);
    try {
      const x = await stitchingAlert(DATA);
      console.log(x);
      setMsg(x.msg);
      setOpen(true);

      const y = await stitchingNotification(DATA_ROLE);
      console.log(y);
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

      let MANAGER = x.mode[2];
      let HELPER = x.mode[3];
      let SUPERVISOR = x.mode[1];
      let WINGINCHARGE = x.mode[0];

      setManager({
        ...manager,
        mail: Boolean(MANAGER.modeMail) ? true : false,
        text: Boolean(MANAGER.modetext) ? true : false,
        push: Boolean(MANAGER.modeNotif) ? true : false,
      });

      setHelper({
        ...helper,
        mail: Boolean(HELPER.modeMail) ? true : false,
        text: Boolean(HELPER.modetext) ? true : false,
        push: Boolean(HELPER.modeNotif) ? true : false,
      });

      setSupervisor({
        ...supervisor,
        mail: Boolean(SUPERVISOR.modeMail) ? true : false,
        text: Boolean(SUPERVISOR.modetext) ? true : false,
        push: Boolean(SUPERVISOR.modeNotif) ? true : false,
      });

      setWingIncharge({
        ...wingIncharge,
        mail: Boolean(WINGINCHARGE.modeMail) ? true : false,
        text: Boolean(WINGINCHARGE.modetext) ? true : false,
        push: Boolean(WINGINCHARGE.modeNotif) ? true : false,
      });
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
      <Grid container item xs={12} md={12} lg={12} style={{ padding: "12px" }}>
        <Grid item xs={12}>
          <Typography variant="h4" style={{ textAlign: "Left" }}>
            Manage Alerts
          </Typography>
        </Grid>
        <Grid
          container
          item
          xs={12}
          style={{ alignItems: "unset", marginBottom: "12px" }}
        >
          <Grid item xs={2}>
            <h4>{/* <ReportProblemIcon /> */}</h4>
          </Grid>
          <Grid item xs={2}>
            {/* <h4>Alert</h4> */}
          </Grid>
          <Grid item xs={2}>
            <Typography
              variant="h5"
              style={{ textAlign: "center", color: "#3f51b5" }}
            >
              Manager
            </Typography>
          </Grid>
          <Grid item xs={2}>
            <Typography
              variant="h5"
              style={{ textAlign: "center", color: "#3f51b5" }}
            >
              Wing Incharge
            </Typography>
          </Grid>
          <Grid item xs={2}>
            <Typography
              variant="h5"
              style={{ textAlign: "center", color: "#3f51b5" }}
            >
              Helper
            </Typography>
          </Grid>
          <Grid item xs={2}>
            <Typography
              variant="h5"
              style={{ textAlign: "center", color: "#3f51b5" }}
            >
              Supervisor
            </Typography>
          </Grid>
          {/* <Grid item xs={2}>
            <h4>Priority</h4>
          </Grid> */}
        </Grid>

        <Grid
          container
          spacing={1}
          item
          xs={12}
          style={{ alignItems: "center", marginBottom: "12px" }}
        >
          <Grid item xs={2}>
            {/* <h3>NOTIFICATION</h3> */}
          </Grid>
          <Grid item xs={2}></Grid>
          <Grid item xs={2}>
            <Grid xs={12} item container style={{ marginBottom: "12px" }}>
              <Grid className="custom-checkbox" item xs={2}>
                <label className="NotificationBadge">
                  <input
                    type="checkbox"
                    value={manager.mail}
                    checked={manager.mail}
                    onChange={(e) =>
                      setManager({ ...manager, mail: e.target.checked })
                    }
                  />
                  <span class="label">
                    <EmailIcon />
                  </span>
                </label>
              </Grid>
              <Grid className="custom-checkbox" item xs={2}>
                <label className="NotificationBadge">
                  <input
                    type="checkbox"
                    value={manager.text}
                    checked={manager.text}
                    onChange={(e) =>
                      setManager({ ...manager, text: e.target.checked })
                    }
                  />
                  <span class="label">
                    <ChatBubbleIcon />
                  </span>
                </label>
              </Grid>
              <Grid className="custom-checkbox" item xs={2}>
                <label className="NotificationBadge">
                  <input
                    type="checkbox"
                    value={manager.push}
                    checked={manager.push}
                    onChange={(e) =>
                      setManager({ ...manager, push: e.target.checked })
                    }
                  />
                  <span class="label">
                    <StayPrimaryPortraitIcon />
                  </span>
                </label>
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={2}>
            <Grid xs={12} item container style={{ marginBottom: "12px" }}>
              <Grid className="custom-checkbox" item xs={2}>
                <label className="NotificationBadge">
                  <input
                    type="checkbox"
                    value={wingIncharge.mail}
                    checked={wingIncharge.mail}
                    onChange={(e) =>
                      setWingIncharge({
                        ...wingIncharge,
                        mail: e.target.checked,
                      })
                    }
                  />
                  <span class="label">
                    <EmailIcon />
                  </span>
                </label>
              </Grid>
              <Grid className="custom-checkbox" item xs={2}>
                <label className="NotificationBadge">
                  <input
                    type="checkbox"
                    value={wingIncharge.text}
                    checked={wingIncharge.text}
                    onChange={(e) =>
                      setWingIncharge({
                        ...wingIncharge,
                        text: e.target.checked,
                      })
                    }
                  />
                  <span class="label">
                    <ChatBubbleIcon />
                  </span>
                </label>
              </Grid>
              <Grid className="custom-checkbox" item xs={2}>
                <label className="NotificationBadge">
                  <input
                    type="checkbox"
                    value={wingIncharge.push}
                    checked={wingIncharge.push}
                    onChange={(e) =>
                      setWingIncharge({
                        ...wingIncharge,
                        push: e.target.checked,
                      })
                    }
                  />
                  <span class="label">
                    <StayPrimaryPortraitIcon />
                  </span>
                </label>
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={2}>
            <Grid xs={12} item container style={{ marginBottom: "12px" }}>
              <Grid className="custom-checkbox" item xs={2}>
                <label className="NotificationBadge">
                  <input
                    type="checkbox"
                    value={helper.mail}
                    checked={helper.mail}
                    onChange={(e) =>
                      setHelper({ ...helper, mail: e.target.checked })
                    }
                  />
                  <span class="label">
                    <EmailIcon />
                  </span>
                </label>
              </Grid>
              <Grid className="custom-checkbox" item xs={2}>
                <label className="NotificationBadge">
                  <input
                    type="checkbox"
                    value={helper.text}
                    checked={helper.text}
                    onChange={(e) =>
                      setHelper({ ...helper, text: e.target.checked })
                    }
                  />
                  <span class="label">
                    <ChatBubbleIcon />
                  </span>
                </label>
              </Grid>
              <Grid className="custom-checkbox" item xs={2}>
                <label className="NotificationBadge">
                  <input
                    type="checkbox"
                    value={helper.push}
                    checked={helper.push}
                    onChange={(e) =>
                      setHelper({ ...helper, push: e.target.checked })
                    }
                  />
                  <span class="label">
                    <StayPrimaryPortraitIcon />
                  </span>
                </label>
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={2}>
            <Grid xs={12} item container style={{ marginBottom: "12px" }}>
              <Grid className="custom-checkbox" item xs={2}>
                <label className="NotificationBadge">
                  <input
                    type="checkbox"
                    value={supervisor.mail}
                    checked={supervisor.mail}
                    onChange={(e) =>
                      setSupervisor({ ...supervisor, mail: e.target.checked })
                    }
                  />
                  <span class="label">
                    <EmailIcon />
                  </span>
                </label>
              </Grid>
              <Grid className="custom-checkbox" item xs={2}>
                <label className="NotificationBadge">
                  <input
                    type="checkbox"
                    value={supervisor.text}
                    checked={supervisor.text}
                    onChange={(e) =>
                      setSupervisor({ ...supervisor, text: e.target.checked })
                    }
                  />
                  <span class="label">
                    <ChatBubbleIcon />
                  </span>
                </label>
              </Grid>
              <Grid className="custom-checkbox" item xs={2}>
                <label className="NotificationBadge">
                  <input
                    type="checkbox"
                    value={supervisor.push}
                    checked={supervisor.push}
                    onChange={(e) =>
                      setSupervisor({ ...supervisor, push: e.target.checked })
                    }
                  />
                  <span class="label">
                    <StayPrimaryPortraitIcon />
                  </span>
                </label>
              </Grid>
            </Grid>
          </Grid>
        </Grid>

        <Grid
          container
          spacing={1}
          item
          xs={12}
          style={{ alignItems: "center", marginBottom: "12px" }}
        >
          <Grid container item xs={2}>
            <Grid xs={12} item style={{ marginBottom: "12px" }}></Grid>
            Crowding
          </Grid>
          <Grid item xs={2}>
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

          <Grid container item xs={2}>
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
              fullWidth
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
              fullWidth
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
              fullWidth
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
              fullWidth
              value={crowding.supervisor}
            />
          </Grid>
          {/* <Grid item xs={2}>
            <FormControl variant="outlined" fullWidth>

              <Select
                value={crowding.priority}
                onChange={(e) => {
                  setCrowding({ ...crowding, priority: e.target.value });
                }}


              >
                <MenuItem value={"low"}>Low</MenuItem>
                <MenuItem value={"medium"}>Medium</MenuItem>
                <MenuItem value={"high"}>High</MenuItem>
              </Select>
            </FormControl>
          </Grid> */}
        </Grid>

        <Grid
          container
          spacing={1}
          item
          xs={12}
          style={{ alignItems: "center", marginBottom: "12px" }}
        >
          <Grid item xs={2}>
            Worker Idle
          </Grid>
          <Grid item xs={2}>
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
              fullWidth
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
              fullWidth
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
              fullWidth
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
              fullWidth
              value={workerIdle.supervisor}
            />
          </Grid>
          {/* <Grid item xs={2}>
            <FormControl variant="outlined" fullWidth>

              <Select
                value={workerIdle.priority}
                onChange={(e) => {
                  setWorkerIdle({
                    ...workerIdle,
                    priority: e.target.value,
                  });
                }}
       
              >
                <MenuItem value={"low"}>Low</MenuItem>
                <MenuItem value={"medium"}>Medium</MenuItem>
                <MenuItem value={"high"}>High</MenuItem>
              </Select>
            </FormControl>
          </Grid> */}
        </Grid>

        <Grid
          container
          spacing={1}
          item
          xs={12}
          style={{ alignItems: "center", marginBottom: "12px" }}
        >
          <Grid item xs={2}>
            Feed Availability
          </Grid>
          <Grid item xs={2}>
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
              fullWidth
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
              fullWidth
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
              fullWidth
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
              fullWidth
              value={feed.supervisor}
            />
          </Grid>
          {/* <Grid item xs={2}>
            <FormControl variant="outlined" fullWidth>
 
              <Select
                onChange={(e) => setFeed({ ...feed, priority: e.target.value })}
                value={feed.priority}
        
              >
                <MenuItem value={"low"}>Low</MenuItem>
                <MenuItem value={"medium"}>Medium</MenuItem>
                <MenuItem value={"high"}>High</MenuItem>
              </Select>
            </FormControl>
          </Grid> */}
        </Grid>

        <Grid
          container
          spacing={1}
          item
          xs={12}
          style={{ alignItems: "center", marginBottom: "12px" }}
        >
          <Grid item xs={2}>
            Machine Breakdown
          </Grid>
          <Grid item xs={2}>
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
              fullWidth
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
              fullWidth
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
              fullWidth
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
              fullWidth
              value={machineBreak.supervisor}
            />
          </Grid>
          {/* <Grid item xs={2}>
            <FormControl variant="outlined" fullWidth>

              <Select
                onChange={(e) =>
                  setMachineBreak({ ...machineBreak, priority: e.target.value })
                }
                value={machineBreak.priority}
             
              >
                <MenuItem value={"low"}>Low</MenuItem>
                <MenuItem value={"medium"}>Medium</MenuItem>
                <MenuItem value={"high"}>High</MenuItem>
              </Select>
            </FormControl>
          </Grid> */}
        </Grid>

        <Grid
          container
          spacing={1}
          item
          xs={12}
          style={{ alignItems: "center", marginBottom: "12px" }}
        >
          <Grid item xs={2}>
            Active Monitoring
          </Grid>
          <Grid item xs={2}>
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
              fullWidth
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
              fullWidth
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
              fullWidth
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
              fullWidth
              value={activeMonitor.supervisor}
            />
          </Grid>
          {/* <Grid item xs={2}>
            <FormControl variant="outlined" fullWidth>
       
              <Select
                onChange={(e) =>
                  setactiveMonitor({
                    ...activeMonitor,
                    priority: e.target.value,
                  })
                }
                value={activeMonitor.priority}
              
              >
                <MenuItem value={"low"}>Low</MenuItem>
                <MenuItem value={"medium"}>Medium</MenuItem>
                <MenuItem value={"high"}>High</MenuItem>
              </Select>
            </FormControl>
          </Grid> */}
        </Grid>
        <Grid container item xs={12}>
          <Grid md={11}></Grid>
          <Grid md={1}>
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
          </Grid>
        </Grid>
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
        {/* end of left block */}
      </Grid>
      {/* <Grid container item xs={12} md={5} lg={3}>
        <RoleBasedNotification />
      </Grid> */}

      {/* <Grid container item xs={12}>
        <ManageRoles />
      </Grid>
      <Grid container item xs={4}>
        <AddUser />
      </Grid> */}
    </Grid>
  );
}

export default AlertAndNotification;
