import {
  calenderImage,
  emojiParty,
  placeholderImage,
  timelineVector,
} from "@/assetsLayer";
import { dateFormatForEvent, getDateFromString } from "@/helpers/dateHelpers";
import { SectionColumn } from "@/layouts/section";
import Image from "next/image";
import React, { useContext, useState, useEffect } from "react";

export interface publicProfileProps {
  post: any;
}

const TimeLinePublicProfileCard: React.FC<publicProfileProps> = (props) => {
  return (
    <div className="">
      <span className="PostDisText mt-2">
        {props.post.description ? (
          <>
            <p style={{ display: "inline-flex", alignItems: "center" }}>
              {props.post.description}
            </p>
          </>
        ) : (
          ""
        )}
      </span>

      <div className="w-full p-4">
        <div className="timeline-main-profile-container m-auto flex items-center justify-center rounded-full shadow-lg ring ring-white">
          <Image
            // loader={() => LoginPageImage}
            src={props.post.createdByImage || placeholderImage}
            alt="Picture of the author"
            width={120}
            height={120}
            className="timeline-large-profile-img m-auto rounded-full"
          />
        </div>
      </div>
    </div>
  );
};
export default TimeLinePublicProfileCard;
