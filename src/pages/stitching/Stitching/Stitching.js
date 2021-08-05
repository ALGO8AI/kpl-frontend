import React from "react";
import Analytics from "../Analytics/Analytics";
import Home from "../Home/Home";
import { LayoutView } from "../layoutView/LayoutView";
import { ViewDetails } from "../layoutView/viewDetails/viewDetails";
import Setting from "../setting/Setting";
import VideoWall from "../videoWall/VideoWall";
import ViolationLog from "../violationLog/ViolationLog";
import YourData from "../yourData/YourData";
import Navigation from "./Navigation";
import { Annotation } from "../layoutView/annotation/Annotation";
import ViolationDetail from "../violationDetails/ViolationDetail";
import CLPCTRDialog2 from "../../../components/clpCtrDialog/CLPCTRDialog2";
import { KPLContext } from "../../../context/ViolationContext";

function Stitching(props) {
  const { state, dispatch } = React.useContext(KPLContext);

  const pages = {
    home: <Home />,
    violationLog: <ViolationLog />,
    videoWall: <VideoWall />,
    setting: <Setting />,
    viewdetails: <ViewDetails />,
    layoutView: <LayoutView path="view" />,
    annotation: <Annotation />,
    yourData: <YourData />,
    violationDetails: <ViolationDetail id={props.match.params.id} />,
    analytics: <Analytics />,
  };

  const page = pages[props.match.params.page];
  const handleCloseCTR = () => {
    // setOpen(false);

    dispatch({
      type: "CLOSE_CTR_DIALOG",
    });
  };
  return (
    <>
      {/* <StitchingProvider> */}
      <Navigation />
      <div className="Stitching_Container">{page}</div>
      {/* <CLPCTRDialog2 open={state?.CTRDialog} handleCloseCTR={handleCloseCTR} /> */}

      {/* </StitchingProvider> */}
    </>
  );
}

export default Stitching;
