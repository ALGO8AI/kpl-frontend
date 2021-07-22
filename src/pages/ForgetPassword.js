/* eslint-disable no-unused-vars */
import {
  Button,
  Paper,
  Snackbar,
  TextField,
  Typography,
  withStyles,
} from "@material-ui/core";
import React, { useState } from "react";
import * as Styles from "./Login.module.scss";
import logo from "../images/kpl-logo.png";
import { Alert } from "@material-ui/lab";
import { getForgetPasswordLink } from "../services/api.service";
import { Link, useHistory } from "react-router-dom";
import { KPLContext } from "../context/ViolationContext";
import Blank from "./Blank";

const ColorButton = withStyles(() => ({
  root: {
    color: "white",
    backgroundColor: "#0e4a7b",
    padding: "12px",
    "&:hover": {
      backgroundColor: "#0e4a7b",
    },
  },
}))(Button);

function ForgetPassword() {
  // Variables
  const history = useHistory();

  // states
  const [user, setUser] = useState({
    email: "",
    username: "",
  });
  const [open, setOpen] = React.useState(false);
  const [msg, setMsg] = useState("");
  const [severity, setSeverity] = useState("");

  // Snackbar close function
  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };

  const getLink = async (data) => {
    try {
      const resp = await getForgetPasswordLink(data);
      console.log(resp);
      setOpen(true);
      setMsg(resp.data.msg);
      setSeverity("success");
      setTimeout(() => {
        history.push("/");
      }, 2500);
    } catch (e) {
      console.log(e);
      setOpen(true);
      setMsg(e.message);
      setSeverity("error");
    }
  };

  return (
    <>
      <Blank />

      <div elevation={5} className={Styles.LoginContainer}>
        <Paper className={Styles.LoginBox} elevation={5}>
          <div className={Styles.left}></div>
          <div className={Styles.right}>
            <div className={Styles.logo}>
              <img src={logo} alt="logo" />
            </div>
            <div className={Styles.form}>
              <h3>Welcome to</h3>
              <h2>iVision</h2>
              <TextField
                label="Email"
                variant="outlined"
                className={Styles.text}
                onChange={(e) => setUser({ ...user, email: e.target.value })}
              />
              <TextField
                label="Username"
                variant="outlined"
                className={Styles.text}
                onChange={(e) => setUser({ ...user, username: e.target.value })}
              />
              <ColorButton
                variant="contained"
                onClick={() => {
                  getLink(user);
                }}
              >
                Get Password Reset Link
              </ColorButton>
              <Typography
                component={Link}
                to="/"
                style={{
                  margin: "12px 0",
                  textDecoration: "none",
                  color: "black",
                }}
                variant="h6"
              >
                <span style={{ fontWeight: "bold", color: "#0e4a7b" }}>
                  Sign In
                </span>
              </Typography>
            </div>
          </div>
        </Paper>
        <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
          <Alert onClose={handleClose} severity={"success"}>
            {msg}
          </Alert>
        </Snackbar>
      </div>
    </>
  );
}

export default ForgetPassword;
