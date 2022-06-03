/* eslint-disable no-useless-escape */
import {
  Button,
  Checkbox,
  Dialog,
  DialogActions,
  DialogContentText,
  DialogTitle,
  FormControl,
  FormControlLabel,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
  Divider,
} from "@material-ui/core";
import React, { useState } from "react";
import { AddNewUser } from "../../../services/api.service";
import { stitchingLines, theme, wings } from "../../../Utility/constants";
import { useDispatch } from "react-redux";
import { openSnackbar } from "../../../redux/CommonReducer/CommonAction";
import PersonAddIcon from "@material-ui/icons/PersonAdd";

function AddUser({ loadData }) {
  const Dispatch = useDispatch();

  // state
  const [openConfirm, setOpenCOnfirm] = useState(false);
  const [open, setOpen] = React.useState(false);
  const [data, setData] = useState({
    username: "",
    password: "",
    email: "",
    designation: "",
    role: "",
    zone: [],
    wing: "",
    accessibilityCutting: false,
    accessibilityStitching: false,
    accessibilityChecking: false,
    workerID: "",
    image: "",
    department: "",
    createdBy: "dev",
    modifiedBy: "dev",
    shiftA: false,
    shiftB: false,
    shiftC: false,
    mobile: "",
    machineBreakdown: false,
    feedUnavailability: false,
    workerNotAvailable: false,
    crowding: false,
    checkerActiveMonitoring: false,
  });

  const openConfirmDialog = () => {
    if (!data?.workerID) {
      return Dispatch(openSnackbar(true, "error", "Worker ID required."));
    } else if (!data?.username) {
      return Dispatch(openSnackbar(true, "error", "Username required."));
    } else if (/\d/.test(data?.username)) {
      return Dispatch(
        openSnackbar(true, "error", "Username can't contains numbers.")
      );
    } else if (!data?.password) {
      return Dispatch(openSnackbar(true, "error", "Password required."));
    } else if (!data?.email) {
      return Dispatch(openSnackbar(true, "error", "Email required."));
    } else if (
      !Boolean(
        data.email
          .toLowerCase()
          .match(
            /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i
          )
      )
    ) {
      return Dispatch(openSnackbar(true, "error", "Enter valid email."));
    } else if (!data?.designation) {
      return Dispatch(openSnackbar(true, "error", "Designation required."));
    } else if (!data?.department) {
      return Dispatch(openSnackbar(true, "error", "Department required."));
    } else if (!data?.role) {
      return Dispatch(openSnackbar(true, "error", "Role required."));
    } else if (!data?.zone) {
      return Dispatch(openSnackbar(true, "error", "Line required."));
    } else if (!data?.wing) {
      return Dispatch(openSnackbar(true, "error", "Wing required."));
    } else if (!data?.shiftA && !data?.shiftB) {
      return Dispatch(openSnackbar(true, "error", "Shift required."));
    } else if (
      !data?.machineBreakdown &&
      !data?.feedUnavailability &&
      !data?.workerNotAvailable &&
      !data?.machineViolation &&
      !data?.crowding &&
      !data?.checkerActiveMonitoring
    ) {
      return Dispatch(openSnackbar(true, "error", "Responsibility required."));
    } else setOpenCOnfirm(true);
  };

  const submitUserForm = async () => {
    if (!data?.workerID) {
      return Dispatch(openSnackbar(true, "error", "Worker ID required."));
    } else if (!data?.username) {
      return Dispatch(openSnackbar(true, "error", "Username required."));
    } else if (/\d/.test(data?.username)) {
      return Dispatch(
        openSnackbar(true, "error", "Username can't contains numbers.")
      );
    } else if (!data?.password) {
      return Dispatch(openSnackbar(true, "error", "Password required."));
    } else if (!data?.email) {
      return Dispatch(openSnackbar(true, "error", "Email required."));
    } else if (
      !Boolean(
        data.email
          .toLowerCase()
          .match(
            /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i
          )
      )
    ) {
      return Dispatch(openSnackbar(true, "error", "Enter valid email."));
    } else if (!data?.designation) {
      return Dispatch(openSnackbar(true, "error", "Designation required."));
    } else if (!data?.department) {
      return Dispatch(openSnackbar(true, "error", "Department required."));
    } else if (!data?.role) {
      return Dispatch(openSnackbar(true, "error", "Role required."));
    } else if (!data?.zone) {
      return Dispatch(openSnackbar(true, "error", "Line required."));
    } else if (!data?.wing) {
      return Dispatch(openSnackbar(true, "error", "Wing required."));
    } else if (!data?.shiftA && !data?.shiftB) {
      return Dispatch(openSnackbar(true, "error", "Shift required."));
    } else if (
      !data?.machineBreakdown &&
      !data?.feedUnavailability &&
      !data?.workerNotAvailable &&
      !data?.machineViolation &&
      !data?.crowding &&
      !data?.checkerActiveMonitoring
    ) {
      return Dispatch(openSnackbar(true, "error", "Responsibility required."));
    }
    const DATA = {
      username: data.username,
      password: data.password,
      email: data.email,
      designation: data.designation,
      role: data.role,
      zone: data.zone.join(","),
      wing: data.wing,
      // accessibilityCutting: data.accessibilityCutting ? 1 : 0,
      // accessibilityStitching: data.accessibilityStitching ? 1 : 0,
      // accessibilityChecking: data.accessibilityChecking ? 1 : 0,
      accessibilityCutting: 1,
      accessibilityStitching: 1,
      accessibilityChecking: 1,
      workerID: data.workerID,
      image: data.image,
      department: data.department,
      createdBy: data.createdBy,
      modifiedBy: data.modifiedBy,
      shiftA: data.shiftA ? 1 : 0,
      shiftB: data.shiftB ? 1 : 0,
      shiftC: data.shiftC ? 1 : 0,
      mobile: data.mobile,
      machineBreakdown: data.machineBreakdown ? 1 : 0,
      feedUnavailability: data.feedUnavailability ? 1 : 0,
      workerNotAvailable: data.workerNotAvailable ? 1 : 0,
      crowding: data.crowding ? 1 : 0,
      machineViolation: data.machineViolation ? 1 : 0,
      checkerActiveMonitoring: data.checkerActiveMonitoring ? 1 : 0,
    };
    try {
      // var txt = window.confirm("User will be added, continue?");
      // if (txt) {
      const x = await AddNewUser(DATA);
      if (x.message !== "Username or Email Already Exists") {
        loadData();
        setData({
          ...data,
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
          department: "",
          createdBy: "dev",
          modifiedBy: "dev",
          shiftA: false,
          shiftB: false,
          shiftC: false,
          mobile: "",
          machineBreakdown: false,
          feedUnavailability: false,
          workerNotAvailable: false,
          crowding: false,
          checkerActiveMonitoring: false,
        });
        handleClose();
        setOpenCOnfirm(false);
        Dispatch(openSnackbar(true, "success", x.message));
      } else {
        // Dispatch(openSnackbar(true, "error", "Try Again"));
        Dispatch(openSnackbar(true, "success", x.message));
      }
      // }
    } catch (err) {
      console.log(err.message);
    }
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  return (
    <Grid container justifyContent="flex-end">
      <Grid item xs={12}>
        <Button
          disableElevation
          variant="contained"
          fullWidth
          style={{
            backgroundColor: "transparent",
            color: "#FFF",
            whiteSpace: "nowrap",
            height: "100%",
          }}
          onClick={handleClickOpen}
        >
          {/* ADD USER */}
          <PersonAddIcon style={{ color: "#0e4a7b", fontSize: 32 }} />
        </Button>
      </Grid>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        style={{ maxWidth: "1200px", margin: "auto" }}
      >
        <DialogTitle id="alert-dialog-title">{"ADD USER"}</DialogTitle>
        <DialogContentText id="alert-dialog-description">
          <Grid
            container
            xs={12}
            spacing={2}
            style={{
              alignItems: "center",
              justifyContent: "space-around",
              padding: "1.5rem 1rem",
            }}
          >
            <Grid
              item
              xs={12}
              md={6}
              lg={3}
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <TextField
                error={!data?.workerID}
                helperText="Should only have numbers"
                type="number"
                required
                fullWidth
                id="outlined-basic"
                label="Worker Id"
                variant="outlined"
                value={data.workerID}
                onChange={(e) => setData({ ...data, workerID: e.target.value })}
              />
            </Grid>
            <Grid
              item
              xs={12}
              md={6}
              lg={3}
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <TextField
                error={
                  !data?.username
                    ? true
                    : /\d/.test(data?.username)
                    ? true
                    : false
                }
                helperText={
                  /\d/.test(data?.username)
                    ? "Username can't have numeric value"
                    : "Required"
                }
                // error={!data?.username}
                required
                id="outlined-basic"
                label="Username"
                variant="outlined"
                value={data.username}
                fullWidth
                onChange={(e) => setData({ ...data, username: e.target.value })}
              />
            </Grid>
            <Grid
              item
              xs={12}
              md={6}
              lg={3}
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <TextField
                error={!data?.password}
                helperText="Required"
                required
                id="outlined-basic"
                label="Password"
                variant="outlined"
                value={data.password}
                fullWidth
                onChange={(e) => setData({ ...data, password: e.target.value })}
              />
            </Grid>
            <Grid
              item
              xs={12}
              md={6}
              lg={3}
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <TextField
                error={
                  !Boolean(
                    String(data.email)
                      .toLowerCase()
                      .match(
                        /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i
                      )
                  )
                }
                helperText={
                  Boolean(
                    String(data.email)
                      .toLowerCase()
                      .match(
                        /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i
                      )
                  )
                    ? "Valid Email"
                    : "Enter Valid Email"
                }
                required
                fullWidth
                id="outlined-basic"
                type="email"
                label="Email"
                variant="outlined"
                value={data.email}
                onChange={(e) => setData({ ...data, email: e.target.value })}
              />
            </Grid>
            <Grid
              item
              xs={12}
              md={6}
              lg={3}
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <TextField
                error={data.mobile.length > 10 || data.mobile.length < 10}
                helperText={
                  data.mobile.length > 10 || data.mobile.length < 10
                    ? "Must be 10 digit"
                    : null
                }
                inputProps={{
                  maxLength: 10,
                }}
                // required
                fullWidth
                id="outlined-basic"
                label="Mobile"
                type="number"
                variant="outlined"
                value={data.mobile}
                onChange={(e) => setData({ ...data, mobile: e.target.value })}
              />
            </Grid>
            <Grid
              item
              xs={12}
              md={6}
              lg={3}
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <FormControl variant="outlined" fullWidth>
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
                  error={!data?.designation}
                  required
                >
                  <MenuItem value="">
                    <em>None</em>
                  </MenuItem>
                  {[
                    { name: "Helper", value: "helper" },
                    { name: "Manager", value: "manager" },
                    // { name: "Supervisor", value: "supervisor" },
                    { name: "Wing Incharge", value: "wingIncharge" },
                    { name: "Director", value: "director" },
                    { name: "Engineer", value: "engineer" },
                    { name: "Senior Manager", value: "seniorManager" },
                    { name: "Assistant Manager", value: "assistantManager" },
                    { name: "In Charge", value: "incharge" },
                    { name: "Final Supervisor", value: "finalSupervisor" },
                    { name: "Kit Supervisor", value: "kitSupervisor" },
                    { name: "Line Supervisor", value: "lineSupervisor" },
                    { name: "Fitter", value: "fitter" },
                    { name: "Electrician", value: "electrician" },
                  ]
                    .sort((a, b) => (a.name > b.name ? 1 : -1))
                    .map((item, index) => (
                      <MenuItem key={index} value={item.name}>
                        {item.name}
                      </MenuItem>
                    ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid
              item
              xs={12}
              md={6}
              lg={3}
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <FormControl variant="outlined" fullWidth>
                <InputLabel id="demo-simple-select-outlined-label">
                  Department
                </InputLabel>
                <Select
                  labelId="demo-simple-select-outlined-label"
                  id="demo-simple-select-outlined"
                  value={data.department}
                  onChange={(e) =>
                    setData({ ...data, department: e.target.value })
                  }
                  label="Department"
                  error={!data?.department}
                  required
                >
                  <MenuItem value="">
                    <em>None</em>
                  </MenuItem>
                  {[
                    { name: "Management", value: "management" },
                    { name: "FIBC", value: "fibc" },
                    { name: "Quality", value: "quality" },
                    { name: "Planning", value: "planning" },
                    { name: "Improvement Office", value: "improvementOffice" },
                    { name: "Other", value: "other" },
                  ]
                    .sort((a, b) => (a.name > b.name ? 1 : -1))
                    .map((item, index) => (
                      <MenuItem value={item.name} key={index}>
                        {item.name}
                      </MenuItem>
                    ))}
                </Select>
              </FormControl>
            </Grid>

            <Grid
              item
              xs={12}
              md={6}
              lg={3}
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <FormControl variant="outlined" fullWidth>
                <InputLabel id="demo-simple-select-outlined-label">
                  Role
                </InputLabel>
                <Select
                  labelId="demo-simple-select-outlined-label"
                  id="demo-simple-select-outlined"
                  value={data.role}
                  onChange={(e) => setData({ ...data, role: e.target.value })}
                  label="Role"
                  error={!data?.role}
                  required
                >
                  <MenuItem value="">
                    <em>None</em>
                  </MenuItem>
                  {[
                    { name: "Admin", value: "admin" },
                    { name: "Non Admin", value: "nonAdmin" },
                    { name: "User", value: "user" },
                    { name: "Head User", value: "headUser" },
                    { name: "Non User", value: "nonUser" },
                  ]
                    .sort((a, b) => (a.name > b.name ? 1 : -1))
                    .map((item, index) => (
                      <MenuItem value={item.name} key={index}>
                        {item.name}
                      </MenuItem>
                    ))}
                </Select>
              </FormControl>
            </Grid>

            <Grid
              item
              xs={12}
              md={6}
              lg={3}
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              {/* <TextField
                fullWidth
                id="outlined-basic"
                label="Line"
                variant="outlined"
                value={data.zone}
                onChange={(e) => setData({ ...data, zone: e.target.value })}
              /> */}
              <FormControl variant="outlined" fullWidth>
                <InputLabel id="demo-simple-select-outlined-label">
                  Line
                </InputLabel>
                <Select
                  labelId="demo-simple-select-outlined-label"
                  id="demo-simple-select-outlined"
                  value={data.zone}
                  onChange={(e) => setData({ ...data, zone: e.target.value })}
                  label="Line"
                  error={!data?.zone}
                  required
                  multiple
                >
                  <MenuItem value="">
                    <em>None</em>
                  </MenuItem>
                  {stitchingLines.map((item, index) => (
                    <MenuItem key={index} value={item}>
                      {item}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid
              item
              xs={12}
              md={6}
              lg={3}
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <FormControl variant="outlined" fullWidth>
                <InputLabel id="demo-simple-select-outlined-label">
                  Wing
                </InputLabel>
                <Select
                  labelId="demo-simple-select-outlined-label"
                  id="demo-simple-select-outlined"
                  value={data.wing}
                  onChange={(e) => setData({ ...data, wing: e.target.value })}
                  label="Wing"
                  error={!data?.wing}
                  required
                >
                  <MenuItem value="">
                    <em>None</em>
                  </MenuItem>
                  {wings.map((item, index) => (
                    <MenuItem key={index} value={item}>
                      {item}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid
              item
              xs={12}
              md={6}
              lg={3}
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            ></Grid>
            <Grid
              item
              xs={12}
              md={6}
              lg={3}
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            ></Grid>
            <Grid
              item
              xs={12}
              md={6}
              lg={3}
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            ></Grid>

            {/* accessibility */}
            {/* <Grid container item xs={12} style={{ alignItems: "center" }}>
              <Grid item xs={12} md={3}>
                <Typography variant="h6" style={{ color: "#f68f1d" }}>
                  Accessibility
                </Typography>
              </Grid>
              <Grid item xs={12} md={3}>
                <FormControlLabel
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
                  label="Cutting"
                  labelPlacement="end"
                />
              </Grid>
              <Grid item xs={12} md={3}>
                <FormControlLabel
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
                  label="Stitching"
                  labelPlacement="end"
                />
              </Grid>
              <Grid item xs={12} md={3}>
                <FormControlLabel
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
                  label="Checking"
                  labelPlacement="end"
                />
              </Grid>
            </Grid> */}

            {/* Shift */}
            <Grid container item xs={12} style={{ alignItems: "center" }}>
              <Grid item xs={12} md={3}>
                <Typography variant="h6" style={{ color: "#f68f1d" }}>
                  Select Shifts<span style={{ color: "red" }}>*</span>
                </Typography>
              </Grid>
              <Grid item xs={12} md={3}>
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
                  labelPlacement="end"
                />
              </Grid>
              <Grid item xs={12} md={3}>
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
                  labelPlacement="end"
                />
              </Grid>
              {/* <Grid item xs={12} md={3}>
                <FormControlLabel
                  control={
                    <Checkbox
                      value={data.shiftC}
                      checked={data.shiftC}
                      color="primary"
                      onChange={(e) =>
                        setData({
                          ...data,
                          shiftC: e.target.checked,
                        })
                      }
                    />
                  }
                  label="Shift C"
                  labelPlacement="end"
                />
              </Grid> */}
            </Grid>
            <Divider variant="fullWidth" />
            {/* Responsibility */}
            <Grid container item xs={12} style={{ alignItems: "flex-start" }}>
              <Grid item xs={12} md={3}>
                <Typography variant="h6" style={{ color: "#f68f1d" }}>
                  Responsible For<span style={{ color: "red" }}>*</span>
                </Typography>
              </Grid>
              <Grid container item xs={12} md={9}>
                <Grid item xs={12} md={4}>
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
                    labelPlacement="end"
                  />
                </Grid>
                <Grid item xs={12} md={4}>
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
                    labelPlacement="end"
                  />
                </Grid>
                <Grid item xs={12} md={4}>
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
                    labelPlacement="end"
                  />
                </Grid>
                <Grid item xs={12} md={4}>
                  <FormControlLabel
                    control={
                      <Checkbox
                        value={data.machineViolation}
                        checked={data.machineViolation}
                        color="primary"
                        onChange={(e) =>
                          setData({
                            ...data,
                            machineViolation: e.target.checked,
                          })
                        }
                      />
                    }
                    label="Machine Violation"
                    labelPlacement="end"
                  />
                </Grid>
                <Grid item xs={12} md={4}>
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
                    labelPlacement="end"
                  />
                </Grid>
                <Grid item xs={12} md={4}>
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
                    labelPlacement="end"
                  />
                </Grid>
                <Grid item xs={12} md={4}></Grid>
              </Grid>
            </Grid>
          </Grid>
        </DialogContentText>

        <DialogActions>
          <Button
            onClick={handleClose}
            variant="contained"
            style={{
              backgroundColor: "#fff",
              color: "#0e4a7bF",
              border: "1px solid #0e4a7b",
              width: "90px",
            }}
          >
            CANCEL
          </Button>
          <Button
            variant="contained"
            style={{
              backgroundColor: theme.BLUE,
              color: "#FFF",
              whiteSpace: "nowrap",
              height: "100%",
              border: "1px solid #0e4a7b",
              width: "90px",
            }}
            onClick={openConfirmDialog}
            // onClick={submitUserForm}
          >
            SAVE
          </Button>
        </DialogActions>
      </Dialog>
      <ConfirmDialog
        open={openConfirm}
        handleClose={() => setOpenCOnfirm(false)}
        submit={submitUserForm}
        data={data}
      />
    </Grid>
  );
}

function ConfirmDialog({ open, handleClose, submit, data }) {
  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
      style={{ maxWidth: "1200px", margin: "auto" }}
    >
      <DialogTitle id="alert-dialog-title">
        <p>
          Are you sure you want to add{" "}
          <span style={{ color: theme.ORANGE }}>{data?.username}</span> ?
        </p>
      </DialogTitle>
      <DialogContentText id="alert-dialog-description">
        <Grid
          container
          xs={12}
          spacing={2}
          style={{
            alignItems: "center",
            justifyContent: "space-around",
            padding: "1.5rem 1rem",
          }}
        >
          <KeyValue keyname={"Worker Id"} value={data?.workerID} />
          <KeyValue keyname={"Username"} value={data?.username} />
          <KeyValue keyname={"Email"} value={data?.email} />
          {data?.mobile && <KeyValue keyname={"Mobile"} value={data?.mobile} />}
          <KeyValue keyname={"Designation"} value={data?.designation} />
          <KeyValue keyname={"Department"} value={data?.department} />
          <KeyValue keyname={"Role"} value={data?.role} />
          <KeyValue
            keyname={"Line"}
            value={data?.zone?.length !== 0 && data?.zone?.join(",")}
          />
          <KeyValue keyname={"Wing"} value={data?.wing} />
          {/* shift */}
          <Grid item xs={4}>
            <p>Shift</p>
          </Grid>
          <Grid container item xs={8}>
            <Grid item xs={4}>
              <p>
                A{" "}
                {data?.shiftA ? (
                  <i class="fa fa-check" aria-hidden="true"></i>
                ) : (
                  <i class="fa fa-times" aria-hidden="true"></i>
                )}
              </p>
            </Grid>
            <Grid item xs={4}>
              <p>
                B{" "}
                {data?.shiftB ? (
                  <i class="fa fa-check" aria-hidden="true"></i>
                ) : (
                  <i class="fa fa-times" aria-hidden="true"></i>
                )}
              </p>
            </Grid>
            <Grid item xs={4}></Grid>
          </Grid>
          {/* responsible */}
          <Grid item xs={4}>
            <p>Responsible For</p>
          </Grid>
          <Grid container item xs={8}>
            <Grid item xs={4}>
              <p>
                Machine Breakdown{" "}
                {data?.machineBreakdown ? (
                  <i class="fa fa-check" aria-hidden="true"></i>
                ) : (
                  <i class="fa fa-times" aria-hidden="true"></i>
                )}
              </p>
            </Grid>
            <Grid item xs={4}>
              <p>
                Feed Unavailability{" "}
                {data?.feedUnavailability ? (
                  <i class="fa fa-check" aria-hidden="true"></i>
                ) : (
                  <i class="fa fa-times" aria-hidden="true"></i>
                )}
              </p>
            </Grid>
            <Grid item xs={4}>
              <p>
                Worker Not Available{" "}
                {data?.workerNotAvailable ? (
                  <i class="fa fa-check" aria-hidden="true"></i>
                ) : (
                  <i class="fa fa-times" aria-hidden="true"></i>
                )}
              </p>
            </Grid>
            <Grid item xs={4}>
              <p>
                Machine Violation{" "}
                {data?.machineViolation ? (
                  <i class="fa fa-check" aria-hidden="true"></i>
                ) : (
                  <i class="fa fa-times" aria-hidden="true"></i>
                )}
              </p>
            </Grid>
            <Grid item xs={4}>
              <p>
                Crowding{" "}
                {data?.crowding ? (
                  <i class="fa fa-check" aria-hidden="true"></i>
                ) : (
                  <i class="fa fa-times" aria-hidden="true"></i>
                )}
              </p>
            </Grid>
            <Grid item xs={4}>
              <p>
                Checker Active Monitoring{" "}
                {data?.checkerActiveMonitoring ? (
                  <i class="fa fa-check" aria-hidden="true"></i>
                ) : (
                  <i class="fa fa-times" aria-hidden="true"></i>
                )}
              </p>
            </Grid>
          </Grid>
        </Grid>
      </DialogContentText>

      <DialogActions>
        <Button
          onClick={handleClose}
          variant="contained"
          style={{
            backgroundColor: "#fff",
            color: "#0e4a7bF",
            border: "1px solid #0e4a7b",
            width: "90px",
          }}
        >
          EDIT
        </Button>
        <Button
          variant="contained"
          style={{
            backgroundColor: theme.BLUE,
            color: "#FFF",
            whiteSpace: "nowrap",
            height: "100%",
            border: "1px solid #0e4a7b",
            width: "90px",
          }}
          onClick={submit}
        >
          SAVE
        </Button>
      </DialogActions>
    </Dialog>
  );
}

function KeyValue({ keyname, value }) {
  return (
    <>
      <Grid item xs={4}>
        <p>{keyname}</p>
      </Grid>
      <Grid item xs={8}>
        <p>{value}</p>
      </Grid>
    </>
  );
}
export default AddUser;
