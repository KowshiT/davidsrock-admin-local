
import { image11, image12, image13, image14, image15, image16, settingsIcon, uploadIcon } from "@/assetsLayer";
import RoundedButton from "../../../../../../components/Buttons/RoundedButtons";
import Section, { SectionRow } from "@/layouts/section";
import Image from "next/image";
import React, { useContext, useState } from "react";
import { ModalOpenCloseContext } from "@/contexts/modalContext/modalOpenCloseContext";
import EventSettingsModal from "../../../../../../components/Modal/event/eventSettingsModal";
import PreviewEventModal from "../../../../../../components/Modal/event/previewEventModal";
import { EventCreateStageContext } from "@/contexts/eventContext/eventCreateStageContext";
import { CreateEventContext } from "@/contexts/createEventContext/createEventContext";
import { useAlerts } from "@/hooks/alertHook";
import { createEventActionHandler } from "@/actionLayer/event/eventActions";
import ImageUploadModal from "../../../../../../components/Modal/imageUpload/ImageUploadModal";
import { ImageUploadDetailsContext } from "@/contexts/imageUploadContext/imageUploadContext";
import { toEllipsis } from "@/helpers/stringCrop";

export interface CreateOrganizationProps { }

const CreateEventStep04: React.FC<CreateOrganizationProps> = (props) => {
  const { setAlert } = useAlerts();

  const [name, setName] = useState("");

  const { eventSettingsModal, setEventSettingsModal } = useContext(ModalOpenCloseContext);
  const { previewEventModal, setPreviewEventModal } = React.useContext(ModalOpenCloseContext);
  const { setEventCreateStageCount } = useContext(EventCreateStageContext);
  const { organizationId, setOrganizationId, eventType, setEventType, eventName, setEventName,
    eventDateTime, setEventDateTime, eventLocation, setEventLocation, eventLink, setEventLink,
    eventDesciption, setEventDesciption, eventSettings, setEventSettings, eventCoverImage, setEventCoverImage, } = React.useContext(CreateEventContext);
  const { imageUploadModal, setImageUploadModal } = React.useContext(ModalOpenCloseContext);
  const { uploadImageFileId, uploadImageFileName } = React.useContext(ImageUploadDetailsContext);

  const handleNext = () => {
    if (uploadImageFileId === "") {
      setAlert({
        message: "Upload Event Cover Image",
        severity: "error",
      });
    } else {
      setEventCoverImage(uploadImageFileId);
      console.log('uploadImageFileId :>> ', uploadImageFileId);
      setPreviewEventModal(true);
    }
  }

  const handleBack = () => {
    setEventCreateStageCount(4)
  }

  return (
    <React.Fragment>
      <div className="homeRightMainSec2 pb-4">
        <div className="grid justify-items-center ">
          <span className="createOrganizationTxt mt-8">
            Event Cover Photo
          </span>
          <span className="createOrganizationTxt05 mt-4">
            Provide event cover photo if you have, to identify to<br />guests.
          </span>
          <br />
          <br />
          <button className="eventSettingsDiv flex items-center justify-center" onClick={(e: any) => setEventSettingsModal(true)}>
            <SectionRow>
              <div>
                <Image
                  src={settingsIcon}
                  alt='Picture of the author'
                  width={25}
                  height={25}
                />
              </div>
              <div className="!mt-1 ml-2">Event Settings</div>
            </SectionRow>
          </button>
          <br />
          <br />
          <div style={{ backgroundImage: `url(${uploadImageFileId})`, backgroundSize: 'cover' }} className="uploadFileDiv flex items-center justify-center">
            <button className="eventUploadCoverImageDiv flex items-center justify-center"
              onClick={(e: any) => setImageUploadModal(true)}>
              <SectionRow>
                <div>
                  <Image
                    src={uploadIcon}
                    alt='Picture of the author'
                    width={25}
                    height={25}
                  />
                </div>
                <div className="!mt-1 ml-2">
                  {uploadImageFileName ? toEllipsis(uploadImageFileName, 15) : "Upload Cover Photo"}
                </div>
              </SectionRow>
            </button>
          </div>
          <br />
          <SectionRow className="ml-4 mt-8">

            <RoundedButton
              ref={undefined}
              onClick={(e: any) => {
                handleBack()
              }}
              className='BackBTN mr-3'>
              Back
            </RoundedButton>
            <RoundedButton
              ref={undefined}
              onClick={(e: any) => {
                handleNext()
              }}
              className='NextBTN '>
              Next
            </RoundedButton>
          </SectionRow>
        </div>
      </div>
      <EventSettingsModal />
      <ImageUploadModal title="Upload Event Cover Photo" />
      <PreviewEventModal />
    </React.Fragment>
  );
};

export default CreateEventStep04;
