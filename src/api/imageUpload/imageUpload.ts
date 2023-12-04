import axios from "axios";
import { API_BASE, GET_ACCESS_TOKEN_API, IMAGE_GET_API, IMAGE_UPLOAD_API } from "../api_urls";
import CustomAxios from "../CustomAxios/CustomAxios";

/**
 * Get Token for image upload
 */
export const getTokenApi = async () => {
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
      return response.data;
    })
    .catch((error) => {
      console.log(error);
    });
};

/**
 * Get uploaded image
 */
export const getImageApi = async (fileId: any) => {
  console.log(fileId, "**************Get uploaded image Request***************");
  return await axios({
    method: "GET",
    baseURL: API_BASE,
    url: `${IMAGE_GET_API}/${fileId}`,
  })
    .then((response) => {
      console.log(response, "*************Get uploaded image Response*******************");
      return response.data;
    })
    .catch((error) => {
      console.log(error);
    });
};