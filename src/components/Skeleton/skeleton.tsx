import { SectionColumn, SectionRow } from "@/layouts/section";
import React, { FC } from "react";

interface LoadingSkeletonProps {
  count: number;
}

const LoadingSkeleton: FC<LoadingSkeletonProps> = (props) => {
  return (
    <>
      {Array.from({ length: 5 }, (_, index) => (
        <div key={index}>
          <div className="skeleton-postMainDiv my-3">
            <SectionRow className="p-4">
              <div className="skeleton skeleton-timelinePostProfileImage"></div>

              <SectionColumn className="mt-2 ml-2">
                <SectionRow className="">
                  <div className="skeleton skeleton-text-s"></div>
                </SectionRow>
                <SectionRow>
                  <div className="skeleton skeleton-text-xs"></div>
                </SectionRow>
              </SectionColumn>
            </SectionRow>
            <div className="postline01"></div>
            <SectionColumn className="p-4 mb-2 skeleton-height-div">
              <div className="skeleton skeleton-text-xxl"></div>
            </SectionColumn>

            <div className="postline01"></div>
            <SectionRow className="pl-4 pt-2 pb-2 justify-center items-center">
              <div className="cursor-pointer flex flex-row"></div>
            </SectionRow>
          </div>
        </div>
      ))}
    </>
  );
};

export default LoadingSkeleton;
