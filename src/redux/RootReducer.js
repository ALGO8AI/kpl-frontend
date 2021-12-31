import { combineReducers } from "redux";
import CommonReducer from "./CommonReducer/CommonReducer";

const RootReducer = combineReducers({
  Common: CommonReducer,
});

export default RootReducer;
