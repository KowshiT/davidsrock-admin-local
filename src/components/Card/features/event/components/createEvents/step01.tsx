import { Form, Formik, FormikHelpers, FormikProps } from "formik";
import { placeholderImage } from "@/assetsLayer";
import RoundedButton from "../../../../../../components/Buttons/RoundedButtons";
import { SectionColumn, SectionRow } from "@/layouts/section";
import Image from "next/image";
import React, { useContext, useState } from "react";
import { ModalOpenCloseContext } from "../../../../../../contexts/modalContext/modalOpenCloseContext";
import { EventCreateStageContext } from "@/contexts/eventContext/eventCreateStageContext";
import { CreateEventContext } from "@/contexts/createEventContext/createEventContext";
import { getDateFromDayjsDate, getTimeFromString } from "@/helpers/dateHelpers";
import { AboutEventValues } from "@/types/types";
import { AboutEventValuesInit } from "@/actionLayer/_index";
import TextField2 from "../../../../../../components/Inputs/TextField2";
import DatePickerField2 from "../../../../../../components/Inputs/DateInput2";
import { AboutEventValidation } from "@/helpers/validation/formikValidation";
import TimeInputField from "../../../../../../components/Inputs/TimeInput";
import {
  getProfileId,
  getUserNameFromLocalStorage
} from "@/helpers/authHelper";
import { useUser } from "@/contexts/authContext/userProvider";
import { AccountType } from "@/helpers/enumHelpers";
import CreateEventModal from "../../../../../../components/Modal/event/createEventModal";
import SelectionDropDown from "../../../../../../components/Inputs/SelectDropDown";
import { timeZoneList } from "@/helpers/selectionDropDownHelper";

export interface CreateOrganizationProps { }

const CreateEventStep01: React.FC<CreateOrganizationProps> = (props) => {
  const { setCreateEventModal } = React.useContext(ModalOpenCloseContext);
  const [userName, setUserName] = useState("");
  const [selectedStartDate, setSelectedStartDate] = useState<any>("");
  const [selectedEndDate, setSelectedEndDate] = useState<any>("");

  const { profilePicture, profilePicture2, accountType } = useUser();
  const { setEventCreateStageCount } = useContext(EventCreateStageContext);
  const {
    setEventName,
    setEventDateTime,
    eventStep1Details,
    setEventStep1Details,
  } = React.useContext(CreateEventContext);
  const { eventType } = React.useContext(CreateEventContext);

  const { setOrganizationId } = React.useContext(CreateEventContext);

  const today = new Date();

  React.useEffect(() => {
    setUserName(getUserNameFromLocalStorage());
    setCreateEventModal(true);
    setOrganizationId(getProfileId());
  }, []);

  const handleSubmit = (
    values: AboutEventValues,
    actions: FormikHelpers<AboutEventValues>
  ) => {
    setEventStep1Details(values);
    let eventDateTimeDetails = {
      eventStartDate: `${getDateFromDayjsDate(values.startDate)}T${getTimeFromString(values.startTime.toString()).slice(11, 19)}`,
      eventEndDate: `${getDateFromDayjsDate(values.endDate)}T${getTimeFromString(values.endTime.toString()).slice(11, 19)}`,
      eventStartTime: getTimeFromString(values.startTime.toString()).slice(11, 19),
      eventEndTime: getTimeFromString(values.endTime.toString()).slice(11, 19),
      eventTimeZone: values.timeZone,
    };
    setEventName(values.eventName);
    setEventDateTime(eventDateTimeDetails);
    console.log("values :>> ", values);
    console.log("eventDateTimeDetails :>> ", eventDateTimeDetails);
    if (eventType === "ONLINE") {
      setEventCreateStageCount(3);
    } else {
      setEventCreateStageCount(2);
    }
  };

  const handleValidate = (values: AboutEventValues) => {
    console.log("values :>> ", values);
    setSelectedStartDate(values.startDate);
    setSelectedEndDate(values.endDate);
  };

  return (
    <React.Fragment>
      <div className="homeRightMainSec2 pb-4">
        <div className="grid justify-items-center ">
          <span className="createOrganizationTxt mt-8">
            Let's get start creating a<br />
            Events.
          </span>
          <br />
          <div className="flex flex-row max-w-[500px] items-center">
            <div className="!ml-1 mt-1">
              {accountType === String(AccountType.PARTNERSHIP) ? (
                <div className="profile-image-container-event flex flex-row">
                  <div className="profile-image-event ring ring-white baseImage">
                    <Image
                      // loader ={() => LoginPageImage}
                      src={profilePicture || placeholderImage}
                      alt="Picture of the author"
                      width={80}
                      height={80}
                      className="profile-image createEventProfileImage rounded-full"
                    />
                  </div>
                  <div className="profile-image-event ring ring-white overlayImage">
                    <Image
                      // loader ={() => LoginPageImage}
                      src={profilePicture2 || placeholderImage}
                      alt="Picture of the author"
                      width={80}
                      height={80}
                      className="profile-image createEventProfileImage rounded-full"
                    />
                  </div>
                </div>
              ) : (
                <div className="profile-image-event">
                  <Image
                    // loader ={() => LoginPageImage}
                    src={profilePicture || placeholderImage}
                    alt="Picture of the author"
                    width={80}
                    height={80}
                    className="createEventProfileImage rounded-full"
                  />
                </div>
              )}
            </div>
            <SectionColumn className="mt-2 ml-4 flex-1">
              <span className="eventSettingsNameText">{userName}</span>
              <span className="eventSettingsOrgText">Host is your profile</span>
            </SectionColumn>
          </div>
          <Formik
            initialValues={
              Object.keys(eventStep1Details).length !== 0
                ? eventStep1Details
                : AboutEventValuesInit
            }
            onSubmit={handleSubmit}
            validationSchema={AboutEventValidation}
            validate={handleValidate}
          >
            {(formik: FormikProps<AboutEventValues>) => (
              <Form>
                <div className="mt-6 grid justify-items-center">
                  <SectionColumn className="mb-3 mt-2">
                    <span className="textinputtitle ml-1">Event Name</span>
                    <TextField2
                      type="text"
                      name="eventName"
                      className="inputBaseInput eventNameInput mt-1"
                      placeholder="Enter Event Name"
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values.eventName}
                      maxLength={100}
                    />
                  </SectionColumn>

                  <SectionRow className="mt-4 ml-4">
                    <div className="mr-3">
                      <SectionColumn className="mb-3 mt-2">
                        <span className="textinputtitle ml-1">Start date</span>
                        <DatePickerField2
                          type="text"
                          name="startDate"
                          label="Start Date"
                          inputFormat="DD/MM/YYYY"
                          title="Start Date"
                          minDate={today}
                          maxDate={selectedEndDate || null}
                        />
                      </SectionColumn>
                    </div>
                    <div className="mr-3">
                      <SectionColumn className="mb-3 mt-2">
                        <span className="textinputtitle ml-1">Start Time</span>
                        <TimeInputField
                          type="text"
                          name="startTime"
                          label="Start Time"
                          title="Start Time"
                        />
                      </SectionColumn>
                    </div>
                    <div className="mr-3">
                      <SectionColumn className="mb-3 mt-2">
                        <span className="textinputtitle ml-1">End date</span>
                        <DatePickerField2
                          type="text"
                          name="endDate"
                          label="End Date"
                          inputFormat="DD/MM/YYYY"
                          title="End Date"
                          minDate={
                            selectedStartDate || today
                          }
                          maxDate={null}
                        />
                      </SectionColumn>
                    </div>
                    <div className="mr-3">
                      <SectionColumn className="mb-3 mt-2">
                        <span className="textinputtitle ml-1">End Time</span>
                        <TimeInputField
                          type="text"
                          name="endTime"
                          label="End Time"
                          title="End Time"
                        />
                      </SectionColumn>
                    </div>
                  </SectionRow>

                  <SectionColumn className=" mb-3  mt-2">
                    <span className="textinputtitle ml-1">Select Time Zone</span>
                    <SelectionDropDown
                      placeholder="Select Time Zone"
                      className="inputBaseInput eventNameInput mt-1"
                      type="text"
                      name="timeZone"
                      error={formik.errors.timeZone}
                      options={timeZoneList}
                      onBlur={formik.handleBlur}
                      value={formik.values.timeZone}
                      menuWidth={600}
                      maxHeight={250}
                      onChange={(value: any) => {
                        formik.setFieldValue("timeZone", value);
                      }}
                    />
                  </SectionColumn>
                  <SectionRow className="ml-4 mt-8">
                    <RoundedButton
                      ref={undefined}
                      onClick={undefined}
                      className="NextBTN"
                      type="submit"
                      disabled={formik.isSubmitting}
                    >
                      Next
                    </RoundedButton>
                  </SectionRow>
                </div>
              </Form>
            )}
          </Formik>
          <br />
          <br />
        </div>
      </div>
      <CreateEventModal />
    </React.Fragment>
  );
};

export default CreateEventStep01;
