import { calenderImage } from "@/assetsLayer";
import { dateFormatForEvent, getDateFromString } from "@/helpers/dateHelpers";
import { SectionColumn } from "@/layouts/section";
import Image from "next/image";
import React, { useContext, useState, useEffect } from "react";

export interface eventProps {
  post: any;
  handleImageLoad: Function;
  isLoading: any;
}

const TimeLineEventCard: React.FC<eventProps> = (props) => {
  return (
    <div className="">
      <div className="flex w-full flex-row">
        <div className="w-30 !relative mr-2">
          <Image
            src={calenderImage}
            alt="Picture of the author"
            width={50}
            height={50}
          />
          <div className="eventPreviewMainText event-date-set">
            {getDateFromString(props.post?.startDate)}
          </div>
        </div>
        <SectionColumn className="event-right-content-wrapper mt-1">
          <button
            className="organizationDetailsMainText2"
            onClick={() =>
              window.open(`/${props?.post?.eventPublicUrl}`, "_blank")
            }
          >
            {props.post?.title}
          </button>
          <span className="eventCardTimeOrgCard">
            {dateFormatForEvent(props.post?.startDate)}
          </span>
        </SectionColumn>
      </div>
      <span className="PostDisText mt-2">
        {props.post?.description ? props.post?.description : ""}
      </span>

      <div className="py-4">
        <Image
          // loader ={() => LoginPageImage}
          src={props.post.imagePath}
          alt="Picture of the author"
          width={800}
          height={350}
          onLoad={props.handleImageLoad()}
          style={{ opacity: props.isLoading ? 0 : 1 }}
          className="timeline-img"
        />
      </div>
    </div>
  );
};
export default TimeLineEventCard;
