import { AppBar, Grid, Tab, Tabs } from "@material-ui/core";
import React from "react";
import PropTypes from "prop-types";

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <Grid
      spacing={2}
      container
      item
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
      style={{
        marginTop: "8px",
      }}
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

function TableDataCutting() {
  const [tabValue, setTabValue] = React.useState(0);

  const handleTabChange = (event, newValue) => {
    console.log();
    setTabValue(newValue);
  };
  return (
    <Grid container item xs={12} style={{ padding: "12px" }}>
      <AppBar position="static" className="customTab">
        <Tabs
          value={tabValue}
          onChange={handleTabChange}
          aria-label="simple tabs example"
          variant="scrollable"
          scrollButtons="auto"
        >
          <Tab label="BY ROLL" {...a11yProps(0)} />
          <Tab label="BY OPERATOR" {...a11yProps(1)} />
          <Tab label="BY MACHINE" {...a11yProps(2)} />
          <Tab label="By DATE" {...a11yProps(3)} />
        </Tabs>
      </AppBar>
    </Grid>
  );
}

export default TableDataCutting;
