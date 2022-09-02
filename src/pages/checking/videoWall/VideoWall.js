import {
  Button,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  withStyles,
} from "@material-ui/core";
import React, { useState, useEffect } from "react";
import VideoTile from "../../../components/videoTile/VideoTile";
import { videoWallChecking } from "../../../services/api.service";
import Loader from "../../../components/loader/Loader";
import FilterListIcon from "@material-ui/icons/FilterList";
import { Alert } from "@material-ui/lab";
import RefreshIcon from "@material-ui/icons/Refresh";
import PropTypes from "prop-types";
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import TableStatus from "../TableStatus/TableStatus";

const CustomButton = withStyles(() => ({
  root: {
    color: "white",
    backgroundColor: "#0e4a7b",
    border: "2px solid #0e4a7b",
    "&:hover": {
      backgroundColor: "white",
      color: "#0e4a7b",
      border: "2px solid #0e4a7b",
    },
  },
}))(Button);

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

export default function VideoWall() {
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
          <Tab label="Table Status" {...a11yProps(0)} />
          {/* <Tab label="Video Wall" {...a11yProps(1)} /> */}
        </Tabs>
      </AppBar>
      {/* <TabPanel value={value} index={1}>
        <LiveVideo />
      </TabPanel> */}
      <TabPanel value={value} index={0}>
        <TableStatus />
      </TabPanel>
    </Grid>
  );
}

function LiveVideo() {
  // STATE
  const [videos, setVideos] = useState();
  // const [open, setOpen] = useState(true);

  // CUSTOM FUNCTION
  const loadData = async () => {
    try {
      const x = await videoWallChecking();
      console.log(x);
      setVideos(x);
    } catch (err) {}
  };

  // USE EFFECT
  useEffect(() => {
    loadData();
  }, []);

  return (
    <Grid container xs={12} spacing={2} style={{ margin: "12px 0px" }}>
      <Grid container item xs={12} sm={1}>
        <FormControl variant="outlined" fullWidth>
          <InputLabel id="demo-simple-select-outlined-label">Wing</InputLabel>
          <Select
            labelId="demo-simple-select-outlined-label"
            id="demo-simple-select-outlined"
            label="Current CTR"
          >
            <MenuItem>Wing 1</MenuItem>
          </Select>
        </FormControl>
      </Grid>

      <Grid container item xs={12} sm={1}>
        <FormControl variant="outlined" fullWidth>
          <InputLabel id="demo-simple-select-outlined-label">Line</InputLabel>
          <Select
            labelId="demo-simple-select-outlined-label"
            id="demo-simple-select-outlined"
            label="Current CTR"
          >
            <MenuItem value=""></MenuItem>
            {["U+2", "Baffle", "Circular", "Two Row"].map((item, i) => (
              <MenuItem value={item} key={i}>
                {item}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Grid>

      {/* <Grid container item xs={12} sm={1}>
        <FormControl variant="outlined" fullWidth>
          <InputLabel id="demo-simple-select-outlined-label">
            Supervisor
          </InputLabel>
          <Select
            labelId="demo-simple-select-outlined-label"
            id="demo-simple-select-outlined"
            label="Current CTR"
          >
            <MenuItem>Sup 1</MenuItem>
          </Select>
        </FormControl>
      </Grid> */}
      <Grid container item xs={12} sm={2}>
        <CustomButton>
          <FilterListIcon />
          Filter
        </CustomButton>
      </Grid>
      <Grid container item xs={12} sm={5}>
        <Alert>
          If Video is not available, refresh the page! To view extended video,
          Click on video.
        </Alert>
      </Grid>
      <Grid container item xs={12} sm={2}>
        <CustomButton onClick={() => window.location.reload()}>
          <RefreshIcon />
          Refresh
        </CustomButton>
      </Grid>
      {videos?.length !== 0 ? (
        videos?.map((x, index) => {
          return (
            <VideoTile
              data={x}
              key={index}
              ctr={videos.currentCLPCTR}
              supervisor={videos.supervisor}
            />
          );
        })
      ) : (
        <Loader />
      )}
    </Grid>
  );
}
