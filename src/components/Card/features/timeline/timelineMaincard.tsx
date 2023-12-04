import {
  shearIcon2,
  image11,
  leftArrow2,
  rightArrow,
  threeDots,
  save,
  placeholderImage,
} from "@/assetsLayer";
import Section, { SectionColumn, SectionRow } from "@/layouts/section";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import RoundedButton from "../../../../components/Buttons/RoundedButtons";
import { ModalOpenCloseContext } from "@/contexts/modalContext/modalOpenCloseContext";
import { convertDateTime, dateFormatForTimeLine, getUserTimeZone } from "@/helpers/dateHelpers";
import ShareModal from "../../../../components/Modal/share/ShareModal";
import LoadingSkeleton from "../../../../components/Skeleton/skeleton";
import TimeLineEventCard from "./TimeLineCards/eventCard";
import TimeLineOrganizationCard from "./TimeLineCards/organizationCards";
import TimeLinePublicProfileCard from "./TimeLineCards/publicProfileCard";
import TimeLinePartnershipCard from "./TimeLineCards/partnershipCard";
import { useRouter } from "next/router";
import {
  getProfileId,
  getUserAccountType,
  getUserIdFromStorage,
  getUserNameFromLocalStorage,
  getUserProfilePicture2ToLocalStorage,
  getUserProfilePictureToLocalStorage,
  setActiveTabToLocalStorage,
} from "@/helpers/authHelper";
import { stringCrop } from "@/helpers/stringCrop";
import SelectProfileModal from "../../../../components/Modal/timeline/SelectProfileModal";
import { getOrganizationDetailsApi } from "@/api/organization/organizationApi";
import { useAlerts } from "@/hooks/alertHook";
import { useUser } from "@/contexts/authContext/userProvider";
import InsertPhotoIcon from "@mui/icons-material/InsertPhoto";
import EmojiEmotionsIcon from "@mui/icons-material/EmojiEmotions";
import CreatePostModal from "../../../../components/Modal/timeline/CreatePostModal";
import { getId } from "@/helpers/payloadHelper";
import { AccountType } from "@/helpers/enumHelpers";
import TimeLinePostCard from "./TimeLineCards/postDetailCard";
import { followProfileActionHandler } from "@/actionLayer/follow/followActions";
import { FollowContext } from "@/contexts/followContext/followContext";
import TimelinePostLikeButton from "./TimeLineCards/timelinePostBottomBar";

export interface TimelineMainCardProps {
  interestOrganizationList: any;
  timelineList: any;
}

const TimelineMainCard: React.FC<TimelineMainCardProps> = (props) => {
  const [url, setUrl] = useState<string>("");
  const [isLoading, setIsLoading] = useState(true);
  const [isLoadingSkeleton, setIsLoadingSkeleton] = useState(true);
  const [isScrollAtStart, setIsScrollAtStart] = useState(true);
  const [isScrollAtEnd, setIsScrollAtEnd] = useState(false);
  const [shareTittle, setShareTittle] = useState<string>(
    "Check out this Organization!"
  );
  const [showOptionPopup, setShowOptionPopup] = useState(false);
  const [orgList, setOrgList] = useState([]);
  const [publicProfile, setPublicProfile] = useState([]);
  const [partnershipList, setPartnershipList] = useState([]);
  const [postId, setPostId] = useState("");
  const [contentType, setContentType] = useState("");
  const [selectedId, setSelectedId] = useState("");
  const [organizationList, setOrganizationList] = useState([]);
  const [origin, setOrigin] = useState("");
  const [userCurrentTimeZone, setUserCurrentTimeZone] = useState("");

  const { setShareModal } = React.useContext(ModalOpenCloseContext);
  const { setProfileSelectModal } = React.useContext(ModalOpenCloseContext);
  const { setCreatePostModal } = React.useContext(ModalOpenCloseContext);
  const {
    timelineFollowingCount,
    setTimelineFollowingCount,
  } = React.useContext(FollowContext);

  const [initFollowingCount, setInitFollowingCount] = useState(
    timelineFollowingCount
  );

  const {
    setUserName,
    setProfilePicture,
    setProfilePicture2,
    profilePicture,
    profilePicture2,
    setAccountType,
    accountType,
  } = useUser();
  const router = useRouter();
  const { setAlert } = useAlerts();

  useEffect(() => {
    setInitFollowingCount(timelineFollowingCount);
  }, [timelineFollowingCount]);

  useEffect(() => {
    if (props?.timelineList?.length > 0) setIsLoadingSkeleton(false);
    setOrganizationList(props?.interestOrganizationList);
  }, [props.timelineList, props.interestOrganizationList]);

  useEffect(() => {
    const userTimeZone = getUserTimeZone();
    setUserCurrentTimeZone(userTimeZone);

    const originFromUrl = window.location.origin;
    setOrigin(originFromUrl);

    setUserName(getUserNameFromLocalStorage());
    setAccountType(getUserAccountType());
    setProfilePicture(getUserProfilePictureToLocalStorage());
    setProfilePicture2(getUserProfilePicture2ToLocalStorage());

    let paramValues = {
      page: 0,
      size: 1000,
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
          setOrgList(res.organization);
          setPublicProfile(res.publicProfile);
          setPartnershipList(res.partnershipEntityDtos);
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
  }, []);

  const handleOptionsPopup = (post) => {
    setPostId(post.id);
    setContentType(post.timeLineContentType);
    setShowOptionPopup(!showOptionPopup);
  };

  const handleSave = (id) => {
    console.log("id :>> ", id);
    setSelectedId(id);
    setProfileSelectModal(true);
    setShowOptionPopup(false);
  };

  const handleViewOrganizationById = (url) => {
    window.open(`/${url}`, "_blank");
  };

  const handleOrganizationRoutes = () => {
    setActiveTabToLocalStorage("View Organizations");
    router.push("/dashboard/organizationListView");
  };

  const handleShareButton = (url: string, tittle: string) => {
    const shareURL = origin + '/' + url;
    setUrl(shareURL);
    setShareTittle(tittle);
    setShareModal(true);
  };

  const shareButtonHandler = (post) => {
    if (post?.timeLineContentType === "EVENT") {
      handleShareButton(post?.publicUrl, "Check out this Event!");
    } else if (post?.timeLineContentType === "GENERAL_POST" || post?.timeLineContentType === "PARTNERSHIP_POST") {
      handleShareButton(post?.postPublicUrl, "Check out this post!");
    } else {
      handleShareButton(post?.publicUrl, "Check out this Organization!");
    }
  }

  const handleImageLoad = () => {
    setIsLoading(false);
  };

  const getEventDescription = (post: any) => {
    const createdBy = post.createdBy ? post.createdBy : "N/A";

    let eventType = "";

    if (
      post.timeLineContentType === "EVENT" ||
      post.timeLineContentType === "PARTNERSHIP_EVENT"
    ) {
      eventType = "has created a new event";
    } else if (post.timeLineContentType === "ORGANIZATION") {
      eventType = "has been created as a new organization";
    } else if (post.timeLineContentType === "PUBLIC_PROFILE") {
      eventType = "has been created as a public profile";
    } else if (post.timeLineContentType === "PARTNERSHIP") {
      eventType = "has been created as a partnership";
    } else {
      eventType = "";
    }

    const formattedDate = post.createdDate
      ? dateFormatForTimeLine(convertDateTime(post.createdDate.slice(0, 19), userCurrentTimeZone))
      : "";

    return (
      <div className="flex flex-row justify-between">
        <SectionColumn>
          <button
            className="cursor-pointer text-left"
            onClick={() => handleViewProfiles(post.publicUrl)}
          >
            <span className="eventSettingsNameText">{createdBy}</span>
            <span className="previewEventSubTextTxt04">
              {" "}
              {` ${eventType}`}
            </span>
            {(post.timeLineContentType === "GENERAL_POST" || post.timeLineContentType === "PARTNERSHIP_POST") &&
              post?.feeling.emoji && (
                <span className="previewEventSubTextTxt04">
                  {" "}
                  {"is feeling"}{" "}
                  {String?.fromCodePoint(parseInt(post?.feeling.emoji, 16))}{" "}
                  {post?.feeling?.emotion?.toLowerCase()}
                </span>
              )}
          </button>
          <span className="previewEventSubTextTxt04">{formattedDate}</span>
        </SectionColumn>
        <div>
          <button onClick={() => handleOptionsPopup(post)} className="mr-1">
            <Image
              src={threeDots}
              alt="Picture of the author"
              width={35}
              height={35}
            />
          </button>
        </div>
      </div>
    );
  };

  const handleViewProfiles = (url) => {
    window.open(`/${url}`, "_blank");
  };

  const renderTimelinePostContent = (post) => {
    if (post?.timeLineContentType === "EVENT" || post?.timeLineContentType === "PARTNERSHIP_EVENT") {
      return (
        <div className="mt-4 rounded-md">
          <TimeLineEventCard
            post={post}
            handleImageLoad={handleImageLoad}
            isLoading={isLoading}
          />
        </div>
      )
    } else if (post?.timeLineContentType === "ORGANIZATION") {
      return (
        <TimeLineOrganizationCard post={post} />
      )
    } else if (post?.timeLineContentType === "PUBLIC_PROFILE") {
      return (
        <TimeLinePublicProfileCard post={post} />
      )
    } else if (post?.timeLineContentType === "PARTNERSHIP") {
      return (
        <TimeLinePartnershipCard post={post} />
      )
    } else if (post?.timeLineContentType === "GENERAL_POST" ||
      post?.timeLineContentType === "PARTNERSHIP_POST") {
      return (
        <TimeLinePostCard
          post={post}
          handleImageLoad={handleImageLoad}
          isLoading={isLoading}
        />
      )
    } else {
      return null;
    }
  }

  const renderEventPosts = (post: any) => {
    return (
      <span key={post.id} className="mt-5">
        <div className="postMainDiv relative">
          <div className="card-container">
            <div className="card-timeline">
              {post?.timeLineContentType === "PARTNERSHIP" ||
                post?.timeLineContentType === "PARTNERSHIP_EVENT" ||
                post?.timeLineContentType === "PARTNERSHIP_POST" ? (
                <button
                  className="cursor-pointer"
                  onClick={() => handleViewProfiles(post.publicUrl)}
                >
                  <Image
                    src={post.participant1Image ? post.participant1Image : ""}
                    alt="Picture of the author"
                    width={50}
                    height={50}
                    className="baseImage timelinePostProfileImage rounded-full ring ring-white"
                  />
                  <Image
                    src={post.participant2Image ? post.participant2Image : ""}
                    alt="Second image"
                    width={50}
                    height={50}
                    className="overlayImage timelinePostProfileImage rounded-full ring ring-white"
                  />
                </button>
              ) : (
                <button
                  className="profile-image-container-timeline cursor-pointer"
                  onClick={() => handleViewProfiles(post.publicUrl)}
                >
                  <img
                    className="profile-image"
                    src={post.createdByImage ? post.createdByImage : ""}
                    alt="Profile 1"
                  />
                </button>
              )}
              <div className="content">{getEventDescription(post)}</div>
            </div>
          </div>
          <div className="postline01"></div>
          <SectionColumn className="mb-2 p-4">
            {renderTimelinePostContent(post)}
          </SectionColumn>

          <div className="postline01"></div>
          <SectionRow className="items-center justify-around pl-4 pt-2 pb-2">
            <TimelinePostLikeButton post={post} />
            <button
              className="flex cursor-pointer flex-row"
              onClick={(e: any) => shareButtonHandler(post)}
            >
              <Image
                src={shearIcon2}
                alt="Picture of the author"
                width={28}
                height={28}
              />
              <span className="PostDisText2 mt-1.5">&nbsp;Share</span>
            </button>
          </SectionRow>
          {showOptionPopup && postId === post?.id && (
            <div className="optionsPopup">
              <SectionColumn className="mt-5 ml-5 mr-5">
                {(contentType === "EVENT" ||
                  contentType === "PARTNERSHIP_EVENT" ||
                  contentType === "GENERAL_POST" ||
                  contentType === "PARTNERSHIP_POST") && (
                    <button
                      className="mb-4"
                      onClick={() =>
                        handleSave(
                          contentType === "EVENT" ||
                            contentType === "PARTNERSHIP_EVENT"
                            ? post?.createdByReferenceId
                            : post?.id
                        )
                      }
                    >
                      <SectionRow>
                        <Image
                          src={save}
                          alt="Picture of the author"
                          width={15}
                          height={15}
                        />
                        <p className="previewEventSubTextTxt04 ml-4">Save</p>
                      </SectionRow>
                    </button>
                  )}
                {/* <button className="mb-4">
                  <SectionRow>
                    <Image
                      src={report}
                      alt="Picture of the author"
                      width={15}
                      height={15}
                      className="postOptionIcon"
                    />
                    <p className="previewEventSubTextTxt04 ml-4">Report</p>
                  </SectionRow>
                </button>
                <button className="mb-5">
                  <SectionRow>
                    <Image
                      src={copyLink}
                      alt="Picture of the author"
                      width={15}
                      height={15}
                      className="postOptionIcon"
                    />
                    <p className="previewEventSubTextTxt04 ml-4">Copy Link</p>
                  </SectionRow>
                </button> */}
              </SectionColumn>
            </div>
          )}
        </div>
      </span>
    );
  };

  const toggleFollow = (index: number) => {
    setInitFollowingCount(timelineFollowingCount);
    const updatedOrgArrayList = [...organizationList];
    const org = updatedOrgArrayList[index];

    // Toggle the isFollower value
    org.profile.isFollower =
      org.profile.isFollower === "true" ? "false" : "true";

    // Update the state with the new orgArrayList
    setOrganizationList(updatedOrgArrayList);

    console.log("updated list ------------>", updatedOrgArrayList);

    // Trigger the API call with the new isFollower value
    followHandler(org.profile.isFollower.toString(), org.profile.profileId);
  };

  const followHandler = (isFollower, profileId) => {
    if (isFollower === "true")
      setTimelineFollowingCount(timelineFollowingCount + 1);
    if (isFollower === "false")
      setTimelineFollowingCount(timelineFollowingCount - 1);

    let values = {
      followingProfileId:
        getUserAccountType() === "ORGANIZATION" ||
          getUserAccountType() === "PUBLIC_PROFILE"
          ? getProfileId()
          : null,
      isFollow: isFollower === "true",
      userId:
        getUserAccountType() === "INITIAL" ? getUserIdFromStorage() : null,
    };
    console.log("follow values", values);

    followProfileActionHandler(values, profileId)
      .then((res: any) => {
        console.log("res", res);
        if (res?.responseCode === "00") {
          console.log("res", res);
        } else {
          setTimelineFollowingCount(initFollowingCount);

          setAlert({
            message: "There is something wrong. Please try again!",
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

  const renderOrganizationView = (
    profileName: string,
    image: any,
    url: string,
    isFollower: string,
    profileId: any,
    index: any
  ) => {
    return (
      <button
        className="orgListCard2 !mb-5 grid transform justify-items-center pt-4 transition duration-500 hover:scale-105 hover:cursor-pointer"
        onClick={(e: any) => handleViewOrganizationById(url)}
      >
        <Image
          src={image || image11}
          alt="Picture of the author"
          width={95}
          height={95}
          className="timelineFollowOrgProfileImage rounded-full"
        />
        <div className="orgListCardText">{stringCrop(profileName, 15)}</div>
        {getUserAccountType() === "PARTNERSHIP" ? (
          <RoundedButton
            ref={undefined}
            onClick={undefined}
            className="followBTN"
          >
            View
          </RoundedButton>
        ) : (
          <RoundedButton
            ref={undefined}
            onClick={(e: any) => {
              e.stopPropagation();
              toggleFollow(index); // Call the toggleFollow function
            }}
            className={isFollower === "false" ? "followBtn3" : "followBTN"}
          >
            {isFollower === "true" ? "Unfollow" : "Follow"}
          </RoundedButton>
        )}
      </button>
    );
  };

  const scrollContent = (direction) => {
    const wrapper = document.getElementById("organization-cards-wrapper");

    if (direction === "up") {
      wrapper.scrollLeft -=
        wrapper.offsetWidth; /* Scroll by the wrapper width */
    } else if (direction === "down") {
      wrapper.scrollLeft +=
        wrapper.offsetWidth; /* Scroll by the wrapper width */
    }
  };

  const handleScroll = () => {
    const wrapper = document.getElementById("organization-cards-wrapper");
    setIsScrollAtStart(wrapper.scrollLeft === 0);
    setIsScrollAtEnd(
      wrapper.scrollLeft + wrapper.offsetWidth + 1 >= wrapper.scrollWidth
    );
  };

  useEffect(() => {
    const wrapper = document.getElementById("organization-cards-wrapper");
    wrapper.addEventListener("scroll", handleScroll);
    return () => {
      wrapper.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const displayTimelinePosts = () => {
    if (props.timelineList) {
      return (
        props?.timelineList.map((post: any) => {
          return renderEventPosts(post);
        })
      )
    } else {
      return (
        <div>No data</div>
      )
    }
  }

  return (
    <div className="timelineWrapper">
      <button
        onClick={() => setCreatePostModal(true)}
        className="mb-5 w-full rounded-lg bg-white"
      >
        <SectionRow className="justify-between">
          <SectionRow className="items-center py-2 px-4">
            {accountType == String(AccountType.PARTNERSHIP) ? (
              <div className="navbarProfileImageWrapper !ml-1">
                <Image
                  src={profilePicture || placeholderImage}
                  alt="Picture of the author"
                  width={50}
                  height={50}
                  className="baseImage timelinePostProfileImage rounded-full ring ring-white"
                />
                <Image
                  src={profilePicture2 || placeholderImage}
                  alt="Second image"
                  width={50} // Adjust width to half of the first image
                  height={50}
                  className="overlayImage timelinePostProfileImage rounded-full ring ring-white"
                />
              </div>
            ) : (
              <div className="navbarProfileImageWrapper">
                <Image
                  // loader ={() => LoginPageImage}
                  src={profilePicture || placeholderImage}
                  alt="Picture of the author"
                  width={50}
                  height={50}
                  className="timelinePostProfileImage rounded-full ring ring-white"
                />
              </div>
            )}
            <span className="timelineAddPostText ml-4">
              What's on your mind?
            </span>
          </SectionRow>
          <SectionRow className="items-center py-2 px-4">
            <EmojiEmotionsIcon style={{ color: "#ffcc00" }} />
            <div className="timelineAddPostText2 ml-1">Feelings</div>
            <div className="imelineAddPostLine5 ml-2 mr-2"></div>

            <InsertPhotoIcon style={{ color: "blue" }} />
            <div className="timelineAddPostText2 ml-1 text-[#0000ff]">
              Photos
            </div>
          </SectionRow>
        </SectionRow>
      </button>
      <span className="timelineText01">Recommended organizations</span>

      <Section className="timelineOrganizationWrapper relative mt-4 w-full items-center overflow-hidden">
        {isScrollAtStart ? null : (
          <button
            className="slider-button left-0 ml-2 cursor-pointer"
            onClick={() => scrollContent("up")}
          >
            <Image
              src={leftArrow2}
              alt="Picture of the author"
              width={20}
              height={20}
              className=" rounded-full"
            />
          </button>
        )}

        {isScrollAtEnd ? null : (
          <button
            className="slider-button right-0 mr-3 cursor-pointer"
            onClick={() => scrollContent("down")}
          >
            <Image
              src={rightArrow}
              alt="Picture of the author"
              width={20}
              height={20}
              className=" rounded-full"
            />
          </button>
        )}

        <div
          id="organization-cards-wrapper"
          className="organization-cards-wrapper flex flex-row"
        >
          {organizationList
            ? organizationList.map((organization: any, index: number) => {
              return renderOrganizationView(
                organization.profile.profileName,
                organization.profile.profileImagePath,
                organization.profile.publicUrl,
                organization.profile.isFollower,
                organization.profile.profileId,
                index
              );
            })
            : null}
        </div>

        <button
          className="flex w-full cursor-pointer items-center justify-center rounded-md bg-white py-2 align-middle"
          onClick={(e: any) => handleOrganizationRoutes()}
        >
          <p className="h3-dark-gray-13-text">See all</p>
        </button>
      </Section>

      <SectionColumn>
        {isLoadingSkeleton ? (
          <LoadingSkeleton count={5} />
        ) : displayTimelinePosts()}
      </SectionColumn>

      <ShareModal url={url} title={shareTittle} />
      <SelectProfileModal
        orgProfileList={orgList}
        publicProfile={publicProfile}
        partnershipList={partnershipList}
        postId={selectedId}
        contentType={contentType}
      />
      <CreatePostModal />
    </div>
  );
};

export default TimelineMainCard;
