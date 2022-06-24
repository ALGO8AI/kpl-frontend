import { callBackendV2 } from "../../services/http.servicev2";

export const homeDefectChartV3 = (
  filterDateFrom = new Date().toISOString().slice(0, 10),
  filterDateTo = new Date().toISOString().slice(0, 10),
  clpctr,
  tableId,
  shifts,
  line = localStorage.getItem("kpl_line")?.split(",")
) => async (dispatch) => {
  try {
    const formField = {
      clpctr,
      tableId,
      filterDateFrom,
      filterDateTo,
      shifts,
      username: localStorage.getItem("kpl_username"),
      wing: localStorage.getItem("kpl_wing"),
      line,
    };
    const resp = await callBackendV2(
      "POST",
      "routes/checking/KPI/home/defectsPercentage",
      true,
      formField
    );
    console.log("From Null Error", resp.data.length);
    resp?.data?.length &&
      dispatch({
        type: "DEFECTED_BAGS",
        payload: resp?.data,
      });
  } catch (e) {
    console.log(e);
  }
};

export const homeRepairedChartV3 = (
  filterDateFrom = new Date().toISOString().slice(0, 10),
  filterDateTo = new Date().toISOString().slice(0, 10),
  clpctr,
  tableId,
  shifts,
  line = localStorage.getItem("kpl_line")?.split(",")
) => async (dispatch) => {
  try {
    const formField = {
      clpctr,
      tableId,
      filterDateFrom,
      filterDateTo,
      shifts,
      username: localStorage.getItem("kpl_username"),
      wing: localStorage.getItem("kpl_wing"),
      line,
    };
    const resp = await callBackendV2(
      "POST",
      "routes/checking/KPI/home/repairedBagsPercentage",
      true,
      formField
    );
    resp?.data?.length &&
      dispatch({
        type: "REPAIRED_BAGS",
        payload: resp?.data,
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

export const top5DefectesV3 = (
  filterDateFrom = new Date().toISOString().slice(0, 10),
  filterDateTo = new Date().toISOString().slice(0, 10),
  clpctr,
  tableId,
  shifts,
  line = localStorage.getItem("kpl_line")?.split(",")
) => async (dispatch) => {
  try {
    const formField = {
      clpctr,
      tableId,
      filterDateFrom,
      filterDateTo,
      shifts,
      username: localStorage.getItem("kpl_username"),
      wing: localStorage.getItem("kpl_wing"),
      line,
    };
    const resp = await callBackendV2(
      "POST",
      "routes/checking/KPI/home/defectKPI",
      true,
      formField
    );
    resp?.data &&
      dispatch({
        type: "SET_CHECKING_V3",
        payload: {
          key: "top5Defectes",
          value: resp?.data,
        },
      });
  } catch (e) {}
};

export const checkerEfficiencyV3 = (
  filterDateFrom = new Date().toISOString().slice(0, 10),
  filterDateTo = new Date().toISOString().slice(0, 10),
  clpctr,
  tableId,
  shifts,
  line = localStorage.getItem("kpl_line")?.split(",")
) => async (dispatch) => {
  try {
    const formField = {
      clpctr,
      tableId,
      filterDateFrom,
      filterDateTo,
      shifts,
      username: localStorage.getItem("kpl_username"),
      wing: localStorage.getItem("kpl_wing"),
      line,
    };
    const resp = await callBackendV2(
      "POST",
      "routes/checking/KPI/home/checkerEfficiency",
      true,
      formField
    );
    console.log("checkerEfficiency error", resp.data.length);
    resp?.data?.length &&
      dispatch({
        type: "SET_CHECKING_V3",
        payload: {
          key: "checkerEfficiency",
          value: resp?.data,
        },
      });
  } catch (e) {}
};

export const top3DefectesV3 = () => async (dispatch) => {
  try {
    const resp = await callBackendV2(
      "GET",
      "routes/checking/KPI/home/mostFrequentDefects"
    );
    resp?.data &&
      dispatch({
        type: "SET_CHECKING_V3",
        payload: {
          key: "top3Defectes",
          value: resp?.data,
        },
      });
  } catch (e) {}
};

export const wingwiseSummaryV3 = () => async (dispatch) => {
  try {
    const resp = await callBackendV2(
      "GET",
      "routes/checking/KPI/home/wingWiseSummary"
    );
    resp &&
      dispatch({
        type: "WING_WISE_SUMMARY",
        payload: resp?.data,
      });
  } catch (e) {}
};

export const defectTrendV3 = () => async (dispatch) => {
  try {
    const resp = await callBackendV2(
      "GET",
      "routes/checking/KPI/home/defectsPercentageTrend"
    );
    dispatch({
      type: "SET_CHECKING_V3",
      payload: {
        key: "defectTrends",
        value: resp?.data,
      },
    });
  } catch (e) {}
};

export const byWorkerTableV3 = (
  filterDateFrom = new Date().toISOString().slice(0, 10),
  filterDateTo = new Date().toISOString().slice(0, 10),
  clpctr,
  tableId,
  shifts,
  line = localStorage.getItem("kpl_line")?.split(",")
) => async (dispatch) => {
  try {
    const formField = {
      clpctr,
      tableId,
      filterDateFrom,
      filterDateTo,
      shifts,
      username: localStorage.getItem("kpl_username"),
      wing: localStorage.getItem("kpl_wing"),
      line,
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
  filterDateFrom = new Date().toISOString().slice(0, 10),
  filterDateTo = new Date().toISOString().slice(0, 10),
  clpctr,
  tableId,
  shifts,
  line = localStorage.getItem("kpl_line")?.split(",")
) => async (dispatch) => {
  try {
    const formField = {
      clpctr,
      tableId,
      filterDateFrom,
      filterDateTo,
      shifts,
      username: localStorage.getItem("kpl_username"),
      wing: localStorage.getItem("kpl_wing"),
      line,
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
  filterDateFrom = new Date().toISOString().slice(0, 10),
  filterDateTo = new Date().toISOString().slice(0, 10),
  clpctr,
  tableId,
  shifts,
  line = localStorage.getItem("kpl_line")?.split(",")
) => async (dispatch) => {
  try {
    const formField = {
      clpctr,
      tableId,
      filterDateFrom,
      filterDateTo,
      shifts,
      username: localStorage.getItem("kpl_username"),
      wing: localStorage.getItem("kpl_wing"),
      line,
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
  filterDateFrom = new Date().toISOString().slice(0, 10),
  filterDateTo = new Date().toISOString().slice(0, 10),
  clpctr,
  tableId,
  shifts,
  line = localStorage.getItem("kpl_line")?.split(",")
) => async (dispatch) => {
  try {
    const formField = {
      clpctr,
      tableId,
      filterDateFrom,
      filterDateTo,
      shifts,
      username: localStorage.getItem("kpl_username"),
      wing: localStorage.getItem("kpl_wing"),
      line,
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

export const checkerPerformanceV3 = (
  filterDateFrom = new Date().toISOString().slice(0, 10),
  filterDateTo = new Date().toISOString().slice(0, 10),
  clpctr,
  tableId,
  shifts,
  line = localStorage.getItem("kpl_line")?.split(",")
) => async (dispatch) => {
  try {
    const formField = {
      clpctr,
      tableId,
      filterDateFrom,
      filterDateTo,
      shifts,
      username: localStorage.getItem("kpl_username"),
      wing: localStorage.getItem("kpl_wing"),
      line,
    };
    const resp = await callBackendV2(
      "POST",
      "routes/checking/KPI/home/checkerPerformance",
      true,
      formField
    );
    dispatch({
      type: "CHECKER_PERFORMANCE",
      payload: resp?.data,
    });
  } catch (e) {}
};

export const productionLogsV3 = (
  filterDateFrom = new Date().toISOString().slice(0, 10),
  filterDateTo = new Date().toISOString().slice(0, 10),
  clpctr,
  tableId,
  shifts,
  line = localStorage.getItem("kpl_line")?.split(",")
) => async (dispatch) => {
  try {
    const formField = {
      clpctr,
      tableId,
      filterDateFrom,
      filterDateTo,
      shifts,
      username: localStorage.getItem("kpl_username"),
      wing: localStorage.getItem("kpl_wing"),
      line,
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
      username: localStorage.getItem("kpl_username"),
      wing: localStorage.getItem("kpl_wing"),
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

export const workerLogsV3 = (filterDateFrom, filterDateTo) => async (
  dispatch
) => {
  try {
    const formField = {
      filterDateFrom,
      filterDateTo,
      username: localStorage.getItem("kpl_username"),
      wing: localStorage.getItem("kpl_wing"),
    };
    const resp = await callBackendV2(
      "POST",
      "routes/checking/KPI/violation/violationByWorker",
      true,
      formField
    );
    resp &&
      dispatch({
        type: "WORKER_LOG",
        payload: resp?.violationByWorkerData,
      });
  } catch (e) {}
};
