import { image11 } from "@/assetsLayer";
import RoundedButton from "../../../../../Buttons/RoundedButtons";
import { SectionRow } from "@/layouts/section";
import Image from "next/image";
import React, { useState, useEffect } from "react";
import { getOrganizationActionHandler } from "@/actionLayer/organization/organizationActions";
import { useAlerts } from "@/hooks/alertHook";
import { PublicProfileCreateStageContext } from "@/contexts/publicProfileContext/createPublicProfileStageContext";
import Loader from "../../../../../../components/Modal/LoadingModal";
import { FormControlLabel, Switch } from "@mui/material";
import { getId } from "@/helpers/payloadHelper";
import {
  getProfileId,
  getUserAccountType,
  getUserIdFromStorage,
} from "@/helpers/authHelper";
import { followProfileActionHandler } from "@/actionLayer/follow/followActions";
import { extractPublicProfileDetails } from "@/helpers/extractDataHelper";
import { stringCrop } from "@/helpers/stringCrop";

export interface PublicProfilelistViewProps {}

const PublicProfileListViewCard: React.FC<PublicProfilelistViewProps> = (
  props
) => {
  const { setAlert } = useAlerts();
  const [loaderOpen, setLoaderOpen] = useState(false);
  const [loaderText, setLoaderText] = useState("");
  const [page, setPage] = useState(0);
  const [showYourPublicProfile, setShowYourPublicProfile] = useState(false);
  const [publicProfileArrayList, setPublicProfileArrayList] = useState<any>([]);
  const [loggedUserType, setLoggedUserType] = useState("");

  const { setUserOwnPublicProfile } = React.useContext(
    PublicProfileCreateStageContext
  );

  useEffect(() => {
    setLoggedUserType(getUserAccountType());
  }, []);

  useEffect(() => {
    setLoaderText("Please Wait...");
    setLoaderOpen(true);

    let getAllPublicProfilesValues = {
      page: page,
      size: 1000,
      isDescending: true,
      userId: parseInt(localStorage.getItem("userId")),
      userIn: showYourPublicProfile,
      // loggedUserId: parseInt(localStorage.getItem("userId")),
      profileType: "PUBLIC_PROFILE",
      loggedProfileReferenceId: getId(),
      loggedProfileType: getUserAccountType(),
    };

    getOrganizationActionHandler(getAllPublicProfilesValues)
      .then((res: any) => {
        if (res?.responseCode === "00") {
          setLoaderOpen(false);
          setPublicProfileArrayList(
            extractPublicProfileDetails(res.publicProfile)
          );
          console.log("res :>> ", res.publicProfile);
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
  }, [showYourPublicProfile]);

  const loadGetAllPublicProfiles = () => {
    setLoaderText("Please Wait...");
    setLoaderOpen(true);

    let getAllPublicProfilesValues = {
      page: page + 1,
      size: 1000,
      isDescending: true,
      userId: parseInt(localStorage.getItem("userId")),
      userIn: showYourPublicProfile,
      // loggedUserId: parseInt(localStorage.getItem("userId")),
      profileType: "PUBLIC_PROFILE",
      loggedProfileReferenceId: getId(),
      loggedProfileType: getUserAccountType(),
    };

    console.log("page :>> ", page);

    getOrganizationActionHandler(getAllPublicProfilesValues)
      .then((res: any) => {
        if (res?.responseCode === "00") {
          setLoaderOpen(false);
          console.log("res :>> ", res.publicProfile);
          const combinedArray = [
            ...publicProfileArrayList,
            ...res.publicProfile,
          ];
          setPublicProfileArrayList(combinedArray);
          setPage(page + 1);
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
  };

  const handleToggleChange = () => {
    setShowYourPublicProfile(!showYourPublicProfile);
    setPage(0);
  };

  const handleViewEventDetails = (url) => {
    setUserOwnPublicProfile(false);
    window.open(`/${url}`, "_blank");
  };

  const toggleFollow = (index: number) => {
    const updatedPublicArrayList = [...publicProfileArrayList];
    const org = updatedPublicArrayList[index];

    // Toggle the isFollower value
    org.profile.isFollower =
      org.profile.isFollower === "true" ? "false" : "true";

    // Update the state with the new orgArrayList
    setPublicProfileArrayList(updatedPublicArrayList);

    console.log("updated list ------------>", updatedPublicArrayList);

    // Trigger the API call with the new isFollower value
    followHandler(org.profile.isFollower.toString(), org.profile.profileId);
  };

  const followHandler = (isFollower, profileId) => {
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

    followProfileActionHandler(values, profileId)
      .then((res: any) => {
        console.log("res", res);
        if (res?.responseCode === "00") {
          console.log("res", res);
        } else {
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

  const displayBtnClassName = (isFollower) => {
    if (loggedUserType === "PARTNERSHIP") {
      return "followBtn3";
    } else if (isFollower === "false") {
      return "followBtn3";
    } else {
      return "followBTN";
    }
  };
  const displayBtnName = (isFollower) => {
    if (loggedUserType === "PARTNERSHIP") {
      return "View";
    } else if (isFollower === "true") {
      return "Unfollow";
    } else {
      return "Follow";
    }
  };

  const renderPublicProfileView = (
    profileName: string,
    image: any,
    isFollower: string,
    url: string,
    profileId: any,
    index: any
  ) => {
    return (
      <button
        className="orgListCard !mb-5 grid transform justify-items-center pt-4 transition duration-500 hover:scale-105 hover:cursor-pointer"
        onClick={(e: any) => handleViewEventDetails(url)}
      >
        <Image
          // loader ={() => LoginPageImage}
          src={image || image11}
          alt="Picture of the author"
          width={110}
          height={110}
          className="orgListViewProfileImage rounded-full"
        />
        <div className="orgListCardText">{stringCrop(profileName, 20)}</div>
        <RoundedButton
          ref={undefined}
          onClick={(e: any) => {
            if (loggedUserType === "PARTNERSHIP") {
              e.stopPropagation();
              handleViewEventDetails(url);
            } else {
              e.stopPropagation();
              toggleFollow(index);
            }
          }}
          className={displayBtnClassName(isFollower)}
        >
          {displayBtnName(isFollower)}
        </RoundedButton>
      </button>
    );
  };

  return (
    <React.Fragment>
      <div className="orgRightMainSec pb-4">
        <SectionRow className="mb-5">
          <p className="toggleBTN mr-5">Show your Public Profile</p>
          <FormControlLabel
            control={
              <Switch
                checked={showYourPublicProfile}
                onChange={(e: any) => handleToggleChange()}
                name="gilad"
              />
            }
            label=""
          />
        </SectionRow>

        <div className="orgListContainer">
          {Array.isArray(publicProfileArrayList) &&
          publicProfileArrayList.length > 0 ? (
            publicProfileArrayList?.map((org, index) =>
              renderPublicProfileView(
                org?.profile?.profileName,
                org?.profile?.profileImagePath,
                org?.profile?.isFollower,
                org?.profile?.publicUrl,
                org.profile.profileId,
                index
              )
            )
          ) : (
            <div className="eventMainText no-result-container ">
              No results for public profiles
            </div>
          )}
        </div>

        {/* TODO  uncomment load more button */}
        {/* <div className="mr-4 mt-8 grid justify-items-center">
          <RoundedButton
            ref={undefined}
            onClick={(e: any) => {
              loadGetAllPublicProfiles();
            }}
            className="loadMoreBTN"
          >
            Load More
          </RoundedButton>
        </div> */}
      </div>
      <Loader loaderText={loaderText} open={loaderOpen} />
    </React.Fragment>
  );
};

export default PublicProfileListViewCard;
