import { Grid } from "@material-ui/core";
import React, { useState, useEffect } from "react";
import VideoTile from "../../../components/videoTile/VideoTile";
import { videoWallStitching } from "../../../services/api.service";
import Loader from "../../../components/loader/Loader";
import { Alert } from "@material-ui/lab";

function VideoWall() {
  // STATE
  const [videos, setVideos] = useState();
  const [open, setOpen] = useState(true);

  // CUSTOM FUNCTION
  const loadData = async () => {
    try {
      const x = await videoWallStitching();
      setVideos(x);
    } catch (err) {}
  };

  // USE EFFECT
  useEffect(() => {
    loadData();
  }, []);

  return (
    <Grid container xs={12} spacing={2} style={{ margin: "12px 0px" }}>
      <Grid item xs={12}>
        <Alert severity="info">
          If Video is not available, refresh the page!
        </Alert>
      </Grid>
      {videos ? (
        videos.map((x, index) => {
          return <VideoTile data={x} key={index} />;
        })
      ) : (
        <Loader />
      )}
    </Grid>
  );
}

export default VideoWall;
