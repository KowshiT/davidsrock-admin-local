import { SignUpStageContext } from "@/contexts/authContext/SignUpStageContext";
import React, { useContext, useState } from "react";
import Image from "next/image";
import { avatar, closeButtonNew, DR_Logo_02 } from "@/assetsLayer";
import { ModalOpenCloseContext } from "@/contexts/modalContext/modalOpenCloseContext";
import ImageUploadModal from "../../../../components/Modal/imageUpload/ImageUploadModal";
import { ImageUploadDetailsContext } from "@/contexts/imageUploadContext/imageUploadContext";

export interface HomeProps { }

const UploadProfilePhotoCard: React.FC<HomeProps> = (props) => {

  const [metadata] = useState<any>({});

  const { setAuthModal } = useContext(ModalOpenCloseContext);
  const { setSignUpStageCount, setSignUpType } = useContext(SignUpStageContext);
  const { setImageUploadModal } = React.useContext(ModalOpenCloseContext);
  const { uploadImageFileId, setUploadImageFileId } = React.useContext(ImageUploadDetailsContext);

  const handleClose = () => {
    setAuthModal(false);
    setUploadImageFileId("");
    setSignUpStageCount(1);
    setSignUpType("");
  }

  return (
    <React.Fragment>
      <div className='profilePicUploadmainDIV pt-4 relative'>
        <button onClick={(e: any) => handleClose()} className="modalcloseBTN opacity-100 duration-500 hover:scale-110 hover:rotate-90 hover:opacity-100">
          <Image
            src={closeButtonNew}
            alt='Picture of the author'
            width={30}
            height={30}
          />
        </button>
        <div className="grid justify-items-center ">
          <div className='grid justify-items-center'>
            <Image
              src={DR_Logo_02}
              alt='Picture of the author'
              width={90}
              height={90}
            />
            <div className="text-center justify-items-center">
              <span className="loginMainText mt-4 mb-4 text-4xl">
                Welcome
              </span>

              <div className="signUpText mb-6 text-center" >
                Add a profile photo.
              </div>
              <button onClick={() => setImageUploadModal(true)}>
                <Image
                  src={uploadImageFileId || avatar}
                  alt='Picture of the author'
                  width={140}
                  height={140}
                  className="authSignupProfileImage rounded-full ring ring-white"
                />
              </button>
              {/* <ProfilePicUploadCard/> */}
            </div>

            <div className="signUpText mt-6 mb-6 text-center" >
              <button
                className='uploadProfilepicMainBTN rounded-full align-middle'
                onClick={() => {
                  if (uploadImageFileId) {
                    setSignUpStageCount(5);
                  } else {
                    setImageUploadModal(true);
                  }
                }}
              >
                {uploadImageFileId ? "Confirm" : "Upload a Photo"}
              </button>
            </div>
          </div>

        </div>
      </div>
      <ImageUploadModal metadata={metadata} title="Uplaod Profile Picture" />
    </React.Fragment>
  );
};

export default UploadProfilePhotoCard;
