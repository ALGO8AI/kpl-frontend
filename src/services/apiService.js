import axios from "axios";
import { observable, action, computed } from "mobx";

export class ApiService {
  Isloading = false;
  BaseUrl = "http://3.23.114.42:3000";

  constructor() {}

  Post = async (path, data) => {
    return await axios
      .post(`${this.BaseUrl}/${path}`, data)
      .then((response) => {
        if (response.status == 200) return response.data;
      })
      .catch((err) => {
        return false;
      });
  };

  Get = async (path) => {
    return await axios
      .get(`${this.BaseUrl}/${path}`)
      .then((response) => {
        if (response.status == 200) return response.data;
      })
      .catch((err) => {
        return false;
      });
  };
}
