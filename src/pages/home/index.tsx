import { NextPage } from "next";
import React, { useEffect, useState } from "react";
import {
  getProfileId,
  getUserAccountType,
  getUserIdFromStorage,
} from "@/helpers/authHelper";
import { AccountType } from "@/helpers/enumHelpers";
import {
  getInterestOrganizationActionHandler,
  getOrganizationActionHandler,
} from "@/actionLayer/organization/organizationActions";
import { useAlerts } from "@/hooks/alertHook";
import { getAllEventApi } from "@/api/event/eventApis";
import { useSelectedCategory } from "@/contexts/timelineContext/timelineProviderContext";
import { getAllTimelinePostActionHandler } from "@/actionLayer/timeline/timelineActions";
import TimelineWithConditionalMenu from "../../components/Card/features/timeline/TimelineWithConditionalMenu ";
import { getId } from "@/helpers/payloadHelper";
import { extractOrganizationDetails } from "@/helpers/extractDataHelper";

// Define functions for fetching data
const fetchOrganizationList = async () => {
  const getOrganizationList = {
    page: 0,
    size: 3,
    isDescending: true,
    userId: getUserIdFromStorage(),
    profileType: String(AccountType.ORGANIZATION),
    userIn: false,
    loggedProfileReferenceId: getId(),
    loggedProfileType: getUserAccountType(),
    removeFollowed: true,
  };

  try {
    const response = await getOrganizationActionHandler(getOrganizationList);
    if (response?.responseCode === "00") {
      return response.organization;
    } else {
      throw new Error("Error fetching organization list.");
    }
  } catch (error) {
    throw new Error("Error fetching organization list.");
  }
};

const fetchInterestOrganizationList = async () => {
  const getOrganizationList = {
    page: 0,
    size: 15,
    userId: getUserIdFromStorage(),
    profileType: String(AccountType.ORGANIZATION),
    organizationCategoryList: [
      "HUMAN_RIGHTS",
      "FOOD_RIGHTS",
      "ANIMAL_RIGHTS",
      "POLITICAL_CAMPAIGNS",
      "LABOUR_RIGHTS",
    ],
    removeFollowed: true,
    loggedProfileReferenceId: getProfileId(),
    loggedProfileType: getUserAccountType(),
  };

  try {
    const response = await getInterestOrganizationActionHandler(
      getOrganizationList
    );
    if (response?.responseCode === "00") {
      return response.organization;
    } else {
      throw new Error("Error fetching organization list.");
    }
  } catch (error) {
    throw new Error("Error fetching organization list.");
  }
};

const fetchEventList = async () => {
  const getEventList = {
    page: 0,
    size: 3,
    eventType: "ALL",
    dateFilter: "upcoming",
    userId: getUserIdFromStorage(),
    loggedUserId: getUserIdFromStorage(),
    userIn: false,
  };

  try {
    const response = await getAllEventApi(getEventList);
    if (response?.responseCode === "00") {
      return response.eventEntityList;
    } else {
      throw new Error("Error fetching event list.");
    }
  } catch (error) {
    throw new Error("Error fetching event list.");
  }
};

const fetchTimeLinePost = async () => {
  const getPost = {
    page: 0,
    size: 10,
    loggedProfileRefernceId: getId(),
    loggedProfileType: getUserAccountType()
  };

  try {
    const response = await getAllTimelinePostActionHandler(getPost);
    if (response?.responseCode === "00") {
      return response?.postsDto;
    } else {
      throw new Error("Error fetching timeline list.");
    }
  } catch (error) {
    throw new Error("Error fetching event list.");
  }
};

const Home: NextPage = () => {
  const { setAlert } = useAlerts();
  const [organizationList, setOrganizationList] = useState<any>([]);
  const [timelineList, setTimelineList] = useState<any>([]);
  const [size, setSize] = useState<number>(5);
  const { selectedCategory, setSelectedCategory } = useSelectedCategory();
  const [interestOrganizationList, setInterestOrganizationList] = useState<any>([]);
  const [eventList, setEventList] = useState<any>([]);

  useEffect(() => {
    if (localStorage.getItem("REFRESHTOKEN")) {
      async function fetchData() {
        try {
          const orgInterestList = await fetchInterestOrganizationList();
          setInterestOrganizationList(
            extractOrganizationDetails(orgInterestList)
          );

          const orgList = await fetchOrganizationList();
          setOrganizationList(orgList);

          const evtList = await fetchEventList();
          setEventList(evtList);

          const timelinePost = await fetchTimeLinePost();
          setTimelineList(timelinePost);
        } catch (error) {
          setAlert({
            message: "Error!",
            severity: "error",
          });
        }
      }

      fetchData();
    } else {
      window.location.replace("/auth");
    }
  }, []);

  useEffect(() => {
    const getOrganizationList = {
      page: 0,
      size: 15,
      userId: getUserIdFromStorage(),
      profileType: String(AccountType.ORGANIZATION),
      organizationCategoryList: selectedCategory,
      removeFollowed: true,
      loggedProfileReferenceId: getProfileId(),
      loggedProfileType: getUserAccountType(),
    };

    getInterestOrganizationActionHandler(getOrganizationList)
      .then((res: any) => {
        if (res?.responseCode === "00") {
          setInterestOrganizationList(res?.organization);
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
  }, [selectedCategory]);

  const handleTimelinePagination = (size: number) => {
    const getPost = {
      page: 0,
      size: size,
      loggedProfileRefernceId: getId(),
      loggedProfileType: getUserAccountType()
    };
    getAllTimelinePostActionHandler(getPost)
      .then((res: any) => {
        if (res?.responseCode === "00") {
          setTimelineList(res?.postsDto);
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

  return (
    <div>
      <TimelineWithConditionalMenu
        interestOrganizationList={interestOrganizationList}
        timelineList={timelineList}
        organizationList={organizationList}
        eventList={eventList}
        handleTimelinePagination={handleTimelinePagination}
        setSize={setSize}
        size={size}
      />
    </div>
  );
};

export default Home;
