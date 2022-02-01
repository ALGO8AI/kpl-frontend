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
import FilterListIcon from "@material-ui/icons/FilterList";
import { theme, stitchingLines, wings } from "../../../Utility/constants";
import AddUser from "./AddUser";
import { useDispatch, useSelector } from "react-redux";
import { openSnackbar } from "../../../redux/CommonReducer/CommonAction";

function ManageRoles() {
  // dispatch
  const Dispatch = useDispatch();

  // selector
  const { role } = useSelector((state) => state.Common);

  // state
  const [columns, setColumns] = useState([]);
  const [tableData, setTableData] = useState([]);
  const [data, setData] = useState({});
  const [open, setOpen] = React.useState(false);
  const [openFilter, setOpenFilter] = useState(false);
  const [filterCondition, setFilterConditiion] = useState({
    wing: [],
    line: [],
    shift: [],
  });

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
        if (resp?.msg) {
          Dispatch(
            openSnackbar(true, "success", "User Access Revoked Successfully")
          );
          loadData();
        }
      }
    } catch (e) {}
  };

  const unRevokeUser = async (name) => {
    try {
      var txt = window.confirm("User access will be un-revoked, continue?");
      if (txt) {
        const resp = await UnrevokeUserAccess(name);
        console.log(resp);
        Dispatch(openSnackbar(true, "success", "User Unrevoked Successfully"));
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
      shiftC: data.shiftC ? 1 : 0,
      mobileNumber: data.mobileNumber,
      machineBreakdown: data.machineBreakdown ? 1 : 0,
      feedUnavailability: data.feedUnavailability ? 1 : 0,
      workerNotAvailable: data.workerNotAvailable ? 1 : 0,
      crowding: data.crowding ? 1 : 0,
      checkerActiveMonitoring: data.checkerActiveMonitoring ? 1 : 0,
      machineViolation: data.machineViolation ? 1 : 0,
    };
    console.log(DATA);
    try {
      var txt = window.confirm("User will be updated, continue?");
      if (txt) {
        const x = await UpdateStitchingUserData(DATA);
        if (x?.msg) {
          Dispatch(openSnackbar(true, "success", "User Updated Successfully"));
          loadData();
        } else {
          Dispatch(openSnackbar(true, "error", "Try Again."));
          loadData();
        }
      }
    } catch (err) {
      console.log(err);
    }
  };
  const filterData = async () => {
    try {
      const x = await StitchingUserData(filterCondition);
      console.log(x);
      setTableData(x.userData);
    } catch (e) {}
  };

  const refreshData = async () => {
    try {
      const x = await StitchingUserData({});
      console.log(x);
      setTableData(x.userData);
    } catch (e) {}
  };

  const loadData = async () => {
    console.log("loaddata");
    try {
      const x = await StitchingUserData({});
      console.log(x);
      setTableData(x?.userData);
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
          title: "Shift C",
          field: "shiftC",
          render: (rowData) =>
            Boolean(rowData.shiftC) ? (
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
                if (role === "Admin") {
                  handleClickOpen();
                  setData(x);
                } else {
                  Dispatch(
                    openSnackbar(true, "error", "Only Accessible to admin.")
                  );
                }
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
                onClick={() => {
                  if (role === "Admin") {
                    revokeUser(x.username);
                  } else {
                    Dispatch(
                      openSnackbar(true, "error", "Only Accessible to admin.")
                    );
                  }
                }}
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
      <Grid container style={{ margin: "24px 0", height: "56px" }}>
        <Grid item xs={12} lg={1} style={{ paddingRight: "12px" }}>
          <Button
            variant="contained"
            style={{
              backgroundColor: openFilter ? theme.ORANGE : theme.BLUE,
              color: "#FFF",
              whiteSpace: "nowrap",
              height: "100%",
            }}
            fullWidth
            onClick={() => {
              setOpenFilter(!openFilter);
              refreshData();
            }}
          >
            <FilterListIcon />
            {openFilter ? "CLOSE FILTER" : "OPEN FILTER"}
          </Button>
        </Grid>
        {/* <Grid container item xs={12} lg={8}> */}
        {!openFilter && (
          <>
            <Grid item xs={12} lg={1} style={{ paddingRight: "12px" }}></Grid>
            <Grid item xs={12} lg={1} style={{ paddingRight: "12px" }}></Grid>
            <Grid item xs={12} lg={1} style={{ paddingRight: "12px" }}></Grid>
            <Grid item xs={12} lg={1} style={{ paddingRight: "12px" }}></Grid>
            <Grid item xs={12} lg={1} style={{ paddingRight: "12px" }}></Grid>
          </>
        )}
        {openFilter && (
          <>
            <Grid
              item
              xs={12}
              lg={1}
              style={{ paddingRight: "12px", height: "100%" }}
            >
              <FormControl variant="outlined" fullWidth>
                <InputLabel keyid="demo-simple-select-outlined-label">
                  Wing
                </InputLabel>
                <Select
                  labelId="demo-simple-select-outlined-label"
                  id="demo-simple-select-outlined"
                  value={filterCondition.wing}
                  onChange={(e) =>
                    setFilterConditiion({
                      ...filterCondition,
                      wing: e.target.value,
                    })
                  }
                  label="Wing"
                  style={{ height: "56px" }}
                  multiple
                >
                  <MenuItem value="">
                    <em>None</em>
                  </MenuItem>
                  {wings.map((item, index) => (
                    <MenuItem value={item} key={index}>
                      {item}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>

            <Grid item xs={12} lg={1} style={{ paddingRight: "12px" }}>
              <FormControl variant="outlined" fullWidth>
                <InputLabel keyid="demo-simple-select-outlined-label">
                  Line
                </InputLabel>
                <Select
                  labelId="demo-simple-select-outlined-label"
                  id="demo-simple-select-outlined"
                  value={filterCondition.line}
                  onChange={(e) =>
                    setFilterConditiion({
                      ...filterCondition,
                      line: e.target.value,
                    })
                  }
                  multiple
                  label="Line"
                  style={{ height: "56px" }}
                >
                  <MenuItem value="">
                    <em>None</em>
                  </MenuItem>
                  {stitchingLines.map((item, index) => (
                    <MenuItem value={item} key={index}>
                      {item}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} lg={1} style={{ paddingRight: "12px" }}>
              <FormControl variant="outlined" fullWidth>
                <InputLabel keyid="demo-simple-select-outlined-label">
                  Shift
                </InputLabel>
                <Select
                  labelId="demo-simple-select-outlined-label"
                  id="demo-simple-select-outlined"
                  value={filterCondition.shift}
                  multiple
                  onChange={(e) =>
                    setFilterConditiion({
                      ...filterCondition,
                      shift: e.target.value,
                    })
                  }
                  label="Shift"
                  style={{ height: "56px" }}
                >
                  <MenuItem value="">
                    <em>None</em>
                  </MenuItem>
                  {["A", "B"].map((item, index) => (
                    <MenuItem value={item} key={index}>
                      {item}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>

            <Grid item xs={12} lg={1} style={{ paddingRight: "12px" }}>
              <Button
                variant="contained"
                style={{
                  backgroundColor: theme.BLUE,
                  color: "#FFF",
                  whiteSpace: "nowrap",
                  height: "100%",
                }}
                fullWidth
                onClick={filterData}
              >
                SEARCH
              </Button>
            </Grid>
            <Grid item xs={12} lg={1} style={{ paddingRight: "12px" }}>
              <Button
                variant="contained"
                style={{
                  backgroundColor: theme.BLUE,
                  color: "#FFF",
                  whiteSpace: "nowrap",
                  height: "100%",
                }}
                fullWidth
                onClick={refreshData}
              >
                REFRESH
              </Button>
            </Grid>
          </>
        )}
        <Grid item xs={12} lg={1} style={{ paddingRight: "12px" }}></Grid>
        <Grid item xs={12} lg={1} style={{ paddingRight: "12px" }}></Grid>
        <Grid item xs={12} lg={1} style={{ paddingRight: "12px" }}></Grid>
        <Grid item xs={12} lg={1} style={{ paddingRight: "12px" }}></Grid>
        <Grid item xs={12} lg={1} style={{ paddingRight: "12px" }}></Grid>
        {/* <Grid item xs={12} lg={1} style={{ paddingRight: "12px" }}></Grid> */}
        {/* </Grid> */}
        {role === "Admin" && (
          <Grid container item xs={12} lg={1}>
            <AddUser loadData={loadData} />
          </Grid>
        )}
      </Grid>
      <Grid container item xs={12}>
        <MaterialTable
          title="Manage Roles"
          columns={columns}
          data={tableData}
          options={{
            exportButton: true,
            headerStyle: {
              backgroundColor: "#0e4a7b",
              color: "#FFF",
            },
            pageSizeOptions: [20, 50, 100, 200],
            pageSize: 20,
          }}
          style={{ width: "100%" }}
        />
      </Grid>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        style={{ maxWidth: "1200px", margin: "auto" }}
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
            {/* <Grid
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
                disabled
                fullWidth
                id="outlined-basic"
                label="User Id"
                variant="outlined"
                value={data.workerID}
                onChange={(e) => setData({ ...data, workerID: e.target.value })}
              />
            </Grid> */}
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
              md={6}
              lg={3}
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
              md={6}
              lg={3}
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
                  value={data?.designation}
                  onChange={(e) =>
                    setData({ ...data, designation: e.target.value })
                  }
                  label="Designation"
                >
                  <MenuItem value="">
                    <em>None</em>
                  </MenuItem>
                  {[
                    { name: "Helper", value: "helper" },
                    { name: "Manager", value: "manager" },
                    { name: "Supervisor", value: "supervisor" },
                    { name: "Wing Incharge", value: "wingIncharge" },
                    { name: "Director", value: "director" },
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
                  value={data?.department}
                  onChange={(e) =>
                    setData({ ...data, department: e.target.value })
                  }
                  label="Department"
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
                  value={data?.role}
                  onChange={(e) => setData({ ...data, role: e.target.value })}
                  label="Role"
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
              <FormControl variant="outlined" fullWidth>
                <InputLabel id="demo-simple-select-outlined-label">
                  Line
                </InputLabel>
                <Select
                  labelId="demo-simple-select-outlined-label"
                  id="demo-simple-select-outlined"
                  value={data?.zone}
                  onChange={(e) => setData({ ...data, zone: e.target.value })}
                  label="Line"
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
                  value={data?.wing}
                  onChange={(e) => setData({ ...data, wing: e.target.value })}
                  label="Wing"
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
            <Grid container item xs={12} style={{ alignItems: "center" }}>
              <Grid item xs={12} md={3}>
                <Typography variant="h6" style={{ color: "#f68f1d" }}>
                  Accessibility
                </Typography>
              </Grid>
              <Grid item xs={12} md={3}>
                <FormControlLabel
                  control={
                    <Checkbox
                      value={data?.accessibilityCutting == 1 ? true : false}
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
                  label="Cutting"
                  labelPlacement="end"
                />
              </Grid>
              <Grid item xs={12} md={3}>
                <FormControlLabel
                  control={
                    <Checkbox
                      value={data?.accessibilityStitching == 1 ? true : false}
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
                  label="Stitching"
                  labelPlacement="end"
                />
              </Grid>
              <Grid item xs={12} md={3}>
                <FormControlLabel
                  control={
                    <Checkbox
                      value={data?.accessibilityChecking == 1 ? true : false}
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
                  label="Checking"
                  labelPlacement="end"
                />
              </Grid>
            </Grid>

            {/* shift */}
            <Grid container item xs={12} style={{ alignItems: "center" }}>
              <Grid item xs={12} md={3}>
                <Typography variant="h6" style={{ color: "#f68f1d" }}>
                  Shift
                </Typography>
              </Grid>
              <Grid item xs={12} md={3}>
                <FormControlLabel
                  control={
                    <Checkbox
                      value={data?.shiftA == 1 ? true : false}
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
                  label="A"
                  labelPlacement="end"
                />
              </Grid>
              <Grid item xs={12} md={3}>
                <FormControlLabel
                  control={
                    <Checkbox
                      value={data?.shiftB == 1 ? true : false}
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
                  label="B"
                  labelPlacement="end"
                />
              </Grid>

              <Grid item xs={12} md={3}>
                <FormControlLabel
                  control={
                    <Checkbox
                      value={data?.shiftC == 1 ? true : false}
                      checked={data.shiftC == 1 ? true : false}
                      color="primary"
                      onChange={(e) =>
                        setData({
                          ...data,
                          shiftC: e.target.checked,
                        })
                      }
                    />
                  }
                  label="C"
                  labelPlacement="end"
                />
              </Grid>
            </Grid>

            {/* Responsibility */}
            <Grid container item xs={12} style={{ alignItems: "flex-start" }}>
              <Grid item xs={12} md={3}>
                <Typography variant="h6" style={{ color: "#f68f1d" }}>
                  Responsible For
                </Typography>
              </Grid>
              <Grid container item xs={12} md={9}>
                <Grid item xs={12} md={4}>
                  <FormControlLabel
                    control={
                      <Checkbox
                        value={data?.machineBreakdown == 1 ? true : false}
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
                <Grid item xs={12} md={4}>
                  <FormControlLabel
                    control={
                      <Checkbox
                        value={data?.feedUnavailability == 1 ? true : false}
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
                <Grid item xs={12} md={4}>
                  <FormControlLabel
                    control={
                      <Checkbox
                        value={data?.workerNotAvailable == 1 ? true : false}
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
                <Grid item xs={12} md={4}>
                  <FormControlLabel
                    control={
                      <Checkbox
                        value={data?.machineViolation == 1 ? true : false}
                        checked={data.machineViolation == 1 ? true : false}
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
                        value={data?.crowding == 1 ? true : false}
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
                <Grid item xs={12} md={4}>
                  <FormControlLabel
                    control={
                      <Checkbox
                        value={
                          data?.checkerActiveMonitoring == 1 ? true : false
                        }
                        checked={
                          data.checkerActiveMonitoring == 1 ? true : false
                        }
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
