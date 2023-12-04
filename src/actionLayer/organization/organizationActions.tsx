import {
  createOrganizationApi,
  getGalleryImagesApi,
  getInterestOrganizationDetailsApi,
  getOrganizationDetailsApi,
  UpdateOrganizationDetailApi,
  uploadGalleryImageApi,
} from "@/api/organization/organizationApi";
import createOrganizationDTO from "@/models/organization/createOrganizationDTO";

/**
 * Create Organization
 * params: createOrganizationDTO
 */
export const createOrganizationActionHandler = async (values: any) => {
  return await createOrganizationApi(values);
};

/**
 * Get Organizations
 */
export const getOrganizationActionHandler = async (values: any) => {
  return await getOrganizationDetailsApi(values);
};

/**
 * Get Organizations By Interest
 */
export const getInterestOrganizationActionHandler = async (values: any) => {
  return await getInterestOrganizationDetailsApi(values);
};

/**
 * Upload Gallery Image
 */
export const uploadGalleryImageActionHandler = async (values: any) => {
  return await uploadGalleryImageApi(values);
};

/**
 * Get Gallery Images
 */
export const getGalleryImagesActionHandler = async (values: any) => {
  return await getGalleryImagesApi(values);
};

/**
 * Update Organization Details
 */
export const UpdateOrganizationDetailActionHandler = async (
  profileImage: any,
  coverImagePath: any,
  networkRequests: any,
  organizationRequest: any,
  otherValues: any
) => {
  return await UpdateOrganizationDetailApi(
    profileImage,
    coverImagePath,
    networkRequests,
    organizationRequest,
    otherValues
  );
};
