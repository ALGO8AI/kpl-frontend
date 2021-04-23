import {
  Button,
  Checkbox,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  FormControl,
  FormControlLabel,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  Snackbar,
  TextField,
  Typography,
} from "@material-ui/core";
import { Alert } from "@material-ui/lab";
import MaterialTable from "material-table";
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  StitchingUserData,
  UpdateStitchingUserData,
} from "../../../services/api.service";

function ManageRoles() {
  const [columns, setColumns] = useState([]);
  const [data, setData] = useState([]);
  const [user, SetUser] = useState({});
  const [open, setOpen] = React.useState(false);
  const [update, setUpdate] = useState();
  const [msg, setMsg] = useState("Updated");
  const [openMsg, setOpenMsg] = useState(true);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const submitHandler = async () => {
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
    };
    console.log(DATA);
    try {
      const x = await UpdateStitchingUserData(DATA);
      console.log(x);
      alert(x.msg);
      //   setOpenMsg(true);
    } catch (err) {
      console.log(err);
    }
  };

  const loadData = async () => {
    console.log("loaddata");
    try {
      const x = await StitchingUserData();
      setData(x.userData);
      setColumns([
        {
          title: "Worker ID",
          field: "workerID",
        },

        {
          title: "Worker Name",
          field: "username",
        },

        {
          title: "Role",
          field: "role",
        },

        {
          title: "Shift",
          field: "shift",
        },

        {
          title: "Zone",
          field: "zone",
        },
        {
          title: "Wing",
          field: "wing",
        },

        {
          title: "Email",
          field: "email",
        },
        {
          title: "Mobile",
          field: "mobileNumber",
        },
        {
          title: "Update",
          field: "uid",
          render: (x) => (
            <Button
              variant="contained"
              style={{
                backgroundColor: "#0e4a7b",
                color: "#FFF",
              }}
              onClick={() => {
                handleClickOpen();
                setData(x);
              }}
            >
              EDIT
            </Button>
          ),
        },
      ]);
      console.log(x);
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    loadData();
  }, []);

  return (
    <>
      <MaterialTable
        title="Manage Roles"
        columns={columns}
        data={data}
        options={{
          exportButton: true,
          headerStyle: {
            backgroundColor: "#0e4a7b",
            color: "#FFF",
          },
        }}
        style={{ marginTop: "50px" }}
      />
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"UPDATE USER DATA"}</DialogTitle>
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
              xs={6}
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <TextField
                id="outlined-basic"
                label="Username"
                variant="outlined"
                value={data.username}
                fullWidth
                disabled
              />
            </Grid>
            <Grid
              item
              xs={6}
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <TextField
                id="outlined-basic"
                label="Password"
                variant="outlined"
                value={data.password}
                fullWidth
                disabled
              />
            </Grid>
            <Grid
              item
              xs={12}
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <TextField
                fullWidth
                id="outlined-basic"
                label="Email"
                variant="outlined"
                value={data.email}
                size="small"
                disabled
              />
            </Grid>
            <Grid
              item
              xs={6}
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
                >
                  <MenuItem value="">
                    <em>None</em>
                  </MenuItem>
                  <MenuItem value={"supervisor"}>Supervisor</MenuItem>
                  <MenuItem value={"manager"}>Manager</MenuItem>
                  <MenuItem value={"wing incharge"}>wing Incharge</MenuItem>
                  <MenuItem value={"helper"}>Helper</MenuItem>
                </Select>
              </FormControl>
            </Grid>

            {data.designation === "supervisor" && (
              <Grid
                item
                xs={6}
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <FormControl variant="outlined" fullWidth>
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
              </Grid>
            )}

            {data.designation === "manager" && (
              <Grid
                item
                xs={6}
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <FormControl variant="outlined" fullWidth>
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
                    <MenuItem value={"admin"}>Admin</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
            )}

            {data.designation === "wing incharge" && (
              <Grid
                item
                xs={6}
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <FormControl variant="outlined" fullWidth>
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
              </Grid>
            )}

            {data.designation === "helper" && (
              <Grid
                item
                xs={6}
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <FormControl variant="outlined" fullWidth>
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
              </Grid>
            )}

            <Grid
              item
              xs={6}
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <TextField
                fullWidth
                id="outlined-basic"
                label="Line"
                variant="outlined"
                value={data.zone}
                size="small"
                onChange={(e) => setData({ ...data, zone: e.target.value })}
              />
            </Grid>
            <Grid
              item
              xs={6}
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <TextField
                fullWidth
                id="outlined-basic"
                label="Wing"
                variant="outlined"
                value={data.wing}
                size="small"
                onChange={(e) => setData({ ...data, wing: e.target.value })}
              />
            </Grid>
            <Grid
              item
              xs={6}
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <TextField
                fullWidth
                id="outlined-basic"
                label="Worker Id"
                variant="outlined"
                value={data.workerID}
                size="small"
                onChange={(e) => setData({ ...data, workerID: e.target.value })}
              />
            </Grid>

            <Grid
              item
              xs={6}
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <TextField
                fullWidth
                id="outlined-basic"
                label="Mobile"
                type="number"
                variant="outlined"
                value={data.mobileNumber}
                size="small"
                onChange={(e) =>
                  setData({ ...data, mobileNumber: e.target.value })
                }
              />
            </Grid>

            <Grid
              item
              xs={4}
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <FormControlLabel
                control={
                  <Checkbox
                    value={data.accessibilityCutting == 1 ? true : false}
                    checked={data.accessibilityCutting == 1 ? true : false}
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
            </Grid>

            <Grid
              item
              xs={4}
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <FormControlLabel
                control={
                  <Checkbox
                    value={data.accessibilityStitching == 1 ? true : false}
                    checked={data.accessibilityStitching == 1 ? true : false}
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
            </Grid>

            <Grid
              item
              xs={4}
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <FormControlLabel
                control={
                  <Checkbox
                    value={data.accessibilityChecking == 1 ? true : false}
                    checked={data.accessibilityChecking == 1 ? true : false}
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
            </Grid>

            <Grid
              item
              xs={12}
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Typography variant="h6" style={{ color: "#f68f1d" }}>
                SHIFT
              </Typography>
            </Grid>
            <Grid
              item
              xs={6}
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <FormControlLabel
                control={
                  <Checkbox
                    value={data.shiftA == 1 ? true : false}
                    checked={data.shiftA == 1 ? true : false}
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
            </Grid>

            <Grid
              item
              xs={4}
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <FormControlLabel
                control={
                  <Checkbox
                    value={data.shiftB == 1 ? true : false}
                    checked={data.shiftB == 1 ? true : false}
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
            </Grid>
            <Grid
              item
              xs={12}
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Typography variant="h6" style={{ color: "#f68f1d" }}>
                RESPONSIBLE FOR
              </Typography>
            </Grid>
            <Grid
              item
              xs={6}
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <FormControlLabel
                control={
                  <Checkbox
                    value={data.machineBreakdown == 1 ? true : false}
                    checked={data.machineBreakdown == 1 ? true : false}
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
            </Grid>

            <Grid
              item
              xs={6}
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <FormControlLabel
                control={
                  <Checkbox
                    value={data.feedUnavailability == 1 ? true : false}
                    checked={data.feedUnavailability == 1 ? true : false}
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
            </Grid>

            <Grid
              item
              xs={6}
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <FormControlLabel
                control={
                  <Checkbox
                    value={data.workerNotAvailable == 1 ? true : false}
                    checked={data.workerNotAvailable == 1 ? true : false}
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
            </Grid>

            <Grid
              item
              xs={6}
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <FormControlLabel
                control={
                  <Checkbox
                    value={data.crowding == 1 ? true : false}
                    checked={data.crowding == 1 ? true : false}
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
            </Grid>

            <Grid
              item
              xs={6}
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <FormControlLabel
                control={
                  <Checkbox
                    value={data.checkerActiveMonitoring == 1 ? true : false}
                    checked={data.checkerActiveMonitoring == 1 ? true : false}
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
            </Grid>
          </Grid>
        </DialogContentText>

        <DialogActions>
          <Button onClick={handleClose} variant="contained" color="secondary">
            CANCEL
          </Button>
          <Button
            variant="contained"
            style={{
              backgroundColor: "#0e4a7b",
              color: "#FFF",
            }}
            onClick={() => {
              submitHandler();
              handleClose();
              setTimeout(() => {
                loadData();
              }, 2000);
            }}
            autoFocus
          >
            SAVE
          </Button>
        </DialogActions>
      </Dialog>
      {/* <Grid item xs={9}>
        <Snackbar
          openMsg={openMsg}
          //   autoHideDuration={2000}
          onClose={() => setOpenMsg(false)}
        >
          <Alert onClose={() => setOpenMsg(false)} severity="success">
            {msg}
          </Alert>
        </Snackbar>
      </Grid> */}
    </>
  );
}

export default ManageRoles;
