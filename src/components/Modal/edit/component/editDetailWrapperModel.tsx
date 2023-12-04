import React from "react";
import Modal from "@mui/material/Modal";

import { ModalOpenCloseContext } from "@/contexts/modalContext/modalOpenCloseContext";
import Image from "next/image";
import { closeButtonNew } from "@/assetsLayer";

export interface EditDetailWrapperModelProps {
  detailContent: any;
}
const EditDetailWrapperModel: React.FC<EditDetailWrapperModelProps> = (
  props
) => {
  const {
    editDetailWrapperModal,

    setEditDetailWrapperModal,
  } = React.useContext(ModalOpenCloseContext);

  const handleCloseMenuBar = () => setEditDetailWrapperModal(false);

  return (
    <Modal
      open={editDetailWrapperModal}
      onClose={handleCloseMenuBar}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
      sx={{
        backdropFilter: "blur(10px)",
      }}
    >
      <div className="edit-modal-container py-3">
        <button
          onClick={(e: any) => handleCloseMenuBar()}
          className="modalcloseBTN opacity-100 duration-500 hover:rotate-90 hover:scale-110 hover:opacity-100"
        >
          <Image
            src={closeButtonNew}
            alt="Picture of the author"
            width={30}
            height={30}
          />
        </button>
        <div className="h-full">{props.detailContent}</div>
      </div>
    </Modal>
  );
};

export default EditDetailWrapperModel;
