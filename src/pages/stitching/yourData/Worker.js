import React, { useState, useEffect } from "react";
import Grid from "@material-ui/core/Grid";
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import { makeStyles } from "@material-ui/core/styles";
import PropTypes from "prop-types";
import { Input, Snackbar } from "@material-ui/core";
import "./Worker.scss";
import CloudUploadIcon from "@material-ui/icons/CloudUpload";
import MaterialTable from "material-table";
import { DropzoneArea } from "material-ui-dropzone";
import TextField from "@material-ui/core/TextField";
import MenuItem from "@material-ui/core/MenuItem";
import Button from "@material-ui/core/Button";
import PublishIcon from "@material-ui/icons/Publish";
import {
  AddWorkerStitching,
  getYourData,
  workerUpdateStitching,
  workerDeleteStitching,
} from "../../../services/api.service";
import { Alert } from "@material-ui/lab";
import { StitchingContext } from "../../../context/StitchingContext";

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

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
    backgroundColor: "#fff",
    boxShadow: "1px 1px 5px #555",
    borderRadius: "10px",
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));

function Worker(props) {
  const [workerData, setWorkerData] = useState([]);
  const classes = useStyles();
  const [edit, setEdit] = useState(false);
  const { state, dispatch } = React.useContext(StitchingContext);

  const loadData = async () => {
    try {
      if (state.workerDetails.loading) {
        const x = await getYourData();
        console.log(x);
        dispatch({
          type: "WORKER_DETAILS",
          payload: { data: x.latestWorkerData, loading: false },
        });
        // setWorkerData(x.latestWorkerData);
      }
    } catch (err) {}
  };

  const refreshData = async () => {
    try {
      const x = await getYourData();
      console.log(x);
      dispatch({
        type: "WORKER_DETAILS",
        payload: { data: x.latestWorkerData, loading: false },
      });
    } catch (err) {}
  };
  useEffect(() => {
    loadData();
  }, []);
  const columns = [
    { title: "Worker ID", field: "workerId" },
    { title: "Worker Name", field: "workerName" },
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
            setEdit(true);
            setUserData({
              ...userdata,
              workerName: x.workerName,
              workerId: x.workerId,
              image: x.image,
            });
          }}
        >
          EDIT
        </button>
      ),
    },
  ];
  const [userdata, setUserData] = useState({
    workerName: "",
    workerId: "",
    image: "",
  });
  const [msg, setMsg] = React.useState("");
  const [open, setOpen] = useState(false);

  const uploadImage = async (e) => {
    const file = e.target.files[0];
    const base64 = await convertBase64(file);
    setUserData({ ...userdata, image: base64 });
  };

  const convertBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const fileReader = new FileReader();
      fileReader.readAsDataURL(file);

      fileReader.onload = () => {
        resolve(fileReader.result);
      };

      fileReader.onerror = (error) => {
        reject(error);
      };
    });
  };

  const submitImageDetails = async () => {
    try {
      const resp = await AddWorkerStitching(userdata);
      setWorkerData([...workerData, userdata]);
      setMsg(resp.msg);
      setOpen(true);
      refreshData();
      setUserData({ workerName: "", workerId: "", image: "" });
    } catch (e) {
      console.log(e.message);
    }
  };

  const updateImageDetails = async () => {
    try {
      const resp = await workerUpdateStitching(userdata);
      setMsg(resp.msg);
      setOpen(true);
      refreshData();
      setUserData({ workerName: "", workerId: "", image: "" });
    } catch (e) {}
  };

  const deleteImageDetails = async () => {
    try {
      const resp = await workerDeleteStitching({ workerId: userdata.workerId });
      setWorkerData(
        workerData.filter((item) => item.workerId !== userdata.workerId)
      );
      setMsg("Deleted");
      setOpen(true);
      refreshData();
      setUserData({ workerName: "", workerId: "", image: "" });
    } catch (e) {}
  };

  return (
    <Grid container spacing={4}>
      <Grid item xs={12} md={4}>
        <TextField
          id="outlined-basic"
          label="Name"
          variant="outlined"
          style={{ marginBottom: "12px" }}
          value={userdata.workerName}
          fullWidth
          onChange={(e) =>
            setUserData({ ...userdata, workerName: e.target.value })
          }
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
        {userdata.image && (
          <img
            style={{ width: "100%", padding: "12px" }}
            src={userdata.image}
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
                  setUserData({ workerName: "", workerId: "", image: "" });

                  // setUserData({
                  //   ...userdata,
                  //   supervisorName: "",
                  //   supervisorId: "",
                  //   date: "",
                  //   shift: "",
                  //   wing: "",
                  //   line: "",
                  // });
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
          data={state.workerDetails.data}
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

export default Worker;
