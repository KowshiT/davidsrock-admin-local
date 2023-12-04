import createEventDTO from "@/models/event/createEventDTO";
import {
  API_BASE,
  CREATE_EVENT_API,
  GET_ALL_EVENT_API,
  GET_EVENT_BY_ID_API,
  UPDATE_EVENT_BY_ID_API,
} from "../api_urls";
import CustomAxios from "../CustomAxios/CustomAxios";

/**
 * Create Event
 * params: createEventDTO
 */
export const createEventApi = async (values: createEventDTO) => {
  console.log(values, "**************Create Event Request***************");
  return await CustomAxios({
    method: "POST",
    baseURL: API_BASE,
    url: CREATE_EVENT_API,
    data: values,
  })
    .then((response) => {
      console.log(
        response,
        "*************Create Event Response*******************"
      );
      return response.data;
    })
    .catch((error) => {
      console.log(error);
    });
};

/**
 * Get All Event
 */
export const getAllEventApi = async (values: any) => {
  console.log(values, "**************Get All Event Request***************");
  return await CustomAxios({
    method: "POST",
    baseURL: API_BASE,
    url: GET_ALL_EVENT_API,
    data: values,
  })
    .then((response) => {
      console.log(
        response,
        "*************Get All Event Response*******************"
      );
      return response.data;
    })
    .catch((error) => {
      console.log(error);
    });
};

/**
 * Get Event by id
 */
export const getEventByIdApi = async (eventId: any) => {
  console.log(eventId, "**************Get Event by id Request***************");
  return await CustomAxios({
    method: "GET",
    baseURL: API_BASE,
    url: `${GET_EVENT_BY_ID_API}/${eventId}`,
  })
    .then((response) => {
      console.log(
        response,
        "*************Get Event by id Response*******************"
      );
      return response.data;
    })
    .catch((error) => {
      console.log(error);
    });
};

/**
 * Update Event by id
 */

export const updateEventById = async (values: any) => {
  console.log(
    values,
    "**************Update Event by id Request***************"
  );
  return await CustomAxios({
    method: "POST",
    baseURL: API_BASE,
    url: UPDATE_EVENT_BY_ID_API,
    data: values,
  })
    .then((response) => {
      console.log(
        response,
        "*************Update Event by id Response*******************"
      );
      return response.data;
    })
    .catch((error) => {
      console.log(error);
    });
};
