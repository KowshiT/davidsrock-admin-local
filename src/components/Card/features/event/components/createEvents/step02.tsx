
import { cameraIcon, linkImage } from "@/assetsLayer";
import { Form, Formik, FormikHelpers, FormikProps } from "formik";
import RoundedButton from "../../../../../../components/Buttons/RoundedButtons";
import { SectionColumn, SectionRow } from "@/layouts/section";
import Image from "next/image";
import React, { useContext, useState, useEffect } from "react";
import { EventCreateStageContext } from "@/contexts/eventContext/eventCreateStageContext";
import { CreateEventContext } from "@/contexts/createEventContext/createEventContext";
import TextField2 from "../../../../../../components/Inputs/TextField2";
import { EventLinkValuesInit } from "@/actionLayer/_index";
import { EventLinkValues } from "@/types/types";
import { EventLinkValidation } from "@/helpers/validation/formikValidation";

export interface CreateOrganizationProps { }

const CreateEventStep02: React.FC<CreateOrganizationProps> = (props) => {
  const { setEventCreateStageCount } = useContext(EventCreateStageContext);
  const { eventType } = React.useContext(CreateEventContext);
  const { eventLink, setEventLink } = React.useContext(CreateEventContext);

  const handleBack = () => {
    if (eventType === "ONLINE") {
      setEventCreateStageCount(1)
    } else {
      setEventCreateStageCount(2)
    }
  }

  const handleSubmit = (values: EventLinkValues, actions: FormikHelpers<EventLinkValues>) => {
    setEventLink(values);
    setEventCreateStageCount(4);
  }

  return (
    <React.Fragment>
      <div className="homeRightMainSec2 pb-4">
        <div className="grid justify-items-center ">
          <span className="createOrganizationTxt mt-8">
            {eventType === "ONLINE" ? "Add Meeting Link" : "Add Location Link"}
          </span>
          <span className="createOrganizationTxt05 mt-4">
            Provide a way for people to join your<br />event {eventType === "ONLINE" ? "online" : "physically"}.
          </span>
          <br />
          <br />
          <br />
          <SectionRow>
            {eventType === "ONLINE" ? (
              <div className="addLocationDivA flex items-center justify-center">
                <SectionRow>
                  <div className="mt-1">
                    <Image
                      src={cameraIcon}
                      alt='Picture of the author'
                      width={45}
                      height={20}
                    />
                  </div>
                  <SectionColumn className="ml-4">
                    <span className="addLocationDivMainTxtA">
                      Messenger Room
                    </span>
                    <span className="addLocationDivSubTxtA">
                      Get together in a video chat. People can<br />join directly from the event page.
                    </span>
                  </SectionColumn>
                </SectionRow>
              </div>
            ) : (
              <div className="addLocationDiv ml-6 flex items-center justify-center">
                <SectionRow>
                  <div className="mt-1">
                    <Image
                      src={linkImage}
                      alt='Picture of the author'
                      width={40}
                      height={10}
                    />
                  </div>
                  <SectionColumn className="ml-4">
                    <span className="addLocationDivMainTxt">
                      External Link
                    </span>
                    <span className="addLocationDivSubTxt">
                      Add a link so people know where to go<br />when your event start.
                    </span>
                  </SectionColumn>
                </SectionRow>
              </div>
            )}
          </SectionRow>
          <br />
          <SectionColumn>
            <Formik
              initialValues={Object.keys(eventLink).length !== 0 ? eventLink : EventLinkValuesInit}
              enableReinitialize
              onSubmit={handleSubmit}
              validationSchema={EventLinkValidation}
            >
              {(formik: FormikProps<EventLinkValues>) => (
                <Form>
                  <div className="grid justify-items-center mt-6">
                    <SectionColumn className="mb-3 mt-2">
                      <span className="textinputtitle ml-1">Link</span>
                      <TextField2
                        type="text"
                        name="link"
                        className="inputBaseInput eventNameInput mt-1"
                        placeholder="Enter Link"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={eventLink || formik.values.link}
                        maxLength={200}
                      />
                    </SectionColumn>
                    <SectionRow className="ml-4 mt-8">
                      <RoundedButton
                        ref={undefined}
                        onClick={(e: any) => {
                          handleBack()
                        }}
                        type="button"
                        className='BackBTN mr-3'>
                        Back
                      </RoundedButton>
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
          </SectionColumn>
          <br />

        </div>
      </div>
    </React.Fragment>
  );
};

export default CreateEventStep02;
