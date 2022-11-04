import { AppBar, Grid, Tab, Tabs } from "@material-ui/core";
import React, { useState } from "react";
import PropTypes from "prop-types";

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

function Analytics() {
  const [value, setValue] = useState(0);

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
          {[
            "Individual Checker Efficiency",
            "Overall Checker Efficiency",
            "Target Achieved",
            "Checker Rework",
            "CMS Table",
            "Late Start Early End",
            "Checker Heartbeat",
            "CLP-CTR Defects",
            "Checker wise Defect",
            "Tailor wise defect",
          ]?.map((item, index) => (
            <Tab label={item} {...a11yProps(index)} />
          ))}
        </Tabs>
      </AppBar>
      <TabPanel value={value} index={0}>
        <Iframe
          src="http://120.120.120.147:3000/public/dashboard/f9515c1f-6fda-4df0-8ed9-099ef944f462"
          title="Individual"
        />
      </TabPanel>
      <TabPanel value={value} index={1}>
        <Iframe
          src="http://120.120.120.147:3000/public/dashboard/a7fdd96d-a4a2-4366-abfa-8f26d7510ffe"
          title="Overall"
        />
      </TabPanel>
      <TabPanel value={value} index={2}>
        <Iframe
          src="http://120.120.120.147:3000/public/dashboard/4b0dab48-2a9c-477d-9991-d72d95664793"
          title="Target Acheived"
        />
      </TabPanel>
      <TabPanel value={value} index={7}>
        <Iframe
          src="http://120.120.120.147:3000/public/dashboard/fc11c8ee-73c0-44b4-aaee-6c6e80fd4fa2"
          title="CLP-CTR Defects"
        />
      </TabPanel>
    </Grid>
  );
}

export default Analytics;

function Iframe({ src, title }) {
  return (
    <iframe
      style={{
        width: "100%",
        height: "75vh",
      }}
      src={src}
      title={title}
    />
  );
}
