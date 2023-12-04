import React, { useState, useEffect } from "react";
import { SectionColumn, SectionRow } from "../../../../layouts/section";
import { Form, Formik, FormikProps, FormikHelpers } from "formik";
import { ResetPasswordValues } from "../../../../types/types";
import { ResetPasswordValuesInit } from "../../../../actionLayer/_index";
import { useAlerts } from "../../../../hooks/alertHook";
import { useRouter } from "next/router";
import RoundedButton from "../../../Buttons/RoundedButtons";
import { forgotPasswordActionHandler, resetPasswordActionHandler } from "@/actionLayer/auth/loginActions";
import TextField2 from "../../../../components/Inputs/TextField2";
import { resetPasswordValidation } from "@/helpers/validation/formikValidation";
import Loader from "../../../../components/Modal/LoadingModal";
import LightToolTipCustom from "../../../../components/Tooltips/lightToolTip";

export interface ResetPasswordFormCardProps {
  email: string;
}

const ResetPasswordFormCard: React.FC<ResetPasswordFormCardProps> = (props) => {

  const { setAlert } = useAlerts();
  const router = useRouter();
  const [loaderOpen, setLoaderOpen] = useState(false);
  const [loaderText, setLoaderText] = useState("");
  const [secondsLeft, setSecondsLeft] = useState(60);

  useEffect(() => {
    if (secondsLeft > 0) {
      setTimeout(() => {
        setSecondsLeft(secondsLeft - 1);
      }, 1000);
    }
  }, [secondsLeft])

  const handleResendOTP = () => {
    setLoaderText("Please Wait...");
    setLoaderOpen(true);

    let values = {
      email: props.email
    }

    forgotPasswordActionHandler(values)
      .then((res: any) => {
        setLoaderOpen(false);
        if (res.responseCode === "00") {
          setSecondsLeft(60);
          setAlert({
            message: "A temporary password has been sent to your email!",
            severity: "success",
          });

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

  const handleResetPasswordSubmit = (values: ResetPasswordValues, actions: FormikHelpers<ResetPasswordValues>) => {
    values.username = props.email;
    values.email = props.email;
    setLoaderText("Please Wait...");
    setLoaderOpen(true);

    resetPasswordActionHandler(values)
      .then((res: any) => {
        setLoaderOpen(false);
        if (res.responseCode === "00") {
          setAlert({
            message: "Password reset successful!",
            severity: "success",
          });
          router.reload();

        } else if (res.responseCode === "02") {
          setAlert({
            message: "Incorrect User!",
            severity: "error",
          });
        } else if (res.responseCode === "03") {
          setAlert({
            message: "Your Temp Password does not match!",
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

  return (
    <React.Fragment>
      <div className="mt-4">
        <Formik
          initialValues={ResetPasswordValuesInit}
          onSubmit={handleResetPasswordSubmit}
          validationSchema={resetPasswordValidation}
        >
          {(formik: FormikProps<ResetPasswordValues>) => (
            <Form>
              <SectionColumn className=" mb-3">
                <span className="textinputtitle ">Temp. Password</span>
                <TextField2
                  type='password'
                  name='tempPassword'
                  className='logincardInputsField'
                  placeholder='Temp. Password'
                  maxLength={25}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.tempPassword}
                />
              </SectionColumn>
              <SectionColumn className=" mb-3">
                <span className="textinputtitle ">New Password</span>
                <LightToolTipCustom title={'Password must contain at least 8 characters, 1 number, 1 uppercase letter, 1 lowercase letter and 1 special character (@, $, !, &, etc.)'}>
                  <div>
                    <TextField2
                      type='password'
                      name='newPassword'
                      className='logincardInputsField'
                      placeholder='New Password'
                      maxLength={25}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values.newPassword}
                    />
                  </div>
                </LightToolTipCustom>
              </SectionColumn>
              <SectionColumn className=" mb-3">
                <span className="textinputtitle ">Confirm Password</span>
                <TextField2
                  type='password'
                  name='confirmPassword'
                  className='logincardInputsField'
                  placeholder='Confirm Password'
                  maxLength={25}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.confirmPassword}
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
                    Change Password
                  </RoundedButton>
                </SectionRow>
                <SectionRow>
                  <RoundedButton
                    ref={undefined}
                    onClick={secondsLeft === 0 ? () => handleResendOTP() : undefined}
                    className={secondsLeft === 0 ? "ResendOTPBTN mt-2" : 'ResendOTPDisableBTN mt-2'}
                    type='button'
                    disabled={formik.isSubmitting}
                  >
                    Resend Temp Password
                  </RoundedButton>
                </SectionRow>
                <SectionRow>
                  <div className="text-xs text-red-600 font-bold mt-2">
                    {secondsLeft} seconds left
                  </div>
                </SectionRow>
              </div>

            </Form>
          )}
        </Formik>
      </div>
      <Loader loaderText={loaderText} open={loaderOpen} />
    </React.Fragment>
  );
};

export default ResetPasswordFormCard;
