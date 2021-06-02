import React, { useState, useEffect, useRef } from "react";
import cam from "../../../../Assets/images/cam.svg";
import { useHistory } from "react-router-dom";
import ClickAwayListener from "@material-ui/core/ClickAwayListener";
import Grow from "@material-ui/core/Grow";
import Paper from "@material-ui/core/Paper";
import Popper from "@material-ui/core/Popper";
import {
  makeStyles,
  createStyles,
  Theme,
  useTheme,
} from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Typography from "@material-ui/core/Typography";
import { observer } from "mobx-react";
import { appState } from "../LayoutStore";

const useStyles = makeStyles((theme) =>
  createStyles({
    root: {
      display: "flex",
    },
    paper: {
      marginRight: theme.spacing(2),
    },
    details: {
      display: "flex",
      flexDirection: "column",
    },
    content: {
      flex: "1 0 auto",
    },
    cover: {
      width: 151,
    },
  })
);

export const Camera = observer((props) => {
  const classes = useStyles();
  const history = useHistory();

  const [open, setOpen] = useState(false);
  const anchorRef = useRef(null);

  const { id, store } = props;

  const [videowall, setvideowall] = useState();
  const [details, setdetails] = useState(null);

  const theme = useTheme();

  useEffect(() => {
    appState.cameraDetails?.find(function(camera, index) {
      if (camera.cameraId === props.id) {
        setdetails(camera);
        setvideowall(camera.route);
      }
    });
  }, []);

  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen);
  };

  const handleClose = (event) => {
    if (anchorRef.current && anchorRef.current.contains(event.target)) {
      return;
    }

    setOpen(false);
  };

  const onViewDetails = () => {
    if (store.Role == "admin") {
      history.push(`/annotation/${details.cameraId}`);
    } else {
      history.push(`/viewdetails/${details.cameraId}`);
    }
  };

  const prevOpen = React.useRef(open);
  useEffect(() => {
    if (prevOpen.current === true && open === false) {
      anchorRef.current.focus();
    }

    prevOpen.current = open;
  }, [open]);

  return (
    <div className={classes.root}>
      <div>
        <Button
          ref={anchorRef}
          aria-controls={open ? "menu-list-grow" : undefined}
          aria-haspopup="true"
          onClick={handleToggle}
        >
          <img src={cam} alt="camera" />
        </Button>
        <Popper
          open={open}
          anchorEl={anchorRef.current}
          role={undefined}
          transition
          disablePortal
        >
          {({ TransitionProps, placement }) => (
            <Grow
              {...TransitionProps}
              style={{
                transformOrigin:
                  placement === "bottom" ? "center top" : "center bottom",
              }}
            >
              <Paper>
                <ClickAwayListener onClickAway={handleClose}>
                  <Card className={classes.root}>
                    <div className={classes.details}>
                      <CardContent className={classes.content}>
                        <Typography variant="subtitle1" color="textSecondary">
                          <span>CameraID</span> : 1234{" "}
                        </Typography>
                        <Typography variant="subtitle1" color="textSecondary">
                          <span>FeedID</span> : 1234
                        </Typography>
                        <Typography variant="subtitle1" color="textSecondary">
                          <span>Mechine ID</span> : 1234{" "}
                        </Typography>
                        <Typography variant="subtitle1" color="textSecondary">
                          <span onClick={onViewDetails}>View Details</span>
                        </Typography>
                      </CardContent>
                    </div>
                    <CardMedia
                      className={classes.cover}
                      image={`http://3.23.114.42${videowall}`}
                      title="live video"
                    />
                  </Card>
                </ClickAwayListener>
              </Paper>
            </Grow>
          )}
        </Popper>
      </div>
    </div>
  );
});
