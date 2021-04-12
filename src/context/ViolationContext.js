import React, { useReducer } from "react";

const initialState = { role: "", designation: "" };
const KPLContext = React.createContext(initialState);

let reducer = (state, action) => {
  switch (action.type) {
    case "ADD_ROLE":
      console.log(action);
      return { ...state, role: action.payload };
    case "ADD_DESIGNATION":
      return { ...state, designation: action.payload };
    default:
      return;
  }
};

function KPLProvider(props) {
  const [state, dispatch] = useReducer(reducer, initialState);
  return (
    <KPLContext.Provider value={{ state, dispatch }}>
      {props.children}
    </KPLContext.Provider>
  );
}
export { KPLContext, KPLProvider };
