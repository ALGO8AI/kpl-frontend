import { combineReducers } from "redux";
import CommonReducer from "./CommonReducer/CommonReducer";
import StitchingReducer from "./StitchingReducer/StitchingReducer";

const RootReducer = combineReducers({
  Common: CommonReducer,
  Stitch: StitchingReducer,
});

export default RootReducer;
