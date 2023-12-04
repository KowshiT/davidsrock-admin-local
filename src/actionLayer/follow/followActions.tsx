import { followPartnershipApi, followProfileApi, getFollowDetailsApi, getFollowerFollowingDetailsApi } from "@/api/follow/followApi";

/**
 * Follow Profile
 * params: values, profileId
 */
export const followProfileActionHandler = async (values: any, profileId: any) => {
  return await followProfileApi(values, profileId);
};

/**
 * Follow Partnership
 * params: values, profileId
 */
export const followPartnershipActionHandler = async (values: any, profileId: any) => {
  return await followPartnershipApi(values, profileId);
};

/**
 * Get Follow Details
 * params: values
 */
export const getFollowDetailsActionHandler = async (values: any) => {
  return await getFollowDetailsApi(values);
};

/**
 * Get Followers and Following Details
 * params: values
 */
export const getFollowerFollowingDetailsActionHandler = async (values: any) => {
  return await getFollowerFollowingDetailsApi(values);
};