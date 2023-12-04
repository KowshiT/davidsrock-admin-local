import { placeholderBackground, placeholderImage } from "@/assetsLayer";
import ImageProfileUploadModal from "../../../imageUpload/imageProfileUploadModal";
import { ModalOpenCloseContext } from "@/contexts/modalContext/modalOpenCloseContext";
import { setProfileUploadTypeToStorage } from "@/helpers/authHelper";
import { useAlerts } from "@/hooks/alertHook";
import React, { useState } from "react";
import { RiEdit2Fill } from "react-icons/ri";
import { UpdateUserProfilePictureActionHandler } from "@/actionLayer/user/userActions";

export interface EventProfileWrapperContentProps {
  setEventPic: any;
  eventPic: any;
  eventId: any;
  profileType: any;
}

const EventProfileWrapperContent: React.FC<EventProfileWrapperContentProps> = (
  props
) => {
  const { setImageProfileUploadModal } = React.useContext(
    ModalOpenCloseContext
  );
  const [uploadType, setUploadType] = useState("");
  const { setAlert } = useAlerts();

  const handleAPI = (fileUrl: any) => {
    UpdateUserProfilePictureActionHandler(
      props.eventId,
      props.profileType,
      "COVER_IMAGE",
      fileUrl,
      true
    )
      .then((res: any) => {
        if (res?.responseCode === "00") {
          setAlert({
            message: "Successfully Updated!",
            severity: "success",
          });
          window.location.reload();
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
  };

  return (
    <React.Fragment>
      <div className="mt-5">
        <div className="flex justify-between">
          <div className="">
            <p className="h3-black-15-text">Event Picture</p>
          </div>
          <div
            className="flex h-fit cursor-pointer flex-row"
            onClick={(e: any) => {
              setImageProfileUploadModal(true);
            }}
          >
            <RiEdit2Fill size={15} className="primary-color" />

            <span className="h3-dark-gray-13-text-500 bottom-0 ml-1">Edit</span>
          </div>
        </div>
        <div className="edit-profile-wrapper mt-1">
          <div className="edit-profile-cover-pic-wrapper skeleton-animation">
            <img
              src={props.eventPic || placeholderBackground.src}
              alt={placeholderImage.src}
              className="edit-profile-pic"
            />
          </div>
        </div>
      </div>
      <ImageProfileUploadModal
        title="Profile Picture"
        handleAPI={handleAPI}
        uploadType={uploadType}
      />
    </React.Fragment>
  );
};

export default EventProfileWrapperContent;
