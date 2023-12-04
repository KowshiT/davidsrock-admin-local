import { getProfileId, getUserAccountType, getUserIdFromStorage } from "./authHelper";

export const getId = () => {
  if (getUserAccountType() === "INITIAL") {
    return getUserIdFromStorage();
  } else if (getUserAccountType() === "ORGANIZATION" || getUserAccountType() === "PUBLIC_PROFILE" || getUserAccountType() === "PARTNERSHIP") {
    return getProfileId();
  } else {
    return null;
  }
}

export const getParticipantEntityId = () => {
  if (getUserAccountType() === "INITIAL") {
    return getUserIdFromStorage();
  } else if (getUserAccountType() === "PUBLIC_PROFILE") {
    return getProfileId();
  } else {
    return null;
  }
};

export const getParticipantType = () => {
  if (getUserAccountType() === "INITIAL") {
    return "INITIAL";
  } else if (getUserAccountType() === "PUBLIC_PROFILE") {
    return "PUBLIC_PROFILE";
  } else {
    return null;
  }
};