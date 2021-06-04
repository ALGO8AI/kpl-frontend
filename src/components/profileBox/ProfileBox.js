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
import "./ProfileBox.scss";
import {
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@material-ui/core";
import CreateIcon from "@material-ui/icons/Create";

export default function ProfileBox({
  openProfile,
  handleClickOpenProfile,
  handleCloseProfile,
}) {
  const { state } = React.useContext(KPLContext);

  const [data, setData] = React.useState({
    username: "",
    userID: "",
    designation: "",
    role: "",
    department: "",
    wing: "",
    zone: "",
  });
  const [edit, setEdit] = React.useState(false);
  const [editPassword, setEditPassword] = React.useState(false);
  const [profiePhoto, setProfilePhoto] = React.useState("");
  const uploadImage = async (e) => {
    const file = e.target.files[0];
    const base64 = await convertBase64(file);
    setProfilePhoto(base64);
  };

  const convertBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const fileReader = new FileReader();
      file && fileReader.readAsDataURL(file);

      fileReader.onload = () => {
        resolve(fileReader.result);
      };

      fileReader.onerror = (error) => {
        reject(error);
      };
    });
  };

  return (
    <div>
      <Dialog
        onClose={handleCloseProfile}
        aria-labelledby="customized-dialog-title"
        open={openProfile}
        className="Profile-container"
      >
        <Grid container className="box">
          <Grid container item className="left">
            <div className="section-1">
              <div className="img-box">
                {profiePhoto && <img src={profiePhoto} alt="profile" />}
                <label>
                  <input
                    type="file"
                    accept=".jpg,.png,.jpeg"
                    onChange={(e) => {
                      uploadImage(e);
                    }}
                  />
                  <span
                    class="label"
                    style={{
                      border: "none !important",
                      outlone: "none",
                      color: "rgb(246, 143, 29)",
                    }}
                  >
                    <CreateIcon />
                  </span>
                </label>
              </div>

              <Typography
                variant="h4"
                style={{ textAlign: "center", color: "#0e4a7b" }}
              >
                {state.profile.username}
              </Typography>
              <Button
                autoFocus
                variant="contained"
                style={{
                  backgroundColor: "#0e4a7b",
                  color: "#FFF",
                  whiteSpace: "nowrap",
                  margin: "auto",
                }}
                onClick={() => {
                  setData({
                    ...data,
                    username: state.profile.username,
                    userID: state.profile.workerID,
                    designation: state.profile.designation,
                    role: state.profile.role,
                    department: state.profile.department,
                    wing: state.profile.wing,
                    zone: state.profile.zone,
                  });
                  setEdit(true);
                }}
              >
                Edit Profile
              </Button>
            </div>
            <div className="section-2">
              <Typography variant="h5" style={{ color: "#0e4a7b" }}>
                About
              </Typography>
              <div className="bar"></div>
              <div className="row">
                <span style={{ color: "#0e4a7b", width: "10%" }}>
                  <i class="fa fa-user" aria-hidden="true"></i>
                </span>
                <Typography
                  variant="h6"
                  style={{ color: "#0e4a7b", width: "60%" }}
                >
                  User Id
                </Typography>

                <Typography variant="h6" style={{ color: "#f68f1d" }}>
                  {state.profile.workerID}
                </Typography>
              </div>

              <div className="row">
                <span style={{ color: "#0e4a7b", width: "10%" }}>
                  <i class="fa fa-briefcase" aria-hidden="true"></i>
                </span>
                <Typography
                  variant="h6"
                  style={{ color: "#0e4a7b", width: "60%" }}
                >
                  Designation
                </Typography>

                <Typography variant="h6" style={{ color: "#f68f1d" }}>
                  {state.profile.designation}
                </Typography>
              </div>

              <div className="row">
                <span style={{ color: "#0e4a7b", width: "10%" }}>
                  <i class="fa fa-black-tie" aria-hidden="true"></i>
                </span>
                <Typography
                  variant="h6"
                  style={{ color: "#0e4a7b", width: "60%" }}
                >
                  Role
                </Typography>

                <Typography variant="h6" style={{ color: "#f68f1d" }}>
                  {state.profile.role}
                </Typography>
              </div>

              <div className="row">
                <span style={{ color: "#0e4a7b", width: "10%" }}>
                  <i class="fa fa-building" aria-hidden="true"></i>
                </span>
                <Typography
                  variant="h6"
                  style={{ color: "#0e4a7b", width: "60%" }}
                >
                  Department
                </Typography>

                <Typography
                  variant="h6"
                  style={{ color: "#f68f1d", whiteSpace: "nowrap" }}
                >
                  {state.profile.department}
                </Typography>
              </div>

              <div className="row">
                <span style={{ color: "#0e4a7b", width: "10%" }}>
                  <i class="fa fa-window-restore" aria-hidden="true"></i>
                </span>
                <Typography
                  variant="h6"
                  style={{ color: "#0e4a7b", width: "60%" }}
                >
                  Wing
                </Typography>

                <Typography variant="h6" style={{ color: "#f68f1d" }}>
                  {state.profile.wing}
                </Typography>
              </div>

              <div className="row">
                <span style={{ color: "#0e4a7b", width: "10%" }}>
                  <i class="fa fa-map-marker" aria-hidden="true"></i>
                </span>
                <Typography
                  variant="h6"
                  style={{ color: "#0e4a7b", width: "60%" }}
                >
                  Zone
                </Typography>

                <Typography variant="h6" style={{ color: "#f68f1d" }}>
                  {state.profile.zone}
                </Typography>
              </div>
            </div>
            <div className="section-2">
              <Typography variant="h5" style={{ color: "#0e4a7b" }}>
                Contacts
              </Typography>
              <div className="bar"></div>
              <div className="row">
                <span style={{ color: "#0e4a7b", width: "10%" }}>
                  <i class="fa fa-envelope" aria-hidden="true"></i>
                </span>
                <Typography
                  variant="h6"
                  style={{ color: "#0e4a7b", width: "60%" }}
                >
                  Email
                </Typography>

                <Typography variant="h6" style={{ color: "#f68f1d" }}>
                  Unavailable
                </Typography>
              </div>

              <div className="row">
                <span style={{ color: "#0e4a7b", width: "10%" }}>
                  <i class="fa fa-phone-square" aria-hidden="true"></i>
                </span>
                <Typography
                  variant="h6"
                  style={{ color: "#0e4a7b", width: "60%" }}
                >
                  Phone
                </Typography>

                <Typography variant="h6" style={{ color: "#f68f1d" }}>
                  Unavailable
                </Typography>
              </div>
            </div>
          </Grid>
          {edit ? (
            <Grid container item className="right" spacing={2}>
              <Grid
                container
                item
                md={6}
                spacing={2}
                style={{ padding: "0 1rem", display: "block" }}
              >
                <Typography
                  variant="h5"
                  style={{ color: "#0e4a7b", marginBottom: "8px" }}
                >
                  About
                </Typography>
                <TextField
                  variant="outlined"
                  fullWidth
                  value={data.username}
                  onChange={(e) =>
                    setData({ ...data, username: e.target.value })
                  }
                  label="Username"
                  style={{ marginBottom: "8px" }}
                />

                <TextField
                  variant="outlined"
                  fullWidth
                  value={data.userID}
                  onChange={(e) => setData({ ...data, userID: e.target.value })}
                  label="User ID"
                  disabled
                  style={{ marginBottom: "8px" }}
                />
                <TextField
                  variant="outlined"
                  fullWidth
                  value={data.designation}
                  onChange={(e) =>
                    setData({ ...data, designation: e.target.value })
                  }
                  style={{ marginBottom: "8px" }}
                  label="Designation"
                />
                <TextField
                  variant="outlined"
                  fullWidth
                  value={data.role}
                  onChange={(e) => setData({ ...data, role: e.target.value })}
                  style={{ marginBottom: "8px" }}
                  label="Role"
                />

                <TextField
                  variant="outlined"
                  fullWidth
                  value={data.department}
                  onChange={(e) =>
                    setData({ ...data, department: e.target.value })
                  }
                  style={{ marginBottom: "8px" }}
                  label="Department"
                />
                <TextField
                  variant="outlined"
                  fullWidth
                  value={data.wing}
                  onChange={(e) => setData({ ...data, wing: e.target.value })}
                  style={{ marginBottom: "8px" }}
                  label="Wing"
                />
                <TextField
                  variant="outlined"
                  fullWidth
                  value={data.zone}
                  onChange={(e) => setData({ ...data, zone: e.target.value })}
                  style={{ marginBottom: "8px" }}
                  label="Zone"
                />
              </Grid>
              <Grid
                container
                item
                md={6}
                spacing={2}
                style={{ padding: "0 1rem", display: "block" }}
              >
                <Typography
                  variant="h5"
                  style={{ color: "#0e4a7b", marginBottom: "8px" }}
                >
                  Contact
                </Typography>
                <TextField
                  variant="outlined"
                  fullWidth
                  // value={CTR.line}
                  // onChange={(e) => setCTR({ ...CTR, line: e.target.value })}
                  label="Phone Number"
                  style={{ marginBottom: "8px" }}
                  type="number"
                />

                <TextField
                  variant="outlined"
                  fullWidth
                  // value={CTR.line}
                  // onChange={(e) => setCTR({ ...CTR, line: e.target.value })}
                  style={{ marginBottom: "8px" }}
                  label="Email ID"
                />

                <Typography
                  variant="body1"
                  style={{
                    color: "#0e4a7b",
                    cursor: "pointer",
                    textAlign: "end",
                  }}
                  onClick={() => setEditPassword(!editPassword)}
                >
                  Reset Password
                </Typography>
                {editPassword ? (
                  <>
                    <TextField
                      variant="outlined"
                      fullWidth
                      // value={CTR.line}
                      // onChange={(e) => setCTR({ ...CTR, line: e.target.value })}
                      style={{ marginBottom: "8px" }}
                      label="Current Password"
                    />
                    <TextField
                      variant="outlined"
                      fullWidth
                      // value={CTR.line}
                      // onChange={(e) => setCTR({ ...CTR, line: e.target.value })}
                      style={{ marginBottom: "8px" }}
                      label="New Password"
                    />
                    <TextField
                      variant="outlined"
                      fullWidth
                      // value={CTR.line}
                      // onChange={(e) => setCTR({ ...CTR, line: e.target.value })}
                      style={{ marginBottom: "8px" }}
                      label="Confirm Password"
                    />
                  </>
                ) : null}
                <Grid container item md={12} spacing={4}>
                  <Grid container item md={6}>
                    <Button
                      autoFocus
                      onClick={() => {
                        setData({
                          ...data,
                          username: "",
                          userID: "",
                          designation: "",
                          role: "",
                          department: "",
                          wing: "",
                          zone: "",
                        });
                        setEdit(false);
                      }}
                      variant="contained"
                      style={{
                        backgroundColor: "white",
                        color: "red",
                        whiteSpace: "nowrap",
                        width: "100%",
                        border: "1px solid red",
                        height: "fit-content",
                      }}
                    >
                      CLOSE
                    </Button>
                  </Grid>
                  <Grid container item md={6}>
                    <Button
                      autoFocus
                      onClick={handleCloseProfile}
                      variant="contained"
                      style={{
                        backgroundColor: "#0e4a7b",
                        color: "#FFF",
                        whiteSpace: "nowrap",
                        width: "100%",
                        height: "fit-content",
                        border: "1px solid #0e4a7b",
                      }}
                    >
                      SAVE
                    </Button>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          ) : null}
        </Grid>
        {/* <DialogTitle id="customized-dialog-title" onClose={handleCloseProfile}>
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
        </DialogActions> */}
      </Dialog>
    </div>
  );
}
