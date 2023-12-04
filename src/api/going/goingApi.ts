import { EVENT_GOING_API, EVENT_GOING_COUNT_API, EVENT_PARTICIPANT_DETAIL_API, GOING_API_BASE } from "../api_urls";
import CustomAxios from "../CustomAxios/CustomAxios";

/**
 * Event Going
 */
export const eventGoingApi = async (values: any) => {
  console.log(values, "**************Event Going***************");
  return await CustomAxios({
    method: "POST",
    baseURL: GOING_API_BASE,
    url: EVENT_GOING_API,
    data: values,
  })
    .then((response) => {
      console.log(response, "*************Event Going Response*******************");
      return response.data;
    })
    .catch((error) => {
      console.log(error);
    });
};


/**
 * Get Event Going Count
 */
export const getEventGoingCountApi = async (values: any) => {
  console.log(values, "**************Get Event Going Count***************");
  return await CustomAxios({
    method: "POST",
    baseURL: GOING_API_BASE,
    url: EVENT_GOING_COUNT_API,
    data: values,
  })
    .then((response) => {
      console.log(response, "*************Get Event Going Count Response*******************");
      return response.data;
    })
    .catch((error) => {
      console.log(error);
    });
};

/**
 * Get Event Participant Details
 */
export const getEventParticipantDetailsApi = async (values: any) => {
  console.log(values, "**************Get Event Participant Details***************");
  return await CustomAxios({
    method: "POST",
    baseURL: GOING_API_BASE,
    url: EVENT_PARTICIPANT_DETAIL_API,
    data: values,
  })
    .then((response) => {
      console.log(response, "*************Get Event Participant Details Response*******************");
      return response.data;
    })
    .catch((error) => {
      console.log(error);
    });
};
