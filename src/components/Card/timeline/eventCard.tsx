import React, { useState, useEffect } from "react";
import { calenderImage } from "@/assetsLayer";
import { convertDateTime, dateFormatForEvent, getDateFromString, getUserTimeZone } from "@/helpers/dateHelpers";
import { stringCrop } from "@/helpers/stringCrop";
import { SectionColumn, SectionRow } from "@/layouts/section";
import Image from "next/image";
import { useRouter } from "next/router";

export interface Props {
  eventList: any;
}

const EventCard: React.FC<Props> = (props) => {
  const [userCurrentTimeZone, setUserCurrentTimeZone] = useState("");

  const router = useRouter();

  useEffect(() => {
    const userTimeZone = getUserTimeZone();
    setUserCurrentTimeZone(userTimeZone);
  }, [])

  const renderEventList = (event: any) => {
    return (
      <SectionRow className="mt-1">
        <div className="!relative ml-2 mr-2">
          <Image
            src={calenderImage}
            alt="Picture of the author"
            width={50}
            height={50}
          />
          <div className="eventPreviewMainText absolute right-5 top-0  mt-5">
            {getDateFromString(event?.startDate)}
          </div>
        </div>
        <SectionColumn className="mt-1">
          <span className="organizationDetailsMainText2">
            {stringCrop(event?.eventName, 28)}
          </span>
          <span className="eventCardTimeOrgCard">
            {`${dateFormatForEvent(convertDateTime(event?.startDate, userCurrentTimeZone))}`}
          </span>
        </SectionColumn>
      </SectionRow>
    );
  };

  return (
    <React.Fragment>
      <span className="timelineText01  pl-2">Upcoming Events</span>
      <div className="followersCardSec3 mt-4 flex flex-col">
        <div className="">
          {props.eventList && props.eventList.length > 0 ? (
            props.eventList?.map((event) => {
              return renderEventList(event);
            })
          ) : (
            <p className="h3-dark-gray-13-text mt-5">No Events</p>
          )}
        </div>
        {props.eventList && props.eventList.length > 0 && (
          <button
            className="createOrgnzBTN mt-8 grid transform justify-items-center transition duration-500 hover:scale-105 hover:cursor-pointer"
            onClick={(e: any) => router.push("/dashboard/eventListView")}
          >
            <SectionRow className="mt-2">
              <span className="createItemText ml-4">See All Events</span>
            </SectionRow>
          </button>
        )}
      </div>
    </React.Fragment>
  );
};
export default EventCard;
