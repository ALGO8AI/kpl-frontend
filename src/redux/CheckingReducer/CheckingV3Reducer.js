const initStore = {
  repairedbags: [],
  defectedbags: [],
  top5Defectes: [],
  top3Defectes: [],
  mostFrequentDefects: [],
  defectTrends: [],
  byWorkerTable: [],
  checkerEfficiency: [],
  byClpCtrTable: [],
  byDateTable: [],
  allTableId: [],
  defectsLogs: [],
  productionLogs: [],
  notificationLogs: [],
  checkerPerformance: [],
  wingWiseSummary: [],
  workerLog: [],
  wingList: [],
  selectedWing: "",
  currentCTR: "",
  tailorSummary: [],
  checkerAvailability: [],
};

const CheckingV3Reducer = (state = initStore, action) => {
  switch (action.type) {
    case "SET_CHECKING_V3":
      return {
        ...state,
        [action.payload.key]: action.payload.value,
      };
    case "CHECKER_PERFORMANCE":
      return {
        ...state,
        checkerPerformance: action.payload,
      };
    case "REPAIRED_BAGS":
      return {
        ...state,
        repairedbags: action.payload,
      };
    case "DEFECTED_BAGS":
      return {
        ...state,
        defectedbags: action.payload,
      };
    case "WING_WISE_SUMMARY":
      return {
        ...state,
        wingWiseSummary: action.payload,
      };
    case "WORKER_LOG":
      return {
        ...state,
        workerLog: action.payload,
      };
    case "SET_WING_LIST": {
      return {
        ...state,
        wingList: action.payload,
      };
    }
    case "SET_SELECTED_WING":
      return {
        ...state,
        selectedWing: action.payload,
      };
    case "SET_CURRENT_CTR":
      return {
        ...state,
        currentCTR: action.payload,
      };
    case "SET_TAILOR_SUMMARY":
      return {
        ...state,
        tailorSummary: action.payload,
      };
    case "SET_CHECKER_AVAIL":
      return {
        ...state,
        checkerAvailability: action.payload,
      };
    default:
      return state;
  }
};

export default CheckingV3Reducer;
