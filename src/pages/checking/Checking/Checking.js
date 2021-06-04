import React from "react";
import BagID from "../BagID/BagID";
import BarCodePrint from "../BagID/BarCodePrint";
import Feedback from "../feedback/Feedback";
import Home from "../Home/Home";
import LayoutView from "../layoutView/LayoutView";
import Setting from "../setting/Setting";
import VideoWall from "../videoWall/VideoWall";
import ViolationDetails from "../violationDetails/ViolationDetails";
import ViolationLog from "../violationLog/ViolationLog";
import YourData from "../yourData/YourData";
import Navigation from "./Navigation";

function Checking(props) {
  const pages = {
    home: <Home />,
    violationLog: <ViolationLog />,
    videoWall: <VideoWall />,
    setting: <Setting />,
    layoutView: <LayoutView />,
    yourData: <YourData />,
    violationDetails: <ViolationDetails id={props.match.params.id} />,
    bagID: <BagID />,
    feedback: <Feedback />,
    // print: <BarCodePrint />,
  };

  const logout = () => {
    localStorage.removeItem("isAuth");
    // history.push("/login");
  };
  const page = pages[props.match.params.page];
  return (
    <>
      <Navigation />
      {page}
    </>
  );
}

export default Checking;
