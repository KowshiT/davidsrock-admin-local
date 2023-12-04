import { categoryTypeEnumChangeHelper } from "@/helpers/enumChangeHelpers";
import { organizationMockData } from "@/helpers/mock/mockData";
import { SectionRow } from "@/layouts/section";
import React from "react";

export interface OrganizationAboutProps {
  orgDetails: any;
}

const OrganizationAbout: React.FC<OrganizationAboutProps> = (props) => {
  return (
    <div className="orgDownMainSec">
      <div className="organizationDetailsMainText2">Overview</div>
      <br />
      <div className="previewEventSubTextTxt04 mb-4">
        {props.orgDetails?.profile?.description
          ? props.orgDetails?.profile?.description
          : ""}
      </div>

      <br />
      <br />

      <SectionRow>
        <span className="organizationDetailsMainText2 w-32">Phone</span>

        <span className="previewEventSubTextTxt04 mb-4">
          {props.orgDetails?.profile?.mobile
            ? props.orgDetails?.profile?.mobile
            : organizationMockData.phone}
        </span>
      </SectionRow>
      <br />
      <SectionRow>
        <span className="organizationDetailsMainText2 w-32">Industry</span>
        <span className="previewEventSubTextTxt04 mb-4">
          {props.orgDetails?.organizationCategory
            ? categoryTypeEnumChangeHelper(
                props.orgDetails?.organizationCategory
              )
            : organizationMockData.industry}
        </span>
      </SectionRow>
      <br />
      <SectionRow>
        <span className="organizationDetailsMainText2 w-32">Company Size</span>
        <span className="previewEventSubTextTxt04 mb-4">
          {props.orgDetails?.employeeCount
            ? props.orgDetails?.employeeCount
            : organizationMockData.companySized}
        </span>
      </SectionRow>
      <br />
      <SectionRow>
        <span className="organizationDetailsMainText2 w-32">Location</span>
        <span className="previewEventSubTextTxt04 mb-4">
          {props.orgDetails?.profile?.location
            ? props.orgDetails?.profile?.location
            : organizationMockData.location}
        </span>
      </SectionRow>
      <br />
      <SectionRow>
        <span className="organizationDetailsMainText2 w-32">Founded</span>
        <span className="previewEventSubTextTxt04 mb-4">
          {props.orgDetails?.companyStartDate?.slice(0, 4)
            ? props.orgDetails?.companyStartDate?.slice(0, 4)
            : organizationMockData.founded}
        </span>
      </SectionRow>
    </div>
  );
};

export default OrganizationAbout;
