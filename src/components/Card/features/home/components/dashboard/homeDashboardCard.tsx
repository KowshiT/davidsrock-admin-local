import {
  blackPlusIcon,
  cameraIcon,
  placeholderImage,
  shearIcon,
} from "@/assetsLayer";
import RoundedButton from "../../../../../../components/Buttons/RoundedButtons";
import Section, { SectionRow } from "@/layouts/section";
import Image from "next/image";
import { useRouter } from "next/router";
import React, { useContext, useEffect, useState } from "react";
import { getOrganizationDetailsApi } from "@/api/organization/organizationApi";
import { useAlerts } from "@/hooks/alertHook";
import { getAllEventActionHandler } from "@/actionLayer/event/eventActions";
import {
  convertDateTime,
  convertTo12HourFormat,
  dateFormatForEvent,
  getUserTimeZone,
} from "@/helpers/dateHelpers";
import { AccountType } from "@/helpers/enumHelpers";
import {
  getUserAccountType,
  setActiveTabToLocalStorage,
} from "@/helpers/authHelper";
import EventSkeleton from "../../../../../../components/Skeleton/eventSkeleton";
import OrgDashCardSkeleton from "../../../../../../components/Skeleton/orgCardSkeleton";
import { handleButtonClickedHelper } from "@/helpers/enumChangeHelpers";
import OrganizationCard from "./organizationCard";
import { AdminPanelContext } from "@/contexts/adminPanelContext/adminPanelContext";
import {
  getId,
  getParticipantEntityId,
  getParticipantType,
} from "@/helpers/payloadHelper";
import ShareModal from "../../../../../../components/Modal/share/ShareModal";
import { ModalOpenCloseContext } from "@/contexts/modalContext/modalOpenCloseContext";
import { eventGoingActionHandler } from "@/actionLayer/going/goingActions";
import { displayParticipantCount } from "@/helpers/featureHelper";

export interface Props { }

const HomeDashboardCard: React.FC<Props> = (props) => {
  const { setAlert } = useAlerts();

  const [organizations, setOrganizations] = useState([]);
  const [publicProfile, setPublicProfile] = useState([]);
  const [events, setEvents] = useState([]);
  const [partnerships, setPartnerships] = useState([]);
  const [profileType, setProfileType] = useState(
    String(AccountType.ORGANIZATION)
  );
  const [isEventLoadingSkeleton, setIsEventLoadingSkeleton] = useState(true);
  const [isLoadingSkeleton, setIsLoadingSkeleton] = useState(true);
  const [reduce, setReduce] = useState(true);
  const [eventUrl, setEventUrl] = useState("");
  const [origin, setOrigin] = useState("");
  const [userCurrentTimeZone, setUserCurrentTimeZone] = useState("");

  const { shareModal, setShareModal } = React.useContext(ModalOpenCloseContext);
  const { setShowUserEvents, setShowUserOrgs, setShowUserPartnerships } = React.useContext(AdminPanelContext);

  const [loggedAccountType, setLoggedAccountType] = useState("");

  useEffect(() => {
    const userTimeZone = getUserTimeZone();
    setUserCurrentTimeZone(userTimeZone);

    const handleResize = () => {
      setReduce(window.innerWidth <= 1500);
    };

    // Initial check
    handleResize();

    // Listen to window resize events
    window.addEventListener("resize", handleResize);

    // Clean up the event listener on component unmount
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const { setHasPublicProfile } = useContext(AdminPanelContext);

  useEffect(() => {
    const originFromUrl = window.location.origin;
    setOrigin(originFromUrl);

    setProfileType(getUserAccountType());
    setLoggedAccountType(getUserAccountType());

    let paramValues = {
      page: 0,
      size: 3,
      isDescending: true,
      userId: parseInt(localStorage.getItem("userId")),
      loggedUserId: parseInt(localStorage.getItem("userId")),
      profileType: "ALL",
      loggedProfileReferenceId: getId(),
      loggedProfileType: getUserAccountType(),
    };

    getOrganizationDetailsApi(paramValues)
      .then((res: any) => {
        if (res?.responseCode === "00") {
          if (res?.publicProfile.length > 0) {
            setHasPublicProfile(true);
          }
          setOrganizations(res?.organization);
          setPartnerships(res?.partnershipEntityDtos);
          setPublicProfile(res.publicProfile);
          setIsLoadingSkeleton(false);
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
          message: "Error!",
          severity: "error",
        });
        return error;
      });

    // Get all upcoming events
    let upcomingEventValues = {
      page: 0,
      userId: parseInt(localStorage.getItem("userId")),
      loggedUserId: parseInt(localStorage.getItem("userId")),
      size: 3,
      eventType: "ALL",
      dateFilter: "upcoming",
      loggedProfileType: getUserAccountType(),
      loggedProfileId: getId(),
    };

    getAllEventActionHandler(upcomingEventValues)
      .then((res: any) => {
        if (res?.responseCode === "00") {
          console.log("res responseMessage :>> ", res);
          setEvents(res.eventEntityList.slice(0, 3));
          setIsEventLoadingSkeleton(false);
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

  const router = useRouter();

  const handleRoutes = (url: string, tab: string) => {
    if (tab === "View Events") {
      setShowUserEvents(true);
    } else if (tab === "View Organizations") {
      setShowUserOrgs(true);
    } else if (tab === "View Partnerships") {
      setShowUserPartnerships(true);
    }

    setActiveTabToLocalStorage(tab);
    router.push(url);
  };

  const handleCreateOrganization = () => {
    setActiveTabToLocalStorage("Create Organization");
    router.push("/dashboard/createOrganization");
  };

  const handleCreatePublicProfile = () => {
    setActiveTabToLocalStorage("Create Public Profile");
    router.push("/dashboard/createPublicProfile");
  };

  const handleViewEventDetails = (url) => {
    window.open(`/${url}`, "_blank");
  };

  const handleCreatePartnerShip = () => {
    setActiveTabToLocalStorage("PartnerShips");
    router.push("/dashboard/partnershipDashboard");
  };

  const handleCheckCreatePartnerShip = (profileType) => {
    if (
      profileType === String(AccountType.ORGANIZATION) ||
      profileType === String(AccountType.PUBLIC_PROFILE)
    ) {
      return handleCreatePartnerShip();
    } else {
      return null;
    }
  };

  const handleViewOrg = (url) => {
    window.open(`/${url}`, "_blank");
  };

  const handleViewOrgPublicProfile = (url) => {
    window.open(`/${url}`, "_blank");
  };

  const handleGoing = (eventId, index) => {
    let _eventList = [...events];
    const currentEvent = _eventList[index];

    currentEvent.isParticipant = currentEvent.isParticipant === false;

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
        ) : (
          <span className="eventSubText text-center mt-1">
            No Participants yet
          </span>
        )}
      </>
    );
  };

  const eventCard = (
    { eventName,
      startDate,
      eventType,
      coverPhoto,
      publicUrl,
      eventId,
      isParticipant,
      participantCount,
      participantDetailList }, index
  ) => {
    return (
      <button
        className="eventCard text-left !mr-5 !mt-5 transform rounded-lg border border-gray-200 bg-white shadow transition duration-500 hover:scale-105 hover:cursor-pointer dark:border-gray-700 dark:bg-gray-800"
        onClick={(e: any) => handleViewEventDetails(publicUrl)}
      >
        <Image
          alt="The guitarist in the concert."
          src={coverPhoto || "https://i.ibb.co/bPMFnC7/library-of-congress-Wz-Pxm-B-t-Rlw-unsplash.jpg"}
          width={2250}
          height={1390}
          className="eventCardImg"
        // layout="responsive"
        />
        <div className="p-5">
          <SectionRow className="relative mb-1">
            <span className="eventCardTime mt-1">{
              `${dateFormatForEvent(convertDateTime(startDate, userCurrentTimeZone))} AT ${convertTo12HourFormat(convertDateTime(startDate, userCurrentTimeZone).slice(11, 16))}`}
            </span>
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
          <span className="eventMainText">{eventName}</span>
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

  const partnershipsCards = (partnerships: any) => {
    return (
      <div className=" mt-8 grid w-full justify-items-center px-5">
        {partnerships && partnerships.length > 0 ? (
          <div
            className={
              "justify-content-start flex w-full flex-row justify-evenly"
            }
          >
            {partnerships?.slice(0, 2).map((prp, i) => (
              <div key={prp.partnershipId} className="pr-1">
                <button
                  className="partnershipCard-dashboard !mb-5 grid transform justify-items-center pt-4 transition duration-500 hover:scale-105 hover:cursor-pointer"
                  onClick={(e: any) => handleViewOrg(prp?.publicUrl)}
                >
                  <div className="imageWrapper mx-auto">
                    <Image
                      src={
                        prp?.partnershipDetailEntityList[0].profile
                          ?.profileImagePath &&
                          prp?.partnershipDetailEntityList[0].profile?.profileImagePath.includes(
                            "http"
                          )
                          ? prp?.partnershipDetailEntityList[0].profile
                            ?.profileImagePath
                          : placeholderImage
                      }
                      alt="Picture of the author"
                      width={95}
                      height={95}
                      className="baseImage timelineFollowOrgProfileImage ml-4 rounded-full"
                    />
                    <Image
                      src={
                        prp?.partnershipDetailEntityList[1].profile
                          ?.profileImagePath &&
                          prp?.partnershipDetailEntityList[1].profile?.profileImagePath.includes(
                            "http"
                          )
                          ? prp?.partnershipDetailEntityList[1].profile
                            ?.profileImagePath
                          : placeholderImage
                      }
                      alt="Second image"
                      width={110} // Adjust width to half of the first image
                      height={110}
                      className="overlayImage timelineFollowOrgProfileImage rounded-full"
                    />
                  </div>

                  <div className="orgListCardText">
                    {prp?.partnershipName}
                  </div>
                </button>
              </div>
            ))}
          </div>
        ) : (
          <>
            <button
              className="createNewItemsBTN grid justify-items-center"
              onClick={() => {
                handleCheckCreatePartnerShip(profileType);
              }}
            >
              <SectionRow className="mt-2">
                <Image
                  // loader ={() => LoginPageImage}
                  src={blackPlusIcon}
                  alt="Picture of the author"
                  width={25}
                  height={25}
                />
                <span
                  className={
                    profileType === String(AccountType.ORGANIZATION) ||
                      profileType === String(AccountType.PUBLIC_PROFILE)
                      ? "createItemText ml-0"
                      : "disable-createItemText ml-0"
                  }
                >
                  Create Partnerships
                </span>
              </SectionRow>
            </button>
            <span className="eventMainText mt-4">
              You haven't created Partnerships
            </span>
          </>
        )}
      </div>
    );
  };

  const subGroupsCards = (
    profile: any,
    isLeft: boolean,
    accountType: AccountType
  ) => {
    return (
      <div className={`mt-8 grid w-full justify-items-start px-5`}>
        {profile.length > 0 ? (
          <div
            className={
              isLeft
                ? "flex w-full flex-row flex-wrap justify-start"
                : "justify-content-start flex w-full flex-row flex-wrap justify-evenly"
            }
          >
            {reduce
              ? profile?.slice(0, 2).map((org, i) => (
                <div key={org?.organizationId} className="pr-1">
                  <OrganizationCard
                    accountType={accountType}
                    handleViewOrg={handleViewOrg}
                    handleViewOrgPublicProfile={
                      handleViewOrgPublicProfile
                    }
                    publicUrl={org?.profile.publicUrl}
                    profileImagePath={org?.profile?.profileImagePath}
                    profileName={org?.profile?.profileName}
                  />
                </div>
              ))
              : profile?.map((org, i) => (
                <div key={org?.organizationId} className="pr-1">
                  <OrganizationCard
                    accountType={accountType}
                    handleViewOrg={handleViewOrg}
                    handleViewOrgPublicProfile={
                      handleViewOrgPublicProfile
                    }
                    publicUrl={org?.profile.publicUrl}
                    profileImagePath={org?.profile?.profileImagePath}
                    profileName={org?.profile?.profileName}
                  />
                </div>
              ))}
          </div>
        ) : (
          <>
            <button
              className="createNewItemsBTN m-auto grid justify-items-center"
              onClick={(e: any) => {
                accountType === AccountType.ORGANIZATION
                  ? handleCreateOrganization()
                  : handleCreatePublicProfile();
              }}
            >
              <SectionRow className="mt-2">
                <Image
                  // loader ={() => LoginPageImage}
                  src={blackPlusIcon}
                  alt="Picture of the author"
                  width={25}
                  height={25}
                />
                <span className="createItemText ">
                  {accountType === AccountType.ORGANIZATION
                    ? "Create Organization"
                    : "Create Public Profile"}
                </span>
              </SectionRow>
            </button>
            <span className="eventMainText mx-auto mt-4">
              {accountType === AccountType.ORGANIZATION
                ? "You haven't created Organizations"
                : "You haven't created Public Profile"}
            </span>
            {/* <span className="createItemSubText mt-2">It is a long established fact that a reader will be<br />  distracted by the readable content.</span> */}
          </>
        )}
      </div>
    );
  };

  const renderEventSection = () => {
    if (isEventLoadingSkeleton) {
      return <EventSkeleton />;
    } else if (events.length > 0) {
      return events.map((event, index) =>
        eventCard(event, index)
      );
    } else {
      return (
        <div className=" mt-8 mb-8 grid w-full justify-items-center">
          <button
            className={
              profileType == String(AccountType.INITIAL)
                ? "disable-createNewItemsBTN grid cursor-default justify-items-center"
                : "createNewItemsBTN grid justify-items-center"
            }
            onClick={() => {
              if (profileType != String(AccountType.INITIAL)) {
                handleRoutes(handleButtonClickedHelper("Create Event"), "Create Event");
              }
            }}
          >
            <SectionRow className="mt-2">
              <Image
                src={blackPlusIcon}
                alt="Picture of the author"
                width={25}
                height={25}
              />
              <span
                className={
                  profileType == String(AccountType.INITIAL)
                    ? "disable-createItemText ml-0"
                    : "createItemText ml-0"
                }
              >
                Create Events
              </span>
            </SectionRow>
          </button>
          <span className="eventMainText mt-4">
            You haven't created any events
          </span>
        </div>
      );
    }
  };

  return (
    <React.Fragment>
      <div className="homeRightMainSec pt-4 pb-4">
        <SectionRow className="relative">
          <span className="dashboardMainText">Events</span>
          {events?.length > 0 ? (
            <RoundedButton
              ref={undefined}
              onClick={(e: any) => {
                handleRoutes(handleButtonClickedHelper("View Events"), "View Events");
              }}
              className="viewAllBTN absolute right-5 pt-0.5"
            >
              View All
            </RoundedButton>
          ) : (
            <></>
          )}
        </SectionRow>
        <Section>{renderEventSection()}</Section>

        <br />

        <SectionRow className=" mb-8 mt-4 w-full">
          <div className="flex w-6/12 flex-col">
            <div className="flex w-full flex-row py-4 ">
              <div className="w-1/2">
                <span className="dashboardMainText-l mb-4">Organizations</span>
              </div>

              <div className="flex w-1/2 items-end justify-end">
                {organizations?.length > 0 ? (
                  <RoundedButton
                    ref={undefined}
                    onClick={(e: any) => {
                      handleRoutes(handleButtonClickedHelper("View Organizations"), "View Organizations");
                    }}
                    className="viewAllBTN ml-auto pt-0.5"
                  >
                    View All
                  </RoundedButton>
                ) : (
                  <></>
                )}
              </div>
            </div>
            <SectionRow>
              {isLoadingSkeleton ? (
                <OrgDashCardSkeleton
                  className={"timelineFollowOrgProfileImage"}
                />
              ) : (
                subGroupsCards(organizations, false, AccountType.ORGANIZATION)
              )}
            </SectionRow>
          </div>

          <div className="w-6/12">
            <div className="flex w-full flex-row justify-between py-4">
              <div className="w-1/2">
                <span className="dashboardMainText-l mb-4 ml-8">
                  Partnerships
                </span>
              </div>
              <div className="flex  w-1/2 items-end justify-end">
                {partnerships?.length > 0 ? (
                  <RoundedButton
                    ref={undefined}
                    onClick={(e: any) => {
                      handleRoutes(handleButtonClickedHelper("View Partnerships"), "View Partnerships");
                    }}
                    className="viewAllBTN pt-0.5"
                  >
                    View All
                  </RoundedButton>
                ) : (
                  <></>
                )}
              </div>
            </div>
            <Section>
              {isLoadingSkeleton ? (
                <OrgDashCardSkeleton
                  className={"timelineFollowOrgProfileImage"}
                />
              ) : (
                partnershipsCards(partnerships)
              )}
            </Section>
          </div>
        </SectionRow>

        <div className="w-4/12">
          <div className="flex w-full flex-row justify-between py-4">
            <div className="w-1/2">
              <span className="dashboardMainText-l mb-4 ">Public Profile</span>
            </div>
          </div>
          <Section
            className={
              "mt-1 flex flex-row flex-wrap items-center justify-center "
            }
          >
            {isLoadingSkeleton ? (
              <OrgDashCardSkeleton
                className={"timelineFollowOrgProfileImage"}
              />
            ) : (
              subGroupsCards(publicProfile, true, AccountType.PUBLIC_PROFILE)
            )}
          </Section>
        </div>
      </div>
      {shareModal && (
        <ShareModal url={eventUrl} title="Check out this Event!" />
      )}
    </React.Fragment>
  );
};

export default HomeDashboardCard;
