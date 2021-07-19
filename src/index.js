import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import CombineContext from "./context/CombineContext";

ReactDOM.render(
  <React.StrictMode>
    <CombineContext>
      <App />
    </CombineContext>
  </React.StrictMode>,
  document.getElementById("root")
);

reportWebVitals();
