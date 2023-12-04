import { calenderImage, emojiParty, timelineVector } from "@/assetsLayer";
import { dateFormatForEvent, getDateFromString } from "@/helpers/dateHelpers";
import { SectionColumn } from "@/layouts/section";
import Image from "next/image";
import React, { useContext, useState, useEffect } from "react";

export interface organizationProps {
  post: any;
}

const TimeLineOrganizationCard: React.FC<organizationProps> = (props) => {
  return (
    <div className="">
      <span className="PostDisText mt-2">
        {props.post.description ? (
          <>
            <p className="timelineDescription flex flex-row">
              <strong> Exciting News </strong>
              <Image
                src={emojiParty}
                alt="Picture of the author"
                width={20}
                height={20}
                style={{ marginLeft: "5px" }}
              />
            </p>
            <p className="timelineDescription mt-1">
              We're proud to introduce <strong>{props.post.createdBy}</strong>,
              our newly established organization. Stay tuned for incredible
              journeys and impactful endeavors ahead!
            </p>
          </>
        ) : (
          ""
        )}
      </span>

      <div className="p-4">
        <Image
          // loader ={() => LoginPageImage}
          src={timelineVector}
          alt="Picture of the author"
          width={800}
          height={350}
          className="timeline-img"
        />
      </div>
    </div>
  );
};
export default TimeLineOrganizationCard;
