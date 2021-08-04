import React from "react";
import { LayoutView } from "../../stitching/layoutView/LayoutView";
import Setting from "../../stitching/setting/Setting";
import DefectDetails from "../DefectDetails/DefectDetails";
import Defects from "../DefectDetails/Defects";
// import DefectDetails fro../DefectDetails/Defectsils";
import Home from "../Home/Home";
import VideoWall from "../VideoWall/VideoWall";

// import { LayoutView } from "../layoutView/LayoutView";
// import { ViewDetails } from "../layoutView/viewDetails/viewDetails";
// import Setting from "../setting/Setting";
// import VideoWall from "../videoWall/VideoWall";
// import ViolationLog from "../violationLog/ViolationLog";
// import YourData from "../yourData/YourData";
import Navigation from "./Navigation";
// import { Annotation } from "../layoutView/annotation/Annotation";
// import ViolationDetail from "../violationDetails/ViolationDetail";

function Cutting(props) {
  const pages = {
    home: <Home />,
    defects: <Defects />,
    videoWall: <VideoWall />,
    setting: <Setting />,
    defectDetails: <DefectDetails id={props.match.params.id} />,
    layoutView: <LayoutView path="view" />,
    // annotation: <Annotation />,
    // yourData: <YourData />,
    // violationDetails: <ViolationDetail id={props.match.params.id} />,
    // analytics: <Analytics />,
  };

  const page = pages[props.match.params.page];
  return (
    <>
      {/* <StitchingProvider> */}
      <Navigation />
      <div className="Stitching_Container">{page}</div>
      {/* </StitchingProvider> */}
    </>
  );
}

export default Cutting;
