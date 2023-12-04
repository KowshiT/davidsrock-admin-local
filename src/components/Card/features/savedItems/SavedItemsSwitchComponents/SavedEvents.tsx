import React, { useState, useEffect } from "react";
import { SectionColumn, SectionRow } from "@/layouts/section";
import Image from "next/image";
import { save, threeDots } from "@/assetsLayer";
import VideocamIcon from "@mui/icons-material/Videocam";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import {
  getSavedEventsActionHandler,
  saveEventActionHandler,
} from "@/actionLayer/save/saveActions";
import { useAlerts } from "@/hooks/alertHook";
import { getId } from "@/helpers/payloadHelper";
import { getUserAccountType } from "@/helpers/authHelper";
import { sinceDateConverter } from "@/helpers/dateHelpers";
import { useRouter } from "next/router";

export interface SavedEventsProps {}

const SavedEvents: React.FC<SavedEventsProps> = (props) => {
  const [showOptionPopup, setShowOptionPopup] = useState(false);
  const [saveEventDetails, setSaveEventDetails] = useState<any>({});
  const [isLoading, setIsLoading] = useState(true);
  const [postId, setPostId] = useState("");

  const { setAlert } = useAlerts();
  const router = useRouter();

  useEffect(() => {
    let values = {
      saveEntityId: getId(),
      saveType: getUserAccountType(),
      page: 0,
      size: 1000,
    };

    getSavedEventsActionHandler(values)
      .then((res: any) => {
        if (res?.responseCode === "00") {
          console.log("res :>> ", res);
          setSaveEventDetails(res?.eventDetailList);
          setIsLoading(false);
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

  const handleUnsavePost = (eventId) => {
    let values = {
      eventId: parseInt(eventId),
      saveEntityId: getId(),
      saveType: getUserAccountType(),
      isSave: false,
    };
    console.log("values :>> ", values);

    saveEventActionHandler(values)
      .then((res: any) => {
        if (res?.responseCode === "00") {
          setShowOptionPopup(!showOptionPopup);
          router.reload();
          setAlert({
            message: "Event unsaved!",
            severity: "success",
          });
        } else if (res?.responseMessage) {
          setShowOptionPopup(!showOptionPopup);
          setAlert({
            message: res?.responseMessage,
            severity: "error",
          });
        } else {
          setShowOptionPopup(!showOptionPopup);
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
  };

  const handleOptionsPopup = (post) => {
    setPostId(post.eventId);
    setShowOptionPopup(!showOptionPopup);
  };

  const viewEventHandler = (detail) => {
    window.open(`/${detail.publicUrl}`, "_blank");
  };

  const renderSaveEvent = (detail) => {
    return (
      <button
        className="savedItemCard relative"
        onClick={() => viewEventHandler(detail)}
      >
        <div className="relative">
          <Image
            src={detail.coverImage}
            alt="Picture of the author"
            width={150}
            height={90}
            className="savedItemsImage"
          />
          {detail.eventType === "ONLINE" ? (
            <VideocamIcon
              style={{
                color: "white",
                position: "absolute",
                bottom: "0",
                right: "5px",
              }}
            />
          ) : (
            <LocationOnIcon
              style={{
                color: "white",
                position: "absolute",
                bottom: "0",
                right: "5px",
              }}
            />
          )}
        </div>
        <SectionColumn className="mt-4 w-[50%]">
          <div className="savedItemCardMainText">{detail.eventName}</div>
          <div className="savedItemCardEventText mt-2">Event</div>
          <div className="savedItemCardSaveTimeText mt-2">
            <SectionRow>
              <div className="blueDot mr-1"></div>
              {sinceDateConverter(detail?.eventStatDate)}
            </SectionRow>
          </div>
        </SectionColumn>
        <button
          className="absolute top-2 right-0 pr-4"
          onClick={(e) => {
            e.stopPropagation();
            handleOptionsPopup(detail);
          }}
        >
          <Image
            src={threeDots}
            alt="Picture of the author"
            width={35}
            height={35}
          />
        </button>
        {showOptionPopup && postId === detail?.eventId && (
          <div className="optionsPopup">
            <SectionColumn className="mt-5 ml-5 mr-5">
              <button
                className="mb-4"
                onClick={(e) => {
                  e.stopPropagation();
                  handleUnsavePost(detail?.eventId);
                }}
              >
                <SectionRow>
                  <Image
                    src={save}
                    alt="Picture of the author"
                    width={15}
                    height={15}
                  />
                  <p className="previewEventSubTextTxt04 ml-4">Unsave</p>
                </SectionRow>
              </button>
            </SectionColumn>
          </div>
        )}
      </button>
    );
  };

  const renderSaveEventSkeleton = () => {
    return (
      <div className="savedItemCard relative">
        <div className="relative">
          <div className="savedItemsImage skeleton"></div>
          <VideocamIcon
            style={{
              color: "white",
              position: "absolute",
              bottom: "-15px",
              right: "5px",
            }}
          />
        </div>
        <SectionColumn className="ml-2 mt-2 w-[200px]">
          <div className="savedItemCardMainText skeleton"></div>
          <div className="savedItemCardEventText skeleton skeleton-full-width mt-2"></div>
          <div className="savedItemCardEventText skeleton skeleton-full-width mt-2"></div>
          <div className="savedItemCardEventText skeleton skeleton-full-width mt-2"></div>
        </SectionColumn>
      </div>
    );
  };

  const isEventsAvailableChecker = () => {
    return saveEventDetails.length > 0 ? (
      saveEventDetails?.map((detail) => renderSaveEvent(detail))
    ) : (
      <div className="noSavedItemsSec">
        <span className="eventMainText mt-4">
          You don't have any saved Events.
        </span>
      </div>
    );
  };

  return (
    <div className="saveItemsDownMainSec">
      <div className="savedItemCardList">
        {isLoading ? renderSaveEventSkeleton() : isEventsAvailableChecker()}
      </div>
    </div>
  );
};

export default SavedEvents;
