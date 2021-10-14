import {
  Button,
  Paper,
  TextField,
  Typography,
  withStyles,
} from "@material-ui/core";
import React from "react";
import * as Styles from "./Menu.module.scss";
import logo from "../images/kpl-logo.png";
import HeadsetMicIcon from "@material-ui/icons/HeadsetMic";
import SupervisorAccountIcon from "@material-ui/icons/SupervisorAccount";
import { Link, useHistory } from "react-router-dom";
import Cutter from "../images/Cutter.svg";
import check from "../images/check.svg";
import sew from "../images/sew.svg";
import { KPLContext } from "../context/ViolationContext";

const SupportButton = withStyles(() => ({
  root: {
    color: "#0e4a7b",
    backgroundColor: "white",
    border: "2px solid #0e4a7b",
    "&:hover": {
      backgroundColor: "#0e4a7b",
      color: "white",
      border: "2px solid #0e4a7b",
    },
  },
}))(Button);

const LogoutButton = withStyles(() => ({
  root: {
    color: "white",
    backgroundColor: "#0e4a7b",
    border: "2px solid #0e4a7b",
    margin: "0 8px",
    "&:hover": {
      backgroundColor: "white",
      color: "#0e4a7b",
      border: "2px solid #0e4a7b",
    },
  },
}))(Button);

function Menu() {
  const history = useHistory();

  const { state, dispatch } = React.useContext(KPLContext);
  const logout = () => {
    dispatch({ type: "ADD_ROLE", payload: "" });
    localStorage.removeItem("ROLE");
    dispatch({
      type: "ADD_DESIGNATION",
      payload: "",
    });
    dispatch({ type: "ADD_PROFILE", payload: "" });
    localStorage.removeItem("PROFILE");
    localStorage.removeItem("DESIGNATION");
    localStorage.removeItem("KPL Auth");
    history.push("/");
  };
  return (
    <div className={Styles.MenuContainer}>
      <Paper className={Styles.top} elevation={5}>
        <div className={Styles.left}>
          <img src={logo} alt="logo" />
          <Typography variant="h3" className="ivision">
            iVISION
          </Typography>
        </div>
        <div className={Styles.right}>
          <Typography
            variant="h4"
            style={{ margin: "4px 12px", color: "#f68f1d" }}
          >
            {state.profile.username}
          </Typography>
          <SupportButton>
            <HeadsetMicIcon />
            SUPPORT
          </SupportButton>
          <LogoutButton onClick={logout}>LOGOUT</LogoutButton>
        </div>
      </Paper>
      <div className={Styles.bottom}>
        <div className={Styles.admin}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              margin: "8px",
            }}
          >
            <p>To Access the full control, Please verify the Admin Code</p>{" "}
            <SupervisorAccountIcon />
          </div>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              margin: "8px",
            }}
          >
            <TextField
              label="Admin Code"
              variant="outlined"
              name="password"
              className={Styles.text}
              style={{ marginRight: "12px" }}
            />
            <SupportButton>VERIFY</SupportButton>
          </div>
        </div>

        <div className={Styles.Links}>
          <Link className={Styles.Link} to="/cutting/defect">
            <Paper elevation={5} className={Styles.container}>
              <img src={Cutter} alt="cutter" />
              <Typography variant="h4">Cutting</Typography>
            </Paper>
          </Link>

          <Link className={Styles.Link} to="/stitching/home">
            <Paper elevation={5} className={Styles.container}>
              <img src={sew} alt="sew" />
              <Typography variant="h4">Stitching</Typography>
            </Paper>
          </Link>

          <Link className={Styles.Link} to="/checking/home">
            <Paper elevation={5} className={Styles.container}>
              <img src={check} alt="check" />
              <Typography variant="h4">Checking</Typography>
            </Paper>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Menu;
