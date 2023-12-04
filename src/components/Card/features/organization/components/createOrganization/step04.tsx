import RoundedButton from "../../../../../../components/Buttons/RoundedButtons";
import { SectionColumn, SectionRow } from "@/layouts/section";
import React, { useContext, useState } from "react";
import { OrganizationCreateStageContext } from "@/contexts/organizationContext/organizationCreateStageContext";
import { Form, Formik, FormikHelpers, FormikProps } from "formik";
import {
  AboutOrganizationValuesInit,
} from "@/actionLayer/_index";
import { AboutOrganizationValues } from "@/types/types";
import TextAreaField from "../../../../../../components/Inputs/TextAreaField";
import {
  AboutOrgValidation,
} from "../../../../../../helpers/validation/formikValidation";
import { CreateOrganizationContext } from "@/contexts/organizationContext/createOrganizationContext";
import { getDateFromDayjsDate } from "@/helpers/dateHelpers";
import SelectionDropDown from "../../../../../../components/Inputs/SelectDropDown";
import {
  companySize,
} from "@/helpers/selectionDropDownHelper";
import TextField2 from "../../../../../../components/Inputs/TextField2";
import PhoneNumberInputField from "../../../../../../components/Inputs/PhoneNumberInput";
import DatePickerField from "../../../../../../components/Inputs/DateInput";

export interface CreateOrganizationProps { }

const CreateOrganizationStep04: React.FC<CreateOrganizationProps> = (props) => {
  const [countryCode, setCountryCode] = useState("US");

  const { setOrganizationCreateStageCount } = useContext(
    OrganizationCreateStageContext
  );
  const { aboutOrganization, setAboutOrganization } = useContext(
    CreateOrganizationContext
  );

  const today = new Date();

  const handleSubmit = (
    values: AboutOrganizationValues,
    actions: FormikHelpers<AboutOrganizationValues>
  ) => {
    values.cmpStartDate = getDateFromDayjsDate(values.cmpStartDate);
    values.countryCode = countryCode ?? "US";
    setOrganizationCreateStageCount(4);
    console.log("values :>> ", values);
    setAboutOrganization(values);
  };

  const handleBack = () => {
    setOrganizationCreateStageCount(2);
  };

  return (
    <div className="homeRightMainSec2 pb-4">
      <div className="grid justify-items-center ">
        <span className="createOrganizationTxt mt-8">
          Let's get started with a few details
          <br />
          about your organization.
        </span>
        <br />
        <br />

        <Formik
          initialValues={
            Object.keys(aboutOrganization).length !== 0
              ? aboutOrganization
              : AboutOrganizationValuesInit
          }
          onSubmit={handleSubmit}
          validationSchema={AboutOrgValidation}
        >
          {(formik: FormikProps<AboutOrganizationValues>) => (
            <Form>
              <div className="mt-6 grid justify-items-center">
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
                  <span className="textinputtitle ">Description</span>
                  <TextAreaField
                    placeholder="Describe your Organization. People will see this on your organization profile. Please write at least 100 characters."
                    className="inputBaseInput aboutOrganizationInput"
                    name="description"
                    maxLength={1000}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.description}
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

                <SectionColumn className=" mb-3 mt-2">
                  <span className="textinputtitle ">Incorporated Date</span>
                  <div className="">
                    <DatePickerField
                      type="text"
                      name="cmpStartDate"
                      label="Incorporated Date"
                      inputFormat="DD/MM/YYYY"
                      maxDate={today}
                    // value={startDate}
                    />
                  </div>
                </SectionColumn>

                <SectionColumn className=" mb-3  mt-2">
                  <span className="textinputtitle ">Select Company Size</span>
                  <SelectionDropDown
                    placeholder="Select Company Size"
                    className="inputBaseInput organizationNameInput"
                    type="text"
                    name="cmpSize"
                    error={formik.errors.cmpSize}
                    options={companySize}
                    onBlur={formik.handleBlur}
                    value={formik.values.cmpSize}
                    menuWidth={540}
                    onChange={(value: any) => {
                      formik.setFieldValue("cmpSize", value);
                    }}
                  />
                </SectionColumn>

                <SectionColumn className=" mb-3">
                  <span className="textinputtitle ">Contact Number</span>
                  <PhoneNumberInputField
                    className="organizationNameInputWithoutHeight"
                    name="mobile"
                    value={formik.values.mobile}
                    placeholder="Contact Number"
                    height="50px"
                    defaultCountry="US"
                    maxLength={22}
                    onChange={formik.handleChange}
                    onCountryCodeChange={(value) => {
                      console.log("setCountryCode value :>> ", value);
                      setCountryCode(value);
                    }}
                  />
                </SectionColumn>

                <SectionColumn className=" mb-3 mt-2">
                  <span className="textinputtitle ">Website</span>
                  <TextField2
                    type="text"
                    name="webLink"
                    className="inputBaseInput organizationNameInput"
                    placeholder="Website"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.webLink}
                    maxLength={200}
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

export default CreateOrganizationStep04;
