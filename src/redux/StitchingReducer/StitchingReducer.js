const initStore = {
  homeFilterEnable: false,
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
    default:
      return state;
  }
};

export default StitchingReducer;
