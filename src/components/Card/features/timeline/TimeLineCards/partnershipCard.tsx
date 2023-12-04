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

export interface PartnershipProfileProps {
  post: any;
}

const TimeLinePartnershipCard: React.FC<PartnershipProfileProps> = (props) => {
  return (
    <div className="">
      <span className="PostDisText mt-2">
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
          <p className="timelineDescription">
            We're thrilled to announce the birth of a powerful collaboration
            between <strong>{props.post.participant1Name}</strong> and{" "}
            <strong>{props.post.participant2Name}</strong>, giving rise to{" "}
            <strong>{props.post.title}</strong>. Join us in shaping a future of
            impactful initiatives and unforgettable experiences. Stay tuned for
            the extraordinary journey that awaits!
          </p>
        </>
      </span>

      <div className="flex w-full justify-center p-4">
        <div className="p-5 align-middle">
          <Image
            src={props.post.participant1Image}
            alt="Picture of the author"
            width={120}
            height={120}
            className="baseImage timeline-main-profile-img rounded-full ring ring-white"
          />
          <Image
            src={props.post.participant2Image}
            alt="Second image"
            width={120}
            height={120}
            className="overlayImage timeline-main-profile-img rounded-full ring ring-white"
          />
        </div>
      </div>
    </div>
  );
};
export default TimeLinePartnershipCard;
