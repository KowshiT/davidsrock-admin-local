import React, { useEffect, useState } from "react";
import Modal from "@mui/material/Modal";
import { ModalOpenCloseContext } from "@/contexts/modalContext/modalOpenCloseContext";
import Image from "next/image";
import { closeButtonNew } from "@/assetsLayer";
import { SectionColumn, SectionRow } from "@/layouts/section";
import { RiEdit2Fill } from "react-icons/ri";
import EventProfileWrapperContent from "./component/eventProfileWrapperContent";
import EditDetailWrapperModel from "../component/editDetailWrapperModel";
import EditEventContentModal from "./component/editEventContentModal";

export interface EditDetailsEventModalProps {
  detailContent: any;
  details: any;
  eventId: any;
}
const EditDetailsEventModal: React.FC<EditDetailsEventModalProps> = (props) => {
  const {
    editDetailsEventModal,
    setEditDetailsEventModal,
    setEditDetailWrapperModal,
  } = React.useContext(ModalOpenCloseContext);

  const handleCloseMenuBar = () => setEditDetailsEventModal(false);
  const [eventPic, setEventPic] = useState(props?.details?.coverPhoto);

  useEffect(() => {
    if (props.details) {
      setEventPic(props?.details?.coverPhoto);
    }
  }, [props.details]);

  return (
    <React.Fragment>
      <Modal
        open={editDetailsEventModal}
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
          <div className="edit-modal-sub-container">
            <div className="edit-modal-content">
              <SectionColumn className="my-6">
                <EventProfileWrapperContent
                  setEventPic={setEventPic}
                  eventPic={eventPic}
                  eventId={props.eventId}
                  profileType={props?.details?.profile?.profileType}
                />
                <hr className="separator-line" />

                <div className="mt-5">
                  <div className="flex justify-between">
                    <div className="">
                      <p className="h3-black-15-text">Details</p>
                    </div>
                    <div
                      className="flex h-fit cursor-pointer flex-row"
                      onClick={(e: any) => setEditDetailWrapperModal(true)}
                      onKeyDown={(e: any) => {
                        if (e.key === 'Enter') {
                          e.preventDefault();
                          setEditDetailWrapperModal(true);
                        }
                      }}
                      role="button"
                      tabIndex={0}
                    >
                      <RiEdit2Fill size={15} className="primary-color" />

                      <span className="h3-dark-gray-13-text-500 bottom-0 ml-1">
                        Edit
                      </span>
                    </div>
                  </div>
                  <div className="edit-profile-detail-wrapper mt-1">
                    {props.detailContent}
                  </div>
                </div>
              </SectionColumn>
            </div>
          </div>
        </div>
      </Modal>
      <EditDetailWrapperModel
        detailContent={<EditEventContentModal details={props.details} />}
      />
    </React.Fragment>
  );
};

export default EditDetailsEventModal;
