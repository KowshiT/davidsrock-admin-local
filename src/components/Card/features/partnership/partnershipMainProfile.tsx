import RoundedButton from "../../../../components/Buttons/RoundedButtons";
import { SectionColumn, SectionRow } from "@/layouts/section";
import React, { useEffect, useState } from "react";
import SearchBar from "./components/SearchBar";
import { IoIosArrowDown } from "react-icons/io";

import { placeholderImage } from "@/assetsLayer";
import { useAlerts } from "@/hooks/alertHook";
import TabHeader from "./components/TabHeader";
import TabContent from "./components/TabContent";
import {
  getProfileId,
  getUserAccountType,
  getUserNameFromLocalStorage,
} from "../../../../helpers/authHelper";
import OrgListModal from "../../../../components/Modal/adminDashboard/orgListModal";
import { AccountType } from "@/helpers/enumHelpers";
import {
  getAllPendingPartnershipActionHandler,
  getAllProfilesActionHandler,
} from "@/actionLayer/partnership/partnershipActions";
import { useUser } from "@/contexts/authContext/userProvider";
import AcceptCard from "./components/cards/acceptCard";
import CancelCard from "./components/cards/cancelCard";
import SendRequestCard from "./components/cards/sendRequestCard";
import { stringCrop } from "@/helpers/stringCrop";
import { BsFillArrowRightCircleFill } from "react-icons/bs";
import Loader from "../../../../components/Modal/LoadingModal";
import { getId } from "@/helpers/payloadHelper";
import PartnershipSkeleton from "../../../../components/Skeleton/partnershipSkeleton";

export interface PartnershipMainProfileProps {}

const fetchPendingPartnershipRequests = async (
  size: any,
  type: any,
  profileName: any,
  setIsLoading: any
) => {
  try {
    const response = await getAllPendingPartnershipActionHandler(
      0,
      size,
      type,
      "PENDING",
      profileName,
      getId(),
      getUserAccountType()
    );
    if (response?.responseCode === "00") {
      setIsLoading(false);
      return response?.partnershipParticipantDtos;
    } else {
      throw new Error("Error fetching pending request list.");
    }
  } catch (error) {
    throw new Error("Error fetching pending request list.");
  }
};

const PartnershipMainProfile: React.FC<PartnershipMainProfileProps> = (
  props
) => {
  const { setAlert } = useAlerts();
  const [activeTab, setActiveTab] = useState<number>(0);
  const [organizationList, setOrganizationList] = useState<any>([]);
  const [publicProfileList, setPublicProfileList] = useState<any>([]);
  const [receivedRequestList, setReceivedRequestList] = useState<any>([]);
  const [pendingRequestList, setPendingRequestList] = useState<any>([]);
  const [searchType, setSearchType] = useState<string>("Partnership Request");
  const [size, setSize] = useState(1000);
  const [profileId, setProfileId] = useState<any>();
  const [accountType, setAccountType] = useState<any>();
  const [isSearchTermEmpty, setIsSearchTermEmpty] = useState<boolean>(true);
  const [count, setCount] = useState(0);
  const [isLoadMoreVisible, setIsLoadMoreVisible] = useState(false);
  const [loaderOpen, setLoaderOpen] = useState(true);
  const [isLoading, setIsLoading] = useState(true);
  const [clickedProfileIds, setClickedProfileIds] = useState([]);
  const [clickedCanceledProfileIds, setClickedCanceledProfileIds] = useState(
    []
  );
  const [clickedReceivedRequestList, setClickedReceivedRequestList] =
    useState<any>([]);

  const { setUserName } = useUser();

  const [profilesPayload, setProfilesPayload] = useState({
    page: 0,
    size: size,
    isDescending: true,
    profileType: String(AccountType.ORGANIZATION),
    profileOrPartnershipId: "",
    profileName: "",
  });

  useEffect(() => {
    async function fetchData() {
      try {
        setProfileId(getProfileId());
        setAccountType(getUserAccountType());
        setUserName(getUserNameFromLocalStorage());

        const pendingRequests = await fetchPendingPartnershipRequests(
          1000,
          "RECEIVED",
          "",
          setIsLoading
        );
        setReceivedRequestList(pendingRequests);
        setCount(pendingRequests?.count);

        setLoaderOpen(false);
      } catch (error) {
        setAlert({
          message: "Error fetch received requests!",
          severity: "error",
        });
      }
    }

    fetchData();
  }, []);

  useEffect(() => {
    // Update visibility of Load More button based on count
    if (count !== null) {
      setIsLoadMoreVisible(size < count);
    }
  }, [size, count]);

  const handleSearch = async (searchTerm: string): Promise<void> => {
    setIsSearchTermEmpty(searchTerm.trim() === "");

    switch (activeTab) {
      case 0:
        setIsLoading(true);
        setReceivedRequestList(
          await fetchPendingPartnershipRequests(
            1000,
            "RECEIVED",
            searchTerm,
            setIsLoading
          )
        );
        setClickedProfileIds([]);
        setClickedCanceledProfileIds([]);
        break;
      case 1:
        setIsLoading(true);
        handleAllOrganization(
          1000,
          String(AccountType.ORGANIZATION),
          searchTerm
        );
        setClickedProfileIds([]);
        setClickedCanceledProfileIds([]);
        break;
      case 2:
        setIsLoading(true);
        handleAllOrganization(
          1000,
          String(AccountType.PUBLIC_PROFILE),
          searchTerm
        );
        setClickedProfileIds([]);
        setClickedCanceledProfileIds([]);
        break;
      case 3:
        setIsLoading(true);
        const sentRequests = await fetchPendingPartnershipRequests(
          1000,
          "SENT",
          searchTerm,
          setIsLoading
        );
        setPendingRequestList(sentRequests);
        setClickedProfileIds([]);
        setClickedCanceledProfileIds([]);
        break;
      default:
        setSearchType("Pending Request");
    }
  };

  const handleAllOrganization = (size: any, type: any, profileName: any) => {
    getAllProfilesActionHandler({
      ...profilesPayload,
      size: size,
      profileType: type,
      profileOrPartnershipId: profileId,
      profileName: profileName,
      loggedProfileReferenceId: getId(),
      loggedProfileType: getUserAccountType(),
    })
      .then((res: any) => {
        if (res?.responseCode === "00") {
          if (type == String(AccountType.ORGANIZATION)) {
            setOrganizationList(res?.partnershipParticipantDtos);
          } else {
            setPublicProfileList(res?.partnershipParticipantDtos);
          }
          setCount(res?.count);
          setLoaderOpen(false);
          setIsLoading(false);
          console.log("res :>> ", res.organization);
        } else {
          setAlert({
            message: "Error Fetch Organization!",
            severity: "error",
          });
        }
        return res;
      })
      .catch((error) => {
        setAlert({
          message: "Error Fetch Organization!",
          severity: "error",
        });
        return error;
      });
  };

  const handleTabChange = async (tabIndex: number): Promise<void> => {
    setActiveTab(tabIndex);
    setSize(1000); // Set the default size

    switch (tabIndex) {
      case 0:
        setSearchType("Partnership Request");
        setIsLoading(true);
        const partnershipRequests = await fetchPendingPartnershipRequests(
          1000,
          "RECEIVED",
          "",
          setIsLoading
        );
        setReceivedRequestList(partnershipRequests);
        setCount(partnershipRequests?.count);
        setClickedProfileIds([]);
        setClickedCanceledProfileIds([]);
        break;
      case 1:
        setSearchType("Send Partnership Request for Organization");
        setIsLoading(true);
        handleAllOrganization(1000, String(AccountType.ORGANIZATION), "");
        setClickedProfileIds([]);
        setClickedCanceledProfileIds([]);
        break;
      case 2:
        setSearchType("Send Partnership Request for Public Figure");
        setIsLoading(true);
        handleAllOrganization(1000, String(AccountType.PUBLIC_PROFILE), "");
        setClickedProfileIds([]);
        setClickedCanceledProfileIds([]);
        break;
      case 3:
        setSearchType("Sent Request");
        setIsLoading(true);
        const sentRequests = await fetchPendingPartnershipRequests(
          1000,
          "SENT",
          "",
          setIsLoading
        );
        setPendingRequestList(sentRequests);
        setCount(sentRequests?.count);
        setClickedProfileIds([]);
        setClickedCanceledProfileIds([]);
        break;
      default:
        setSearchType("Partnership Request");
    }
  };

  const handleLoadMore = async (): Promise<void> => {
    const newSize = size + 10;
    setSize(newSize);

    if (activeTab === 0) {
      const newReceivedRequests = await fetchPendingPartnershipRequests(
        newSize,
        "RECEIVED",
        "",
        setIsLoading
      );
      setReceivedRequestList((prevList) => [
        ...prevList,
        ...newReceivedRequests,
      ]);
      setCount(newReceivedRequests?.count);
    } else if (activeTab === 1 || activeTab === 2) {
      const accountType =
        activeTab === 1
          ? String(AccountType.ORGANIZATION)
          : String(AccountType.PUBLIC_PROFILE);
      setSearchType(
        `Send Partnership Request for ${
          activeTab === 1 ? "Organization" : "Public Figure"
        }`
      );
      handleAllOrganization(newSize, accountType, "");
    } else if (activeTab === 3) {
      const newPendingRequests = await fetchPendingPartnershipRequests(
        newSize,
        "SENT",
        "",
        setIsLoading
      );
      setReceivedRequestList((prevList) => [
        ...prevList,
        ...newPendingRequests,
      ]);
      setCount(newPendingRequests?.count);
    } else {
      setSearchType("Pending Request");
    }
  };

  const handleButtonClick = (profileId) => {
    // Check if the profileId is already in the array
    if (clickedProfileIds.includes(profileId)) {
      setClickedProfileIds(clickedProfileIds.filter((id) => id !== profileId));
    } else {
      setClickedProfileIds([...clickedProfileIds, profileId]);
    }
  };

  const handleCancelPendingButtonClick = (profileId) => {
    // Check if the profileId is already in the array
    if (!clickedCanceledProfileIds.includes(profileId)) {
      // If not, add it to the array
      setClickedCanceledProfileIds([...clickedCanceledProfileIds, profileId]);
    }
  };

  const handleAcceptCancelReceivedButtonClick = (
    profileId: any,
    message: string
  ) => {
    // Check if the profileId is already in the array
    const isProfileIdClicked = clickedReceivedRequestList.some(
      (item: any) => item.profileId === profileId
    );

    //if not add id
    if (!isProfileIdClicked) {
      setClickedReceivedRequestList([
        ...clickedReceivedRequestList,
        { profileId: profileId, message: message },
      ]);
    }
  };

  const handleRoutes = (url: any) => {
    window.open(`/${url}`, "_blank");
  };

  const renderRequestTab = (profile: any) => {
    const profileId = profile?.profile.profileId;
    const isProfileIdClicked = clickedProfileIds.includes(profileId);
    const isCancelButtonClicked = clickedCanceledProfileIds.includes(profileId);
    const isRequestProfileIdClicked = clickedReceivedRequestList.some(
      (item: any) => item.profileId === profileId
    );
    const receivedRequestMessage = clickedReceivedRequestList.find(
      (item: any) => item.profileId === profileId
    );

    return (
      <div
        className="card cursor-pointer"
        onClick={(e: any) => {
          handleRoutes(profile?.profile.publicUrl);
        }}
        onKeyDown={(e: any) => {
          if (e.key === "Enter") {
            e.preventDefault();
            handleRoutes(profile?.profile.publicUrl);
          }
        }}
        role="button"
        tabIndex={0}
      >
        <div className="profile-image-container">
          <img
            className="profile-image"
            src={
              profile?.profile.profileImagePath
                ? profile?.profile.profileImagePath
                : placeholderImage
            }
            alt="Profile 1"
          />
        </div>
        <div className="content">
          <SectionColumn></SectionColumn>
          <p className="partnershipMinHeader">{profile?.profile.profileName}</p>
          <p className="partnershipGrayText">
            Followers : {profile?.profile?.followerCount}
          </p>
          <div>
            <SectionColumn className="">
              <span className="partnershipGrayText">
                {stringCrop(profile?.profile.description, 80)}
              </span>
              <div className="bottom-0 left-0 my-auto mt-2 flex flex-row items-center align-middle">
                <p className="previewEventSubTextTxt07-blue mr-1">See More</p>
                <BsFillArrowRightCircleFill
                  style={{ color: "#2cd1ef", fontSize: "13px" }}
                />
              </div>
            </SectionColumn>
          </div>
          {activeTab == 0 ? (
            <div className="w-full">
              <AcceptCard
                isRequestProfileIdClicked={isRequestProfileIdClicked}
                handleAcceptCancelReceivedButtonClick={
                  handleAcceptCancelReceivedButtonClick
                }
                profileId={profile?.profile.profileId}
                partnershipName={profile?.partnershipName}
                reqId={profile?.reqId}
                participantProfileType={profile?.participantProfileType}
                initialProfileId={profileId}
                accountType={accountType}
                profileName={profile?.profile.profileName}
                receivedRequestMessage={receivedRequestMessage}
                setLoaderOpen={setLoaderOpen}
              />
            </div>
          ) : activeTab == 3 ? (
            <div className="w-full">
              <CancelCard
                isCancelButtonClicked={isCancelButtonClicked}
                handleCancelPendingButtonClick={handleCancelPendingButtonClick}
                profileId={profile?.profile.profileId}
                reqId={profile?.reqId}
                profileType={profile?.profile.profileType}
                initialProfileId={profileId}
                accountType={accountType}
                setLoaderOpen={setLoaderOpen}
              />
            </div>
          ) : (
            <div className="w-full">
              <SendRequestCard
                isProfileIdClicked={isProfileIdClicked}
                handleButtonClick={handleButtonClick}
                profileId={profile?.profile.profileId}
                profileName={profile?.profile.profileName}
                profileType={profile?.profile.profileType}
                initialProfileId={profileId}
                accountType={accountType}
                setLoaderOpen={setLoaderOpen}
              />
            </div>
          )}
        </div>
      </div>
    );
  };

  const renderContent = () => {
    if (activeTab === 0) {
      return renderTabContent(
        receivedRequestList,
        "You don't have any request"
      );
    } else if (activeTab === 1) {
      return renderTabContent(organizationList, "No results for Organizations");
    } else if (activeTab === 2) {
      return renderTabContent(
        publicProfileList,
        "No results for Public Profiles"
      );
    } else {
      return renderTabContent(
        pendingRequestList,
        "You don't have any sent request"
      );
    }
  };

  const renderTabContent = (tabList: any, emptyMessage: any) => {
    return (
      <div className="w-full">
        {isLoading ? (
          <PartnershipSkeleton></PartnershipSkeleton>
        ) : tabList && tabList.length > 0 ? (
          <div className="card-container">
            {tabList.map((item) => renderRequestTab(item))}
          </div>
        ) : (
          <div className="mt-20 flex w-full justify-center">
            <span className="eventMainText items-center justify-center">
              {isSearchTermEmpty ? emptyMessage : "No Result"}
            </span>
          </div>
        )}

        {isLoadMoreVisible && (
          <div className="mt-3 flex items-center justify-center">
            <RoundedButton
              ref={undefined}
              onClick={(e: any) => {
                handleLoadMore();
              }}
              className="loadMoreBTN"
            >
              <SectionRow className="items-center justify-center">
                <span className="px-1">Load More</span>
                <IoIosArrowDown />
              </SectionRow>
            </RoundedButton>
          </div>
        )}
      </div>
    );
  };

  return (
    <React.Fragment>
      <div className="homeRightMainSec2 pb-4">
        <SectionRow className="mb-6 w-full">
          <span className="partnershipHeader w-1/2">Partnerships</span>
          <div className="flex w-1/2 justify-end">
            <div className="w-2/3">
              <SearchBar
                onSearch={handleSearch}
                className="search-bar-container"
              />
            </div>
          </div>
        </SectionRow>

        <div className="">
          <div className="">
            <div className="filter-tabs">
              <TabHeader
                tabLabels={[
                  "Partnership Request",
                  "Send Partnership Request for Organizations",
                  "Send Partnership Request for Public Figures",
                  "Sent Request",
                ]}
                onTabChange={handleTabChange}
              />
              <TabContent active={activeTab === 0} />
              <TabContent active={activeTab === 1} />
              <TabContent active={activeTab === 2} />
              <TabContent active={activeTab === 3} />
            </div>
          </div>
        </div>

        <SectionRow className="mt-6 space-x-3">
          <SectionRow className="w-full">
            <div className="w-full">
              <span className="partnershipSubTopic">{searchType}</span>

              <SectionRow>{renderContent()}</SectionRow>
            </div>
          </SectionRow>
        </SectionRow>
      </div>
      <OrgListModal orgProfileList={organizationList} />
      <Loader loaderText={""} open={loaderOpen} />
    </React.Fragment>
  );
};

export default PartnershipMainProfile;
