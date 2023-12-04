import React, { useEffect, useState } from "react";
import Modal from "@mui/material/Modal";

import { ModalOpenCloseContext } from "@/contexts/modalContext/modalOpenCloseContext";
import { SectionColumn, SectionRow } from "@/layouts/section";
import Image from "next/image";
import { modalCloseIcon, vectorIcon } from "@/assetsLayer";
import SuggestModelUserContent from "./component/suggestModelUserContent";

export interface MessageNotificationModalProps {}
const MessageNotificationModal: React.FC<MessageNotificationModalProps> = (
  props
) => {
  const { messageNotificationModal, setMessageNotificationModal } =
    React.useContext(ModalOpenCloseContext);

  const handleCloseMenuBar = () => setMessageNotificationModal(false);

  return (
    <React.Fragment>
      <Modal
        open={messageNotificationModal}
        onClose={handleCloseMenuBar}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        className="modalShadow"
      >
        <div className="modalStructureViewOrgProfileList p-4">
          <SectionRow className="MenuHeaderContainer w-full items-center justify-between">
            <div className="flex flex-row items-center">
              <div className="mr-2">
                <Image
                  src={vectorIcon}
                  alt="Picture of the author"
                  width={15}
                  height={15}
                />
              </div>
              <span className="h3-black-13-text">See all in Messeneger</span>
            </div>
            <button
              className="right-0 duration-500 hover:rotate-90 hover:opacity-100"
              onClick={(e: any) => handleCloseMenuBar()}
            >
              <Image
                src={modalCloseIcon}
                alt="Picture of the author"
                width={15}
                height={15}
              />
            </button>
          </SectionRow>
          <div className="modalContent">
            <SectionColumn>
              <SuggestModelUserContent />
              <SuggestModelUserContent />
              <SuggestModelUserContent />
              <SuggestModelUserContent />
              <SuggestModelUserContent />
              <SuggestModelUserContent />
            </SectionColumn>
          </div>
        </div>
      </Modal>
    </React.Fragment>
  );
};

export default MessageNotificationModal;
