import React from "react";
import Dialog from "@mui/material/Dialog";
import Button from "@mui/material/Button";
import { useWarningPopup } from "@/contexts/modalContext/warningPopupProvider";
import {
  cameraIcon,
  closeButtonNew,
  emojiParty,
  placeholderImage,
  warningIcon,
} from "@/assetsLayer";
import Image from "next/image";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import { SectionColumn } from "@/layouts/section";
import { useSuccessPopup } from "@/contexts/modalContext/successPopupProvider";

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  borderRadius: 5,
  p: 2,
};
const SuccessPopup = () => {
  const {
    isSuccessPopupOpen,
    subTitle,
    partnershipPicture1,
    partnershipPicture2,
    closeSuccessPopup,
    handleNavigation,
  } = useSuccessPopup();

  return (
    <Modal
      open={isSuccessPopupOpen}
      onClose={closeSuccessPopup}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
      sx={{
        backdropFilter: "blur(15px)",
      }}
    >
      <div>
        <Box sx={style}>
          <SectionColumn className="grid justify-items-center ">
            <div className="large-dialog-success relative pt-4">
              <button
                onClick={(e: any) => closeSuccessPopup()}
                className="modalcloseBTN opacity-100 duration-500 hover:rotate-90 hover:scale-110 hover:opacity-100"
              >
                <Image
                  src={closeButtonNew}
                  alt="Picture of the author"
                  width={30}
                  height={30}
                />
              </button>
              <SectionColumn className="h-full w-full items-center justify-between p-5">
                <div className="bg-gif flex w-full">
                  <div className="mx-auto justify-center align-middle">
                    <Image
                      src={partnershipPicture1 || placeholderImage}
                      alt="Picture of the author"
                      width={110}
                      height={110}
                      className="baseImage orgListViewProfileImage ml-5 rounded-full ring ring-white"
                    />
                    <Image
                      src={partnershipPicture2 || placeholderImage} //  second image source
                      alt="Second image"
                      width={110}
                      height={110}
                      className="overlayImage orgListViewProfileImage rounded-full ring ring-white"
                    />
                  </div>
                </div>

                <SectionColumn>
                  <div className="py-5">
                    <div className="flex justify-center">
                      <p className="h3-black-15-text inline-flex text-center align-middle">
                        <strong> Congratulations </strong>
                        <Image
                          src={emojiParty}
                          alt="Picture of the author"
                          width={20}
                          height={20}
                          style={{ marginLeft: "5px" }}
                        />
                      </p>
                    </div>
                    <div className="mt-2 flex w-full">
                      <p className="h3-black-12-text text-center">{subTitle}</p>
                    </div>
                  </div>
                </SectionColumn>

                <div className="flex-grow-1">
                  <button
                    onClick={(e: any) => {
                      handleNavigation();
                      closeSuccessPopup();
                    }}
                    className="blue-button"
                  >
                    Continue
                  </button>
                </div>
              </SectionColumn>
            </div>
          </SectionColumn>
        </Box>
      </div>
    </Modal>
  );
};

export default SuccessPopup;
