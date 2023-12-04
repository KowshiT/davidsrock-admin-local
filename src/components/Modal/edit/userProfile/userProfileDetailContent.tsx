import { capitalizedFormat, formatInterests } from "@/helpers/stringCrop";
import { SectionColumn } from "@/layouts/section";
import React from "react";

export interface UserProfileDetailContentProps {
  details: any;
}

const UserProfileDetailContent: React.FC<UserProfileDetailContentProps> = (
  props
) => {
  return (
    <React.Fragment>
      <SectionColumn className="mt-5 w-full">
        <div className="flex flex-row flex-wrap">
          <div className="edit-detail-content-left">
            <p className="h3-black-14-text-left">Full Name</p>
          </div>
          <div className="mx-1">
            <p className="h3-black-14-text-left">:</p>
          </div>
          <div className="edit-detail-description">
            <p className="dark-gray-14-text-500-left">
              {props?.details?.fullName || ""}
            </p>
          </div>
        </div>

        <div className="mt-2 flex flex-row flex-wrap">
          <div className="edit-detail-content-left">
            <p className="h3-black-14-text-left">Interests</p>
          </div>
          <div className="mx-1">
            <p className="h3-black-14-text-left">:</p>
          </div>
          <div className="edit-detail-description">
            <p className="dark-gray-14-text-500-left">
              {formatInterests(props?.details?.interestEntities) || ""}
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
              {props?.details?.contactNo || ""}
            </p>
          </div>
        </div>
      </SectionColumn>
    </React.Fragment>
  );
};

export default UserProfileDetailContent;
