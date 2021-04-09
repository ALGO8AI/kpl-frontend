import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Grid,
  Snackbar,
  TextField,
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
  const submitHandler = async (
    uuid,
    username,
    email,
    designation,
    role,
    zone,
    wing,
    accessibilityCutting,
    accessibilityStitching,
    accessibilityChecking,
    image,
    department,
    modifiedBy,
    shift,
    mobile
  ) => {
    const DATA = {
      uuid,
      username,
      email,
      designation,
      role,
      zone,
      wing,
      accessibilityCutting,
      accessibilityStitching,
      accessibilityChecking,
      image,
      department,
      modifiedBy,
      shift,
      mobile,
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
              UPDATE
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
            style={{
              alignItems: "center",
              justifyContent: "space-around",
              marginBottom: "12px",
            }}
          >
            <Grid item xs={5} style={{ alignItems: "center" }}>
              <TextField
                id="outlined-basic"
                label="Username"
                variant="outlined"
                value={data.username}
                size="small"
                onChange={(e) => setData({ ...data, username: e.target.value })}
              />
            </Grid>
            <Grid item xs={5} style={{ alignItems: "center" }}>
              <TextField
                id="outlined-basic"
                label="Role"
                variant="outlined"
                value={data.role}
                size="small"
                onChange={(e) => setData({ ...data, role: e.target.value })}
              />
            </Grid>
          </Grid>

          <Grid
            container
            xs={12}
            style={{
              alignItems: "center",
              justifyContent: "space-around",
              marginBottom: "12px",
            }}
          >
            <Grid item xs={5} style={{ alignItems: "center" }}>
              <TextField
                id="outlined-basic"
                label="Shift"
                variant="outlined"
                value={data.shift}
                size="small"
                onChange={(e) => setData({ ...data, shift: e.target.value })}
              />
            </Grid>
            <Grid item xs={5} style={{ alignItems: "center" }}>
              <TextField
                id="outlined-basic"
                label="Zone"
                variant="outlined"
                value={data.zone}
                size="small"
                onChange={(e) => setData({ ...data, zone: e.target.value })}
              />
            </Grid>
          </Grid>
          <Grid
            container
            xs={12}
            style={{
              alignItems: "center",
              justifyContent: "space-around",
              marginBottom: "12px",
            }}
          >
            <Grid item xs={5} style={{ alignItems: "center" }}>
              <TextField
                id="outlined-basic"
                label="Wing"
                variant="outlined"
                value={data.wing}
                size="small"
                onChange={(e) => setData({ ...data, wing: e.target.value })}
              />
            </Grid>
            <Grid item xs={5} style={{ alignItems: "center" }}>
              <TextField
                id="outlined-basic"
                label="Department"
                variant="outlined"
                value={data.department}
                size="small"
                onChange={(e) =>
                  setData({ ...data, department: e.target.value })
                }
              />
            </Grid>
          </Grid>

          <Grid
            container
            xs={12}
            style={{
              alignItems: "center",
              justifyContent: "space-around",
              marginBottom: "12px",
            }}
          >
            <Grid item xs={5} style={{ alignItems: "center" }}>
              <TextField
                id="outlined-basic"
                label="Email"
                variant="outlined"
                value={data.email}
                size="small"
                onChange={(e) => setData({ ...data, email: e.target.value })}
              />
            </Grid>
            <Grid item xs={5} style={{ alignItems: "center" }}>
              <TextField
                id="outlined-basic"
                label="Phone"
                variant="outlined"
                value={data.mobileNumber}
                size="small"
                onChange={(e) =>
                  setData({ ...data, mobileNumber: e.target.value })
                }
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
              submitHandler(
                data.uid,
                data.username,
                data.email,
                data.designation,
                data.role,
                data.zone,
                data.wing,
                data.accessibilityCutting,
                data.accessibilityStitching,
                data.accessibilityChecking,
                data.image,
                data.department,
                data.modifiedBy,
                data.shift,
                data.mobileNumber
              );
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
