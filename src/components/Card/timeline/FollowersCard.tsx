import {
  AllIcon,
  animalRights,
  blackLArrow,
  blackPlusIcon,
  calenderImage,
  DR_Logo_04,
  foodRight,
  HumanRight,
  profilePic,
  laberRightss,
  politicalCampain,
  whiteRArrow,
} from "@/assetsLayer";
import { SectionColumn, SectionRow } from "@/layouts/section";
import Image from "next/image";
import { useRouter } from "next/router";
import React, { useContext, useEffect, useState } from "react";

export interface Props {}

const FollowersCard: React.FC<Props> = (props) => {
  const rendereventList = () => {
    return (
      <SectionColumn className="1/3 mt-4 space-x-3">
        <div className="mx-auto justify-center">
          <Image
            src={profilePic}
            alt="Picture of the author"
            width={50}
            height={50}
            className="rounded-full"
          />
        </div>
        <SectionColumn className="mt-1 justify-center align-middle">
          <span className="partnership-h5-black-text text-center">
            Cammie M.
          </span>
          <span className="partnership-p-gray-text">Member</span>
        </SectionColumn>
      </SectionColumn>
    );
  };

  return (
    <React.Fragment>
      <span className="timelineText01 pl-2">Members of Partnership</span>
      <div className="followersCardSec2 mt-4">
        <div className="flex flex-row flex-wrap">
          {rendereventList()}
          {rendereventList()}
          {rendereventList()}
          {rendereventList()}
          {rendereventList()}
          {rendereventList()}
        </div>
        <button
          className="common-gray-button mt-8 grid transform justify-items-center transition duration-500 hover:scale-105 hover:cursor-pointer"
          //onClick={(e: any) => handleViewEvent()}
        >
          <SectionRow className="mt-2">
            <span className="createItemText ml-4">View All</span>
          </SectionRow>
        </button>
      </div>
    </React.Fragment>
  );
};
export default FollowersCard;
