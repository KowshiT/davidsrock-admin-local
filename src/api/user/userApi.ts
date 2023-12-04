import { getUserIdFromStorage } from "@/helpers/authHelper";
import {
  API_BASE,
  GET_USER_DETAILS_API,
  GET_USER_PUBLIC_DETAILS_API,
  UPDATE_USER_DETAIL_API,
  UPDATE_USER_PROFILE_API,
} from "../api_urls";
import CustomAxios from "../CustomAxios/CustomAxios";

/**
 * Get User Details
 */
export const getUserDetailsByIdApi = async (userId: any) => {
  console.log(
    userId,
    "**************Get User Details By Id Request***************"
  );
  return await CustomAxios({
    method: "GET",
    baseURL: API_BASE,
    url: `${GET_USER_DETAILS_API}/${userId}`,
  })
    .then((response) => {
      console.log(
        response,
        "*************Get User Details By Id response*******************"
      );
      return response.data;
    })
    .catch((error) => {
      console.log(error);
    });
};

export const getUserDetailsByPublicURLApi = async (publicURL: any) => {
  console.log(
    publicURL,
    "**************Get User Details By publicURL Request***************"
  );
  return await CustomAxios({
    method: "POST",
    baseURL: API_BASE,
    url: `${GET_USER_PUBLIC_DETAILS_API}?publicUrl=${publicURL}`,
  })
    .then((response) => {
      console.log(
        response,
        "*************Get User Details By publicURL response*******************"
      );
      return response.data;
    })
    .catch((error) => {
      console.log(error);
    });
};

export const UpdateUserDetailApi = async (
  profileImage: any,
  coverImagePath: any,
  contactNo: any,
  interest: any
) => {
  const payload = {
    userId: getUserIdFromStorage(),
    profileImagePath: profileImage,
    coverImagePath: coverImagePath,
    contactNo: contactNo,
    interest: interest,
  };

  console.log(
    payload,
    "**************Update User Detail Request***************"
  );
  return await CustomAxios({
    method: "POST",
    baseURL: API_BASE,
    url: UPDATE_USER_DETAIL_API,
    data: payload,
  })
    .then((response) => {
      console.log(
        response,
        "*************Update User Detail Request response*******************"
      );
      return response.data;
    })
    .catch((error) => {
      console.log(error);
    });
};

export const UpdateUserProfilePictureApi = async (
  profileId: any,
  profileType: any,
  updateType: any,
  updateValue: any,
  isEvent: any
) => {
  const payload = {
    profileId: profileId,
    profileType: profileType,
    updateType: updateType,
    updateValue: updateValue,
    isEvent: isEvent,
  };

  console.log(
    payload,
    "**************Update User Profile Pic Request***************"
  );
  return await CustomAxios({
    method: "POST",
    baseURL: API_BASE,
    url: UPDATE_USER_PROFILE_API,
    data: payload,
  })
    .then((response) => {
      console.log(
        response,
        "*************Update User Profile Pic Request response*******************"
      );
      return response.data;
    })
    .catch((error) => {
      console.log(error);
    });
};
