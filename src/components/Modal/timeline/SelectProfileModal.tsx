import React, { useState, useEffect } from "react";
import Modal from "@mui/material/Modal";
import Image from "next/image";
import { ModalOpenCloseContext } from "@/contexts/modalContext/modalOpenCloseContext";
import { SectionColumn, SectionRow } from "@/layouts/section";
import {
  modalCloseIcon,
  profileImage,
  vectorIcon,
  placeholderImage,
} from "@/assetsLayer";
import { organizationMockData } from "@/helpers/mock/mockData";
import { stringCrop } from "@/helpers/stringCrop";
import {
  getInitialAccountName,
  getInitialUserProfilePictureToLocalStorage,
  getUserIdFromStorage,
} from "@/helpers/authHelper";
import { useAlerts } from "@/hooks/alertHook";
import { checkIsSavedEventActionHandler, checkIsSavedPostActionHandler, saveEventActionHandler, savePostActionHandler } from "@/actionLayer/save/saveActions";
import Loader from "../LoadingModal";

export interface Props {
  orgProfileList?: any;
  publicProfile?: any;
  partnershipList?: any;
  postId?: string;
  contentType?: string;
}

const SelectProfileModal: React.FC<Props> = (props) => {

  const [accountName, setAccountName] = useState<string>("");
  const [initialProfilePicture, setInitialProfilePicture] = useState<string>("");
  const [userAccountId, setUserAccountId] = useState(0);
  const [loaderOpen, setLoaderOpen] = useState(false);
  const [loaderText, setLoaderText] = useState("");

  const { profileSelectModal, setProfileSelectModal } = React.useContext(ModalOpenCloseContext);
  const { setAlert } = useAlerts();

  useEffect(() => {
    console.log('props :>> ', props);
    setAccountName(getInitialAccountName());
    setInitialProfilePicture(getInitialUserProfilePictureToLocalStorage());
    setUserAccountId(getUserIdFromStorage());
  }, []);

  const handleCloseMenuBar = () => setProfileSelectModal(false);

  const saveHandler = (profileType, profileId) => {
    setLoaderOpen(true);

    let values;
    if (props.contentType === "GENERAL_POST" || props.contentType === "PARTNERSHIP_POST") {
      values = {
        postId: props.postId,
        saveEntityId: profileId,
        saveType: profileType,
        isSave: true
      }

      savePostActionHandler(values)
        .then((res: any) => {
          if (res?.responseCode === "00") {
            setLoaderOpen(false);
            setProfileSelectModal(false);
            setAlert({
              message: "Post saved!",
              severity: "success",
            });
          } else if (res?.responseMessage) {
            setLoaderOpen(false);
            setAlert({
              message: res?.responseMessage || "Error!",
              severity: "error",
            });
          } else {
            setLoaderOpen(false);
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

    } else {
      values = {
        eventId: props.postId,
        saveEntityId: profileId,
        saveType: profileType,
        isSave: true
      }
      console.log('values :>> ', values);

      saveEventActionHandler(values)
        .then((res: any) => {
          if (res?.responseCode === "00") {
            setLoaderOpen(false);
            setProfileSelectModal(false);
            setAlert({
              message: "Event saved!",
              severity: "success",
            });
          } else if (res?.responseMessage) {
            setLoaderOpen(false);
            setAlert({
              message: res?.responseMessage || "Error!",
              severity: "error",
            });
          } else {
            setLoaderOpen(false);
            setAlert({
              message: "Error!",
              severity: "error",
            });
          }
          return res;
        })
        .catch((error) => {
          setLoaderOpen(false);
          setAlert({
            message: "Error!",
            severity: "error",
          });
          return error;
        });
    }
  }

  const handleCheckIsSaved = (profileType, profileId) => {
    setLoaderOpen(true);

    if (props.contentType === "PARTNERSHIP_POST" || props.contentType === "GENERAL_POST") {
      let values = {
        postId: props.postId,
        saveEntityId: profileId,
        saveType: profileType
      }

      checkIsSavedPostActionHandler(values)
        .then((res: any) => {
          if (res?.responseCode === "00" && res?.isSave === false) {
            setLoaderOpen(false);
            console.log('res :>> ', res);
            saveHandler(profileType, profileId);
          } else if (res?.responseCode === "00" && res?.isSave === true) {
            setLoaderOpen(false);
            setAlert({
              message: "Post is already save to this account",
              severity: "error",
            });
          } else {
            setLoaderOpen(false);
            setAlert({
              message: res?.responseMessage ? res?.responseMessage : "Error!",
              severity: "error",
            });
          }
          return res;
        })
        .catch((error) => {
          setLoaderOpen(false);
          setAlert({
            message: error || "Error!",
            severity: "error",
          });
          return error;
        });

    } else {
      let values = {
        eventId: props.postId,
        saveEntityId: profileId,
        saveType: profileType
      }
      checkIsSavedEventActionHandler(values)
        .then((res: any) => {
          if (res?.responseCode === "00" && res?.isSave === false) {
            setLoaderOpen(false);
            console.log('res :>> ', res);
            saveHandler(profileType, profileId);
          } else if (res?.responseCode === "00" && res?.isSave === true) {
            setLoaderOpen(false);
            setAlert({
              message: "Event is already save to this account",
              severity: "error",
            });
          } else {
            setLoaderOpen(false);
            setAlert({
              message: res?.responseMessage || "Error!",
              severity: "error",
            });
          }
          return res;
        })
        .catch((error) => {
          setLoaderOpen(false);
          setAlert({
            message: error || "Error!",
            severity: "error",
          });
          return error;
        });
    }
  }

  return (
    <div>
      <Modal
        open={profileSelectModal}
        onClose={handleCloseMenuBar}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        className="modalShadow"
      >
        <div className="modalStructureSelectProfie modalShadow p-4">
          <div className="modalContent">
            <SectionColumn>
              <SectionRow className="MenuHeaderContainer w-full items-center justify-between">
                <div className="flex flex-row items-center">
                  <div className="mr-2">
                    <Image
                      src={vectorIcon}
                      alt="Picture of the author"
                      width={15}
                      height={15}
                    />
                  </div>
                  <span className="h3-black-13-text">Select Profile to save post</span>
                </div>
                <button
                  className="right-0 duration-500 hover:rotate-90 hover:opacity-100"
                  onClick={(e: any) => handleCloseMenuBar()}
                >
                  <Image
                    src={modalCloseIcon}
                    alt="Picture of the author"
                    width={15}
                    height={15}
                  />
                </button>
              </SectionRow>

              <div className="w-full px-2 pt-2">
                <button
                  className="grid w-full transform rounded-md py-2 transition duration-1000 hover:bg-gray-200 "
                  onClick={(e: any) => handleCheckIsSaved('INITIAL', userAccountId)}
                >
                  <SectionRow className="w-full items-center px-2">
                    <Image
                      src={initialProfilePicture || placeholderImage}
                      alt="Picture of the author"
                      width={30}
                      height={30}
                      className="menubarProfileImage rounded-full ring ring-white"
                    />
                    <span className="h3-black-12-text ml-3">{accountName}</span>
                  </SectionRow>
                </button>
              </div>
            </SectionColumn>

            {props?.publicProfile?.length > 0 ? (
              <div className="">
                {/* <SectionRow className="MenuHeaderContainer w-full items-center justify-between">
                  <div className="flex flex-row items-center">
                    <div className="mr-2">
                      <Image
                        src={groupIcon}
                        alt="Picture of the author"
                        width={15}
                        height={15}
                      />
                    </div>
                    <span className="h3-black-13-text">
                      Select your Public Profile
                    </span>
                  </div>
                </SectionRow> */}
                <div className="flex w-full flex-col items-start px-2">
                  <button
                    className="grid w-full transform rounded-md py-2 transition duration-1000 hover:bg-gray-200"
                    onClick={(e: any) =>
                      handleCheckIsSaved('PUBLIC_PROFILE', props?.publicProfile[0]?.profile?.profileId)
                    }
                  >
                    <SectionRow className="w-full items-center px-2">
                      <Image
                        src={
                          props?.publicProfile[0]?.profile.profileImagePath &&
                            props?.publicProfile[0]?.profile.profileImagePath.includes(
                              "http"
                            )
                            ? props?.publicProfile[0]?.profile.profileImagePath
                            : profileImage
                        }
                        alt="Picture of the author"
                        width={30}
                        height={30}
                        className="menubarProfileImage rounded-full ring ring-white"
                      />
                      <span className="h3-black-12-text ml-3">
                        {stringCrop(
                          props?.publicProfile[0]?.profile?.profileName,
                          30
                        )}
                      </span>
                    </SectionRow>
                  </button>
                </div>
              </div>
            ) : (
              <></>
            )}
            {props?.orgProfileList?.length > 0 ? (
              <div className="">
                {/* <SectionRow className="MenuHeaderContainer w-full items-center justify-between">
                  <div className="flex flex-row items-center">
                    <div className="mr-2">
                      <Image
                        src={groupIcon}
                        alt="Picture of the author"
                        width={15}
                        height={15}
                      />
                    </div>
                    <span className="h3-black-13-text">
                      Select your Organization
                    </span>
                  </div>
                </SectionRow> */}
                <div className="flex w-full flex-col items-start px-2">
                  {props?.orgProfileList?.map((org, i) => (
                    <div key={org?.profile?.profileId} className="w-full">
                      <button
                        className="grid w-full transform rounded-md py-2 transition duration-1000 hover:bg-gray-200 "
                        onClick={(e: any) =>
                          handleCheckIsSaved('ORGANIZATION', org?.profile?.profileId)
                        }
                      >
                        <SectionRow className="w-full items-center px-2">
                          <Image
                            src={
                              org?.profile?.profileImagePath &&
                                org?.profile?.profileImagePath.includes("http")
                                ? org?.profile?.profileImagePath
                                : organizationMockData.logoImage
                            }
                            alt="Picture of the author"
                            width={30}
                            height={30}
                            className="menubarProfileImage rounded-full ring ring-white"
                          />
                          <span className="h3-black-12-text ml-3">
                            {stringCrop(org.profile.profileName, 30)}
                          </span>
                        </SectionRow>
                      </button>
                      {props?.orgProfileList.length - 1 !== i}
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              <></>
            )}

            {props?.partnershipList?.length > 0 ? (
              <div className="">
                {/* <SectionRow className="MenuHeaderContainer w-full items-center justify-between">
                  <div className="flex flex-row items-center">
                    <div className="mr-2">
                      <Image
                        src={groupIcon}
                        alt="Picture of the author"
                        width={15}
                        height={15}
                      />
                    </div>
                    <span className="h3-black-13-text">
                      Select your Partnership
                    </span>
                  </div>
                </SectionRow> */}
                <div className="flex w-full flex-col items-start px-2">
                  {props?.partnershipList?.map((prp, i) => (
                    <div key={props?.partnershipList?.partnershipId} className="w-full">
                      <button
                        className="grid w-full transform rounded-md py-2 transition duration-1000 hover:bg-gray-200 "
                        onClick={(e: any) =>
                          handleCheckIsSaved('PARTNERSHIP', prp?.partnershipId)
                        }
                      >
                        <SectionRow className="w-full items-center px-2">
                          <div className="my-auto ">
                            <Image
                              src={
                                prp?.partnershipDetailEntityList[0].profile
                                  .profileImagePath
                                  ? prp?.partnershipDetailEntityList[0].profile
                                    .profileImagePath
                                  : placeholderImage
                              }
                              alt="Picture of the author"
                              width={30}
                              height={30}
                              className="baseImage menubarProfileImage rounded-full ring ring-white"
                            />
                            <Image
                              src={
                                prp?.partnershipDetailEntityList[1].profile
                                  .profileImagePath
                                  ? prp?.partnershipDetailEntityList[1].profile
                                    .profileImagePath
                                  : placeholderImage
                              } // Your second image source
                              alt="Second image"
                              width={30} // Adjust width to half of the first image
                              height={30}
                              className="overlayImage menubarProfileImage rounded-full ring ring-white"
                            />
                          </div>
                          <span className="h3-black-12-text ml-3">
                            {stringCrop(prp?.partnershipName, 26)}
                          </span>
                        </SectionRow>
                      </button>
                      {props?.partnershipList.length - 1 !== i}
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              <></>
            )}
          </div>
        </div>
      </Modal>
      <Loader loaderText={loaderText} open={loaderOpen} />
    </div>
  );
};

export default SelectProfileModal;
