import { calenderImage, share } from "@/assetsLayer";
import RoundedButton from "../../../../components/Buttons/RoundedButtons";
import Section, { SectionColumn, SectionRow } from "@/layouts/section";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { getIdFromUrl, stringCrop } from "@/helpers/stringCrop";
import {
  getGalleryImagesActionHandler,
  getOrganizationActionHandler,
} from "@/actionLayer/organization/organizationActions";
import { useAlerts } from "@/hooks/alertHook";
import { getAllEventActionHandler } from "@/actionLayer/event/eventActions";
import { useRouter } from "next/router";
import Loader from "../../../../components/Modal/LoadingModal";
import OrganizationAbout from "./components/organizationSwichComponents/about";
import OrganizationEvents from "./components/organizationSwichComponents/eventes";
import Followers from "./components/organizationSwichComponents/followers";
import OrganizationPhotos from "./components/organizationSwichComponents/photos";
import OrganizationVideo from "./components/organizationSwichComponents/videos";
import { ModalOpenCloseContext } from "@/contexts/modalContext/modalOpenCloseContext";
import ShareModal from "../../../../components/Modal/share/ShareModal";
import {
  convertDateTime,
  dateFormatForEvent,
  getDateFromString,
  getUserTimeZone,
  sinceDateConverter,
} from "@/helpers/dateHelpers";
import { AccountType } from "@/helpers/enumHelpers";
import ImageModal from "../../../../components/Modal/imageSlider/ImageModal";
import ImagesWrapperCard from "../../timeline/ImagesWrapper";
import { RiEdit2Fill } from "react-icons/ri";
import ProfileDetailsEditModal from "../../../Modal/edit/profileDetailsEditModal";
import OrganizationDetailContent from "../../../../components/Modal/edit/organization/organizationDetailContent";
import {
  followProfileActionHandler,
  getFollowDetailsActionHandler,
} from "@/actionLayer/follow/followActions";
import {
  getProfileId,
  getUserAccountType,
  getUserIdFromStorage,
} from "@/helpers/authHelper";
import Posts from "./components/organizationSwichComponents/posts";
import { getId } from "@/helpers/payloadHelper";

export interface OrganizationDetailsViewProps { }

const OrganizationDetailsView: React.FC<OrganizationDetailsViewProps> = (
  props
) => {
  const { setAlert } = useAlerts();
  const router = useRouter();

  const [orgDetails, setOrgDetails] = useState<any>([]);
  const [eventDetails, setEventDetails] = useState<any>([]);
  const [loaderOpen, setLoaderOpen] = useState(false);
  const [loaderText, setLoaderText] = useState("");
  const [buttonSwichState, setButtonSwichState] = useState("ABOUT");
  const [isFollowed, setIsFollowed] = useState(false);
  const [url, setUrl] = useState("");
  const [orgShareId, setOrgShareId] = useState(0);
  const [userCurrentTimeZone, setUserCurrentTimeZone] = useState("");

  const { setShareModal, setEditOrganizationModal } = React.useContext(
    ModalOpenCloseContext
  );
  const [imageList, setImageList] = useState([]);
  const [isCreator, setIsCreator] = useState(false);
  const [followersDetails, setFollowersDetails] = useState<any>({});
  const [followersCount, setFollowersCount] = useState(0);
  const [initFollowerCount, setInitFollowerCount] = useState(0);
  const [initIsFollowedState, setInitIsFollowedState] = useState(false);
  const [isUserLogged, setIsUserLogged] = useState(false);
  const [userAccountType, setUserAccountType] = useState("")

  useEffect(() => {
    setLoaderText("Please Wait...");
    setLoaderOpen(true);

    const userTimeZone = getUserTimeZone();
    setUserCurrentTimeZone(userTimeZone);
    setUserAccountType(getUserAccountType());

    if (getUserIdFromStorage()) {
      setIsUserLogged(true);
    } else {
      setIsUserLogged(false);
    }

    const currentUrl = window.location.href;
    getIdFromUrl(currentUrl);
    setUrl(currentUrl);

    let getOrgValues = {
      page: 0,
      size: 1,
      isDescending: true,
      publicUrl: currentUrl,
    };

    // Get all upcoming events
    let upcomingEventValues = {
      page: 0,
      size: 5,
      eventType: "ALL",
      dateFilter: "upcoming",
      publicUrl: currentUrl,
      profileType: ["ORGANIZATION", "PUBLIC_PROFILE"],
    };

    getOrganizationActionHandler(getOrgValues)
      .then((res: any) => {
        if (res?.responseCode === "00") {
          setLoaderOpen(false);
          setOrgDetails(res.organization[0]);

          if (
            res?.organization[0].profile?.profileId === getProfileId() &&
            getUserAccountType() === "ORGANIZATION"
          ) {
            setIsCreator(true);
          }

          let followersValue = {
            loggedProfileRefernceId: getId(),
            loggedProfileType: getUserAccountType(),
            pointedProfileReferenceId: res.organization[0].profile.profileId,
            pointedProfileType: "ORGANIZATION",
          };

          getFollowDetailsActionHandler(followersValue)
            .then((res: any) => {
              if (res?.responseCode === "00") {
                console.log("followers res :>> ", res);
                setFollowersDetails(res);
                setFollowersCount(res?.countResponse?.followerCount);
                setInitFollowerCount(res?.countResponse?.followerCount);
                setIsFollowed(res?.isFollower);
                setInitIsFollowedState(res?.isFollower);
              } else {
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

          getAllEventActionHandler(upcomingEventValues)
            .then((res: any) => {
              if (res?.responseCode === "00") {
                setEventDetails(res.eventEntityList);
              } else {
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

          let values = {
            profileOrPartnershipId: res?.organization[0].profile?.profileId,
            profileType: String(AccountType.ORGANIZATION),
          };

          getGalleryImagesActionHandler(values)
            .then((res: any) => {
              setImageList(res.galleryEntityList);
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
        setAlert({
          message: "Error!",
          severity: "error",
        });
        return error;
      });
  }, []);

  const followHandler = () => {
    if (isFollowed) setFollowersCount(followersCount - 1);
    if (!isFollowed) setFollowersCount(followersCount + 1);
    setIsFollowed(!isFollowed);

    let values = {
      followingProfileId:
        getUserAccountType() === "ORGANIZATION" ||
          getUserAccountType() === "PUBLIC_PROFILE"
          ? getProfileId()
          : null,
      isFollow: !isFollowed,
      userId:
        getUserAccountType() === "INITIAL" ? getUserIdFromStorage() : null,
    };
    console.log("follow values", values);

    followProfileActionHandler(values, orgDetails.profile.profileId)
      .then((res: any) => {
        console.log("res", res);
        if (res?.responseCode === "00") {
          setIsFollowed(!isFollowed);
          setAlert({
            message: `Organization successfully ${isFollowed ? "unfollowed" : "followed"
              }!`,
            severity: "success",
          });
        } else {
          setFollowersCount(initFollowerCount);
          setIsFollowed(initIsFollowedState);
          setAlert({
            message: "Error!",
            severity: "error",
          });
        }
        return res;
      })
      .catch((error) => {
        setFollowersCount(initFollowerCount);
        setIsFollowed(initIsFollowedState);
        setAlert({
          message: error,
          severity: "error",
        });
        return error;
      });
  };

  const messengerHandler = () => {
    console.log("messengerHandler");
  };

  const rendereventList = (eventName, startDate) => {
    return (
      <SectionRow className="mt-4">
        <div className="!relative ml-2 mr-2">
          <Image
            src={calenderImage}
            alt="Picture of the author"
            width={50}
            height={50}
          />
          <div className="eventPreviewMainText absolute right-4 top-0  mt-5">
            {getDateFromString(startDate)}
          </div>
        </div>
        <SectionColumn className="mt-1">
          <span className="organizationDetailsMainText2">{stringCrop(eventName, 30)}</span>
          <span className="eventCardTimeOrgCard">
            {`${dateFormatForEvent(convertDateTime(startDate, userCurrentTimeZone))}`}
          </span>
        </SectionColumn>
      </SectionRow>
    );
  };

  return (
    <React.Fragment>
      <Section className="grid w-full justify-items-center !pt-4">
        <br />
        <div className="coverProfileImagesSec relative">
          <div className="skeleton-animation">
            <Image
              // loader ={() => LoginPageImage}
              // src={organizationMockData.coverImage}
              src={orgDetails?.profile?.coverImagePath || ""}
              alt="Picture of the author"
              width={2250}
              height={1390}
              className="organizationDetailsCoverImage"
            />
          </div>
          <div className="skeleton-animation absolute bottom-0 left-10 rounded-full">
            <Image
              // loader ={() => LoginPageImage}
              src={
                orgDetails?.profile?.profileImagePath
                  ? orgDetails?.profile?.profileImagePath
                  : ""
              }
              // src={organizationMockData.logoImage}
              alt="Picture of the author"
              width={140}
              height={140}
              className="orgDetailViewProfileImage rounded-full ring ring-white backdrop-blur-sm"
            />
          </div>
        </div>
        <div className="organizationMainDetailsSec pl-10 pr-10 pt-4">
          <SectionRow className="organizationMainDetailsSecContent">
            <SectionRow>
              <SectionColumn>
                <div className="w-60">
                  <span className="orgNameText">
                    {orgDetails?.profile?.profileName
                      ? orgDetails?.profile?.profileName
                      : ""}
                  </span>
                </div>
                <SectionRow className="mt-4  flex justify-between">
                  <SectionColumn className="grid justify-items-center">
                    <span className="eventPreviewMainText">
                      {orgDetails?.profile?.postCount || 0}
                    </span>
                    <span className="previewEventSubTextTxt03">Post</span>
                  </SectionColumn>
                  <SectionColumn className="grid justify-items-center">
                    <span className="eventPreviewMainText">
                      {followersCount || 0}
                    </span>
                    <span className="previewEventSubTextTxt03">Followers</span>
                  </SectionColumn>
                  <SectionColumn className="grid justify-items-center">
                    <span className="eventPreviewMainText">
                      {followersDetails?.countResponse?.followingCount || 0}
                    </span>
                    <span className="previewEventSubTextTxt03">Following</span>
                  </SectionColumn>
                </SectionRow>
                <SectionColumn className="mt-6">
                  <span className="organizationDetailsMainText2">
                    Organization Since
                  </span>
                  <span className="previewEventSubTextTxt03 mt-1">
                    {orgDetails?.companyStartDate
                      ? sinceDateConverter(orgDetails?.companyStartDate)
                      : "12 June 2018"}
                  </span>
                </SectionColumn>

                {isUserLogged && (
                  <SectionRow className="mt-6">
                    {userAccountType !== "PARTNERSHIP" && (
                      <RoundedButton
                        ref={undefined}
                        onClick={(e: any) => {
                          followHandler();
                        }}
                        className="signUpBTN mr-3"
                      >
                        {isFollowed ? "Unfollow" : "Follow"}
                      </RoundedButton>
                    )}
                    {!isCreator && (
                      <div className="tooltipX">
                        <RoundedButton
                          ref={undefined}
                          onClick={(e: any) => {
                            messengerHandler();
                          }}
                          // className="loginBTN"
                          className="disableLoginBTN"
                        >
                          Message
                        </RoundedButton>
                        <span className="tooltiptext">
                          This option will be available soon
                        </span>
                      </div>
                    )}
                  </SectionRow>
                )}
              </SectionColumn>
              {isCreator ? (
                <button
                  className="ml-5 mr-3  mt-2.5 flex h-fit w-[50px] cursor-pointer flex-row"
                  onClick={(e: any) => setEditOrganizationModal(true)}
                >
                  <RiEdit2Fill size={20} className="primary-color" />

                  <span className="dark-gray-14-text-500 bottom-0 ml-1">
                    Edit
                  </span>
                </button>
              ) : (
                <div className="ml-2 mr-3 w-[50px]"></div>
              )}
              <div className="line3  mr-8"></div>
            </SectionRow>

            <>
              <>
                <SectionColumn className="-ml-10 w-1/2">
                  <span className="organizationDetailsMainText2">Location</span>
                  <span className="previewEventSubTextTxt04 mt-1">
                    {orgDetails?.profile?.location
                      ? orgDetails?.profile?.location
                      : "N/A"}
                  </span>
                  <br />
                  <span className="organizationDetailsMainText2">
                    Website
                  </span>
                  <button className="previewEventSubTextTxt05 mt-1"
                    onClick={() => {
                      window.open(orgDetails?.profile?.networkEntities[0]?.link ? orgDetails?.profile?.networkEntities[0]?.link : "null", "_blank");
                    }}
                  >
                    {orgDetails?.profile?.networkEntities[0]?.link
                      ? orgDetails?.profile?.networkEntities[0]?.link
                      : "N/A"}
                  </button>

                  <br />
                  <span className="organizationDetailsMainText2">Tagline</span>
                  <span className="previewEventSubTextTxt04 mb-4">
                    {orgDetails?.profile?.tagLine
                      ? orgDetails?.profile?.tagLine
                      : "N/A"}
                  </span>
                  <br />
                </SectionColumn>

                <SectionColumn>
                  <RoundedButton
                    ref={undefined}
                    onClick={(e: any) => {
                      setShareModal(true);
                      setOrgShareId(orgDetails?.profile?.profileId)
                    }}
                    className="shareBTN ml-1"
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
                </SectionColumn>
              </>
              <br />
              <SectionRow className="-mb-6 ml-80">
                <button
                  onClick={(e: any) => {
                    setButtonSwichState("ABOUT");
                  }}
                >
                  <div
                    className={
                      buttonSwichState === "ABOUT"
                        ? "organizationDetailsOptionText2A !mb-4 transform transition duration-500"
                        : "organizationDetailsOptionText2 !mb-4 transform transition duration-500"
                    }
                  >
                    About
                  </div>
                  {buttonSwichState === "ABOUT" ? (
                    <div className="seletcedLine transform transition duration-500"></div>
                  ) : (
                    <div className="seletcedLineHide transform transition duration-500"></div>
                  )}
                </button>
                <button
                  onClick={(e: any) => {
                    setButtonSwichState("POST");
                  }}
                  className="ml-12"
                >
                  <div
                    className={
                      buttonSwichState === "POST"
                        ? "organizationDetailsOptionText2A !mb-4"
                        : "organizationDetailsOptionText2 !mb-4"
                    }
                  >
                    Post
                  </div>
                  {buttonSwichState === "POST" ? (
                    <div className="seletcedLine transform transition duration-500"></div>
                  ) : (
                    <div className="seletcedLineHide transform transition duration-500"></div>
                  )}
                </button>
                <button
                  onClick={(e: any) => {
                    setButtonSwichState("EVENT");
                  }}
                  className="ml-12"
                >
                  <div
                    className={
                      buttonSwichState === "EVENT"
                        ? "organizationDetailsOptionText2A !mb-4"
                        : "organizationDetailsOptionText2 !mb-4"
                    }
                  >
                    Event
                  </div>
                  {buttonSwichState === "EVENT" ? (
                    <div className="seletcedLine transform transition duration-500"></div>
                  ) : (
                    <div className="seletcedLineHide transform transition duration-500"></div>
                  )}
                </button>
                <button
                  onClick={(e: any) => {
                    setButtonSwichState("FOLLOWERS");
                  }}
                  className="ml-12"
                >
                  <div
                    className={
                      buttonSwichState === "FOLLOWERS"
                        ? "organizationDetailsOptionText2A !mb-4 transform transition duration-500"
                        : "organizationDetailsOptionText2 !mb-4 transform transition duration-500"
                    }
                  >
                    Followers
                  </div>
                  {buttonSwichState === "FOLLOWERS" ? (
                    <div className="seletcedLine transform transition duration-500"></div>
                  ) : (
                    <div className="seletcedLineHide transform transition duration-500"></div>
                  )}
                </button>
                <button
                  onClick={(e: any) => {
                    setButtonSwichState("FOLLOWING");
                  }}
                  className="ml-12"
                >
                  <div
                    className={
                      buttonSwichState === "FOLLOWING"
                        ? "organizationDetailsOptionText2A !mb-4 transform transition duration-500"
                        : "organizationDetailsOptionText2 !mb-4 transform transition duration-500"
                    }
                  >
                    Following
                  </div>
                  {buttonSwichState === "FOLLOWING" ? (
                    <div className="seletcedLine transform transition duration-500"></div>
                  ) : (
                    <div className="seletcedLineHide transform transition duration-500"></div>
                  )}
                </button>
                <button
                  onClick={(e: any) => {
                    setButtonSwichState("PHOTOS");
                  }}
                  className="ml-12"
                >
                  <div
                    className={
                      buttonSwichState === "PHOTOS"
                        ? "organizationDetailsOptionText2A !mb-4 transform transition duration-500"
                        : "organizationDetailsOptionText2 !mb-4 transform transition duration-500"
                    }
                  >
                    Photos
                  </div>
                  {buttonSwichState === "PHOTOS" ? (
                    <div className="seletcedLine transform transition duration-500"></div>
                  ) : (
                    <div className="seletcedLineHide transform transition duration-500"></div>
                  )}
                </button>
              </SectionRow>
            </>
          </SectionRow>
        </div>

        <SectionRow className="orgDetailsDownSec mt-6">
          <SectionColumn>
            <div className="orgDetailEventCard">
              <span className="organizationDetailsMainText2">Events</span>
              <div className="">
                {eventDetails?.map((event) =>
                  rendereventList(event.eventName, event.startDate)
                )}
              </div>
              <button
                className="common-gray-button mt-8 grid justify-items-center"
                onClick={(e: any) => router.push("/dashboard/eventListView")}
              >
                <SectionRow className="mt-2">
                  <span className="createItemText ml-4">See All Events</span>
                </SectionRow>
              </button>
            </div>

            <div className="mt-4">
              <ImagesWrapperCard imageList={imageList} />
            </div>
          </SectionColumn>
          <div className="right-main-div ml-5">
            {buttonSwichState === "ABOUT" && (
              <OrganizationAbout orgDetails={orgDetails} />
            )}
            {buttonSwichState === "POST" && orgDetails && (
              <Posts
                referenceId={orgDetails?.profile?.profileId}
                profileType="ORGANIZATION"
                profileName={orgDetails?.profile?.profileName}
                profileImage1={orgDetails?.profile?.profileImagePath}
                isCreator={isCreator}
                isUserLogged={isUserLogged}
              />
            )}
            {buttonSwichState === "EVENT" && (
              <OrganizationEvents isCreator={isCreator} />
            )}
            {buttonSwichState === "FOLLOWERS" && (
              <Followers
                profileId={orgDetails?.profile?.profileId}
                profileType={orgDetails?.profile?.profileType}
                followType="followers"
                isCreator={isCreator}
              />
            )}{" "}
            {buttonSwichState === "FOLLOWING" && (
              <Followers
                profileId={orgDetails?.profile?.profileId}
                profileType={orgDetails?.profile?.profileType}
                followType="following"
                isCreator={isCreator}
              />
            )}{" "}
            {buttonSwichState === "PHOTOS" && (
              <OrganizationPhotos
                profileType={orgDetails?.profile?.profileType}
                profileOrPartnershipId={orgDetails?.profile?.profileId}
                isCreator={isCreator}
              />
            )}
            {buttonSwichState === "VIDEOS" && <OrganizationVideo />}
          </div>
        </SectionRow>
      </Section>
      <Loader loaderText={loaderText} open={loaderOpen} />
      {orgDetails?.profile?.profileId === orgShareId && <ShareModal url={url} title="Check out this Organization!" />}
      <ImageModal images={imageList} />
      <ProfileDetailsEditModal
        detailContent={<OrganizationDetailContent details={orgDetails} />}
        type={String(AccountType.ORGANIZATION)}
        details={orgDetails}
        profilePicture={orgDetails?.profile?.profileImagePath}
        coverPicture={orgDetails?.profile?.coverImagePath}
        userId={getProfileId()}
      />
    </React.Fragment>
  );
};

export default OrganizationDetailsView;
