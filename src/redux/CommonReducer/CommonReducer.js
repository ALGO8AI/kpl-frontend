const initStore = {
  open: false,
  status: "",
  message: "",
  role: "",
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
    case "ADD_ROLE":
      return {
        ...state,
        role: action.payload,
      };
    default:
      return state;
  }
};

export default CommonReducer;
