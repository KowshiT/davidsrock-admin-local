import {
  acceptPartnershipRequestApi,
  cancelPartnershipRequestApi,
  createPartnershipRequestApi,
  getAllPartnershipRequestApi,
  getAllPartnershipsApi,
  getAllPendingPartnershipRequestApi,
  getAllProfilesApi,
  getPartnershipPublicURLApi,
} from "@/api/partnership/partnershipAPI";

/**
 * Create Partnership
 * params:
 */
export const createPartnershipActionHandler = async (values: any) => {
  return await createPartnershipRequestApi(values);
};

export const getAllPartnershipActionHandler = async (values: any) => {
  return await getAllPartnershipRequestApi(values);
};

//get all organization and public profiles to add a new partnership request
export const getAllProfilesActionHandler = async (values: any) => {
  return await getAllProfilesApi(values);
};

export const getAllPendingPartnershipActionHandler = async (
  page: any,
  size: any,
  partnershipRequestCategory: any,
  partnershipRequestStatus: any,
  participantProfileName: any,
  loggedProfileReferenceId: any,
  loggedProfileType: any
) => {
  return await getAllPendingPartnershipRequestApi(
    page,
    size,
    partnershipRequestCategory,
    partnershipRequestStatus,
    participantProfileName,
    loggedProfileReferenceId,
    loggedProfileType
  );
};

export const acceptPartnershipActionHandler = async (id: any, name: any) => {
  return await acceptPartnershipRequestApi(id, name);
};

//cancel partnership request
export const cancelPartnershipRequestActionHandler = async (
  reqId: any,
  senderID: any,
  senderOrganizationCategory: any,
  receiverID: any,
  receiverOrganizationCategory: any
) => {
  return await cancelPartnershipRequestApi(
    reqId,
    senderID,
    senderOrganizationCategory,
    receiverID,
    receiverOrganizationCategory
  );
};

//get all partnerships
export const getAllPartnershipsActionHandler = async (
  size: any,
  isEnable: any
) => {
  return await getAllPartnershipsApi(size, isEnable);
};

//get partnership public url details
export const getPartnershipPublicURLActionHandler = async (publicUrl: any) => {
  return await getPartnershipPublicURLApi(publicUrl);
};
