import registrationDTO from "@/models/auth/registrationDTO";
import axios from "axios";
import { API_BASE, REGISTRATION_API, USER_INTEREST_POST_API } from "../api_urls";


/**
 * Registration
 * params: registrationDTO
*/
export const registration = async (values: registrationDTO) => {
  console.log(values, "**************Login request API***************");
  return await axios({
    method: "POST",
    baseURL: API_BASE,
    url: REGISTRATION_API,
    data: values
  })
    .then((response) => {
      console.log(response, "*************Registration response*******************");
      return response.data;

    })
    .catch((error) => {
      console.log(error);
      return { code: "403" };
    });
};

/**
 * Send User Interests in Registration
*/
export const sendUserInterests = async (values: any) => {
  console.log(values, "**************Send User Interests in Registration request API***************");
  return await axios({
    method: "POST",
    baseURL: API_BASE,
    url: USER_INTEREST_POST_API,
    data: values
  })
    .then((response) => {
      console.log(response, "*************Send User Interests in Registration response*******************");
      return response.data;
    })
    .catch((error) => {
      console.log(error);
      return { code: "403" };
    });
};
