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
            "Rework",
          ]?.map((item, index) => (
            <Tab label={item} {...a11yProps(index)} />
          ))}
        </Tabs>
      </AppBar>
      <TabPanel value={value} index={0}>
        <Iframe
          src="http://120.120.120.147:3000/embed/dashboard/eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyZXNvdXJjZSI6eyJkYXNoYm9hcmQiOjY1fSwicGFyYW1zIjp7fSwiaWF0IjoxNjY4NDg2MDI2fQ.pq4BOqEd803PGbsuuzc8Zp6PegL0jgxsXEjvbfNSJ6M?wing=FG2&line=U%2B2&shift=A#bordered&titled"
          title="Individual"
        />
      </TabPanel>
      <TabPanel value={value} index={1}>
        <Iframe
          src="http://120.120.120.147:3000/public/dashboard/a7fdd96d-a4a2-4366-abfa-8f26d7510ffe?date=past1months"
          title="Overall"
        />
      </TabPanel>
      <TabPanel value={value} index={2}>
        <Iframe
          src="http://120.120.120.147:3000/public/dashboard/4b0dab48-2a9c-477d-9991-d72d95664793?date=past7days"
          title="Target Acheived"
        />
      </TabPanel>
      <TabPanel value={value} index={3}>
        <Iframe
          src="http://120.120.120.147:3000/embed/dashboard/eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyZXNvdXJjZSI6eyJkYXNoYm9hcmQiOjY5fSwicGFyYW1zIjp7fSwiaWF0IjoxNjY4NTEwNDQ5fQ.KF-UmS7u1t8fmilpf37q73sMiom0L2ymsLl2uBZIx6k?wing=FG2&line=U%2B2&shift=A#bordered&titled"
          title="Checker Rework"
        />
      </TabPanel>
      <TabPanel value={value} index={4}>
        <Iframe
          src="http://120.120.120.147:3000/public/dashboard/2113c900-c07f-4863-8d25-98a5a5b84603?date=past1weeks"
          title="CMS Table"
        />
      </TabPanel>
      <TabPanel value={value} index={5}>
        <Iframe
          src="http://120.120.120.147:3000/embed/dashboard/eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyZXNvdXJjZSI6eyJkYXNoYm9hcmQiOjcyfSwicGFyYW1zIjp7fSwiaWF0IjoxNjY4NTEwNTMwfQ.5_fXFsbiqI3qnwgEYznFTUs-CdvMGL-arXIKrByr0UI?wing=FG2&line=U%2B2&shift=A#bordered&titled"
          title="Late Start Early End"
        />
      </TabPanel>
      <TabPanel value={value} index={6}>
        <Iframe
          src="http://120.120.120.147:3000/embed/dashboard/eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyZXNvdXJjZSI6eyJkYXNoYm9hcmQiOjczfSwicGFyYW1zIjp7fSwiaWF0IjoxNjY4NTEwNTY0fQ.YMWcaGZWQfZn575HDhG_pWHhTdlnH8GpUuB2qzyKj1g?wing=FG2&line=U%2B2&shift=A&checker__name=Deepesh%20Shukla#bordered&titled"
          title="Checker Heartbeat"
        />
      </TabPanel>
      <TabPanel value={value} index={7}>
        <Iframe
          src="http://120.120.120.147:3000/public/dashboard/fc11c8ee-73c0-44b4-aaee-6c6e80fd4fa2?date_filter=past7days"
          title="CLP-CTR Defects"
        />
      </TabPanel>
      <TabPanel value={value} index={8}>
        <Iframe
          src="http://120.120.120.147:3000/public/dashboard/75028edb-4a16-4383-91da-f3ac7818613a?date=past1months"
          title="Checker wise Defect"
        />
      </TabPanel>
      <TabPanel value={value} index={9}>
        <Iframe
          src="http://120.120.120.147:3000/public/dashboard/be345264-7e3e-4742-afcd-69e9b6c63ffa?date=past1months"
          title="Tailor wise Defect"
        />
      </TabPanel>
      <TabPanel value={value} index={10}>
        <Iframe
          src="http://120.120.120.147:3000/public/dashboard/9b6153ac-13ce-49a2-88b1-f2fed9a4efde?date=past1months"
          title="Rework"
        />
      </TabPanel>
      {/* <TabPanel value={value} index={0}>
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
      <TabPanel value={value} index={3}>
        <Iframe
          src="http://120.120.120.147:3000/public/dashboard/9b6153ac-13ce-49a2-88b1-f2fed9a4efde"
          title="Checker Rework"
        />
      </TabPanel>
      <TabPanel value={value} index={4}>
        <Iframe
          src="http://120.120.120.147:3000/public/dashboard/2113c900-c07f-4863-8d25-98a5a5b84603"
          title="CMS Table"
        />
      </TabPanel>
      <TabPanel value={value} index={5}>
        <Iframe
          src="http://120.120.120.147:3000/public/dashboard/e55034fa-b3bb-4697-82fb-40fb563b5f46"
          title="Late Start Early End"
        />
      </TabPanel>
      <TabPanel value={value} index={6}>
        <Iframe
          src="http://120.120.120.147:3000/public/dashboard/463aa43f-ea0d-4176-a0c0-5e38420decbc"
          title="Checker Heartbeat"
        />
      </TabPanel>
      <TabPanel value={value} index={7}>
        <Iframe
          src="http://120.120.120.147:3000/public/dashboard/fc11c8ee-73c0-44b4-aaee-6c6e80fd4fa2"
          title="CLP-CTR Defects"
        />
      </TabPanel>
      <TabPanel value={value} index={8}>
        <Iframe
          src="http://120.120.120.147:3000/public/dashboard/75028edb-4a16-4383-91da-f3ac7818613a"
          title="Checker wise Defect"
        />
      </TabPanel>
      <TabPanel value={value} index={9}>
        <Iframe
          src="http://120.120.120.147:3000/public/dashboard/be345264-7e3e-4742-afcd-69e9b6c63ffa"
          title="Tailor wise Defect"
        />
      </TabPanel> */}
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
