import axios from "axios";
import { FOLLOW_API_BASE, GET_FOLLOWERS_FOLLOWING_DETAILS_API, GET_FOLLOW_DETAILS_API } from "../api_urls";
import CustomAxios from "../CustomAxios/CustomAxios";

/**
 * Follow Profile
 */
export const followProfileApi = async (values: any, profileId: any) => {
  console.log(values, "**************Follow Profile***************");
  return await CustomAxios({
    method: "POST",
    baseURL: FOLLOW_API_BASE,
    url: `api/profiles/${profileId}/follow`,
    data: values,
  })
    .then((response) => {
      console.log(response, "*************Follow Profile Response*******************");
      return response.data;
    })
    .catch((error) => {
      console.log(error);
    });
};

/**
 * Follow Partnership
 */
export const followPartnershipApi = async (values: any, partnershipId: any) => {
  console.log(values, "**************Follow Partnership***************");
  return await CustomAxios({
    method: "POST",
    baseURL: FOLLOW_API_BASE,
    url: `api/partnership/${partnershipId}/follow`,
    data: values,
  })
    .then((response) => {
      console.log(response, "*************Follow Partnership Response*******************");
      return response.data;
    })
    .catch((error) => {
      console.log(error);
    });
};

/**
 * Get Follow Details
 */
export const getFollowDetailsApi = async (values: any) => {
  console.log(values, "**************Get Follow Details***************");
  return await axios({
    method: "POST",
    baseURL: FOLLOW_API_BASE,
    url: GET_FOLLOW_DETAILS_API,
    data: values,
  })
    .then((response) => {
      console.log(response, "*************Get Follow Details Response*******************");
      return response.data;
    })
    .catch((error) => {
      console.log(error);
    });
};

/**
 * Get Followers and Following Details
 */
export const getFollowerFollowingDetailsApi = async (values: any) => {
  console.log(values, "**************Get Followers and Following Details***************");
  return await axios({
    method: "POST",
    baseURL: FOLLOW_API_BASE,
    url: GET_FOLLOWERS_FOLLOWING_DETAILS_API,
    data: values,
  })
    .then((response) => {
      console.log(response, "*************Get Followers and Following Details Response*******************");
      return response.data;
    })
    .catch((error) => {
      console.log(error);
    });
};