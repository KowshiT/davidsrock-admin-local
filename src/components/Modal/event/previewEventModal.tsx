import React, { useContext, useState } from "react";
import Modal from "@mui/material/Modal";
import Image from "next/image";
import { useRouter } from "next/router";
import { ModalOpenCloseContext } from "@/contexts/modalContext/modalOpenCloseContext";
import Section, { SectionColumn, SectionRow } from "@/layouts/section";
import {
  blackPlusIcon,
  calenderImage,
  cameraGrayImage,
  erthImage,
  modalCloseIcon,
  timeImage,
  userImage,
} from "@/assetsLayer";
import RoundedButton from "../../../components/Buttons/RoundedButtons";
import { CreateEventContext } from "@/contexts/createEventContext/createEventContext";
import { EventCreateStageContext } from "@/contexts/eventContext/eventCreateStageContext";
import { createEventActionHandler } from "@/actionLayer/event/eventActions";
import { useAlerts } from "@/hooks/alertHook";
import {
  getProfileId,
  getUserAccountType,
  setActiveTabToLocalStorage,
} from "@/helpers/authHelper";
import Loader from "../LoadingModal";
import {
  convertTo12HourFormat,
  dateFormatForEvent,
  getDateFromString,
} from "@/helpers/dateHelpers";
import { ImageUploadDetailsContext } from "@/contexts/imageUploadContext/imageUploadContext";
import LocationOnIcon from '@mui/icons-material/LocationOn';
import GroupsIcon from '@mui/icons-material/Groups';
import { FaMoneyBillWave } from "react-icons/fa";
import { selectionDropDownGetLable } from "@/helpers/selectionDropDownHelper";

export interface Props { }

const PreviewEventModal: React.FC<Props> = (props) => {
  const router = useRouter();
  const { setAlert } = useAlerts();
  const [loaderOpen, setLoaderOpen] = useState(false);
  const [loaderText, setLoaderText] = useState("");

  const { previewEventModal, setPreviewEventModal } = React.useContext(ModalOpenCloseContext);
  const {
    eventType,
    setEventType,
    eventName,
    setEventName,
    eventDateTime,
    setEventStep1Details,
    eventLocation,
    setEventLocation,
    eventLink,
    setEventLink,
    eventDesciption,
    setEventDesciption,
    eventSettings,
    setEventSettings,
    eventCoverImage,
    setEventCoverImage,
  } = React.useContext(CreateEventContext);
  const { setEventCreateStageCount } = useContext(EventCreateStageContext);
  const { setUploadImageFileId, setUploadImageFileName } = React.useContext(ImageUploadDetailsContext);

  const handleClose = () => {
    router.push("/dashboard");
    setActiveTabToLocalStorage("Dashboard");
    setPreviewEventModal(false);
    setEventCreateStageCount(1);
    setEventName("");
    setEventType("");
    setEventStep1Details({});
    setEventLocation("");
    setEventLink("");
    setEventDesciption("");
    setEventSettings("");
    setEventCoverImage("");
  };

  const handlePublish = () => {
    setLoaderText("Please Wait...");
    setLoaderOpen(true);

    let values = {
      eventName: eventName,
      eventType: eventType,
      startDate: eventDateTime.eventStartDate,
      endDate: eventDateTime.eventEndDate,
      location: eventLocation,
      link: eventLink.link,
      description: eventDesciption,
      coverPhoto: eventCoverImage,
      isRepeat: false,
      isQuestion: false,
      isAttendeeLimit: eventSettings.attendeeLimit,
      attendeeLimit: eventSettings.limit,
      isAllowGuest: eventSettings.allowGuest,
      isEventFee: eventSettings.eventFee,
      eventFee: eventSettings.fee,
      currency: eventSettings.selectedCurrency,
      profileOrPartnershipId: getProfileId(),
      profileType: getUserAccountType(),
      timeZone: selectionDropDownGetLable(eventDateTime.eventTimeZone),
    };

    console.log("values :>> ", values);

    createEventActionHandler(values)
      .then((res: any) => {
        if (res?.responseCode === "00") {
          setLoaderOpen(false);
          handleClose();
          setEventCreateStageCount(5);
          setEventName("");
          setEventType("");
          setEventStep1Details({});
          setEventLocation("");
          setEventLink("");
          setEventDesciption("");
          setEventSettings("");
          setEventCoverImage("");
          setUploadImageFileId("");
          setUploadImageFileName("");
          setAlert({
            message: "Event Created!",
            severity: "success",
          });
        } else {
          setLoaderOpen(false);
          setAlert({
            message: "Error!",
            severity: "error",
          });
        }
        return res;
      })
      .catch((error) => {
        setLoaderOpen(false);
        setAlert({
          message: error,
          severity: "error",
        });
        return error;
      });
  };

  return (
    <div>
      <Modal
        hideBackdrop
        open={previewEventModal}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        className="modalBackDrop"
      >
        <div className="modalStructureEventPreview">
          <div className="photoViewSubDIV py-4">
            <SectionRow className="relative">
              <span className="modalsHedingText ml-8 mt-4">Event Preview</span>
              <button
                className="absolute right-5 mt-5 duration-500 hover:rotate-90 hover:opacity-100"
                onClick={(e: any) => handleClose()}
              >
                <Image
                  src={modalCloseIcon}
                  alt="Picture of the author"
                  width={22}
                  height={22}
                />
              </button>
            </SectionRow>
            <div className="line mt-4 mb-6 w-full"></div>
            <div className="eventPreviewContentDiv">
              <div className="flex  w-full flex-col items-center">
                <div className="">
                  <Image
                    src={eventCoverImage || "https://i.ibb.co/HrJ3kHy/brooke-lark-j-UPOXXRNdc-A-unsplash.jpg"}
                    alt="Picture of the author"
                    width={2250}
                    height={1390}
                    className="previewImageEvent"
                  />
                  <div className="previewEventImageDownDiv relative flex items-center justify-start">
                    <SectionRow>
                      <div className="!relative ml-2 mr-2">
                        <Image
                          src={calenderImage}
                          alt="Picture of the author"
                          width={50}
                          height={50}
                        />
                        <div className="eventPreviewMainText absolute right-5 top-0 ml-2 mt-5">
                          {getDateFromString(eventDateTime?.eventStartDate)}
                        </div>
                      </div>
                      <SectionColumn className="mt-1">
                        <span className="eventPreviewMainText">
                          {eventName}
                        </span>
                        <span className="eventPreviewCardTime">
                          {`${dateFormatForEvent(
                            eventDateTime?.eventStartDate
                          )} AT ${convertTo12HourFormat(
                            eventDateTime.eventStartDate?.slice(11, 16)
                          )}`}
                        </span>
                      </SectionColumn>
                    </SectionRow>
                  </div>
                </div>
              </div>
              <br />
              {/* <SectionRow className="flex items-center justify-center ">
                <RoundedButton
                  ref={undefined}
                  onClick={undefined}
                  className="eventPreviewGOBTN  flex items-center justify-center"
                >
                  <SectionRow className="">
                    <Image
                      src={goingImage}
                      alt="Picture of the author"
                      width={25}
                      height={25}
                    />
                    <span className="InterestedTEXT ml-2 ">Going</span>
                  </SectionRow>
                </RoundedButton>
                <RoundedButton
                  ref={undefined}
                  onClick={undefined}
                  className="eventPreviewInviteOBTN ml-3 flex items-center justify-center"
                >
                  <SectionRow className="">
                    <Image
                      src={inviteImage}
                      alt="Picture of the author"
                      width={25}
                      height={25}
                    />
                    <span className="InterestedTEXT ml-2 ">Invite</span>
                  </SectionRow>
                </RoundedButton>
                {eventType === "ONLINE" && (
                  <RoundedButton
                    ref={undefined}
                    onClick={() => {
                      window.open(eventLink.link, "_blank");
                    }}
                    className="eventPreviewJUBTN ml-2 flex items-center justify-center"
                  >
                    <SectionRow className="">
                      <Image
                        src={cameraIcon}
                        alt="Picture of the author"
                        width={25}
                        height={25}
                      />
                      <span className="InterestedTEXT ml-2 ">JOIN ROOM</span>
                    </SectionRow>
                  </RoundedButton>
                )}
              </SectionRow>
              <br /> */}
              <br />
              <Section>
                <SectionRow className="w-6/12 !pl-8">
                  <SectionColumn>
                    <span className="eventPreviewMainText2">Event Details</span>
                    <br />
                    <SectionRow>
                      <Image
                        src={userImage}
                        alt="Picture of the author"
                        width={25}
                        height={25}
                      />
                      <span className="createOrganizationTxt05 mt-1 ml-3">
                        00 Person going.
                        {/* 34 Person going, including you */}
                      </span>
                    </SectionRow>
                    <SectionRow className="mt-2">
                      {eventType === "ONLINE" ?
                        <Image
                          src={cameraGrayImage}
                          alt="Picture of the author"
                          width={25}
                          height={25}
                        /> :
                        <LocationOnIcon style={{ width: '25px', height: '25px', color: '#B3B8C7' }} />
                      }
                      <span className="createOrganizationTxt05 mt-1 ml-3">
                        {eventType === "ONLINE"
                          ? `Online Messenger Room`
                          : `At ${eventLocation}`}
                      </span>
                    </SectionRow>
                    <SectionRow className="mt-2">
                      <Image
                        src={timeImage}
                        alt="Picture of the author"
                        width={25}
                        height={25}
                      />
                      <span className="createOrganizationTxt05 mt-1 ml-3">
                        {/* SUN, 17 JAN AT 17:00 UTC +05:30 */}
                        {dateFormatForEvent(
                          eventDateTime?.eventStartDate?.split("T")[0]
                        )}
                        {" AT "}
                        {convertTo12HourFormat(
                          eventDateTime.eventStartDate?.slice(11, 16)
                        )}
                      </span>
                    </SectionRow>
                    <SectionRow className="mt-2">
                      <Image
                        src={erthImage}
                        alt="Picture of the author"
                        width={25}
                        height={25}
                      />
                      <span className="createOrganizationTxt05 mt-1 ml-3">
                        Public, Peoples who are invited
                      </span>
                    </SectionRow>
                    {eventSettings?.attendeeLimit && (
                      <SectionRow className="mt-2">
                        <GroupsIcon style={{ width: "24px", height: "25px", color: "#B3B8C7" }} />
                        <span className="createOrganizationTxt05 mt-1 ml-3">
                          Attendance limited to {eventSettings?.limit} participants
                        </span>
                      </SectionRow>
                    )}
                    {eventSettings?.eventFee && (
                      <SectionRow className="mt-2">
                        <FaMoneyBillWave color="#B2B5C7" style={{ width: '20px', height: '20px', marginLeft: '3px', paddingRight: '1px' }} />
                        <span className="createOrganizationTxt05 mt-1 ml-3">
                          Event Fee : {eventSettings?.selectedCurrency} {eventSettings?.fee}
                        </span>
                      </SectionRow>
                    )}
                    <br />
                    <span className="previewEventSubTextTxt02 align-start">
                      {eventDesciption}
                    </span>
                  </SectionColumn>
                </SectionRow>
                <SectionRow className="w-6/12 !pr-8">
                  <SectionColumn className="">
                    {/* <span className="eventPreviewMainText2">Guest List</span>
                  <br />
                  <SectionRow className="  flex justify-between">
                    <SectionColumn className="grid justify-items-center">
                      <span className="eventPreviewMainText">00</span>
                      <span className="previewEventSubTextTxt03">Going</span>
                    </SectionColumn>
                    <SectionColumn className="grid justify-items-center">
                      <span className="eventPreviewMainText">00</span>
                      <span className="previewEventSubTextTxt03">Can't Go</span>
                    </SectionColumn>
                    <SectionColumn className="grid justify-items-center">
                      <span className="eventPreviewMainText">00</span>
                      <span className="previewEventSubTextTxt03">Invited</span>
                    </SectionColumn>
                  </SectionRow> */}
                    <br />
                    <button className="createOrgnzBTN mt-3 mb-8 grid justify-items-center">
                      <SectionRow className="mt-2">
                        <Image
                          // loader ={() => LoginPageImage}
                          src={blackPlusIcon}
                          alt="Picture of the author"
                          width={25}
                          height={25}
                        />
                        <span className="createItemText ml-4">
                          Invite Friends
                        </span>
                      </SectionRow>
                    </button>
                  </SectionColumn>
                </SectionRow>
              </Section>
            </div>
            <div className="line mt-4 mb-4 w-full"></div>
            <div className="mb-4 flex items-center justify-center">
              <RoundedButton
                ref={undefined}
                onClick={(e: any) => {
                  setPreviewEventModal(false);
                }}
                className="loginBTN mr-6"
              >
                Back
              </RoundedButton>
              <RoundedButton
                ref={undefined}
                onClick={(e: any) => {
                  handlePublish();
                }}
                className="NextBTN ml-6"
              >
                Publish
              </RoundedButton>
            </div>
          </div>
        </div>
      </Modal>
      <Loader loaderText={loaderText} open={loaderOpen} />
    </div>
  );
};

export default PreviewEventModal;
