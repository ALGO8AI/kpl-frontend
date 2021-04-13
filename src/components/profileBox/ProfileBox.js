import React from "react";
import { withStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import MuiDialogTitle from "@material-ui/core/DialogTitle";
import MuiDialogContent from "@material-ui/core/DialogContent";
import MuiDialogActions from "@material-ui/core/DialogActions";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";
import Typography from "@material-ui/core/Typography";
import { KPLContext } from "../../context/ViolationContext";

const styles = (theme) => ({
  root: {
    margin: 0,
    padding: theme.spacing(2),
  },
  closeButton: {
    position: "absolute",
    right: theme.spacing(1),
    top: theme.spacing(1),
    color: theme.palette.grey[500],
  },
});

const DialogTitle = withStyles(styles)((props) => {
  const { children, classes, onClose, ...other } = props;
  return (
    <MuiDialogTitle disableTypography className={classes.root} {...other}>
      <Typography variant="h6">{children}</Typography>
      {onClose ? (
        <IconButton
          aria-label="close"
          className={classes.closeButton}
          onClick={onClose}
        >
          <CloseIcon />
        </IconButton>
      ) : null}
    </MuiDialogTitle>
  );
});

const DialogContent = withStyles((theme) => ({
  root: {
    padding: theme.spacing(2),
  },
}))(MuiDialogContent);

const DialogActions = withStyles((theme) => ({
  root: {
    margin: 0,
    padding: theme.spacing(1),
  },
}))(MuiDialogActions);

export default function ProfileBox({
  openProfile,
  handleClickOpenProfile,
  handleCloseProfile,
}) {
  const { state } = React.useContext(KPLContext);

  return (
    <div>
      <Dialog
        onClose={handleCloseProfile}
        aria-labelledby="customized-dialog-title"
        open={openProfile}
      >
        <DialogTitle id="customized-dialog-title" onClose={handleCloseProfile}>
          <Typography variant="h4" style={{ color: "#f68f1d" }}>
            {state.profile.username}
          </Typography>
        </DialogTitle>
        <DialogContent dividers>
          <Typography variant="h5" style={{ color: "#f68f1d" }}>
            Worker Id{" : "}
            <span style={{ color: "#0e4a7b", fontWeight: "bold" }}>
              {state.profile.workerID}
            </span>
          </Typography>

          <Typography variant="h5" style={{ color: "#f68f1d" }}>
            Designation{" : "}
            <span style={{ color: "#0e4a7b", fontWeight: "bold" }}>
              {state.profile.designation}
            </span>
          </Typography>

          <Typography variant="h5" style={{ color: "#f68f1d" }}>
            Role{" : "}
            <span style={{ color: "#0e4a7b", fontWeight: "bold" }}>
              {state.profile.role}
            </span>
          </Typography>

          <Typography variant="h5" style={{ color: "#f68f1d" }}>
            Department{" : "}
            <span style={{ color: "#0e4a7b", fontWeight: "bold" }}>
              {state.profile.department}
            </span>
          </Typography>

          <Typography variant="h5" style={{ color: "#f68f1d" }}>
            Zone{" : "}
            <span style={{ color: "#0e4a7b", fontWeight: "bold" }}>
              {state.profile.zone}
            </span>
          </Typography>

          <Typography variant="h5" style={{ color: "#f68f1d" }}>
            Wing{" : "}
            <span style={{ color: "#0e4a7b", fontWeight: "bold" }}>
              {state.profile.wing}
            </span>
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button
            autoFocus
            onClick={handleCloseProfile}
            variant="contained"
            style={{
              backgroundColor: "#0e4a7b",
              color: "#FFF",
              whiteSpace: "nowrap",
            }}
          >
            CLOSE
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
