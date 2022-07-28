/* eslint-disable no-unused-vars */
import React from "react";
// import "./home.css";
import PropTypes from "prop-types";
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Typography from "@material-ui/core/Typography";
import "./Setting.scss";
import AlertAndNotification from "./AlertAndNotification";
import { Grid } from "@material-ui/core";
import ManageRoles from "./ManageRoles";
import SATconfiguration from "../../../components/SATconfiguration/SATconfiguration";

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

function Setting() {
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Grid xs={12} container style={{ padding: "1rem" }}>
      <AppBar position="static" className="customTab">
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label="simple tabs example"
          variant="scrollable"
          scrollButtons="auto"
        >
          <Tab label=" Manage Roles" {...a11yProps(0)} />
          <Tab label="Alert and Notification" {...a11yProps(1)} />
          <Tab label="SAT Configuration" {...a11yProps(2)} />
        </Tabs>
      </AppBar>
      <TabPanel value={value} index={1}>
        <AlertAndNotification />
      </TabPanel>
      <TabPanel value={value} index={0}>
        <ManageRoles />
        {/* <AddUser /> */}
      </TabPanel>
      <TabPanel value={value} index={2}>
        <SATconfiguration />
        {/* <div className="overlay">
          <Typography variant="h2">Coming Soon</Typography>
        </div> */}
      </TabPanel>
    </Grid>
  );
}

export default Setting;
