import axios from "axios";
import loginDTO from "../../models/auth/loginDTO";
import {
  API_BASE,
  EMAIL_VERIFICATION_API,
  FORGOT_PASSWORD_API,
  LOGIN_API,
  RESET_PASSWORD_API,
} from "../api_urls";
import forgotPasswordDTO from "@/models/auth/forgotPasswordDTO";
import resetPasswordDTO from "@/models/auth/resetPasswordDTO";
import {
  setInitialAccountName,
  setInitialUserProfilePictureToLocalStorage,
  setProfileId,
  setPublicUrlToLocalStorage,
  setUserAccountType,
  setUserNameToLocalStorage,
  setUserPublicURL,
  setUserTimeZoneToLocalStorage,
  setUserUrlToLocalStorage,
} from "@/helpers/authHelper";
import { AccountType } from "@/helpers/enumHelpers";
import { getUserTimeZone } from "@/helpers/dateHelpers";

/**
 * Login
 * params: loginDTO
 */
export const loginAccount = async (
  values: loginDTO,
  setProfilePicture: Function
) => {
  console.log(values, "**************Login request API***************");
  return await axios({
    method: "POST",
    baseURL: API_BASE,
    url: LOGIN_API,
    data: values,
  })
    .then((response) => {
      console.log(response, "*************Login response*******************");
      localStorage.setItem("REFRESHTOKEN", response.data.refresh_token);
      sessionStorage.setItem("ACCESSTOKEN", response.data.access_token);
      localStorage.setItem("userId", response.data.userId);
      setProfileId(response.data.userId);
      setUserNameToLocalStorage(response.data.fullName);
      setInitialAccountName(response.data.fullName);
      setUserAccountType(AccountType.INITIAL);
      setInitialUserProfilePictureToLocalStorage(
        response?.data?.profileImagePath
      );
      setProfilePicture(response?.data?.profileImagePath);
      setUserPublicURL(response?.data?.publicUrl);
      setPublicUrlToLocalStorage(response?.data?.publicUrl);
      setUserUrlToLocalStorage(response?.data?.publicUrl);
      let userTimeZone = getUserTimeZone();
      setUserTimeZoneToLocalStorage(userTimeZone);
      return response.data;
    })
    .catch((error) => {
      console.log(error);
      return { code: "403" };
    });
};

/**
 * Forgot Password
 * params: forgotPasswordDTO
 */
export const forgotPassword = async (values: forgotPasswordDTO) => {
  console.log(
    values,
    "**************Forgot Password request API***************"
  );
  return await axios({
    method: "PUT",
    baseURL: API_BASE,
    url: FORGOT_PASSWORD_API,
    data: values,
  })
    .then((response) => {
      console.log(
        response,
        "*************Forgot Password response*******************"
      );
      return response.data;
    })
    .catch((error) => {
      console.log(error);
      return { code: "403" };
    });
};

/**
 * Reset Password
 * params: resetPasswordDTO
 */
export const resetPassword = async (values: resetPasswordDTO) => {
  console.log(
    values,
    "**************Reset Password request API***************"
  );
  return await axios({
    method: "PUT",
    baseURL: API_BASE,
    url: RESET_PASSWORD_API,
    data: values,
  })
    .then((response) => {
      console.log(
        response,
        "*************Reset Password response*******************"
      );
      return response.data;
    })
    .catch((error) => {
      console.log(error);
    });
};

/**
 * Email Verification
 * params: verifyToken
 */
export const verifyEmail = async (verifyToken: any) => {
  console.log(
    verifyToken,
    "**************Email Verification request API***************"
  );
  return await axios({
    method: "POST",
    baseURL: API_BASE,
    url: EMAIL_VERIFICATION_API,
    data: verifyToken,
  })
    .then((response) => {
      console.log(
        response,
        "*************Email Verification response*******************"
      );
      return response.data;
    })
    .catch((error) => {
      console.log(error);
    });
};
