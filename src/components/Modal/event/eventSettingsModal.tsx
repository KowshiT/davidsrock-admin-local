import React, { useState, useEffect } from "react";
import Modal from "@mui/material/Modal";
import Image from "next/image";
import { ModalOpenCloseContext } from "@/contexts/modalContext/modalOpenCloseContext";
import { SectionColumn, SectionRow } from "@/layouts/section";
import { modalCloseIcon, placeholderImage } from "@/assetsLayer";
import Switch from "@mui/material/Switch";
import { CreateEventContext } from "@/contexts/createEventContext/createEventContext";
import RoundedButton from "../../Buttons/RoundedButtons";
import { useAlerts } from "@/hooks/alertHook";
import { useUser } from "@/contexts/authContext/userProvider";
import { AccountType } from "@/helpers/enumHelpers";
import { currencyList } from "@/helpers/selectionDropDownHelper";

export interface Props { }

const EventSettingsModal: React.FC<Props> = (props) => {
  const { setAlert } = useAlerts();

  const [attendeeCount, setAttendeeCount] = useState("");
  const [fee, setFee] = useState("");
  const [selectedCurrency, setSelectedCurrency] = useState('USD');
  const [attendeeLimitChecked, setAttendeeLimitChecked] = useState(false);
  const [allowGuestsChecked, setAllowGuestsChecked] = useState(false);
  const [eventFeeChecked, setEventFeeChecked] = useState(false);

  const { eventSettingsModal, setEventSettingsModal } = React.useContext(ModalOpenCloseContext);
  const { eventSettings, setEventSettings } = React.useContext(CreateEventContext);
  const { profilePicture, profilePicture2, accountType, userName } = useUser();

  useEffect(() => {
    if (eventSettings?.attendeeLimit) {
      setAttendeeLimitChecked(true);
      setAttendeeCount(eventSettings?.limit);
    }
    if (eventSettings?.allowGuest) {
      setAllowGuestsChecked(true);
    }
    if (eventSettings?.eventFee) {
      setEventFeeChecked(true);
      setFee(eventSettings?.fee);
    }
  }, []);

  const handleClose = () => setEventSettingsModal(false);

  const handleSave = () => {
    if (eventSettings.attendeeLimit && !attendeeCount) {
      setAlert({
        message: "Enter Attendee Limit",
        severity: "error",
      });
    } else if (eventSettings.eventFee && !fee) {
      setAlert({
        message: "Enter Fee",
        severity: "error",
      });
    } else {
      let _countSettings = {
        ...eventSettings,
        limit: eventSettings.attendeeLimit ? attendeeCount : "",
        fee: eventSettings.eventFee ? fee : "",
        selectedCurrency: eventSettings.eventFee ? selectedCurrency : ""
      };
      console.log("_countSettings :>> ", _countSettings);

      setEventSettings(_countSettings);
      setEventSettingsModal(false);
    }
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    switch (event.target.name) {
      case "attendeeLimit":
        setAttendeeLimitChecked(event.target.checked);
        if (event.target.checked === false) {
          setAttendeeCount("");
        }
        break;
      case "eventFee":
        setEventFeeChecked(event.target.checked);
        if (event.target.checked === false) {
          setFee("");
          setSelectedCurrency("USD");
        }
        break;
      case "allowGuest":
        setAllowGuestsChecked(event.target.checked);
        break;
      default:
        break;
    }
    console.log(event.target.name, event.target.checked);
    let _settings = { ...eventSettings, [event.target.name]: event.target.checked };
    console.log("_settings :>> ", _settings);
    setEventSettings(_settings);
  };

  return (
    <div>
      <Modal
        hideBackdrop
        open={eventSettingsModal}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        className="modalBackDrop"
      >
        <div className="modalStructureEventSettings">
          <SectionRow className="relative">
            <span className="modalsHedingText ml-8 mt-4">Event Settings</span>
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
          <div className="line mt-4 mb-3 w-full"></div>
          <div className="flex flex-row my-auto px-8 w-full items-center">
            {accountType == String(AccountType.PARTNERSHIP) ? (
              <div className="profile-image-container-event-settings flex flex-row">
                <div className="profile-image-event-settings ring ring-white baseImage">
                  <Image
                    src={profilePicture || placeholderImage}
                    alt="Picture of the author"
                    width={65}
                    height={65}
                    className="createEventProfileImage rounded-full"
                  />
                </div>
                <div className="profile-image-event-settings ring ring-white overlayImage">
                  <Image
                    src={profilePicture2 || placeholderImage}
                    alt="Second image"
                    width={65} // Adjust width to half of the first image
                    height={65}
                    className="createEventProfileImage rounded-full"
                  />
                </div>
              </div>
            ) : (
              <div className="profile-image-event-settings">
                <Image
                  // loader ={() => LoginPageImage}
                  src={profilePicture || placeholderImage}
                  alt="Picture of the author"
                  width={65}
                  height={65}
                  className="createEventProfileImage rounded-full"
                />
              </div>
            )}
            <SectionColumn className="mt-2 ml-4 flex-1">
              <span className="eventSettingsNameText">{userName}</span>
              <span className="eventSettingsOrgText">Organizer</span>
            </SectionColumn>
          </div>
          <br />
          <span className="eventSettingsNameText ml-8 !mt-4">
            Optional Settings
          </span>
          <div className="relative ml-8 mt-4">
            <SectionRow className="mt-4">
              <span className="eventSettingsItemsText mt-3">
                Attendee Limit
              </span>
              <div className="absolute right-5">
                <Switch
                  checked={attendeeLimitChecked}
                  name="attendeeLimit"
                  className=""
                  onChange={handleChange}
                />
              </div>
            </SectionRow>
            {eventSettings.attendeeLimit && (
              <input
                placeholder="Enter limit"
                type="number"
                name="Limit"
                maxLength={20}
                className="inputBaseInput eventSettingInput mt-3"
                value={attendeeCount}
                onChange={(e) => setAttendeeCount(e.target.value)}
              />
            )}
            <SectionRow className="mt-4">
              <span className="eventSettingsItemsText mt-3">Allow Guests</span>
              <div className="absolute right-5">
                <Switch
                  checked={allowGuestsChecked}
                  name="allowGuest"
                  className=""
                  onChange={handleChange}
                />
              </div>
            </SectionRow>
            <SectionRow className="mt-4">
              <span className="eventSettingsItemsText mt-3">Event Fee</span>
              <div className="absolute right-5">
                <Switch
                  checked={eventFeeChecked}
                  name="eventFee"
                  className=""
                  onChange={handleChange}
                />
              </div>
            </SectionRow>
            {eventSettings.eventFee && (
              <>
                <select value={selectedCurrency} onChange={(e) => setSelectedCurrency(e.target.value)} name="orderCurrency" className="currencyDropDown" id="orderCurrency">
                  {currencyList?.map((currency) =>
                    <option key={currency.value} value={currency.value}>{currency.label}</option>
                  )}
                </select>
                <input
                  placeholder="Enter event fee"
                  type="number"
                  name="Fee"
                  maxLength={20}
                  className="inputBaseInput eventSettingInput mt-3"
                  value={fee}
                  onChange={(e) => setFee(e.target.value)}
                />
              </>
            )}
            <br />
            <SectionRow className="mt-4 mb-8  w-full justify-center">
              <RoundedButton
                ref={undefined}
                onClick={(e: any) => {
                  handleSave();
                }}
                className="NextBTN mr-8"
              >
                Save
              </RoundedButton>
            </SectionRow>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default EventSettingsModal;
