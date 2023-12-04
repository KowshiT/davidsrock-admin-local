import { SectionColumn, SectionRow } from "@/layouts/section";
import React, { FC } from "react";

interface LoadingSkeletonProps {
  count: number;
}

const TimelineOrgSkeleton: FC<LoadingSkeletonProps> = (props) => {
  return (
    <>
      {Array.from({ length: 5 }, (_, index) => (
        <div key={index}>
          <React.Fragment>
            <span className="mt-5">
              <div className="mt-4 hover:bg-gray-200 cursor-pointer rounded-md p-1">
                <SectionRow>
                  <div className="event-left-image-wrapper">
                    <div className="skeleton skeleton-timelineRecentJoinOrgProfileImage"></div>
                  </div>

                  <SectionColumn className="mt-2 pl-2 organization-middle-content-wrapper ">
                    <span className="skeleton skeleton-text-xxl mb-1"></span>
                    <span className="skeleton skeleton-text-s"></span>
                  </SectionColumn>
                  <div className="top-2 right-0 organization-right-content-wrapper my-auto ">
                    <div className="d-flex justify-content-end align-items-center my-auto">
                      <div className="skeleton-follow-button"></div>
                    </div>
                  </div>
                </SectionRow>
              </div>
            </span>
          </React.Fragment>
        </div>
      ))}
    </>
  );
};

export default TimelineOrgSkeleton;
