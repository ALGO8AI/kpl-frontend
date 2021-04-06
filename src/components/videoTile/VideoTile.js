import { Grid } from "@material-ui/core";
import React from "react";
import { videoWall } from "../../services/http.service";
import "./VideoTile.scss";

function VideoTile({ data }) {
  return (
    <Grid
      component="Paper"
      elevation={5}
      item
      container
      xs={12}
      sm={6}
      md={6}
      lg={3}
      className="videobox"
    >
      <div className="live">
        <p>LIVE</p>
      </div>
      <div className="videoTitle" style={{ width: "100%" }}>
        <Grid container>
          <Grid item xs={6}>
            Camera ID:{data.cameraId}
          </Grid>
          <Grid item xs={6}>
            Wing:{data.wing}
          </Grid>
        </Grid>
      </div>
      <img src={`${videoWall}${data.route}`} alt="camera feed" />
    </Grid>
  );
}

export default VideoTile;
