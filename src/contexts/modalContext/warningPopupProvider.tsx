import {
  getInitialUserProfilePictureToLocalStorage,
  getUserIdFromStorage,
  getUserPublicURL,
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
import { AccountType } from "@/helpers/enumHelpers";
import { useAlerts } from "@/hooks/alertHook";
import { useRouter } from "next/router";
import React, { createContext, useContext, useMemo, useState } from "react";
import { useUser } from "../authContext/userProvider";
import { OrganizationCreateStageContext } from "../organizationContext/organizationCreateStageContext";
import { PublicProfileCreateStageContext } from "../publicProfileContext/createPublicProfileStageContext";

const WarningPopupContext = createContext({
  isWarningPopupOpen: false,
  message: "",
  warningUserName: "",
  warningOrganizationId: null,
  warningProfileId: null,
  warningAccountType: "",
  warningUserOwnOrganization: false,
  warningPublicProfileId: null,
  warningUserOwnPublicProfile: false,
  warningProfilePicture: "",
  warningProfilePicture2: "",
  warningCountryCode: null,
  warningPublicURL: null,
  setWarningUserName: (newMessage: string) => { },
  setWarningOrganizationId: (newId: number) => { },
  setWarningProfileId: (newId: number) => { },
  setWarningAccountType: (newType: string) => { },
  setWarningUserOwnOrganization: (newOrganization: boolean) => { },
  setWarningUserOwnPublicProfile: (newProfile: boolean) => { },
  setWarningPublicProfileId: (newId: number) => { },
  setWarningProfilePicture: (pic: string) => { },
  setWarningProfilePicture2: (pic: string) => { },
  setWarningCountryCode: (num: number) => { },
  setMessage: (newMessage: string) => { },
  setWarningWarningPublicURL: (value: string) => { },
  openWarningPopup: () => { },
  closeWarningPopup: () => { },
  routeToDashboard: () => { },
});

export const WarningPopupProvider = ({ children }) => {
  const { setUserName, setProfilePicture, setProfilePicture2, setAccountType } =
    useUser();
  const [isWarningPopupOpen, setWarningPopupOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [warningProfilePicture, setWarningProfilePicture] = useState("");
  const [warningProfilePicture2, setWarningProfilePicture2] = useState("");
  const [warningUserName, setWarningUserName] = useState("");
  const [warningOrganizationId, setWarningOrganizationId] = useState(null);
  const [warningPublicProfileId, setWarningPublicProfileId] = useState(null);
  const [warningProfileId, setWarningProfileId] = useState(null);
  const [warningAccountType, setWarningAccountType] = useState("");
  const [warningUserOwnOrganization, setWarningUserOwnOrganization] =
    useState(false);
  const [warningCountryCode, setWarningCountryCode] = useState(null);
  const [warningPublicURL, setWarningWarningPublicURL] = useState("");
  const { setAlert } = useAlerts();

  const [warningUserOwnPublicProfile, setWarningUserOwnPublicProfile] =
    useState(false);
  const router = useRouter();

  const { setUserOwnOrganization } = React.useContext(
    OrganizationCreateStageContext
  );

  const { setUserOwnPublicProfile } = React.useContext(
    PublicProfileCreateStageContext
  );

  const openWarningPopup = () => {
    setWarningPopupOpen(true);
  };

  const closeWarningPopup = () => {
    setMessage("");
    setWarningPopupOpen(false);
  };

  const handleSetUserDetails = () => {
    if (warningAccountType == String(AccountType.INITIAL)) {
      setUserAccountType(AccountType.INITIAL);
      setAccountType(AccountType.INITIAL);
      setUserNameToLocalStorage(warningUserName);
      setUserName(warningUserName);
      setUserProfilePictureToLocalStorage(
        getInitialUserProfilePictureToLocalStorage()
      );
      setProfilePicture(getInitialUserProfilePictureToLocalStorage());
      setPublicUrlToLocalStorage(getUserPublicURL());
      setProfileId(String(getUserIdFromStorage()));
      setAlert({
        message: `Your account has been switched to the personal account '${warningUserName}'`,
        severity: "success",
      });
    } else if (warningAccountType == String(AccountType.ORGANIZATION)) {
      setUserNameToLocalStorage(warningUserName);
      setUserName(warningUserName);
      setOrganizationId(warningOrganizationId);
      setProfileId(warningProfileId);
      setUserAccountType(AccountType.ORGANIZATION);
      setAccountType(AccountType.ORGANIZATION);
      setUserOwnOrganization(true);
      setUserProfilePictureToLocalStorage(warningProfilePicture);
      setUserProfilePicture2ToLocalStorage("");
      // setWarningProfilePicture(warningProfilePicture);
      setWarningProfilePicture2("");
      setProfilePicture(warningProfilePicture);
      setProfilePicture2("");
      setCountryCode(warningCountryCode);
      setPublicUrlToLocalStorage(warningPublicURL);
      setAlert({
        message: `Your account has been switched to the organization '${warningUserName}'`,
        severity: "success",
      });
    } else if (warningAccountType == String(AccountType.PUBLIC_PROFILE)) {
      setUserNameToLocalStorage(warningUserName);
      setUserName(warningUserName);
      setPublicProfileId(warningPublicProfileId);
      setProfileId(warningProfileId);
      setUserAccountType(AccountType.PUBLIC_PROFILE);
      setAccountType(AccountType.PUBLIC_PROFILE);
      setUserOwnPublicProfile(true);
      setUserProfilePictureToLocalStorage(warningProfilePicture);
      setUserProfilePicture2ToLocalStorage("");
      // setWarningProfilePicture(warningProfilePicture);
      setWarningProfilePicture2("");
      setProfilePicture(warningProfilePicture);
      setProfilePicture2("");
      setCountryCode(warningCountryCode);
      setPublicUrlToLocalStorage(warningPublicURL);
      setAlert({
        message: `Your account has been switched to the public profile '${warningUserName}'`,
        severity: "success",
      });
    } else {
      setUserNameToLocalStorage(warningUserName);
      setUserName(warningUserName);
      setPublicProfileId(warningPublicProfileId);
      setProfileId(warningProfileId);
      setUserAccountType(AccountType.PARTNERSHIP);
      setAccountType(AccountType.PARTNERSHIP);
      setUserProfilePictureToLocalStorage(warningProfilePicture);
      setUserProfilePicture2ToLocalStorage(warningProfilePicture2);
      // setWarningProfilePicture(warningProfilePicture);
      // setWarningProfilePicture2(warningProfilePicture2);
      setProfilePicture(warningProfilePicture);
      setProfilePicture2(warningProfilePicture2);
      setCountryCode(warningCountryCode);
      setPublicUrlToLocalStorage(warningPublicURL);
      setAlert({
        message: `Your account has been switched to the partnership profile '${warningUserName}'`,
        severity: "success",
      });
    }
  };

  const routeToDashboard = () => {
    handleSetUserDetails();
    closeWarningPopup();
    router.push("/home");
  };

  const contextValue = useMemo(
    () => ({
      isWarningPopupOpen,
      message,
      warningUserName,
      warningOrganizationId,
      warningProfileId,
      warningAccountType,
      warningUserOwnOrganization,
      warningPublicProfileId,
      warningUserOwnPublicProfile,
      warningProfilePicture,
      warningCountryCode,
      warningProfilePicture2,
      warningPublicURL,
      setWarningUserName,
      setWarningOrganizationId,
      setWarningProfileId,
      setWarningAccountType,
      setWarningUserOwnOrganization,
      setWarningUserOwnPublicProfile,
      setWarningPublicProfileId,
      setMessage,
      setWarningCountryCode,
      openWarningPopup,
      closeWarningPopup,
      routeToDashboard,
      setWarningProfilePicture,
      setWarningProfilePicture2,
      setWarningWarningPublicURL,
    }),
    [
      isWarningPopupOpen,
      message,
      warningUserName,
      warningProfileId,
      warningAccountType,
      warningProfilePicture,
      warningCountryCode,
      warningProfilePicture2,
      warningPublicURL,
    ]
  );

  return (
    <WarningPopupContext.Provider value={contextValue}>
      {children}
    </WarningPopupContext.Provider>
  );
};

export const useWarningPopup = () => {
  return useContext(WarningPopupContext);
};
