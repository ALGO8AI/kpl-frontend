/* eslint-disable no-unused-vars */
import React from "react";
import PropTypes from "prop-types";
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import { Grid } from "@material-ui/core";
import Schedule from "./Schedule";
import Supervisor from "./Supervisor";
// import Tailor from "./Tailor";
import NotificationLogChecking from "../../../components/notificationLog/NotificationLogChecking";
import WorkerChecking from "./Worker";
import Worker from "../../stitching/yourData/Worker";
import Tailor from "./Tailor";
import WorkerScheduleV2 from "./WorkerScheduleV2";

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <Grid
      container
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Grid container item xs={12} style={{ padding: "18px" }}>
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

function YourData() {
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
          <Tab label="Worker Detail" {...a11yProps(0)} />
          <Tab label="Worker Schedule" {...a11yProps(1)} />
          <Tab label="Supervisor Schedule" {...a11yProps(2)} />
          <Tab label="Tailor Detail" {...a11yProps(3)} />
          <Tab label="Notification log" {...a11yProps(4)} />
          <Tab label="Worker Schedule V2" {...a11yProps(5)} />
        </Tabs>
      </AppBar>
      <TabPanel value={value} index={0}>
        <WorkerChecking />
      </TabPanel>
      <TabPanel value={value} index={1}>
        <Schedule />
      </TabPanel>
      <TabPanel value={value} index={2}>
        <Supervisor />
      </TabPanel>
      <TabPanel value={value} index={3}>
        <Tailor />
        {/* <Worker columns={["Tailor ID", "Tailor Name"]} /> */}
      </TabPanel>
      <TabPanel value={value} index={4}>
        <NotificationLogChecking />
      </TabPanel>
      <TabPanel value={value} index={5}>
        <WorkerScheduleV2 />
      </TabPanel>
    </Grid>
  );
}

export default YourData;
