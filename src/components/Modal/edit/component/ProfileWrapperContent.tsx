import { UpdateUserProfilePictureActionHandler } from "@/actionLayer/user/userActions";
import { placeholderBackground, placeholderImage } from "@/assetsLayer";
import { useUser } from "@/contexts/authContext/userProvider";
import { ModalOpenCloseContext } from "@/contexts/modalContext/modalOpenCloseContext";
import {
  getProfileUploadTypeFromStorage,
  setInitialUserProfilePictureToLocalStorage,
  setProfileUploadTypeToStorage,
  setUserProfilePictureToLocalStorage,
} from "@/helpers/authHelper";
import { AccountType } from "@/helpers/enumHelpers";
import { useAlerts } from "@/hooks/alertHook";
import React, { useState } from "react";
import { RiEdit2Fill } from "react-icons/ri";
import ImageProfileUploadModal from "../../imageUpload/imageProfileUploadModal";

export interface ProfileWrapperContentProps {
  profilePic: any;
  setProfilePic: any;
  coverPic: any;
  setCoverPic: any;
  setEditOrganizationModal: any;
  profileType: any;
  userId: any;
}

const ProfileWrapperContent: React.FC<ProfileWrapperContentProps> = (props) => {
  const { setImageProfileUploadModal } = React.useContext(
    ModalOpenCloseContext
  );
  const [uploadType, setUploadType] = useState("");
  const { setAlert } = useAlerts();
  const { setProfilePicture } = useUser();

  const handleAPI = (fileUrl: any) => {
    const type = getProfileUploadTypeFromStorage();
    if (type === "PROFILE_IMAGE") {
      props.setProfilePic(fileUrl);
    } else {
      props.setCoverPic(fileUrl);
    }

    UpdateUserProfilePictureActionHandler(
      props.userId,
      props.profileType,
      type,
      fileUrl,
      false
    )
      .then((res: any) => {
        if (res?.responseCode === "00") {
          setAlert({
            message: "Successfully Updated!",
            severity: "success",
          });
          if (type === "PROFILE_IMAGE") {
            if (String(AccountType.INITIAL) === props.profileType) {
              setInitialUserProfilePictureToLocalStorage(fileUrl);
            }
            setUserProfilePictureToLocalStorage(fileUrl);
          }

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
      <div className="">
        <div className="flex justify-between">
          <div className="">
            <p className="h3-black-15-text">Profile Picture</p>
          </div>
          <div
            className="flex h-fit cursor-pointer flex-row"
            onClick={(e: any) => {
              setProfileUploadTypeToStorage("PROFILE_IMAGE");
              setUploadType("PROFILE_IMAGE");
              setImageProfileUploadModal(true);
            }}
          >
            <RiEdit2Fill size={15} className="primary-color" />

            <span className="h3-dark-gray-13-text-500 bottom-0 ml-1">Edit</span>
          </div>
        </div>
        <div className="edit-profile-wrapper mt-1">
          <div className="edit-profile-pic-wrapper skeleton-animation">
            <img
              src={props.profilePic || placeholderImage.src}
              alt={placeholderImage.src}
              className="edit-profile-pic"
            />
          </div>
        </div>
      </div>

      <hr className="separator-line" />

      <div className="mt-5">
        <div className="flex justify-between">
          <div className="">
            <p className="h3-black-15-text">Cover Picture</p>
          </div>
          <div
            className="flex h-fit cursor-pointer flex-row"
            onClick={(e: any) => {
              setProfileUploadTypeToStorage("COVER_IMAGE");
              setUploadType("COVER_IMAGE");
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
              src={props.coverPic || placeholderBackground.src}
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

export default ProfileWrapperContent;
