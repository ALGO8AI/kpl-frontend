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

function VideoWall() {
  // STATE
  const [videos, setVideos] = useState();
  // const [open, setOpen] = useState(true);

  // CUSTOM FUNCTION
  const loadData = async () => {
    try {
      const x = await videoWallChecking();
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
            <MenuItem>Line 1</MenuItem>
          </Select>
        </FormControl>
      </Grid>

      <Grid container item xs={12} sm={2}>
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
      </Grid>
      <Grid container item xs={12} sm={2}>
        <CustomButton>
          <FilterListIcon />
          Filter
        </CustomButton>
      </Grid>
      <Grid container item xs={12} sm={6}>
        <Alert>
          If Video is not available, refresh the page! To view extended video,
          Click on video.
        </Alert>
      </Grid>
      {videos ? (
        videos.map((x, index) => {
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

export default VideoWall;
