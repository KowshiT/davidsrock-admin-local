import { createPostApi, getLikeDetailsApi, getPostPublicViewDetailApi, getPostsCountInTimelineApi, getPostsInProfileApi, likePostApi } from "@/api/post/postApi";

/**
 * Create Post 
 * params: values
 */
export const createPostActionHandler = async (values: any) => {
  return await createPostApi(values);
};


/**
 * Get Posts in Profile
 * params: values
 */
export const getPostsInProfileActionHandler = async (values: any) => {
  return await getPostsInProfileApi(values);
};


/**
 * Get Posts count in timeline
 * params: values
 */
export const getPostsCountInTimelineActionHandler = async (values: any) => {
  return await getPostsCountInTimelineApi(values);
};


/**
 * Like Post 
 * params: values
 */
export const likePostActionHandler = async (values: any) => {
  return await likePostApi(values);
};

/**
 * Get Like Details
 * params: values
 */
export const getLikeDetailsActionHandler = async (values: any) => {
  return await getLikeDetailsApi(values);
};

/**
 * Get Posts Public View Details
 * params: values
 */
export const getPostPublicViewDetailActionHandler = async (values: any) => {
  return await getPostPublicViewDetailApi(values);
};