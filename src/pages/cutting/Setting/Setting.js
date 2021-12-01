import React from "react";
// import "./home.css";
import PropTypes from "prop-types";
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import "./Setting.scss";
// import AlertAndNotification from "./AlertAndNotification";
import { Grid } from "@material-ui/core";
import ManageRoles from "./ManageRoles";
import AddUser from "./AddUser";
// import { LayoutView } from "../layoutView/LayoutView";
import { StitchingContext } from "../../../context/StitchingContext";
// import { LayoutView } from "../layoutView/LayoutView";

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
  const { state, dispatch } = React.useContext(StitchingContext);

  const handleChange = (event, newValue) => {
    dispatch({ type: "SETTING_TAB", payload: newValue });
  };

  return (
    <Grid xs={12} md={12} item style={{ padding: "1rem" }}>
      <AppBar position="static" className="customTab">
        <Tabs
          value={state.settingTab}
          onChange={handleChange}
          aria-label="simple tabs example"
          variant="scrollable"
          scrollButtons="auto"
        >
          {/* <Tab label="Alert and Notification" {...a11yProps(0)} /> */}
          <Tab label="Manage Roles" {...a11yProps(0)} />

          {/* <Tab label=" Configurations" {...a11yProps(2)} /> */}
          {/* {getRole() == "admin" ? (
            <Tab label=" Configurations" {...a11yProps(1)} />
          ) : null} */}
        </Tabs>
      </AppBar>
      {/* <TabPanel value={state.settingTab} index={0}>
        <AlertAndNotification />
      </TabPanel> */}
      <TabPanel value={state.settingTab} index={0}>
        <Grid container item xs={12}>
          <ManageRoles />
        </Grid>
        {/* <AddUser /> */}
      </TabPanel>

      {/* <TabPanel value={state.settingTab} index={2}>
        <LayoutView path="annotate" />
      </TabPanel> */}
    </Grid>
  );
}

export default Setting;
