import { closeButtonNew } from "@/assetsLayer";
import { ModalOpenCloseContext } from "@/contexts/modalContext/modalOpenCloseContext";
import SendMessageContent from "../../Card/features/message/components/sendMessageContent";

import { Modal } from "@mui/material";
import Image from "next/image";

import React from "react";
import SuggestModelUserContent from "./component/suggestModelUserContent";

export interface SuggestUserModelProps {}

const SuggestUserModel: React.FC<SuggestUserModelProps> = (props) => {
  return (
    <React.Fragment>
      <div className="suggest-modal-main-Wrapper-container py-3">
        <div className="suggest-modal-inner-scroll">
          <SuggestModelUserContent />
          <SuggestModelUserContent />
          <SuggestModelUserContent />
          <SuggestModelUserContent />
          <SuggestModelUserContent />
          <SuggestModelUserContent />
        </div>
      </div>
    </React.Fragment>
  );
};

export default SuggestUserModel;
