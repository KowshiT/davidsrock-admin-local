import axios from "axios";
import {
  API_BASE,
  CREATE_ORGANIZATION_API,
  GET_GALLERY_IMAGES_API,
  GET_INTEREST_ORGANIZATION_DETAILS_API,
  GET_ORGANIZATION_DETAILS_API,
  UPDATE_ORGANIZATION_DETAIL_API,
  UPLOAD_GALLERY_IMAGE_API,
} from "../api_urls";
import CustomAxios from "../CustomAxios/CustomAxios";
import createOrganizationDTO from "@/models/organization/createOrganizationDTO";
import { getProfileId } from "@/helpers/authHelper";

/**
 * Create Organization
 * params: createOrganizationDTO
 */
export const createOrganizationApi = async (values: any) => {
  console.log(
    values,
    "**************Create Organization Request***************"
  );
  return await CustomAxios({
    method: "POST",
    baseURL: API_BASE,
    url: CREATE_ORGANIZATION_API,
    data: values,
  })
    .then((response) => {
      console.log(
        response,
        "*************Create Organization Response*******************"
      );
      return response.data;
    })
    .catch((error) => {
      console.log(error);
    });
};

/**
 * Get Organizations
 */
export const getOrganizationDetailsApi = async (values: any) => {
  console.log(values, "**************Get Organization Request***************");
  return await CustomAxios({
    method: "POST",
    baseURL: API_BASE,
    url: GET_ORGANIZATION_DETAILS_API,
    data: values,
  })
    .then((response) => {
      console.log(
        response,
        "*************Get Organization Response*******************"
      );
      return response.data;
    })
    .catch((error) => {
      console.log(error);
    });
};

/**
 * Get Interest Organizations
 */
export const getInterestOrganizationDetailsApi = async (values: any) => {
  console.log(values, "**************Get Organization Request***************");
  return await CustomAxios({
    method: "POST",
    baseURL: API_BASE,
    url: GET_INTEREST_ORGANIZATION_DETAILS_API,
    data: values,
  })
    .then((response) => {
      console.log(
        response,
        "*************Get Organization Response*******************"
      );
      return response.data;
    })
    .catch((error) => {
      console.log(error);
    });
};

/**
 * Upload Gallery Image
 */
export const uploadGalleryImageApi = async (values: any) => {
  console.log(
    values,
    "**************Upload Gallery Image Request***************"
  );
  return await CustomAxios({
    method: "POST",
    baseURL: API_BASE,
    url: UPLOAD_GALLERY_IMAGE_API,
    data: values,
  })
    .then((response) => {
      console.log(
        response,
        "*************Upload Gallery Image Response*******************"
      );
      return response.data;
    })
    .catch((error) => {
      console.log(error);
    });
};

/**
 * Get Gallery Images
 */
export const getGalleryImagesApi = async (values: any) => {
  console.log(
    values,
    "**************Get Gallery Images Request***************"
  );
  return await CustomAxios({
    method: "POST",
    baseURL: API_BASE,
    url: GET_GALLERY_IMAGES_API,
    data: values,
  })
    .then((response) => {
      console.log(
        response,
        "*************Get Gallery Images Response*******************"
      );
      return response.data;
    })
    .catch((error) => {
      console.log(error);
    });
};

export const UpdateOrganizationDetailApi = async (
  profileImage: any,
  coverImagePath: any,
  link: any,
  organizationRequest: any,
  otherValues: any
) => {
  const payload = {
    profileId: getProfileId(),
    profileImagePath: profileImage,
    coverImagePath: coverImagePath,
    networkRequests: [
      {
        networkType: "WEBSITE",
        link: link,
      },
    ],
    organizationRequest: organizationRequest,
    description: otherValues.description,
    mobile: otherValues.mobile,
    location: otherValues.location,
    tagLine: otherValues.tagLine,
  };

  console.log(
    payload,
    "**************Update Organization Detail Request***************"
  );
  return await CustomAxios({
    method: "POST",
    baseURL: API_BASE,
    url: UPDATE_ORGANIZATION_DETAIL_API,
    data: payload,
  })
    .then((response) => {
      console.log(
        response,
        "*************Update Organization Detail Request response*******************"
      );
      return response.data;
    })
    .catch((error) => {
      console.log(error);
    });
};
