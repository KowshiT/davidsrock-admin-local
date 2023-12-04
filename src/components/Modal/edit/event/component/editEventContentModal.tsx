import RoundedButton from "../../../../Buttons/RoundedButtons";
import DateInputCustomize from "../../../../Inputs/DateInputCustomize";
import SelectionDropDown from "../../../../Inputs/SelectDropDown";
import TextField2 from "../../../../Inputs/TextField2";
import {
  currencyList,
  eventTypeListWithIcons,
  selectionDropDownGetLable,
  selectionDropDownPutValuesNew,
  timeZoneList,
} from "@/helpers/selectionDropDownHelper";
import { useAlerts } from "@/hooks/alertHook";
import { SectionColumn, SectionRow } from "@/layouts/section";
import { EditEventValues } from "@/types/types";
import { Form, Formik, FormikHelpers, FormikProps } from "formik";
import React, { useState } from "react";
import Loader from "../../../LoadingModal";
import TimeInputPickerField from "../../../../Inputs/TimeInputPicker";
import { Switch } from "@mui/material";
import { capitalizedFormat } from "@/helpers/stringCrop";
import { UpdateEventByIdActionHandler } from "@/actionLayer/event/eventActions";
import { combineDateAndTime } from "@/helpers/dateHelpers";
import {
  EditEventValidation,
} from "@/helpers/validation/formikValidation";
import TextAreaField from "../../../../../components/Inputs/TextAreaField";

export interface EditEventContentModalProps {
  details: any;
}

const EditEventContentModal: React.FC<EditEventContentModalProps> = (props) => {
  const today = new Date();
  const [selectedEndDate, setSelectedEndDate] = useState<any>("");

  const initialValues = {
    eventName: props?.details?.eventName || "",
    link: props?.details?.link || "",

    startDate: props?.details?.startDate || "",
    startTime: props?.details?.startDate || "",
    endDate: props?.details?.endDate || "",
    endTime: props?.details?.endDate || "",
    timeZone: selectionDropDownPutValuesNew(props?.details?.timeZone) || "",

    location: props.details.location || "",
    attendeeLimit: props?.details?.attendeeLimit || 0,
    isAllowGuest: props?.details.isAllowGuest || false,
    isEventFee: props?.details.isEventFee || false,
    eventFee: props?.details.eventFee || "",
    description: props.details.description || "",
    eventType: {
      label: capitalizedFormat(props?.details.eventType),
      value: props?.details.eventType,
    },
    isAttendeeLimit: props?.details?.isAttendeeLimit || false,
    isRepeat: props?.details.isRepeat,
    isQuestion: props?.details.isQuestion,
    currency:
      props?.details.currency == null
        ? {
          label: "USD",
          value: "USD",
        }
        : {
          label: props?.details.currency,
          value: props?.details.currency,
        },
  };

  const [loaderOpen, setLoaderOpen] = useState(false);

  const { setAlert } = useAlerts();

  const handleSubmit = (
    values: EditEventValues,
    actions: FormikHelpers<EditEventValues>
  ) => {
    let location: string;
    let attendeeLimit: any;
    let eventFee: any;

    if (values.eventType.value === "ONLINE") {
      location = "";
    } else {
      location = values.location;
    }
    if (values.isAttendeeLimit === true) {
      attendeeLimit = values.attendeeLimit;
    } else {
      attendeeLimit = 0;
    }
    if (values.isEventFee === true) {
      eventFee = values.eventFee;
    } else {
      eventFee = 0;
    }
    console.log('values :>> ', values);
    const payload = {
      eventId: props?.details?.eventId,
      eventType: values.eventType.value,
      startDate: combineDateAndTime(values?.startDate, values.startTime),
      endDate: combineDateAndTime(values?.endDate, values.endTime),
      location: location,
      link: values.link,
      description: values.description,
      isRepeat: values.isRepeat,
      isQuestion: values.isQuestion,
      isAttendeeLimit: values.isAttendeeLimit,
      isAllowGuest: values.isAllowGuest,
      isEventFee: values.isEventFee,
      eventFee: eventFee,
      currency: values.currency.value,
      attendeeLimit: attendeeLimit,
      timeZone: selectionDropDownGetLable(values.timeZone),
    };
    console.log('payload ===:>> ', payload);

    UpdateEventByIdActionHandler(payload)
      .then((res: any) => {
        if (res?.responseCode === "00") {
          setLoaderOpen(false);
          setAlert({
            message: "Successfully Updated!",
            severity: "success",
          });
          window.location.reload();
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
          message: "Error!",
          severity: "error",
        });
        return error;
      });
  };

  return (
    <React.Fragment>
      <Formik
        initialValues={initialValues}
        onSubmit={handleSubmit}
        validationSchema={EditEventValidation}
      >
        {(formik: FormikProps<EditEventValues>) => (
          <Form className="h-full">
            <div className="edit-detail-modal-sub-container">
              <div className="edit-modal-content">
                <SectionColumn className=" mb-3  mt-2">
                  <span className="textinputtitle ">Event Name</span>
                  <TextField2
                    type="text"
                    name="eventName"
                    className="inputBaseInput edit-input"
                    placeholder="Full Name"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.eventName}
                    maxLength={100}
                    disable={true}
                  />
                </SectionColumn>

                <SectionColumn className=" mb-3  mt-2">
                  <span className="textinputtitle ">Event Type</span>
                  <SelectionDropDown
                    placeholder="Select Company Size"
                    className="inputBaseInput edit-dropdown"
                    type="text"
                    name="eventType"
                    options={eventTypeListWithIcons}
                    onBlur={formik.handleBlur}
                    value={formik.values.eventType}
                    menuWidth={300}
                    maxHeight={170}
                    onChange={(value: any) => {
                      formik.setFieldValue("eventType", value);
                    }}
                  />
                </SectionColumn>

                {formik.values?.eventType.value === "PHYSICAL" && (
                  <SectionColumn className=" mb-3  mt-2">
                    <span className="textinputtitle ">Location</span>
                    <TextField2
                      type="text"
                      name="location"
                      className="inputBaseInput edit-input"
                      placeholder="Location"
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values.location}
                      maxLength={100}
                    />
                  </SectionColumn>
                )}

                <SectionColumn className=" mb-3  mt-2">
                  <span className="textinputtitle ">
                    {" "}
                    {formik.values.eventType === "PHYSICAL"
                      ? "Location Link"
                      : "Link"}
                  </span>
                  <TextField2
                    type="text"
                    name="link"
                    className="inputBaseInput edit-input"
                    placeholder="Link"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.link}
                    maxLength={100}
                  />
                </SectionColumn>

                <SectionColumn className=" mb-3  mt-2">
                  <span className="textinputtitle ">Start Date & Time</span>

                  <div className="flex flex-row">
                    <div className="flex-grow">
                      <DateInputCustomize
                        type="text"
                        name="startDate"
                        label="Start Date"
                        inputFormat="DD/MM/YYYY"
                        title="Start Date"
                        minDate={today}
                        value={formik.values.startDate}
                        maxDate={selectedEndDate || null}
                      />
                    </div>

                    <div className="mt-1 ml-1 w-[150px]">
                      <TimeInputPickerField
                        type="text"
                        name="startTime"
                        label="Start Time"
                        title="Start Time"
                        className="DateInput-small"
                        value={formik.values.startTime}
                      />
                    </div>
                  </div>
                </SectionColumn>

                <SectionColumn className=" mb-3  mt-2">
                  <span className="textinputtitle ">End Date & Time</span>

                  <div className="flex flex-row">
                    <div className="flex-grow">
                      <DateInputCustomize
                        type="text"
                        name="endDate"
                        label="End Date"
                        inputFormat="DD/MM/YYYY"
                        title="End Date"
                        value={formik.values.endDate}
                        minDate={
                          formik.values.startDate
                            ? formik.values.startDate
                            : today
                        }
                        maxDate={null}
                      />
                    </div>
                    <div className="mt-1 ml-1 w-[150px]">
                      <TimeInputPickerField
                        type="date"
                        name="endTime"
                        label="End Time"
                        title="End Time"
                        className="DateInput-small"
                        value={formik.values.endTime}
                      />
                    </div>
                  </div>
                </SectionColumn>

                <SectionColumn className=" mb-3  mt-2">
                  <span className="textinputtitle">Time Zone</span>
                  <SelectionDropDown
                    placeholder="Select Time Zone"
                    className="inputBaseInput edit-input"
                    type="text"
                    name="timeZone"
                    error={formik.errors.timeZone}
                    options={timeZoneList}
                    onBlur={formik.handleBlur}
                    value={formik.values.timeZone}
                    menuWidth={420}
                    maxHeight={250}
                    onChange={(value: any) => {
                      formik.setFieldValue("timeZone", value);
                    }}
                  />
                </SectionColumn>

                <SectionColumn className="mb-2">
                  <SectionRow className="justify-between">
                    <span className="eventSettingsItemsText mt-3">
                      Attendee Limit
                    </span>
                    <div className="">
                      <Switch
                        checked={formik.values.isAttendeeLimit}
                        name="isAttendeeLimit"
                        className=""
                        onChange={() => {
                          formik.setValues({
                            ...formik.values,
                            isAttendeeLimit: !formik.values.isAttendeeLimit,
                          });
                        }}
                      />
                    </div>
                  </SectionRow>

                  {formik.values.isAttendeeLimit && (
                    <div className="">
                      <TextField2
                        type="number"
                        name="attendeeLimit"
                        className="inputBaseInput edit-input"
                        placeholder="Enter Limit"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.attendeeLimit}
                        maxLength={100}
                      />
                    </div>
                  )}
                </SectionColumn>

                <SectionColumn className="mb-3">
                  <SectionRow className="justify-between">
                    <span className="eventSettingsItemsText mt-3">
                      Event Fee
                    </span>
                    <div className="">
                      <Switch
                        checked={formik.values.isEventFee}
                        name="isEventFee"
                        className=""
                        onChange={() => {
                          formik.setValues({
                            ...formik.values,
                            isEventFee: !formik.values.isEventFee,
                          });
                        }}
                      />
                    </div>
                  </SectionRow>

                  {formik.values.isEventFee && (
                    <div className="flex flex-row">
                      <div className="mr-5 w-[100px]">
                        <SelectionDropDown
                          placeholder="Select type"
                          className="inputBaseInput edit-dropdown"
                          type="text"
                          name="currency"
                          options={currencyList}
                          onBlur={formik.handleBlur}
                          value={formik.values.currency}
                          menuWidth={"auto"}
                          maxHeight={"auto"}
                          onChange={(value: any) => {
                            formik.setFieldValue("currency", value);
                          }}
                        />
                      </div>

                      <div className="flex-1 pt-1">
                        <TextField2
                          type="number"
                          name="eventFee"
                          className="inputBaseInput edit-input"
                          placeholder="Enter Amount"
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                          value={formik.values.eventFee}
                          maxLength={100}
                        />
                      </div>
                    </div>
                  )}
                </SectionColumn>

                <SectionRow className="mb-3 justify-between">
                  <span className="eventSettingsItemsText mt-3">
                    Allow Guests
                  </span>
                  <div className="">
                    <Switch
                      checked={formik.values.isAllowGuest}
                      name="isAllowGuest"
                      className=""
                      onChange={() => {
                        formik.setValues({
                          ...formik.values,
                          isAllowGuest: !formik.values.isAllowGuest,
                        });
                      }}
                    />
                  </div>
                </SectionRow>

                <SectionColumn className=" mb-3  mt-2">
                  <span className="textinputtitle ">Description</span>
                  <TextAreaField
                    placeholder="Provide more information about your event. Please write at least 100 characters."
                    className="inputBaseInput edit-textArea"
                    name="description"
                    maxLength={500}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.description}
                  />
                </SectionColumn>
              </div>
            </div>
            <div className="edit-detail-modal-sub-save-wrapper flex w-full justify-center">
              <RoundedButton
                ref={undefined}
                onClick={undefined}
                className="NextBTN m-auto"
                type="submit"
                disabled={formik.isSubmitting}
              >
                Save
              </RoundedButton>
            </div>
          </Form>
        )}
      </Formik>
      <Loader loaderText={""} open={loaderOpen} />
    </React.Fragment>
  );
};

export default EditEventContentModal;
