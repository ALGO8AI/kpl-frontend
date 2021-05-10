import React, { useReducer } from "react";

const initialState = {
  role: "",
  designation: "",
  profile: "",
  violation: "",
  status: "",
};
const KPLContext = React.createContext(initialState);

let reducer = (state, action) => {
  switch (action.type) {
    case "ADD_ROLE":
      console.log(action);
      return { ...state, role: action.payload };
    case "ADD_DESIGNATION":
      return { ...state, designation: action.payload };
    case "ADD_PROFILE":
      return { ...state, profile: action.payload };
    case "ADD-VIOLATION-STATUS":
      return {
        ...state,
        violation: action.payload.violation,
        status: action.payload.status,
      };
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
