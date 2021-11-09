/* eslint-disable eqeqeq */
/* eslint-disable react-hooks/exhaustive-deps */
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
} from "@material-ui/core";
import MaterialTable from "material-table";
import React, { useState, useEffect } from "react";
import {
  revokeUserAccess,
  StitchingUserData,
  UpdateStitchingUserData,
  UnrevokeUserAccess,
} from "../../../services/api.service";

function ManageRoles() {
  const [columns, setColumns] = useState([]);
  const [data, setData] = useState([]);
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const revokeUser = async (name) => {
    try {
      var txt = window.confirm("User access will be revoked, continue?");
      if (txt) {
        const resp = await revokeUserAccess(name);
        alert(resp.msg);
        loadData();
      }
    } catch (e) {}
  };

  const unRevokeUser = async (name) => {
    try {
      var txt = window.confirm("User access will be un-revoked, continue?");
      if (txt) {
        const resp = await UnrevokeUserAccess(name);
        alert(resp.msg);
        loadData();
      }
    } catch (e) {}
  };

  const submitHandler = async () => {
    const DATA = {
      id: data.id,
      uid: data.uid,
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
      mobileNumber: data.mobileNumber,
      machineBreakdown: data.machineBreakdown ? 1 : 0,
      feedUnavailability: data.feedUnavailability ? 1 : 0,
      workerNotAvailable: data.workerNotAvailable ? 1 : 0,
      crowding: data.crowding ? 1 : 0,
      checkerActiveMonitoring: data.checkerActiveMonitoring ? 1 : 0,
    };
    console.log(DATA);
    try {
      var txt = window.confirm("User will be updated, continue?");
      if (txt) {
        const x = await UpdateStitchingUserData(DATA);
        console.log(x);
        alert(x.msg);
        loadData();
      }
    } catch (err) {
      console.log(err);
    }
  };

  const loadData = async () => {
    console.log("loaddata");
    try {
      const x = await StitchingUserData();
      console.log(x);
      if (x?.userData) {
        setData(x?.userData);
      }
      setColumns([
        {
          title: "User ID",
          field: "workerID",
        },

        {
          title: "Username",
          field: "username",
        },

        {
          title: "Role",
          field: "role",
        },

        {
          title: "Shift A",
          field: "shiftA",
          render: (rowData) =>
            Boolean(rowData.shiftA) ? (
              <p style={{ color: "rgb(74, 170, 22)" }}>
                <i class="fa fa-check" aria-hidden="true"></i>
              </p>
            ) : (
              <p style={{ color: "rgb(249, 54, 54)" }}>
                <i class="fa fa-times" aria-hidden="true"></i>
              </p>
            ),
        },
        {
          title: "Shift B",
          field: "shiftB",
          render: (rowData) =>
            Boolean(rowData.shiftB) ? (
              <p style={{ color: "rgb(74, 170, 22)" }}>
                <i class="fa fa-check" aria-hidden="true"></i>
              </p>
            ) : (
              <p style={{ color: "rgb(249, 54, 54)" }}>
                <i class="fa fa-times" aria-hidden="true"></i>
              </p>
            ),
        },

        {
          title: "Line",
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
            <button
              style={{
                color: "#0e4a7b",
                textDecoration: "underline",
                backgroundColor: "white",
                padding: "8px 12px",
                border: "none",
                outline: "none",
                cursor: "pointer",
                fontSize: "1rem",
              }}
              onClick={() => {
                handleClickOpen();
                setData(x);
              }}
            >
              EDIT
            </button>
          ),
        },
        {
          title: "Revoke",
          field: "uid",
          render: (x) =>
            x.revokeAccess === 0 ? (
              <Button
                variant="contained"
                style={{
                  backgroundColor: "#0e4a7b",
                  padding: "8px 12px",
                  cursor: "pointer",
                  fontSize: "1rem",
                  color: "white",
                }}
                onClick={() => revokeUser(x.username)}
              >
                REVOKE
              </Button>
            ) : (
              <Button
                variant="contained"
                style={{
                  backgroundColor: "#0e4a7b",
                  padding: "8px 12px",
                  cursor: "pointer",
                  fontSize: "1rem",
                  color: "white",
                }}
                onClick={() => unRevokeUser(x.username)}
              >
                UNREVOKE
              </Button>
            ),
        },
        // {
        //   title: "Unrevoke",
        //   field: "uid",
        //   render: (x) => (
        //     <Button
        //       variant="contained"
        //       style={{
        //         backgroundColor: "#0e4a7b",
        //         padding: "8px 12px",
        //         cursor: "pointer",
        //         fontSize: "1rem",
        //         color: "white",
        //       }}
        //       onClick={() => unRevokeUser(x.username)}
        //     >
        //       UNREVOKE
        //     </Button>
        //   ),
        // },
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
      {/* <Grid container> */}
      {/* <Grid container item md={12}> */}
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
          pageSizeOptions: [20, 50, 100, 200],
          pageSize: 20,
        }}
        style={{ marginTop: "50px", width: "100%" }}
      />
      {/* </Grid> */}
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        style={{ width: "900px", margin: "auto" }}
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
                value={data?.username}
                fullWidth
                onChange={(e) => setData({ ...data, username: e.target.value })}
                // disabled
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
                value={data?.password}
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
                value={data?.email}
                // disabled
                onChange={(e) => setData({ ...data, email: e.target.value })}
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
                  value={data?.designation}
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

            {data?.designation === "supervisor" && (
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
                    value={data?.role}
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

            {data?.designation === "manager" && (
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
                label="User Id"
                variant="outlined"
                value={data.workerID}
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
                onChange={(e) =>
                  setData({ ...data, mobileNumber: e.target.value })
                }
              />
            </Grid>

            <Grid
              item
              xs={12}
              style={{
                display: "flex",
                alignItems: "center",
                // justifyContent: "center",
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
                labelPlacement="end"
              />
            </Grid>

            <Grid
              item
              xs={12}
              style={{
                display: "flex",
                alignItems: "center",
                // justifyContent: "center",
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
                labelPlacement="end"
              />
            </Grid>

            <Grid
              item
              xs={12}
              style={{
                display: "flex",
                alignItems: "center",
                // justifyContent: "center",
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
                labelPlacement="end"
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
              xs={12}
              style={{
                display: "flex",
                alignItems: "center",
                // justifyContent: "center",
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
                labelPlacement="end"
              />
            </Grid>

            <Grid
              item
              xs={12}
              style={{
                display: "flex",
                alignItems: "center",
                // justifyContent: "center",
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
                labelPlacement="end"
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
              xs={12}
              style={{
                display: "flex",
                alignItems: "center",
                // justifyContent: "center",
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
                labelPlacement="end"
              />
            </Grid>

            <Grid
              item
              xs={12}
              style={{
                display: "flex",
                alignItems: "center",
                // justifyContent: "center",
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
                labelPlacement="end"
              />
            </Grid>

            <Grid
              item
              xs={12}
              style={{
                display: "flex",
                alignItems: "center",
                // justifyContent: "center",
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
                labelPlacement="end"
              />
            </Grid>

            <Grid
              item
              xs={12}
              style={{
                display: "flex",
                alignItems: "center",
                // justifyContent: "center",
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
                labelPlacement="end"
              />
            </Grid>

            <Grid
              item
              xs={12}
              style={{
                display: "flex",
                alignItems: "center",
                // justifyContent: "center",
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
                labelPlacement="end"
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
      {/* </Grid> */}
    </>
  );
}

export default ManageRoles;
