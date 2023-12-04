import RoundedButton from "../../../../components/Buttons/RoundedButtons";
import Section, { SectionColumn, SectionRow } from "@/layouts/section";
import Image from "next/image";
import React, { useState, useEffect } from "react";
import {
  blackPlusIcon,
  calenderImage,
  cameraGrayImage,
  cameraIcon,
  erthImage,
  share,
  shearIcon,
  timeImage,
  userImage,
  building,
  goingImage,
  placeholderImage,
} from "@/assetsLayer";
import { getAllEventActionHandler } from "@/actionLayer/event/eventActions";
import { useAlerts } from "@/hooks/alertHook";
import { getIdFromUrl, stringCrop } from "@/helpers/stringCrop";
import { getEventByIdApi } from "@/api/event/eventApis";
import Loader from "../../../../components/Modal/LoadingModal";
import {
  convertDateTime,
  convertTo12HourFormat,
  dateFormatForEvent,
  getDateFromString,
  getUserTimeZone,
  convertDateTimeToUserTimeZone,
  timeZoneValueFormat,
} from "@/helpers/dateHelpers";
import { ModalOpenCloseContext } from "@/contexts/modalContext/modalOpenCloseContext";
import ShareModal from "../../../../components/Modal/share/ShareModal";
import { RiEdit2Fill } from "react-icons/ri";
import EditDetailsEventModal from "../../../../components/Modal/edit/event/editDetailsEventModal";
import EventDetailContent from "../../../../components/Modal/edit/event/component/eventDetailContent";
import {
  eventGoingActionHandler,
  getEventGoingCountActionHandler,
  getEventParticipantDetailsActionHandler,
} from "@/actionLayer/going/goingActions";
import {
  getProfileId,
  getUserAccountType,
  getUserIdFromStorage,
} from "@/helpers/authHelper";
import { getId } from "@/helpers/payloadHelper";
import { displayParticipantCount } from "@/helpers/featureHelper";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import GroupsIcon from '@mui/icons-material/Groups';
import { FaMoneyBillWave } from "react-icons/fa";

export interface EventDetailsViewProps { }

const EventDetailsView: React.FC<EventDetailsViewProps> = (props) => {
  const { setAlert } = useAlerts();

  const [otherEvents, setOtherEvents] = useState<any>([]);
  const [eventEntity, setEventEntity] = useState<any>({});
  const [eventCoverPhoto, setEventCoverPhoto] = useState("");
  const [eventId, setEventId] = useState<any>("");
  const [loaderOpen, setLoaderOpen] = useState(false);
  const [url, setUrl] = useState("");
  const [isCreator, setIsCreator] = useState(false);
  const [isGoing, setIsGoing] = useState(false);
  const [participantCount, setParticipantCount] = useState(0);
  const [initParticipantCount, setInitParticipantCount] = useState(0);
  const [initGoingState, setInitGoingState] = useState(false);
  const [loggedAccountType, setLoggedAccountType] = useState("");
  const [participantDetails, setParticipantDetails] = useState<any>({});
  const [isLoading, setIsLoading] = useState(true);
  const [isUserLogged, setIsUserLogged] = useState(false);
  const [origin, setOrigin] = useState("");
  const [userCurrentTimeZone, setUserCurrentTimeZone] = useState("");
  const [formattedStartDateWithZone, setFormattedStartDateWithZone] = useState("");

  const { setShareModal, setEditDetailsEventModal } = React.useContext(ModalOpenCloseContext);

  const getParticipantEntityId = () => {
    if (getUserAccountType() === "INITIAL") {
      return getUserIdFromStorage();
    } else if (getUserAccountType() === "PUBLIC_PROFILE") {
      return getProfileId();
    } else {
      return null;
    }
  };

  const getParticipantType = () => {
    if (getUserAccountType() === "INITIAL") {
      return "INITIAL";
    } else if (getUserAccountType() === "PUBLIC_PROFILE") {
      return "PUBLIC_PROFILE";
    } else {
      return null;
    }
  };

  useEffect(() => {
    const userTimeZone = getUserTimeZone();
    setUserCurrentTimeZone(userTimeZone);

    const originFromUrl = window.location.origin;
    setOrigin(originFromUrl);

    if (getUserIdFromStorage()) {
      setIsUserLogged(true);
    } else {
      setIsUserLogged(false);
    }
  }, [])

  useEffect(() => {
    setLoaderOpen(true);
    setLoggedAccountType(getUserAccountType());

    // Get event details
    const currentUrl = window.location.href;
    getIdFromUrl(currentUrl);
    setEventId(getIdFromUrl(currentUrl));
    setUrl(currentUrl);

    getEventByIdApi(getIdFromUrl(currentUrl))
      .then((res: any) => {
        setLoaderOpen(false);

        setEventCoverPhoto(res.eventEntity.coverPhoto);
        setEventEntity(res.eventEntity);
        let startDateWithTimeZone = res.eventEntity.startDate + res.eventEntity.timeZone.slice(4, 10);
        let userTimeZone = timeZoneValueFormat(getUserTimeZone());

        console.log('userTimeZone :>> ', userTimeZone);
        console.log('startDateWithTimeZone :>> ', startDateWithTimeZone);
        let convertedDateTime = convertDateTimeToUserTimeZone(startDateWithTimeZone, userTimeZone).slice(0, 19);
        setFormattedStartDateWithZone(convertedDateTime);

        if (
          res?.eventEntity?.profile?.profileId === getProfileId() &&
          res?.eventEntity?.profile?.profileType === getUserAccountType()
        ) {
          setIsCreator(true);
        }
        console.log("res :>> ", res);
        setEventCoverPhoto(res.eventEntity.coverPhoto);
        setEventEntity(res.eventEntity);

        let goingValue = {
          eventId: res.eventEntity.eventId,
          participantEntityId: getParticipantEntityId(),
          participantType: getParticipantType(),
        };

        getEventGoingCountActionHandler(goingValue)
          .then((res: any) => {
            if (res?.responseCode === "00") {
              console.log("going res :>> ", res);
              setIsGoing(res?.isParticipant);
              setInitGoingState(res?.isParticipant);
              setParticipantCount(res?.participantCount);
              setInitParticipantCount(res?.participantCount);
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

        let getParticipantValue = {
          eventId: res?.eventEntity?.eventId,
          page: 0,
          size: 1000,
        };

        getEventParticipantDetailsActionHandler(getParticipantValue)
          .then((res: any) => {
            if (res?.responseCode === "00") {
              console.log("participant res :>> ", res?.profileDetailList);
              setParticipantDetails(res?.profileDetailList);
              setIsLoading(false);
            } else {
              setAlert({
                message: "Network Error!",
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
      page: 0,
      size: 4,
      eventType: "ALL",
      dateFilter: "upcoming",
      loggedProfileType: getUserAccountType(),
      loggedProfileId: getId(),
    };

    getAllEventActionHandler(upcomingEventValues)
      .then((res: any) => {
        if (res?.responseCode === "00") {
          setOtherEvents(
            res.eventEntityList
              .filter((event) => event.eventId !== getIdFromUrl(currentUrl))
              .slice(0, 3)
          );
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
  }, [eventId]);

  const handleViewEventDetails = (eventId, url) => {
    setEventId(eventId);
    window.open(`/${url}`, "_blank");
  };

  const handleViewOrganizationOrPublicProfile = (url) => {
    window.open(`/${url}`, "_blank");
  };

  const handleGoing = () => {
    if (isGoing) setParticipantCount(participantCount - 1);
    if (!isGoing) setParticipantCount(participantCount + 1);
    setIsGoing(!isGoing);

    let goingValue = {
      eventId: eventId,
      participantEntityId: getParticipantEntityId(),
      participantType: getParticipantType(),
      isParticipant: !isGoing,
    };

    eventGoingActionHandler(goingValue)
      .then((res: any) => {
        if (res?.responseCode === "00") {
          console.log(res);
        } else {
          setParticipantCount(initParticipantCount);
          setIsGoing(initGoingState);
          setAlert({
            message: "Error!",
            severity: "error",
          });
        }
        return res;
      })
      .catch((error) => {
        setParticipantCount(initParticipantCount);
        setIsGoing(initGoingState);
        setAlert({
          message: error,
          severity: "error",
        });
        return error;
      });
  };

  const handleEventCardGoing = (eventId, index) => {
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
          <span className="eventSubText text-center mt-1">
            No Participants yet
          </span>
        )}
      </>
    );
  };

  const eventCard = (
    { coverPhoto,
      eventName,
      startDate,
      eventId,
      eventType,
      publicUrl,
      isParticipant,
      participantCount,
      participantDetailList },
    index
  ) => {
    return (
      <div
        className="eventCard !mr-5 !mt-5 transform rounded-lg border border-gray-200 bg-white shadow transition duration-500 hover:scale-105 hover:cursor-pointer dark:border-gray-700 dark:bg-gray-800"
        onClick={(e: any) => handleViewEventDetails(eventId, publicUrl)}
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
        // layout="responsive"
        />
        <div className="p-5">
          <span className="eventCardTime">
            {`${dateFormatForEvent(convertDateTime(startDate, userCurrentTimeZone))} AT ${convertTo12HourFormat(convertDateTime(startDate, userCurrentTimeZone).slice(11, 16))}`}
          </span>
          {/* <span className="eventCardTime">SUN, 17 JAN AT 17:00 UTC +05:30</span> */}
          <br />
          <SectionRow className="relative">
            <span className="eventMainText !text-left">{eventName}</span>
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
          {/* <span className="eventSubText">by Louise J. Verduzco</span> */}
          <SectionRow className="mt-4">
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
            {isUserLogged && loggedAccountType !== "ORGANIZATION" &&
              loggedAccountType !== "PARTNERSHIP" && (
                <RoundedButton
                  ref={undefined}
                  onClick={(e) => {
                    e.stopPropagation();
                    handleEventCardGoing(eventId, index);
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
                setUrl(`${origin}/${publicUrl}`);
                setShareModal(true);
              }}
              className="ShearBTN mr-3"
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
      </div>
    );
  };

  const routeToDetailView = (publicUrl) => {
    window.open(`/${publicUrl}`, "_blank");
  };

  const renderParticipants = ({ profileName, profileImagePath, publicUrl }) => {
    return (
      <button
        className="mr-4 grid justify-items-center cursor-pointer"
        onClick={() => routeToDetailView(publicUrl)}
      >
        <Image
          src={profileImagePath}
          alt="Picture of the author"
          width={65}
          height={65}
          className="followersProfileImageImage mt-4 !mr-4"
        />
        <span className="eventViewDetailsMainText mt-2">{profileName}</span>
      </button>
    );
  };

  const renderParticipantsSkeleton = () => {
    return (
      <div className="mr-4 grid justify-items-center">
        <Image
          src={placeholderImage}
          alt="Picture of the author"
          width={65}
          height={65}
          className="followersProfileImageImage mt-4 !mr-4"
        />
        <span className="eventViewDetailsMainText mt-2"></span>
        <span className="eventViewDetailsSubText"></span>
      </div>
    );
  };

  const isParticipantAvailableCheck = () => {
    return participantDetails.length > 0 ? (
      participantDetails?.map((participant) => renderParticipants(participant))
    ) : (
      <div className="mt-4 mb-8 grid w-full justify-items-center">
        <span className="eventSubText text-center mt-4">No Attendance</span>
      </div>
    );
  };

  const getStringCrop = () => {
    if (eventEntity?.profile?.profileName) {
      return eventEntity?.profile?.profileName;
    } else if (eventEntity?.partnership?.partnershipName) {
      return eventEntity?.partnership?.partnershipName;
    } else {
      return "";
    }
  }

  return (
    <React.Fragment>
      <SectionColumn className="m-auto">
        <div className="ml-5 flex w-full flex-col">
          <div className="">
            <div className="skeleton-animation viewDetailsImageEvent">
              <Image
                // loader ={() => LoginPageImage}
                src={eventCoverPhoto || ""}
                alt="Picture of the author"
                width={1000}
                height={1390}
                className="viewDetailsImageEvent mt-5"
              />
            </div>
            <div className="viewDetailsEventImageDownDiv relative flex items-center justify-start">
              <SectionRow>
                <div className="!relative ml-2 mr-2">
                  <Image
                    src={calenderImage}
                    alt="Picture of the author"
                    width={50}
                    height={50}
                  />
                  <div className="eventPreviewMainText absolute right-5 top-0  mt-5">
                    {eventEntity?.startDate
                      ? getDateFromString(eventEntity?.startDate)
                      : ""}
                  </div>
                </div>
                <SectionColumn className="mt-1">
                  <span className="eventPreviewMainText">
                    {eventEntity?.eventName ? eventEntity?.eventName : ""}
                  </span>
                  {/* <span className="eventPreviewMainText">Black Lives Matter Meeting</span> */}
                  <span className="eventPreviewCardTime">
                    {eventEntity?.startDate ?
                      `${dateFormatForEvent(formattedStartDateWithZone)} AT ${convertTo12HourFormat(formattedStartDateWithZone?.slice(11, 16))}`
                      : ""}
                  </span>
                  {/* <span className="eventPreviewCardTime">SUN, 17 JAN AT 17:00 UTC +05:30</span> */}
                </SectionColumn>
                <SectionRow className="absolute right-5 mt-2 flex items-center justify-center">
                  {isUserLogged && loggedAccountType !== "PARTNERSHIP" &&
                    loggedAccountType !== "ORGANIZATION" && (
                      <RoundedButton
                        ref={undefined}
                        onClick={() => handleGoing()}
                        className={
                          isGoing
                            ? "eventPreviewGOBTN2 flex items-center justify-center"
                            : "eventPreviewGOBTN flex items-center justify-center"
                        }
                      >
                        <SectionRow className="">
                          <Image
                            src={goingImage}
                            alt="Picture of the author"
                            width={25}
                            height={25}
                          />
                          <span className="InterestedTEXT ml-1">Going</span>
                        </SectionRow>
                      </RoundedButton>
                    )}
                  {/* <RoundedButton
                    ref={undefined}
                    onClick={undefined}
                    className='eventPreviewCGOBTN  flex items-center justify-center ml-3 mr-3'
                  >
                    <SectionRow className="">
                      <Image
                        src={cantGoImage}
                        alt='Picture of the author'
                        width={25}
                        height={25}
                      />
                      <span className="InterestedTEXT ml-2 ">Can't Go</span>
                    </SectionRow>
                  </RoundedButton> */}
                  {/* <RoundedButton
                    ref={undefined}
                    onClick={undefined}
                    className="eventPreviewInviteOBTN  ml-3 flex items-center justify-center"
                  >
                    <SectionRow className="">
                      <Image
                        src={inviteImage}
                        alt="Picture of the author"
                        width={25}
                        height={25}
                      />
                      <span className="InterestedTEXT ml-2 ">Invite</span>
                    </SectionRow>
                  </RoundedButton> */}
                  <RoundedButton
                    ref={undefined}
                    onClick={(e: any) => {
                      setShareModal(true);
                    }}
                    className="shareEventBTN ml-2"
                  >
                    <SectionRow className="pl-4">
                      <Image
                        className="pb-1"
                        src={share}
                        alt="Picture of the author"
                        width={20}
                        height={20}
                      />
                      <div className="pl-2">Share</div>
                    </SectionRow>
                  </RoundedButton>
                  {eventEntity?.eventType === "ONLINE" ? (
                    <RoundedButton
                      ref={undefined}
                      onClick={() => window.open(eventEntity.link, "_blank")}
                      className="eventPreviewJUBTN  ml-3 flex items-center justify-center"
                    >
                      <SectionRow className="">
                        <Image
                          src={cameraIcon}
                          alt="Picture of the author"
                          width={25}
                          height={25}
                        />
                        <span className="InterestedTEXT ml-2 ">JOIN ROOM</span>
                      </SectionRow>
                    </RoundedButton>
                  ) : (
                    <></>
                  )}
                </SectionRow>
              </SectionRow>
            </div>
          </div>
        </div>
        <div className="homeRightMainSec3 pt-4 pb-4">
          <Section className="w-full ">
            <SectionRow className="w-4/12">
              <SectionColumn>
                <SectionRow className="justify-between">
                  <span className="eventPreviewMainText2">Event Details</span>
                  {isCreator && (
                    <button
                      className="ml-2 mr-3  flex h-fit cursor-pointer flex-row"
                      onClick={(e: any) => setEditDetailsEventModal(true)}
                    >
                      <RiEdit2Fill size={20} className="primary-color" />

                      <span className="dark-gray-14-text-500 bottom-0 ml-1">
                        Edit
                      </span>
                    </button>
                  )}
                </SectionRow>

                <br />
                <SectionRow>
                  <Image
                    src={building}
                    alt="Picture of the author"
                    width={25}
                    height={25}
                  />
                  <button
                    className="createOrganizationLink05 mt-1 ml-3 cursor-pointer"
                    onClick={(e: any) => {
                      handleViewOrganizationOrPublicProfile(eventEntity?.profile ? eventEntity?.profile?.publicUrl : eventEntity?.partnership?.publicUrl);
                    }}
                  >
                    {stringCrop(getStringCrop(), 40)}
                    {/* , including you */}
                  </button>
                </SectionRow>
                <SectionRow className="mt-2">
                  <Image
                    src={userImage}
                    alt="Picture of the author"
                    width={25}
                    height={25}
                  />
                  <span className="createOrganizationTxt05 mt-1 ml-3">
                    {participantCount < 10
                      ? `0${participantCount}`
                      : participantCount || 0}{" "}
                    Person going
                    {/* , including you */}
                  </span>
                </SectionRow>
                <SectionRow className="mt-2">
                  {eventEntity?.eventType === "ONLINE" ? (
                    <Image
                      src={cameraGrayImage}
                      alt="Picture of the author"
                      width={25}
                      height={25}
                    />
                  ) : (
                    <LocationOnIcon
                      style={{
                        width: "25px",
                        height: "25px",
                        color: "#B3B8C7",
                      }}
                    />
                  )}
                  <span className="createOrganizationTxt05 mt-1 ml-3">
                    {eventEntity?.eventType === "ONLINE"
                      ? "Online Messenger Room"
                      : (
                        <>
                          {`At `}
                          <button
                            className="createOrganizationLink05 mt-1 cursor-pointer"
                            onClick={(e: any) => {
                              window.open(eventEntity?.link, "_blank");
                            }}
                          >
                            {eventEntity.location}
                          </button>
                        </>
                      )
                    }
                  </span>
                </SectionRow>
                <SectionRow className="mt-2">
                  <Image
                    src={timeImage}
                    alt="Picture of the author"
                    width={25}
                    height={25}
                  />
                  <span className="createOrganizationTxt05 mt-1 ml-3">
                    {/* SUN, 17 JAN AT 17:00 UTC +05:30 */}
                    {`${dateFormatForEvent(formattedStartDateWithZone)} AT ${convertTo12HourFormat(formattedStartDateWithZone?.slice(11, 16))}`}
                  </span>
                </SectionRow>
                <SectionRow className="mt-2">
                  <Image
                    src={erthImage}
                    alt="Picture of the author"
                    width={25}
                    height={25}
                  />
                  <span className="createOrganizationTxt05 mt-1 ml-3">
                    Public, People who are invited
                  </span>
                </SectionRow>
                {eventEntity?.isAttendeeLimit && (
                  <SectionRow className="mt-2">
                    <GroupsIcon style={{ width: "24px", height: "25px", color: "#B3B8C7" }} />
                    <span className="createOrganizationTxt05 mt-1 ml-3">
                      Attendance limited to {eventEntity?.attendeeLimit} participants
                    </span>
                  </SectionRow>
                )}
                {eventEntity?.isEventFee && (
                  <SectionRow className="mt-2">
                    <FaMoneyBillWave color="#B2B5C7" style={{ width: '20px', height: '20px', marginLeft: '3px', paddingRight: '1px' }} />
                    <span className="createOrganizationTxt05 mt-1 ml-3">
                      Event Fee : {eventEntity?.currency} {eventEntity?.eventFee}
                    </span>
                  </SectionRow>
                )}
                <br />
                <span className="previewEventSubTextTxt02 align-start">
                  {eventEntity?.description}
                  {/* Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Quis ipsum suspendisse ultrices gravida. Risus commodo viverra maecenas accumsan lacus vel facilisis. */}
                </span>
              </SectionColumn>
            </SectionRow>
            <SectionRow className="flex w-3/12 items-start justify-center ">
              <SectionColumn className="">
                <span className="eventPreviewMainText3 -ml-2">Guest List</span>
                <br />
                <SectionRow className="flex justify-center">
                  <SectionColumn className="mr-12 grid justify-items-center">
                    <span className="eventPreviewMainText">
                      {participantCount || 0}
                    </span>
                    <span className="previewEventSubTextTxt03">Going</span>
                  </SectionColumn>
                  {/* <SectionColumn className="grid justify-items-center">
                    <span className="eventPreviewMainText">00</span>
                    <span className="previewEventSubTextTxt03">Can't Go</span>
                  </SectionColumn> */}
                  <SectionColumn className="grid justify-items-center">
                    <span className="eventPreviewMainText">00</span>
                    <span className="previewEventSubTextTxt03">Invited</span>
                  </SectionColumn>
                </SectionRow>
                <br />
                <button className="inviteFriendsBtn mt-3 mb-8 grid justify-items-center">
                  <SectionRow className="mt-2">
                    <Image
                      // loader ={() => LoginPageImage}
                      src={blackPlusIcon}
                      alt="Picture of the author"
                      width={25}
                      height={25}
                    />
                    <span className="createItemText ml-2">Invite Friends</span>
                  </SectionRow>
                </button>
              </SectionColumn>
            </SectionRow>
            <SectionRow className="flex pl-2 w-5/12 items-start justify-center">
              <div className="">
                <span className="organizationDetailsMainText2">Attendance</span>
                <SectionRow className="participantsScroll w-[100%]">
                  {isLoading
                    ? renderParticipantsSkeleton()
                    : isParticipantAvailableCheck()}
                </SectionRow>
                {/* <div className="flex items-center justify-center">
                </div>
                <div className="mt-4 flex items-center justify-center">
                  {renderParticipants()}
                  {renderParticipants()}
                  {renderParticipants()}
                </div> */}
                {/* <button className="createOrgnzBTN mt-8 grid justify-items-center">
                  <SectionRow className="mt-2">
                    <span className="createItemText ml-4">
                      See All Attendance
                    </span>
                  </SectionRow>
                </button> */}
              </div>
            </SectionRow>
          </Section>
        </div>
        <SectionColumn className="ml-4">
          <SectionRow className="relative">
            <span className="dashboardMainText">Upcoming events</span>
          </SectionRow>
          <Section>
            {otherEvents?.map((event, index) =>
              eventCard(event, index)
            )}
          </Section>
        </SectionColumn>
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
      </SectionColumn>
      <Loader loaderText={""} open={loaderOpen} />
      <ShareModal url={url} title="Check out this Event!" />
      <EditDetailsEventModal
        detailContent={<EventDetailContent details={eventEntity} />}
        details={eventEntity}
        eventId={eventEntity?.eventId}
      />
    </React.Fragment>
  );
};

export default EventDetailsView;
