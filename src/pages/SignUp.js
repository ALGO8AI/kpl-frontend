import {
  Button,
  Checkbox,
  FormControl,
  FormControlLabel,
  InputLabel,
  makeStyles,
  MenuItem,
  Paper,
  Select,
  Snackbar,
  Step,
  StepLabel,
  Stepper,
  TextField,
  Typography,
  withStyles,
} from "@material-ui/core";
import React, { useState } from "react";
import * as Styles from "./SignUp.module.scss";
import logo from "../images/kpl-logo.png";
import { Alert } from "@material-ui/lab";
import { AddNewUser, login } from "../services/api.service";
import { Link, useHistory } from "react-router-dom";
import { KPLContext } from "../context/ViolationContext";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
  },
  backButton: {
    marginRight: theme.spacing(1),
  },
  instructions: {
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1),
  },
}));

function getSteps() {
  return [
    "Basic Details",
    "Additional Details",
    "More Details",
    "Shift",
    "Responsibility",
  ];
}

function GetStepContent({ activeStep, data, setData }) {
  switch (activeStep) {
    case 0:
      return (
        <div style={{ padding: "12px" }}>
          <TextField
            id="outlined-basic"
            label="Username"
            variant="outlined"
            fullWidth
            value={data.username}
            onChange={(e) => setData({ ...data, username: e.target.value })}
            className="mb-8"
          />
          <TextField
            id="outlined-basic"
            label="Password"
            variant="outlined"
            value={data.password}
            fullWidth
            onChange={(e) => setData({ ...data, password: e.target.value })}
            className="mb-8"
          />
          <TextField
            fullWidth
            id="outlined-basic"
            label="Email"
            variant="outlined"
            value={data.email}
            onChange={(e) => setData({ ...data, email: e.target.value })}
            className="mb-8"
          />
          <FormControl variant="outlined" fullWidth className="mb-8">
            <InputLabel id="demo-simple-select-outlined-label">
              Designation
            </InputLabel>
            <Select
              labelId="demo-simple-select-outlined-label"
              id="demo-simple-select-outlined"
              value={data.designation}
              onChange={(e) =>
                setData({ ...data, designation: e.target.value })
              }
              label="Designation"
            >
              <MenuItem value="">
                <em>None</em>
              </MenuItem>
              <MenuItem value={"supervisor"}>Supervisor</MenuItem>
              <MenuItem value={"manager"}>Manager</MenuItem>
              <MenuItem value={"wingIncharge"}>Wing Incharge</MenuItem>
              <MenuItem value={"helper"}>Helper</MenuItem>
            </Select>
          </FormControl>

          {data.designation === "supervisor" && (
            <FormControl variant="outlined" fullWidth className="mb-8">
              <InputLabel id="demo-simple-select-outlined-label">
                Supervisor Role
              </InputLabel>
              <Select
                labelId="demo-simple-select-outlined-label"
                id="demo-simple-select-outlined"
                value={data.role}
                onChange={(e) => setData({ ...data, role: e.target.value })}
                label="Designation"
              >
                <MenuItem value="">
                  <em>None</em>
                </MenuItem>
                <MenuItem value={"Line Area Supervisor"}>
                  Line Area Supervisor
                </MenuItem>
                <MenuItem value={"Kit Area Supervisor"}>
                  Kit Area Supervisor
                </MenuItem>
                <MenuItem value={"Final Area Supervisor"}>
                  Final Area Supervisor
                </MenuItem>
              </Select>
            </FormControl>
          )}

          {data.designation === "manager" && (
            <FormControl variant="outlined" fullWidth className="mb-8">
              <InputLabel id="demo-simple-select-outlined-label">
                Manager Role
              </InputLabel>
              <Select
                labelId="demo-simple-select-outlined-label"
                id="demo-simple-select-outlined"
                value={data.role}
                onChange={(e) => setData({ ...data, role: e.target.value })}
                label="Designation"
              >
                <MenuItem value="">
                  <em>None</em>
                </MenuItem>
                <MenuItem value={"Production Manager"}>
                  Production Manager
                </MenuItem>
              </Select>
            </FormControl>
          )}

          {data.designation === "wingIncharge" && (
            <FormControl variant="outlined" fullWidth className="mb-8">
              <InputLabel id="demo-simple-select-outlined-label">
                Wing Incharge Role
              </InputLabel>
              <Select
                labelId="demo-simple-select-outlined-label"
                id="demo-simple-select-outlined"
                value={data.role}
                onChange={(e) => setData({ ...data, role: e.target.value })}
                label="Designation"
              >
                <MenuItem value="">
                  <em>None</em>
                </MenuItem>
                <MenuItem value={"Manager"}>Manager</MenuItem>
              </Select>
            </FormControl>
          )}

          {data.designation === "helper" && (
            <FormControl variant="outlined" fullWidth className="mb-8">
              <InputLabel id="demo-simple-select-outlined-label">
                Helper Role
              </InputLabel>
              <Select
                labelId="demo-simple-select-outlined-label"
                id="demo-simple-select-outlined"
                value={data.role}
                onChange={(e) => setData({ ...data, role: e.target.value })}
                label="Designation"
              >
                <MenuItem value="">
                  <em>None</em>
                </MenuItem>
                <MenuItem value={"fitter"}>Fitter</MenuItem>
                <MenuItem value={"electrician"}>Electrician</MenuItem>
              </Select>
            </FormControl>
          )}
        </div>
      );
    case 1:
      return (
        <div>
          <TextField
            fullWidth
            id="outlined-basic"
            label="Line"
            variant="outlined"
            value={data.zone}
            onChange={(e) => setData({ ...data, zone: e.target.value })}
            className="mb-8"
          />
          <TextField
            fullWidth
            id="outlined-basic"
            label="Wing"
            variant="outlined"
            value={data.wing}
            onChange={(e) => setData({ ...data, wing: e.target.value })}
            className="mb-8"
          />
          <TextField
            fullWidth
            id="outlined-basic"
            label="Worker Id"
            variant="outlined"
            value={data.workerID}
            onChange={(e) => setData({ ...data, workerID: e.target.value })}
            className="mb-8"
          />
          <TextField
            fullWidth
            id="outlined-basic"
            label="Mobile"
            type="number"
            variant="outlined"
            value={data.mobile}
            onChange={(e) => setData({ ...data, mobile: e.target.value })}
            className="mb-8"
          />
        </div>
      );
    case 2:
      return (
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "baseline",
          }}
        >
          <FormControlLabel
            className="mb-8"
            control={
              <Checkbox
                value={data.accessibilityCutting}
                checked={data.accessibilityCutting}
                color="primary"
                onChange={(e) =>
                  setData({
                    ...data,
                    accessibilityCutting: e.target.checked,
                  })
                }
              />
            }
            label="Accessibility Cutting"
            labelPlacement="start"
          />
          <FormControlLabel
            className="mb-8"
            control={
              <Checkbox
                value={data.accessibilityStitching}
                checked={data.accessibilityStitching}
                color="primary"
                onChange={(e) =>
                  setData({
                    ...data,
                    accessibilityStitching: e.target.checked,
                  })
                }
              />
            }
            label="Accessibility Stitching"
            labelPlacement="start"
          />
          <FormControlLabel
            className="mb-8"
            control={
              <Checkbox
                value={data.accessibilityChecking}
                checked={data.accessibilityChecking}
                color="primary"
                onChange={(e) =>
                  setData({
                    ...data,
                    accessibilityChecking: e.target.checked,
                  })
                }
              />
            }
            label="Accessibility Checking"
            labelPlacement="start"
          />
        </div>
      );
    case 3:
      return (
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "baseline",
          }}
        >
          <FormControlLabel
            control={
              <Checkbox
                value={data.shiftA}
                checked={data.shiftA}
                color="primary"
                onChange={(e) =>
                  setData({
                    ...data,
                    shiftA: e.target.checked,
                  })
                }
              />
            }
            label="Shift A"
            labelPlacement="start"
          />
          <FormControlLabel
            control={
              <Checkbox
                value={data.shiftB}
                checked={data.shiftB}
                color="primary"
                onChange={(e) =>
                  setData({
                    ...data,
                    shiftB: e.target.checked,
                  })
                }
              />
            }
            label="Shift B"
            labelPlacement="start"
          />
        </div>
      );
    case 4:
      return (
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "baseline",
          }}
        >
          <FormControlLabel
            control={
              <Checkbox
                value={data.machineBreakdown}
                checked={data.machineBreakdown}
                color="primary"
                onChange={(e) =>
                  setData({
                    ...data,
                    machineBreakdown: e.target.checked,
                  })
                }
              />
            }
            label="Machine Breakdown"
            labelPlacement="start"
          />
          <FormControlLabel
            control={
              <Checkbox
                value={data.feedUnavailability}
                checked={data.feedUnavailability}
                color="primary"
                onChange={(e) =>
                  setData({
                    ...data,
                    feedUnavailability: e.target.checked,
                  })
                }
              />
            }
            label="Feed Unavailability"
            labelPlacement="start"
          />
          <FormControlLabel
            control={
              <Checkbox
                value={data.workerNotAvailable}
                checked={data.workerNotAvailable}
                color="primary"
                onChange={(e) =>
                  setData({
                    ...data,
                    workerNotAvailable: e.target.checked,
                  })
                }
              />
            }
            label="Worker Not Available"
            labelPlacement="start"
          />
          <FormControlLabel
            control={
              <Checkbox
                value={data.crowding}
                checked={data.crowding}
                color="primary"
                onChange={(e) =>
                  setData({
                    ...data,
                    crowding: e.target.checked,
                  })
                }
              />
            }
            label="Crowding"
            labelPlacement="start"
          />
          <FormControlLabel
            control={
              <Checkbox
                value={data.checkerActiveMonitoring}
                checked={data.checkerActiveMonitoring}
                color="primary"
                onChange={(e) =>
                  setData({
                    ...data,
                    checkerActiveMonitoring: e.target.checked,
                  })
                }
              />
            }
            label="Checker Active Monitoring"
            labelPlacement="start"
          />
        </div>
      );
    default:
      return "Unknown stepIndex";
  }
}

const ColorButton = withStyles(() => ({
  root: {
    color: "white",
    backgroundColor: "#0e4a7b",
    "&:hover": {
      backgroundColor: "#0e4a7b",
    },
  },
}))(Button);

function SignUp() {
  // Variables
  const history = useHistory();
  const classes = useStyles();
  const [data, setData] = useState({
    username: "",
    password: "",
    email: "",
    designation: "supervisor",
    role: "",
    zone: "",
    wing: "",
    accessibilityCutting: false,
    accessibilityStitching: false,
    accessibilityChecking: false,
    workerID: "",
    image: "",
    department: "all",
    createdBy: "dev",
    modifiedBy: "dev",
    shiftA: false,
    shiftB: false,
    mobile: "",
    machineBreakdown: false,
    feedUnavailability: false,
    workerNotAvailable: false,
    crowding: false,
    checkerActiveMonitoring: false,
  });
  const [activeStep, setActiveStep] = React.useState(0);
  const steps = getSteps();

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleReset = () => {
    setActiveStep(0);
  };

  // states

  const [open, setOpen] = React.useState(false);
  const [msg, setMsg] = useState("");

  const { dispatch } = React.useContext(KPLContext);

  // Snackbar close function
  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };

  // signup function
  const submitUserForm = async () => {
    console.log(data);
    const DATA = {
      username: data.username,
      password: data.password,
      email: data.email,
      designation: data.designation,
      role: data.role,
      zone: data.zone,
      wing: data.wing,
      accessibilityCutting: data.accessibilityCutting ? 1 : 0,
      accessibilityStitching: data.accessibilityStitching ? 1 : 0,
      accessibilityChecking: data.accessibilityChecking ? 1 : 0,
      workerID: data.workerID,
      image: data.image,
      department: data.department,
      createdBy: data.createdBy,
      modifiedBy: data.modifiedBy,
      shiftA: data.shiftA ? 1 : 0,
      shiftB: data.shiftB ? 1 : 0,
      mobile: data.mobile,
      machineBreakdown: data.machineBreakdown ? 1 : 0,
      feedUnavailability: data.feedUnavailability ? 1 : 0,
      workerNotAvailable: data.workerNotAvailable ? 1 : 0,
      crowding: data.crowding ? 1 : 0,
      checkerActiveMonitorin: data.checkerActiveMonitoring ? 1 : 0,
    };
    try {
      console.log(DATA);
      const x = await AddNewUser(DATA);
      console.log(x);
      alert(x.message);
      if (x.name === "success") {
        history.push("/");
      }
    } catch (err) {
      console.log(err.message);
    }
  };

  return (
    <div elevation={5} className={Styles.LoginContainer}>
      <Paper className={Styles.LoginBox} elevation={5}>
        <div className={Styles.left}></div>
        <div className={Styles.right}>
          <div className={Styles.logo}>
            <img src={logo} alt="logo" />
          </div>
          {/* <div className={Styles.form}>
            <h3>Welcome to</h3>
            <h2>iVision</h2>
          </div> */}
          <div className={classes.root}>
            <Typography
              component={Link}
              to="/"
              style={{
                margin: "18px 12px",
                textDecoration: "none",
                color: "black",
              }}
              variant="h6"
            >
              Have an account,{" "}
              <span style={{ fontWeight: "bold", color: "#0e4a7b" }}>
                Sign In
              </span>
            </Typography>
            <Stepper activeStep={activeStep} alternativeLabel>
              {steps.map((label) => (
                <Step key={label}>
                  <StepLabel>{label}</StepLabel>
                </Step>
              ))}
            </Stepper>
            <div>
              {activeStep === steps.length ? (
                <div>
                  <Typography className={classes.instructions}>
                    All steps completed
                  </Typography>
                  <Button onClick={handleReset}>Reset</Button>
                </div>
              ) : (
                <div>
                  <Typography className={classes.instructions}>
                    <GetStepContent
                      activeStep={activeStep}
                      data={data}
                      setData={setData}
                    />
                  </Typography>
                  <div>
                    <Button
                      disabled={activeStep === 0}
                      onClick={handleBack}
                      className={classes.backButton}
                    >
                      Back
                    </Button>
                    {activeStep === steps.length - 1 ? (
                      <Button
                        variant="contained"
                        color="primary"
                        onClick={submitUserForm}
                      >
                        Finish
                      </Button>
                    ) : (
                      <Button
                        variant="contained"
                        color="primary"
                        onClick={handleNext}
                      >
                        Next
                      </Button>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </Paper>

      <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="error">
          {msg}
        </Alert>
      </Snackbar>
    </div>
  );
}

export default SignUp;
