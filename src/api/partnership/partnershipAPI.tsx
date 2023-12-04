import { Status } from "@/helpers/enumHelpers";
import {
  ACCEPT_PARTNERSHIP_REQUEST,
  API_BASE,
  CANCEL_PARTNERSHIP_REQUEST,
  CREATE_PARTNERSHIP_API,
  GET_ALL_PARTNERSHIPS,
  GET_ALL_PARTNERSHIP_DETAILS_API,
  GET_ALL_PARTNERSHIP_PROFILES_API,
  GET_ALL_PENDING_PARTNERSHIP_REQUEST,
  GET_PUBLIC_PARTNERSHIP_URL,
} from "../api_urls";
import CustomAxios from "../CustomAxios/CustomAxios";
import {
  getProfileId,
  getUserAccountType,
  getUserIdFromStorage,
} from "@/helpers/authHelper";
import { getId } from "@/helpers/payloadHelper";

export const createPartnershipRequestApi = async (values: any) => {
  console.log(
    values,
    "**************Create Partnership Request***************"
  );
  return await CustomAxios({
    method: "POST",
    baseURL: API_BASE,
    url: CREATE_PARTNERSHIP_API,
    data: values,
  })
    .then((response) => {
      console.log(
        response,
        "*************Create Partnership Response*******************"
      );
      return response.data;
    })
    .catch((error) => {
      console.log(error);
    });
};

export const getAllPartnershipRequestApi = async (values: any) => {
  console.log(
    values,
    "**************Get All Partnership Request***************"
  );
  return await CustomAxios({
    method: "POST",
    baseURL: API_BASE,
    url: GET_ALL_PARTNERSHIP_DETAILS_API,
    data: values,
  })
    .then((response) => {
      console.log(
        response,
        "*************Get All Partnership Response*******************"
      );
      return response.data;
    })
    .catch((error) => {
      console.log(error);
    });
};

export const getAllProfilesApi = async (values: any) => {
  console.log(values, "**************Get All Profiles***************");
  return await CustomAxios({
    method: "POST",
    baseURL: API_BASE,
    url: GET_ALL_PARTNERSHIP_PROFILES_API,
    data: values,
  })
    .then((response) => {
      console.log(response, "*************Get All Profiles*******************");
      return response.data;
    })
    .catch((error) => {
      console.log(error);
    });
};

export const getAllPendingPartnershipRequestApi = async (
  page: any,
  size: any,
  partnershipRequestCategory: any,
  partnershipRequestStatus: any,
  participantProfileName: any,
  loggedProfileReferenceId: any,
  loggedProfileType: any
) => {
  const requestReceivedPayload = {
    page: page,
    size: size,
    partnershipRequestCategory: partnershipRequestCategory,
    partnershipParticipantId: getProfileId(),
    partnershipParticipantProfileType: getUserAccountType(),
    partnershipRequestStatus: partnershipRequestStatus,
    participantProfileName: participantProfileName,
    loggedProfileReferenceId: loggedProfileReferenceId,
    loggedProfileType: loggedProfileType
  };
  console.log(
    requestReceivedPayload,
    "**************Get All Pending Partnership Request***************"
  );
  return await CustomAxios({
    method: "POST",
    baseURL: API_BASE,
    url: GET_ALL_PENDING_PARTNERSHIP_REQUEST,
    data: requestReceivedPayload,
  })
    .then((response) => {
      console.log(
        response,
        "*************Get All Pending Partnership Response*******************"
      );
      return response.data;
    })
    .catch((error) => {
      console.log(error);
    });
};

export const acceptPartnershipRequestApi = async (id: any, name: any) => {
  const acceptPayload = {
    reqId: id,
    status: String(Status.APPROVED),
    partnershipName: name,
  };
  console.log(
    acceptPayload,
    "**************Accept Partnership Request***************"
  );
  return await CustomAxios({
    method: "POST",
    baseURL: API_BASE,
    url: ACCEPT_PARTNERSHIP_REQUEST,
    data: acceptPayload,
  })
    .then((response) => {
      console.log(
        response,
        "*************Accept Partnership Response*******************"
      );
      return response.data;
    })
    .catch((error) => {
      console.log(error);
    });
};

//to cancel the partnership request before create the partnership
export const cancelPartnershipRequestApi = async (
  reqId: any,
  senderID: any,
  senderOrganizationCategory: any,
  receiverID: any,
  receiverOrganizationCategory: any
) => {
  const cancelPayload = {
    reqId: reqId,
    senderID: getProfileId(),
    senderOrganizationCategory: getUserAccountType(),
    receiverID: receiverID,
    receiverOrganizationCategory: receiverOrganizationCategory,
  };
  console.log(
    cancelPayload,
    "**************Cancel Partnership Requests***************"
  );
  return await CustomAxios({
    method: "POST",
    baseURL: API_BASE,
    url: CANCEL_PARTNERSHIP_REQUEST,
    data: cancelPayload,
  })
    .then((response) => {
      console.log(
        response,
        "*************Cancel Partnership Requests*******************"
      );
      return response.data;
    })
    .catch((error) => {
      console.log(error);
    });
};

//to retrieve all the partnerships
export const getAllPartnershipsApi = async (size: any, isEnable: boolean) => {
  const payload = {
    page: 0,
    size: size,
    userId: getUserIdFromStorage(),
    userIn: isEnable,
    loggedProfileReferenceId: getId(),
    loggedProfileType: getUserAccountType()
  };
  console.log(
    payload,
    "**************Cancel Partnership Requests***************"
  );
  return await CustomAxios({
    method: "POST",
    baseURL: API_BASE,
    url: GET_ALL_PARTNERSHIPS,
    data: payload,
  })
    .then((response) => {
      console.log(
        response,
        "*************Cancel Partnership Requests*******************"
      );
      return response.data;
    })
    .catch((error) => {
      console.log(error);
    });
};

//to retrieve partnerships public URL details
export const getPartnershipPublicURLApi = async (publicUrl: any) => {
  const payload = {
    publicUrl: publicUrl,
  };
  console.log(
    payload,
    "**************Partnership Public URL Details Requests***************"
  );
  return await CustomAxios({
    method: "POST",
    baseURL: API_BASE,
    url: GET_PUBLIC_PARTNERSHIP_URL,
    data: payload,
  })
    .then((response) => {
      console.log(
        response,
        "*************Partnership Public URL Details Requests*******************"
      );
      return response.data;
    })
    .catch((error) => {
      console.log(error);
    });
};
