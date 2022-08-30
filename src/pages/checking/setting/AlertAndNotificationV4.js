import {
  Button,
  Checkbox,
  FormControlLabel,
  Grid,
  TextField,
} from "@material-ui/core";
import React, { useEffect, useState } from "react";
import EmailIcon from "@material-ui/icons/Email";
import ChatBubbleIcon from "@material-ui/icons/ChatBubble";
import StayPrimaryPortraitIcon from "@material-ui/icons/StayPrimaryPortrait";
import { callBackendV2 } from "../../../services/http.servicev2";
import { useDispatch } from "react-redux";
import { openSnackbar } from "../../../redux/CommonReducer/CommonAction";

function AlertAndNotificationV4() {
  const dispatch = useDispatch();
  let [alertActive, setAlertActive] = useState({
    checker: true,
    pdi: false,
  });

  let [management, setManagement] = useState({
    defectCategory: "checkerDefect",
    department: "",
    notificationMode: [],
    timePeriod: "",
    topDefectCountChecker: "",
    topDefectCountPDI: "",
  });

  let [fibc, setFibc] = useState({
    defectCategory: "checkerDefect",
    department: "",
    notificationMode: [],
    timePeriod: "",
    topDefectCountChecker: "",
    topDefectCountPDI: "",
  });

  let [quality, setQuality] = useState({
    defectCategory: "checkerDefect",
    department: "",
    notificationMode: [],
    timePeriod: "",
    topDefectCountChecker: "",
    topDefectCountPDI: "",
  });

  let [improvement, setImprovement] = useState({
    defectCategory: "checkerDefect",
    department: "",
    notificationMode: [],
    timePeriod: "",
    topDefectCountChecker: "",
    topDefectCountPDI: "",
  });

  let [plan, setPlan] = useState({
    defectCategory: "checkerDefect",
    department: "",
    notificationMode: [],
    timePeriod: "",
    topDefectCountChecker: "",
    topDefectCountPDI: "",
  });

  const saveCheckerDefects = async (data) => {
    try {
      let formData = {
        defectCategory: data.defectCategory,
        department: data?.department,
        notificationMode:
          data?.notificationMode?.length === 0
            ? ""
            : data?.notificationMode?.length === 1
            ? data?.notificationMode[0]
            : data?.notificationMode.join(","),
        topDefectCount: data?.topDefectCountChecker,
        timePeriod: data?.timePeriod,
      };

      const resp = await callBackendV2(
        "POST",
        "routes/alert/notifModule",
        true,
        formData
      );
      dispatch(openSnackbar(true, "success", resp));
      getCheckerDefects();
    } catch (e) {
      console.log(e);
    }
  };

  const getCheckerDefects = async () => {
    try {
      const { data } = await callBackendV2("GET", "routes/alert/notifModule");
      console.log("NOTIFICATION MODULE", data);
      setManagement({
        ...management,
        department: data[0].department,
        notificationMode: data[0]?.notificationMode?.split(","),
        timePeriod: data[0]?.timePeriod,
        topDefectCountChecker: data[0]?.topDefectCount,
      });

      setFibc({
        ...management,
        department: data[1].department,
        notificationMode: data[1]?.notificationMode?.split(","),
        timePeriod: data[1]?.timePeriod,
        topDefectCountChecker: data[1]?.topDefectCount,
      });

      setQuality({
        ...management,
        department: data[2].department,
        notificationMode: data[2]?.notificationMode?.split(","),
        timePeriod: data[2]?.timePeriod,
        topDefectCountChecker: data[2]?.topDefectCount,
      });

      setImprovement({
        ...management,
        department: data[3].department,
        notificationMode: data[3]?.notificationMode?.split(","),
        timePeriod: data[3]?.timePeriod,
        topDefectCountChecker: data[3]?.topDefectCount,
      });

      setPlan({
        ...management,
        department: data[4].department,
        notificationMode: data[4]?.notificationMode?.split(","),
        timePeriod: data[4]?.timePeriod,
        topDefectCountChecker: data[4]?.topDefectCount,
      });
    } catch (e) {}
  };
  useEffect(() => {
    getCheckerDefects();
  }, []);

  return (
    <Grid container item xs={12} style={{ padding: "1rem" }}>
      <Grid container item xs={12}>
        <Grid item xs={2}></Grid>
        <Grid item xs={10} style={{ backgroundColor: "#004b7f1a" }}>
          <p
            style={{
              color: "#0e4a7b",
              fontSize: "1.5rem",
              padding: "0.5rem",
              textAlign: "center",
              fontWeight: "500",
            }}
          >
            Department
          </p>
        </Grid>
      </Grid>
      <Grid container item xs={12}>
        <Grid item xs={2}>
          <FormControlLabel
            control={
              <Checkbox
                color="primary"
                checked={alertActive.checker}
                onChange={(e) =>
                  setAlertActive({
                    ...alertActive,
                    checker: e.target.checked,
                  })
                }
              />
            }
            label="Checker Defects"
            labelPlacement="start"
          />
        </Grid>
        <Grid item xs={2} style={{ padding: "0.5rem" }}>
          <h3
            style={{
              color: "#0e4a7b",
              textAlign: "center",
              marginBottom: "0.5rem",
            }}
          >
            Management
          </h3>
          <Grid
            container
            style={{
              justifyContent: "space-evenly",
              marginBottom: "0.5rem",
            }}
          >
            <label className="NotificationBadge">
              <input
                disabled={!alertActive.checker}
                type="checkbox"
                value={management.notificationMode.includes("mail")}
                checked={management.notificationMode.includes("mail")}
                onChange={(e) => {
                  if (e.target.checked) {
                    setManagement({
                      ...management,
                      notificationMode: [
                        ...management.notificationMode,
                        "mail",
                      ],
                    });
                  } else {
                    setManagement({
                      ...management,
                      notificationMode: management.notificationMode.filter(
                        (item) => item !== "mail"
                      ),
                    });
                  }
                }}
              />
              <span class="label">
                <EmailIcon />
              </span>
            </label>
            <label className="NotificationBadge">
              <input
                type="checkbox"
                disabled={!alertActive.checker}
                value={management.notificationMode.includes("push")}
                checked={management.notificationMode.includes("push")}
                onChange={(e) => {
                  if (e.target.checked) {
                    setManagement({
                      ...management,
                      notificationMode: [
                        ...management.notificationMode,
                        "push",
                      ],
                    });
                  } else {
                    setManagement({
                      ...management,
                      notificationMode: management.notificationMode.filter(
                        (item) => item !== "push"
                      ),
                    });
                  }
                }}
              />
              <span class="label">
                <StayPrimaryPortraitIcon />
              </span>
            </label>
          </Grid>
          <TextField
            label="Top Defect (Count)"
            variant="outlined"
            type="number"
            disabled={!alertActive.checker}
            style={{
              marginBottom: "0.5rem",
            }}
            value={management.topDefectCountChecker}
            onChange={(e) => {
              setManagement({
                ...management,
                topDefectCountChecker: e.target.value,
              });
            }}
            fullWidth
          />
          <TextField
            label="Time Period (Hours)"
            variant="outlined"
            type="number"
            disabled={!alertActive.checker}
            style={{
              marginBottom: "0.5rem",
            }}
            value={management.timePeriod}
            onChange={(e) => {
              setManagement({
                ...management,
                timePeriod: e.target.value,
              });
            }}
            fullWidth
          />
          <Button
            variant="contained"
            onClick={() => saveCheckerDefects(management)}
          >
            SAVE
          </Button>
        </Grid>
        <Grid item xs={2} style={{ padding: "0.5rem" }}>
          <h3
            style={{
              color: "#0e4a7b",
              textAlign: "center",
              marginBottom: "0.5rem",
            }}
          >
            FIBC
          </h3>
          <Grid
            container
            style={{
              justifyContent: "space-evenly",
              marginBottom: "0.5rem",
            }}
          >
            <label className="NotificationBadge">
              <input
                disabled={!alertActive.checker}
                type="checkbox"
                value={fibc.notificationMode.includes("mail")}
                checked={fibc.notificationMode.includes("mail")}
                onChange={(e) => {
                  if (e.target.checked) {
                    setFibc({
                      ...fibc,
                      notificationMode: [...fibc.notificationMode, "mail"],
                    });
                  } else {
                    setFibc({
                      ...fibc,
                      notificationMode: fibc.notificationMode.filter(
                        (item) => item !== "mail"
                      ),
                    });
                  }
                }}
              />
              <span class="label">
                <EmailIcon />
              </span>
            </label>
            <label className="NotificationBadge">
              <input
                type="checkbox"
                disabled={!alertActive.checker}
                value={fibc.notificationMode.includes("push")}
                checked={fibc.notificationMode.includes("push")}
                onChange={(e) => {
                  if (e.target.checked) {
                    setFibc({
                      ...fibc,
                      notificationMode: [...fibc.notificationMode, "push"],
                    });
                  } else {
                    setFibc({
                      ...fibc,
                      notificationMode: fibc.notificationMode.filter(
                        (item) => item !== "push"
                      ),
                    });
                  }
                }}
              />
              <span class="label">
                <StayPrimaryPortraitIcon />
              </span>
            </label>
          </Grid>
          <TextField
            label="Top Defect (Count)"
            variant="outlined"
            type="number"
            disabled={!alertActive.checker}
            style={{
              marginBottom: "0.5rem",
            }}
            value={fibc.topDefectCountChecker}
            onChange={(e) => {
              setFibc({
                ...fibc,
                topDefectCountChecker: e.target.value,
              });
            }}
            fullWidth
          />
          <TextField
            label="Time Period (Hours)"
            variant="outlined"
            type="number"
            disabled={!alertActive.checker}
            style={{
              marginBottom: "0.5rem",
            }}
            value={fibc.timePeriod}
            onChange={(e) => {
              setFibc({
                ...fibc,
                timePeriod: e.target.value,
              });
            }}
            fullWidth
          />
          <Button variant="contained" onClick={() => saveCheckerDefects(fibc)}>
            SAVE
          </Button>
        </Grid>
        <Grid item xs={2} style={{ padding: "0.5rem" }}>
          <h3
            style={{
              color: "#0e4a7b",
              textAlign: "center",
              marginBottom: "0.5rem",
            }}
          >
            Quality
          </h3>
          <Grid
            container
            style={{
              justifyContent: "space-evenly",
              marginBottom: "0.5rem",
            }}
          >
            <label className="NotificationBadge">
              <input
                disabled={!alertActive.checker}
                type="checkbox"
                value={quality.notificationMode.includes("mail")}
                checked={quality.notificationMode.includes("mail")}
                onChange={(e) => {
                  if (e.target.checked) {
                    setQuality({
                      ...quality,
                      notificationMode: [...quality.notificationMode, "mail"],
                    });
                  } else {
                    setQuality({
                      ...quality,
                      notificationMode: quality.notificationMode.filter(
                        (item) => item !== "mail"
                      ),
                    });
                  }
                }}
              />
              <span class="label">
                <EmailIcon />
              </span>
            </label>
            <label className="NotificationBadge">
              <input
                type="checkbox"
                disabled={!alertActive.checker}
                value={quality.notificationMode.includes("push")}
                checked={quality.notificationMode.includes("push")}
                onChange={(e) => {
                  if (e.target.checked) {
                    setQuality({
                      ...quality,
                      notificationMode: [...quality.notificationMode, "push"],
                    });
                  } else {
                    setQuality({
                      ...quality,
                      notificationMode: quality.notificationMode.filter(
                        (item) => item !== "push"
                      ),
                    });
                  }
                }}
              />
              <span class="label">
                <StayPrimaryPortraitIcon />
              </span>
            </label>
          </Grid>
          <TextField
            label="Top Defect (Count)"
            variant="outlined"
            type="number"
            disabled={!alertActive.checker}
            style={{
              marginBottom: "0.5rem",
            }}
            value={quality.topDefectCountChecker}
            onChange={(e) => {
              setQuality({
                ...quality,
                topDefectCountChecker: e.target.value,
              });
            }}
            fullWidth
          />
          <TextField
            label="Time Period (Hours)"
            variant="outlined"
            type="number"
            disabled={!alertActive.checker}
            style={{
              marginBottom: "0.5rem",
            }}
            value={quality.timePeriod}
            onChange={(e) => {
              setQuality({
                ...quality,
                timePeriod: e.target.value,
              });
            }}
            fullWidth
          />
          <Button
            variant="contained"
            onClick={() => saveCheckerDefects(quality)}
          >
            SAVE
          </Button>
        </Grid>
        <Grid item xs={2} style={{ padding: "0.5rem" }}>
          <h3
            style={{
              color: "#0e4a7b",
              textAlign: "center",
              marginBottom: "0.5rem",
            }}
          >
            Improvement
          </h3>
          <Grid
            container
            style={{
              justifyContent: "space-evenly",
              marginBottom: "0.5rem",
            }}
          >
            <label className="NotificationBadge">
              <input
                disabled={!alertActive.checker}
                type="checkbox"
                value={improvement.notificationMode.includes("mail")}
                checked={improvement.notificationMode.includes("mail")}
                onChange={(e) => {
                  if (e.target.checked) {
                    setImprovement({
                      ...improvement,
                      notificationMode: [
                        ...improvement.notificationMode,
                        "mail",
                      ],
                    });
                  } else {
                    setImprovement({
                      ...improvement,
                      notificationMode: improvement.notificationMode.filter(
                        (item) => item !== "mail"
                      ),
                    });
                  }
                }}
              />
              <span class="label">
                <EmailIcon />
              </span>
            </label>
            <label className="NotificationBadge">
              <input
                type="checkbox"
                disabled={!alertActive.checker}
                value={improvement.notificationMode.includes("push")}
                checked={improvement.notificationMode.includes("push")}
                onChange={(e) => {
                  if (e.target.checked) {
                    setImprovement({
                      ...improvement,
                      notificationMode: [
                        ...improvement.notificationMode,
                        "push",
                      ],
                    });
                  } else {
                    setImprovement({
                      ...improvement,
                      notificationMode: improvement.notificationMode.filter(
                        (item) => item !== "push"
                      ),
                    });
                  }
                }}
              />
              <span class="label">
                <StayPrimaryPortraitIcon />
              </span>
            </label>
          </Grid>
          <TextField
            label="Top Defect (Count)"
            variant="outlined"
            type="number"
            disabled={!alertActive.checker}
            style={{
              marginBottom: "0.5rem",
            }}
            value={improvement.topDefectCountChecker}
            onChange={(e) => {
              setImprovement({
                ...improvement,
                topDefectCountChecker: e.target.value,
              });
            }}
            fullWidth
          />
          <TextField
            label="Time Period (Hours)"
            variant="outlined"
            type="number"
            disabled={!alertActive.checker}
            style={{
              marginBottom: "0.5rem",
            }}
            value={improvement.timePeriod}
            onChange={(e) => {
              setImprovement({
                ...improvement,
                timePeriod: e.target.value,
              });
            }}
            fullWidth
          />
          <Button
            variant="contained"
            onClick={() => saveCheckerDefects(improvement)}
          >
            SAVE
          </Button>
        </Grid>
        <Grid item xs={2} style={{ padding: "0.5rem" }}>
          <h3
            style={{
              color: "#0e4a7b",
              textAlign: "center",
              marginBottom: "0.5rem",
            }}
          >
            Plan
          </h3>
          <Grid
            container
            style={{
              justifyContent: "space-evenly",
              marginBottom: "0.5rem",
            }}
          >
            <label className="NotificationBadge">
              <input
                disabled={!alertActive.checker}
                type="checkbox"
                value={plan.notificationMode.includes("mail")}
                checked={plan.notificationMode.includes("mail")}
                onChange={(e) => {
                  if (e.target.checked) {
                    setPlan({
                      ...plan,
                      notificationMode: [...plan.notificationMode, "mail"],
                    });
                  } else {
                    setPlan({
                      ...plan,
                      notificationMode: plan.notificationMode.filter(
                        (item) => item !== "mail"
                      ),
                    });
                  }
                }}
              />
              <span class="label">
                <EmailIcon />
              </span>
            </label>
            <label className="NotificationBadge">
              <input
                type="checkbox"
                disabled={!alertActive.checker}
                value={plan.notificationMode.includes("push")}
                checked={plan.notificationMode.includes("push")}
                onChange={(e) => {
                  if (e.target.checked) {
                    setPlan({
                      ...plan,
                      notificationMode: [...plan.notificationMode, "push"],
                    });
                  } else {
                    setPlan({
                      ...plan,
                      notificationMode: plan.notificationMode.filter(
                        (item) => item !== "push"
                      ),
                    });
                  }
                }}
              />
              <span class="label">
                <StayPrimaryPortraitIcon />
              </span>
            </label>
          </Grid>
          <TextField
            label="Top Defect (Count)"
            variant="outlined"
            type="number"
            disabled={!alertActive.checker}
            style={{
              marginBottom: "0.5rem",
            }}
            value={plan.topDefectCountChecker}
            onChange={(e) => {
              setPlan({
                ...plan,
                topDefectCountChecker: e.target.value,
              });
            }}
            fullWidth
          />
          <TextField
            label="Time Period (Hours)"
            variant="outlined"
            type="number"
            disabled={!alertActive.checker}
            style={{
              marginBottom: "0.5rem",
            }}
            value={plan.timePeriod}
            onChange={(e) => {
              setPlan({
                ...plan,
                timePeriod: e.target.value,
              });
            }}
            fullWidth
          />
          <Button variant="contained" onClick={() => saveCheckerDefects(plan)}>
            SAVE
          </Button>
        </Grid>
      </Grid>
    </Grid>
  );
}

export default AlertAndNotificationV4;
