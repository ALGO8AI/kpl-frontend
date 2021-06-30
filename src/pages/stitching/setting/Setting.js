import React from "react";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import { makeStyles } from "@material-ui/core/styles";
// import "./home.css";
import PropTypes from "prop-types";
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import "./Setting.scss";
import AlertAndNotification from "./AlertAndNotification";
import { Grid } from "@material-ui/core";
import ManageRoles from "./ManageRoles";
import AddUser from "./AddUser";
import { LayoutView } from "../layoutView/LayoutView";
import { AnnotationPage } from "../layoutView/annotation/Annotation";

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <Grid
      container
      item
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      // style={{ width: "100%" }}
      {...other}
    >
      {value === index && (
        <Grid container item>
          {children}
        </Grid>
      )}
    </Grid>
  );
}
const getRole = () => {
  return localStorage.getItem("ROLE");
};

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

function Setting() {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  const [timePeriod, setTimePeriod] = React.useState("weekly");
  const [zone, setZone] = React.useState("zone1");

  const handleTimeChange = (event) => {
    setTimePeriod(event.target.value);
  };
  const handleZoneChange = (event) => {
    setZone(event.target.value);
  };
  return (
    <Grid xs={12} md={12} item style={{ padding: "1rem" }}>
      <AppBar position="static" className="customTab">
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label="simple tabs example"
          variant="scrollable"
          scrollButtons="auto"
        >
          <Tab label="Alert and Notification" {...a11yProps(0)} />
          <Tab label="Manage Roles" {...a11yProps(1)} />

          <Tab label=" Configurations" {...a11yProps(2)} />
          {/* {getRole() == "admin" ? (
            <Tab label=" Configurations" {...a11yProps(1)} />
          ) : null} */}
        </Tabs>
      </AppBar>
      <TabPanel value={value} index={0}>
        <AlertAndNotification />
      </TabPanel>
      <TabPanel value={value} index={1}>
        <Grid container item xs={12}>
          <ManageRoles />
        </Grid>
        <AddUser />
      </TabPanel>
      {/* <TabPanel value={value} index={2}>
        <div className="overlay">
          <Typography variant="h2">Coming Soon</Typography>
        </div>
      </TabPanel> */}

      <TabPanel value={value} index={2}>
        <AnnotationPage />
      </TabPanel>
    </Grid>
  );
}

export default Setting;
