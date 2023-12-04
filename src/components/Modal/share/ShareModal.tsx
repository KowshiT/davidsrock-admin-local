import React, { useContext, useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Image from "next/image";
import { ModalOpenCloseContext } from "@/contexts/modalContext/modalOpenCloseContext";
import { SectionColumn, SectionRow } from "@/layouts/section";
import { closeButtonNew } from "@/assetsLayer";
import {
  EmailShareButton, EmailIcon,
  FacebookShareButton, FacebookIcon,
  LinkedinShareButton, LinkedinIcon,
  TwitterShareButton, TwitterIcon,
  WhatsappShareButton, WhatsappIcon
} from "react-share";
import RoundedButton from "../../../components/Buttons/RoundedButtons";
import { toEllipsis } from "@/helpers/stringCrop";
import { useAlerts } from "@/hooks/alertHook";

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  borderRadius: 5,
  p: 2,
};

export interface Props {
  url: string;
  title: string;
}

const ShareModal: React.FC<Props> = (props) => {
  const { setAlert } = useAlerts();

  const { shareModal, setShareModal } = React.useContext(ModalOpenCloseContext);

  const handleOpen = () => setShareModal(true);
  const handleClose = () => setShareModal(false);

  const copyToClipboard = () => {
    const url = props.url;

    navigator.clipboard
      .writeText(url)
      .then(() => {
        setAlert({
          message: "URL copied to clipboard",
          severity: "success",
        });
      })
      .catch((error) => {
        setAlert({
          message: "Failed to copy URL to clipboard: " + error,
          severity: "error",
        });
      });
  };

  return (
    <div>
      <Modal
        open={shareModal}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        sx={{
          backdropFilter: "blur(15px)",
        }}
      >
        <div>
          <Box sx={style}>
            <SectionColumn className='grid justify-items-center '>
              <React.Fragment>
                <div className='shareModalStructure p-5 relative'>
                  <button onClick={(e: any) => handleClose()} className="modalcloseBTN opacity-100 duration-500 hover:scale-110 hover:rotate-90 hover:opacity-100">
                    <Image
                      src={closeButtonNew}
                      alt='Picture of the author'
                      width={30}
                      height={30}
                    />
                  </button>

                  <div className="organizationDetailsOptionText4 grid justify-items-start ml-5 mt-2 mb-8">Share</div>

                  <SectionColumn>
                    <div className="grid justify-items-center ">
                      <SectionRow>
                        <WhatsappShareButton url={props.url} title={props.title} windowWidth={1000} windowHeight={500} className="mr-5">
                          <WhatsappIcon size={64} round />
                          <p className="text-sm font-semibold">Whatsapp</p>
                        </WhatsappShareButton>

                        <FacebookShareButton url={props.url} quote={props.title} windowWidth={1000} windowHeight={500} className="mr-5">
                          <FacebookIcon size={64} round />
                          <p className="text-sm font-semibold">Facebook</p>
                        </FacebookShareButton>

                        <EmailShareButton url={props.url} subject={props.title} windowWidth={1000} windowHeight={500} className="mr-5">
                          <EmailIcon size={64} round />
                          <p className="text-sm font-semibold">Email</p>
                        </EmailShareButton>

                        <TwitterShareButton url={props.url} title={props.title} windowWidth={1000} windowHeight={500} className="mr-5">
                          <TwitterIcon size={64} round />
                          <p className="text-sm font-semibold">Twitter</p>
                        </TwitterShareButton>

                        <LinkedinShareButton url={props.url} title={props.title} windowWidth={1000} windowHeight={500} className="">
                          <LinkedinIcon size={64} round />
                          <p className="text-sm font-semibold">LinkedIn</p>
                        </LinkedinShareButton>
                      </SectionRow>
                    </div>

                    <SectionRow className="flex justify-around items-center w-full mt-5 mb-5 rounded-full border-2 border-gray-300 bg-slate-50">
                      <p className="">{toEllipsis(props.url, 40)}</p>
                      <RoundedButton
                        ref={undefined}
                        onClick={(e: any) => copyToClipboard()}
                        className="copyBTN ml-1 mt-2 mb-2 justify-items-center"
                      >
                        <div className="font-semibold">Copy</div>
                      </RoundedButton>
                    </SectionRow>
                  </SectionColumn>
                </div>

              </React.Fragment>
            </SectionColumn>
          </Box>
        </div>
      </Modal>
    </div>
  );
}

export default ShareModal;
