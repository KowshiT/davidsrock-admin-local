import React, { useState, useContext } from "react";
import { SectionColumn, SectionRow } from "../../../../layouts/section";
import { Form, Formik, FormikProps, FormikHelpers } from "formik";
import { ForgetPasswordValues } from "../../../../types/types";
import { ForgetPasswordValuesInit } from "../../../../actionLayer/_index";
import { useAlerts } from "../../../../hooks/alertHook";
import RoundedButton from "../../../Buttons/RoundedButtons";
import Loader from "../../../Modal/LoadingModal";
import { DR_Logo_02, closeButtonNew } from "../../../../assetsLayer";
import Image from "next/image";
import { AuthCardControlContext } from "@/contexts/authContext/authCardControlContext";
import { forgotPasswordActionHandler } from "@/actionLayer/auth/loginActions";
import { ModalOpenCloseContext } from "@/contexts/modalContext/modalOpenCloseContext";
import { SignUpStageContext } from "@/contexts/authContext/SignUpStageContext";
import TextField2 from "../../../../components/Inputs/TextField2";
import { emailSubmitValidation } from "@/helpers/validation/formikValidation";
import ResetPasswordFormCard from "./EmailSubmitFormCard";

export interface ForgetPasswordFormCardProps { }

const ForgetPasswordFormCard: React.FC<ForgetPasswordFormCardProps> = (props) => {

  const { setauthCard } = useContext(AuthCardControlContext);
  const { setAuthModal } = useContext(ModalOpenCloseContext);
  const { setSignUpStageCount, setSignUpType } = useContext(SignUpStageContext);
  const { setAlert } = useAlerts();
  const [resetPasswordClicked, setResetPasswordClicked] = useState(false);
  const [email, setEmail] = useState("");
  const [loaderOpen, setLoaderOpen] = useState(false);
  const [loaderText, setLoaderText] = useState("");

  const handleEmailSubmit = (values: ForgetPasswordValues, actions: FormikHelpers<ForgetPasswordValues>) => {
    setEmail(values.email);
    setLoaderText("Please Wait...");
    setLoaderOpen(true);

    forgotPasswordActionHandler(values)
      .then((res: any) => {
        setLoaderOpen(false);
        if (res.responseCode === "00") {
          setAlert({
            message: "A temporary password has been sent to your email!",
            severity: "success",
          });
          setResetPasswordClicked(true);

        } else if (res.responseCode === "02") {
          setAlert({
            message: "Incorrect User!",
            severity: "error",
          });

        } else if (res.responseCode === "96") {
          setAlert({
            message: "System Error! Please contact support!",
            severity: "error",
          });
        } else {
          setAlert({
            message: "Error!",
            severity: "error",
          });
        }
      })
      .catch((error) => {
        setLoaderOpen(false);
        console.log(error)
      });

  }

  const handleClose = () => {
    setAuthModal(false);
    setSignUpStageCount(1);
    setSignUpType("");
  }

  return (
    <React.Fragment>
      <div className={(resetPasswordClicked) ? (`resetpasswordmainDIV pt-4 relative`) : (`forgotpasswordmainDIV pt-4 relative`)}>
        <button onClick={(e: any) => handleClose()} className="modalcloseBTN opacity-100 duration-500 hover:scale-110 hover:rotate-90 hover:opacity-100">
          <Image
            src={closeButtonNew}
            alt='Picture of the author'
            width={30}
            height={30}
          />
        </button>
        <SectionColumn className="grid col-1 justify-items-center mb-5">
          <div className="grid justify-items-center">
            <Image
              src={DR_Logo_02}
              alt='Picture of the author'
              width={90}
              height={90}
            />
            {!resetPasswordClicked ?
              <span className="loginMainText mt-4">
                Forgot your password?
              </span>
              :
              <span className="loginMainText mt-4">
                Reset password
              </span>
            }

            {!resetPasswordClicked ?
              <div className="mt-4">
                <Formik
                  initialValues={ForgetPasswordValuesInit}
                  onSubmit={handleEmailSubmit}
                  validationSchema={emailSubmitValidation}
                >
                  {(formik: FormikProps<ForgetPasswordValues>) => (
                    <Form>
                      <SectionColumn className=" mb-3">
                        <span className="textinputtitle ">Email Address</span>
                        <TextField2
                          type='text'
                          name='email'
                          className='logincardInputsField'
                          placeholder='Email Address'
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                          value={formik.values.email}
                        />
                      </SectionColumn>
                      <div className='grid justify-items-center mt-5'>
                        <SectionRow>
                          <RoundedButton
                            ref={undefined}
                            onClick={undefined}
                            className='loginMainBTN'
                            type='submit'
                            disabled={formik.isSubmitting}
                          >
                            Reset Password
                          </RoundedButton>
                        </SectionRow>
                      </div>
                    </Form>
                  )}
                </Formik>
              </div>
              :
              <ResetPasswordFormCard email={email} />
            }

            <button className="signUpText mt-6 duration-500 hover:scale-105 !mb-4" onClick={(e: any) => setauthCard("LOGIN_CARD")}>
              Login to your Account.
            </button>

          </div>
        </SectionColumn>
      </div>
      <Loader loaderText={loaderText} open={loaderOpen} />

    </React.Fragment>
  );
};

export default ForgetPasswordFormCard;
