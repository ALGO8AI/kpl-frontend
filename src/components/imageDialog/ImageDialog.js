import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Slide from "@material-ui/core/Slide";
import { Grid } from "@material-ui/core";
import "./ImageDialog.scss";

const useStyles = makeStyles((theme) => ({
  appBar: {
    position: "relative",
  },
  title: {
    marginLeft: theme.spacing(2),
    flex: 1,
  },
}));

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function ImageDialog({
  open,
  handleClickOpen,
  handleClose,
  link,
  id,
  wing,
}) {
  const classes = useStyles();

  return (
    <div>
      <Dialog
        fullScreen
        open={open}
        onClose={handleClose}
        TransitionComponent={Transition}
        className="Image-Dialog-Container"
      >
        <AppBar className={classes.appBar}>
          <Toolbar>
            <Typography variant="h6" className={classes.title}>
              {id}
            </Typography>
            <Button autoFocus color="inherit" onClick={handleClose}>
              CLOSE
            </Button>
          </Toolbar>
        </AppBar>

        <Grid
          container
          xs={12}
          style={{
            alignItems: "center",
            justifyContent: "center",
          }}
          className="box"
        >
          <img width="95%" src={link} alt={id} />
        </Grid>
      </Dialog>
    </div>
  );
}
