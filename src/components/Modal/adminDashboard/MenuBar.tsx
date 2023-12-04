import React, { useEffect, useState } from "react";
import Modal from "@mui/material/Modal";
import Image from "next/image";
import { useRouter } from "next/router";
import { ModalOpenCloseContext } from "@/contexts/modalContext/modalOpenCloseContext";
import { SectionColumn, SectionRow } from "@/layouts/section";
import {
  modalCloseIcon,
  profileImage,
  groupIcon,
  vectorIcon,
  logoutIcon,
  placeholderImage,
} from "@/assetsLayer";
import { useAlerts } from "@/hooks/alertHook";
import { organizationMockData } from "@/helpers/mock/mockData";
import homeIcon from "../../../../public/assets/icons/timelineLeftmenu/homeIcon.png";
import { OrganizationCreateStageContext } from "@/contexts/organizationContext/organizationCreateStageContext";
import { PublicProfileCreateStageContext } from "@/contexts/publicProfileContext/createPublicProfileStageContext";
import {
  getInitialAccountName,
  getInitialUserProfilePictureToLocalStorage,
  getUserIdFromStorage,
  getUserPublicURL,
  getUserUrlFromLocalStorage,
  setActiveTabToLocalStorage,
  setCountryCode,
  setOrganizationId,
  setProfileId,
  setPublicProfileId,
  setPublicUrlToLocalStorage,
  setUserAccountType,
  setUserNameToLocalStorage,
  setUserProfilePicture2ToLocalStorage,
  setUserProfilePictureToLocalStorage,
} from "@/helpers/authHelper";
import { useUser } from "@/contexts/authContext/userProvider";
import { AccountType } from "@/helpers/enumHelpers";
import Loader from "../LoadingModal";
import { useWarningPopup } from "@/contexts/modalContext/warningPopupProvider";
import { stringCrop } from "@/helpers/stringCrop";

export interface Props {
  orgProfileList?: any;
  publicProfile?: any;
  partnershipList: any;
}

const MenuBar: React.FC<Props> = (props) => {
  const router = useRouter();
  const { setUserName, setProfilePicture, setProfilePicture2, setAccountType } =
    useUser();
  const [accountName, setAccountName] = useState<string>("");
  const [currentPathname, setCurrentPathname] = useState<string>("");
  const [loaderOpen, setLoaderOpen] = useState(false);
  const [loaderText, setLoaderText] = useState("");
  const [initialProfilePicture, setInitialProfilePicture] =
    useState<string>("");
  const { setAlert } = useAlerts();

  const { viewOrgProfileListModal, setViewOrgProfileListModal } =
    React.useContext(ModalOpenCloseContext);
  const { setUserOwnOrganization } = React.useContext(
    OrganizationCreateStageContext
  );
  const { setUserOwnPublicProfile } = React.useContext(
    PublicProfileCreateStageContext
  );
  const {
    openWarningPopup,
    setMessage,
    setWarningAccountType,
    setWarningOrganizationId,
    setWarningProfileId,
    setWarningPublicProfileId,
    setWarningUserName,
    setWarningUserOwnOrganization,
    setWarningUserOwnPublicProfile,
    setWarningProfilePicture2,
    setWarningProfilePicture,
    setWarningCountryCode,
    setWarningWarningPublicURL,
  } = useWarningPopup();

  useEffect(() => {
    setAccountName(getInitialAccountName());
    setInitialProfilePicture(getInitialUserProfilePictureToLocalStorage());
    // Check if the current URL matches any URL in the array
    setCurrentPathname(window.location.pathname);
  }, []);

  const restrictURLsForOrganization = [
    "/dashboard/createOrganization",
    "/dashboard/createorganization",
    "/dashboard/createPublicProfile",
    "/dashboard/createpublicprofile",
  ];
  const restrictURLsForPersonal = [
    "/dashboard/partnershipDashboard",
    "/dashboard/partnershipdashboard",
    "/dashboard/createEvent",
    "/dashboard/createevent",
  ];

  const handleCloseMenuBar = () => setViewOrgProfileListModal(false);

  const handleViewOrg = (
    organizationName,
    organizationId,
    profileId,
    countryCode,
    profileImagePath,
    url
  ) => {
    if (restrictURLsForOrganization.includes(currentPathname)) {
      openWarningPopup();
      setMessage(
        "If you switch your account to the organization, you won't have access to this page within your organization account. Your data will be lost, and you will be redirected to the home page. Are you sure you want to continue?"
      );
      setViewOrgProfileListModal(false);
      setWarningUserName(organizationName);
      setWarningOrganizationId(organizationId);
      setWarningProfileId(profileId);
      setWarningAccountType(String(AccountType.ORGANIZATION));
      setWarningUserOwnOrganization(true);
      setWarningProfilePicture(profileImagePath);
      setWarningProfilePicture2("");
      setWarningCountryCode(countryCode);
      setWarningWarningPublicURL(url);
    } else {
      setAlert({
        message: `Your account has been switched to the organization '${organizationName}'`,
        severity: "success",
      });
      setUserNameToLocalStorage(organizationName);
      setPublicUrlToLocalStorage(url);
      setUserName(organizationName);
      setOrganizationId(organizationId);
      setProfileId(profileId);
      setUserAccountType(AccountType.ORGANIZATION);
      setAccountType(String(AccountType.ORGANIZATION));
      setViewOrgProfileListModal(false);
      setUserOwnOrganization(true);
      setUserProfilePictureToLocalStorage(profileImagePath);
      setUserProfilePicture2ToLocalStorage("");
      setProfilePicture(profileImagePath);
      setProfilePicture2("");
      setCountryCode(countryCode);
      setTimeout(() => {
        router.reload();
      }, 2000);
    }
  };

  const handleViewPartnership = (
    partnershipName,
    partnershipId,
    profileId,
    countryCode,
    profileImagePath,
    profileImagePath2,
    url
  ) => {
    if (restrictURLsForOrganization.includes(currentPathname)) {
      openWarningPopup();
      setMessage(
        "If you switch your account to the partnership account, you won't have access to this page within your organization account. Your data will be lost, and you will be redirected to the home page. Are you sure you want to continue?"
      );
      setViewOrgProfileListModal(false);
      setWarningUserName(partnershipName);
      setWarningOrganizationId(partnershipId);
      setWarningProfileId(profileId);
      setWarningAccountType(String(AccountType.PARTNERSHIP));
      setWarningUserOwnOrganization(true);
      setWarningProfilePicture(profileImagePath);
      setWarningProfilePicture2(profileImagePath2);
      setWarningCountryCode(countryCode);
      setWarningWarningPublicURL(url);
    } else {
      setAlert({
        message: `Your account has been switched to the partnership '${partnershipName}'`,
        severity: "success",
      });
      setUserNameToLocalStorage(partnershipName);
      setPublicUrlToLocalStorage(url);
      setUserName(partnershipName);
      setOrganizationId(partnershipId);
      setProfileId(profileId);
      setUserAccountType(AccountType.PARTNERSHIP);
      setAccountType(String(AccountType.PARTNERSHIP));
      setViewOrgProfileListModal(false);
      setUserOwnOrganization(true);
      setUserProfilePictureToLocalStorage(profileImagePath);
      setUserProfilePicture2ToLocalStorage(profileImagePath2);
      setProfilePicture(profileImagePath);
      setProfilePicture2(profileImagePath2);

      setCountryCode("");
      setTimeout(() => {
        router.reload();
      }, 2000);
    }
  };

  const routeUserAccount = () => {
    console.log('currentPathname ------ :>> ', currentPathname);
    if (restrictURLsForPersonal.includes(currentPathname)) {
      console.log('currentPathname :>> ', currentPathname);
      openWarningPopup();
      setMessage(
        "If you switch your account to the personal account, you won't have access to this page within your personal account. Your data will be lost, and you will be redirected to the home page. Are you sure you want to continue?"
      );
      setViewOrgProfileListModal(false);
      setWarningAccountType(String(AccountType.INITIAL));
      setWarningUserName(getInitialAccountName());
      setWarningProfileId(getUserIdFromStorage());
    } else {
      setAlert({
        message: `Your account has been switched to the personal account '${accountName}'`,
        severity: "success",
      });

      setUserAccountType(AccountType.INITIAL);
      setAccountType(String(AccountType.INITIAL));
      setViewOrgProfileListModal(false);
      setUserNameToLocalStorage(getInitialAccountName());
      setPublicUrlToLocalStorage(getUserPublicURL());
      setUserName(getInitialAccountName());
      setUserProfilePictureToLocalStorage(
        getInitialUserProfilePictureToLocalStorage()
      );
      //added user ID into profileId local Storage
      setProfileId(String(getUserIdFromStorage()));

      setProfilePicture(getInitialUserProfilePictureToLocalStorage());
      setUserProfilePicture2ToLocalStorage("");
      setProfilePicture2("");

      setTimeout(() => {
        router.reload();
      }, 2000);
    }
  };

  const handleViewPublicProfile = (
    publicProfileName,
    publicProfileId,
    profileId,
    countryCode,
    profileImagePath,
    url
  ) => {
    if (restrictURLsForOrganization.includes(currentPathname)) {
      openWarningPopup();
      setMessage(
        "If you switch your account to the public profile, you won't have access to this page within your public profile account. Your data will be lost, and you will be redirected to the home page. Are you sure you want to continue?"
      );
      setViewOrgProfileListModal(false);
      setWarningUserName(publicProfileName);
      setWarningPublicProfileId(publicProfileId);
      setWarningProfileId(profileId);
      setWarningAccountType(String(AccountType.PUBLIC_PROFILE));
      setUserAccountType(AccountType.PUBLIC_PROFILE);
      setWarningUserOwnPublicProfile(true);
      setWarningProfilePicture(profileImagePath);
      setWarningCountryCode(countryCode);
      setWarningWarningPublicURL(url);
    } else {
      setAlert({
        message: `Your account has been switched to the public profile '${publicProfileName}'`,
        severity: "success",
      });
      setUserNameToLocalStorage(publicProfileName);
      setPublicUrlToLocalStorage(url);
      setUserName(publicProfileName);
      setPublicProfileId(publicProfileId);
      setProfileId(profileId);
      setUserAccountType(AccountType.PUBLIC_PROFILE);
      setViewOrgProfileListModal(false);
      setUserOwnPublicProfile(true);
      setUserProfilePictureToLocalStorage(profileImagePath);
      setProfilePicture(profileImagePath);

      setUserProfilePicture2ToLocalStorage("");
      setProfilePicture2("");

      setTimeout(() => {
        router.reload();
      }, 2000);

      setCountryCode(countryCode);
    }
  };

  const handleHomeRoute = () => {
    setViewOrgProfileListModal(false);
    setActiveTabToLocalStorage("Dashboard");
    router.push("/dashboard");
  };

  const handleLogout = () => {
    setLoaderText("Logout...");
    setLoaderOpen(true);
    sessionStorage.clear();
    localStorage.clear();
    router.push("/").then(() => {
      document.location.reload();
    });
  };

  const handleViewProfile = (url: any) => {
    window.open(`/${url}`, "_blank");
  };

  return (
    <div>
      <Modal
        open={viewOrgProfileListModal}
        onClose={handleCloseMenuBar}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        className="modalShadow"
      >
        <div className="modalStructureViewOrgProfileList modalShadow p-4">
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
                  <span className="h3-black-13-text">Profile</span>
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

              <div className="w-full px-2 py-2">
                <button
                  className="grid w-full transform rounded-md py-2 transition duration-1000 hover:bg-gray-200 "
                  onClick={(e: any) => routeUserAccount()}
                >
                  <SectionRow className="w-full items-center px-2">
                    <Image
                      src={initialProfilePicture || placeholderImage}
                      alt="Picture of the author"
                      width={30}
                      height={30}
                      className="menubarProfileImage rounded-full ring ring-white"
                    />
                    <SectionColumn className="flex-1">
                      <span className="h3-black-12-text ml-3 !text-left">
                        {accountName}
                      </span>
                      <div className="flex w-full">
                        <button
                          className="h3-black-12-text-blue-right transform pl-3 hover:scale-110"
                          onClick={(e: any) => {
                            e.stopPropagation();
                            handleViewProfile(getUserUrlFromLocalStorage());
                          }}
                        >
                          View Profile
                        </button>
                      </div>
                    </SectionColumn>
                  </SectionRow>
                </button>
              </div>
            </SectionColumn>

            {props?.publicProfile?.length > 0 ? (
              <div className="">
                <SectionRow className="MenuHeaderContainer w-full items-center justify-between">
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
                </SectionRow>
                <div className="flex w-full flex-col items-start px-2 py-2">
                  <button
                    className="grid w-full transform rounded-md py-2 transition duration-1000 hover:bg-gray-200"
                    onClick={(e: any) =>
                      handleViewPublicProfile(
                        props?.publicProfile[0]?.profile.profileName,
                        props?.publicProfile[0]?.publicProfileId,
                        props?.publicProfile[0]?.profile.profileId,
                        props?.publicProfile[0]?.profile.countryCode,
                        props?.publicProfile[0]?.profile.profileImagePath,
                        props?.publicProfile[0]?.profile.publicUrl
                      )
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
                      <SectionColumn className="flex-1">
                        <span className="h3-black-12-text pl-3  !text-left">
                          {stringCrop(
                            props?.publicProfile[0]?.profile?.profileName,
                            30
                          )}
                        </span>
                        <div className="flex w-full">
                          <button
                            className="h3-black-12-text-blue-right transform pl-3 hover:scale-110"
                            onClick={(e: any) => {
                              e.stopPropagation();
                              handleViewProfile(
                                props?.publicProfile[0]?.profile.publicUrl
                              );
                            }}
                          >
                            View Profile
                          </button>
                        </div>
                      </SectionColumn>
                    </SectionRow>
                  </button>
                </div>
              </div>
            ) : (
              <></>
            )}
            {props?.orgProfileList?.length > 0 ? (
              <div className="">
                <SectionRow className="MenuHeaderContainer w-full items-center justify-between">
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
                </SectionRow>
                <div className="flex w-full flex-col items-start px-2 py-2">
                  {props?.orgProfileList?.map((org, i) => (
                    <div key={org?.profile?.profileId} className="w-full">
                      <button
                        className="grid w-full transform rounded-md py-2 transition duration-1000 hover:bg-gray-200 "
                        onClick={(e: any) =>
                          handleViewOrg(
                            org?.profile.profileName,
                            org?.organizationId,
                            org?.profile.profileId,
                            org?.profile.countryCode,
                            org?.profile?.profileImagePath,
                            org?.profile?.publicUrl
                          )
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
                          <SectionColumn className="flex-1">
                            <span className="h3-black-12-text ml-3 !text-left">
                              {stringCrop(org.profile.profileName, 30)}
                            </span>
                            <div className="flex w-full">
                              <button
                                className="h3-black-12-text-blue-right transform pl-3 hover:scale-110"
                                onClick={(e: any) => {
                                  e.stopPropagation();
                                  handleViewProfile(org?.profile?.publicUrl);
                                }}
                              >
                                View Profile
                              </button>
                            </div>
                          </SectionColumn>
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
                <SectionRow className="MenuHeaderContainer w-full items-center justify-between">
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
                </SectionRow>
                <div className="flex w-full flex-col items-start px-2 py-2">
                  {props?.partnershipList?.map((prp, i) => (
                    <div key={prp?.partnershipId} className="w-full">
                      <button
                        className="grid w-full transform rounded-md py-2 transition duration-1000 hover:bg-gray-200 "
                        onClick={(e: any) =>
                          handleViewPartnership(
                            prp?.partnershipName,
                            prp?.partnershipId,
                            prp?.partnershipId,
                            "",
                            prp?.partnershipDetailEntityList[0].profile
                              ?.profileImagePath,
                            prp?.partnershipDetailEntityList[1].profile
                              ?.profileImagePath,
                            prp?.publicUrl
                          )
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
                          <SectionColumn className="flex-1">
                            <span className="h3-black-12-text ml-3 !text-left">
                              {stringCrop(prp?.partnershipName, 26)}
                            </span>
                            <div className="flex w-full">
                              <button
                                className="h3-black-12-text-blue-right transform pl-3 hover:scale-110"
                                onClick={(e: any) => {
                                  e.stopPropagation();
                                  handleViewProfile(prp?.publicUrl);
                                }}
                              >
                                View Profile
                              </button>
                            </div>
                          </SectionColumn>
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

            <SectionRow className="MenuHeaderContainerTopBorder w-full items-center justify-between">
              <button onClick={(e: any) => handleHomeRoute()}>
                <div className="flex cursor-pointer flex-row items-center">
                  <div className="mr-3">
                    <Image
                      src={homeIcon}
                      alt="Picture of the author"
                      width={15}
                      height={15}
                    />
                  </div>
                  <span className="h3-black-13-text">Admin Panel</span>
                </div>
              </button>
            </SectionRow>

            <SectionRow className="MenuHeaderContainerTopBorder w-full items-center justify-between">
              <button onClick={(e: any) => handleLogout()}>
                <div className="flex cursor-pointer flex-row items-center">
                  <div className="mr-3">
                    <Image
                      src={logoutIcon}
                      alt="Picture of the author"
                      width={15}
                      height={15}
                    />
                  </div>
                  <span className="h3-black-13-text">Log out</span>
                </div>
              </button>
            </SectionRow>
          </div>
        </div>
      </Modal>
      <Loader loaderText={loaderText} open={loaderOpen} />
    </div>
  );
};

export default MenuBar;
