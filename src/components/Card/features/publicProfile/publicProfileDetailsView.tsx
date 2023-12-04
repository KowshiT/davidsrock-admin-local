import {
  calenderImage,
  fbIcon,
  linkedinIcon,
  twitterIcon,
  websiteIcon,
  share,
} from "@/assetsLayer";
import RoundedButton from "../../../../components/Buttons/RoundedButtons";
import Section, { SectionColumn, SectionRow } from "@/layouts/section";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import {
  formatInterests,
  getIdFromUrl,
  stringCrop,
} from "@/helpers/stringCrop";
import {
  getGalleryImagesActionHandler,
  getOrganizationActionHandler,
} from "@/actionLayer/organization/organizationActions";
import { useAlerts } from "@/hooks/alertHook";
import Loader from "../../../../components/Modal/LoadingModal";
import { getAllEventActionHandler } from "@/actionLayer/event/eventActions";
import { useRouter } from "next/router";
import ShareModal from "../../../../components/Modal/share/ShareModal";
import { ModalOpenCloseContext } from "@/contexts/modalContext/modalOpenCloseContext";
import {
  convertDateTime,
  dateFormatForEvent,
  getDateFromString,
  getUserTimeZone,
  sinceDateConverter,
} from "@/helpers/dateHelpers";
import Followers from "../organization/components/organizationSwichComponents/followers";
import OrganizationVideo from "../organization/components/organizationSwichComponents/videos";
import OrganizationEvents from "../organization/components/organizationSwichComponents/eventes";
import OrganizationPhotos from "../organization/components/organizationSwichComponents/photos";
import PublicProfileAbout from "./components/publicProfileSwitchComponents/ppAbout";
import ImagesWrapperCard from "../../timeline/ImagesWrapper";
import {
  extractProfileImages,
  formatInterestsWithSpaces,
} from "@/helpers/extractDataHelper";
import { AccountType } from "@/helpers/enumHelpers";
import ImageModal from "../../../../components/Modal/imageSlider/ImageModal";
import { RiEdit2Fill } from "react-icons/ri";
import PublicProfileDetailContent from "../../../../components/Modal/edit/publicProfile/publicProfileDetailContent";
import ProfileDetailsEditModal from "../../../Modal/edit/profileDetailsEditModal";
import {
  getProfileId,
  getUserAccountType,
  getUserIdFromStorage,
} from "@/helpers/authHelper";
import {
  followProfileActionHandler,
  getFollowDetailsActionHandler,
} from "@/actionLayer/follow/followActions";
import Posts from "../organization/components/organizationSwichComponents/posts";

export interface PublicProfileDetailsViewProps {}

const PublicProfileDetailsView: React.FC<PublicProfileDetailsViewProps> = (
  props
) => {
  const { setAlert } = useAlerts();
  const router = useRouter();

  const [publicProfileDetails, setPublicProfileDetails] = useState<any>([]);
  const [eventDetails, setEventDetails] = useState<any>([]);
  const [networkList, setNetworkList] = useState<any>([]);
  const [loaderOpen, setLoaderOpen] = useState(false);
  const [loaderText, setLoaderText] = useState("");
  const [url, setUrl] = useState("");
  const [butonSwichState, setButonSwichState] = useState("ABOUT");
  const [imageList, setImageList] = useState([]);
  const [isCreator, setIsCreator] = useState(false);
  const [isFollowed, setIsFollowed] = useState(false);
  const [followersDetails, setFollowersDetails] = useState<any>({});
  const [followersCount, setFollowersCount] = useState(0);
  const [initFollowerCount, setInitFollowerCount] = useState(0);
  const [initIsFollowedState, setInitIsFollowedState] = useState(false);
  const [isUserLogged, setIsUserLogged] = useState(false);
  const [profileShareId, setProfileShareId] = useState(0);
  const [userCurrentTimeZone, setUserCurrentTimeZone] = useState("");
  const [userAccountType, setUserAccountType] = useState("");

  const { setShareModal, setEditOrganizationModal } = React.useContext(
    ModalOpenCloseContext
  );

  const getLoggedProfileRefernceId = () => {
    if (getUserAccountType() === "INITIAL") {
      return getUserIdFromStorage();
    } else if (
      getUserAccountType() === "ORGANIZATION" ||
      getUserAccountType() === "PUBLIC_PROFILE" ||
      getUserAccountType() === "PARTNERSHIP"
    ) {
      return getProfileId();
    } else {
      return null;
    }
  };

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
          console.log("res :>> ", res.publicProfile[0]);
          setPublicProfileDetails(res.publicProfile[0]);
          setNetworkList(res.publicProfile[0].profile.networkEntities);
          if (
            res?.publicProfile[0]?.profile?.profileId === getProfileId() &&
            getUserAccountType() === "PUBLIC_PROFILE"
          ) {
            setIsCreator(true);
          }

          let followersValue = {
            loggedProfileRefernceId: getLoggedProfileRefernceId(),
            loggedProfileType: getUserAccountType(),
            pointedProfileReferenceId: res.publicProfile[0].profile.profileId,
            pointedProfileType: "PUBLIC_PROFILE",
          };

          getFollowDetailsActionHandler(followersValue)
            .then((res: any) => {
              if (res?.responseCode === "00") {
                console.log("followers res :>> ", res);
                setFollowersDetails(res);
                setIsFollowed(res?.isFollower);
                setInitIsFollowedState(res?.isFollower);
                setFollowersCount(res?.countResponse?.followerCount);
                setInitFollowerCount(res?.countResponse?.followerCount);
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
              setAlert({
                message: error,
                severity: "error",
              });
              return error;
            });

          let values = {
            profileOrPartnershipId: res?.publicProfile[0].profile?.profileId,
            profileType: String(AccountType.PUBLIC_PROFILE),
          };

          getGalleryImagesActionHandler(values)
            .then((res: any) => {
              setImageList(extractProfileImages(res.galleryEntityList));
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
        setLoaderOpen(false);
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

    followProfileActionHandler(values, publicProfileDetails.profile.profileId)
      .then((res: any) => {
        console.log("res", res);
        if (res?.responseCode === "00") {
          setIsFollowed(!isFollowed);
          setAlert({
            message: `Public profile successfully ${
              isFollowed ? "unfollowed" : "followed"
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
          <div className="eventPreviewMainText absolute right-5 top-0 mt-5">
            {getDateFromString(startDate)}
          </div>
        </div>
        <SectionColumn className="mt-1">
          <span className="organizationDetailsMainText2">
            {stringCrop(eventName, 28)}
          </span>
          <span className="eventCardTimeOrgCard">
            {`${dateFormatForEvent(
              convertDateTime(startDate, userCurrentTimeZone)
            )}`}
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
              src={
                publicProfileDetails?.profile?.coverImagePath
                  ? publicProfileDetails?.profile?.coverImagePath
                  : ""
              }
              // src={CoverImg}
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
                publicProfileDetails?.profile?.profileImagePath
                  ? publicProfileDetails?.profile?.profileImagePath
                  : ""
              }
              // src={profileImage}
              alt="Picture of the author"
              width={140}
              height={140}
              className="orgDetailViewProfileImage rounded-full ring ring-white"
            />
          </div>
        </div>
        <div className="organizationMainDetailsSec pl-10 pr-10 pt-4">
          <div className="publicProfileMainDetailsSecContent flex flex-row">
            <SectionRow>
              <SectionColumn>
                <div className="w-60">
                  <span className="orgNameText">
                    {publicProfileDetails?.profile?.profileName
                      ? publicProfileDetails?.profile?.profileName
                      : ""}
                  </span>
                </div>
                <SectionRow className="mt-4  flex justify-between">
                  <SectionColumn className="grid justify-items-center">
                    <span className="eventPreviewMainText">
                      {publicProfileDetails?.profile?.postCount || 0}
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
                    Joined on
                  </span>
                  <span className="previewEventSubTextTxt03 mt-1">
                    {publicProfileDetails?.createdDate
                      ? sinceDateConverter(
                          publicProfileDetails?.createdDate.slice(0, 10)
                        )
                      : ""}
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
                  className="ml-5 mr-3 mt-2.5 flex h-fit w-[50px] cursor-pointer flex-row"
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
              <div className="newLine3PublicPro  mr-0"></div>
            </SectionRow>

            <div className="relative flex-1">
              <div className="flex flex-row pb-16">
                <div className="content-inner-container flex flex-row">
                  <SectionColumn className="w-2/3 px-4">
                    <span className="organizationDetailsMainText2">
                      Location
                    </span>
                    <span className="previewEventSubTextTxt04 mt-1">
                      {publicProfileDetails?.profile?.location
                        ? publicProfileDetails?.profile?.location
                        : "N/A"}
                    </span>
                    <br />
                    <span className="organizationDetailsMainText2 mb-2">
                      Networks
                    </span>
                    <SectionRow>
                      {networkList
                        .map((network) => network.networkType)
                        .includes("FACEBOOK") ? (
                        <button
                          className="mr-2"
                          onClick={() => {
                            window.open(
                              networkList.filter(
                                (web) => web.networkType === "FACEBOOK"
                              )[0].link
                            );
                          }}
                        >
                          <Image
                            src={fbIcon}
                            alt="Picture of the author"
                            width={28}
                            height={28}
                          />
                        </button>
                      ) : (
                        <></>
                      )}
                      {networkList
                        .map((network) => network.networkType)
                        .includes("TWITTER") ? (
                        <button
                          className="mr-2"
                          onClick={() => {
                            window.open(
                              networkList.filter(
                                (web) => web.networkType === "TWITTER"
                              )[0].link
                            );
                          }}
                        >
                          <Image
                            src={twitterIcon}
                            alt="Picture of the author"
                            width={28}
                            height={28}
                            className="ml-2 mr-2"
                          />
                        </button>
                      ) : (
                        <></>
                      )}
                      {networkList
                        .map((network) => network.networkType)
                        .includes("LINKEDIN") ? (
                        <button
                          className="mr-2"
                          onClick={() => {
                            window.open(
                              networkList.filter(
                                (web) => web.networkType === "LINKEDIN"
                              )[0].link
                            );
                          }}
                        >
                          <Image
                            src={linkedinIcon}
                            alt="Picture of the author"
                            width={28}
                            height={28}
                          />
                        </button>
                      ) : (
                        <></>
                      )}
                      {networkList
                        .map((network) => network.networkType)
                        .includes("WEBSITE") ? (
                        <button
                          className="mr-2"
                          onClick={() => {
                            window.open(
                              networkList.filter(
                                (web) => web.networkType === "WEBSITE"
                              )[0].link
                            );
                          }}
                        >
                          <Image
                            src={websiteIcon}
                            alt="Picture of the author"
                            width={28}
                            height={28}
                          />
                        </button>
                      ) : (
                        <></>
                      )}
                    </SectionRow>
                    <br />
                    {publicProfileDetails?.interest && (
                      <>
                        <span className="organizationDetailsMainText2">
                          Interests
                        </span>
                        <span className="previewEventSubTextTxt04 mt-1">
                          {publicProfileDetails?.interest
                            ? formatInterestsWithSpaces(
                                publicProfileDetails?.interest
                              )
                            : "N/A"}
                        </span>
                      </>
                    )}
                    <br />
                    <span className="organizationDetailsMainText2">
                      Tagline
                    </span>
                    <span className="previewEventSubTextTxt04 mb-4">
                      {publicProfileDetails?.profile?.tagLine
                        ? publicProfileDetails?.profile?.tagLine
                        : "N/A"}
                    </span>
                  </SectionColumn>
                  <SectionRow className="w-1/3">
                    <div className="newLine3PublicPro"></div>
                    <SectionColumn className="px-4">
                      <span className="organizationDetailsMainText2">Work</span>
                      <span className="previewEventSubTextTxt04 mt-1">
                        {publicProfileDetails?.workPlace
                          ? publicProfileDetails?.workPlace
                          : "N/A"}
                      </span>

                      <span className="organizationDetailsMainText2">
                        University
                      </span>
                      <span className="previewEventSubTextTxt04 mt-1">
                        {publicProfileDetails?.university
                          ? publicProfileDetails?.university
                          : "N/A"}
                      </span>
                      <br />
                      <span className="organizationDetailsMainText2">
                        High School
                      </span>
                      <span className="previewEventSubTextTxt04 mt-1">
                        {publicProfileDetails?.highSchool
                          ? publicProfileDetails?.highSchool
                          : "N/A"}
                      </span>
                      <br />
                    </SectionColumn>
                  </SectionRow>
                </div>

                <SectionColumn>
                  <RoundedButton
                    ref={undefined}
                    onClick={(e: any) => {
                      setShareModal(true);
                      setProfileShareId(
                        publicProfileDetails?.profile?.profileId
                      );
                    }}
                    className="shareBTN"
                  >
                    <SectionRow className="pl-4">
                      <Image
                        className="pb-1"
                        src={share}
                        alt="Picture of the author"
                        width={20}
                        height={20}
                      />
                      <div className="pl-1">Share</div>
                    </SectionRow>
                  </RoundedButton>
                </SectionColumn>
              </div>
              <SectionRow className="absolute bottom-0 px-4">
                <button
                  onClick={(e: any) => {
                    setButonSwichState("ABOUT");
                  }}
                >
                  <div
                    className={
                      butonSwichState === "ABOUT"
                        ? "organizationDetailsOptionText2A !mb-4 transform transition duration-500"
                        : "organizationDetailsOptionText2 !mb-4 transform transition duration-500"
                    }
                  >
                    About
                  </div>
                  {butonSwichState === "ABOUT" ? (
                    <div className="seletcedLine transform transition duration-500"></div>
                  ) : (
                    <div className="seletcedLineHide transform transition duration-500"></div>
                  )}
                </button>
                <button
                  onClick={(e: any) => {
                    setButonSwichState("POST");
                  }}
                  className="ml-12"
                >
                  <div
                    className={
                      butonSwichState === "POST"
                        ? "organizationDetailsOptionText2A !mb-4"
                        : "organizationDetailsOptionText2 !mb-4"
                    }
                  >
                    Post
                  </div>
                  {butonSwichState === "POST" ? (
                    <div className="seletcedLine transform transition duration-500"></div>
                  ) : (
                    <div className="seletcedLineHide transform transition duration-500"></div>
                  )}
                </button>
                <button
                  onClick={(e: any) => {
                    setButonSwichState("EVENT");
                  }}
                  className="ml-12"
                >
                  <div
                    className={
                      butonSwichState === "EVENT"
                        ? "organizationDetailsOptionText2A !mb-4"
                        : "organizationDetailsOptionText2 !mb-4"
                    }
                  >
                    Event
                  </div>
                  {butonSwichState === "EVENT" ? (
                    <div className="seletcedLine transform transition duration-500"></div>
                  ) : (
                    <div className="seletcedLineHide transform transition duration-500"></div>
                  )}
                </button>
                <button
                  onClick={(e: any) => {
                    setButonSwichState("FOLLOWERS");
                  }}
                  className="ml-12"
                >
                  <div
                    className={
                      butonSwichState === "FOLLOWERS"
                        ? "organizationDetailsOptionText2A !mb-4 transform transition duration-500"
                        : "organizationDetailsOptionText2 !mb-4 transform transition duration-500"
                    }
                  >
                    Followers
                  </div>
                  {butonSwichState === "FOLLOWERS" ? (
                    <div className="seletcedLine transform transition duration-500"></div>
                  ) : (
                    <div className="seletcedLineHide transform transition duration-500"></div>
                  )}
                </button>
                <button
                  onClick={(e: any) => {
                    setButonSwichState("FOLLOWING");
                  }}
                  className="ml-12"
                >
                  <div
                    className={
                      butonSwichState === "FOLLOWING"
                        ? "organizationDetailsOptionText2A !mb-4 transform transition duration-500"
                        : "organizationDetailsOptionText2 !mb-4 transform transition duration-500"
                    }
                  >
                    Following
                  </div>
                  {butonSwichState === "FOLLOWING" ? (
                    <div className="seletcedLine transform transition duration-500"></div>
                  ) : (
                    <div className="seletcedLineHide transform transition duration-500"></div>
                  )}
                </button>
                <button
                  onClick={(e: any) => {
                    setButonSwichState("PHOTOS");
                  }}
                  className="ml-12"
                >
                  <div
                    className={
                      butonSwichState === "PHOTOS"
                        ? "organizationDetailsOptionText2A !mb-4 transform transition duration-500"
                        : "organizationDetailsOptionText2 !mb-4 transform transition duration-500"
                    }
                  >
                    Photos
                  </div>
                  {butonSwichState === "PHOTOS" ? (
                    <div className="seletcedLine transform transition duration-500"></div>
                  ) : (
                    <div className="seletcedLineHide transform transition duration-500"></div>
                  )}
                </button>
              </SectionRow>
            </div>
          </div>
          <br />
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
            {butonSwichState === "ABOUT" && (
              <PublicProfileAbout publicProfileDetails={publicProfileDetails} />
            )}
            {butonSwichState === "POST" && publicProfileDetails && (
              <Posts
                referenceId={publicProfileDetails?.profile?.profileId}
                profileType="PUBLIC_PROFILE"
                profileName={publicProfileDetails?.profile?.profileName}
                profileImage1={publicProfileDetails?.profile?.profileImagePath}
                isCreator={isCreator}
                isUserLogged={isUserLogged}
              />
            )}
            {butonSwichState === "EVENT" && (
              <OrganizationEvents isCreator={isCreator} />
            )}
            {butonSwichState === "FOLLOWERS" && (
              <Followers
                profileId={publicProfileDetails?.profile?.profileId}
                profileType={publicProfileDetails?.profile?.profileType}
                followType="followers"
                isCreator={isCreator}
              />
            )}{" "}
            {butonSwichState === "FOLLOWING" && (
              <Followers
                profileId={publicProfileDetails?.profile?.profileId}
                profileType={publicProfileDetails?.profile?.profileType}
                followType="following"
                isCreator={isCreator}
              />
            )}{" "}
            {butonSwichState === "PHOTOS" && (
              <OrganizationPhotos
                profileType={publicProfileDetails?.profile?.profileType}
                profileOrPartnershipId={
                  publicProfileDetails?.profile?.profileId
                }
                isCreator={isCreator}
              />
            )}
            {butonSwichState === "VIDEOS" && <OrganizationVideo />}
          </div>
        </SectionRow>
      </Section>
      <Loader loaderText={loaderText} open={loaderOpen} />
      {publicProfileDetails?.profile?.profileId === profileShareId && (
        <ShareModal url={url} title="Check out this Public Profile!" />
      )}
      <ImageModal images={imageList} />
      {publicProfileDetails && (
        <ProfileDetailsEditModal
          detailContent={
            <PublicProfileDetailContent details={publicProfileDetails} />
          }
          type={String(AccountType.PUBLIC_PROFILE)}
          details={publicProfileDetails}
          profilePicture={publicProfileDetails?.profile?.profileImagePath}
          coverPicture={publicProfileDetails?.profile?.coverImagePath}
          userId={getProfileId()}
        />
      )}
    </React.Fragment>
  );
};

export default PublicProfileDetailsView;
