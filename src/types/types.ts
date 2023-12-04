//---------------------------------------------login------------------------------------------------------------------
export interface LoginValues {
  username: string;
  password: string;
}

//---------------------------------------------Registration------------------------------------------------------------------
export interface RegistrationValues {
  fullName: string;
  userName: string;
  email: string;
  contactNo: string;
  password: string;
  confirmPassword: string;
}

export interface EditRegistrationValues {
  fullName: string;
  contactNo: string;
}

//---------------------------------------------Forget Password------------------------------------------------------------------
export interface ForgetPasswordValues {
  email: string;
}

export interface ResetPasswordValues {
  email: string;
  username: any;
  tempPassword: string;
  newPassword: string;
  confirmPassword: string;
}

//---------------------------------------------Create Organization------------------------------------------------------------------
/**
 * Organization category
 */
export interface OrganizationCategoryValues {
  category: string;
}

/**
 * about Organization
 */
export interface AboutOrganizationValues {
  description: string;
  webLink: string;
  mobile: string;
  location: string;
  cmpStartDate: string;
  cmpSize: string;
  tagLine: string;
  countryCode: string;
}

/**
 * Edit About Organization
 */
export interface EditOrganizationValues {
  name: string;
  description: string;
  webLink: string;
  mobile: string;
  location: string;
  cmpStartDate: string;
  cmpSize: any;
  tagLine: string;
  countryCode: string;
  organizationCategory: any;
}

//---------------------------------------------Create Event------------------------------------------------------------------
/**
 * about Event
 */
export interface AboutEventValues {
  eventName: string;
  startDate: string;
  startTime: string;
  endDate: string;
  endTime: string;
  timeZone: string;
}

/**
 * Event Link
 */
export interface EventLinkValues {
  link: string;
}

export interface EditEventValues {
  eventName: string;
  startDate: string;
  startTime: any;
  endDate: string;
  endTime: string;
  eventType: any;
  link: string;
  location: string;
  attendeeLimit: string;
  isAllowGuest: boolean;
  isEventFee: boolean;
  eventFee: string;
  description: string;
  isAttendeeLimit: boolean;
  isRepeat: boolean;
  isQuestion: boolean;
  currency: any;
  timeZone: any;
}
//---------------------------------------------Create Public Profile------------------------------------------------------------------
/**
 * Public Profile interests
 */
export interface PublicProfileInterestValues {
  interests: [string];
}

/**
 * about Public Profile
 */
export interface AboutPublicProfileValues {
  description: string;
  mobile: string;
  location: string;
  workPlace: string;
  university: string;
  highSchool: string;
  tagLine: string;
  countryCode: string;
}

/**
 * Public Profile Networks
 */
export interface PublicProfileNetwokValues {
  networkRequests: [
    {
      networkType: string;
      link: string;
    }
  ];
}

/**
 * edi Public Profile
 */
export interface EditPublicProfileValues {
  name: string;
  description: string;
  mobile: string;
  location: string;
  workPlace: string;
  university: string;
  highSchool: string;
  tagLine: string;
  countryCode: string;
}

//---------------------------------------------File Server------------------------------------------------------------------

export interface fileServerValues {
  file: any;
  tagname: string;
}

//---------------------------------------------Alert------------------------------------------------------------------

export interface alertValues {
  message: any;
  severity: any;
  show: boolean;
}

//---------------------------------------------Photo Upload------------------------------------------------------------------

export interface photoUploadValues {
  imageTitle: string;
  imagePath: string;
  imageDescription: string;
  profileType: string;
  profileOrPartnershipId: any;
}
