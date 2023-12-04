import { createContext, useState, PropsWithChildren } from "react";

export type ModalOpenCloseContextProps = {};
interface ModalOpenCloseContextCtxInterface {
  authModal: boolean;
  setAuthModal: Function;

  eventSettingsModal: boolean;
  setEventSettingsModal: Function;

  createEventModal: boolean;
  setCreateEventModal: Function;

  previewEventModal: boolean;
  setPreviewEventModal: Function;

  viewOrgProfileListModal: boolean;
  setViewOrgProfileListModal: Function;

  orgListModal: boolean;
  setOrgListModal: Function;

  profilePictureUploadModal: boolean;
  setProfilePictureUploadModal: Function;

  imageUploadModal: boolean;
  setImageUploadModal: Function;

  photoViewModal: boolean;
  setPhotoViewModal: Function;

  addNewImageModal: boolean;
  setAddNewImageModal: Function;

  shareModal: boolean;
  setShareModal: Function;

  imageSlider: boolean;
  setImageSlider: Function;

  profileSelectModal: boolean;
  setProfileSelectModal: Function;

  editOrganizationModal: boolean;
  setEditOrganizationModal: Function;

  editDetailWrapperModal: boolean;
  setEditDetailWrapperModal: Function;

  addPublicProfileInterestModal: boolean;
  setAddPublicProfileInterestModal: Function;

  addPublicProfileNetworkModal: boolean;
  setAddPublicProfileNetworkModal: Function;

  imageProfileUploadModal: boolean;
  setImageProfileUploadModal: Function;

  editDetailsEventModal: boolean;
  setEditDetailsEventModal: Function;

  createPostModal: boolean;
  setCreatePostModal: Function;

  messageModal: boolean;
  setMessageModal: Function;

  suggestUserModel: boolean;
  setSuggestUserModel: Function;

  messageNotificationModal: boolean;
  setMessageNotificationModal: Function;

  displayLikesModal: boolean;
  setDisplayLikesModal: Function;

  savedPostViewModal: boolean;
  setSavedPostViewModal: Function;
}

const ModalOpenCloseContext = createContext<ModalOpenCloseContextCtxInterface>({
  authModal: false,
  setAuthModal: (count: boolean) => { },

  eventSettingsModal: false,
  setEventSettingsModal: (count: boolean) => { },

  createEventModal: false,
  setCreateEventModal: (count: boolean) => { },

  previewEventModal: false,
  setPreviewEventModal: (count: boolean) => { },

  viewOrgProfileListModal: false,
  setViewOrgProfileListModal: (count: boolean) => { },

  orgListModal: false,
  setOrgListModal: (count: boolean) => { },

  profilePictureUploadModal: false,
  setProfilePictureUploadModal: (count: boolean) => { },

  imageUploadModal: false,
  setImageUploadModal: (count: boolean) => { },

  photoViewModal: false,
  setPhotoViewModal: (count: boolean) => { },

  addNewImageModal: false,
  setAddNewImageModal: (count: boolean) => { },

  shareModal: false,
  setShareModal: (count: boolean) => { },

  imageSlider: false,
  setImageSlider: (count: boolean) => { },

  profileSelectModal: false,
  setProfileSelectModal: (count: boolean) => { },

  editOrganizationModal: false,
  setEditOrganizationModal: (count: boolean) => { },

  editDetailWrapperModal: false,
  setEditDetailWrapperModal: (count: boolean) => { },

  addPublicProfileInterestModal: false,
  setAddPublicProfileInterestModal: (count: boolean) => { },

  addPublicProfileNetworkModal: false,
  setAddPublicProfileNetworkModal: (count: boolean) => { },

  imageProfileUploadModal: false,
  setImageProfileUploadModal: (count: boolean) => { },

  editDetailsEventModal: false,
  setEditDetailsEventModal: (count: boolean) => { },

  createPostModal: false,
  setCreatePostModal: (count: boolean) => { },

  messageModal: false,
  setMessageModal: (count: boolean) => { },

  suggestUserModel: false,
  setSuggestUserModel: (count: boolean) => { },

  messageNotificationModal: false,
  setMessageNotificationModal: (count: boolean) => { },

  displayLikesModal: false,
  setDisplayLikesModal: (count: boolean) => { },

  savedPostViewModal: false,
  setSavedPostViewModal: (count: boolean) => { },
});

const ModalOpenCloseContextProvider = (
  props: PropsWithChildren<ModalOpenCloseContextProps>
) => {
  const [authModal, setAuthModal] = useState(false);
  const [eventSettingsModal, setEventSettingsModal] = useState(false);
  const [createEventModal, setCreateEventModal] = useState(false);
  const [previewEventModal, setPreviewEventModal] = useState(false);
  const [viewOrgProfileListModal, setViewOrgProfileListModal] = useState(false);
  const [orgListModal, setOrgListModal] = useState(false);
  const [profilePictureUploadModal, setProfilePictureUploadModal] =
    useState(false);
  const [imageUploadModal, setImageUploadModal] = useState(false);
  const [photoViewModal, setPhotoViewModal] = useState(false);
  const [addNewImageModal, setAddNewImageModal] = useState(false);
  const [shareModal, setShareModal] = useState(false);
  const [imageSlider, setImageSlider] = useState(false);
  const [profileSelectModal, setProfileSelectModal] = useState(false);
  const [editOrganizationModal, setEditOrganizationModal] = useState(false);
  const [editDetailWrapperModal, setEditDetailWrapperModal] = useState(false);
  const [addPublicProfileInterestModal, setAddPublicProfileInterestModal] =
    useState(false);

  const [addPublicProfileNetworkModal, setAddPublicProfileNetworkModal] =
    useState(false);

  const [imageProfileUploadModal, setImageProfileUploadModal] = useState(false);
  const [editDetailsEventModal, setEditDetailsEventModal] = useState(false);
  const [createPostModal, setCreatePostModal] = useState(false);
  const [messageModal, setMessageModal] = useState(false);
  const [suggestUserModel, setSuggestUserModel] = useState(false);
  const [messageNotificationModal, setMessageNotificationModal] = useState(false);
  const [displayLikesModal, setDisplayLikesModal] = useState(false);
  const [savedPostViewModal, setSavedPostViewModal] = useState(false);

  return (
    <ModalOpenCloseContext.Provider
      value={{
        authModal,
        setAuthModal,
        eventSettingsModal,
        setEventSettingsModal,
        createEventModal,
        setCreateEventModal,
        previewEventModal,
        setPreviewEventModal,
        viewOrgProfileListModal,
        setViewOrgProfileListModal,
        orgListModal,
        setOrgListModal,
        profilePictureUploadModal,
        setProfilePictureUploadModal,
        imageUploadModal,
        setImageUploadModal,
        photoViewModal,
        setPhotoViewModal,
        addNewImageModal,
        setAddNewImageModal,
        shareModal,
        setShareModal,
        imageSlider,
        setImageSlider,
        profileSelectModal,
        setProfileSelectModal,
        editOrganizationModal,
        setEditOrganizationModal,
        editDetailWrapperModal,
        setEditDetailWrapperModal,
        addPublicProfileInterestModal,
        setAddPublicProfileInterestModal,
        addPublicProfileNetworkModal,
        setAddPublicProfileNetworkModal,
        imageProfileUploadModal,
        setImageProfileUploadModal,
        editDetailsEventModal,
        setEditDetailsEventModal,
        createPostModal,
        setCreatePostModal,
        messageModal,
        setMessageModal,
        suggestUserModel,
        setSuggestUserModel,
        messageNotificationModal,
        setMessageNotificationModal,
        displayLikesModal,
        setDisplayLikesModal,
        savedPostViewModal,
        setSavedPostViewModal,
      }}
    >
      {props.children}
    </ModalOpenCloseContext.Provider>
  );
};

export { ModalOpenCloseContext };
export default ModalOpenCloseContextProvider;
