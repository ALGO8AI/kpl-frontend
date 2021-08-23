import React, { useReducer } from "react";

const initialState = {
  machineUtilization: {
    data: [],
    loading: true,
  },
  workerUtilization: {
    data: [],
    loading: true,
  },
  crowdingInstance: {
    data: [],
    loading: true,
  },
  feedUtilization: {
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
  machine: {
    data: [],
    loading: true,
  },
  violationTab: 0,
  settingTab: 0,
  workerDetails: {
    data: [],
    loading: true,
  },
  workerSchedule: {
    data: [],
    loading: true,
  },
  currentCTR: "",
  machineIDs: [],
};
const StitchingContext = React.createContext(initialState);

let reducer = (state, action) => {
  switch (action.type) {
    case "MACHINE_UTILIZATION":
      return { ...state, machineUtilization: action.payload };
    case "WORKER_UTILIZATION":
      return { ...state, workerUtilization: action.payload };
    case "CROWDING_INSTANCE":
      return { ...state, crowdingInstance: action.payload };
    case "FEED_UTILIZATION":
      return { ...state, feedUtilization: action.payload };
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
    case "SETTING_TAB": {
      return { ...state, settingTab: action.payload };
    }
    case "MACHINE_VIO": {
      return { ...state, machine: action.payload };
    }
    case "WORKER_SCHEDULE": {
      return { ...state, workerSchedule: action.payload };
    }
    case "WORKER_DETAILS": {
      return { ...state, workerDetails: action.payload };
    }
    case "MACHINE_ID": {
      return { ...state, machineIDs: action.payload };
    }
    case "CURRENT_CTR": {
      return { ...state, currentCTR: action.payload };
    }

    default:
      return;
  }
};

function StitchingProvider(props) {
  const [state, dispatch] = useReducer(reducer, initialState);
  return (
    <StitchingContext.Provider value={{ state, dispatch }}>
      {props.children}
    </StitchingContext.Provider>
  );
}
export { StitchingContext, StitchingProvider };
