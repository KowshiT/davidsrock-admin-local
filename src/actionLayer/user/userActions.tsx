import {
  getUserDetailsByPublicURLApi,
  UpdateUserDetailApi,
  UpdateUserProfilePictureApi,
} from "@/api/user/userApi";

export const getUserDetailsByPublicURLActionHandler = async (
  values: string
) => {
  return await getUserDetailsByPublicURLApi(values);
};

export const UpdateUserDetailActionHandler = async (
  profileImage: any,
  coverImagePath: any,
  contactNo: any,
  interest: any
) => {
  return await UpdateUserDetailApi(
    profileImage,
    coverImagePath,
    contactNo,
    interest
  );
};

export const UpdateUserProfilePictureActionHandler = async (
  profileId: any,
  profileType: any,
  updateType: any,
  updateValue: any,
  isEvent: any
) => {
  return await UpdateUserProfilePictureApi(
    profileId,
    profileType,
    updateType,
    updateValue,
    isEvent
  );
};
