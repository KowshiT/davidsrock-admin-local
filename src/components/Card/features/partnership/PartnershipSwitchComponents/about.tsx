import {
  categoryTypeEnumChangeHelper,
  formatEnumValue,
} from "@/helpers/enumChangeHelpers";
import { AccountType } from "@/helpers/enumHelpers";
import { organizationMockData } from "@/helpers/mock/mockData";
import { SectionRow } from "@/layouts/section";
import React, { useState, useEffect } from "react";

export interface PartnershipAboutProps {
  partnershipDetails: any;
  listOfProfiles: any;
  initialId: any;
}

const PartnershipAbout: React.FC<PartnershipAboutProps> = (props) => {
  const [selectedProfileId, setSelectedProfileId] = useState("");
  const [selectedUserProfile, setSelectedUserProfile] = useState(null);

  useEffect(() => {
    setSelectedProfileId(props?.listOfProfiles?.[0]?.profileId);
    setSelectedUserProfile(
      props.partnershipDetails?.partnershipDetailEntityList[0]
    );
  }, [props.listOfProfiles, props.partnershipDetails]);

  const handleSelectedUserProfile = (profileId: any) => {
    const selectedUser =
      props.partnershipDetails?.partnershipDetailEntityList.find(
        (detail: any) => detail.profile.profileId === selectedProfileId
      );

    setSelectedUserProfile(selectedUser);
  };

  useEffect(() => {
    if (selectedProfileId) {
      // Find the selected user's details based on profileId
      const selectedUser =
        props.partnershipDetails?.partnershipDetailEntityList.find(
          (detail: any) => detail.profile.profileId === selectedProfileId
        );

      setSelectedUserProfile(selectedUser);
    }
  }, [selectedProfileId]);

  return (
    <div className="orgDownMainSec">
      <div className="mb-5 flex w-full flex-row">
        {props.listOfProfiles &&
          Array.isArray(props.listOfProfiles) &&
          props.listOfProfiles.map((detail: any) => (
            <div
              className="mr-8 cursor-pointer"
              key={detail.profileId}
              onClick={(e: any) => {
                setSelectedProfileId(detail.profileId);
                handleSelectedUserProfile(detail.profileId);
              }}
            >
              <div
                className={
                  selectedProfileId === detail.profileId
                    ? "organizationDetailsOptionText2A-small mb-2"
                    : "organizationDetailsOptionText2-small  mb-2"
                }
              >
                {detail.profileName}
              </div>
              <div
                className={
                  selectedProfileId === detail.profileId ? "bottom-border" : ""
                }
              ></div>
            </div>
          ))}
      </div>
      <div className="organizationDetailsMainText2">Overview</div>

      <div className="previewEventSubTextTxt04 mb-4">
        {selectedUserProfile?.profile?.description
          ? selectedUserProfile?.profile?.description
          : ""}
      </div>

      <SectionRow>
        <span className="organizationDetailsMainText2 w-32">Phone</span>
        <span className="previewEventSubTextTxt04 mb-4">
          {selectedUserProfile?.profile?.mobile
            ? selectedUserProfile?.profile?.mobile
            : ""}
        </span>
      </SectionRow>
      <br />
      <SectionRow>
        <span className="organizationDetailsMainText2 w-32">Location</span>
        <span className="previewEventSubTextTxt04 mb-4">
          {" "}
          {selectedUserProfile?.profile?.location
            ? selectedUserProfile?.profile?.location
            : ""}
        </span>
      </SectionRow>
      <br />
      {selectedUserProfile?.profile?.profileType ===
        String(AccountType.ORGANIZATION) && (
        <div className="">
          <SectionRow>
            <span className="organizationDetailsMainText2 w-32">Industry</span>
            <span className="previewEventSubTextTxt04 mb-4">
              {" "}
              {selectedUserProfile?.profile?.organizationCategory
                ? formatEnumValue(
                    selectedUserProfile?.profile?.organizationCategory
                  )
                : ""}
            </span>
          </SectionRow>
          <br />
          <SectionRow>
            <span className="organizationDetailsMainText2 w-32">
              Company Size
            </span>
            <span className="previewEventSubTextTxt04 mb-4">
              {" "}
              {selectedUserProfile?.profile?.employeeCount
                ? selectedUserProfile?.profile?.employeeCount
                : ""}
            </span>
          </SectionRow>
          <br />
          <SectionRow>
            <span className="organizationDetailsMainText2 w-32">Founded</span>
            <span className="previewEventSubTextTxt04 mb-4">
              {selectedUserProfile?.profile.companyStartDate?.slice(0, 4)
                ? selectedUserProfile?.profile.companyStartDate?.slice(0, 4)
                : ""}
            </span>
          </SectionRow>
          <br />
        </div>
      )}
      {selectedUserProfile?.profile?.profileType ===
        String(AccountType.PUBLIC_PROFILE) && (
        <SectionRow>
          <span className="organizationDetailsMainText2 w-32">Work Place</span>
          <span className="previewEventSubTextTxt04 mb-4">
            {" "}
            {selectedUserProfile?.profile?.workPlace
              ? selectedUserProfile?.profile?.workPlace
              : ""}
          </span>
        </SectionRow>
      )}
    </div>
  );
};

export default PartnershipAbout;
