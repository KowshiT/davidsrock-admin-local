export default class createOrganizationDTO {
  userId: string;
  profileName: string;
  description: string;
  profileImagePath: string;
  coverImagePath: string;
  profileType: string;
  mobile: string;
  location: string;
  organizationRequest: {
    organizationCategory: string;
    employeeCount: any;
    companyStartDate: string;
  };
  publicProfileRequest: {
    workPlace: string;
    university: string;
    highSchool: string;
    interest: string;
    interestList: any;
  };

  constructor(
    userId: string,
    profileName: string,
    description: string,
    profileImagePath: string,
    coverImagePath: string,
    profileType: string,
    mobile: string,
    location: string,
    organizationRequest: {
      organizationCategory: string;
      employeeCount: any;
      companyStartDate: string;
    },
    publicProfileRequest: {
      workPlace: string;
      university: string;
      highSchool: string;
      interest: string;
      interestList: any;
    }

  ) {
    this.userId = userId;
    this.profileName = profileName;
    this.description = description;
    this.profileImagePath = profileImagePath;
    this.coverImagePath = coverImagePath;
    this.profileType = profileType;
    this.mobile = mobile;
    this.location = location;
    this.organizationRequest = organizationRequest;
    this.publicProfileRequest = publicProfileRequest;
  }
}