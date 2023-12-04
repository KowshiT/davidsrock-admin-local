import { getSavedEventsApi, saveEventApi, getSavedPostsApi, savePostApi, checkIsSavedPostApi, checkIsSavedEventApi } from "../../api/save/saveApi";

/**
 * Save Event 
 * params: values
 */
export const saveEventActionHandler = async (values: any) => {
  return await saveEventApi(values);
};

/**
 * Get Saved Events
 * params: values
 */
export const getSavedEventsActionHandler = async (values: any) => {
  return await getSavedEventsApi(values);
};

/**
 * Save Post 
 * params: values
 */
export const savePostActionHandler = async (values: any) => {
  return await savePostApi(values);
};

/**
 * Get Saved Posts
 * params: values
 */
export const getSavedPostsActionHandler = async (values: any) => {
  return await getSavedPostsApi(values);
};

/**
 * Check Post is Saved
 * params: values
 */
export const checkIsSavedPostActionHandler = async (values: any) => {
  return await checkIsSavedPostApi(values);
};

/**
 * Check Event is Saved
 * params: values
 */
export const checkIsSavedEventActionHandler = async (values: any) => {
  return await checkIsSavedEventApi(values);
};
