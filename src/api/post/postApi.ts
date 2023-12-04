import { CREATE_POST_API, GET_LIKE_DETAILS_API, GET_POSTS_COUNT_IN_TIMELINE_API, GET_POSTS_IN_PROFILE_API, GET_POST_PUBLIC_VIEW_DETAILS_API, LIKE_POST_API, POST_API_BASE } from "../api_urls";
import CustomAxios from "../CustomAxios/CustomAxios";

/**
 * Create Post
 */
export const createPostApi = async (values: any) => {
  console.log(values, "**************Create Post***************");
  return await CustomAxios({
    method: "POST",
    baseURL: POST_API_BASE,
    url: CREATE_POST_API,
    data: values,
  })
    .then((response) => {
      console.log(response, "*************Create Post Response*******************");
      return response.data;
    })
    .catch((error) => {
      console.log(error);
    });
};

/**
 * Get Posts in Profile
 */
export const getPostsInProfileApi = async (values: any) => {
  console.log(values, "**************Get Posts in Profile***************");
  return await CustomAxios({
    method: "POST",
    baseURL: POST_API_BASE,
    url: GET_POSTS_IN_PROFILE_API,
    data: values,
  })
    .then((response) => {
      console.log(response, "*************Get Posts in Profile Response*******************");
      return response.data;
    })
    .catch((error) => {
      console.log(error);
    });
};

/**
 * Get Posts count in timeline
 */
export const getPostsCountInTimelineApi = async (values: any) => {
  console.log(values, "**************Get Posts count in timeline***************");
  return await CustomAxios({
    method: "POST",
    baseURL: POST_API_BASE,
    url: GET_POSTS_COUNT_IN_TIMELINE_API,
    data: values,
  })
    .then((response) => {
      console.log(response, "*************Get Posts count in timeline Response*******************");
      return response.data;
    })
    .catch((error) => {
      console.log(error);
    });
};

/**
 * Like Post
 */
export const likePostApi = async (values: any) => {
  console.log(values, "**************Like Post***************");
  return await CustomAxios({
    method: "POST",
    baseURL: POST_API_BASE,
    url: LIKE_POST_API,
    data: values,
  })
    .then((response) => {
      console.log(response, "*************Like Post Response*******************");
      return response.data;
    })
    .catch((error) => {
      console.log(error);
    });
};

/**
 * Get Like Details
 */
export const getLikeDetailsApi = async (values: any) => {
  console.log(values, "**************Get Like Details***************");
  return await CustomAxios({
    method: "POST",
    baseURL: POST_API_BASE,
    url: GET_LIKE_DETAILS_API,
    data: values,
  })
    .then((response) => {
      console.log(response, "*************Get Like Details Response*******************");
      return response.data;
    })
    .catch((error) => {
      console.log(error);
    });
};

/**
 * Get Posts Public View Details
 */
export const getPostPublicViewDetailApi = async (values: any) => {
  console.log(values, "**************Get Posts Public View Details***************");
  return await CustomAxios({
    method: "POST",
    baseURL: POST_API_BASE,
    url: GET_POST_PUBLIC_VIEW_DETAILS_API,
    data: values,
  })
    .then((response) => {
      console.log(response, "*************Get Posts Public View Details Response*******************");
      return response.data;
    })
    .catch((error) => {
      console.log(error);
    });
};