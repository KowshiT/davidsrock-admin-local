import { registration, sendUserInterests } from "@/api/auth/registrationApi";
import registrationDTO from "@/models/auth/registrationDTO";

/**
 * Registration
 * params: registrationDTO
*/
export const registrationActionHandler = async (values: registrationDTO) => {
  return await registration(values);
};

/**
 * Send User Interests in Registration
*/
export const sendUserInterestsActionHandler = async (values: any) => {
  return await sendUserInterests(values);
};
