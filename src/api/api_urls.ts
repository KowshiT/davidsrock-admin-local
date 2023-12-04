// Base API URL
export const API_BASE = process.env.NEXT_PUBLIC_DOC_API_BASE || "http://localhost:8080/davidsrock-core";
export const FOLLOW_API_BASE = process.env.NEXT_PUBLIC_DR_FOLLOW_API_BASE || "http://localhost:3000";
export const GOING_API_BASE = process.env.NEXT_PUBLIC_DR_GOING_API_BASE || "http://localhost:3000";
export const POST_API_BASE = process.env.NEXT_PUBLIC_DR_POST_API_BASE || "http://localhost:3000";
export const EVENT_SAVE_API_BASE = process.env.NEXT_PUBLIC_DR_EVENT_SAVE_API_BASE || "http://localhost:3000";

// // Base API URL
// export const FRONT_API_BASE = "https://davidsrock-uat.netlify.app/";
//---------------------------------------------login------------------------------------------------------------------

/**
 * Login URL
 */
export const LOGIN_API = "/login";

/**
 * Forgot Password
 */
export const FORGOT_PASSWORD_API = "/auth/forget-password-send-email";

/**
 * Reset Password
 */
export const RESET_PASSWORD_API = "/auth/forget-password";

/**
 * Email Verification
 */
export const EMAIL_VERIFICATION_API = "/user/user-verification";

//---------------------------------------------Authontication------------------------------------------------------------------

/**
 * Get access token
 */

export const GET_ACCESS_TOKEN_API = "/auth/token/refresh";

//---------------------------------------------Registration------------------------------------------------------------------

/**
 * Registration URL
 */
export const REGISTRATION_API = "/user/add";
export const USER_INTEREST_POST_API = "/user/update";

//---------------------------------------------Create Organization------------------------------------------------------------------

/**
 * Create Organization
 */
export const CREATE_ORGANIZATION_API = "profile/create";
export const GET_ORGANIZATION_DETAILS_API = "profile/get-by-type";
export const GET_INTEREST_ORGANIZATION_DETAILS_API =
  "profile/sort-by-interests";
export const UPLOAD_GALLERY_IMAGE_API = "gallery/v1/save";
export const GET_GALLERY_IMAGES_API = "gallery/v1/get-images-by-profile";
export const UPDATE_ORGANIZATION_DETAIL_API = "profile/edit-organization";

//---------------------------------------------Create Public Profile------------------------------------------------------------------

export const UPDATE_PUBLIC_PROFILE_DETAIL_API = "profile/edit-public-profile";

//---------------------------------------------Create Event------------------------------------------------------------------

/**
 * Create Event
 */
export const CREATE_EVENT_API = "event/v1/create";
export const GET_ALL_EVENT_API = "event/v1/get-all-by-status";
export const GET_EVENT_BY_ID_API = "event/v1/get-by-id";
export const UPDATE_EVENT_BY_ID_API = "event/v1/edit";

//---------------------------------------------Get User Details------------------------------------------------------------------

/**
 * Get User Details
 */
export const GET_USER_DETAILS_API = "user/get-by-id";
export const GET_USER_PUBLIC_DETAILS_API = "user/get-by-public-url";
export const UPDATE_USER_DETAIL_API = "user/edit";
export const UPDATE_USER_PROFILE_API = "common/v1/update-property";

//---------------------------------------------Create Partnerships------------------------------------------------------------------

/**
 * Create Partnership
 */
export const CREATE_PARTNERSHIP_API = "partnership/v1/request/create";
export const GET_ALL_PARTNERSHIP_DETAILS_API = "profile/get-by-type";
export const GET_ALL_PARTNERSHIP_PROFILES_API =
  "partnership/v1/get-partnership-eligible-profiles";
export const GET_ALL_PARTNERSHIPS = "partnership/v1/get-all-detail";
export const GET_PUBLIC_PARTNERSHIP_URL =
  "partnership/v1/request/get-by-public-url";
export const GET_ALL_PENDING_PARTNERSHIP_REQUEST =
  "partnership/v1/request/get-all";
export const ACCEPT_PARTNERSHIP_REQUEST = "partnership/v1/request/accept";
export const CANCEL_PARTNERSHIP_REQUEST = "partnership/v1/cancel-request";

//---------------------------------------------Image Upload------------------------------------------------------------------

export const IMAGE_UPLOAD_API = "aws-file/v1/upload";
export const IMAGE_GET_API = "aws-file/v1/download";

/**
 * GET Timeline
 */
export const GET_ALL_TIMELINE_API = "api/post/timeline";

//--------------------------------------------- Follow ------------------------------------------------------------------
/**
 * Get Follow Details
 */
export const GET_FOLLOW_DETAILS_API = "api/follow/get-details";

/**
 * Get Followers and Following Details
 */
export const GET_FOLLOWERS_FOLLOWING_DETAILS_API =
  "api/follow/get-details-by-type";

//--------------------------------------------- Going ------------------------------------------------------------------
/**
 * Event Going
 */
export const EVENT_GOING_API = "api/participant/submit";

/**
 * Get Event Going Count
 */
export const EVENT_GOING_COUNT_API = "api/participant/get-detail";

/**
 * Get Event Participant Details
 */
export const EVENT_PARTICIPANT_DETAIL_API =
  "api/participant/get-detail/by-event";

//--------------------------------------------- Post ------------------------------------------------------------------
/**
 * Create Post
 */
export const CREATE_POST_API = "api/post/create";

/**
 * Get Posts in Profile
 */
export const GET_POSTS_IN_PROFILE_API = "api/post/get";

/**
 * Get Posts count in timeline
 */
export const GET_POSTS_COUNT_IN_TIMELINE_API = "api/post/count";

/**
 * Get Posts Public View Details
 */
export const GET_POST_PUBLIC_VIEW_DETAILS_API = "api/post/get-details-by-public-url";

//--------------------------------------------- Save ------------------------------------------------------------------
/**
 * Save Event
 */
export const EVENT_SAVE_API = "api/save/submit";

/**
 * Get Saved Events
 */
export const GET_SAVED_EVENTS_API = "api/save-event/get-detail";

/**
 * Get Saved Posts
 */
export const GET_SAVED_POSTS_API = "api/save-post/get-detail";

/**
 * Check Post / Event is Saved
 */
export const CHECK_POST_EVENT_IS_SAVED_API = "api/save/get-detail";


//--------------------------------------------- Like ------------------------------------------------------------------
/**
 * Like Post
 */
export const LIKE_POST_API = "api/like/create";

/**
 * Get Like Details
 */
export const GET_LIKE_DETAILS_API = "api/like/get-details";
