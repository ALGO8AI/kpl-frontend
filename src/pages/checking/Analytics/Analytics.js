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
            "Overall",
            "By clp-ctr",
            "Checker heartbeat",
            "Target achieved",
            "Checker wise defects",
            "Checker rework",
            "CMS table",
            "Tailor wise defects",
            "Late start Early end",
            "Individual checker efficiency",
          ]?.map((item, index) => (
            <Tab label={item} {...a11yProps(index)} />
          ))}
        </Tabs>
      </AppBar>
      {[
        {
          title: "Overall",
          src:
            "http://120.120.120.147:3000/embed/dashboard/eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyZXNvdXJjZSI6eyJkYXNoYm9hcmQiOjY2fSwicGFyYW1zIjp7fX0.tQu3HIIgkmHGOg6PutO5ZV-A0N-KOVG8PlLBgZlV79o#bordered=true&titled=true",
        },
        {
          title: "By clp-ctr",
          src:
            "http://120.120.120.147:3000/embed/dashboard/eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyZXNvdXJjZSI6eyJkYXNoYm9hcmQiOjY4fSwicGFyYW1zIjp7fX0.y7yOgTquvI0Lyi_4PTqhuIKsdg3FKm8EQYOTY6L0F_8#bordered=true&titled=true",
        },
        {
          title: "Checker heartbeat",
          src:
            "http://120.120.120.147:3000/embed/dashboard/eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyZXNvdXJjZSI6eyJkYXNoYm9hcmQiOjczfSwicGFyYW1zIjp7fX0.PR1ub8WNyPWuTmjW011GPcvW1Dip3HGVFn3sJtMYkuE#bordered=true&titled=true",
        },
        {
          title: "Target achieved",
          src:
            "http://120.120.120.147:3000/embed/dashboard/eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyZXNvdXJjZSI6eyJkYXNoYm9hcmQiOjY3fSwicGFyYW1zIjp7fX0.KNBRYalrx2LMSn90K2bXIc-57dExwvsEVKq9JL6S7oY#bordered=true&titled=true",
        },
        {
          title: "Checker wise defects",
          src:
            "http://120.120.120.147:3000/embed/dashboard/eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyZXNvdXJjZSI6eyJkYXNoYm9hcmQiOjcwfSwicGFyYW1zIjp7fX0.yoZoO6mTTZtuzLCffH0qwKK52lYVtYKWRRgSm5fePK0#bordered=true&titled=true",
        },
        {
          title: "Checker rework",
          src:
            "http://120.120.120.147:3000/embed/dashboard/eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyZXNvdXJjZSI6eyJkYXNoYm9hcmQiOjY5fSwicGFyYW1zIjp7fX0.VpnaueozPJkd45C4noBZw-zEfQAd8OlgmMoru7_5ybs#bordered=true&titled=true",
        },
        {
          title: "CMS table",
          src:
            "http://120.120.120.147:3000/embed/dashboard/eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyZXNvdXJjZSI6eyJkYXNoYm9hcmQiOjc0fSwicGFyYW1zIjp7fX0.0QCcogCr0aZye-Aa5UclrEXp4g1BadcIVd92NDNaI8w#bordered=true&titled=true",
        },
        {
          title: "Tailor wise defects",
          src:
            "http://120.120.120.147:3000/embed/dashboard/eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyZXNvdXJjZSI6eyJkYXNoYm9hcmQiOjcxfSwicGFyYW1zIjp7fX0.T9UR18f4_I7hznjVgvzpKbKt4O0MqgPggkXtOKIO5HE#bordered=true&titled=true",
        },
        {
          title: "Late start and early end",
          src:
            "http://120.120.120.147:3000/embed/dashboard/eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyZXNvdXJjZSI6eyJkYXNoYm9hcmQiOjcyfSwicGFyYW1zIjp7fX0.qDYw20-5MsWgvI4r9D-cvOwaMp3xpZxVdZlOhzlGwuM#bordered=true&titled=true",
        },
        {
          title: "Individual checker eficiency",
          src:
            "http://120.120.120.147:3000/embed/dashboard/eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyZXNvdXJjZSI6eyJkYXNoYm9hcmQiOjY1fSwicGFyYW1zIjp7fX0.AZGTD-Wu3wpQ9F06HtPIfSeVVWA8W4apnvB0ToIAepw#bordered=true&titled=true",
        },
      ].map((item, index) => (
        <TabPanel value={value} index={index}>
          <Iframe src={item.src} title={item.title} />
        </TabPanel>
      ))}

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
