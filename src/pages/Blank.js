/* eslint-disable react-hooks/exhaustive-deps */
import React from "react";
import { useHistory } from "react-router-dom";

function Blank() {
  const history = useHistory();

  React.useEffect(() => {
    if (localStorage.getItem("KPL Auth")) {
      history.push("/menu");
    }
  }, []);
  return <></>;
}

export default Blank;
