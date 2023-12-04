import { profilePic } from "@/assetsLayer";
import { SectionRow } from "@/layouts/section";
import Image from "next/image";
import React, { useState, useEffect } from "react";

export interface PartnershipMembersProps {
  //     events:any;
}

const PartnershipMembers: React.FC<PartnershipMembersProps> = (props) => {
  //   const [events, setEvents] = useState(props.events)

  const renderFolloersImages = () => {
    return (
      <div className="mr-4 grid justify-items-center">
        <Image
          // loader ={() => LoginPageImage}
          src={profilePic}
          alt="Picture of the author"
          width={65}
          height={65}
          className="mt-4 !mr-4"
        />
        <span className="eventViewDetailsMainText mt-2">Aaron K. Lee</span>
        <span className="eventViewDetailsSubText">Member</span>
      </div>
    );
  };

  return (
    <div className="orgDownMainSec">
      <SectionRow className="flex w-full items-start justify-center">
        <div className="">
          <div className="flex items-center justify-center">
            {renderFolloersImages()}
            {renderFolloersImages()}
            {renderFolloersImages()}
            {renderFolloersImages()}
            {renderFolloersImages()}
            {renderFolloersImages()}
            {renderFolloersImages()}
          </div>
        </div>
      </SectionRow>
    </div>
  );
};

export default PartnershipMembers;
