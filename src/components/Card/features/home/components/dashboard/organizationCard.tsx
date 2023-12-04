import { placeholderImage } from "@/assetsLayer";
import { AccountType } from "@/helpers/enumHelpers";
import Image from "next/image";
import React from "react";

export interface OrganizationCardProps {
  accountType: AccountType;
  handleViewOrg: Function;
  handleViewOrgPublicProfile: Function;
  publicUrl: any;
  profileImagePath: any;
  profileName: any;
}

const OrganizationCard: React.FC<OrganizationCardProps> = (props) => {
  return (
    <div className="w-full">
      <div
        className="orgListCard3 !mb-5 grid transform justify-items-center pt-4 transition duration-500 hover:scale-105 hover:cursor-pointer"
        onClick={(e: any) => {
          props.accountType === AccountType.ORGANIZATION
            ? props.handleViewOrg(props.publicUrl)
            : props.handleViewOrgPublicProfile(props.publicUrl);
        }}
      >
        <Image
          // loader ={() => LoginPageImage}
          src={
            props.profileImagePath && props.profileImagePath.includes("http")
              ? props.profileImagePath
              : placeholderImage
          }
          alt="Picture of the author"
          width={95}
          height={95}
          className="timelineFollowOrgProfileImage rounded-full"
        />
        <div className="orgListCardText">{props.profileName}</div>
      </div>
    </div>
  );
};
export default OrganizationCard;
