import { cameraIcon, LiveR, placeholderImage, shearIcon } from "@/assetsLayer";
import RoundedButton from "../../../../../../components/Buttons/RoundedButtons";
import Section, { SectionColumn, SectionRow } from "@/layouts/section";
import Image from "next/image";
import React, { useState, useEffect } from "react";
import { getAllEventActionHandler } from "@/actionLayer/event/eventActions";
import { useAlerts } from "@/hooks/alertHook";
import Loader from "../../../../../../components/Modal/LoadingModal";
import { FormControlLabel, Switch } from "@mui/material";
import {
  convertDateTime,
  convertTo12HourFormat,
  dateFormatForEvent,
  getUserTimeZone,
} from "@/helpers/dateHelpers";
import { ModalOpenCloseContext } from "@/contexts/modalContext/modalOpenCloseContext";
import ShareModal from "../../../../../../components/Modal/share/ShareModal";
import {
  getId,
  getParticipantEntityId,
  getParticipantType,
} from "@/helpers/payloadHelper";
import { eventGoingActionHandler } from "@/actionLayer/going/goingActions";
import { getUserAccountType } from "@/helpers/authHelper";
import { displayParticipantCount } from "@/helpers/featureHelper";
import { AdminPanelContext } from "@/contexts/adminPanelContext/adminPanelContext";

export interface EventListViewProps {}
const EventListViewCard: React.FC<EventListViewProps> = (props) => {
  const { setAlert } = useAlerts();

  const [liveEvents, setLiveEvents] = useState<any>([]);
  const [otherEvents, setOtherEvents] = useState<any>([]);
  const [page, setPage] = useState(0);
  const [loaderOpen, setLoaderOpen] = useState(false);
  const [loaderText, setLoaderText] = useState("");
  const [showYourLiveEvents, setShowYourLiveEvents] = useState(false);
  const [showYourUpcomingEvents, setShowYourUpcomingEvents] = useState(false);
  const [eventUrl, setEventUrl] = useState("");
  const [loggedAccountType, setLoggedAccountType] = useState("");
  const [origin, setOrigin] = useState("");
  const [userCurrentTimeZone, setUserCurrentTimeZone] = useState("");

  const { shareModal, setShareModal } = React.useContext(ModalOpenCloseContext);
  const { showUserEvents, setShowUserEvents } =
    React.useContext(AdminPanelContext);

  useEffect(() => {
    const userTimeZone = getUserTimeZone();
    setUserCurrentTimeZone(userTimeZone);

    const originFromUrl = window.location.origin;
    setOrigin(originFromUrl);

    setLoggedAccountType(getUserAccountType());
    if (showUserEvents) {
      setShowYourLiveEvents(true);
      setShowYourUpcomingEvents(true);
    }
  }, []);

  useEffect(() => {
    setLoaderText("Please Wait...");
    setLoaderOpen(true);

    // Get all live events
    let liveEventValues = {
      page: 0,
      size: 3,
      eventType: "ALL",
      dateFilter: "live",
      userId: parseInt(localStorage.getItem("userId")),
      userIn: showUserEvents === true ? true : showYourLiveEvents,
    };

    getAllEventActionHandler(liveEventValues)
      .then((res: any) => {
        if (res?.responseCode === "00") {
          setLoaderOpen(false);
          setLiveEvents(res.eventEntityList);
        } else {
          setLoaderOpen(false);
          setAlert({
            message: "Error!",
            severity: "error",
          });
        }
        return res;
      })
      .catch((error) => {
        setLoaderOpen(false);
        setAlert({
          message: error,
          severity: "error",
        });
        return error;
      });

    // Get all upcoming events
    let upcomingEventValues = {
      page: page,
      size: 500,
      eventType: "ALL",
      dateFilter: "upcoming",
      userId: parseInt(localStorage.getItem("userId")),
      userIn: showUserEvents === true ? true : showYourUpcomingEvents,
      loggedProfileType: getUserAccountType(),
      loggedProfileId: getId(),
    };

    getAllEventActionHandler(upcomingEventValues)
      .then((res: any) => {
        if (res?.responseCode === "00") {
          setLoaderOpen(false);
          setOtherEvents(res.eventEntityList);
        } else {
          setLoaderOpen(false);
          setAlert({
            message: "Error!",
            severity: "error",
          });
        }
        return res;
      })
      .catch((error) => {
        setLoaderOpen(false);
        setAlert({
          message: error,
          severity: "error",
        });
        return error;
      });
  }, [showYourUpcomingEvents, showYourLiveEvents]);

  // const loadGetAllEvents = () => {
  //   setLoaderText("Please Wait...");
  //   setLoaderOpen(true);

  //   // Get all upcoming events
  //   let upcomingEventValues = {
  //     page: page + 1,
  //     size: 500,
  //     eventType: "ALL",
  //     dateFilter: "upcoming",
  //     userId: parseInt(localStorage.getItem("userId")),
  //     userIn: showYourUpcomingEvents,
  //   };

  //   console.log("page :>> ", page);

  //   getAllEventActionHandler(upcomingEventValues)
  //     .then((res: any) => {
  //       if (res?.responseCode === "00") {
  //         setLoaderOpen(false);
  //         const combinedArray = [...otherEvents, ...res.eventEntityList];
  //         console.log("combinedArray :>> ", combinedArray);
  //         setOtherEvents(combinedArray);
  //         setPage(page + 1);
  //       } else {
  //         setLoaderOpen(false);
  //         setAlert({
  //           message: "Error!",
  //           severity: "error",
  //         });
  //       }
  //       return res;
  //     })
  //     .catch((error) => {
  //       setLoaderOpen(false);
  //       setAlert({
  //         message: error,
  //         severity: "error",
  //       });
  //       return error;
  //     });
  // };

  const handleViewEventDetails = (url) => {
    window.open(`/${url}`, "_blank");
  };

  const handleUpcomingToggleChange = () => {
    setShowYourUpcomingEvents(!showYourUpcomingEvents);
    setPage(0);
  };

  const handleLiveToggleChange = () => {
    setShowUserEvents(false);
    setShowYourLiveEvents(!showYourLiveEvents);
  };

  const handleGoing = (eventId, index) => {
    let _eventList = [...otherEvents];
    const currentEvent = _eventList[index];

    currentEvent.isParticipant = currentEvent.isParticipant !== true;

    setOtherEvents(_eventList);

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
        ) : (
          <span className="eventSubText mt-1 text-center">
            No Participants yet
          </span>
        )}
      </>
    );
  };

  const eventCard = (
    {
      coverPhoto,
      eventName,
      startDate,
      eventType,
      publicUrl,
      eventId,
      isParticipant,
      participantCount,
      participantDetailList,
    },
    index: any
  ) => {
    return (
      <button
        className="eventCard-responsive !mt-5 transform rounded-lg border border-gray-200 bg-white shadow transition duration-500 hover:scale-105 hover:cursor-pointer dark:border-gray-700 dark:bg-gray-800"
        onClick={(e: any) => handleViewEventDetails(publicUrl)}
      >
        <Image
          alt="The guitarist in the concert."
          src={
            coverPhoto.includes("http")
              ? coverPhoto
              : "https://i.ibb.co/5xWCNf4/julian-wan-wm-Gzz2-Rt-A-g-unsplash.jpg"
          }
          width={2250}
          height={1390}
          className="eventCardImg"
        />
        <div className="p-5">
          <SectionRow className="mb-2 justify-between">
            <span className="eventCardTime">{`${dateFormatForEvent(
              convertDateTime(startDate, userCurrentTimeZone)
            )} AT ${convertTo12HourFormat(
              convertDateTime(startDate, userCurrentTimeZone).slice(11, 16)
            )}`}</span>
            <div className="">
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
          <SectionRow className="relative">
            <span className="eventUpcomingMainText mb-1">{eventName}</span>
          </SectionRow>
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
            {loggedAccountType !== "ORGANIZATION" &&
              loggedAccountType !== "PARTNERSHIP" && (
                <RoundedButton
                  ref={undefined}
                  onClick={(e) => {
                    e.stopPropagation();
                    handleGoing(eventId, index);
                  }}
                  className={isParticipant ? "GoingBTN2" : "GoingBTN"}
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
              className="ShearBTN ml-3"
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

  const liveEventCard = (
    image: any,
    eventName: string,
    eventType: string,
    url: string
  ) => {
    return (
      <button
        className="eventCard-responsive !mt-5 transform rounded-lg border border-gray-200 bg-white shadow transition duration-500 hover:scale-105 hover:cursor-pointer dark:border-gray-700 dark:bg-gray-800"
        onClick={(e: any) => handleViewEventDetails(url)}
      >
        <Image
          alt="The guitarist in the concert."
          src={
            image.includes("http")
              ? image
              : "https://i.ibb.co/HrJ3kHy/brooke-lark-j-UPOXXRNdc-A-unsplash.jpg"
          }
          width={2250}
          height={1390}
          className="eventCardImg"
        />
        <div className="p-5">
          <SectionRow className="relative">
            <SectionColumn className="justify-items-start">
              <span className="liveEventCardTime mb-2">HAPPENING NOW</span>
              <span className="liveEventMainText">{eventName}</span>
            </SectionColumn>
            <div className="absolute right-0">
              {eventType === "ONLINE" && (
                <Image
                  src={cameraIcon}
                  alt="Picture of the author"
                  width={35}
                  height={25}
                />
              )}
            </div>
          </SectionRow>
        </div>
      </button>
    );
  };

  return (
    <React.Fragment>
      <div className="homeRightMainSec pt-4 pb-4">
        <SectionColumn>
          <SectionRow className="relative justify-between">
            <SectionRow>
              <span className="dashboardMainText mr-4">
                Live Events happening now
              </span>
              <Image
                src={LiveR}
                alt="Picture of the author"
                width={35}
                height={25}
              />
            </SectionRow>
            <SectionRow className="justify-self-end">
              <p className="toggleBTN mr-5">Show your Live Events</p>
              <FormControlLabel
                control={
                  <Switch
                    checked={showYourLiveEvents}
                    onChange={(e: any) => handleLiveToggleChange()}
                    name="upcoming"
                  />
                }
                label=""
              />
            </SectionRow>
          </SectionRow>
          <Section className="event-card-container">
            {liveEvents.length > 0 ? (
              liveEvents?.map((event) =>
                liveEventCard(
                  event.coverPhoto,
                  event?.eventName,
                  event?.eventType,
                  event?.publicUrl
                )
              )
            ) : (
              <span className="eventMainText mt-8 ml-4">
                No results for live events
              </span>
            )}
          </Section>
        </SectionColumn>
        <br />
        <br />
        <br />
        <SectionColumn>
          <SectionRow className="relative justify-between">
            <span className="dashboardMainText">Upcoming Events</span>
            <SectionRow className="justify-self-end">
              <p className="toggleBTN mr-5">Show your Upcoming Events</p>
              <FormControlLabel
                control={
                  <Switch
                    checked={showYourUpcomingEvents}
                    onChange={(e: any) => handleUpcomingToggleChange()}
                    name="upcoming"
                  />
                }
                label=""
              />
            </SectionRow>
          </SectionRow>
          <div className="orgListContainer">
            {Array.isArray(otherEvents) && otherEvents.length > 0 ? (
              otherEvents?.map((event, index) => eventCard(event, index))
            ) : (
              <span className="eventMainText no-result-container-upcoming">
                No results for upcoming events
              </span>
            )}
          </div>
        </SectionColumn>
      </div>
      {shareModal && (
        <ShareModal url={eventUrl} title="Check out this Event!" />
      )}
      <Loader loaderText={loaderText} open={loaderOpen} />
    </React.Fragment>
  );
};

export default EventListViewCard;
