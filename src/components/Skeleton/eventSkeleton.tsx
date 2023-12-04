import { placeholderImage, profilePic, starIcon } from "@/assetsLayer";
import { SectionColumn, SectionRow } from "@/layouts/section";
import Image from "next/image";
import React, { FC } from "react";
import RoundedButton from "../Buttons/RoundedButtons";

interface EventSkeletonProps {
  className?: any;
}

const EventSkeleton: FC<EventSkeletonProps> = (props) => {
  return (
    <>
      <div className="w-[370px] bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 !mr-5 !mt-5">
        <div className="skeleton w-full skeleton-event-image-dashboard rounded"></div>
        <div className="p-5">
          <SectionRow className="relative">
            <div className=" skeleton skeleton-title rounded mt-1"></div>
            <div className="skeleton skeleton-text rounded"></div>
            <div className="skeleton skeleton-sub-title rounded mt-2 "></div>
          </SectionRow>
        </div>
      </div>
    </>
  );
};

export default EventSkeleton;
