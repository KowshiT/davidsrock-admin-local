import React, { useEffect, useState } from "react";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import Image from "next/image";
import { useRouter } from "next/router";
import { ModalOpenCloseContext } from "@/contexts/modalContext/modalOpenCloseContext";
import { SectionColumn, SectionRow } from "@/layouts/section";
import { cameraIcon, modalCloseIcon, profileImage, profilePic, userImageBlack } from "@/assetsLayer";
import Switch from '@mui/material/Switch';
import { organizationMockData } from "@/helpers/mock/mockData";
import { toCamelCase } from "@/helpers/stringCrop";
import { OrganizationCreateStageContext } from "@/contexts/organizationContext/organizationCreateStageContext";
import { PublicProfileCreateStageContext } from "@/contexts/publicProfileContext/createPublicProfileStageContext";

export interface Props {
  orgProfileList?: any;
  publicProfile?: any;
  className?: string;
}

const ViewOrgProfileListModal: React.FC<Props> = (props) => {

  const router = useRouter();

  const { viewOrgProfileListModal, setViewOrgProfileListModal } = React.useContext(ModalOpenCloseContext);
  const { setUserOwnOrganization } = React.useContext(OrganizationCreateStageContext);
  const { setUserOwnPublicProfile } = React.useContext(PublicProfileCreateStageContext);
  const [orgList, setOrgList] = React.useState([]);

  useEffect(() => {
    let listOrg = [{ orgName: "Organization 1" }, { orgName: "Organization 2" }, { orgName: "Organization 3" }]
    setOrgList(listOrg);
  }, [])

  const handleOpen = () => setViewOrgProfileListModal(true);
  const handleClose = () => setViewOrgProfileListModal(false);

  const handleViewOrg = (organizationName, organizationId, profileId) => {
    setViewOrgProfileListModal(false);
    setUserOwnOrganization(true);
    // localStorage.setItem("profileId", profileId)
    window.open(`/organization/${toCamelCase(organizationName)}-${organizationId}`, '_blank');
  }

  const handleViewPublicProfile = (publicProfileName, publicProfileId, profileId) => {
    setViewOrgProfileListModal(false);
    setUserOwnPublicProfile(true);
    // localStorage.setItem("profileId", profileId)
    window.open(`/publicProfile/${toCamelCase(publicProfileName)}-${publicProfileId}`, '_blank');
  }

  return (
    <div>
      <Modal
        hideBackdrop
        open={viewOrgProfileListModal}
        onClose={handleClose}
        aria-labelledby='modal-modal-title'
        aria-describedby='modal-modal-description'
        className='modalShadow'>
        <div className="modalStructureViewOrgProfileList modalShadow">
          <SectionRow className="relative">
            <span className="modalsHedingText ml-8 mt-4">Select your Organization</span>
            <button className="absolute right-5 mt-5 duration-500 hover:rotate-90 hover:opacity-100" onClick={(e: any) => handleClose()}>
              <Image
                src={modalCloseIcon}
                alt='Picture of the author'
                width={22}
                height={22}
              />
            </button>
          </SectionRow>
          <div className='line mt-2 mb-4 w-full'></div>
          <div className='w-full flex items-start flex-col px-5 pb-5'>
            {props?.publicProfile?.length > 0 ? (
              <div className="w-full">
                <button className="grid py-2 rounded-md transform transition duration-1000 hover:bg-gray-200"
                  onClick={(e: any) => handleViewPublicProfile(props?.publicProfile[0]?.profile.profileName, props?.publicProfile[0]?.publicProfileId, props?.publicProfile[0]?.profile.profileId)}
                >
                  <SectionRow className="px-5">
                    <Image
                      src={profileImage}
                      alt='Picture of the author'
                      width={50}
                      height={50}
                      className=" rounded-full ring ring-white"
                    />
                    <span className="modalsHedingText ml-8 mt-3">{props?.publicProfile[0]?.profile?.profileName}</span>
                  </SectionRow>
                </button>
                <hr />
              </div>
            ) : <></>}
            {props?.orgProfileList?.length > 0 ? props?.orgProfileList?.map((org, i) => (
              <div key={org?.profile?.profileId} className="w-full">
                <button className="grid py-2 rounded-md transform transition duration-1000 hover:bg-gray-200"
                  onClick={(e: any) => handleViewOrg(org.profile.profileName, org.organizationId, org.profile.profileId)}
                >
                  <SectionRow className="px-5">
                    <Image
                      src={organizationMockData.logoImage}
                      alt='Picture of the author'
                      width={50}
                      height={50}
                      className=" rounded-full ring ring-white"
                    />
                    <span className="modalsHedingText ml-8 mt-3">{org?.profile?.profileName}</span>
                  </SectionRow>
                </button>
                {props?.orgProfileList.length - 1 !== i && <hr />}
              </div>
            )) :
              <div>
                <span className="createItemText ml-4">You don't have any Organization</span>
              </div>}
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default ViewOrgProfileListModal;
