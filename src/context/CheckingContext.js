import React, { useReducer } from "react";

const initialState = {
  workerUtilization: {
    data: [],
    loading: true,
  },
  crowdingInstance: {
    data: [],
    loading: true,
  },
  from: null,
  to: null,
  homeWorkerTable: {
    data: [],
    loading: true,
  },
  homeDateTable: {
    data: [],
    loading: true,
  },
  homeMachineTable: {
    data: [],
    loading: true,
  },
  homeCTRTable: {
    data: [],
    loading: true,
  },
  violationFrom: null,
  violationTo: null,
  feed: {
    data: [],
    loading: true,
  },
  crowd: {
    data: [],
    loading: true,
  },
  worker: {
    data: [],
    loading: true,
  },
  by_worker: {
    data: [],
    loading: true,
  },
  violationTab: 0,
};
const CheckingContext = React.createContext(initialState);

let reducer = (state, action) => {
  switch (action.type) {
    case "WORKER_UTILIZATION":
      return { ...state, workerUtilization: action.payload };
    case "CROWDING_INSTANCE":
      return { ...state, crowdingInstance: action.payload };
    case "FROM": {
      return { ...state, from: action.payload };
    }
    case "TO": {
      return { ...state, to: action.payload };
    }
    case "HOME_WORKER_TABLE": {
      return { ...state, homeWorkerTable: action.payload };
    }
    case "HOME_DATE_TABLE": {
      return { ...state, homeDateTable: action.payload };
    }
    case "HOME_MACHINE_TABLE": {
      return { ...state, homeMachineTable: action.payload };
    }
    case "HOME_CTR_TABLE": {
      return { ...state, homeCTRTable: action.payload };
    }
    case "VIO_FROM": {
      return { ...state, violationFrom: action.payload };
    }
    case "VIO_TO": {
      return { ...state, violationTo: action.payload };
    }
    case "FEED_VIO": {
      return { ...state, feed: action.payload };
    }
    case "CROWD_VIO": {
      return { ...state, crowd: action.payload };
    }
    case "WORKER_VIO": {
      return { ...state, worker: action.payload };
    }
    case "BY_WORKER_VIO": {
      return { ...state, by_worker: action.payload };
    }
    case "VIOLATION_TAB": {
      return { ...state, violationTab: action.payload };
    }
    default:
      return;
  }
};

function CheckingProvider(props) {
  const [state, dispatch] = useReducer(reducer, initialState);
  return (
    <CheckingContext.Provider value={{ state, dispatch }}>
      {props.children}
    </CheckingContext.Provider>
  );
}
export { CheckingContext, CheckingProvider };
