import { DR_Logo_02, closeButtonNew, facebookIcon, googleIcon } from "@/assetsLayer";
import { AuthCardControlContext } from "@/contexts/authContext/authCardControlContext";
import { SectionColumn, SectionRow } from "@/layouts/section";
import { Form, Formik, FormikHelpers, FormikProps } from "formik";
import Image from "next/image";
import React, { useContext, useState } from "react";
import RoundedButton from "../../../../components/Buttons/RoundedButtons";
import { registrationValuesInit } from "@/actionLayer/_index";
import { registrationValidation } from "@/helpers/validation/formikValidation";
import { RegistrationValues } from "@/types/types";
import { registrationActionHandler } from "@/actionLayer/auth/registrationActions";
import { useAlerts } from "../../../../hooks/alertHook";
import Loader from "../../../Modal/LoadingModal";
import { SignUpStageContext } from "@/contexts/authContext/SignUpStageContext";
import TextField2 from "../../../../components/Inputs/TextField2";
import { ModalOpenCloseContext } from "@/contexts/modalContext/modalOpenCloseContext";
import Checkbox from "@mui/material/Checkbox";
import PhoneNumberInputField from "../../../../components/Inputs/PhoneNumberInput";
import LightToolTipCustom from "../../../../components/Tooltips/lightToolTip";

export interface SignUpFormCardProps { }

const SignUpFormCard: React.FC<SignUpFormCardProps> = (props) => {
  const { setAlert } = useAlerts();

  const { setauthCard } = useContext(AuthCardControlContext);

  const [loaderOpen, setLoaderOpen] = useState(false);
  const [loaderText, setLoaderText] = useState("");
  const [validateAge, setValidateAge] = useState(false);

  const { setAuthModal } = useContext(ModalOpenCloseContext);
  const { setSignUpStageCount, setSignUpType } = useContext(SignUpStageContext);
  const [submitClicked, setSubmitClicked] = useState(false);

  const handleSubmit = (values: RegistrationValues, actions: FormikHelpers<RegistrationValues>) => {
    setSubmitClicked(true);
    console.log("registrationActionHandler--------");
    setLoaderText("Please Wait...");
    setLoaderOpen(true);
    values.email = values.userName;

    console.log('values :>> ', values);

    if (validateAge) {
      registrationActionHandler(values)
        .then((res: any) => {

          if (res.responseCode == "00") {
            setTimeout(() => setLoaderOpen(false), 1000);
            actions.resetForm();
            setSignUpStageCount(3);

          } else if (res.responseCode == "01") {
            setTimeout(() => setLoaderOpen(false), 1000);
            setTimeout(() => setAlert({
              message: "Email address already exists.",
              severity: "error",
            }), 1000);

          } else if (res.responseCode == "02") {
            setTimeout(() => setLoaderOpen(false), 1000);
            setTimeout(() => setAlert({
              message: "Email address is invalid.",
              severity: "error",
            }), 1000);

          } else if (res.responseCode == "03") {
            setTimeout(() => setLoaderOpen(false), 1000);
            setTimeout(() => setAlert({
              message: "Mobile number already exists.",
              severity: "error",
            }), 1000);

          } else {
            setTimeout(() => setLoaderOpen(false), 1000);
            setTimeout(() => setAlert({
              message: res.responseMessage ? res.responseMessage : "Error",
              severity: "error",
            }), 1000);
          }
        })
        .catch((error) => {
          setLoaderOpen(false);
          console.log(error);
        });
    } else {
      setLoaderOpen(false);
    }

  }

  const handleClose = () => {
    setAuthModal(false);
    setSignUpStageCount(1);
    setSignUpType("");
  }

  return (
    <React.Fragment>
      <div className='signUpmainDIV pt-4 relative'>
        <button onClick={(e: any) => handleClose()} className="modalcloseBTN opacity-100 duration-500 hover:scale-110 hover:rotate-90 hover:opacity-100">
          <Image
            src={closeButtonNew}
            alt='Picture of the author'
            width={30}
            height={30}
          />
        </button>
        <div className=" grid justify-items-center scrollbar01">
          <Image
            src={DR_Logo_02}
            alt='Picture of the author'
            width={90}
            height={90}
          />
          <span className="loginMainText mt-4">
            Sign Up to Davids Rock
          </span>

          <Formik
            initialValues={registrationValuesInit}
            onSubmit={handleSubmit}
            validationSchema={registrationValidation}>
            {(formik: FormikProps<RegistrationValues>) => (
              <Form>
                <div className='grid justify-items-start mt-6'>
                  <SectionColumn className=" mb-3">
                    <span className="textinputtitle ">Name</span>
                    <TextField2
                      type='text'
                      name='fullName'
                      className='logincardInputsField'
                      placeholder='Name'
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values.fullName}
                      maxLength={50}
                    />
                  </SectionColumn>
                  <SectionColumn className=" mb-3">
                    <span className="textinputtitle ">Email Address</span>
                    <TextField2
                      type='text'
                      name='userName'
                      className='logincardInputsField'
                      placeholder='Email Address'
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values.userName}
                      maxLength={150}
                    />
                  </SectionColumn>
                  <SectionColumn className=" mb-3">
                    <span className="textinputtitle ">Contact Number</span>
                    <PhoneNumberInputField
                      className="logincardPhoneNumberInputsField"
                      name="contactNo"
                      value={formik.values.contactNo}
                      placeholder="Contact Number"
                      defaultCountry="US"
                      height="40px"
                      maxLength={22}
                      onChange={formik.handleChange}
                      onCountryCodeChange={value => {
                        console.log('setCountryCode value :>> ', value);
                      }}
                    />
                  </SectionColumn>
                  {/* <SectionColumn className=" mb-3">
                    <span className="textinputtitle ">Contact Number</span>
                    <TextField2
                      type='text'
                      name='contactNo'
                      className='logincardInputsField'
                      placeholder='Contact Number'
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values.contactNo}
                    />
                  </SectionColumn> */}
                  <SectionColumn className=" mb-3">
                    <span className="textinputtitle ">Password</span>
                    <LightToolTipCustom title={'Password must contain at least 8 characters, 1 number, 1 uppercase letter, 1 lowercase letter and 1 special character (@, $, !, &, etc.)'}>
                      <div>
                        <TextField2
                          type='password'
                          name='password'
                          className='logincardInputsField'
                          placeholder='Password'
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                          value={formik.values.password}
                          maxLength={20}
                        />
                      </div>
                    </LightToolTipCustom>
                  </SectionColumn>
                  <SectionColumn className=" mb-3">
                    <span className="textinputtitle ">Confirm  Password</span>
                    <TextField2
                      type='password'
                      name='confirmPassword'
                      className='logincardInputsField'
                      placeholder='Confirm  Password'
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values.password}
                      maxLength={20}
                    />
                  </SectionColumn>

                  <SectionRow>
                    <div>
                      <Checkbox
                        checked={validateAge}
                        onChange={(e) => setValidateAge(e.target.checked)}
                        sx={{
                          color: "#2CD1EF",
                          "&.Mui-checked": {
                            color: "#2CD1EF",
                          },
                          marginLeft: "-10px"
                        }}
                        size="medium"
                      />
                    </div>
                    <div className="mt-2">
                      <span className="textinputtitle">
                        I am 18 years of age or older.
                      </span>
                    </div>
                  </SectionRow>
                  {!validateAge && submitClicked ? (
                    <div className="validationError"><p>You need to be 18 years or older to continue</p></div>
                  ) : null}

                </div>
                <div className='grid justify-items-center mt-5 mr-2'>
                  <SectionRow>
                    <RoundedButton
                      ref={undefined}
                      onClick={undefined}
                      className={validateAge ? 'loginMainBTN' : 'loginMainBTNDisable'}
                      type='submit'
                      disabled={formik.isSubmitting}
                    >
                      Sign Up
                    </RoundedButton>
                  </SectionRow>
                  {/* <SectionRow className=" flex items-center flex-row mt-6 !mb-2">
                    <div className="line4"></div>
                    <span className="signUpText ml-6 mr-6">or</span>
                    <div className="line4"></div>
                  </SectionRow>
                  <span className="signUpWithText">Sign Up with</span>
                  <SectionRow className="mt-4">
                    <RoundedButton
                      ref={undefined}
                      onClick={undefined}
                      type='button'
                      className='googleSignUpBTN duration-500 hover:scale-110'
                    >
                      <div>
                        <Image
                          src={googleIcon}
                          alt='Picture of the author'
                          width={20}
                          height={20}
                        />
                      </div>
                    </RoundedButton>
                    <RoundedButton
                      ref={undefined}
                      onClick={undefined}
                      type='button'
                      className='googleSignUpBTN duration-500 hover:scale-110 ml-6'
                    >
                      <div className="w-5 grid justify-items-center">
                        <Image
                          src={facebookIcon}
                          alt='Picture of the author'
                          width={10}
                          height={10}
                        />
                      </div>
                    </RoundedButton>
                  </SectionRow> */}
                  <button className="signUpText mt-6 duration-500 hover:scale-105" onClick={(e: any) => setauthCard("LOGIN_CARD")}>
                    Already have an account?
                  </button>
                </div>
              </Form>
            )}
          </Formik>
        </div>
      </div>
      <Loader loaderText={loaderText} open={loaderOpen} />

    </React.Fragment>
  );
};

export default SignUpFormCard;
