import * as Yup from "yup";

const phoneNumberFormat =
  /^[+]?[(]?[0-9]{3}[)]?[-\s.]?[0-9]{3}[-\s.]?[0-9]{4,9}$/im;
const passwordFormat =
  /^(?=.*\d)(?=.*[!@#$%^&;:?*])(?=.*[a-z])(?=.*[A-Z]).{8,20}$/;
const nicFormat = /^([0-9]{9}[x|X|v|V]|[0-9]{12})$/;
const nicOrPassportFormat = /^([0-9]{9}[x|X|v|V]|[0-9]{12}|[A-Z]{1}[0-9]{7})$/;
const passportFormat = /^([A-Z]{1}[0-9]{7})$/;
const driversLicenseFormat = /^([A-Z]{1}[0-9]{7}|[A-Z]{1}[0-9]{9})$/;
const hsCode = /[0-9]{8}/;
const approvedCstAffidavitDate =
  /^([0-2][0-9][0-9][0-9]-0[1-9]-[0-2][0-9]|[0-2][0-9][0-9][0-9]-1[0-2]-[0-2][0-9]|[0-2][0-9][0-9][0-9]-0[1-9]-3[0-1]|[0-2][0-9][0-9][0-9]-1[0-2]-3[0-1])$/;
const spiceAffidavitDate =
  /(\b([0][1-9]|[12][0-9]|3[01]))(st|nd|rd|th)\s(JAN|FEB|MAR|APR|JUN|JUL|AUG|SEP|OCT|NOV|DEC)$/;
const spiceAffidavitYear = /([0-9]{4})/;

//---------------------------------------------login------------------------------------------------------------------

/**
 * Login Validation
 */
export const loginValidation = Yup.object({
  username: Yup.string()
    .email("Email address must be a valid email.")
    .required("Email Address is required"),
  password: Yup.string().required("Password is required"),
});

//---------------------------------------------Registration------------------------------------------------------------------

/**
 * Registration Validation
 */
export const registrationValidation = Yup.object({
  fullName: Yup.string().required("Name is required"),
  userName: Yup.string().email("Email address must be a valid email.").required("Email Address is required"),
  contactNo: Yup.string().required("Contact Number is required"),
  // .matches(phoneNumberFormat, 'Should be a valid phone number'),
  password: Yup.string().required("Password is required").matches(passwordFormat, "Password is too weak"),
  confirmPassword: Yup.string().required("Confirm Password is required").oneOf([Yup.ref("password"), null], "Passwords must match"),
});

/**
 * OTP Validation
 */
export const OTPValidation = Yup.object({
  otp: Yup.string().required("OTP is required"),
});

/**
 * about Organization
 */
export const EditUserValidation = Yup.object({
  contactNo: Yup.string().required("Phone Number is required"),
});

//---------------------------------------------Reset Password------------------------------------------------------------------

/**
 * Email Submit Validation
 */
export const emailSubmitValidation = Yup.object({
  email: Yup.string()
    .email("Email address must be a valid email.")
    .required("Email Address is required"),
});

/**
 * Reset Password Validation
 */
export const resetPasswordValidation = Yup.object({
  tempPassword: Yup.string().required("Temporary password is required"),
  newPassword: Yup.string().required("New Password is required").matches(passwordFormat, "New Password is too weak"),
  confirmPassword: Yup.string().required("Confirm Password is required"),
});

//---------------------------------------------Create Organization------------------------------------------------------------------
/**
 * Organization category
 */
export const OrgCategoryValidation = Yup.object({
  category: Yup.object().required("Category is required"),
});

/**
 * about Organization
 */
export const AboutOrgValidation = Yup.object({
  mobile: Yup.string().required("Phone Number is required"),
  location: Yup.string().required("Location is required"),
  webLink: Yup.string().required("Website is required"),
  cmpStartDate: Yup.string()
    .required("Company Start Date is required")
    .nullable(),
  cmpSize: Yup.object().required("Company Size is required"),
  tagLine: Yup.string().required("Tagline is required"),
  description: Yup.string()
    .required("Description is required")
    .min(100, "Please enter at least 100 characters."),
});

export const EditOrgValidation = Yup.object({
  mobile: Yup.string().required("Phone Number is required"),
  webLink: Yup.string().required("Website is required"),
  cmpStartDate: Yup.string()
    .required("Company Start Date is required")
    .nullable(),
  cmpSize: Yup.object().required("Company Size is required"),
  tagLine: Yup.string().required("Tagline is required"),
  description: Yup.string()
    .required("Description is required")
    .min(100, "Please enter at least 100 characters."),
  organizationCategory: Yup.object().required("Category is required"),
  location: Yup.string().required("Location is required"),
});

//---------------------------------------------Create Public Profile------------------------------------------------------------------
/**
 * Public Profile interests
 */
export const PublicProfileInterestValidation = Yup.object({
  interests: Yup.object().required("Interest is required"),
});

/**
 * About Public Profile
 */
export const AboutPublicProfileValidation = Yup.object({
  mobile: Yup.string().required("Phone Number is required"),
  location: Yup.string().required("Location is required"),
  workPlace: Yup.string().required("Work Place is required"),
  highSchool: Yup.string().required("High School is required"),
  university: Yup.string().required("University is required"),
  tagLine: Yup.string().required("Tagline is required"),
  description: Yup.string()
    .required("Description is required")
    .min(100, "Please enter at least 100 characters."),
});

/**
 * About Public Profile
 */
export const EditPublicProfileValidation = Yup.object({
  mobile: Yup.string().required("Phone Number is required"),
  location: Yup.string().required("Location is required"),
  workPlace: Yup.string().required("Work Place is required"),
  highSchool: Yup.string().required("High School is required"),
  university: Yup.string().required("University is required"),
  tagLine: Yup.string().required("Tagline is required"),
  description: Yup.string()
    .required("Description is required")
    .min(100, "Please enter at least 100 characters."),
});

/**
 * Public Profile Networks
 */
export const PublicProfileNetworksValidation = Yup.object({
  networkRequests: Yup.array(
    Yup.object({
      networkType: Yup.object().required("Social Media Network is required"),
      link: Yup.string().url("Enter a valid Link").required("Link is required"),
    })
  ),
});

//---------------------------------------------Create Event------------------------------------------------------------------
/**
 * about Event
 */
export const AboutEventValidation = Yup.object({
  eventName: Yup.string().required("Event Name is required"),
  startDate: Yup.string().required("Start Date is required").nullable(),
  startTime: Yup.string().required("Start Time is required").nullable(),
  endDate: Yup.string().required("End Date is required").nullable(),
  endTime: Yup.string().required("End Time is required").nullable(),
  timeZone: Yup.object().required("Time Zone is required"),
});

/**
 * Event Link
 */
export const EventLinkValidation = Yup.object({
  link: Yup.string()
    .url("Enter a valid Link")
    .required("Event Link is required"),
});

/**
 * Edit Event Link
 */

export const EditEventValidation = Yup.object({
  eventType: Yup.object().required("Event Type is required"),
  startDate: Yup.string().required("Start Date is required").nullable(),
  startTime: Yup.string().required("Start Time is required").nullable(),
  endDate: Yup.string().required("End Date is required").nullable(),
  endTime: Yup.string().required("End Time is required").nullable(),
  link: Yup.string().url("Enter a valid Link").required("Link is required"),
  location: Yup.string().when("eventType", {
    is: (eventType) => eventType && eventType.value === "PHYSICAL",
    then: Yup.string().required("Location is required"),
    otherwise: Yup.string().notRequired(),
  }),

  attendeeLimit: Yup.number().when("isAttendeeLimit", {
    is: (isAttendeeLimit) => isAttendeeLimit && isAttendeeLimit === true,
    then: Yup.number()
      .required("Attendee Limit is required")
      .typeError("Attendee Limit must be a valid number")
      .positive("Attendee Limit must be a positive number"),
    otherwise: Yup.number().notRequired(),
  }),

  eventFee: Yup.number().when("isEventFee", {
    is: (isEventFee) => isEventFee,
    then: Yup.number()
      .required("Event Fee is required")
      .typeError("Currency amount must be a valid number")
      .positive("Currency amount must be a positive number"),
    otherwise: Yup.number().notRequired(), // You should use Yup.number() here
  }),
});

//---------------------------------------------Photo Upload------------------------------------------------------------------

/**
 * Photo Upload Validation
 */
export const photoUploadValidation = Yup.object({
  imageTitle: Yup.string().required("Title is required"),
  imageDescription: Yup.string().required("Description is required"),
});
