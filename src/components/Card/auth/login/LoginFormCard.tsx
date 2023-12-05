import React, { useContext, useState } from "react";
import { loginValuesInit } from "@/actionLayer/_index";
import RoundedButton from "../../../Buttons/RoundedButtons";
import { AuthCardControlContext } from "@/contexts/authContext/authCardControlContext";
import { loginValidation } from "@/helpers/validation/formikValidation";
import { SectionColumn, SectionRow } from "@/layouts/section";
import { LoginValues } from "@/types/types";
import { Form, Formik, FormikHelpers, FormikProps } from "formik";
import Image from "next/image";
import {
  DR_Logo_02,
  closeButtonNew,
} from "../../../../assetsLayer/index";
import { useRouter } from "next/router";
import { loginActionHandler } from "@/actionLayer/auth/loginActions";
import { useAlerts } from "../../../../hooks/alertHook";
import Loader from "../../../Modal/LoadingModal";
import { LoggedUserContext } from "@/contexts/userContext/loggedUserDetailsContext";
import { ModalOpenCloseContext } from "@/contexts/modalContext/modalOpenCloseContext";
import { SignUpStageContext } from "@/contexts/authContext/SignUpStageContext";
import TextField2 from "../../../../components/Inputs/TextField2";
import { getUserDetailsByIdApi } from "@/api/user/userApi";
import {
  setInitialUserProfilePictureToLocalStorage,
  setUserProfilePictureToLocalStorage,
} from "@/helpers/authHelper";
import { useUser } from "@/contexts/authContext/userProvider";

export interface LoginFormCardProps { }

const LoginFormCard: React.FC<LoginFormCardProps> = (props) => {
  const { setAlert } = useAlerts();
  const router = useRouter();
  const { setauthCard } = useContext(AuthCardControlContext);
  const { setLoggedUserID } = React.useContext(LoggedUserContext);
  const { setAuthModal } = useContext(ModalOpenCloseContext);
  const { setSignUpStageCount, setSignUpType } = useContext(SignUpStageContext);
  const [loaderOpen, setLoaderOpen] = useState(false);
  const { setProfilePicture } = useUser();

  const handleSubmit = (
    values: LoginValues,
    actions: FormikHelpers<LoginValues>
  ) => {
    setLoaderOpen(true);

    loginActionHandler(values, setProfilePicture)
      .then((res: any) => {
        if (
          res.status == "SUCCESS" &&
          res.isActive === "true" &&
          res?.profileImagePath === null
        ) {
          setTimeout(() => setLoaderOpen(false), 1000);
          setSignUpStageCount(4);
          setauthCard("SIGNUP_CARD");
          setAuthModal(true);
        } else if (
          res.status == "SUCCESS" &&
          res.isActive === "true" &&
          res?.profileImagePath !== null
        ) {
          getUserDetailsByIdApi(res?.userId)
            .then((res: any) => {
              setUserProfilePictureToLocalStorage(res?.profileImagePath);
              setInitialUserProfilePictureToLocalStorage(res?.profileImagePath);
              return res;
            })
            .catch((error) => {
              setAlert({
                message: "Error!",
                severity: "error",
              });
              return error;
            });
          setTimeout(() => setLoaderOpen(false), 1000);
          setLoggedUserID(res?.userId);
          setAlert({
            message: "Login Success!",
            severity: "success",
          });
          actions.resetForm();
          setauthCard("");
          router.push("/dashboard");
        } else if (res.status == "PENDING") {
          setTimeout(() => setLoaderOpen(false), 1000);
          setAlert({
            message: "Verify your email.",
            severity: "error",
          });
          actions.resetForm();
        } else if (res.code === "403") {
          setTimeout(() => setLoaderOpen(false), 1000);
          setAlert({
            message: "Invalid Email or password!",
            severity: "error",
          });
          actions.resetForm();
        } else {
          setTimeout(() => setLoaderOpen(false), 1000);
          setAlert({
            message: res.responseMessage ? res.responseMessage : "Error",
            severity: "error",
          });
        }
      })
      .catch((error) => {
        setTimeout(() => setLoaderOpen(false), 1000);
        console.log(error);
      });
  };

  const handleClose = () => {
    setAuthModal(false);
    setSignUpStageCount(1);
    setSignUpType("");
  };

  return (
    <React.Fragment>
      <div className="loginmainDIV relative pt-4">
        <button
          onClick={(e: any) => handleClose()}
          className="modalcloseBTN opacity-100 duration-500 hover:rotate-90 hover:scale-110 hover:opacity-100"
        >
          <Image
            src={closeButtonNew}
            alt="Picture of the author"
            width={30}
            height={30}
          />
        </button>
        <div className="scrollbar01 grid justify-items-center">
          <Image
            src={DR_Logo_02}
            alt="Picture of the author"
            width={90}
            height={90}
          />
          <span className="loginMainText mt-4">Login to Davids Rock</span>

          <Formik
            initialValues={loginValuesInit}
            onSubmit={handleSubmit}
            validationSchema={loginValidation}
          >
            {(formik: FormikProps<LoginValues>) => (
              <Form>
                <div className="mt-6 grid justify-items-start">
                  <Form>
                    <SectionColumn className=" mb-3">
                      <span className="textinputtitle ">Email Address</span>
                      <TextField2
                        type="text"
                        name="username"
                        className="logincardInputsField"
                        placeholder="Email Address"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.username}
                      />
                    </SectionColumn>
                    <SectionColumn className=" mb-3">
                      <span className="textinputtitle ">Password</span>
                      <TextField2
                        type="password"
                        name="password"
                        className="logincardInputsField"
                        placeholder="Password"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.password}
                      />
                    </SectionColumn>
                  </Form>
                </div>
                <div className="mt-5 mr-2 grid justify-items-center">
                  <SectionRow>
                    <RoundedButton
                      ref={undefined}
                      onClick={undefined}
                      className="loginMainBTN"
                      type="submit"
                      disabled={formik.isSubmitting}
                    >
                      Login
                    </RoundedButton>
                  </SectionRow>
                  {/* <SectionRow className=" mt-6 !mb-2 flex flex-row items-center">
                    <div className="line4"></div>
                    <span className="signUpText ml-6 mr-6">or</span>
                    <div className="line4"></div>
                  </SectionRow>
                  <span className="signUpWithText">Login with</span>
                  <SectionRow className="mt-4">
                    <RoundedButton
                      ref={undefined}
                      onClick={undefined}
                      type='button'
                      className="googleSignUpBTN duration-500 hover:scale-110"
                    >
                      <div>
                        <Image
                          src={googleIcon}
                          alt="Picture of the author"
                          width={20}
                          height={20}
                        />
                      </div>
                    </RoundedButton>
                    <RoundedButton
                      ref={undefined}
                      onClick={undefined}
                      type='button'
                      className="googleSignUpBTN ml-6 duration-500 hover:scale-110"
                    >
                      <div className="grid w-5 justify-items-center">
                        <Image
                          src={facebookIcon}
                          alt="Picture of the author"
                          width={10}
                          height={10}
                        />
                      </div>
                    </RoundedButton>
                  </SectionRow> */}
                </div>
              </Form>
            )}
          </Formik>
          <button
            className="forgotPasswordText mt-2 duration-500 hover:scale-105"
            onClick={(e: any) => setauthCard("FORGOT_PASSWORD_CARD")}
          >
            Forgot password?
          </button>
        </div>
      </div>
      <Loader loaderText={""} open={loaderOpen} />
    </React.Fragment>
  );
};

export default LoginFormCard;
