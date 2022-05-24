import { combineReducers } from "redux";
import CheckingV3Reducer from "./CheckingReducer/CheckingV3Reducer";
import CommonReducer from "./CommonReducer/CommonReducer";
import StitchingReducer from "./StitchingReducer/StitchingReducer";

const RootReducer = combineReducers({
  Common: CommonReducer,
  Stitch: StitchingReducer,
  CheckV3: CheckingV3Reducer,
});

export default RootReducer;
