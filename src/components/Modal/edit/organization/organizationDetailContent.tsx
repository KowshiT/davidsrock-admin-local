import { capitalizedFormat } from "@/helpers/stringCrop";
import { SectionColumn } from "@/layouts/section";
import React from "react";
import EditOrganizationDetailModal from "./editOrganizationDetailModal";

export interface OrganizationDetailContentProps {
  details: any;
}

const OrganizationDetailContent: React.FC<OrganizationDetailContentProps> = (
  props
) => {
  return (
    <React.Fragment>
      <SectionColumn className="mt-5 w-full">
        <div className="flex flex-row flex-wrap">
          <div className="edit-detail-content-left">
            <p className="h3-black-14-text-left">Organization Name</p>
          </div>
          <div className="mx-1">
            <p className="h3-black-14-text-left">:</p>
          </div>
          <div className="edit-detail-description">
            <p className="dark-gray-14-text-500-left">
              {props?.details.profile.profileName || ""}
            </p>
          </div>
        </div>

        <div className="mt-2 flex flex-row flex-wrap">
          <div className="edit-detail-content-left">
            <p className="h3-black-14-text-left">Category</p>
          </div>
          <div className="mx-1">
            <p className="h3-black-14-text-left">:</p>
          </div>
          <div className="edit-detail-description">
            <p className="dark-gray-14-text-500-left">
              {capitalizedFormat(props?.details.organizationCategory) || ""}
            </p>
          </div>
        </div>

        <div className="mt-2 flex flex-row flex-wrap">
          <div className="edit-detail-content-left">
            <p className="h3-black-14-text-left">Tagline</p>
          </div>
          <div className="mx-1">
            <p className="h3-black-14-text-left">:</p>
          </div>
          <div className="edit-detail-description">
            <p className="dark-gray-14-text-500-left">
              {props?.details.profile.tagLine || ""}
            </p>
          </div>
        </div>

        <div className="mt-2 flex flex-row flex-wrap">
          <div className="edit-detail-content-left">
            <p className="h3-black-14-text-left">Description</p>
          </div>
          <div className="mx-1">
            <p className="h3-black-14-text-left">:</p>
          </div>
          <div className="edit-detail-description">
            <p className="dark-gray-14-text-500-left">
              {props?.details.profile.description || ""}
            </p>
          </div>
        </div>

        <div className="mt-2 flex flex-row flex-wrap">
          <div className="edit-detail-content-left">
            <p className="h3-black-14-text-left">Location</p>
          </div>
          <div className="mx-1">
            <p className="h3-black-14-text-left">:</p>
          </div>
          <div className="edit-detail-description">
            <p className="dark-gray-14-text-500-left">
              {props?.details.profile.location || ""}
            </p>
          </div>
        </div>

        <div className="mt-2 flex flex-row flex-wrap">
          <div className="edit-detail-content-left">
            <p className="h3-black-14-text-left">Incorporated Date</p>
          </div>
          <div className="mx-1">
            <p className="h3-black-14-text-left">:</p>
          </div>
          <div className="edit-detail-description">
            <p className="dark-gray-14-text-500-left">
              {props?.details.companyStartDate || ""}
            </p>
          </div>
        </div>
        <div className="mt-2 flex flex-row flex-wrap">
          <div className="edit-detail-content-left">
            <p className="h3-black-14-text-left">Company Size</p>
          </div>
          <div className="mx-1">
            <p className="h3-black-14-text-left">:</p>
          </div>
          <div className="edit-detail-description">
            <p className="dark-gray-14-text-500-left">
              {props?.details.employeeCount || ""}
            </p>
          </div>
        </div>
        <div className="mt-2 flex flex-row flex-wrap">
          <div className="edit-detail-content-left">
            <p className="h3-black-14-text-left">Contact Number</p>
          </div>
          <div className="mx-1">
            <p className="h3-black-14-text-left">:</p>
          </div>
          <div className="edit-detail-description">
            <p className="dark-gray-14-text-500-left">
              {props?.details.profile.mobile || ""}
            </p>
          </div>
        </div>

        <div className="mt-2 flex flex-row flex-wrap">
          <div className="edit-detail-content-left">
            <p className="h3-black-14-text-left">Website</p>
          </div>
          <div className="mx-1">
            <p className="h3-black-14-text-left">:</p>
          </div>
          <div className="edit-detail-description">
            <p className="dark-gray-14-text-500-left">
              {props?.details.profile.networkEntities[0].link || ""}
            </p>
          </div>
        </div>

        {/* <EditOrganizationDetailModal details={props.details} /> */}
      </SectionColumn>
    </React.Fragment>
  );
};

export default OrganizationDetailContent;
