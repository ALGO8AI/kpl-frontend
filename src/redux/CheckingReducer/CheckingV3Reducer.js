const initStore = {
  repairedbags: [],
  defectedbags: [],
  top5Defectes: [],
  top3Defectes: [],
  mostFrequentDefects: [],
  defectTrends: [],
  byWorkerTable: [],
  byClpCtrTable: [],
  byDateTable: [],
  allTableId: [],
  defectsLogs: [],
  productionLogs: [],
  notificationLogs: [],
};

const CheckingV3Reducer = (state = initStore, action) => {
  switch (action.type) {
    case "SET_CHECKING_V3":
      return {
        ...state,
        [action.payload.key]: action.payload.value,
      };
    default:
      return state;
  }
};

export default CheckingV3Reducer;
