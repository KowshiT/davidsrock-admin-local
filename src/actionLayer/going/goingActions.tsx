import { eventGoingApi, getEventGoingCountApi, getEventParticipantDetailsApi } from "@/api/going/goingApi";

/**
 * Event Going
 * params: values
 */
export const eventGoingActionHandler = async (values: any) => {
  return await eventGoingApi(values);
};

/**
 * Get Event Going Count
 * params: values
 */
export const getEventGoingCountActionHandler = async (values: any) => {
  return await getEventGoingCountApi(values);
};

/**
 * Get Event Participant Details
 * params: values
 */
export const getEventParticipantDetailsActionHandler = async (values: any) => {
  return await getEventParticipantDetailsApi(values);
};