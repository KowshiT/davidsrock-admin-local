import { SectionRow } from "@/layouts/section";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import {
  cameraIcon,
  placeholderImage,
  shearIcon,
} from "@/assetsLayer";
import RoundedButton from "../../../../Buttons/RoundedButtons";
import { getAllEventActionHandler } from "@/actionLayer/event/eventActions";
import { useAlerts } from "@/hooks/alertHook";
import { AccountType } from "@/helpers/enumHelpers";
import { ModalOpenCloseContext } from "@/contexts/modalContext/modalOpenCloseContext";
import ShareModal from "../../../../../components/Modal/share/ShareModal";
import { eventGoingActionHandler } from "@/actionLayer/going/goingActions";
import { getParticipantEntityId, getParticipantType } from "@/helpers/payloadHelper";
import { displayParticipantCount } from "@/helpers/featureHelper";
import { convertDateTime, convertTo12HourFormat, dateFormatForEvent, getUserTimeZone } from "@/helpers/dateHelpers";
import { getUserAccountType } from "@/helpers/authHelper";

export interface PartnershipEventsProps {
  isCreator: any;
}

const PartnershipEvents: React.FC<PartnershipEventsProps> = (props) => {

  const { setAlert } = useAlerts();
  const [events, setEvents] = useState([]);
  const [origin, setOrigin] = useState("");
  const [eventUrl, setEventUrl] = useState("");
  const [userCurrentTimeZone, setUserCurrentTimeZone] = useState("");
  const [userAccountType, setUserAccountType] = useState("")

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
      profileType: [String(AccountType.PARTNERSHIP)],
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

  const handleViewEventDetails = (url: string) => {
    window.open(`/${url}`, "_blank");
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
        ) :
          <span className="eventSubText text-center mt-1">No Participants yet</span>
        }
      </>
    )
  }

  const eventCard = ({ eventName, eventId, startDate, eventType, coverPhoto, publicUrl, isParticipant, participantDetailList, participantCount }, index: any) => {
    return (
      <button
        className="eventCard text-left !mr-5 !mt-5 transform rounded-lg border border-gray-200 bg-white shadow transition duration-500 hover:scale-105 hover:cursor-pointer dark:border-gray-700 dark:bg-gray-800"
        onClick={(e: any) => handleViewEventDetails(publicUrl)}
      >
        <Image
          alt="The guitarist in the concert."
          src={coverPhoto}
          width={2250}
          height={1390}
          className="eventCardImg"
        // layout="responsive"
        />
        <div className="p-5">
          <span className="eventCardTime">
            {`${dateFormatForEvent(convertDateTime(startDate, userCurrentTimeZone))} AT ${convertTo12HourFormat(convertDateTime(startDate, userCurrentTimeZone).slice(11, 16))}`}
          </span>
          {/* <span className="eventCardTime">SUN, 17 JAN AT 17:00 UTC +05:30</span> */}
          <br />
          <SectionRow className="relative">
            <span className="eventMainText">{eventName}</span>
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
            {displayParticipants(participantDetailList)}
            <RoundedButton
              ref={undefined}
              onClick={undefined}
              className="eventCardCount ml-3 p-1"
            >
              {displayParticipantCount(participantCount)}
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
            {(userAccountType !== "ORGANIZATION" && userAccountType !== "PARTNERSHIP") && (
              <RoundedButton
                ref={undefined}
                onClick={(e) => {
                  e.stopPropagation();
                  handleGoing(eventId, index);
                }}
                className={isParticipant ? "GoingBTN2 mr-3" : "GoingBTN mr-3"}
              >
                <span>Going</span>
              </RoundedButton>
            )}
            <RoundedButton
              ref={undefined}
              onClick={(e: any) => {
                e.stopPropagation();
                setEventUrl(`${origin}/${publicUrl}`);
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
      {events?.length > 0 ? (
        events.map((event, i) =>
          eventCard(event, i)
        )
      ) : (
        <div className=" mt-8 mb-8 grid w-full justify-items-center">
          <span className="eventMainText mt-4">{props.isCreator ? "You don't have any events created" : "Not yet any events"}</span>
        </div>
      )}
      {shareModal && <ShareModal url={eventUrl} title="Check out this Event!" />}
    </div>
  );
};

export default PartnershipEvents;
