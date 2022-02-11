import {
  Button,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
} from "@material-ui/core";
import React, { useState, useEffect } from "react";
import VideoTile from "../../../components/videoTile/VideoTile";
import { videoWallStitching } from "../../../services/api.service";
import Loader from "../../../components/loader/Loader";
import FilterListIcon from "@material-ui/icons/FilterList";
import { Alert } from "@material-ui/lab";
import RefreshIcon from "@material-ui/icons/Refresh";
import { theme } from "../../../Utility/constants";

function VideoWall() {
  // STATE
  const [videos, setVideos] = useState();
  // const [open, setOpen] = useState(true);

  // CUSTOM FUNCTION
  const loadData = async () => {
    try {
      const x = await videoWallStitching();
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
      <Grid
        container
        item
        xs={12}
        style={{
          marginBottom: "12px",
        }}
      >
        {/* <Grid
          xs={12}
          lg={1}
          style={{
            paddingRight: "12px",
          }}
        >
          <FormControl variant="outlined" fullWidth>
            <InputLabel id="demo-simple-select-outlined-label">Wing</InputLabel>
            <Select label="Current CTR">
              <MenuItem>Wing 1</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        <Grid xs={12} lg={1} style={{ paddingRight: "12px" }}>
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
        </Grid> */}
        {/* <Grid xs={12} lg={1} style={{ paddingRight: "12px" }}>
          <Button
            variant="contained"
            style={{
              backgroundColor: theme.BLUE,
              color: "#FFF",
              whiteSpace: "nowrap",
              height: "100%",
            }}
            fullWidth
          >
            <FilterListIcon />
            Filter
          </Button>
        </Grid>
        <Grid xs={12} lg={1} style={{ paddingRight: "12px" }}>
          <Button
            variant="contained"
            style={{
              backgroundColor: theme.BLUE,
              color: "#FFF",
              whiteSpace: "nowrap",
              height: "100%",
            }}
            fullWidth
          >
            <RefreshIcon />
            Refresh
          </Button>
        </Grid>
        <Grid xs={12} lg={4} style={{}}></Grid> */}
        <Grid xs={12} lg={5} style={{ paddingRight: "12px" }}>
          <Alert>
            If Video is not available, refresh the page! To view extended video,
            Click on video.
          </Alert>
        </Grid>
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

      {videos ? (
        videos?.data?.map((x, index) => {
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
