import React, { useEffect, useState } from "react";
import Modal from "@mui/material/Modal";

import { ModalOpenCloseContext } from "@/contexts/modalContext/modalOpenCloseContext";
import Image from "next/image";
import {
  closeButtonNew,
  placeholderBackground,
  placeholderImage,
} from "@/assetsLayer";
import { SectionColumn, SectionRow } from "@/layouts/section";
import { RiEdit2Fill } from "react-icons/ri";
import EditDetailWrapperModel from "./component/editDetailWrapperModel";
import { AccountType } from "@/helpers/enumHelpers";
import EditOrganizationDetailModal from "./organization/editOrganizationDetailModal";
import EditPublicProfileDetailModal from "./publicProfile/editPublicProfileDetailModal";
import EditUserProfileDetailModal from "./userProfile/editUserProfileDetailModal";
import ProfileWrapperContent from "./component/ProfileWrapperContent";

const componentMap = {
  [AccountType.ORGANIZATION]: EditOrganizationDetailModal,
  [AccountType.PUBLIC_PROFILE]: EditPublicProfileDetailModal,
  [AccountType.INITIAL]: EditUserProfileDetailModal,
};

export interface OrganizationEditModalProps {
  detailContent: any;
  type: any;
  details: any;
  profilePicture: any;
  coverPicture: any;
  userId: any;
}
const ProfileDetailsEditModal: React.FC<OrganizationEditModalProps> = (
  props
) => {
  const {
    editOrganizationModal,
    setEditOrganizationModal,
    setEditDetailWrapperModal,
  } = React.useContext(ModalOpenCloseContext);

  const handleCloseMenuBar = () => setEditOrganizationModal(false);
  const [profilePic, setProfilePic] = useState(props.profilePicture);
  const [coverPic, setCoverPic] = useState(props.coverPicture);
  const DetailComponent = componentMap[props.type] || null;

  useEffect(() => {
    localStorage.removeItem("uploadType");
    if (props.profilePicture && props.coverPicture) {
      setProfilePic(props?.profilePicture);
      setCoverPic(props.coverPicture);
    }
  }, [props.profilePicture, props.coverPicture]);

  return (
    <React.Fragment>
      <Modal
        open={editOrganizationModal}
        onClose={handleCloseMenuBar}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        sx={{
          backdropFilter: "blur(10px)",
        }}
      >
        <div className="edit-modal-container py-3">
          <button
            onClick={(e: any) => handleCloseMenuBar()}
            className="modalcloseBTN opacity-100 duration-500 hover:rotate-90 hover:scale-110 hover:opacity-100"
          >
            <Image
              src={closeButtonNew}
              alt="Picture of the author"
              width={30}
              height={30}
            />
          </button>
          <div className="edit-modal-sub-container">
            <div className="edit-modal-content">
              <SectionColumn className="my-6">
                <ProfileWrapperContent
                  profilePic={profilePic || placeholderImage.src}
                  setProfilePic={setProfilePic}
                  coverPic={coverPic || placeholderBackground.src}
                  setCoverPic={setCoverPic}
                  setEditOrganizationModal={setEditOrganizationModal}
                  profileType={props.type}
                  userId={props.userId}
                />
                <hr className="separator-line" />

                <div className="mt-5">
                  <div className="flex justify-between">
                    <div className="">
                      <p className="h3-black-15-text">Details</p>
                    </div>
                    <div
                      className="flex h-fit cursor-pointer flex-row"
                      onClick={(e: any) => setEditDetailWrapperModal(true)}
                      onKeyDown={(e: any) => {
                        if (e.key === 'Enter') {
                          e.preventDefault();
                          setEditDetailWrapperModal(true);
                        }
                      }}
                      role="button"
                      tabIndex={0}
                    >
                      <RiEdit2Fill size={15} className="primary-color" />

                      <span className="h3-dark-gray-13-text-500 bottom-0 ml-1">
                        Edit
                      </span>
                    </div>
                  </div>
                  <div className="edit-profile-detail-wrapper mt-1">
                    {props.detailContent}
                  </div>
                </div>

                <hr className="separator-line" />
              </SectionColumn>
            </div>
          </div>
        </div>
      </Modal>
      <EditDetailWrapperModel
        detailContent={
          DetailComponent && <DetailComponent details={props.details} />
        }
      />
    </React.Fragment>
  );
};

export default ProfileDetailsEditModal;
