import { SignUpStageContext } from "@/contexts/authContext/SignUpStageContext";
import React, { useContext, useState } from "react";
import Image from "next/image";
import Section, { SectionRow } from "@/layouts/section";
import {
  ARinterestsImage,
  ARinterestsImageC,
  closeButtonNew,
  DR_Logo_02,
  FRinterestsImage,
  FRinterestsImageC,
  HRinterestsImage,
  HRinterestsImageC,
  LRinterestsImage,
  LRinterestsImageC,
  PRinterestsImage,
  PRinterestsImageC,
} from "@/assetsLayer";
import { sendUserInterestsActionHandler } from "@/actionLayer/auth/registrationActions";
import { useAlerts } from "@/hooks/alertHook";
import Loader from "../../../../components/Modal/LoadingModal";
import { useRouter } from "next/router";
import { AuthCardControlContext } from "@/contexts/authContext/authCardControlContext";
import { ModalOpenCloseContext } from "@/contexts/modalContext/modalOpenCloseContext";
import { ImageUploadDetailsContext } from "@/contexts/imageUploadContext/imageUploadContext";
import { getUserDetailsByIdApi } from "@/api/user/userApi";
import {
  setInitialUserProfilePictureToLocalStorage,
  setUserProfilePictureToLocalStorage,
} from "@/helpers/authHelper";
import { LoggedUserContext } from "@/contexts/userContext/loggedUserDetailsContext";

export interface HomeProps { }

const InterestCard: React.FC<HomeProps> = (props) => {
  const { setAlert } = useAlerts();
  const router = useRouter();

  const [interestArray, setInterestArray] = useState<any>([]);
  const [loaderOpen, setLoaderOpen] = useState(false);

  const { setauthCard } = useContext(AuthCardControlContext);
  const { setAuthModal } = useContext(ModalOpenCloseContext);
  const { setSignUpStageCount, setSignUpType } = useContext(SignUpStageContext);
  const { uploadImageFileId, setUploadImageFileId } = React.useContext(
    ImageUploadDetailsContext
  );
  const { setLoggedUserID } = React.useContext(LoggedUserContext);

  const { user_id } = router.query;

  const selectInterest = (interest: string) => {
    let selectedArr = [...interestArray];
    if (interestArray.includes(interest)) {
      let removeElementArr = selectedArr.filter((item) => item !== interest);
      console.log("POP selectedArr", removeElementArr);
      setInterestArray(removeElementArr);
    } else {
      selectedArr.push(interest);
      console.log("PUSH selectedArr", selectedArr);
      setInterestArray(selectedArr);
    }
  };

  const handleBack = () => {
    setSignUpStageCount(4);
  };

  const handleSubmit = () => {
    setLoaderOpen(true);
    console.log("interestArray :>> ", interestArray);

    let values = {
      userId: user_id || localStorage.getItem("userId"),
      profileImagePath: uploadImageFileId,
      interest: interestArray,
    };

    console.log("values :>> ", values);
    if (interestArray.length === 0) {
      setLoaderOpen(false);
      setAlert({
        message: "Select an Interest.",
        severity: "error",
      });
    } else {
      sendUserInterestsActionHandler(values)
        .then((res: any) => {
          if (res.responseCode == "00") {
            if (
              localStorage.getItem("REFRESHTOKEN") &&
              sessionStorage.getItem("ACCESSTOKEN")
            ) {
              getUserDetailsByIdApi(res?.userId)
                .then((res: any) => {
                  setUserProfilePictureToLocalStorage(uploadImageFileId);
                  setInitialUserProfilePictureToLocalStorage(uploadImageFileId);
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
              setauthCard("");
              router.push("/home");
            } else {
              setTimeout(() => setLoaderOpen(false), 1000);
              setTimeout(
                () =>
                  setAlert({
                    message: "Login to your account.",
                    severity: "success",
                  }),
                1000
              );

              setauthCard("LOGIN_CARD");
              setAuthModal(true);
              router.push("/auth");
            }
          } else {
            setTimeout(() => setLoaderOpen(false), 1000);
            setTimeout(
              () =>
                setAlert({
                  message: res.responseMessage ? res.responseMessage : "Error",
                  severity: "error",
                }),
              1000
            );
          }
        })
        .catch((error) => {
          setLoaderOpen(false);
          console.log(error);
        });
    }
  };

  const handleClose = () => {
    setAuthModal(false);
    setUploadImageFileId("");
    setSignUpStageCount(1);
    setSignUpType("");
  };

  return (
    <React.Fragment>
      <div className="interestmainDIV relative pt-4">
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
        <div className="grid justify-items-center">
          <div className="grid justify-items-center">
            <Image
              src={DR_Logo_02}
              alt="Picture of the author"
              width={90}
              height={90}
            />
            <div className="mb-5 mt-5 justify-items-center text-center">
              <span className="loginMainText mt-4 mb-4 text-4xl">
                Get started by picking a few interests.
              </span>
            </div>
          </div>
          <Section>
            <button onClick={() => selectInterest("HUMAN_RIGHTS")}>
              <div
                className={
                  interestArray.includes("HUMAN_RIGHTS")
                    ? `interestsCatBTNASelect relative ml-3 mr-3 grid transform justify-items-center drop-shadow-xl transition duration-500`
                    : `interestsCatBTNA relative ml-3 mr-3 grid transform justify-items-center drop-shadow-xl transition duration-500 hover:bg-gray-300`
                }
              >
                <Image
                  // loader ={() => LoginPageImage}
                  src={
                    interestArray.includes("HUMAN_RIGHTS")
                      ? HRinterestsImageC
                      : HRinterestsImage
                  }
                  alt="Picture of the author"
                  width={138}
                  height={138}
                  className="imageDIV transform transition duration-500"
                />
                <div className="interestsCatText absolute top-10">
                  Human
                  <br />
                  Rights
                </div>
              </div>
            </button>
            <button onClick={() => selectInterest("FOOD_RIGHTS")}>
              <div
                className={
                  interestArray.includes("FOOD_RIGHTS")
                    ? `interestsCatBTNASelect relative ml-3 mr-3 grid transform justify-items-center drop-shadow-xl transition duration-500`
                    : `interestsCatBTNA relative ml-3 mr-3 grid transform justify-items-center drop-shadow-xl transition duration-500 hover:bg-gray-300`
                }
              >
                <Image
                  // loader ={() => LoginPageImage}
                  src={
                    interestArray.includes("FOOD_RIGHTS")
                      ? FRinterestsImageC
                      : FRinterestsImage
                  }
                  alt="Picture of the author"
                  width={138}
                  height={138}
                  className="imageDIV transform transition duration-500"
                />
                <div className="interestsCatText absolute top-10">
                  Food
                  <br />
                  Rights
                </div>
              </div>
            </button>
            <button onClick={() => selectInterest("ANIMAL_RIGHTS")}>
              <div
                className={
                  interestArray.includes("ANIMAL_RIGHTS")
                    ? `interestsCatBTNASelect relative ml-3 mr-3 grid transform justify-items-center drop-shadow-xl transition duration-500`
                    : `interestsCatBTNA relative ml-3 mr-3 grid transform justify-items-center drop-shadow-xl transition duration-500 hover:bg-gray-300`
                }
              >
                <Image
                  // loader ={() => LoginPageImage}
                  src={
                    interestArray.includes("ANIMAL_RIGHTS")
                      ? ARinterestsImageC
                      : ARinterestsImage
                  }
                  alt="Picture of the author"
                  width={138}
                  height={138}
                  className="imageDIV transform transition duration-500"
                />
                <div className="interestsCatText absolute top-10">
                  Animal
                  <br />
                  Rights
                </div>
              </div>
            </button>
          </Section>
          <Section className="mt-5">
            <button onClick={() => selectInterest("POLITICAL_CAMPAIGNS")}>
              <div
                className={
                  interestArray.includes("POLITICAL_CAMPAIGNS")
                    ? `interestsCatBTNASelect relative ml-3 mr-3 grid transform justify-items-center drop-shadow-xl transition duration-500`
                    : `interestsCatBTNA relative ml-3 mr-3 grid transform justify-items-center drop-shadow-xl transition duration-500 hover:bg-gray-300`
                }
              >
                <Image
                  // loader ={() => LoginPageImage}
                  src={
                    interestArray.includes("POLITICAL_CAMPAIGNS")
                      ? PRinterestsImageC
                      : PRinterestsImage
                  }
                  alt="Picture of the author"
                  width={138}
                  height={138}
                  className="imageDIV transform transition duration-500"
                />
                <div className="interestsCatText absolute top-10">
                  Political
                  <br />
                  Campaigns
                </div>
              </div>
            </button>
            <button onClick={() => selectInterest("LABOUR_RIGHTS")}>
              <div
                className={
                  interestArray.includes("LABOUR_RIGHTS")
                    ? `interestsCatBTNASelect relative ml-3 mr-3 grid transform justify-items-center drop-shadow-xl transition duration-500`
                    : `interestsCatBTNA relative ml-3 mr-3 grid transform justify-items-center drop-shadow-xl transition duration-500 hover:bg-gray-300`
                }
              >
                <Image
                  // loader ={() => LoginPageImage}
                  src={
                    interestArray.includes("LABOUR_RIGHTS")
                      ? LRinterestsImageC
                      : LRinterestsImage
                  }
                  alt="Picture of the author"
                  width={138}
                  height={138}
                  className="imageDIV transform transition duration-500"
                />
                <div className="interestsCatText absolute top-10">
                  Labor
                  <br />
                  Rights
                </div>
              </div>
            </button>
          </Section>
          <SectionRow className="">
            <div className="signUpText mt-8 mb-6 mr-6 text-center">
              <button
                className="authInterestBackBTN rounded-full align-middle"
                onClick={() => handleBack()}
              >
                Back
              </button>
            </div>
            <div className="signUpText mt-8 mb-6 text-center">
              <button
                className="authInterestSaveBTN rounded-full align-middle"
                onClick={() => handleSubmit()}
              >
                Save
              </button>
            </div>
          </SectionRow>
        </div>
      </div>
      <Loader loaderText={""} open={loaderOpen} />
    </React.Fragment>
  );
};

export default InterestCard;
