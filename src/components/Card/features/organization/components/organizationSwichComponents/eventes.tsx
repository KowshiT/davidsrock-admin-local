import { SectionRow } from "@/layouts/section";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import { cameraIcon, placeholderImage, shearIcon } from "@/assetsLayer";
import RoundedButton from "../../../../../../components/Buttons/RoundedButtons";
import { getAllEventActionHandler } from "@/actionLayer/event/eventActions";
import { useAlerts } from "@/hooks/alertHook";
import { displayParticipantCount } from "@/helpers/featureHelper";
import { eventGoingActionHandler } from "@/actionLayer/going/goingActions";
import {
  getId,
  getParticipantEntityId,
  getParticipantType,
} from "@/helpers/payloadHelper";
import { getUserAccountType } from "@/helpers/authHelper";
import { ModalOpenCloseContext } from "@/contexts/modalContext/modalOpenCloseContext";
import ShareModal from "../../../../../../components/Modal/share/ShareModal";
import { convertDateTime, convertTo12HourFormat, dateFormatForEvent, getUserTimeZone } from "@/helpers/dateHelpers";

export interface OrganizationEventsProps {
  isCreator?: any;
}

const OrganizationEvents: React.FC<OrganizationEventsProps> = (props) => {
  const { setAlert } = useAlerts();
  const [events, setEvents] = useState([]);
  const [origin, setOrigin] = useState("");
  const [eventUrl, setEventUrl] = useState("");
  const [userCurrentTimeZone, setUserCurrentTimeZone] = useState("");
  const [userAccountType, setUserAccountType] = useState("");

  const { shareModal, setShareModal } = React.useContext(ModalOpenCloseContext);

  useEffect(() => {
    const userTimeZone = getUserTimeZone();
    setUserCurrentTimeZone(userTimeZone);
    setUserAccountType(getUserAccountType());

    const originFromUrl = window.location.origin;
    setOrigin(originFromUrl);

    const currentUrl = window.location.href;

    // Get all upcoming events
    let upcomingEventValues = {
      page: 0,
      size: 5,
      eventType: "ALL",
      dateFilter: "upcoming",
      publicUrl: currentUrl,
      profileType: ["ORGANIZATION", "PUBLIC_PROFILE"],
      loggedProfileType: getUserAccountType(),
      loggedProfileId: getId(),
    };

    getAllEventActionHandler(upcomingEventValues)
      .then((res: any) => {
        if (res?.responseCode === "00") {
          console.log("res responseMessage :>> ", res);
          setEvents(res.eventEntityList.slice(0, 3));
        } else {
          setAlert({
            message: "Error!",
            severity: "error",
          });
        }
        return res;
      })
      .catch((error) => {
        setAlert({
          message: error,
          severity: "error",
        });
        return error;
      });
  }, []);

  const handleViewEventDetails = (url) => {
    window.open(`/${url}`, "_blank");
  };

  const displayParticipants = (participantDetailList) => {
    return (
      <>
        {participantDetailList.length > 0 ? (
          participantDetailList.map((participant) => (
            <Image
              key={participant?.userprofileId}
              src={participant?.profileImagePath || placeholderImage}
              alt="Picture of the author"
              width={25}
              height={25}
              className="participantProfileImage"
            />
          ))
        ) : (
          <span className="eventSubText mt-1 text-center">
            No Participants yet
          </span>
        )}
      </>
    );
  };

  const handleGoing = (eventId, index) => {
    let _eventList = [...events];
    const currentEvent = _eventList[index];

    currentEvent.isParticipant = currentEvent.isParticipant !== true;

    setEvents(_eventList);

    let goingValues = {
      eventId: eventId,
      participantEntityId: getParticipantEntityId(),
      participantType: getParticipantType(),
      isParticipant: currentEvent.isParticipant,
    };

    eventGoingActionHandler(goingValues)
      .then((res: any) => {
        if (res?.responseCode === "00") {
          console.log(res, "res");
        } else {
          setAlert({
            message: res?.responseCode || "Error!",
            severity: "error",
          });
        }
        return res;
      })
      .catch((error) => {
        setAlert({
          message: error,
          severity: "error",
        });
        return error;
      });
  };

  const eventCard = (
    name: string,
    startDateTime: any,
    eventType: any,
    image: any,
    url: string,
    event: any,
    index: any
  ) => {
    return (
      <button
        className="eventCard-detail-view !mt-5 transform rounded-lg border border-gray-200 bg-white text-left shadow transition duration-500 hover:scale-105 hover:cursor-pointer dark:border-gray-700 dark:bg-gray-800"
        onClick={(e: any) => handleViewEventDetails(url)}
      >
        <Image
          alt="The guitarist in the concert."
          src={image}
          width={2250}
          height={1390}
          className="eventCardImg"
        // layout="responsive"
        />
        <div className="p-5">
          <span className="eventCardTime">
            {`${dateFormatForEvent(convertDateTime(startDateTime, userCurrentTimeZone))} AT ${convertTo12HourFormat(convertDateTime(startDateTime, userCurrentTimeZone).slice(11, 16))}`}
          </span>
          {/* <span className="eventCardTime">SUN, 17 JAN AT 17:00 UTC +05:30</span> */}
          <br />
          <SectionRow className="relative">
            <span className="eventMainText !text-left">{name}</span>
            <div className="absolute right-0">
              {eventType === "ONLINE" && (
                <Image
                  src={cameraIcon}
                  alt="Picture of the author"
                  width={28}
                  height={28}
                />
              )}
            </div>
          </SectionRow>
          <span className="eventSubText">{/* by Louise J. Verduzco */}</span>
          <SectionRow className="mt-2">
            {displayParticipants(event.participantDetailList)}
            <RoundedButton
              ref={undefined}
              onClick={undefined}
              className="eventCardCount ml-3 p-1"
            >
              {displayParticipantCount(event.participantCount)}
            </RoundedButton>
          </SectionRow>
          <SectionRow className="mt-4">
            {/* <RoundedButton
              ref={undefined}
              onClick={undefined}
              className="InterestedBTN"
            >
              <SectionRow className="ml-2">
                <Image
                  src={starIcon}
                  alt="Picture of the author"
                  width={25}
                  height={25}
                />
                <span className="InterestedTEXT">Interested</span>
              </SectionRow>
            </RoundedButton> */}
            {userAccountType !== "ORGANIZATION" &&
              userAccountType !== "PARTNERSHIP" && (
                <RoundedButton
                  ref={undefined}
                  onClick={(e) => {
                    e.stopPropagation();
                    handleGoing(event.eventId, index);
                  }}
                  className={
                    event?.isParticipant ? "GoingBTN2 mr-3" : "GoingBTN mr-3"
                  }
                >
                  <span>Going</span>
                </RoundedButton>
              )}
            <RoundedButton
              ref={undefined}
              onClick={(e: any) => {
                e.stopPropagation();
                setEventUrl(`${origin}/${url}`);
                setShareModal(true);
              }}
              className="ShearBTN"
            >
              <Image
                src={shearIcon}
                alt="Picture of the author"
                width={28}
                height={28}
              />
            </RoundedButton>
          </SectionRow>
        </div>
      </button>
    );
  };

  return (
    <div className="orgDownMainSec">
      {events.length > 0 ? (
        events.map((event, i) =>
          eventCard(
            event.eventName,
            event.startDate,
            event.eventType,
            event?.coverPhoto,
            event?.publicUrl,
            event,
            i
          )
        )
      ) : (
        <div className=" mt-8 mb-8 grid w-full justify-items-center">
          <span className="eventMainText mt-4">
            {props.isCreator
              ? "You don't have any events created"
              : "Not yet any events"}{" "}
          </span>
        </div>
      )}
      {shareModal && (
        <ShareModal url={eventUrl} title="Check out this Event!" />
      )}
    </div>
  );
};

export default OrganizationEvents;
