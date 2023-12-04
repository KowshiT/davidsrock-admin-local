import React, { useContext, useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import Image from "next/image";
import { ModalOpenCloseContext } from "@/contexts/modalContext/modalOpenCloseContext";
import { SectionColumn } from "@/layouts/section";
import { Close_Logo } from "@/assetsLayer";
import { SignUpStageContext } from "@/contexts/authContext/SignUpStageContext";

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  borderRadius: 5,
  p: 2,
};

export interface Props {
  contentCard: any;
}

const AuthModal: React.FC<Props> = (props) => {
  const { authModal, setAuthModal } = useContext(ModalOpenCloseContext);
  const { setSignUpStageCount, setSignUpType } = useContext(SignUpStageContext);

  const handleOpen = () => setAuthModal(true);
  const handleClose = () => {
    setAuthModal(false);
    setSignUpStageCount(1);
    setSignUpType("");
  }

  return (
    <div>
      <Modal
        open={authModal}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        sx={{
          backdropFilter: "blur(15px)",
        }}
      >
        <div>
          <Box sx={style}>
            <SectionColumn className='grid justify-items-center '>
              {props.contentCard}
            </SectionColumn>
          </Box>
        </div>
      </Modal>
    </div>
  );
}

export default AuthModal;
