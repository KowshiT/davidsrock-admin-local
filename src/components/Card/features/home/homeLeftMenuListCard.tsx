import { blackLArrow } from "@/assetsLayer";
import { AdminPanelContext } from "@/contexts/adminPanelContext/adminPanelContext";
import { CreateEventContext } from "@/contexts/createEventContext/createEventContext";
import { EventCreateStageContext } from "@/contexts/eventContext/eventCreateStageContext";
import { ImageUploadDetailsContext } from "@/contexts/imageUploadContext/imageUploadContext";
import { CreateOrganizationContext } from "@/contexts/organizationContext/createOrganizationContext";
import { OrganizationCreateStageContext } from "@/contexts/organizationContext/organizationCreateStageContext";
import { CreatePublicProfileContext } from "@/contexts/publicProfileContext/createPublicProfileContext";
import { PublicProfileCreateStageContext } from "@/contexts/publicProfileContext/createPublicProfileStageContext";
import {
  getActiveTabFromLocalStorage,
  setActiveTabToLocalStorage,
} from "@/helpers/authHelper";
import { handleButtonClickedHelper } from "@/helpers/enumChangeHelpers";
import { buttonConfig } from "@/helpers/enumHelpers";
import Image from "next/image";
import { useRouter } from "next/router";
import React, { useContext, useEffect, useState } from "react";
import { SectionColumn, SectionRow } from "../../../../layouts/section";
import DashboardIcon from '@mui/icons-material/Dashboard';
import CorporateFareIcon from '@mui/icons-material/CorporateFare';
import HandshakeIcon from '@mui/icons-material/Handshake';
import GroupIcon from '@mui/icons-material/Group';
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import EventIcon from '@mui/icons-material/Event';
import EventNoteIcon from '@mui/icons-material/EventNote';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import MessageIcon from '@mui/icons-material/Message';

export interface Props { }

const HomeLeftMenuListCard: React.FC<Props> = (props) => {
  const router = useRouter();
  const [accountType, setAccountType] = useState<string>("INITIAL");
  const [activeTab, setActiveTab] = useState("");
  const { setOrganizationCreateStageCount } = useContext(
    OrganizationCreateStageContext
  );
  const { setPublicProfileCreateStageCount } = useContext(
    PublicProfileCreateStageContext
  );
  const { setEventCreateStageCount } = useContext(EventCreateStageContext);
  const {
    setEventType,
    setEventStep1Details,
    setEventLocation,
    setEventLink,
    setEventDesciption,
    setEventSettings,
    setEventCoverImage,
  } = React.useContext(CreateEventContext);
  const {
    setOrganizationName,
    setOrganizationCategory,
    setAboutOrganization,
    setOrganizationImages,
  } = useContext(CreateOrganizationContext);
  const { setUploadImageFileId, setUploadImageFileName } = React.useContext(
    ImageUploadDetailsContext
  );
  const { setPublicProfileName, setPublicProfileInterests,
    setAboutPublicProfile, setPublicProfileNetworks, setPublicProfileImages } = useContext(CreatePublicProfileContext);
  const { hasPublicProfile } = useContext(AdminPanelContext);
  useEffect(() => {
    setAccountType(localStorage.getItem("accountType"));
    // Use accountType as needed
    setActiveTab(getActiveTabFromLocalStorage());
  }, []);
  const clearData = () => {
    // create event data
    setEventType("");
    setEventStep1Details({});
    setEventLocation("");
    setEventLink("");
    setEventDesciption("");
    setEventSettings("");
    setEventCoverImage("");
    setUploadImageFileId("");
    setUploadImageFileName("");

    // create organization data
    setOrganizationName("");
    setOrganizationCategory("");
    setAboutOrganization({});
    setOrganizationImages({});

    // create public profile data
    setPublicProfileName("")
    setPublicProfileInterests([]);
    setAboutPublicProfile({});
    setPublicProfileNetworks([]);
    setPublicProfileImages({});
  };
  const handleRoutes = (url: string, tab: string) => {
    setOrganizationCreateStageCount(1);
    setPublicProfileCreateStageCount(1);
    setEventCreateStageCount(1);
    setActiveTabToLocalStorage(tab);
    router.push(url);
    clearData();
  };

  const buttonIconHandler = (buttonName) => {
    if (buttonName === "Dashboard") {
      return <DashboardIcon style={{ width: '20px', height: '20px', marginLeft: '10px' }} />
    } else if (buttonName === "Create Organization") {
      return <CorporateFareIcon style={{ width: '20px', height: '20px', marginLeft: '10px' }} />
    } else if (buttonName === "Create Public Profile") {
      return <AccountBoxIcon style={{ width: '20px', height: '20px', marginLeft: '10px' }} />
    } else if (buttonName === "View Partnerships") {
      return <GroupIcon style={{ width: '20px', height: '20px', marginLeft: '10px' }} />
    } else if (buttonName === "View Organizations") {
      return <CorporateFareIcon style={{ width: '20px', height: '20px', marginLeft: '10px' }} />
    } else if (buttonName === "View Public Profiles") {
      return <AccountBoxIcon style={{ width: '20px', height: '20px', marginLeft: '10px' }} />
    } else if (buttonName === "View Events") {
      return <EventIcon style={{ width: '20px', height: '20px', marginLeft: '10px' }} />
    } else if (buttonName === "Saved Items") {
      return <BookmarkIcon style={{ width: '20px', height: '20px', marginLeft: '10px' }} />
    } else if (buttonName === "Create Event") {
      return <EventNoteIcon style={{ width: '20px', height: '20px', marginLeft: '10px' }} />
    } else if (buttonName === "Partnerships") {
      return <HandshakeIcon style={{ width: '20px', height: '20px', marginLeft: '10px' }} />
    } else if (buttonName === "Message") {
      return <MessageIcon style={{ width: '20px', height: '20px', marginLeft: '10px' }} />
    }
  }

  return (
    <React.Fragment>
      <div className="dashboardSideBarSec pt-4 pb-4">
        <div className="dashboardSideBarSec2">
          <SectionColumn className="mt-3 grid justify-items-start ">
            {accountType === "INITIAL" && hasPublicProfile ? (
              buttonConfig["INITIAL_WITHOUT_PUBLIC_PROFILE"].map(
                (buttonName) => (
                  <button
                    key={JSON.stringify(buttonName)}
                    className="sideBarBTN mb-2 grid justify-items-start"
                    onClick={() => {
                      handleRoutes(
                        handleButtonClickedHelper(buttonName),
                        buttonName
                      );
                    }}
                  >
                    <SectionRow className="flex items-center justify-center">
                      <div
                        className={activeTab === buttonName ? "activateSB" : ""}
                      ></div>
                      {buttonIconHandler(buttonName)}
                      <span className="sideBarBTNA">{buttonName}</span>
                    </SectionRow>
                  </button>
                )
              )
            ) : buttonConfig[accountType] ? (
              buttonConfig[accountType].map((buttonName) => (
                <button
                  key={JSON.stringify(buttonName)}
                  className="sideBarBTN mb-2 grid justify-items-start"
                  onClick={() => {
                    handleRoutes(
                      handleButtonClickedHelper(buttonName),
                      buttonName
                    );
                  }}
                >
                  <SectionRow className="flex items-center justify-center">
                    <div
                      className={activeTab === buttonName ? "activateSB" : ""}
                    ></div>
                    {buttonIconHandler(buttonName)}
                    <span className="sideBarBTNA">{buttonName}</span>
                  </SectionRow>
                </button>
              ))
            ) : (
              <div className=""></div>
            )}
          </SectionColumn>
        </div>
      </div>
    </React.Fragment>
  );
};
export default HomeLeftMenuListCard;
