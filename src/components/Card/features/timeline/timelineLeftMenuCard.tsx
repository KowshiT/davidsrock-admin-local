import {
  DR_Logo_04,
  placeholderImage,
  save2,
  PublicProfile,
  Partnership,
} from "@/assetsLayer";
import { SectionColumn, SectionRow } from "@/layouts/section";
import Image from "next/image";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import homeIcon from "../../../../../public/assets/icons/timelineLeftmenu/homeIcon.png";
import organizationIcon from "../../../../../public/assets/icons/timelineLeftmenu/organizationIcon.png";
import eventIcon from "../../../../../public/assets/icons/timelineLeftmenu/eventIcon.png";
import { useUser } from "@/contexts/authContext/userProvider";
import {
  getInitialUserProfilePictureToLocalStorage,
  getProfileId,
  getPublicUrlFromLocalStorage,
  getUserAccountType,
  getUserIdFromStorage,
  setActiveTabToLocalStorage,
} from "@/helpers/authHelper";
import { AccountType } from "@/helpers/enumHelpers";
import { getFollowDetailsActionHandler } from "@/actionLayer/follow/followActions";
import { useAlerts } from "@/hooks/alertHook";
import { getPostsCountInTimelineActionHandler } from "@/actionLayer/post/postActions";
import { FollowContext } from "@/contexts/followContext/followContext";

export interface TimelineLeftMenuCardProps {}

const TimelineLeftMenuCard: React.FC<TimelineLeftMenuCardProps> = (props) => {
  const [followersCount, setFollowersCount] = useState(0);
  const [loggedAccountType, setLoggedAccountType] = useState("");
  const [postCount, setPostCount] = useState(0);

  const { setAlert } = useAlerts();
  const router = useRouter();
  const { timelineFollowingCount, setTimelineFollowingCount } =
    React.useContext(FollowContext);
  const {
    userName,
    profilePicture,
    profilePicture2,
    accountType,
    setProfilePicture,
  } = useUser();

  const getId = () => {
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
    if (String(AccountType.INITIAL) === getUserAccountType()) {
      setProfilePicture(getInitialUserProfilePictureToLocalStorage());
    }

    setLoggedAccountType(getUserAccountType());

    let followersValue = {
      loggedProfileRefernceId: getId(),
      loggedProfileType: getUserAccountType(),
      pointedProfileReferenceId: getId(),
      pointedProfileType: getUserAccountType(),
    };

    getFollowDetailsActionHandler(followersValue)
      .then((res: any) => {
        if (res?.responseCode === "00") {
          console.log("followers res :>> ", res);
          setFollowersCount(res?.countResponse?.followerCount);
          setTimelineFollowingCount(res?.countResponse?.followingCount);
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

    let postCountValues = {
      referenceId: getId(),
      profileType: getUserAccountType(),
    };

    getPostsCountInTimelineActionHandler(postCountValues)
      .then((res: any) => {
        if (res?.responseCode === "00") {
          console.log("post count res :>> ", res);
          setPostCount(res?.postCount);
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

  const handleHomeRoute = () => {
    setActiveTabToLocalStorage("Dashboard");
    router.push("/dashboard");
  };

  const handleViewEvent = () => {
    setActiveTabToLocalStorage("View Events");

    router.push("/dashboard/eventListView");
  };

  const handleViewOrganization = () => {
    setActiveTabToLocalStorage("View Organizations");

    router.push("/dashboard/organizationListView");
  };

  const handleViewPubliProfile = () => {
    setActiveTabToLocalStorage("View Public Profiles");

    router.push("/dashboard/publicProfileListView");
  };

  const handleViewPartnerships = () => {
    setActiveTabToLocalStorage("View Partnerships");

    router.push("/dashboard/viewPartnershipList");
  };

  const handleViewSavedItems = () => {
    setActiveTabToLocalStorage("Saved Items");

    router.push("/dashboard/savedItems");
  };

  const handleViewProfile = () => {
    window.open(`/${getPublicUrlFromLocalStorage()}`, "_blank");
  };

  return (
    <React.Fragment>
      <div className="becomeAOrgSecNewWSecWrapper">
        <div className="becomeAOrgSecNewWSec relative">
          <div className="becomeAOrgSecNew relative">
            <div className="absolute right-0 top-0 z-0">
              <Image
                src={DR_Logo_04}
                alt="Picture of the author"
                className="rounded-r-lg"
                width={156}
                height={156}
              />
            </div>
          </div>

          {accountType == String(AccountType.PARTNERSHIP) ? (
            <div
              className="absolute-center-partnership cursor-pointer"
              onClick={(e: any) => handleViewProfile()}
              onKeyDown={(e: any) => {
                if (e.key === "Enter") {
                  e.preventDefault();
                  handleViewProfile();
                }
              }}
              role="button"
              tabIndex={0}
            >
              <div className="flex flex-row">
                <Image
                  src={profilePicture || placeholderImage}
                  alt="Picture of the author"
                  width={120}
                  height={120}
                  className="baseImage timelineProfileImage rounded-full ring ring-white"
                />
                <Image
                  src={profilePicture2 || placeholderImage}
                  alt="Second image"
                  width={120} // Adjust width to half of the first image
                  height={120}
                  className="overlayImage timelineProfileImage rounded-full ring ring-white"
                />
              </div>
            </div>
          ) : (
            <div
              className="absolute-center cursor-pointer"
              onClick={(e: any) => handleViewProfile()}
              onKeyDown={(e: any) => {
                if (e.key === "Enter") {
                  e.preventDefault();
                  handleViewProfile();
                }
              }}
              role="button"
              tabIndex={0}
            >
              <Image
                // loader ={() => LoginPageImage}
                src={profilePicture || placeholderImage}
                alt="Picture of the author"
                width={120}
                height={120}
                className="timelineProfileImage rounded-full ring ring-white"
              />
            </div>
          )}
          <div className="grid w-full justify-items-center pt-4">
            <div className="eventSettingsNameTextTopic mt-8 pl-1 pr-1 text-center">
              {userName}
            </div>
          </div>
          <SectionRow
            className={
              loggedAccountType === "PARTNERSHIP" ||
              loggedAccountType === "INITIAL"
                ? "mt-4 flex justify-around px-8"
                : "mt-4 flex justify-between px-8"
            }
          >
            <SectionColumn className="grid justify-items-center">
              <span className="eventSettingsNameText">{postCount || 0}</span>
              <span className="previewEventSubTextTxt04">Post</span>
            </SectionColumn>
            {loggedAccountType !== "INITIAL" && (
              <SectionColumn className="grid justify-items-center">
                <span className="eventSettingsNameText">
                  {followersCount || 0}
                </span>
                <span className="previewEventSubTextTxt04">Followers</span>
              </SectionColumn>
            )}
            {loggedAccountType !== "PARTNERSHIP" && (
              <SectionColumn className="grid justify-items-center">
                <span className="eventSettingsNameText">
                  {timelineFollowingCount || 0}
                </span>
                <span className="previewEventSubTextTxt04">Following</span>
              </SectionColumn>
            )}
          </SectionRow>
        </div>
        <div className="homeSideBarSec pt-2 pb-4">
          <SectionColumn className="timelineLeftCardMenuScroll mt-3 grid justify-items-start ">
            <button onClick={(e: any) => handleHomeRoute()}>
              <SectionRow className="ml-4 transform transition duration-500 hover:scale-105 hover:cursor-pointer">
                <Image
                  src={homeIcon}
                  alt="Picture of the author"
                  width={32}
                  height={32}
                />
                <span className="eventSettingsNameText ml-4 mt-2">
                  Admin Panel
                </span>
              </SectionRow>
            </button>
            <button onClick={(e: any) => handleViewOrganization()}>
              <SectionRow className="ml-4 mt-3 transform transition duration-500 hover:scale-105 hover:cursor-pointer">
                <Image
                  src={organizationIcon}
                  alt="Picture of the author"
                  width={32}
                  height={32}
                />
                <span className="eventSettingsNameText ml-4 mt-2">
                  Organizations
                </span>
              </SectionRow>
            </button>
            <button onClick={(e: any) => handleViewPubliProfile()}>
              <SectionRow className="ml-4 mt-3 transform transition duration-500 hover:scale-105 hover:cursor-pointer">
                <Image
                  src={PublicProfile}
                  alt="Picture of the author"
                  width={20}
                  height={18}
                  className="leftCardIconPublicPro ml-2 mr-1 mt-1"
                />
                <span className="eventSettingsNameText ml-4 mt-2">
                  Public Profiles
                </span>
              </SectionRow>
            </button>
            <button onClick={(e: any) => handleViewPartnerships()}>
              <SectionRow className="ml-4 mt-3 transform transition duration-500 hover:scale-105 hover:cursor-pointer">
                <Image
                  src={Partnership}
                  alt="Picture of the author"
                  width={30}
                  height={25}
                  className="ml-1"
                />
                <span className="eventSettingsNameText ml-3 mt-2">
                  Partnerships
                </span>
              </SectionRow>
            </button>
            {/* <SectionRow className="ml-4 mt-3 transform transition duration-500 hover:scale-105 hover:cursor-pointer">
              <Image
                src={groupIcon}
                alt="Picture of the author"
                width={32}
                height={32}
              />
              <span className="eventSettingsNameText ml-4 mt-2">Groups</span>
            </SectionRow> */}
            <button onClick={(e: any) => handleViewEvent()}>
              <SectionRow className="ml-4 mt-3 transform transition duration-500 hover:scale-105 hover:cursor-pointer">
                <Image
                  src={eventIcon}
                  alt="Picture of the author"
                  width={32}
                  height={32}
                />
                <span className="eventSettingsNameText ml-4 mt-2">Events</span>
              </SectionRow>
            </button>
            <button onClick={(e: any) => handleViewSavedItems()}>
              <SectionRow className="ml-6 mt-3 transform transition duration-500 hover:scale-105 hover:cursor-pointer">
                <Image
                  src={save2}
                  alt="Picture of the author"
                  width={16}
                  height={16}
                  className="leftCardIcon"
                />
                <span className="eventSettingsNameText ml-5 mt-2">Saved</span>
              </SectionRow>
            </button>
          </SectionColumn>
        </div>
        {/* <div className="becomeAOrgSec relative">
          <SectionRow className="relative z-10">
            <span className="becomeaOrgMainText">
              Become
              <br />a Organization
            </span>
            <div className="absolute right-0">
              <Image
                src={whiteRArrow}
                alt="Picture of the author"
                width={28}
                height={28}
              />
            </div>
          </SectionRow>
          <SectionRow className="!z-10">
            <div className="becomeaOrgSubText !z-10 mt-3">
              Set up your business account on Davids Rock
            </div>
          </SectionRow>
          <div className="absolute right-0 top-0 z-0">
            <Image
              src={DR_Logo_04}
              alt="Picture of the author"
              className="rounded-r-lg"
              width={156}
              height={156}
            />
          </div>
        </div> */}
      </div>
    </React.Fragment>
  );
};

export default TimelineLeftMenuCard;
