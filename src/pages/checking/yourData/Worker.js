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
import { AddNewUser, getYourData } from "../../../services/api.service";
import { Alert } from "@material-ui/lab";

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
  const [workerData, setWorkerData] = useState();
  const classes = useStyles();

  const loadData = async () => {
    try {
      const x = await getYourData();
      setData(x.latestWorkerData);
    } catch (err) {}
  };
  useEffect(() => {
    loadData();
  }, []);
  const [columns, setColumns] = useState([
    { title: "Sl No.", field: "id" },
    { title: "Worker Name", field: "workerName" },
    { title: "Worker ID", field: "workerId" },
  ]);
  const [data, setData] = useState([]);
  const [value, setValue] = React.useState(0);
  const [file, setFile] = React.useState([]);
  const [photo, setPhoto] = React.useState();
  const [msg, setMsg] = React.useState("");
  const [open, setOpen] = useState(false);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  const handleFileChange = (files) => {
    setFile(files);
  };

  const handlePhoto = (e) => {
    setPhoto(e.target.files[0]);
  };

  const [userData, setUserData] = useState({
    username: "",
    password: "",
    email: "",
    designation: "",
    role: "",
    zone: "",
    wing: "",
    accessibilityCutting: 1,
    accessibilityStitching: 1,
    accessibilityChecking: 1,
    workerID: "",
    image: "",
    department: "all",
    createdBy: "dev",
    modifiedBy: "dev",
    shift: "",
    mobile: "",
  });

  const submitUserForm = async () => {
    console.log(userData);
    const x = await AddNewUser(userData);
    console.log(x);
    setOpen(true);
    setMsg(x.message);
  };

  return (
    <Grid container spacing={4}>
      <Grid item xs={12} md={4}>
        <DropzoneArea
          onChange={handleFileChange}
          dropzoneText={"Drag and drop files or click here"}
          acceptedFiles={[".csv", ".xls", ".xlsx"]}
        />
        <br />
        <div style={{ padding: "4px 0px" }} className="customUpload">
          <CloudUploadIcon />
          &nbsp;Upload Document
        </div>
      </Grid>
      <Grid item xs={12} md={8}>
        <MaterialTable
          title="Workers Information"
          columns={columns}
          data={data}
          options={{
            exportButton: true,
            headerStyle: {
              backgroundColor: "#0e4a7b",
              color: "#FFF",
            },
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
