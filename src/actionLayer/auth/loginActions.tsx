import {
  forgotPassword,
  loginAccount,
  resetPassword,
  verifyEmail,
} from "../../api/auth/loginApi";
import loginDTO from "../../models/auth/loginDTO";
import forgotPasswordDTO from "@/models/auth/forgotPasswordDTO";
import resetPasswordDTO from "@/models/auth/resetPasswordDTO";

/**
 * Login
 * params: loginDTO
 */
export const loginActionHandler = async (
  values: loginDTO,
  setProfilePicture: Function
) => {
  return await loginAccount(values, setProfilePicture);
};

/**
 * Forgot Password
 * params: forgotPasswordDTO
 */
export const forgotPasswordActionHandler = async (
  values: forgotPasswordDTO
) => {
  return await forgotPassword(values);
};

/**
 * Reset Password
 * params: resetPasswordDTO
 */
export const resetPasswordActionHandler = async (values: resetPasswordDTO) => {
  return await resetPassword(values);
};

/**
 * Email Verification
 * params: verifyToken
 */
export const verifyEmailActionHandler = async (verifyToken: any) => {
  return await verifyEmail(verifyToken);
};
