import { Grid } from "@material-ui/core";
import React from "react";
import { videoWall } from "../../services/http.service";
import ImageDialog from "../imageDialog/ImageDialog";
import "./VideoTile.scss";

function VideoTile({ data, ctr, supervisor }) {
  console.log(data, ctr, supervisor);
  const [open, setOpen] = React.useState(false);
  const [link, setLink] = React.useState("");

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const getLink = (datas) => {
    setLink(datas);
    handleClickOpen();
  };

  return (
    <>
      <ImageDialog
        open={open}
        handleClickOpen={handleClickOpen}
        handleClose={handleClose}
        link={link}
        id={data.cameraId}
        wing={data.wing}
      />
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
        <div className="Details">
          <h4>Current CTR : {ctr}</h4>
          <h5>Current Supervisor : {supervisor}</h5>
          <h6>Stream Analysis : {data?.streams}</h6>
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
        <img
          src={`${videoWall}${data.route}`}
          alt="camera feed"
          onClick={() => getLink(`${videoWall}${data.route}`)}
        />
      </Grid>
    </>
  );
}

export default VideoTile;
