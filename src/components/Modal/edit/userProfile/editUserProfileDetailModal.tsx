import TextField2 from "../../../Inputs/TextField2";
import { EditUserValidation } from "@/helpers/validation/formikValidation";
import { SectionColumn } from "@/layouts/section";
import { EditRegistrationValues } from "@/types/types";
import { Form, Formik, FormikHelpers, FormikProps } from "formik";
import React, { useEffect, useState } from "react";
import PhoneNumberInputField from "../../../Inputs/PhoneNumberInput";
import RoundedButton from "../../../Buttons/RoundedButtons";
import { UpdateUserDetailActionHandler } from "@/actionLayer/user/userActions";
import Loader from "../../LoadingModal";
import { useAlerts } from "@/hooks/alertHook";
import { interestList } from "@/helpers/selectionDropDownHelper";
import { arrayFormatInterests } from "@/helpers/extractDataHelper";

export interface EditUserProfileDetailModalProps {
  details: any;
}

const EditUserProfileDetailModal: React.FC<EditUserProfileDetailModalProps> = (
  props
) => {
  const initialValues = {
    fullName: props?.details.fullName || "",
    contactNo: props?.details.contactNo || "",
  };

  const [loaderOpen, setLoaderOpen] = useState(false);
  const [selectedInterests, setSelectedInterests] = useState([]);

  const { setAlert } = useAlerts();

  useEffect(() => {
    // Fetch data from the API and convert it into an array
    // For example, using the receivedPayload as you mentioned

    setSelectedInterests(arrayFormatInterests(props.details.interestEntities));
  }, []);

  const handleSubmit = (
    values: EditRegistrationValues,
    actions: FormikHelpers<EditRegistrationValues>
  ) => {
    if (selectedInterests.length <= 0) {
      setAlert({
        message: "Interest is required. Please select one or more..! ",
        severity: "error",
      });
    } else {
      setLoaderOpen(true);

      UpdateUserDetailActionHandler(
        props.details.profileImagePath,
        "",
        values.contactNo,
        selectedInterests
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
    }
  };

  const handleInterestClick = (interestValue) => {
    const index = selectedInterests.indexOf(interestValue);
    if (index !== -1) {
      // Remove the interest from the selected interests
      setSelectedInterests([
        ...selectedInterests.slice(0, index),
        ...selectedInterests.slice(index + 1),
      ]);
    } else {
      // Add the interest to the selected interests
      setSelectedInterests([...selectedInterests, interestValue]);
    }
  };

  return (
    <React.Fragment>
      <Formik
        initialValues={initialValues}
        onSubmit={handleSubmit}
        validationSchema={EditUserValidation}
      >
        {(formik: FormikProps<EditRegistrationValues>) => (
          <Form className="h-full">
            <div className="edit-detail-modal-sub-container">
              <div className="edit-modal-content">
                <SectionColumn className=" mb-3  mt-2">
                  <span className="textinputtitle ">Full Name</span>
                  <TextField2
                    type="text"
                    name="fullName"
                    className="inputBaseInput edit-input"
                    placeholder="Full Name"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.fullName}
                    maxLength={100}
                    disable={true}
                  />
                </SectionColumn>

                <SectionColumn className=" mb-3  mt-2">
                  <span className="textinputtitle ">Contact Number</span>
                  <PhoneNumberInputField
                    className="organizationNameInputWithoutHeight"
                    name="contactNo"
                    value={formik.values.contactNo}
                    placeholder="Contact Number"
                    height="50px"
                    defaultCountry="US"
                    maxLength={22}
                    onChange={formik.handleChange}
                    onCountryCodeChange={(value) => {
                      console.log("setCountryCode value :>> ", value);
                    }}
                  />
                </SectionColumn>

                <SectionColumn className=" mb-3  mt-2">
                  <span className="textinputtitle ">Interests</span>

                  <div className="flex flex-row flex-wrap justify-evenly px-5">
                    {interestList.map((data: any, index: any) => (
                      <div
                        key={index}
                        className={` ${selectedInterests.includes(data.value)
                          ? "interest-category-container-selected"
                          : "interest-category-container"
                          } mt-5 grid items-center justify-center`}
                        onClick={() => handleInterestClick(data.value)}
                        onKeyDown={(e: any) => {
                          if (e.key === 'Enter') {
                            e.preventDefault();
                            handleInterestClick(data.value);
                          }
                        }}
                        role="button"
                        tabIndex={0}
                      >
                        <div className="interest-category-img-container mx-auto">
                          <img src={data.icon} alt="Picture" className="" />
                        </div>

                        <p className="orgCatText w-[70px]">{data.label}</p>
                      </div>
                    ))}
                  </div>
                </SectionColumn>
              </div>
            </div>
            <div className="edit-detail-modal-sub-save-wrapper flex w-full justify-center">
              <RoundedButton
                ref={undefined}
                onClick={undefined}
                className="NextBTN "
                type="submit"
              //disabled={formik.isSubmitting}
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

export default EditUserProfileDetailModal;
