/* eslint-disable no-unused-vars */
import React from "react";
import PropTypes from "prop-types";
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import { Grid } from "@material-ui/core";
import Worker from "./Worker";
import Schedule from "./Schedule";
import NotificationLog from "../../../components/notificationLog/NotificationLog";
import Supervisor from "./Supervisor";
import WorkerSchedule from "./WorkerSchedule";
import { useSelector } from "react-redux";
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
  const { role } = useSelector((state) => state.Common);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  return (
    <Grid xs={12} container style={{ padding: "1rem" }}>
      <AppBar position="static" className="customTab">
        {role === "Non User" ? (
          <Tabs
            value={value}
            onChange={handleChange}
            aria-label="simple tabs example"
            variant="scrollable"
            scrollButtons="auto"
          >
            <Tab label="Notification Log" {...a11yProps(0)} />
          </Tabs>
        ) : (
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
            <Tab label="Notification Log" {...a11yProps(3)} />
            {/* <Tab label="Worker Schedule V2" {...a11yProps(4)} /> */}
          </Tabs>
        )}
      </AppBar>
      {role === "Non User" ? (
        <>
          <TabPanel value={value} index={0}>
            <NotificationLog />
          </TabPanel>
        </>
      ) : (
        <>
          <TabPanel value={value} index={0}>
            <Worker columns={["Worker ID", "Worker Name"]} />
          </TabPanel>
          <TabPanel value={value} index={1}>
            <WorkerSchedule />
            {/* <WorkerScheduleV2 /> */}
          </TabPanel>
          <TabPanel value={value} index={2}>
            <Supervisor />
          </TabPanel>
          <TabPanel value={value} index={3}>
            <NotificationLog />
          </TabPanel>
          {/* <TabPanel value={value} index={4}>
            <WorkerSchedule />
            <WorkerScheduleV2 />
          </TabPanel> */}
        </>
      )}

      {/* <TabPanel value={value} index={4}>
        <LayoutView />
      </TabPanel> */}
    </Grid>
  );
}

export default YourData;
