import React, { useReducer } from "react";

const initialState = {
  from: null,
  to: null,
  violationFrom: null,
  violationTo: null,
  violationTab: 0,
  defect: {
    data: [],
    loading: true,
  },
};
const CuttingContext = React.createContext(initialState);

let reducer = (state, action) => {
  switch (action.type) {
    case "FROM": {
      return { ...state, from: action.payload };
    }
    case "TO": {
      return { ...state, to: action.payload };
    }

    case "VIO_FROM": {
      return { ...state, violationFrom: action.payload };
    }
    case "VIO_TO": {
      return { ...state, violationTo: action.payload };
    }
    case "DEFECT_VIO": {
      return { ...state, defect: action.payload };
    }
    case "VIOLATION_TAB": {
      return { ...state, violationTab: action.payload };
    }

    default:
      return;
  }
};

function CuttingProvider(props) {
  const [state, dispatch] = useReducer(reducer, initialState);
  return (
    <CuttingContext.Provider value={{ state, dispatch }}>
      {props.children}
    </CuttingContext.Provider>
  );
}
export { CuttingContext, CuttingProvider };
