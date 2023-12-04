import React, { useContext } from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Image from "next/image";
import { ModalOpenCloseContext } from "@/contexts/modalContext/modalOpenCloseContext";
import { SectionColumn, SectionRow } from "@/layouts/section";
import { closeButtonNew, placeholderImage } from "@/assetsLayer";
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
  post: any;
}

const SavedPostViewModal: React.FC<Props> = (props) => {
  const { savedPostViewModal, setSavedPostViewModal } = useContext(ModalOpenCloseContext);

  const handleClose = () => {
    setSavedPostViewModal(false);
  };

  return (
    <div>
      <Modal
        open={savedPostViewModal}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        sx={{
          backdropFilter: "blur(15px)",
        }}
      >
        <div>
          <Box sx={style}>
            <SectionColumn className="grid justify-items-center ">
              <div className="savedPostViewSecDIV relative p-5">
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

                  <SectionRow className="mb-2 items-center">
                    {(props.post?.participant1Image && props.post?.participant2Image) ? (
                      <div className="imageWrapper w-[90px] mr-2">
                        <Image
                          src={props.post?.participant1Image || placeholderImage}
                          alt="Picture of the author"
                          width={45}
                          height={45}
                          className="profileViewPostProfileImage baseImage rounded-full ring ring-white"
                        />
                        <Image
                          src={props.post?.participant2Image || placeholderImage}
                          alt="Second image"
                          width={45}
                          height={45}
                          className="profileViewPostProfileImage overlayImage rounded-full ring ring-white"
                        />
                      </div>
                    ) : (
                      <div className="w-[50px] mr-2">
                        <Image
                          src={props.post?.createdByImage || placeholderImage}
                          alt="Picture of the author"
                          width={45}
                          height={45}
                          className="profileViewPostProfileImage rounded-full"
                        />
                      </div>
                    )}
                    <div className="flex-1">
                      <span className="eventSettingsNameText">
                        {props?.post?.createdBy || ""}
                      </span>
                      {props?.post?.feeling?.emotion && (
                        <>
                          <span className="previewEventSubTextTxt04 mr-2 ml-2">{" is feeling"}</span>
                          {String?.fromCodePoint(parseInt(props?.post?.feeling?.emoji, 16))}
                          {/* <Emoji unified={props?.post?.feeling?.emoji} size={25} /> */}
                          <span className="previewEventSubTextTxt04 ml-2 mr-2">
                            {props?.post?.feeling?.emotion || ""}
                          </span>
                        </>
                      )}
                    </div>
                  </SectionRow>

                  <hr />

                  {props?.post?.imagePathList[0] && (
                    <div className="grid justify-items-center mt-3">
                      <Image
                        src={props?.post?.imagePathList[0]}
                        className="rounded-lg"
                        alt="Picture of the author"
                        width={450}
                        height={400}
                      />
                    </div>
                  )}

                  {/* <div className="organizationDetailsOptionText2 mt-5 mb-5">
                    {props?.post?.imageTitle}
                  </div> */}
                  <div className="mt-5">
                    <p className="previewEventSubTextTxt06 mt-2">
                      {props?.post?.description}
                    </p>
                    <div className="mt-2">
                      <p className="previewEventSubTextTxt07">
                        {dateFormatForEvent(
                          props?.post?.createdDate
                        )}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </SectionColumn>
          </Box>
        </div>
      </Modal>
    </div>
  );
};

export default SavedPostViewModal;
