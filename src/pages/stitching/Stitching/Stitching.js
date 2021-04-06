import React from "react";
import Home from "../Home/Home";
import Setting from "../setting/Setting";
import VideoWall from "../videoWall/VideoWall";
import ViolationLog from "../violationLog/ViolationLog";
import Navigation from "./Navigation";

function Stitching(props) {
  const pages = {
    home: <Home />,
    violationLog: <ViolationLog />,
    videoWall: <VideoWall />,
    setting: <Setting />,
    // layoutView: <LayoutView />,
    // settings: <Settings />,
    // videoWall: <VideoWall />,
    // yourData: <YourData />,
    // violationDetails: <ViolationDetails id={props.match?.params?.id} />,
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

export default Stitching;
