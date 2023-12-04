import type { NextPage } from "next";
import React, { useContext, useEffect, useState } from "react";
import { useRouter } from "next/router";
import Section, { SectionColumn, SectionRow } from "../../layouts/section";
import RoundedButton from "../../components/Buttons/RoundedButtons";
import AuthModal from "../../components/Modal/authModal";
import SignUpFormCard from "../../components/Card/auth/signUp/SignUpFormCard";
import LoginFormCard from "../../components/Card/auth/login/LoginFormCard";
import ForgotPasswordFormCard from "../../components/Card/auth/forgotPassword/ForgotPasswordFormCard";
import { ModalOpenCloseContext } from "@/contexts/modalContext/modalOpenCloseContext";
import { AuthCardControlContext } from "@/contexts/authContext/authCardControlContext";

//images
import Image from "next/image";
import {
  Colloberate_Logo,
  DR_Logo_01,
  DR_Logo_02,
  DR_Text_Logo,
  Organization_Logo,
  Voice_Logo,
} from "@/assetsLayer";
import { useAlerts } from "@/hooks/alertHook";
import { verifyEmailActionHandler } from "@/actionLayer/auth/loginActions";
import Loader from "../../components/Modal/LoadingModal";
import SignUpMainCard from "../../components/Card/auth/signUp/SignUpMainCard";
import { SignUpStageContext } from "@/contexts/authContext/SignUpStageContext";

const Auth: NextPage = () => {
  const { setAlert } = useAlerts();
  const router = useRouter();
  const { setAuthModal } = useContext(ModalOpenCloseContext);
  const { authCard, setauthCard } = useContext(AuthCardControlContext);
  const { setSignUpStageCount } = useContext(SignUpStageContext);
  const [loaderOpen, setLoaderOpen] = useState(false);
  const [loaderText, setLoaderText] = useState("");

  const { verify_token } = router.query;

  useEffect(() => {
    if (verify_token) {
      setLoaderText("Please Wait...");
      setLoaderOpen(true);

      let params = {
        verificationToken: verify_token,
      };

      verifyEmailActionHandler(params)
        .then((res) => {
          if (res?.responseCode == "00") {
            setTimeout(() => setLoaderOpen(false), 1000);
            setSignUpStageCount(3);
            setauthCard("SIGNUP_CARD");
            setAuthModal(true);
          } else if (res?.responseCode == "06") {
            setTimeout(() => setLoaderOpen(false), 1000);
            setTimeout(
              () =>
                setAlert({
                  message: "Inavalid Status",
                  severity: "error",
                }),
              1000
            );
          } else if (res?.responseCode == "07") {
            console.log("ccccc=======");
            setTimeout(() => setLoaderOpen(false), 1000);
            setTimeout(
              () =>
                setAlert({
                  message: "Token Invalid.",
                  severity: "error",
                }),
              1000
            );
          } else {
            console.log("ddddd=======");
            setTimeout(() => setLoaderOpen(false), 1000);
            setTimeout(
              () =>
                setAlert({
                  message: res?.responseMessage
                    ? res?.responseMessage
                    : "Error",
                  severity: "error",
                }),
              1000
            );
          }
        })
        .catch((error) => {
          setLoaderOpen(false);
          console.log(error);
          return error;
        });
    }
  }, [verify_token]);

  const loginHandler = () => {
    setauthCard("LOGIN_CARD");
    setAuthModal(true);
  };

  const signUpHandler = () => {
    setauthCard("SIGNUP_CARD");
    setAuthModal(true);
  };

  return (
    <React.Fragment>
      <Section className="overflow-hidden">
        <SectionRow className="landingPageLeft relative w-6/12 xs:hidden">
          <div className=" flex w-full items-center justify-center">
            <div>
              <SectionRow>
                <Image
                  src={Voice_Logo}
                  alt="Picture of the author"
                  width={35}
                  height={35}
                />
                <span className="landingPageText01">Raise your voice</span>
              </SectionRow>
              <SectionRow className="mt-4 mb-4">
                <Image
                  src={Organization_Logo}
                  alt="Picture of the author"
                  width={35}
                  height={35}
                />
                <span className="landingPageText01">
                  Seek help from organizations
                </span>
              </SectionRow>
              <SectionRow>
                <Image
                  src={Colloberate_Logo}
                  alt="Picture of the author"
                  width={35}
                  height={35}
                />
                <span className="landingPageText01">Collaborate</span>
              </SectionRow>
            </div>
          </div>
          <div className=" absolute right-0">
            <br />
            <Image src={DR_Logo_01} alt="Picture of the author" width={650} />
          </div>
        </SectionRow>
        <SectionRow className="landingPageRight w-6/12 xs:w-full mobileL:pr-14">
          <SectionRow className="xs:w-12/12 relative grid w-full justify-items-center xs:pr-10">
            <div className="  flex items-center justify-start ">
              <div>
                <SectionRow>
                  <Image
                    src={DR_Logo_02}
                    alt="Picture of the author"
                    width={80}
                    height={80}
                  />
                </SectionRow>
                <SectionRow className="ml-4 mt-5">
                  <span className="landingPageText02">
                    The place where your concerns
                    <br />
                    really matter.
                  </span>
                </SectionRow>
                <SectionRow className="ml-4 mt-5">
                  <span className="landingPageText03">
                    Join with Davids Rock Today.
                  </span>
                </SectionRow>
                <SectionRow className="ml-4 mt-8">
                  <RoundedButton
                    ref={undefined}
                    onClick={(e: any) => {
                      signUpHandler();
                    }}
                    className="signUpBTN mr-3"
                  >
                    Sign Up
                  </RoundedButton>
                  <RoundedButton
                    ref={undefined}
                    onClick={(e: any) => {
                      loginHandler();
                    }}
                    className="loginBTN"
                  >
                    Login
                  </RoundedButton>
                </SectionRow>
              </div>
            </div>
            <div className="absolute bottom-5 left-10">
              <SectionRow>
                <span className="landingPageText04 mr-3 transform cursor-pointer transition duration-500 hover:scale-110">
                  About Us
                </span>
                <span className="landingPageText04 mr-3 transform cursor-pointer transition duration-500 hover:scale-110">
                  Help Center
                </span>
                <span className="landingPageText04 mr-3 transform cursor-pointer transition duration-500 hover:scale-110">
                  Terms of Service
                </span>
                <span className="landingPageText04 mr-3 transform cursor-pointer transition duration-500 hover:scale-110">
                  Privacy Policy
                </span>
                <span className="landingPageText04 mr-3 transform cursor-pointer transition duration-500 hover:scale-110">
                  Blog
                </span>
              </SectionRow>
              <span className="landingPageText04 mr-3">
                © 2023 Davids Rock.
              </span>
            </div>
            <div className=" absolute right-5">
              <br />
              <Image
                src={DR_Text_Logo}
                alt="Picture of the author"
                width={120}
              />
            </div>
          </SectionRow>
        </SectionRow>
      </Section>
      <AuthModal
        contentCard={
          authCard === "SIGNUP_CARD" ? (
            <SignUpMainCard />
          ) : authCard === "LOGIN_CARD" ? (
            <LoginFormCard />
          ) : authCard === "FORGOT_PASSWORD_CARD" ? (
            <ForgotPasswordFormCard />
          ) : null
        }
      />
      <Loader loaderText={loaderText} open={loaderOpen} />
    </React.Fragment>
  );
};

export default Auth;
