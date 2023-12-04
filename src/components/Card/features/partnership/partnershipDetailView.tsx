import { DR_Logo_04, placeholderImage, share } from "@/assetsLayer";

import Section, { SectionColumn, SectionRow } from "@/layouts/section";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { getIdFromUrl } from "@/helpers/stringCrop";
import { useAlerts } from "@/hooks/alertHook";
import EventCard from "../../timeline/eventCard";
import ImagesWrapperCard from "../../timeline/ImagesWrapper";
import { getPartnershipPublicURLActionHandler } from "@/actionLayer/partnership/partnershipActions";
import { getAllEventActionHandler } from "@/actionLayer/event/eventActions";
import Loader from "../../../../components/Modal/LoadingModal";
import { getTimeDifference } from "@/helpers/dateHelpers";
import { AccountType, tabViewData } from "@/helpers/enumHelpers";
import PartnershipAbout from "./PartnershipSwitchComponents/about";
import PartnershipEvents from "./PartnershipSwitchComponents/event";
import PartnershipPhotos from "./PartnershipSwitchComponents/photos";
import PartnershipVideo from "./PartnershipSwitchComponents/videos";
import {
  extractProfileDetails,
  extractProfileImages,
} from "@/helpers/extractDataHelper";
import { ModalOpenCloseContext } from "@/contexts/modalContext/modalOpenCloseContext";
import { getGalleryImagesActionHandler } from "@/actionLayer/organization/organizationActions";
import RoundedButton from "../../../../components/Buttons/RoundedButtons";
import ShareModal from "../../../../components/Modal/share/ShareModal";
import ImageModal from "../../../../components/Modal/imageSlider/ImageModal";
import {
  followPartnershipActionHandler,
  getFollowDetailsActionHandler,
} from "@/actionLayer/follow/followActions";
import {
  getProfileId,
  getUserAccountType,
  getUserIdFromStorage,
} from "@/helpers/authHelper";
import Followers from "../organization/components/organizationSwichComponents/followers";
import Posts from "../organization/components/organizationSwichComponents/posts";
import { getId } from "@/helpers/payloadHelper";

export interface PartnershipDetailViewProps { }

const PartnershipDetailView: React.FC<PartnershipDetailViewProps> = (props) => {
  const { setAlert } = useAlerts();

  const [partnershipDetail, setPartnershipDetail] = useState<any>();
  const [eventDetails, setEventDetails] = useState<any>([]);
  const [loaderOpen, setLoaderOpen] = useState(false);
  const [loaderText, setLoaderText] = useState("");
  const [buttonSwitchState, setButtonSwitchState] = useState("ABOUT");
  const [listOfProfiles, setListOfProfiles] = useState([]);
  const { setShareModal } = React.useContext(ModalOpenCloseContext);
  const [url, setUrl] = useState("");
  const [isFollowed, setIsFollowed] = useState(false);
  const [followersCount, setFollowersCount] = useState(0);
  const [initFollowerCount, setInitFollowerCount] = useState(0);
  const [initIsFollowedState, setInitIsFollowedState] = useState(false);
  const [isCreator, setIsCreator] = useState(false);
  const [imageList, setImageList] = useState([]);
  const [isUserLogged, setIsUserLogged] = useState(false);
  const [partnershipShareId, setPartnershipShareId] = useState(0);
  const [userAccountType, setUserAccountType] = useState("")

  useEffect(() => {
    setLoaderText("Please Wait...");
    setLoaderOpen(true);

    setUserAccountType(getUserAccountType());

    if (getUserIdFromStorage()) {
      setIsUserLogged(true);
    } else {
      setIsUserLogged(false);
    }

    const currentUrl = window.location.href;
    getIdFromUrl(currentUrl);
    setUrl(currentUrl);
    // Get all upcoming events
    let upcomingEventValues = {
      page: 0,
      size: 5,
      eventType: "ALL",
      dateFilter: "upcoming",
      publicUrl: currentUrl,
      profileType: [String(AccountType.PARTNERSHIP)],
    };

    getPartnershipPublicURLActionHandler(currentUrl)
      .then((res: any) => {
        if (res?.responseCode === "00") {
          setLoaderOpen(false);
          setPartnershipDetail(res?.partnershipEntityDto);

          if (
            res?.partnershipEntityDto?.partnershipId === getProfileId() &&
            getUserAccountType() === "PARTNERSHIP"
          ) {
            setIsCreator(true);
          }
          const setOfProfiles = extractProfileDetails(
            res?.partnershipEntityDto.partnershipDetailEntityList
          );
          setListOfProfiles(setOfProfiles);

          let followersValue = {
            loggedProfileRefernceId: getId(),
            loggedProfileType: getUserAccountType(),
            pointedProfileReferenceId: res.partnershipEntityDto.partnershipId,
            pointedProfileType: "PARTNERSHIP",
          };

          getFollowDetailsActionHandler(followersValue)
            .then((res: any) => {
              if (res?.responseCode === "00") {
                console.log("followers res :>> ", res);
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
                setEventDetails(res?.eventEntityList);
              } else {
                setAlert({
                  message: "There is something wrong fetching events.!",
                  severity: "error",
                });
              }
              return res;
            })
            .catch((error) => {
              setLoaderOpen(false);
              setAlert({
                message: "error",
                severity: "error",
              });
              return error;
            });

          let values = {
            profileOrPartnershipId: res?.partnershipEntityDto?.partnershipId,
            profileType: String(AccountType.PARTNERSHIP),
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
      profileId:
        getUserAccountType() === "ORGANIZATION" ||
          getUserAccountType() === "PUBLIC_PROFILE"
          ? getProfileId()
          : null,
      isFollow: !isFollowed,
      userId:
        getUserAccountType() === "INITIAL" ? getUserIdFromStorage() : null,
    };
    console.log("follow values", values);

    followPartnershipActionHandler(values, partnershipDetail.partnershipId)
      .then((res: any) => {
        console.log("res", res);
        if (res?.responseCode === "00") {
          setIsFollowed(!isFollowed);
          setAlert({
            message: `Partnership successfully ${isFollowed ? "unfollowed" : "followed"
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

  return (
    <React.Fragment>
      <Section className="grid w-full justify-items-center !pt-4">
        <br />
        <div className="coverImageContainer">
          <div className="topLeftText">Partnership</div>

          <div className="absolute right-0 top-0 z-0">
            <img
              src={DR_Logo_04.src || ""}
              alt="Picture of the author"
              className="rounded-r-lg"
            />
          </div>
          <SectionColumn>
            <div className="imageWrapper mx-auto">
              <Image
                src={
                  partnershipDetail
                    ? partnershipDetail.partnershipDetailEntityList[0].profile
                      .profileImagePath
                    : placeholderImage
                }
                alt="Picture of the author"
                width={140}
                height={140}
                className="baseImage publicURLProfileImage ml-5 rounded-full ring ring-white"
              />
              <Image
                src={
                  partnershipDetail
                    ? partnershipDetail.partnershipDetailEntityList[1].profile
                      .profileImagePath
                    : placeholderImage
                }
                alt="Second image"
                width={140} // Adjust width to half of the first image
                height={140}
                className="overlayImage publicURLProfileImage rounded-full ring ring-white"
              />
            </div>
            <div className="mt-3 justify-center text-center align-middle">
              <span className="partnership-h3-white-text">
                {partnershipDetail ? (
                  <>
                    {
                      partnershipDetail.partnershipDetailEntityList[0].profile
                        .profileName
                    }{" "}
                    Partner with{" "}
                    {
                      partnershipDetail.partnershipDetailEntityList[1].profile
                        .profileName
                    }
                  </>
                ) : (
                  ""
                )}
              </span>
            </div>
            <div className="mt-1 justify-center text-center align-middle">
              <span className="partnership-p-white-text">
                {partnershipDetail
                  ? getTimeDifference(partnershipDetail.createdDate)
                  : ""}
              </span>
            </div>
          </SectionColumn>
        </div>
        <div className="tabContainer-partnership">
          <SectionRow className="relative h-full justify-center align-middle">
            {tabViewData.map((button, index) => (
              <button
                key={button.state}
                onClick={() => setButtonSwitchState(button.state)}
                className={index > 0 ? "ml-12" : ""}
              >
                <div
                  className={
                    buttonSwitchState === button.state
                      ? "organizationDetailsOptionText2A !mb-2 transform transition duration-500"
                      : "organizationDetailsOptionText2 !mb-2 transform transition duration-500"
                  }
                >
                  {button.label}
                </div>
                {buttonSwitchState === button.state ? (
                  <div className="seletcedLine transform transition duration-500"></div>
                ) : (
                  <div className="seletcedLineHide transform transition duration-500"></div>
                )}
              </button>
            ))}
            <SectionColumn className="absolute right-0 mr-5">
              <RoundedButton
                ref={undefined}
                onClick={(e: any) => {
                  setShareModal(true);
                  setPartnershipShareId(partnershipDetail?.partnershipId)
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
          </SectionRow>
        </div>

        <SectionRow className="orgDetailsDownSec mt-6 ">
          <SectionColumn>
            <div className="followersCardSec3 flex flex-col">
              <SectionColumn>
                <SectionRow className="mt-4 px-4 flex justify-around">
                  <SectionColumn className="grid justify-items-center">
                    <span className="eventPreviewMainText">
                      {partnershipDetail?.postCount || 0}
                    </span>
                    <span className="previewEventSubTextTxt03">Post</span>
                  </SectionColumn>
                  <SectionColumn className="grid justify-items-center">
                    <span className="eventPreviewMainText">
                      {followersCount || 0}
                    </span>
                    <span className="previewEventSubTextTxt03">Followers</span>
                  </SectionColumn>
                  {/* <SectionColumn className="grid justify-items-center">
                    <span className="eventPreviewMainText">{followersDetails?.countResponse?.followingCount || 0}</span>
                    <span className="previewEventSubTextTxt03">Following</span>
                  </SectionColumn> */}
                </SectionRow>
                {isUserLogged && (
                  <SectionRow className="mt-6 px-6 justify-center">
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
                  </SectionRow>
                )}
              </SectionColumn>
            </div>
            {/* <div className="mt-4">
              <FollowersCard />
            </div> */}
            <div className="mt-4">
              <ImagesWrapperCard imageList={imageList} />
            </div>
            <div className="mt-4">
              <EventCard eventList={eventDetails} />
            </div>
          </SectionColumn>

          <div className="right-main-div ml-5">
            {buttonSwitchState === "ABOUT" && (
              <PartnershipAbout
                partnershipDetails={partnershipDetail}
                listOfProfiles={listOfProfiles}
                initialId={listOfProfiles[0]?.profileId}
              />
            )}
            {buttonSwitchState === "POST" && partnershipDetail && (
              <Posts
                referenceId={partnershipDetail?.partnershipId}
                profileType="PARTNERSHIP"
                profileName={partnershipDetail?.partnershipName}
                profileImage1={
                  partnershipDetail?.partnershipDetailEntityList[0]?.profile
                    ?.profileImagePath
                }
                profileImage2={
                  partnershipDetail?.partnershipDetailEntityList[1]?.profile
                    ?.profileImagePath
                }
                isCreator={isCreator}
                isUserLogged={isUserLogged}
              />
            )}
            {buttonSwitchState === "EVENT" && (
              <PartnershipEvents isCreator={isCreator} />
            )}
            {buttonSwitchState === "FOLLOWERS" && (
              <Followers
                profileId={partnershipDetail?.partnershipId}
                profileType="PARTNERSHIP"
                followType="followers"
                isCreator={isCreator}
              />
            )}
            {buttonSwitchState === "PHOTOS" && (
              <PartnershipPhotos
                profileType={String(AccountType.PARTNERSHIP)}
                profileOrPartnershipId={partnershipDetail?.partnershipId}
                isCreator={isCreator}
              />
            )}
            {buttonSwitchState === "VIDEOS" && <PartnershipVideo />}
          </div>
        </SectionRow>
      </Section>
      <Loader loaderText={loaderText} open={loaderOpen} />
      {partnershipDetail?.partnershipId === partnershipShareId && <ShareModal url={url} title="Check out this Organization!" />}
      <ImageModal images={imageList} />
    </React.Fragment>
  );
};

export default PartnershipDetailView;
