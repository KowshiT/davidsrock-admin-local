import React, { FC } from "react";

interface OrgDashCardSkeletonProps {
  className?: string;
}

const OrgDashCardSkeleton: FC<OrgDashCardSkeletonProps> = (props) => {
  return (
    <>
      <div
        className="w-full flex justify-content-start flex-row flex-wrap justify-between"
      >
        <div className="pr-1">
          <div
            className="mt-6 orgListCard3 grid justify-items-center pt-4 !mb-5 transform transition duration-500 hover:scale-105 hover:cursor-pointer">
            <div className={`skeleton ${props.className} rounded-full`}></div>
            <div className=" skeleton skeleton-title rounded mt-1"></div>
          </div>
        </div>
      </div>
    </>
  );
};

export default OrgDashCardSkeleton;
