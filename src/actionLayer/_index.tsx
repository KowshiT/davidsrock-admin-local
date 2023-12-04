import {
  LoginValues,
  fileServerValues,
  alertValues,
  RegistrationValues,
  ForgetPasswordValues,
  ResetPasswordValues,
  AboutOrganizationValues,
  OrganizationCategoryValues,
  AboutEventValues,
  AboutPublicProfileValues,
  PublicProfileInterestValues,
  PublicProfileNetwokValues,
  photoUploadValues,
  EventLinkValues,
  EditOrganizationValues,
} from "../types/types";

//---------------------------------------------login------------------------------------------------------------------

/**
 * Initial Values of Log User
 */
export const loginValuesInit: LoginValues = {
  username: "",
  password: "",
};

//---------------------------------------------Registration------------------------------------------------------------------

/**
 * Initial Values of Register User
 */
export const registrationValuesInit: RegistrationValues = {
  fullName: "",
  userName: "",
  email: "",
  contactNo: "",
  password: "",
  confirmPassword: "",
};

//---------------------------------------------Forget Password------------------------------------------------------------------
/**
 * Forgot Password
 */
export const ForgetPasswordValuesInit: ForgetPasswordValues = {
  email: "",
};

export const ResetPasswordValuesInit: ResetPasswordValues = {
  email: "",
  username: "",
  tempPassword: "",
  newPassword: "",
  confirmPassword: "",
};

//---------------------------------------------Create Organization------------------------------------------------------------------
/**
 * Organization category
 */
export const OrganizationCategoryValuesInit: OrganizationCategoryValues = {
  category: "",
};

/**
 * about Organization
 */
export const AboutOrganizationValuesInit: AboutOrganizationValues = {
  description: "",
  webLink: "",
  mobile: "",
  location: "",
  cmpStartDate: "",
  cmpSize: "",
  tagLine: "",
  countryCode: "",
};

/**
 * edit about Organization
 */
export const EditOrganizationValuesInit: EditOrganizationValues = {
  name: "",
  description: "",
  webLink: "",
  mobile: "",
  location: "",
  cmpStartDate: "",
  cmpSize: "",
  tagLine: "",
  countryCode: "",
  organizationCategory: "",
};

//---------------------------------------------Create Event------------------------------------------------------------------
/**
 * about Event
 */
export const AboutEventValuesInit: AboutEventValues = {
  eventName: "",
  startDate: "",
  startTime: "",
  endDate: "",
  endTime: "",
  timeZone: "",
};

/**
 * Event Link
 */
export const EventLinkValuesInit: EventLinkValues = {
  link: "",
};

//---------------------------------------------Create Public Profile------------------------------------------------------------------
/**
 * Public Profile interests
 */
export const PublicProfileInterestValuesInit: PublicProfileInterestValues = {
  interests: [""],
};

/**
 * about Public Profile
 */
export const AboutPublicProfileValuesInit: AboutPublicProfileValues = {
  description: "",
  mobile: "",
  location: "",
  workPlace: "",
  university: "",
  highSchool: "",
  tagLine: "",
  countryCode: "",
};

/**
 * Public Profile Networks
 */
export const PublicProfileNetworkValuesInit: PublicProfileNetwokValues = {
  networkRequests: [
    {
      networkType: "",
      link: "",
    },
  ],
};

//---------------------------------------------File Server------------------------------------------------------------------

/**
 * file Server
 */
export const fileServerValuesInit: fileServerValues = {
  file: "",
  tagname: "",
};

//---------------------------------------------Alert------------------------------------------------------------------

/**
 * Alert
 */
export const alertValuesInit: alertValues = {
  message: "",
  severity: "",
  show: false,
};

//---------------------------------------------Photo Upload------------------------------------------------------------------

export const photoUploadValuesInit: photoUploadValues = {
  imageTitle: "",
  imagePath: "",
  imageDescription: "",
  profileType: "",
  profileOrPartnershipId: "",
};
