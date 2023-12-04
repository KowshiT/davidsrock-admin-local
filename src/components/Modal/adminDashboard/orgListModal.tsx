import React, { useEffect, useState } from "react";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import Image from "next/image";
import { useRouter } from "next/router";
import { ModalOpenCloseContext } from "@/contexts/modalContext/modalOpenCloseContext";
import { SectionColumn, SectionRow } from "@/layouts/section";
import {
  cameraIcon,
  modalCloseIcon,
  profileImage,
  profilePic,
  userImageBlack,
} from "@/assetsLayer";
import Switch from "@mui/material/Switch";
import { organizationMockData } from "@/helpers/mock/mockData";
import { CreateEventContext } from "@/contexts/createEventContext/createEventContext";

export interface Props {
  orgProfileList?: any;
  publicProfile?: any;
}

const OrgListModal: React.FC<Props> = (props) => {
  const router = useRouter();

  const { orgListModal, setOrgListModal } = React.useContext(
    ModalOpenCloseContext
  );
  const { createEventModal, setCreateEventModal } = React.useContext(
    ModalOpenCloseContext
  );
  const { organizationId, setOrganizationId } =
    React.useContext(CreateEventContext);

  const handleOpen = () => setOrgListModal(true);
  const handleClose = () => {
    router.push("/dashboard");
    setOrgListModal(false);
  };

  const selectOrgHandler = (orgId) => {
    setOrganizationId(orgId);
    console.log("orgId :>> ", orgId);
    setOrgListModal(false);
    setCreateEventModal(true);
  };

  return (
    <div>
      <Modal
        hideBackdrop
        open={orgListModal}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        className="modalBackDrop"
      >
        <div className="modalStructureViewOrg">
          <SectionRow className="relative">
            <span className="modalsHedingText ml-8 mt-4">
              Select your Organization
            </span>
            <button
              className="absolute right-5 mt-5 duration-500 hover:rotate-90 hover:opacity-100"
              onClick={(e: any) => handleClose()}
            >
              <Image
                src={modalCloseIcon}
                alt="Picture of the author"
                width={22}
                height={22}
              />
            </button>
          </SectionRow>
          <div className="line mt-2 mb-4 w-full"></div>
          <div className="flex w-full flex-col items-start px-5 pb-5">
            {Array.isArray(props?.publicProfile) &&
            props?.publicProfile?.length > 0 ? (
              <div className="w-full">
                <button
                  className="grid transform rounded-md py-2 transition duration-1000 hover:bg-gray-200"
                  onClick={(e: any) =>
                    selectOrgHandler(
                      props?.publicProfile[0]?.profile?.profileId
                    )
                  }
                >
                  <SectionRow className="px-5">
                    <Image
                      src={profileImage}
                      alt="Picture of the author"
                      width={50}
                      height={50}
                      className=" rounded-full ring ring-white"
                    />
                    <span className="modalsHedingText ml-8 mt-3">
                      {props?.publicProfile[0]?.profile?.profileName}
                    </span>
                  </SectionRow>
                </button>
                <hr />
              </div>
            ) : (
              <></>
            )}
            {/* {props?.orgProfileList.length > 0 ? props?.orgProfileList?.map((org, i) => ( */}
            {Array.isArray(props?.orgProfileList) &&
            props?.orgProfileList.length > 0 ? (
              props?.orgProfileList?.map((org, i) => (
                <div className="w-full">
                  <button
                    className="grid transform rounded-md py-2 transition duration-1000 hover:bg-gray-200 "
                    onClick={(e: any) =>
                      selectOrgHandler(org.profile.profileId)
                    }
                  >
                    <SectionRow className="px-5">
                      <Image
                        src={organizationMockData.logoImage}
                        alt="Picture of the author"
                        width={50}
                        height={50}
                        className=" rounded-full ring ring-white"
                      />
                      <span className="modalsHedingText ml-8 mt-3">
                        {org?.profile?.profileName}
                      </span>
                    </SectionRow>
                  </button>
                  {props?.orgProfileList.length - 1 !== i && <hr />}
                </div>
              ))
            ) : (
              <div>
                <span className="createItemText ml-4">
                  You don't have any Organization
                </span>
              </div>
            )}
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default OrgListModal;
