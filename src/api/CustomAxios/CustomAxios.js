import axios from "axios";
import { API_BASE, GET_ACCESS_TOKEN_API } from "../api_urls";

const CustomAxios = axios.create({});

CustomAxios.interceptors.request.use(
  (req) => {
    req.headers["AUTHORIZATION"] = sessionStorage.getItem("ACCESSTOKEN");
    return req;
  },
  (err) => {
    return Promise.reject(err);
  }
);

CustomAxios.interceptors.response.use(
  (res) => {
    return res;
  },
  (err) => {
    const originalReq = err.config;
    const status = err.response ? err.response.status : null;
    if (status === 401) {
      return axios({
        method: "GET",
        baseURL: API_BASE,
        url: GET_ACCESS_TOKEN_API,
        headers: {
          AUTHORIZATION: localStorage.getItem("REFRESHTOKEN"),
        },
      })
        .then((response) => {
          localStorage.setItem("REFRESHTOKEN", response.data.refresh_token);
          sessionStorage.setItem("ACCESSTOKEN", response.data.access_token);
          console.log(
            response,
            "*************Get Access Token response*******************"
          );
          return CustomAxios(originalReq);
        })
        .catch((error) => {
          console.log(error);
        });
    } else if (status === 403) {
      sessionStorage.clear();
      localStorage.clear();
      window.location.replace("/auth");
    }
    return Promise.resolve(err);
  }
);

export default CustomAxios;
