import RoundedButton from "../../../../../Buttons/RoundedButtons";
import { SectionColumn, SectionRow } from "@/layouts/section";
import React, { useContext, useState, useEffect } from "react";
import { PublicProfileCreateStageContext } from "@/contexts/publicProfileContext/createPublicProfileStageContext";
import { CreatePublicProfileContext } from "@/contexts/publicProfileContext/createPublicProfileContext";

export interface CreatePublicProfileProps { }

const CreatePublicProfileStep01: React.FC<CreatePublicProfileProps> = (props) => {
  const [name, setName] = useState("");
  const [submitClicked, setSubmitClicked] = useState(false);
  const { setPublicProfileCreateStageCount } = useContext(PublicProfileCreateStageContext);
  const { publicProfileName, setPublicProfileName } = useContext(CreatePublicProfileContext);

  useEffect(() => {
    if (publicProfileName) {
      setName(publicProfileName);
    }
  }, [])

  const handleNext = () => {
    console.log("name :>> ", name);
    setPublicProfileCreateStageCount(2);
    setPublicProfileName(name);
  };

  return (
    <React.Fragment>
      <div className="homeRightMainSec2 pb-4">
        <div className="grid justify-items-center ">
          <span className="createOrganizationTxt mt-8">
            Let's get started with a few details
            <br />
            about your Public Profile.
          </span>
          <br />
          <br />
          <SectionColumn className=" mb-3 mt-8">
            <span className="textinputtitle ">Public Profile Name</span>
            <input
              placeholder="Public Profile Name"
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
                <p>Public Profile Name is required</p>
              </div>
            ) : null}
          </SectionColumn>

          <span className="createOrganizationTxt04 mt-8">
            Use the name of your business, brand or Public Profile, or a name that
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

export default CreatePublicProfileStep01;
