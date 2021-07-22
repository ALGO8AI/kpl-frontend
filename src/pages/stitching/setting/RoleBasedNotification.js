/* eslint-disable react-hooks/exhaustive-deps */
import {
  Button,
  Checkbox,
  Grid,
  makeStyles,
  Snackbar,
} from "@material-ui/core";
import EmailIcon from "@material-ui/icons/Email";
import ChatBubbleIcon from "@material-ui/icons/ChatBubble";
import ReportProblemIcon from "@material-ui/icons/ReportProblem";
import StayPrimaryPortraitIcon from "@material-ui/icons/StayPrimaryPortrait";
import React, { useState, useEffect } from "react";
import {
  loadStitchingAlertData,
  stitchingNotification,
} from "../../../services/api.service";
import { Alert } from "@material-ui/lab";
// import "./alertAndNotification.css";
const useStyles = makeStyles((theme) => ({
  box: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
}));

function RoleBasedNotification() {
  const Classes = useStyles();

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
  const [msg, setMsg] = useState("");
  const [open, setOpen] = useState(false);
  const submitHandler = async () => {
    const DATA = {
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

    try {
      const x = await stitchingNotification(DATA);
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
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  return (
    <>
      <Grid container item xs={12} className="AlertBox">
        <Grid container item xs={12}>
          <h4>Role Based Notification</h4>
        </Grid>
        <Grid
          item
          spacing={1}
          container
          xs={12}
          md={12}
          style={{ alignItems: "center" }}
        >
          <Grid item xs={3} className={Classes.box}>
            <h4>
              <ReportProblemIcon />
            </h4>
          </Grid>
          <Grid item xs={3} className={Classes.box}>
            <h4>
              <EmailIcon />
            </h4>
          </Grid>
          <Grid item xs={3} className={Classes.box}>
            <h4>
              <ChatBubbleIcon />
            </h4>
          </Grid>
          <Grid item xs={3} className={Classes.box}>
            <h4>
              <StayPrimaryPortraitIcon />
            </h4>
          </Grid>
        </Grid>

        <Grid
          item
          spacing={1}
          container
          xs={12}
          md={12}
          style={{ alignItems: "center" }}
        >
          <Grid item xs={3} className={Classes.box}>
            Manager
          </Grid>
          <Grid item xs={3} className={Classes.box}>
            <Checkbox
              value={manager.mail}
              checked={manager.mail}
              name="alertCrowding"
              color="primary"
              inputProps={{ "aria-label": "secondary checkbox" }}
              onChange={(e) =>
                setManager({ ...manager, mail: e.target.checked })
              }
            />
          </Grid>
          <Grid item xs={3} className={Classes.box}>
            <Checkbox
              value={manager.text}
              checked={manager.text}
              name="alertCrowding"
              color="primary"
              inputProps={{ "aria-label": "secondary checkbox" }}
              onChange={(e) =>
                setManager({ ...manager, text: e.target.checked })
              }
            />
          </Grid>
          <Grid item xs={3} className={Classes.box}>
            <Checkbox
              value={manager.push}
              checked={manager.push}
              name="alertCrowding"
              color="primary"
              inputProps={{ "aria-label": "secondary checkbox" }}
              onChange={(e) =>
                setManager({ ...manager, push: e.target.checked })
              }
            />
          </Grid>
        </Grid>

        <Grid
          item
          spacing={1}
          container
          xs={12}
          md={12}
          style={{ alignItems: "center" }}
        >
          <Grid item xs={3} className={Classes.box}>
            Wing Incharge
          </Grid>
          <Grid item xs={3} className={Classes.box}>
            <Checkbox
              value={wingIncharge.mail}
              checked={wingIncharge.mail}
              name="alertCrowding"
              color="primary"
              inputProps={{ "aria-label": "secondary checkbox" }}
              onChange={(e) =>
                setWingIncharge({ ...wingIncharge, mail: e.target.checked })
              }
            />
          </Grid>
          <Grid item xs={3} className={Classes.box}>
            <Checkbox
              value={wingIncharge.text}
              checked={wingIncharge.text}
              name="alertCrowding"
              color="primary"
              inputProps={{ "aria-label": "secondary checkbox" }}
              onChange={(e) =>
                setWingIncharge({ ...wingIncharge, text: e.target.checked })
              }
            />
          </Grid>
          <Grid item xs={3} className={Classes.box}>
            <Checkbox
              value={wingIncharge.push}
              checked={wingIncharge.push}
              name="alertCrowding"
              color="primary"
              inputProps={{ "aria-label": "secondary checkbox" }}
              onChange={(e) =>
                setWingIncharge({ ...wingIncharge, push: e.target.checked })
              }
            />
          </Grid>
        </Grid>

        <Grid
          item
          spacing={1}
          container
          xs={12}
          md={12}
          style={{ alignItems: "center" }}
        >
          <Grid item xs={3} className={Classes.box}>
            Supervisor
          </Grid>
          <Grid item xs={3} className={Classes.box}>
            <Checkbox
              value={supervisor.mail}
              checked={supervisor.mail}
              name="alertCrowding"
              color="primary"
              inputProps={{ "aria-label": "secondary checkbox" }}
              onChange={(e) =>
                setSupervisor({ ...supervisor, mail: e.target.checked })
              }
            />
          </Grid>
          <Grid item xs={3} className={Classes.box}>
            <Checkbox
              value={supervisor.text}
              checked={supervisor.text}
              name="alertCrowding"
              color="primary"
              inputProps={{ "aria-label": "secondary checkbox" }}
              onChange={(e) =>
                setSupervisor({ ...supervisor, text: e.target.checked })
              }
            />
          </Grid>
          <Grid item xs={3} className={Classes.box}>
            <Checkbox
              value={supervisor.push}
              checked={supervisor.push}
              name="alertCrowding"
              color="primary"
              inputProps={{ "aria-label": "secondary checkbox" }}
              onChange={(e) =>
                setSupervisor({ ...supervisor, push: e.target.checked })
              }
            />
          </Grid>
        </Grid>
        <Grid
          item
          spacing={1}
          container
          xs={12}
          md={12}
          style={{ alignItems: "center" }}
        >
          <Grid item xs={3} className={Classes.box}>
            Helper
          </Grid>
          <Grid item xs={3} className={Classes.box}>
            <Checkbox
              value={helper.mail}
              checked={helper.mail}
              name="alertCrowding"
              color="primary"
              inputProps={{ "aria-label": "secondary checkbox" }}
              onChange={(e) => setHelper({ ...helper, mail: e.target.checked })}
            />
          </Grid>
          <Grid item xs={3} className={Classes.box}>
            <Checkbox
              value={helper.text}
              checked={helper.text}
              name="alertCrowding"
              color="primary"
              inputProps={{ "aria-label": "secondary checkbox" }}
              onChange={(e) => setHelper({ ...helper, text: e.target.checked })}
            />
          </Grid>
          <Grid item xs={3} className={Classes.box}>
            <Checkbox
              value={helper.push}
              checked={helper.push}
              name="alertCrowding"
              color="primary"
              inputProps={{ "aria-label": "secondary checkbox" }}
              onChange={(e) => setHelper({ ...helper, push: e.target.checked })}
            />
          </Grid>
        </Grid>

        <Grid item xs={6}>
          <Button
            variant="contained"
            style={{ backgroundColor: "#0e4a7b", color: "#FFF" }}
            onClick={submitHandler}
          >
            Apply
          </Button>
        </Grid>
        <Grid item xs={6}>
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
    </>
  );
}

export default RoleBasedNotification;
