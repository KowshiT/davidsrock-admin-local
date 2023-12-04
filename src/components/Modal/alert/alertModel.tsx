import React from "react";
import Dialog from "@mui/material/Dialog";
import Button from "@mui/material/Button";
import { useWarningPopup } from "@/contexts/modalContext/warningPopupProvider";
import { cameraIcon, closeButtonNew, warningIcon } from "@/assetsLayer";
import Image from "next/image";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import { SectionColumn } from "@/layouts/section";

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  borderRadius: 5,
  p: 2,
};
const WarningPopup = () => {
  const {
    isWarningPopupOpen,
    closeWarningPopup,
    message,
    routeToDashboard,
  } = useWarningPopup();

  return (
    <Modal
      open={isWarningPopupOpen}
      onClose={closeWarningPopup}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
      sx={{
        backdropFilter: "blur(15px)",
      }}
    >
      <div>
        <Box sx={style}>
          <SectionColumn className="grid justify-items-center ">
            <div className="medium-dialog pt-4 relative">
              <button
                onClick={(e: any) => closeWarningPopup()}
                className="modalcloseBTN opacity-100 duration-500 hover:scale-110 hover:rotate-90 hover:opacity-100"
              >
                <Image
                  src={closeButtonNew}
                  alt="Picture of the author"
                  width={30}
                  height={30}
                />
              </button>
              <SectionColumn className="h-full w-full items-center justify-between p-5">
                <div className="">
                  <Image
                    alt="The guitarist in the concert."
                    src={warningIcon}
                    width={50}
                    height={50}
                    className=""
                    // layout="responsive"
                  />
                </div>

                <div className="py-5">
                  <p className="h3-black-14-text">{message}</p>
                </div>
                <div className="flex-grow-1">
                  <button
                    onClick={(e: any) => routeToDashboard()}
                    className="red-button"
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

export default WarningPopup;
