import axios from "axios";

export  class ApiService {
    Isloading = false;
    BaseUrl = "http://3.23.114.42:3000";
  
 
    Post = async (path, data) => {
      return await axios.post(`${this.BaseUrl}/${path}`, data)
        .then(response => {
          if (response.status === 200)
            return response.data;
        }).catch(err => {
          console.log(err)
          return false;
        });
    }
  
  
    Get = async (path) => {
      return await axios.get(`${this.BaseUrl}/${path}`)
        .then(response => {
          if (response.status === 200)
            return response.data;
        }).catch(err => {
          console.log(err)
          return false;
        });
    }
  }
  
  
