import { image11 } from "@/assetsLayer";
import RoundedButton from "../../../../../../components/Buttons/RoundedButtons";
import { SectionRow } from "@/layouts/section";
import Image from "next/image";
import React, { useState, useEffect } from "react";
import { OrganizationCreateStageContext } from "@/contexts/organizationContext/organizationCreateStageContext";
import { getOrganizationActionHandler } from "@/actionLayer/organization/organizationActions";
import { useAlerts } from "@/hooks/alertHook";
import Loader from "../../../../../../components/Modal/LoadingModal";
import { FormControlLabel, Switch } from "@mui/material";
import { getId } from "@/helpers/payloadHelper";
import {
  getProfileId,
  getUserAccountType,
  getUserIdFromStorage,
} from "@/helpers/authHelper";
import { followProfileActionHandler } from "@/actionLayer/follow/followActions";
import { extractOrganizationDetails } from "@/helpers/extractDataHelper";
import { AdminPanelContext } from "@/contexts/adminPanelContext/adminPanelContext";

export interface OrganizationlistViewProps {}

const OrganizationlistView: React.FC<OrganizationlistViewProps> = (props) => {
  const { setAlert } = useAlerts();

  const [orgArrayList, setOrgArrayList] = useState<any>([]);
  const [page, setPage] = useState(0);
  const [loaderOpen, setLoaderOpen] = useState(false);
  const [loaderText, setLoaderText] = useState("");
  const [showYourOrg, setShowYourOrg] = useState(false);
  const [loggedUserType, setLoggedUserType] = useState("");

  const { setUserOwnOrganization } = React.useContext(
    OrganizationCreateStageContext
  );
  const { showUserOrgs, setShowUserOrgs } = React.useContext(AdminPanelContext);

  useEffect(() => {
    setLoggedUserType(getUserAccountType());
    if (showUserOrgs) {
      setShowYourOrg(true);
    }
  }, []);

  useEffect(() => {
    setLoaderText("Please Wait...");
    setLoaderOpen(true);

    let getAllOrganizationsValues = {
      page: page,
      size: 1000,
      isDescending: true,
      userId: parseInt(localStorage.getItem("userId")),
      userIn: showUserOrgs === true ? true : showYourOrg,
      // loggedUserId: parseInt(localStorage.getItem("userId")),
      profileType: "ORGANIZATION",
      loggedProfileReferenceId: getId(),
      loggedProfileType: getUserAccountType(),
    };

    getOrganizationActionHandler(getAllOrganizationsValues)
      .then((res: any) => {
        if (res?.responseCode === "00") {
          setLoaderOpen(false);
          setOrgArrayList(extractOrganizationDetails(res.organization));
          console.log(
            "res :>>______ ",
            extractOrganizationDetails(res.organization)
          );
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
  }, [showYourOrg]);

  const loadGetAllOrganizations = () => {
    setLoaderText("Please Wait...");
    setLoaderOpen(true);

    let getAllOrganizationsValues = {
      page: page + 1,
      size: 1000,
      isDescending: true,
      userId: parseInt(localStorage.getItem("userId")),
      userIn: showYourOrg,
      // loggedUserId: parseInt(localStorage.getItem("userId")),
      profileType: "ORGANIZATION",
      loggedProfileReferenceId: getId(),
      loggedProfileType: getUserAccountType(),
    };

    console.log("page :>> ", page);

    getOrganizationActionHandler(getAllOrganizationsValues)
      .then((res: any) => {
        if (res?.responseCode === "00") {
          setLoaderOpen(false);
          console.log("res :>> ", res.organization);
          const combinedArray = [...orgArrayList, ...res.organization];
          setOrgArrayList(combinedArray);
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
    setShowUserOrgs(false);
    setShowYourOrg(!showYourOrg);
    setPage(0);
  };

  const handleViewEventDetails = (url) => {
    setUserOwnOrganization(false);
    window.open(`/${url}`, "_blank");
  };

  const toggleFollow = (index: number) => {
    const updatedOrgArrayList = [...orgArrayList];
    const org = updatedOrgArrayList[index];

    // Toggle the isFollower value
    org.profile.isFollower =
      org.profile.isFollower === "true" ? "false" : "true";

    // Update the state with the new orgArrayList
    setOrgArrayList(updatedOrgArrayList);

    console.log("updated list ------------>", updatedOrgArrayList);

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
    console.log("follow values", values);

    followProfileActionHandler(values, profileId)
      .then((res: any) => {
        console.log("res", res);
        if (res?.responseCode === "00") {
          console.log("res", res);
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
        className="orgListCard !mb-5  grid transform justify-items-center pt-4 transition duration-500 hover:scale-105 hover:cursor-pointer"
        onClick={(e: any) => handleViewEventDetails(url)}
        style={{ marginBottom: index % 3 === 2 ? "0" : "2rem" }}
      >
        <Image
          // loader ={() => LoginPageImage}
          src={image || image11}
          alt="Picture of the author"
          width={110}
          height={110}
          className="orgListViewProfileImage rounded-full"
        />
        <div className="orgListCardText">{profileName}</div>
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
          <p className="toggleBTN mr-5">Show your organizations</p>
          <FormControlLabel
            control={
              <Switch
                checked={showYourOrg}
                onChange={(e: any) => handleToggleChange()}
                name="gilad"
              />
            }
            label=""
          />
        </SectionRow>
        <div className="orgListContainer">
          {Array.isArray(orgArrayList) && orgArrayList.length > 0 ? (
            orgArrayList?.map((org, index) =>
              renderOrganizationView(
                org.profile.profileName,
                org.profile.profileImagePath,
                org.profile.publicUrl,
                org.profile.isFollower,
                org.profile.profileId,
                index
              )
            )
          ) : (
            <div className="eventMainText no-result-container ">
              No results for organizations
            </div>
          )}
        </div>

        {/* TODO  uncomment load more button */}
        {/* <div className="mr-4 mt-8 grid justify-items-center">
          <RoundedButton
            ref={undefined}
            onClick={(e: any) => {
              loadGetAllOrganizations();
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
export default OrganizationlistView;
