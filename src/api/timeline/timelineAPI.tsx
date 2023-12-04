import { API_BASE, GET_ALL_TIMELINE_API, POST_API_BASE } from "../api_urls";
import CustomAxios from "../CustomAxios/CustomAxios";

export const getAllTimelinePostApi = async (values: any) => {
  console.log(values, "**************get all timeline post***************");
  return await CustomAxios({
    method: "POST",
    baseURL: POST_API_BASE,
    url: GET_ALL_TIMELINE_API,
    data: values,
  })
    .then((response) => {
      console.log(
        response,
        "*************get all timeline post*******************"
      );
      return response.data;
    })
    .catch((error) => {
      console.log(error);
    });
};
