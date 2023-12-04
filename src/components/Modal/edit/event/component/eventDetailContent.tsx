import {
  dateFormatForTimeLine,
} from "@/helpers/dateHelpers";
import { capitalizedFormat } from "@/helpers/stringCrop";
import { SectionColumn } from "@/layouts/section";
import React from "react";

export interface EventDetailContentProps {
  details: any;
}

const EventDetailContent: React.FC<EventDetailContentProps> = (props) => {
  return (
    <SectionColumn className="mt-5 w-full">
      <div className="flex flex-row flex-wrap">
        <div className="edit-detail-content-left">
          <p className="h3-black-14-text-left">Event Name</p>
        </div>
        <div className="mx-1">
          <p className="h3-black-14-text-left">:</p>
        </div>
        <div className="edit-detail-description">
          <p className="dark-gray-14-text-500-left">
            {props?.details?.eventName || ""}
          </p>
        </div>
      </div>

      <div className="mt-2 flex flex-row flex-wrap">
        <div className="edit-detail-content-left">
          <p className="h3-black-14-text-left">Start Date & Time</p>
        </div>
        <div className="mx-1">
          <p className="h3-black-14-text-left">:</p>
        </div>
        <div className="edit-detail-description">
          <p className="dark-gray-14-text-500-left">
            {dateFormatForTimeLine(props?.details?.startDate) || ""}
          </p>
        </div>
      </div>

      <div className="mt-2 flex flex-row flex-wrap">
        <div className="edit-detail-content-left">
          <p className="h3-black-14-text-left">End date & Time</p>
        </div>
        <div className="mx-1">
          <p className="h3-black-14-text-left">:</p>
        </div>
        <div className="edit-detail-description">
          <p className="dark-gray-14-text-500-left">
            {dateFormatForTimeLine(props?.details?.endDate) || ""}
          </p>
        </div>
      </div>

      <div className="mt-2 flex flex-row flex-wrap">
        <div className="edit-detail-content-left">
          <p className="h3-black-14-text-left">Time Zone</p>
        </div>
        <div className="mx-1">
          <p className="h3-black-14-text-left">:</p>
        </div>
        <div className="edit-detail-description">
          <p className="dark-gray-14-text-500-left">
            {props?.details?.timeZone || ""}
          </p>
        </div>
      </div>

      <div className="mt-2 flex flex-row flex-wrap">
        <div className="edit-detail-content-left">
          <p className="h3-black-14-text-left">Event Type</p>
        </div>
        <div className="mx-1">
          <p className="h3-black-14-text-left">:</p>
        </div>
        <div className="edit-detail-description">
          <p className="dark-gray-14-text-500-left">
            {capitalizedFormat(props?.details?.eventType) || ""}
          </p>
        </div>
      </div>
      <div className="mt-2 flex flex-row flex-wrap">
        <div className="edit-detail-content-left">
          <p className="h3-black-14-text-left">Description</p>
        </div>
        <div className="mx-1">
          <p className="h3-black-14-text-left">:</p>
        </div>
        <div className="edit-detail-description">
          <p className="dark-gray-14-text-500-left">
            {props?.details?.description || ""}
          </p>
        </div>
      </div>
      {props?.details?.eventType === "PHYSICAL" && (
        <div className="mt-2 flex flex-row flex-wrap">
          <div className="edit-detail-content-left">
            <p className="h3-black-14-text-left">Location</p>
          </div>
          <div className="mx-1">
            <p className="h3-black-14-text-left">:</p>
          </div>
          <div className="edit-detail-description">
            <p className="dark-gray-14-text-500-left">
              {props?.details?.location || ""}
            </p>
          </div>
        </div>
      )}
      <div className="mt-2 flex flex-row flex-wrap">
        <div className="edit-detail-content-left">
          <p className="h3-black-14-text-left">
            {props?.details?.eventType === "PHYSICAL"
              ? "Location Link"
              : "Link"}
          </p>
        </div>
        <div className="mx-1">
          <p className="h3-black-14-text-left">:</p>
        </div>
        <div className="edit-detail-description">
          <p className="dark-gray-14-text-500-left">
            {props?.details?.link || ""}
          </p>
        </div>
      </div>

      <div className="mt-2 flex flex-row flex-wrap">
        <div className="edit-detail-content-left">
          <p className="h3-black-14-text-left">Event Fee</p>
        </div>
        <div className="mx-1">
          <p className="h3-black-14-text-left">:</p>
        </div>
        <div className="edit-detail-description">
          <p className="dark-gray-14-text-500-left">
            {props?.details?.isEventFee ? props?.details?.eventFee : "Free"}
          </p>
        </div>
      </div>

      <div className="mt-2 flex flex-row flex-wrap">
        <div className="edit-detail-content-left">
          <p className="h3-black-14-text-left">Attendee Limit</p>
        </div>
        <div className="mx-1">
          <p className="h3-black-14-text-left">:</p>
        </div>
        <div className="edit-detail-description">
          <p className="dark-gray-14-text-500-left">
            {props?.details?.isAttendeeLimit
              ? props?.details?.attendeeLimit
              : "No"}
          </p>
        </div>
      </div>

      <div className="mt-2 flex flex-row flex-wrap">
        <div className="edit-detail-content-left">
          <p className="h3-black-14-text-left">Allow Guests</p>
        </div>
        <div className="mx-1">
          <p className="h3-black-14-text-left">:</p>
        </div>
        <div className="edit-detail-description">
          <p className="dark-gray-14-text-500-left">
            {props?.details?.isAllowGuest ? "Yes" : "No"}
          </p>
        </div>
      </div>
    </SectionColumn>
  );
};

export default EventDetailContent;
