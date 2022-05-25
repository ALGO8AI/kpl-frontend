import { callBackendV2 } from "../../services/http.servicev2";

export const homeDefectChartV3 = (data) => async (dispatch) => {
  try {
    const formField = {
      ...data,
      username: localStorage.getItem("kpl_username"),
    };
    const resp = await callBackendV2(
      "POST",
      "routes/checking/KPI/home/defectsPercentage",
      true,
      formField
    );
    dispatch({
      type: "SET_CHECKING_V3",
      payload: {
        key: "defectedbags",
        value: resp?.data,
      },
    });
  } catch (e) {
    console.log(e);
  }
};

export const homeRepairedChartV3 = (data) => async (dispatch) => {
  try {
    const formField = {
      ...data,
      username: localStorage.getItem("kpl_username"),
    };
    const resp = await callBackendV2(
      "POST",
      "routes/checking/KPI/home/repairedBagsPercentage",
      true,
      formField
    );
    dispatch({
      type: "SET_CHECKING_V3",
      payload: {
        key: "repairedbags",
        value: resp?.data,
      },
    });
    //   dispatch({
    //     type: "SET_CHECKING_V3",
    //     payload: {
    //       key: "repairedbags",
    //       value: [
    //         {
    //           bagcategory: "Repaired Bags",

    //           noo: 8,
    //         },

    //         {
    //           bagcategory: "Rejected Bags",

    //           noo: 12,
    //         },

    //         {
    //           bagcategory: "Okay Bags",

    //           noo: 80,
    //         },
    //       ],
    //     },
    //   });
  } catch (e) {
    console.log(e);
  }
};

export const getAllTableIdV3 = () => async (dispatch) => {
  try {
    const resp = await callBackendV2(
      "GET",
      "routes/checking/KPI/violation/allTableID"
    );
    dispatch({
      type: "SET_CHECKING_V3",
      payload: {
        key: "allTableId",
        value: resp?.data,
      },
    });
  } catch (e) {
    console.log(e);
  }
};

export const top5DefectesV3 = (data) => async (dispatch) => {
  try {
    const formField = {
      ...data,
      username: localStorage.getItem("kpl_username"),
    };
    const resp = await callBackendV2(
      "POST",
      "routes/checking/KPI/home/defectKPI",
      true,
      formField
    );
    dispatch({
      type: "SET_CHECKING_V3",
      payload: {
        key: "top5Defectes",
        value: resp?.data,
      },
    });
  } catch (e) {}
};

export const byWorkerTableV3 = (
  filterDateFrom,
  filterDateTo,
  clpctr,
  tableId,
  shifts
) => async (dispatch) => {
  try {
    const formField = {
      clpctr,
      tableId,
      filterDateFrom,
      filterDateTo,
      shifts,
      username: localStorage.getItem("kpl_username"),
    };
    const resp = await callBackendV2(
      "POST",
      "routes/checking/KPI/home/byWorker",
      true,
      formField
    );
    dispatch({
      type: "SET_CHECKING_V3",
      payload: {
        key: "byWorkerTable",
        value: resp?.detailedSummaryByWorker,
      },
    });
  } catch (e) {}
};

export const byClpCtrTableV3 = (
  filterDateFrom,
  filterDateTo,
  clpctr,
  tableId,
  shifts
) => async (dispatch) => {
  try {
    const formField = {
      clpctr,
      tableId,
      filterDateFrom,
      filterDateTo,
      shifts,
      username: localStorage.getItem("kpl_username"),
    };
    const resp = await callBackendV2(
      "POST",
      "routes/checking/KPI/home/detailedSummaryByClpCtrChecking",
      true,
      formField
    );
    dispatch({
      type: "SET_CHECKING_V3",
      payload: {
        key: "byClpCtrTable",
        value: resp?.data,
      },
    });
  } catch (e) {}
};

export const byDateTableV3 = (
  filterDateFrom,
  filterDateTo,
  clpctr,
  tableId,
  shifts
) => async (dispatch) => {
  try {
    const formField = {
      clpctr,
      tableId,
      filterDateFrom,
      filterDateTo,
      shifts,
      username: localStorage.getItem("kpl_username"),
    };
    const resp = await callBackendV2(
      "POST",
      "routes/checking/KPI/home/byDate",
      true,
      formField
    );
    dispatch({
      type: "SET_CHECKING_V3",
      payload: {
        key: "byDateTable",
        value: resp?.detailedSummaryByDate,
      },
    });
  } catch (e) {}
};

export const defectsLogsV3 = (
  filterDateFrom,
  filterDateTo,
  clpctr,
  tableId,
  shifts
) => async (dispatch) => {
  try {
    const formField = {
      clpctr,
      tableId,
      filterDateFrom,
      filterDateTo,
      shifts,
      username: localStorage.getItem("kpl_username"),
    };
    const resp = await callBackendV2(
      "POST",
      "routes/checking/KPI/violation/defectViolationData",
      true,
      formField
    );
    dispatch({
      type: "SET_CHECKING_V3",
      payload: {
        key: "defectsLogs",
        value: resp?.data,
      },
    });
  } catch (e) {}
};

export const productionLogsV3 = (
  filterDateFrom,
  filterDateTo,
  clpctr,
  tableId,
  shifts
) => async (dispatch) => {
  try {
    const formField = {
      clpctr,
      tableId,
      filterDateFrom,
      filterDateTo,
      shifts,
      username: localStorage.getItem("kpl_username"),
    };
    const resp = await callBackendV2(
      "POST",
      "routes/checking/KPI/violation/allDefectViolationData",
      true,
      formField
    );
    dispatch({
      type: "SET_CHECKING_V3",
      payload: {
        key: "productionLogs",
        value: resp?.data,
      },
    });
  } catch (e) {}
};

export const notificationLogsV3 = (filterDateFrom, filterDateTo) => async (
  dispatch
) => {
  try {
    const formField = {
      filterDateFrom,
      filterDateTo,
    };
    const resp = await callBackendV2(
      "POST",
      "routes/checking/notifLog",
      true,
      formField
    );
    dispatch({
      type: "SET_CHECKING_V3",
      payload: {
        key: "notificationLogs",
        value: resp,
      },
    });
  } catch (e) {}
};
