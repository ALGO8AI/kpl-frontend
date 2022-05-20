import { callBackendV2 } from "./http.servicev2";

export const checkingManageRoles = async (data) => {
  return await callBackendV2(
    "POST",
    "routes/admin/manageUser/getUser",
    true,
    data
  );
};
