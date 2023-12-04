import * as React from "react";
import Modal from "@mui/material/Modal";
import Image from "next/image";
import { useRouter } from "next/router";
import { ModalOpenCloseContext } from "@/contexts/modalContext/modalOpenCloseContext";
import { SectionColumn, SectionRow } from "@/layouts/section";
import { cameraIcon, modalCloseIcon, userImageBlack, warningIcon } from "@/assetsLayer";
import Box from "@mui/material/Box";
import { CreateEventContext } from "@/contexts/createEventContext/createEventContext";
import { setActiveTabToLocalStorage } from "@/helpers/authHelper";
import { ImageUploadDetailsContext } from "@/contexts/imageUploadContext/imageUploadContext";

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  borderRadius: 5,
  p: 2,
};

export interface Props { }

const CreateEventModal: React.FC<Props> = (props) => {

  const router = useRouter();

  const [showWarning, setShowWarning] = React.useState(false);

  const { createEventModal, setCreateEventModal } = React.useContext(ModalOpenCloseContext);
  const { organizationId } = React.useContext(CreateEventContext);
  const {
    eventType,
    setEventType,
    setEventStep1Details,
    setEventLocation,
    setEventLink,
    setEventDesciption,
    setEventSettings,
    setEventCoverImage,
  } = React.useContext(CreateEventContext);
  const { setUploadImageFileId, setUploadImageFileName } = React.useContext(ImageUploadDetailsContext);

  const handleClose = () => {
    setActiveTabToLocalStorage("Dashboard");
    router.push('/dashboard');
    setCreateEventModal(false);
  }

  const clearData = () => {
    // create event data
    setEventType("");
    setEventStep1Details({});
    setEventLocation("");
    setEventLink("");
    setEventDesciption("");
    setEventSettings("");
    setEventCoverImage("");
    setUploadImageFileId("");
    setUploadImageFileName("");
  }

  const handleOnline = () => {
    console.log('eventType :>> ', eventType);
    if (eventType === "PHYSICAL") {
      setShowWarning(true);
    } else {
      setCreateEventModal(false);
      setEventType("ONLINE")
    }
    console.log('organizationId :>> ', organizationId);
  }

  const handlePhysical = () => {
    console.log('eventType :>> ', eventType);
    if (eventType === "ONLINE") {
      setShowWarning(true);
    } else {
      setCreateEventModal(false);
      setEventType("PHYSICAL")
    }
    console.log('organizationId :>> ', organizationId);
  }

  return (
    <div>
      <Modal
        hideBackdrop
        open={createEventModal}
        onClose={handleClose}
        aria-labelledby='modal-modal-title'
        aria-describedby='modal-modal-description'
        className='modalBackDrop'>
        {!showWarning ? (
          <div className='modalStructureEventCreate'>
            <SectionRow className="relative">
              <span className="modalsHedingText ml-8 mt-4">Create Event</span>
              <button className="absolute right-5 mt-5 duration-500 hover:rotate-90 hover:opacity-100" onClick={(e: any) => handleClose()}>
                <Image
                  src={modalCloseIcon}
                  alt='Picture of the author'
                  width={22}
                  height={22}
                />
              </button>
            </SectionRow>
            <div className='line mt-4 mb-6 w-full'></div>
            <div className='w-full  flex items-center flex-col'>
              <SectionRow>
                <button className="grid justify-items-center pt-2 rounded-md w-60 transform transition duration-1000 hover:bg-gray-200 " onClick={(e: any) => handleOnline()}>
                  <Image
                    src={cameraIcon}
                    alt='Picture of the author'
                    width={50}
                    height={50}
                  />
                  <span className="createEventModalMainText ">Online Event</span>
                  <span className="createEventModalsubText mt-2">Video Chat with<br />Messenger Rooms or Add<br />External Link.</span>
                </button>
                <div className='line2 mt-4'></div>
                <button className="grid justify-items-center  pt-2 rounded-md w-60 transform transition duration-1000 hover:bg-gray-200 " onClick={(e: any) => handlePhysical()}>
                  <Image
                    src={userImageBlack}
                    alt='Picture of the author'
                    width={42}
                    height={45}
                  />
                  <span className="createEventModalMainText mt-2">Event in Place</span>
                  <span className="createEventModalsubText mt-2">Get together with<br />people in a specify<br />location.</span>
                </button>
              </SectionRow>
            </div>
          </div>
        ) : (
          <div>
            <Box sx={style}>
              <SectionColumn className="grid justify-items-center ">
                <div className="medium-dialog pt-4 relative">
                  <button
                    onClick={(e: any) => setShowWarning(false)}
                    className="modalcloseBTN mt-5 mr-5 opacity-100 duration-500 hover:scale-110 hover:rotate-90 hover:opacity-100"
                  >
                    <Image
                      src={modalCloseIcon}
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
                      <p className="h3-black-14-text">{`If you select ${eventType === "ONLINE" ? `Physical` : `Online`} Event your previously entered data will be lost. Are you sure you want to continue?`}</p>
                    </div>
                    <div className="flex-grow-1">
                      <button
                        onClick={(e: any) => router.reload()}
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
        )}
      </Modal>
    </div>
  );
};

export default CreateEventModal;
