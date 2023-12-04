import {
  createEventApi,
  getAllEventApi,
  updateEventById,
} from "@/api/event/eventApis";
import createEventDTO from "@/models/event/createEventDTO";

/**
 * Create Event
 * params: createEventDTO
 */
export const createEventActionHandler = async (values: createEventDTO) => {
  return await createEventApi(values);
};

/**
 * Create Event
 */
export const getAllEventActionHandler = async (values: any) => {
  return await getAllEventApi(values);
};

/**
 * Update Event
 */
export const UpdateEventByIdActionHandler = async (values: any) => {
  return await updateEventById(values);
};
