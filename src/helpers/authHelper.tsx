import { AccountType } from "./enumHelpers";

export const setInitialAccountName = (name: string) => {
  localStorage.setItem("accountName", name);
};

export const getInitialAccountName = () => {
  return localStorage.getItem("accountName");
};

export const setUserPublicURL = (value: string) => {
  localStorage.setItem("userPublicURL", value);
};

export const getUserPublicURL = () => {
  return localStorage.getItem("userPublicURL");
};

export const setActiveTabToLocalStorage = (name: string) => {
  localStorage.setItem("activeTab", name);
};

export const getActiveTabFromLocalStorage = () => {
  return localStorage.getItem("activeTab");
};

export const setUserNameToLocalStorage = (name: string) => {
  localStorage.setItem("userName", name);
};

export const getUserNameFromLocalStorage = () => {
  return localStorage.getItem("userName");
};

export const setProfileId = (id: string) => {
  localStorage.setItem("profileId", id);
};

export const getProfileId = () => {
  if (typeof window !== "undefined" && window.localStorage) {
    return parseInt(localStorage.getItem("profileId"));
  }
  return null; // Handle the case when localStorage is not available
};

export const setOrganizationId = (id: string) => {
  localStorage.setItem("organizationId", id);
};

export const getOrganizationId = () => {
  return parseInt(localStorage.getItem("organizationId"));
};

export const setPublicProfileId = (id: string) => {
  localStorage.setItem("publicProfileId", id);
};

export const getPublicProfileId = () => {
  return parseInt(localStorage.getItem("publicProfileId"));
};

export const setUserAccountType = (type: AccountType) => {
  localStorage.setItem("accountType", String(type));
};

export const getUserAccountType = () => {
  return localStorage.getItem("accountType");
};

export const getUserIdFromStorage = () => {
  return parseInt(localStorage.getItem("userId"));
};

export const setUserProfilePictureToLocalStorage = (type: string) => {
  localStorage.setItem("profilePicture", type);
};

export const getUserProfilePictureToLocalStorage = () => {
  return localStorage.getItem("profilePicture");
};

export const setUserProfilePicture2ToLocalStorage = (type: string) => {
  localStorage.setItem("profilePicture2", type);
};

export const getUserProfilePicture2ToLocalStorage = () => {
  return localStorage.getItem("profilePicture2");
};

export const setInitialUserProfilePictureToLocalStorage = (type: string) => {
  localStorage.setItem("initialProfilePicture", type);
};

export const getInitialUserProfilePictureToLocalStorage = () => {
  return localStorage.getItem("initialProfilePicture");
};

export const setCountryCode = (name: string) => {
  localStorage.setItem("countryCode", name);
};

export const getCountryCode = () => {
  return localStorage.getItem("countryCode");
};

export const setPublicUrlToLocalStorage = (url: string) => {
  localStorage.setItem("publicUrl", url);
};

export const getPublicUrlFromLocalStorage = () => {
  return localStorage.getItem("publicUrl");
};

export const setProfileUploadTypeToStorage = (type: string) => {
  localStorage.setItem("uploadType", type);
};

export const getProfileUploadTypeFromStorage = () => {
  return localStorage.getItem("uploadType");
};

export const setUserUrlToLocalStorage = (url: string) => {
  localStorage.setItem("userPublicUrl", url);
};

export const getUserUrlFromLocalStorage = () => {
  return localStorage.getItem("userPublicUrl");
};

export const setUserTimeZoneToLocalStorage = (userTimeZone: any) => {
  localStorage.setItem("userTimeZone", userTimeZone);
};

export const getUserTimeZoneFromLocalStorage = () => {
  return localStorage.getItem("userTimeZone");
};