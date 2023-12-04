import RoundedButton from "../../../../../../components/Buttons/RoundedButtons";
import { SectionColumn, SectionRow } from "@/layouts/section";
import React, { useContext, useState, useEffect } from "react";
import { EventCreateStageContext } from "@/contexts/eventContext/eventCreateStageContext";
import { CreateEventContext } from "@/contexts/createEventContext/createEventContext";

export interface CreateOrganizationProps { }

const CreateEventStep03: React.FC<CreateOrganizationProps> = (props) => {
  const [name, setName] = useState("");
  const [submitClicked, setSubmitClicked] = useState(false);

  const { setEventCreateStageCount } = useContext(EventCreateStageContext);
  const { eventDesciption, setEventDesciption } = React.useContext(CreateEventContext);

  useEffect(() => {
    if (eventDesciption) {
      setName(eventDesciption);
    }
  }, [])

  const handleNext = () => {
    setEventDesciption(name);
    setEventCreateStageCount(5);
  };

  const handleBack = () => {
    setEventCreateStageCount(3);
  };

  const displayValidationMsg = (submitClicked, length) => {
    if (submitClicked && length === 0) {
      return (
        <div className="validationError">
          <p>Description is required</p>
        </div>
      )
    } else if (submitClicked && length < 100) {
      return (
        <div className="validationError">
          <p>Please write at least 100 characters.</p>
        </div>
      )
    } else {
      return null;
    }
  }

  return (
    <div className="homeRightMainSec2 pb-4">
      <div className="grid justify-items-center ">
        <span className="createOrganizationTxt mt-8">Add Description</span>
        <span className="createOrganizationTxt05 mt-4">
          Provide more information about your event so that guests
          <br />
          know what to expect.
        </span>
        <br />
        <br />
        <SectionColumn>
          <span className="textinputtitle ml-1">Description</span>
          <textarea
            placeholder="Provide more information about your event. Please write at least 100 characters."
            name="organizationName"
            maxLength={500}
            className={
              submitClicked &&
                (name.length === 0 || name.length < 100 || name.length > 250)
                ? "inputBaseInput aboutOrganizationInput mt-1 validationErrorBorder"
                : "inputBaseInput aboutOrganizationInput mt-1"
            }
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          {displayValidationMsg(submitClicked, name.length)}
        </SectionColumn>
        <br />
        <br />
        <SectionRow className="ml-4 mt-8">
          <RoundedButton
            ref={undefined}
            onClick={(e: any) => {
              handleBack();
            }}
            className="BackBTN mr-3"
          >
            Back
          </RoundedButton>
          <RoundedButton
            ref={undefined}
            onClick={(e: any) => {
              name.length > 99 ? handleNext() : setSubmitClicked(true);
            }}
            className="NextBTN "
          >
            Next
          </RoundedButton>
        </SectionRow>
      </div>
    </div>
  );
};

export default CreateEventStep03;
