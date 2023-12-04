import { UpdatePublicProfileDetailApi } from "@/api/publicProfile/publicProfileAPI";

/**
 * Update Public Profile Details
 */
export const UpdatePublicProfileDetailActionHandler = async (
  networkRequests: any,
  publicProfileRequest: any,
  otherValues: any
) => {
  return await UpdatePublicProfileDetailApi(
    networkRequests,
    publicProfileRequest,
    otherValues
  );
};
