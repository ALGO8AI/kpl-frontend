const initStore = {
  open: false,
  status: "",
  message: "",
};

const CommonReducer = (state = initStore, action) => {
  switch (action.type) {
    case "OPEN_SNACK":
      return {
        ...state,
        open: true,
        status: action.payload.status,
        message: action.payload.message,
      };
    case "CLOSE_SNACK":
      return {
        ...state,
        open: false,
        status: "",
        message: "",
      };
    default:
      return state;
  }
};

export default CommonReducer;
