import React from "react";
import CircularProgress from "@material-ui/core/CircularProgress";

export default function Loader({ style }) {
  return <CircularProgress style={{ ...style }} size={18} />;
}
