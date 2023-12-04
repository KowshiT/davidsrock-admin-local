import { calenderImage } from "@/assetsLayer";
import { SectionColumn, SectionRow } from "@/layouts/section";
import Image from "next/image";
import { useRouter } from "next/router";
import React, { useState, useEffect } from "react";

import RoundedButton from "../../../../components/Buttons/RoundedButtons";

import { capitalizedFormat, stringCrop } from "@/helpers/stringCrop";
import { convertDateTime, dateFormatForEvent, getDateFromString, getUserTimeZone } from "@/helpers/dateHelpers";

import { useAlerts } from "@/hooks/alertHook";
import { getProfileId, getUserAccountType, getUserIdFromStorage, setActiveTabToLocalStorage } from "@/helpers/authHelper";
import { followProfileActionHandler } from "@/actionLayer/follow/followActions";
import TimelineOrgSkeleton from "../../../../components/Skeleton/timelineOrgSkeleton";
import { FollowContext } from "@/contexts/followContext/followContext";

export interface TimelineRightMenuCardProps {
  organizationList: any;
  eventList: any;
  rightAlign?: any;
}

const TimelineRightMenuCard: React.FC<TimelineRightMenuCardProps> = (props) => {
  const router = useRouter();
  const [isLoadingSkeleton, setIsLoadingSkeleton] = useState(true);
  const { setAlert } = useAlerts();
  const [listOfOrganization, setListOfOrganization] = useState([]);
  const [userCurrentTimeZone, setUserCurrentTimeZone] = useState("");

  const { timelineFollowingCount, setTimelineFollowingCount } = React.useContext(FollowContext);

  const [initFollowingCount, setInitFollowingCount] = useState(timelineFollowingCount);

  useEffect(() => {
    const userTimeZone = getUserTimeZone();
    setUserCurrentTimeZone(userTimeZone);
  }, [])

  useEffect(() => {
    setInitFollowingCount(timelineFollowingCount);
  }, [timelineFollowingCount])

  useEffect(() => {
    if (props.eventList.length > 0) setIsLoadingSkeleton(false);
    setListOfOrganization(props.organizationList);
  }, [props.eventList, props.organizationList]);

  const handleViewEvent = () => {
    setActiveTabToLocalStorage("View Events");

    router.push("/dashboard/eventListView");
  };

  const handleViewOrganization = () => {
    setActiveTabToLocalStorage("View Organization");
    router.push("/dashboard/organizationListView");
  };

  const handleViewOrganizationById = (url) => {
    window.open(`/${url}`, "_blank");
  };

  const handleViewEventDetails = (url) => {
    window.open(`/${url}`, "_blank");
  };

  const renderEventList = (event: any) => {
    return (
      <div className="mt-1 cursor-pointer rounded-md hover:bg-gray-200">
        <button
          className="flex w-full flex-row"
          onClick={(e: any) => handleViewEventDetails(event?.publicUrl)}
        >
          <div className="event-left-image-wrapper !relative ml-2 mr-2">
            <Image
              src={calenderImage}
              alt="Picture of the author"
              width={50}
              height={50}
            />
            <div className="eventPreviewMainText absolute right-5 top-0  mt-5">
              {getDateFromString(event?.startDate)}
            </div>
          </div>
          <SectionColumn className="event-right-content-wrapper mt-1">
            <span className="organizationDetailsMainText2">
              {stringCrop(event?.eventName, 26)}
            </span>
            <span className="eventCardTimeOrgCard">
              {`${dateFormatForEvent(convertDateTime(event?.startDate.slice(0, 19), userCurrentTimeZone))}`}
            </span>
          </SectionColumn>
        </button>
      </div>
    );
  };

  const toggleFollow = (index: number) => {
    setInitFollowingCount(timelineFollowingCount);
    const updatedOrgArrayList = [...listOfOrganization];
    const org = updatedOrgArrayList[index];

    // Toggle the isFollower value
    org.profile.isFollower =
      org.profile.isFollower === "true" ? "false" : "true";

    // Update the state with the new orgArrayList
    setListOfOrganization(updatedOrgArrayList);

    console.log("updated list ------------>", updatedOrgArrayList);

    // Trigger the API call with the new isFollower value
    followHandler(org.profile.isFollower.toString(), org.profile.profileId);
  };

  const followHandler = (isFollower, profileId) => {
    if (isFollower === "true") setTimelineFollowingCount(timelineFollowingCount + 1);
    if (isFollower === "false") setTimelineFollowingCount(timelineFollowingCount - 1);

    let values = {
      followingProfileId: getUserAccountType() === "ORGANIZATION" || getUserAccountType() === "PUBLIC_PROFILE" ? getProfileId() : null,
      isFollow: isFollower === "true",
      userId: getUserAccountType() === "INITIAL" ? getUserIdFromStorage() : null,
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

  const renderOrganizationList = (res: any) => {
    return res
      ? res.map((org: any, index: number) => {
        return (
          <span key={org.id} className="mt-1 w-full">
            <button
              className="my-1 cursor-pointer rounded-md p-1 hover:bg-gray-200 w-full"
              onClick={(e: any) =>
                handleViewOrganizationById(org?.profile.publicUrl)
              }
            >
              <div className="flex relative">
                <div className="w-[48px] h-[48px] mr-1">
                  <Image
                    src={
                      org?.profile?.profileImagePath &&
                        org?.profile?.profileImagePath.includes("http")
                        ? org?.profile?.profileImagePath
                        : "https://i.ibb.co/chdHB7c/image-12.png"
                    }
                    alt="Picture of the author"
                    width={48}
                    height={48}
                    className="timelineRecentJoinOrgProfileImage rounded-full"
                  />
                </div>

                <SectionColumn className="flex-1 mt-2 pl-2 ">
                  <span className="orgListCardText-left">
                    {stringCrop(org?.profile?.profileName, 20)}
                  </span>
                  <span className="previewEventSubTextTxt04-11">
                    {capitalizedFormat(org.organizationCategory)}
                  </span>
                </SectionColumn>

                <div className="top-2 right-0 my-auto w-[100px]">
                  <div className="">
                    {getUserAccountType() === "PARTNERSHIP" ? (
                      <RoundedButton
                        ref={undefined}
                        onClick={undefined}
                        className="followBTN2 text-right"
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
                        className={org?.profile?.isFollower === "false" ? "followBTN2 text-right" : "unfollowBtn-small  text-right"}
                      >
                        {org?.profile?.isFollower === "true" ? "Unfollow" : "Follow"}
                      </RoundedButton>
                    )}
                  </div>
                </div>
              </div>
            </button>
          </span>
        );
      })
      : null;
  };

  return (
    <div
      className={
        props.rightAlign
          ? "timelineWrapperScroll-right-card flex pt-4 pl-2"
          : "flex w-full pt-4 pl-2"
      }
    >
      <div className="items-end justify-end">
        {/* <span className="timelineText01 items-end">
          Organizations by Category
        </span>
        <Section className="mt-4 justify-between ">
          <button
            onClick={(e: any) =>
              setSelectedCategory([
                "HUMAN_RIGHTS",
                "FOOD_RIGHTS",
                "ANIMAL_RIGHTS",
                "POLITICAL_CAMPAIGNS",
                "LABOUR_RIGHTS",
              ])
            }
          >
            <div className="orgnzCatBTN2 grid transform justify-items-center pt-4 pb-4 transition duration-500 hover:bg-gray-300">
              <Image
                // loader ={() => LoginPageImage}
                src={AllIcon}
                alt="Picture of the author"
                width={40}
                height={40}
              />
              <span className="orgCatText">All</span>
            </div>
          </button>
          <button onClick={(e: any) => setSelectedCategory(["HUMAN_RIGHTS"])}>
            <div className="orgnzCatBTN2 ml-2 mr-2 grid transform justify-items-center pt-2 transition duration-500 hover:bg-gray-300">
              <Image
                // loader ={() => LoginPageImage}
                src={HumanRight}
                alt="Picture of the author"
                width={40}
                height={40}
              />
              <span className="orgCatText">
                Human
                <br />
                Rights
              </span>
            </div>
          </button>
          <button onClick={(e: any) => setSelectedCategory(["FOOD_RIGHTS"])}>
            <div className="orgnzCatBTN2 grid transform justify-items-center pt-2 transition duration-500 hover:bg-gray-300">
              <Image
                // loader ={() => LoginPageImage}
                src={foodRight}
                alt="Picture of the author"
                width={40}
                height={40}
              />
              <span className="orgCatText">
                Food
                <br />
                Rights
              </span>
            </div>
          </button>
        </Section>
        <Section className="mt-4 mb-8 justify-between">
          <button
            onClick={(e: any) => setSelectedCategory(["ANIMAL_RIGHTS"])}
          >
            <div className="orgnzCatBTN2 grid transform justify-items-center pt-2 transition duration-500 hover:bg-gray-300">
              <Image
                // loader ={() => LoginPageImage}
                src={animalRights}
                alt="Picture of the author"
                width={40}
                height={40}
              />
              <span className="orgCatText">
                Animal
                <br />
                Rights
              </span>
            </div>
          </button>
          <button
            onClick={(e: any) => setSelectedCategory(["POLITICAL_CAMPAIGNS"])}
          >
            <div className="orgnzCatBTN2 ml-2 mr-2 grid transform justify-items-center pt-2 transition duration-500 hover:bg-gray-300">
              <Image
                // loader ={() => LoginPageImage}
                src={politicalCampain}
                alt="Picture of the author"
                width={40}
                height={40}
              />
              <span className="orgCatText">
                Political
                <br />
                Campaigns
              </span>
            </div>
          </button>
          <button
            onClick={(e: any) => setSelectedCategory(["LABOUR_RIGHTS"])}
          >
            <div className="orgnzCatBTN2 grid transform justify-items-center pt-2 transition duration-500 hover:bg-gray-300">
              <Image
                // loader ={() => LoginPageImage}
                src={laberRightss}
                alt="Picture of the author"
                width={40}
                height={40}
              />
              <span className="orgCatText">
                Labor
                <br />
                Rights
              </span>
            </div>
          </button>
        </Section> */}
        <span className="timelineText01 pl-2">
          Recently Join Organizations
        </span>
        <div className="organizationCard mt-4 mb-8">
          <div className="w-full">
            {isLoadingSkeleton ? (
              <TimelineOrgSkeleton count={5} />
            ) : (
              renderOrganizationList(listOfOrganization)
            )}
          </div>
          <div className="flex">
            <button
              className="common-gray-button mt-8 flex transform justify-center transition duration-500 hover:scale-105 hover:cursor-pointer"
              onClick={(e: any) => handleViewOrganization()}
            >
              <SectionRow className="mt-2">
                <span className="createItemText ml-4">
                  See All Organizations
                </span>
              </SectionRow>
            </button>
          </div>
        </div>
        <span className="timelineText01 pl-2">Upcoming Events</span>
        <div className="timeline-event-container mt-4">
          <div className="">
            {isLoadingSkeleton ? (
              <TimelineOrgSkeleton count={5} />
            ) : (
              props?.eventList?.map((event: any) => {
                return renderEventList(event);
              })
            )}
          </div>
          <button
            className="common-gray-button mt-8 grid transform justify-items-center transition duration-500 hover:scale-105 hover:cursor-pointer"
            onClick={(e: any) => handleViewEvent()}
          >
            <SectionRow className="mt-2">
              <span className="createItemText ml-4">See All Events</span>
            </SectionRow>
          </button>
        </div>
      </div>
    </div>
  );
};

export default TimelineRightMenuCard;
