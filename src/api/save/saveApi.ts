import { CHECK_POST_EVENT_IS_SAVED_API, EVENT_SAVE_API, EVENT_SAVE_API_BASE, GET_SAVED_EVENTS_API, GET_SAVED_POSTS_API, POST_API_BASE } from "../api_urls";
import CustomAxios from "../CustomAxios/CustomAxios";

/**
 * Save Event
 */
export const saveEventApi = async (values: any) => {
  console.log(values, "**************Save Event***************");
  return await CustomAxios({
    method: "POST",
    baseURL: EVENT_SAVE_API_BASE,
    url: EVENT_SAVE_API,
    data: values,
  })
    .then((response) => {
      console.log(response, "*************Save Event Response*******************");
      return response.data;
    })
    .catch((error) => {
      console.log(error);
    });
};

/**
 * Get Saved Events
 */
export const getSavedEventsApi = async (values: any) => {
  console.log(values, "**************Get Saved Events***************");
  return await CustomAxios({
    method: "POST",
    baseURL: EVENT_SAVE_API_BASE,
    url: GET_SAVED_EVENTS_API,
    data: values,
  })
    .then((response) => {
      console.log(response, "*************Get Saved Events Response*******************");
      return response.data;
    })
    .catch((error) => {
      console.log(error);
    });
};

/**
 * Save Post
 */
export const savePostApi = async (values: any) => {
  console.log(values, "**************Save Post***************");
  return await CustomAxios({
    method: "POST",
    baseURL: POST_API_BASE,
    url: EVENT_SAVE_API,
    data: values,
  })
    .then((response) => {
      console.log(response, "*************Save Post Response*******************");
      return response.data;
    })
    .catch((error) => {
      console.log(error);
    });
};

/**
 * Get Saved Post
 */
export const getSavedPostsApi = async (values: any) => {
  console.log(values, "**************Get Saved Posts***************");
  return await CustomAxios({
    method: "POST",
    baseURL: POST_API_BASE,
    url: GET_SAVED_POSTS_API,
    data: values,
  })
    .then((response) => {
      console.log(response, "*************Get Saved Posts Response*******************");
      return response.data;
    })
    .catch((error) => {
      console.log(error);
    });
};

/**
 * Check Post is Saved
 */
export const checkIsSavedPostApi = async (values: any) => {
  console.log(values, "**************Check Post is Saved***************");
  return await CustomAxios({
    method: "POST",
    baseURL: POST_API_BASE,
    url: CHECK_POST_EVENT_IS_SAVED_API,
    data: values,
  })
    .then((response) => {
      console.log(response, "*************Check Post is Saved Response*******************");
      return response.data;
    })
    .catch((error) => {
      console.log(error);
    });
};


/**
 * Check Event is Saved
 */
export const checkIsSavedEventApi = async (values: any) => {
  console.log(values, "**************Check Event is Saved***************");
  return await CustomAxios({
    method: "POST",
    baseURL: EVENT_SAVE_API_BASE,
    url: CHECK_POST_EVENT_IS_SAVED_API,
    data: values,
  })
    .then((response) => {
      console.log(response, "*************Check Event is Saved Response*******************");
      return response.data;
    })
    .catch((error) => {
      console.log(error);
    });
};
