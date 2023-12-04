import { SignUpStageContext } from "@/contexts/authContext/SignUpStageContext";
import React, { useContext } from "react";
import Image from "next/image";
import Modal from "@mui/material/Modal";
import { avatar, closeButtonNew, DR_Logo_02, email, picUploadPlusIcon } from "@/assetsLayer";
import { ModalOpenCloseContext } from "@/contexts/modalContext/modalOpenCloseContext";
// import ProfilePicUploadCard from "../../../components/Card/fileUpload/profilePicUpload";
import { SectionRow } from "@/layouts/section";

export interface HomeProps { }

const UploadProfilePhotoCard: React.FC<HomeProps> = (props) => {

  const { profilePictureUploadModal, setProfilePictureUploadModal } = useContext(ModalOpenCloseContext);
  const { setSignUpStageCount, setSignUpType } = useContext(SignUpStageContext);

  const handleClose = () => {
    setProfilePictureUploadModal(false);
  }

  return (
    <div>
      <Modal
        hideBackdrop
        open={profilePictureUploadModal}
        onClose={handleClose}
        aria-labelledby='modal-modal-title'
        aria-describedby='modal-modal-description'
        className='modalBackDrop'>
        <div className='modalStructureViewOrg'>
          <SectionRow className="relative">
            <span className="imageUploadText ml-8 mt-4">Add Organization Logo</span>
            <button className="absolute right-5 mt-4 duration-500 hover:rotate-90 hover:opacity-100" onClick={(e: any) => handleClose()}>
              <Image
                src={closeButtonNew}
                alt='Picture of the author'
                width={22}
                height={22}
              />
            </button>
          </SectionRow>
          <div className='line mt-2 mb-4 w-full'></div>
          <div className='w-full flex items-center flex-col px-5 pb-2'>
            {/* <ProfilePicUploadCard /> */}
          </div>
          <div className="signUpText mb-6 text-center" >
            <button
              className='uploadProfilepicMainBTN rounded-full align-middle'
              onClick={() => handleClose()}
            >
              Upload a Photo
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default UploadProfilePhotoCard;
