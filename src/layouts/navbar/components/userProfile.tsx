import React, { useState, useEffect } from "react";
import { SectionRow } from "@/layouts/section";
import Image from "next/image";
import { dropDownIcon, placeholderImage } from "@/assetsLayer";
import { ModalOpenCloseContext } from "@/contexts/modalContext/modalOpenCloseContext";
import { getOrganizationDetailsApi } from "@/api/organization/organizationApi";
import { useAlerts } from "@/hooks/alertHook";
import MenuBar from "../../../components/Modal/adminDashboard/MenuBar";
import {
  getUserAccountType,
  getUserNameFromLocalStorage,
  getUserProfilePicture2ToLocalStorage,
  getUserProfilePictureToLocalStorage,
} from "@/helpers/authHelper";
import { useUser } from "@/contexts/authContext/userProvider";
import { AccountType } from "@/helpers/enumHelpers";
import { stringCrop } from "@/helpers/stringCrop";
import { getId } from "@/helpers/payloadHelper";

const UserProfile = () => {
  const { setAlert } = useAlerts();

  const [orgList, setOrgList] = useState([]);
  const [publicProfile, setPublicProfile] = useState([]);
  const [partnershipList, setPartnershipList] = useState([]);

  const {
    userName,
    setUserName,
    setProfilePicture,
    setProfilePicture2,
    profilePicture,
    profilePicture2,
    setAccountType,
    accountType,
  } = useUser();

  const { viewOrgProfileListModal, setViewOrgProfileListModal } =
    React.useContext(ModalOpenCloseContext);

  useEffect(() => {
    setUserName(getUserNameFromLocalStorage());
    setAccountType(getUserAccountType());
    setProfilePicture(getUserProfilePictureToLocalStorage());
    setProfilePicture2(getUserProfilePicture2ToLocalStorage());
  }, []);

  const viewOrgProfileListHandler = () => {
    let paramValues = {
      page: 0,
      size: 1000,
      isDescending: true,
      userId: parseInt(localStorage.getItem("userId")),
      loggedUserId: parseInt(localStorage.getItem("userId")),
      profileType: "ALL",
      loggedProfileReferenceId: getId(),
      loggedProfileType: getUserAccountType(),
    };

    console.log("paramValues :>> ", paramValues);

    getOrganizationDetailsApi(paramValues)
      .then((res: any) => {
        if (res?.responseCode === "00") {
          setViewOrgProfileListModal(true);
          setOrgList(res.organization);
          setPublicProfile(res.publicProfile);
          setPartnershipList(res.partnershipEntityDtos);
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
    <div className="navBarProfileDiv">
      <button onClick={() => viewOrgProfileListHandler()}>
        <SectionRow className=" flex items-center justify-center">
          {accountType == String(AccountType.PARTNERSHIP) ? (
            <div className="navbarProfileImageWrapper !ml-1">
              <Image
                src={profilePicture || placeholderImage}
                alt="Picture of the author"
                width={25}
                height={25}
                className="baseImage navbarProfileImage rounded-full "
              />
              <Image
                src={profilePicture2 || placeholderImage}
                alt="Second image"
                width={25} // Adjust width to half of the first image
                height={25}
                className="overlayImage navbarProfileImage rounded-full"
              />
            </div>
          ) : (
            <div className="navbarProfileImageWrapper">
              <Image
                // loader ={() => LoginPageImage}
                src={profilePicture || placeholderImage}
                alt="Picture of the author"
                width={25}
                height={25}
                className="navbarProfileImage rounded-full"
              />
            </div>
          )}

          <span className="navBarProfileNameText ml-4 mt-1">
            {stringCrop(userName, 30)}
          </span>
          <div className="ml-2 mt-1">
            <Image
              // loader ={() => LoginPageImage}
              src={dropDownIcon}
              alt="Picture of the author"
              width={25}
              height={25}
            />
          </div>
        </SectionRow>
      </button>
      {viewOrgProfileListModal && (
        <MenuBar
          orgProfileList={orgList}
          publicProfile={publicProfile}
          partnershipList={partnershipList}
        />
      )}
    </div>
  );
};

export default UserProfile;
