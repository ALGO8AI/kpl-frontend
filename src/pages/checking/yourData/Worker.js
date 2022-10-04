/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import Grid from "@material-ui/core/Grid";

import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import PropTypes from "prop-types";
import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Snackbar,
} from "@material-ui/core";
import "./Worker.scss";
import MaterialTable from "material-table";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
// import {
//   AddWorkerChecking,
//   getCheckingWorkerData,
//   workerUpdateChecking,
//   workerDeleteChecking,
// } from "../../../services/api.service";
import { Alert } from "@material-ui/lab";
import {
  AddWorkerCheckingV3,
  getCheckingWorkerDataV3,
  workerDeleteCheckingV3,
  workerUpdateCheckingV3,
} from "../../../services/checking.api";
import { useDispatch, useSelector } from "react-redux";
import { openSnackbar } from "../../../redux/CommonReducer/CommonAction";

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function WorkerChecking(props) {
  const { role } = useSelector((state) => state.Common);
  const isEnable = role === "admin" || role === "Admin" || role === "user";

  const [workerData, setWorkerData] = useState();
  const [edit, setEdit] = useState(false);
  const { selectedWing, wingList } = useSelector((state) => state?.CheckV3);
  const dispatch = useDispatch();

  const loadData = async (selectedWing) => {
    try {
      const x = await getCheckingWorkerDataV3(selectedWing);
      console.log(x);
      setWorkerData(x.data);
    } catch (err) {}
  };
  useEffect(() => {
    loadData(selectedWing || localStorage.getItem("kpl_wing"));
  }, [selectedWing]);
  const columns = [
    { title: "Worker ID", field: "workerId" },
    // {
    //   title: "Image",
    //   render: (rowData) => (
    //     <img
    //       style={{ width: "36px", height: "36px" }}
    //       src={rowData.image}
    //       alt={rowData.workerId}
    //     />
    //   ),
    // },
    { title: "Worker Name", field: "workerName" },
    {
      title: "Edit",
      render: (x) => (
        <button
          style={{
            color: "#0e4a7b",
            textDecoration: "underline",
            backgroundColor: "white",
            padding: "8px 16px",
            border: "none",
            outline: "none",
            cursor: "pointer",
            fontSize: "1rem",
          }}
          onClick={() => {
            if (isEnable) {
              setEdit(true);
              setUserData({
                ...userdata,
                name: x.workerName,
                workerId: x.workerId,
                workerImage: x.image,
              });
            } else {
              dispatch(
                openSnackbar(true, "error", `Access denied for ${role}`)
              );
            }
          }}
        >
          EDIT
        </button>
      ),
    },
  ];
  const [userdata, setUserData] = useState({
    name: "",
    workerId: "",
    workerImage: "",
    wing: "",
  });
  const [msg, setMsg] = React.useState("");
  const [open, setOpen] = useState(false);

  const uploadImage = async (e) => {
    const file = e.target.files[0];
    const base64 = await convertBase64(file);
    setUserData({ ...userdata, workerImage: base64 });
  };

  const convertBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const fileReader = new FileReader();
      file && fileReader.readAsDataURL(file);

      fileReader.onload = () => {
        resolve(fileReader.result);
      };

      fileReader.onerror = (error) => {
        reject(error);
      };
    });
  };

  const submitImageDetails = async () => {
    if (isEnable) {
      try {
        if (
          !userdata.name?.trim() ||
          !userdata.workerId?.trim() ||
          !userdata.wing?.trim()
        ) {
          return dispatch(
            openSnackbar(true, "error", "Please Fill All Fields")
          );
        }
        const resp = await AddWorkerCheckingV3(userdata);
        // console.log(resp);
        setMsg(resp.msg);
        setOpen(true);
        loadData(selectedWing || localStorage.getItem("kpl_wing"));
        setUserData({ name: "", workerId: "", workerImage: "", wing: "" });
      } catch (e) {
        // console.log(e.message);
      }
    } else {
      dispatch(openSnackbar(true, "error", `Access denied for ${role}`));
    }
  };

  const updateImageDetails = async () => {
    try {
      const resp = await workerUpdateCheckingV3(userdata);
      // console.log(resp);
      setMsg(resp.msg);
      setOpen(true);
      loadData(selectedWing);
      setUserData({ name: "", workerId: "", workerImage: "", wing: "" });
      setEdit(false);
    } catch (e) {
      // console.log(e.message);
    }
  };

  const deleteImageDetails = async () => {
    try {
      const resp = await workerDeleteCheckingV3({
        workerId: userdata.workerId,
      });
      loadData(selectedWing);
      setUserData({ name: "", workerId: "", workerImage: "", wing: "" });
      // console.log(resp);
      setMsg("Deleted");
      setOpen(true);
      setEdit(false);
    } catch (e) {
      console.log(e.message);
    }
  };

  return (
    <Grid container spacing={4}>
      <Grid item xs={12} md={4}>
        <TextField
          id="outlined-basic"
          label="Name"
          variant="outlined"
          style={{ marginBottom: "12px" }}
          value={userdata.name}
          fullWidth
          onChange={(e) => setUserData({ ...userdata, name: e.target.value })}
        />
        <TextField
          id="outlined-basic"
          label="Worker ID"
          variant="outlined"
          style={{ marginBottom: "12px" }}
          value={userdata.workerId}
          fullWidth
          onChange={(e) =>
            setUserData({ ...userdata, workerId: e.target.value })
          }
        />

        <FormControl
          variant="outlined"
          fullWidth
          style={{ marginBottom: "12px" }}
        >
          <InputLabel id="demo-simple-select-outlined-label">Wing</InputLabel>
          <Select
            labelId="demo-simple-select-outlined-label"
            id="demo-simple-select-outlined"
            value={userdata.wing}
            onChange={(e) => setUserData({ ...userdata, wing: e.target.value })}
            label="Wing"
            // multiple
          >
            {wingList?.length > 0 &&
              wingList?.map((item, index) => (
                <MenuItem key={index} value={item?.wing}>
                  {item?.wing}
                </MenuItem>
              ))}
          </Select>
        </FormControl>
        <label for="myfile" className="inputLabel">
          Select a file:
        </label>
        <input
          style={{ display: "none" }}
          type="file"
          id="myfile"
          name="myfile"
          accept=".jpg,.png,.jpeg"
          onChange={(e) => {
            uploadImage(e);
          }}
        />
        {userdata.workerImage && (
          <img
            style={{ width: "100%", padding: "12px" }}
            src={userdata.workerImage}
            alt="User"
          />
        )}
        {edit ? (
          <Grid container xs={12}>
            <Grid container item xs={6} style={{ padding: "6px" }}>
              <Button
                variant="contained"
                style={{
                  backgroundColor: "#fff",
                  color: "#0e4a7b",
                  whiteSpace: "nowrap",
                  width: "100%",
                  height: "fit-content",
                  border: "1px solid #0e4a7b",
                }}
                onClick={() => {
                  setEdit(false);
                  setUserData({ name: "", workerId: "", workerImage: "" });
                }}
              >
                CANCEL
              </Button>
            </Grid>
            <Grid container item xs={6} style={{ padding: "6px" }}>
              <Button
                variant="contained"
                style={{
                  backgroundColor: "#0e4a7b",
                  color: "#FFF",
                  whiteSpace: "nowrap",
                  width: "100%",
                  height: "fit-content",
                  border: "1px solid #0e4a7b",
                }}
                onClick={updateImageDetails}
              >
                UPDATE
              </Button>
            </Grid>
            <Grid container item xs={12} style={{ padding: "6px" }}>
              <Button
                variant="contained"
                style={{
                  backgroundColor: "#b53f3f",
                  color: "#FFF",
                  whiteSpace: "nowrap",
                  width: "100%",
                  height: "fit-content",
                  border: "1px solid #b53f3f",
                }}
                onClick={deleteImageDetails}
              >
                DELETE
              </Button>
            </Grid>
          </Grid>
        ) : (
          <Grid container item xs={12} style={{ padding: "6px" }}>
            <Button
              variant="contained"
              style={{
                backgroundColor: "#0e4a7b",
                color: "#FFF",
                whiteSpace: "nowrap",
                width: "100%",
                height: "fit-content",
                border: "1px solid #0e4a7b",
              }}
              onClick={submitImageDetails}
            >
              {/* <FilterListIcon /> */}
              SAVE
            </Button>
          </Grid>
        )}
      </Grid>
      <Grid item xs={12} md={8}>
        <MaterialTable
          title="Workers Information"
          columns={columns}
          data={workerData}
          options={{
            exportButton: true,
            headerStyle: {
              backgroundColor: "#0e4a7b",
              color: "#FFF",
            },
            pageSizeOptions: [20, 50, 100, 200],
            pageSize: 20,
          }}
        />
      </Grid>

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
  );
}

export default WorkerChecking;
