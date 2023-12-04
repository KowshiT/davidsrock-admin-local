import React, { useState, useEffect } from "react";
import { placeholderImage, threeDots } from "@/assetsLayer";
import { SectionColumn } from "@/layouts/section";
import Image from "next/image";
import { BsFillArrowRightCircleFill } from "react-icons/bs";
import {
  followProfileActionHandler,
  getFollowerFollowingDetailsActionHandler,
} from "@/actionLayer/follow/followActions";
import { useAlerts } from "@/hooks/alertHook";
import { stringCrop } from "@/helpers/stringCrop";
import RoundedButton from "../../../../../../components/Buttons/RoundedButtons";
import { getProfileId, getUserAccountType, getUserIdFromStorage } from "@/helpers/authHelper";
import { AccountType } from "@/helpers/enumHelpers";

export interface FollowersProps {
  profileId: any;
  followType: string;
  profileType: string;
  isCreator?: any;
}

const Followers: React.FC<FollowersProps> = (props) => {
  const [followDetails, setFollowDetails] = useState<any>({});
  const [isLoading, setIsLoading] = useState(true);
  const [followingList, setFollowingList] = useState<any>([]);
  const { setAlert } = useAlerts();

  useEffect(() => {
    let values = {
      pointedProfileReferenceId: props.profileId,
      followersOrFollowings: props.followType,
      pointedProfileType: props.profileType,
    };

    getFollowerFollowingDetailsActionHandler(values)
      .then((res: any) => {
        if (res?.responseCode === "00") {
          console.log("followers res :>> ", res);
          setFollowDetails(res?.followFollowingDTO);
          setFollowingList(
            res?.followFollowingDTO.map((follow) => follow.referenceId)
          );
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
  }, []);

  const routeToDetailView = (publicUrl) => {
    window.open(`/${publicUrl}`, "_blank");
  };

  const toggleFollow = (index: number) => {
    const updatedFollowArrayList = [...followDetails];
    const follow = updatedFollowArrayList[index];

    // Toggle the isFollower value
    follow.isFollowing =
      !follow.isFollowing;

    // Update the state with the new orgArrayList
    setFollowDetails(updatedFollowArrayList);

    console.log("updated list ------------>", !follow.isFollowing);

    // Trigger the API call with the new isFollower value
    followHandler(follow.isFollowing, follow.referenceId);
  };

  const followHandler = (isFollowing, profileId) => {
    let values = {
      followingProfileId:
        getUserAccountType() === "ORGANIZATION" ||
          getUserAccountType() === "PUBLIC_PROFILE"
          ? getProfileId()
          : null,
      isFollow: isFollowing,
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

  const renderFollowers = ({
    referenceId,
    profileName,
    imagePath1,
    imagePath2,
    type,
    description,
    publicUrl,
    isFollowing,

  }, index) => {
    return (
      <div
        className="card-follower cursor-pointer"
        onClick={() => routeToDetailView(publicUrl)}
      >
        {type === String(AccountType.PARTNERSHIP) ? (
          <div className="profile-image-container-partnership flex flex-row">
            <div className="profile-image-container-follow-partnership ring ring-white baseImage">
              <img
                className="profile-image"
                src={imagePath1 || placeholderImage}
                alt="Profile 1"
              />
            </div>
            <div className="profile-image-container-follow-partnership ring ring-white overlayImage">
              <img
                className="profile-image"
                src={imagePath2 || placeholderImage}
                alt="Profile 1"
              />
            </div>
          </div>
        ) : (
          <div className="profile-image-container-follow">
            <img
              className="profile-image"
              src={imagePath1 || placeholderImage}
              alt="Profile 1"
            />
          </div>
        )}

        <div className="content">
          <SectionColumn></SectionColumn>
          <p className="partnershipMinHeader">{stringCrop(profileName, 80)} </p>
          <div>
            <SectionColumn className="">
              <span className="partnershipGrayText">
                {type === String(AccountType.PARTNERSHIP)
                  ? "In publishing and graphic design, Lorem ipsum is a placeholder text  "
                  : props.isCreator
                    ? stringCrop(description, 80)
                    : stringCrop(description, 100)}
              </span>

              <div className="bottom-0 left-0 my-auto mt-2 flex flex-row items-center align-middle">
                <p className="previewEventSubTextTxt07-blue mr-1">See More</p>
                <BsFillArrowRightCircleFill
                  style={{ color: "#2cd1ef", fontSize: "13px" }}
                />
              </div>
            </SectionColumn>
          </div>
        </div>
        {props.isCreator && type !== String(AccountType.INITIAL) ? (
          <div className="m-auto">
            <RoundedButton
              ref={undefined}
              onClick={(e: any) => {
                e.stopPropagation();
                toggleFollow(index); // Call the toggleFollow function
              }}
              className={isFollowing === false ? "followBtn3 " : "followBTN "}
            >
              {isFollowing === true ? "Unfollow" : "Follow"}
            </RoundedButton>
          </div>
        ) : null}
      </div>
    );
  };

  const renderFollowersSkeleton = () => {
    return (
      <div className="flex flex-row  mr-4 items-center">
        <Image
          src={placeholderImage}
          alt="Picture of the author"
          width={65}
          height={65}
          className="followersProfileImageImage my-4 !mr-4"
        />
        <SectionColumn className="w-[70%] pr-10">
          <div className="skeleton skeleton-title rounded mt-1"></div>
          <div className="skeleton skeleton-text rounded text-white">
            ut labore et dolore magna aliqua.Aliquet lectus proin nibh nisl
            condimentum id venenatis a.
          </div>
          <div className="skeleton skeleton-sub-title rounded mt-2"></div>
        </SectionColumn>
        <div className="justify-self-end">
          <Image
            src={threeDots}
            alt="Picture of the author"
            width={35}
            height={35}
          />
        </div>
      </div>
    );
  };

  const displayNoFollowerFollowingMsg = () => {
    if (props.followType === "followers") {
      if (props.isCreator) {
        return "You don't have any followers.";
      } else {
        return "No followers.";
      }
    } else {
      if (props.isCreator) {
        return "You are not following anyone.";
      } else {
        return "No followings.";
      }
    }
  }

  const isFollowerFollowingAvailableChecker = () => {
    return (
      followDetails.length > 0 ?
        followDetails?.map((detail, index) => renderFollowers(detail, index)) :
        <div className=" mt-8 mb-8 grid w-full justify-items-center">
          <span className="eventMainText mt-4">
            {displayNoFollowerFollowingMsg()}
          </span>
        </div>
    )
  }

  return (
    <div className="follower-wrapper">
      <div className="followers-wrapper-scroll">
        <div className="card-container-follower">
          {isLoading ? (
            renderFollowersSkeleton()
          ) : (
            isFollowerFollowingAvailableChecker()
          )}
        </div>
        {/* TODO */}
        {/* <div className="mr-4 my-8 grid justify-items-center">
          <RoundedButton
            ref={undefined}
            onClick={undefined}
            className="loadMoreBTN"
          >
            Load More
          </RoundedButton>
        </div> */}
      </div>
    </div>
  );
};

export default Followers;
