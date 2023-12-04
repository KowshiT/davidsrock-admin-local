import { placeholderImage, profilePic, starIcon } from "@/assetsLayer";
import { SectionColumn, SectionRow } from "@/layouts/section";
import Image from "next/image";
import React, { FC } from "react";
import RoundedButton from "../Buttons/RoundedButtons";

interface EventSkeletonProps {
  className?: any;
}

const PartnershipSkeleton: FC<EventSkeletonProps> = (props) => {
  return (
    <>
      {/* <div className="!mr-5 !mt-5 w-[370px] rounded-lg border border-gray-200 bg-white shadow dark:border-gray-700 dark:bg-gray-800">
        <div className="skeleton skeleton-event-image-dashboard w-full rounded"></div>
        <div className="p-5">
          <SectionRow className="relative">
            <div className=" skeleton skeleton-title mt-1 rounded"></div>
            <div className="skeleton skeleton-text rounded"></div>
            <div className="skeleton skeleton-sub-title mt-2 rounded "></div>
          </SectionRow>
        </div>
      </div> */}

      <div className="card cursor-pointer">
        <div className="skeleton skeleton-profile-image-container"></div>
        <div className="content">
          <SectionColumn></SectionColumn>
          <p className="skeleton skeleton-title "></p>
          <p className="skeleton skeleton-sub-title-short"></p>
          <div>
            <SectionColumn className="">
              <span className="skeleton skeleton-text"></span>
            </SectionColumn>
          </div>
        </div>
      </div>
    </>
  );
};

export default PartnershipSkeleton;
