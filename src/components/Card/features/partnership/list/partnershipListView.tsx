import { placeholderImage } from "@/assetsLayer";
import RoundedButton from "../../../../../components/Buttons/RoundedButtons";
import { SectionRow } from "@/layouts/section";
import Image from "next/image";
import React, { useState, useEffect } from "react";
import { useAlerts } from "@/hooks/alertHook";
import { stringCrop } from "@/helpers/stringCrop";
import { FormControlLabel, Switch } from "@mui/material";
import { getAllPartnershipsActionHandler } from "@/actionLayer/partnership/partnershipActions";
import {
  getProfileId,
  getUserAccountType,
  getUserIdFromStorage,
} from "@/helpers/authHelper";
import Loader from "../../../../../components/Modal/LoadingModal";
import { followPartnershipActionHandler } from "@/actionLayer/follow/followActions";
import { AdminPanelContext } from "@/contexts/adminPanelContext/adminPanelContext";
import PartnershipSkeleton from "../../../../../components/Skeleton/partnershipSkeleton";

export interface PartnershipListViewProps {}

const fetchAllPartnershipDetails = async (size: any, isEnable: any) => {
  try {
    const response = await getAllPartnershipsActionHandler(size, isEnable);
    if (response?.responseCode === "00") {
      return response?.partnershipEntities;
    } else {
      throw new Error("Error fetching pending request list.");
    }
  } catch (error) {
    throw new Error("Error fetching pending request list.");
  }
};

const PartnershipListView: React.FC<PartnershipListViewProps> = (props) => {
  const { setAlert } = useAlerts();
  const [partnershipList, setPartnershipList] = useState<any>([]);
  const [isEnable, setIsEnable] = React.useState(false);
  const [loaderOpen, setLoaderOpen] = useState(true);
  const [isLoading, setIsLoading] = useState(true);
  const [loggedUserType, setLoggedUserType] = useState("");

  const { showUserPartnerships, setShowUserPartnerships } =
    React.useContext(AdminPanelContext);

  useEffect(() => {
    async function fetchData() {
      try {
        const partnerships = await fetchAllPartnershipDetails(
          1000000,
          showUserPartnerships === true ? true : isEnable
        );
        setPartnershipList(partnerships);
        setLoaderOpen(false);
        setIsLoading(false);
      } catch (error) {
        setLoaderOpen(false);
        setAlert({
          message: "Error fetch partnerships!",
          severity: "error",
        });
      }
    }

    fetchData();

    setLoggedUserType(getUserAccountType());

    if (showUserPartnerships) {
      setIsEnable(true);
    }
  }, []);

  const handleToggleChange = (): void => {
    setShowUserPartnerships(false);
    const toggleIsEnable = async (updatedIsEnable: boolean) => {
      try {
        const partnerships = await fetchAllPartnershipDetails(
          10,
          updatedIsEnable
        );
        setPartnershipList(partnerships);
      } catch (error) {
        console.error("Error fetching partnership details:", error);
      }
    };

    setIsEnable((prevIsEnable) => {
      const updatedIsEnable = !prevIsEnable;

      toggleIsEnable(updatedIsEnable);

      return updatedIsEnable;
    });
  };

  const handleRoutes = (url: any) => {
    window.open(`/${url}`, "_blank");
  };

  const toggleFollow = (index: number) => {
    const updatedPartnershipArrayList = [...partnershipList];
    const partnership = updatedPartnershipArrayList[index];

    // Toggle the isFollower value
    partnership.isFollower =
      partnership.isFollower === "true" ? "false" : "true";

    console.log("is follower", partnership.isFollower);
    // Update the state with the new orgArrayList
    setPartnershipList(updatedPartnershipArrayList);

    console.log("updated list ------------>", updatedPartnershipArrayList);

    // Trigger the API call with the new isFollower value
    followHandler(partnership.isFollower.toString(), partnership.partnershipId);
  };

  const followHandler = (isFollower, profileId) => {
    let values = {
      profileId:
        getUserAccountType() === "ORGANIZATION" ||
        getUserAccountType() === "PUBLIC_PROFILE"
          ? getProfileId()
          : null,
      isFollow: isFollower === "true",
      userId:
        getUserAccountType() === "INITIAL" ? getUserIdFromStorage() : null,
    };

    followPartnershipActionHandler(values, profileId)
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

  const displayBtnClassName = (partnership) => {
    if (loggedUserType === "PARTNERSHIP") {
      return "followBtn3";
    } else if (partnership?.isFollower === "false") {
      return "followBtn3";
    } else {
      return "followBTN";
    }
  };

  const displayBtnName = (partnership) => {
    if (loggedUserType === "PARTNERSHIP") {
      return "View";
    } else if (partnership?.isFollower === "true") {
      return "Unfollow";
    } else {
      return "Follow";
    }
  };

  const renderOrganizationView = (partnership: any, index: any) => {
    return (
      <button
        className="partnershipCard !mb-5 grid transform justify-items-center pt-4 transition duration-500 hover:scale-105 hover:cursor-pointer"
        onClick={(e: any) => handleRoutes(partnership?.publicUrl)}
      >
        <div className="mx-auto justify-center align-middle">
          <Image
            src={
              partnership?.partnershipDetailEntityList[0].profile
                .profileImagePath
                ? partnership?.partnershipDetailEntityList[0].profile
                    .profileImagePath
                : placeholderImage
            }
            alt="Picture of the author"
            width={110}
            height={110}
            className="baseImage orgListViewProfileImage ml-5 rounded-full ring ring-white"
          />
          <Image
            src={
              partnership?.partnershipDetailEntityList[1].profile
                .profileImagePath
                ? partnership?.partnershipDetailEntityList[1].profile
                    .profileImagePath
                : placeholderImage
            } // Your second image source
            alt="Second image"
            width={110} // Adjust width to half of the first image
            height={110}
            className="overlayImage orgListViewProfileImage rounded-full ring ring-white"
          />
        </div>
        <div className="orgListCardText px-2">
          {stringCrop(partnership?.partnershipName, 65)}
        </div>
        <RoundedButton
          ref={undefined}
          onClick={(e: any) => {
            if (loggedUserType === "PARTNERSHIP") {
              e.stopPropagation();
              handleRoutes(partnership?.publicUrl);
            } else {
              e.stopPropagation();
              toggleFollow(index);
            }
          }}
          className={displayBtnClassName(partnership)}
        >
          {displayBtnName(partnership)}
        </RoundedButton>
      </button>
    );
  };

  return (
    <div className="orgRightMainSec pb-4">
      <SectionRow className="mb-5">
        <p className="toggleBTN mr-5">Show your Partnerships</p>
        <FormControlLabel
          control={
            <Switch
              checked={isEnable}
              onChange={(e: any) => handleToggleChange()}
              name="gilad"
            />
          }
          label=""
        />
      </SectionRow>
      <div className="orgListContainer">
        {isLoading ? (
          <PartnershipSkeleton></PartnershipSkeleton>
        ) : partnershipList && partnershipList.length > 0 ? (
          partnershipList?.map((partnership, index) => {
            return renderOrganizationView(partnership, index);
          })
        ) : (
          <span className="eventMainText mx-auto my-auto items-center justify-center">
            No results for Partnerships
          </span>
        )}
      </div>
      <Loader loaderText={""} open={loaderOpen} />

      {/* TODO  uncomment load more button */}
      {/* <div className="grid justify-items-center mr-4 mt-8">
        <RoundedButton
          ref={undefined}
          onClick={(e: any) => {
            undefined
          }}
          className='loadMoreBTN'>
          Load More
        </RoundedButton>
      </div> */}
    </div>
  );
};
export default PartnershipListView;
