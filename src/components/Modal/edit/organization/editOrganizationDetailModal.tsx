import TextField2 from "../../../../components/Inputs/TextField2";
import { SectionColumn } from "@/layouts/section";
import { EditOrganizationValues } from "@/types/types";
import { Form, Formik, FormikHelpers, FormikProps } from "formik";
import React, { useState } from "react";
import { companySize, interestList } from "@/helpers/selectionDropDownHelper";
import PhoneNumberInputField from "../../../../components/Inputs/PhoneNumberInput";
import SelectionDropDown from "../../../../components/Inputs/SelectDropDown";
import DateInputCustomize from "../../../../components/Inputs/DateInputCustomize";
import RoundedButton from "../../../../components/Buttons/RoundedButtons";
import { useAlerts } from "@/hooks/alertHook";
import { UpdateOrganizationDetailActionHandler } from "@/actionLayer/organization/organizationActions";
import { formatDate, capitalizedFormat } from "@/helpers/stringCrop";
import SelectionDropDownWithIcon from "../../../../components/Inputs/selectionDropDownWithIcon";
import Loader from "../../LoadingModal";
import { EditOrgValidation } from "@/helpers/validation/formikValidation";
import TextAreaField from "../../../../components/Inputs/TextAreaField";

export interface EditOrganizationDetailModalProps {
  details: any;
}

const EditOrganizationDetailModal: React.FC<
  EditOrganizationDetailModalProps
> = (props) => {
  const today = new Date();
  const initialValues = {
    name: props?.details.profile.profileName || "",
    tagLine: props?.details.profile.tagLine || "",
    description: props.details.profile.description || "",
    location: props.details.profile.location || "",
    cmpStartDate: props.details.companyStartDate || "",
    countryCode: "",
    cmpSize: {
      label: props?.details.employeeCount,
      value: props?.details.employeeCount,
    },
    mobile: props.details.profile.mobile || "",
    webLink: props?.details.profile.networkEntities[0].link || "",
    organizationCategory: {
      label: capitalizedFormat(props?.details.organizationCategory),
      value: props?.details.organizationCategory,
    },
  };

  const [loaderOpen, setLoaderOpen] = useState(false);
  const [countryCode, setCountryCode] = useState("US");

  const { setAlert } = useAlerts();

  const handleSubmit = (
    values: EditOrganizationValues,
    actions: FormikHelpers<EditOrganizationValues>
  ) => {
    values.countryCode = countryCode ?? "US";

    const organizationRequest = {
      organizationCategory: values.organizationCategory["value"],
      employeeCount: values.cmpSize["value"],
      companyStartDate: formatDate(values.cmpStartDate),
    };

    const otherValues = {
      description: values.description,
      mobile: values.mobile,
      location: values.location,
      tagLine: values.tagLine,
    };

    UpdateOrganizationDetailActionHandler(
      props.details.profile.profileImagePath,
      props.details.profile.coverImagePath,
      values.webLink,
      organizationRequest,
      otherValues
    )
      .then((res: any) => {
        if (res?.responseCode === "00") {
          setLoaderOpen(false);
          setAlert({
            message: "Successfully Updated!",
            severity: "success",
          });
          // Store information to indicate that the action should be performed after reload
          localStorage.setItem("performActionAfterReload", "true");

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
        validationSchema={EditOrgValidation}
      >
        {(formik: FormikProps<EditOrganizationValues>) => (
          <Form className="h-full">
            <div className="edit-detail-modal-sub-container">
              <div className="edit-modal-content">
                <SectionColumn className=" mb-3  mt-2">
                  <span className="textinputtitle ">Full Name</span>
                  <TextField2
                    type="text"
                    name="name"
                    className="inputBaseInput edit-input"
                    placeholder="Full Name"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.name}
                    maxLength={100}
                    disable={true}
                  />
                </SectionColumn>

                <SectionColumn className=" mb-3  mt-2">
                  <span className="textinputtitle ">Tagline</span>
                  <TextField2
                    type="text"
                    name="tagLine"
                    className="inputBaseInput edit-input"
                    placeholder="Tagline"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.name}
                    maxLength={100}
                  />
                </SectionColumn>

                <SectionColumn className=" mb-3  mt-2">
                  <span className="textinputtitle ">Description</span>

                  <TextAreaField
                    placeholder="Describe your Organization. People will see this on your organization profile. Please write at least 100 characters."
                    className="inputBaseInput edit-textArea"
                    name="description"
                    maxLength={500}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.description}
                  />
                </SectionColumn>

                <SectionColumn className=" mb-3  mt-2">
                  <span className="textinputtitle ">Category</span>
                  <SelectionDropDownWithIcon
                    placeholder="Select Category"
                    className="inputBaseInput edit-dropdown"
                    type="text"
                    name="organizationCategory"
                    error={formik.errors.organizationCategory}
                    options={interestList}
                    onBlur={formik.handleBlur}
                    value={formik.values.organizationCategory}
                    menuWidth={440}
                    maxHeight={170}
                    onChange={(value: any) => {
                      formik.setFieldValue("organizationCategory", value);
                    }}
                  />
                </SectionColumn>

                <SectionColumn className=" mb-3  mt-2">
                  <span className="textinputtitle ">Company Size</span>
                  <SelectionDropDown
                    placeholder="Select Company Size"
                    className="inputBaseInput edit-dropdown"
                    type="text"
                    name="cmpSize"
                    error={formik.errors.cmpSize}
                    options={companySize}
                    onBlur={formik.handleBlur}
                    value={formik.values.cmpSize}
                    menuWidth={"auto"}
                    maxHeight={170}
                    onChange={(value: any) => {
                      formik.setFieldValue("cmpSize", value);
                    }}
                  />
                </SectionColumn>

                <SectionColumn className=" mb-3  mt-2">
                  <span className="textinputtitle ">Incorporated Date</span>

                  <DateInputCustomize
                    type="text"
                    name="cmpStartDate"
                    label="Incorporated Date"
                    inputFormat="DD/MM/YYYY"
                    maxDate={today}
                    value={formik.values.name}
                  />
                </SectionColumn>

                <SectionColumn className=" mb-3  mt-2">
                  <span className="textinputtitle ">Location</span>
                  <TextField2
                    type="text"
                    name="location"
                    className="inputBaseInput edit-input"
                    placeholder="Location"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.name}
                    maxLength={100}
                  />
                </SectionColumn>

                <SectionColumn className=" mb-3  mt-2">
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

                <SectionColumn className=" mb-3  mt-2">
                  <span className="textinputtitle ">Website</span>
                  <TextField2
                    type="text"
                    name="webLink"
                    className="inputBaseInput edit-input"
                    placeholder="Website Link"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.name}
                    maxLength={100}
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

export default EditOrganizationDetailModal;
