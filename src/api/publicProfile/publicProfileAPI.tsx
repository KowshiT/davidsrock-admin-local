import { getProfileId } from "@/helpers/authHelper";
import { API_BASE, UPDATE_PUBLIC_PROFILE_DETAIL_API } from "../api_urls";
import CustomAxios from "../CustomAxios/CustomAxios";

export const UpdatePublicProfileDetailApi = async (
  networkRequests: any,
  publicProfileRequest: any,
  otherValues: any
) => {
  const payload = {
    profileId: getProfileId(),

    networkRequests: networkRequests,
    publicProfileRequest: publicProfileRequest,
    description: otherValues.description,
    mobile: otherValues.mobile,
    location: otherValues.location,
    tagLine: otherValues.tagLine,
  };

  console.log(
    payload,
    "**************Update Public Profile Detail Request***************"
  );
  return await CustomAxios({
    method: "POST",
    baseURL: API_BASE,
    url: UPDATE_PUBLIC_PROFILE_DETAIL_API,
    data: payload,
  })
    .then((response) => {
      console.log(
        response,
        "*************Update Public Profile Detail Request response*******************"
      );
      return response.data;
    })
    .catch((error) => {
      console.log(error);
    });
};
