const initStore = {
  homeFilterEnable: false,
  machineStatusFilter: [],
  length: 0,
};

const StitchingReducer = (state = initStore, action) => {
  switch (action.type) {
    case "ENABLE_HOME_FILTER":
      return {
        ...state,
        homeFilterEnable: true,
      };
    case "DISABLE_HOME_FILTER":
      return {
        ...state,
        homeFilterEnable: false,
      };
    case "SET_MACHINE_STATUS_FILTER":
      return {
        ...state,
        machineStatusFilter: state.machineStatusFilter.includes(action.payload)
          ? state.machineStatusFilter.filter((item) => item !== action.payload)
          : [...state.machineStatusFilter, action.payload],
        length: state.machineStatusFilter.length,
      };
    default:
      return state;
  }
};

export default StitchingReducer;
