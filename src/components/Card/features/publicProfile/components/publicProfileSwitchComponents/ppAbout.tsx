import { organizationMockData } from "@/helpers/mock/mockData";
import { SectionRow } from "@/layouts/section";
import React, { useEffect } from "react";

export interface PublicProfileAboutProps {
  publicProfileDetails: any;
}

const PublicProfileAbout: React.FC<PublicProfileAboutProps> = (props) => {
  useEffect(() => {
    console.log("props.publicProfileDetails :>> ", props.publicProfileDetails);
  }, []);

  return (
    <div className="ppDownMainSec ">
      <div className="organizationDetailsMainText2">Overview</div>
      <br />
      <div className=" mb-4">
        <p className="previewEventSubTextTxt04">
          {props.publicProfileDetails?.profile?.description
            ? props.publicProfileDetails?.profile?.description
            : organizationMockData.discription}
        </p>
      </div>
      <br />
      <br />
      <SectionRow>
        <span className="organizationDetailsMainText2 ">Phone</span>
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{" "}
        <span className="previewEventSubTextTxt04 mb-4">
          {props.publicProfileDetails?.profile?.mobile
            ? props.publicProfileDetails?.profile?.mobile
            : organizationMockData.phone}
        </span>
      </SectionRow>
      <br />
      <SectionRow>
        <span className="organizationDetailsMainText2 ">Location</span>
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{" "}
        <span className="previewEventSubTextTxt04 mb-4">
          {props.publicProfileDetails?.profile?.location
            ? props.publicProfileDetails?.profile?.location
            : organizationMockData.location}
        </span>
      </SectionRow>
      <br />
      <SectionRow>
        <span className="organizationDetailsMainText2 ">Work Place</span>
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{" "}
        <span className="previewEventSubTextTxt04 mb-4">
          {props.publicProfileDetails?.workPlace
            ? props.publicProfileDetails?.workPlace
            : organizationMockData.founded}
        </span>
      </SectionRow>
    </div>
  );
};

export default PublicProfileAbout;
