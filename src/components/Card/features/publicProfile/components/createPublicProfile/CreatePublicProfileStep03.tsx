import RoundedButton from "../../../../../../components/Buttons/RoundedButtons";
import { SectionColumn, SectionRow } from "@/layouts/section";
import React, { useContext, useState } from "react";
import { Form, Formik, FormikHelpers, FormikProps } from "formik";
import TextAreaField from "../../../../../../components/Inputs/TextAreaField";
import { AboutPublicProfileValidation } from "../../../../../../helpers/validation/formikValidation";
import TextField2 from "../../../../../../components/Inputs/TextField2";
import PhoneNumberInputField from "../../../../../../components/Inputs/PhoneNumberInput";
import { AboutPublicProfileValues } from "@/types/types";
import { AboutPublicProfileValuesInit } from "@/actionLayer/_index";
import { CreatePublicProfileContext } from "@/contexts/publicProfileContext/createPublicProfileContext";
import { PublicProfileCreateStageContext } from "@/contexts/publicProfileContext/createPublicProfileStageContext";

export interface CreatePublicProfileProps { }

const CreatePublicProfileStep03: React.FC<CreatePublicProfileProps> = (props) => {
  const [countryCode, setCountryCode] = useState("US");

  const { setPublicProfileCreateStageCount } = useContext(PublicProfileCreateStageContext);
  const { aboutPublicProfile, setAboutPublicProfile } = useContext(CreatePublicProfileContext);

  const handleSubmit = (values: AboutPublicProfileValues, actions: FormikHelpers<AboutPublicProfileValues>) => {
    values.countryCode = countryCode ?? "US";
    setPublicProfileCreateStageCount(4);
    setAboutPublicProfile(values);
  };

  const handleBack = () => {
    setPublicProfileCreateStageCount(2);
  };

  return (
    <div className="homeRightMainSec2 pb-4">
      <div className="grid justify-items-center ">
        <span className="createOrganizationTxt mt-8">
          Let's get started with a few details
          <br />
          about your Public Profile.
        </span>
        <br />
        <br />

        <Formik
          initialValues={Object.keys(aboutPublicProfile).length !== 0 ? aboutPublicProfile : AboutPublicProfileValuesInit}
          onSubmit={handleSubmit}
          validationSchema={AboutPublicProfileValidation}
        >
          {(formik: FormikProps<AboutPublicProfileValues>) => (
            <Form>
              <div className="grid justify-items-center mt-6">
                <SectionColumn className=" mb-3  mt-2">
                  <span className="textinputtitle ">Tagline</span>
                  <TextField2
                    type="text"
                    name="tagLine"
                    className="inputBaseInput organizationNameInput"
                    placeholder="Tagline"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.tagLine}
                    maxLength={100}
                  />
                </SectionColumn>

                <SectionColumn className=" mb-3  mt-2">
                  <span className="textinputtitle">Description</span>
                  <TextAreaField
                    placeholder="Describe your Public Profile. People will see this on your profile. Please write at least 100 characters."
                    className="inputBaseInput aboutOrganizationInput"
                    name="description"
                    maxLength={1000}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.description}
                  />
                </SectionColumn>

                <SectionColumn className=" mb-3 mt-2">
                  <span className="textinputtitle ">High School</span>
                  <TextField2
                    type="text"
                    name="highSchool"
                    className="inputBaseInput organizationNameInput"
                    placeholder="High School"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.highSchool}
                    maxLength={100}
                  />
                </SectionColumn>

                <SectionColumn className=" mb-3 mt-2">
                  <span className="textinputtitle ">University</span>
                  <TextField2
                    type="text"
                    name="university"
                    className="inputBaseInput organizationNameInput"
                    placeholder="University"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.university}
                    maxLength={100}
                  />
                </SectionColumn>

                <SectionColumn className=" mb-3 mt-2">
                  <span className="textinputtitle ">Work Place</span>
                  <TextField2
                    type="text"
                    name="workPlace"
                    className="inputBaseInput organizationNameInput"
                    placeholder="Work Place"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.workPlace}
                    maxLength={100}
                  />
                </SectionColumn>

                <SectionColumn className=" mb-3">
                  <span className="textinputtitle ">Phone Number</span>
                  <PhoneNumberInputField
                    className="organizationNameInputWithoutHeight"
                    name="mobile"
                    value={formik.values.mobile}
                    placeholder="Contact Number"
                    height="50px"
                    defaultCountry="US"
                    maxLength={22}
                    onChange={formik.handleChange}
                    onCountryCodeChange={value => {
                      setCountryCode(value);
                    }}
                  />
                </SectionColumn>

                <SectionColumn className=" mb-3 mt-2">
                  <span className="textinputtitle ">Location</span>
                  <TextField2
                    type="text"
                    name="location"
                    className="inputBaseInput organizationNameInput"
                    placeholder="Location"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.location}
                    maxLength={100}
                  />
                </SectionColumn>


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
      </div>
    </div>
  );
};

export default CreatePublicProfileStep03;
