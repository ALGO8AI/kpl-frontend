import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import CombineContext from "./context/CombineContext";
import { Provider } from "react-redux";
import { Store } from "./redux/Store";
import ErrorBoundary from "./components/ErrorBoundary/ErrorBoundary";
// import { PersistGate } from "redux-persist/integration/react";

ReactDOM.render(
  <React.StrictMode>
    <Provider store={Store}>
      {/* <PersistGate loading={null} persistor={persistor}> */}
      <CombineContext>
        <App />
      </CombineContext>
      {/* </PersistGate> */}
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);

reportWebVitals();
