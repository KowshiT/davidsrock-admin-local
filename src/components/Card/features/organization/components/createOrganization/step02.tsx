import {
  image11,
  image12,
  image13,
  image14,
  image15,
  image16,
} from "@/assetsLayer";
import RoundedButton from "../../../../../../components/Buttons/RoundedButtons";
import Section, { SectionColumn, SectionRow } from "@/layouts/section";
import Image from "next/image";
import React, { useContext, useEffect, useState } from "react";
import { OrganizationCreateStageContext } from "@/contexts/organizationContext/organizationCreateStageContext";
import { CreateOrganizationContext } from "@/contexts/organizationContext/createOrganizationContext";

export interface CreateOrganizationProps { }

const CreateOrganizationStep02: React.FC<CreateOrganizationProps> = (props) => {
  const [name, setName] = useState("");
  const [submitClicked, setSubmitClicked] = useState(false);
  const { setOrganizationCreateStageCount } = useContext(
    OrganizationCreateStageContext
  );
  const { organizationName, setOrganizationName } = useContext(
    CreateOrganizationContext
  );

  useEffect(() => {
    if (organizationName) {
      setName(organizationName);
    }
  }, [])

  const handleNext = () => {
    console.log("name :>> ", name);
    setOrganizationCreateStageCount(2);
    setOrganizationName(name);
  };

  const handleBack = () => {
    setOrganizationCreateStageCount(1);
  };

  return (
    <React.Fragment>
      <div className="homeRightMainSec2 pb-4">
        <div className="grid justify-items-center ">
          <span className="createOrganizationTxt mt-8">
            Let's get started with a few details
            <br />
            about your organization.
          </span>
          <br />
          <br />
          <SectionColumn className=" mb-3 mt-8">
            <span className="textinputtitle ">Organization Name</span>
            <input
              placeholder="Organization Name"
              type="text"
              name="organizationName"
              id="organizationName"
              maxLength={50}
              className={
                submitClicked && name.length === 0
                  ? "inputBaseInput organizationNameInput validationErrorBorder mt-1"
                  : "inputBaseInput organizationNameInput mt-1"
              }
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            {submitClicked && name.length === 0 ? (
              <div className="validationError">
                <p>Organization Name is required</p>
              </div>
            ) : null}
          </SectionColumn>

          <span className="createOrganizationTxt04 mt-8">
            Use the name of your business, brand or organization, or a name that
            <br />
            explains what the Page is about.
          </span>
          <br />
          <br />
          <SectionRow className="ml-4 mt-8">
            {/* <RoundedButton
                    ref={undefined}
                    onClick={(e:any) => {
                        handleBack()
                    }}
                    className='BackBTN mr-3'>
                    Back
                </RoundedButton> */}
            <RoundedButton
              ref={undefined}
              onClick={(e: any) => {
                name.length > 0 ? handleNext() : setSubmitClicked(true);
              }}
              className="NextBTN "
            >
              Next
            </RoundedButton>
          </SectionRow>
        </div>
      </div>
    </React.Fragment>
  );
};

export default CreateOrganizationStep02;
