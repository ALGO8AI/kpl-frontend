/* eslint-disable no-unused-vars */
import { Snackbar } from "@material-ui/core";
import { Alert } from "@material-ui/lab";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import Analytics from "../Analytics/Analytics";
// import BagID from "../BagID/BagID";
import BagID2 from "../BagID/BagID2";
import Feedback from "../feedback/Feedback";
import Home from "../Home/Home";
import HomeV3 from "../Home/HomeV3";
import LayoutView from "../layoutView/LayoutView";
import Setting from "../setting/Setting";
import VideoWall from "../videoWall/VideoWall";
import ViolationDetail from "../violationDetails/ViolationDetail";
import ViolationLog from "../violationLog/ViolationLog";
import ViolationLogV3 from "../violationLog/ViolationLogV3";
import YourData from "../yourData/YourData";
import Navigation from "./Navigation";

function Checking(props) {
  const pages = {
    home: <HomeV3 />,
    home2: <HomeV3 />,
    logs: <ViolationLogV3 />,
    videoWall: <VideoWall />,
    setting: <Setting />,
    layoutView: <LayoutView />,
    yourData: <YourData />,
    violationDetails: <ViolationDetail id={props.match.params.id} />,
    bagID: <BagID2 />,
    feedback: <Feedback />,
    analytics: <Analytics />,
    // print: <BarCodePrint />,
  };

  // selector
  const { open, status, message } = useSelector((state) => state?.Common);

  // dispatch
  const dispatch = useDispatch();

  const page = pages[props.match.params.page];
  return (
    <>
      <Navigation />
      {page}
      <Snackbar open={open} autoHideDuration={4000}>
        <Alert
          onClose={() =>
            dispatch({
              type: "CLOSE_SNACK",
            })
          }
          severity={status}
        >
          {message}
        </Alert>
      </Snackbar>
    </>
  );
}

export default Checking;
