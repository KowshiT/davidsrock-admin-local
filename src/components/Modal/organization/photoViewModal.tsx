import React, { useContext, useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import Image from "next/image";
import { ModalOpenCloseContext } from "@/contexts/modalContext/modalOpenCloseContext";
import { SectionColumn } from "@/layouts/section";
import { closeButtonNew, Close_Logo } from "@/assetsLayer";
import { SignUpStageContext } from "@/contexts/authContext/SignUpStageContext";
import { dateFormatForEvent } from "@/helpers/dateHelpers";

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  borderRadius: 5,
  p: 2,
};

export interface Props {
  photoDetails: any;
}

const PhotoViewModal: React.FC<Props> = (props) => {
  const { photoViewModal, setPhotoViewModal } = useContext(
    ModalOpenCloseContext
  );

  const handleOpen = () => setPhotoViewModal(true);
  const handleClose = () => {
    setPhotoViewModal(false);
  };

  return (
    <div>
      <Modal
        open={photoViewModal}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        sx={{
          backdropFilter: "blur(15px)",
        }}
      >
        <div>
          <Box sx={style}>
            <SectionColumn className="grid justify-items-center ">
              <React.Fragment>
                <div className="photoViewSecDIV relative p-5">
                  <div className="photoViewSubDIV py-4">
                    <button
                      onClick={(e: any) => handleClose()}
                      className="modalcloseBTN opacity-100 duration-500 hover:rotate-90 hover:scale-110 hover:opacity-100"
                    >
                      <Image
                        src={closeButtonNew}
                        alt="Picture of the author"
                        width={30}
                        height={30}
                      />
                    </button>

                    <div className="organizationDetailsOptionText4 mt-5 mb-5 grid justify-items-center">
                      {props?.photoDetails?.imageTitle}
                    </div>

                    <div className="grid justify-items-center ">
                      <Image
                        src={props?.photoDetails?.imagePath}
                        className="rounded-lg"
                        alt="Picture of the author"
                        width={450}
                        height={400}
                      />
                    </div>

                    <div className="organizationDetailsOptionText2 mt-5 mb-5">
                      {props?.photoDetails?.imageTitle}
                    </div>
                    <div className="">
                      <p className="previewEventSubTextTxt06">
                        {props?.photoDetails?.imageDescription}
                      </p>
                      <div className="mt-2">
                        <p className="previewEventSubTextTxt07">
                          {/* {props?.photoDetails?.PostBy} */}|{" "}
                          {dateFormatForEvent(
                            props?.photoDetails?.lastModifiedDate
                          )}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </React.Fragment>
            </SectionColumn>
          </Box>
        </div>
      </Modal>
    </div>
  );
};

export default PhotoViewModal;
