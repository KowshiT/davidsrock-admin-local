import TextField2 from "../../../Inputs/TextField2";
import { EditPublicProfileValidation } from "@/helpers/validation/formikValidation";
import { SectionColumn } from "@/layouts/section";
import { EditPublicProfileValues } from "@/types/types";
import { Form, Formik, FormikHelpers, FormikProps } from "formik";
import React, { useState } from "react";
import PhoneNumberInputField from "../../../Inputs/PhoneNumberInput";

import RoundedButton from "../../../Buttons/RoundedButtons";
import { RiEdit2Fill } from "react-icons/ri";
import HandleNetworks from "./netwrokListContent";
import { ModalOpenCloseContext } from "@/contexts/modalContext/modalOpenCloseContext";
import AddPublicProfileInterestModal from "../component/addPublicProfileInterestModal";
import {
  createInterestArray,
  extractNetworkDetails,
} from "@/helpers/extractDataHelper";
import { useAlerts } from "@/hooks/alertHook";
import { UpdatePublicProfileDetailActionHandler } from "@/actionLayer/publicProfile/publicProfileActions";
import { interestList } from "@/helpers/selectionDropDownHelper";
import AddPublicProfileNetworkModal from "../component/addPublicProfileNetworkModal";
import TextAreaField from "../../../../components/Inputs/TextAreaField";

export interface EditPublicProfileDetailModalProps {
  details: any;
}

const EditPublicProfileDetailModal: React.FC<
  EditPublicProfileDetailModalProps
> = (props) => {
  const initialValues = {
    name: props?.details.profile.profileName || "",
    tagLine: props?.details.profile.tagLine || "",
    description: props.details.profile.description || "",
    location: props.details.profile.location || "",
    highSchool: props?.details.highSchool || "",
    university: props?.details.university || "",
    mobile: props.details.profile.mobile || "",
    countryCode: "",
    workPlace: props?.details.workPlace || "",
  };

  const [listOfInterest, setListOfInterest] = useState(
    createInterestArray(props?.details.interest)
  );

  const [listOfNetworks, setListOfNetworks] = useState(
    extractNetworkDetails(props?.details.profile?.networkEntities)
  );

  const [loaderOpen, setLoaderOpen] = useState(false);

  const { setAlert } = useAlerts();
  const { setAddPublicProfileInterestModal, setAddPublicProfileNetworkModal } =
    React.useContext(ModalOpenCloseContext);

  const handleSubmit = (
    values: EditPublicProfileValues,
    actions: FormikHelpers<EditPublicProfileValues>
  ) => {
    console.log("values :>> ", values);

    if (listOfInterest.length <= 0) {
      setAlert({
        message: "Interest is required. Please select one or more..! ",
        severity: "error",
      });
    } else if (listOfNetworks.length <= 0) {
      setAlert({
        message: "Network is required. Please select one or more..! ",
        severity: "error",
      });
    } else {
      setLoaderOpen(true);
      const publicProfileRequest = {
        workPlace: values.workPlace,
        university: values.university,
        highSchool: values.highSchool,
        interestList: listOfInterest,
      };

      const otherValues = {
        description: values.description,
        mobile: values.mobile,
        location: values.location,
        tagLine: values.tagLine,
      };

      UpdatePublicProfileDetailActionHandler(
        listOfNetworks,
        publicProfileRequest,
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
              message: "There is something wrong.Please try again!",
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
  return (
    <React.Fragment>
      <Formik
        initialValues={initialValues}
        onSubmit={handleSubmit}
        validationSchema={EditPublicProfileValidation}
      >
        {(formik: FormikProps<EditPublicProfileValues>) => (
          <Form className=" h-full ">
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
                    placeholder="Describe your profile. People will see this on your public profile. Please write at least 100 characters."
                    className="inputBaseInput edit-textArea"
                    name="description"
                    maxLength={500}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.description}
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
                  <span className="textinputtitle ">Work Place</span>
                  <TextField2
                    type="text"
                    name="workPlace"
                    className="inputBaseInput edit-input"
                    placeholder="Work Place"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.name}
                    maxLength={100}
                  />
                </SectionColumn>

                <SectionColumn className=" mb-3  mt-2">
                  <span className="textinputtitle ">Interests</span>
                  <div className="flex flex-row justify-between p-2">
                    <p className="h3-black-15-text-left">
                      {listOfInterest.join(", ")}
                    </p>
                    <div
                      className="ml-3 mt-1 flex h-fit w-fit cursor-pointer flex-row"
                      onClick={(e: any) => setAddPublicProfileInterestModal(true)}
                      onKeyDown={(e: any) => {
                        if (e.key === 'Enter') {
                          e.preventDefault();
                          setAddPublicProfileInterestModal(true);
                        }
                      }}
                      role="button"
                      tabIndex={0}
                    >
                      <RiEdit2Fill size={15} className="primary-color" />

                      <span className="h3-dark-gray-13-text-500 bottom-0 ml-1">
                        Edit
                      </span>
                    </div>
                  </div>
                </SectionColumn>

                <SectionColumn className=" mb-3  mt-2">
                  <span className="textinputtitle ">HighSchool</span>
                  <TextField2
                    type="text"
                    name="highSchool"
                    className="inputBaseInput edit-input"
                    placeholder="High School"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.name}
                    maxLength={100}
                  />
                </SectionColumn>

                <SectionColumn className=" mb-3  mt-2">
                  <span className="textinputtitle ">University</span>
                  <TextField2
                    type="text"
                    name="university"
                    className="inputBaseInput edit-input"
                    placeholder="University"
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
                    }}
                  />
                </SectionColumn>

                <SectionColumn className=" mb-3  mt-2">
                  <span className="textinputtitle ">Networks</span>
                  <div className="flex flex-row justify-between p-2">
                    <div className="edit-detail-description flex flex-row flex-wrap">
                      {/* <p className="dark-gray-14-text-500-left">fdf</p> */}
                      {listOfNetworks?.map((data: any) => (
                        <HandleNetworks detail={data} />
                      ))}
                    </div>
                    <div
                      className="ml-3 mt-3 flex h-fit w-fit cursor-pointer flex-row"
                      onClick={(e: any) => setAddPublicProfileNetworkModal(true)}
                      onKeyDown={(e: any) => {
                        if (e.key === 'Enter') {
                          e.preventDefault();
                          setAddPublicProfileNetworkModal(true);
                        }
                      }}
                      role="button"
                      tabIndex={0}
                    >
                      <RiEdit2Fill size={15} className="primary-color" />

                      <span className="h3-dark-gray-13-text-500 bottom-0 ml-1">
                        Edit
                      </span>
                    </div>
                  </div>
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

      <AddPublicProfileInterestModal
        interestList={listOfInterest}
        setListOfInterest={setListOfInterest}
      />
      <AddPublicProfileNetworkModal
        networkList={listOfNetworks}
        setNetworkList={setListOfNetworks}
      />
    </React.Fragment>
  );
};

export default EditPublicProfileDetailModal;
