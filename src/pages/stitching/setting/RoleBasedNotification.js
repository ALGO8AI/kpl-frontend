import {
  Button,
  Checkbox,
  Grid,
  makeStyles,
  Paper,
  Snackbar,
} from "@material-ui/core";
import EmailIcon from "@material-ui/icons/Email";
import ChatBubbleIcon from "@material-ui/icons/ChatBubble";
import ReportProblemIcon from "@material-ui/icons/ReportProblem";
import StayPrimaryPortraitIcon from "@material-ui/icons/StayPrimaryPortrait";
import React, { useState, useEffect } from "react";
import {
  loadStitchingAlertData,
  stitchingAlert,
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

  const [plantHead, setPlantHead] = useState({
    mail: false,
    text: false,
    push: false,
  });

  const [supervisor, setSupervisor] = useState({
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
      plantHead: {
        mail: plantHead.mail ? 1 : 0,
        sms: plantHead.text ? 1 : 0,
        push: plantHead.push ? 1 : 0,
      },
      supervisor: {
        mail: supervisor.mail ? 1 : 0,
        sms: supervisor.text ? 1 : 0,
        push: supervisor.push ? 1 : 0,
      },
    };

    await stitchingNotification(DATA).then((x) => {
      console.log(x);
      setMsg(x.msg);
      setOpen(true);
    });
  };
  const loadData = async () => {
    try {
      const x = await loadStitchingAlertData();
      console.log(x.mode[2]);
      let MANAGER = x.mode[2];
      let PLANTHEAD = x.mode[0];
      let SUPERVISOR = x.mode[1];

      setManager({
        ...manager,
        mail: Boolean(MANAGER.modeMail) ? true : false,
        text: Boolean(MANAGER.modetext) ? true : false,
        push: Boolean(MANAGER.modeNotif) ? true : false,
      });

      setPlantHead({
        ...plantHead,
        mail: Boolean(PLANTHEAD.modeMail) ? true : false,
        text: Boolean(PLANTHEAD.modetext) ? true : false,
        push: Boolean(PLANTHEAD.modeNotif) ? true : false,
      });

      setSupervisor({
        ...supervisor,
        mail: Boolean(SUPERVISOR.modeMail) ? true : false,
        text: Boolean(SUPERVISOR.modetext) ? true : false,
        push: Boolean(SUPERVISOR.modeNotif) ? true : false,
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
            Planthead
          </Grid>
          <Grid item xs={3} className={Classes.box}>
            <Checkbox
              value={plantHead.mail}
              checked={plantHead.mail}
              name="alertCrowding"
              color="primary"
              inputProps={{ "aria-label": "secondary checkbox" }}
              onChange={(e) =>
                setPlantHead({ ...plantHead, mail: e.target.checked })
              }
            />
          </Grid>
          <Grid item xs={3} className={Classes.box}>
            <Checkbox
              value={plantHead.text}
              checked={plantHead.text}
              name="alertCrowding"
              color="primary"
              inputProps={{ "aria-label": "secondary checkbox" }}
              onChange={(e) =>
                setPlantHead({ ...plantHead, text: e.target.checked })
              }
            />
          </Grid>
          <Grid item xs={3} className={Classes.box}>
            <Checkbox
              value={plantHead.push}
              checked={plantHead.push}
              name="alertCrowding"
              color="primary"
              inputProps={{ "aria-label": "secondary checkbox" }}
              onChange={(e) =>
                setPlantHead({ ...plantHead, push: e.target.checked })
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
