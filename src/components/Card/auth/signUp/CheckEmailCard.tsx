import { SignUpStageContext } from "@/contexts/authContext/SignUpStageContext";
import React, { useContext } from "react";
import SignUpFormCard from "./SignUpFormCard";
import Image from "next/image";
import { DR_Logo_02, closeButtonNew, email } from "@/assetsLayer";
import { SectionRow } from "@/layouts/section";
import { AuthCardControlContext } from "@/contexts/authContext/authCardControlContext";
import { useRouter } from "next/router";
import RoundedButton from "../../../../components/Buttons/RoundedButtons";
import { ModalOpenCloseContext } from "../../../../contexts/modalContext/modalOpenCloseContext";

export interface HomeProps { }

const CheckEmailCard: React.FC<HomeProps> = (props) => {
  const router = useRouter();

  const { authModal, setAuthModal } = useContext(ModalOpenCloseContext);
  const { setSignUpStageCount, setSignUpType } = useContext(SignUpStageContext);
  const { verify_token } = router.query;

  const handleClose = () => {
    setAuthModal(false);
    setSignUpStageCount(1);
    setSignUpType("");
  }

  return (
    <React.Fragment>
      <div className='alertmsgmainDIV p-4 relative'>
        <button onClick={(e: any) => handleClose()} className="modalcloseBTN opacity-100 duration-500 hover:scale-110 hover:rotate-90 hover:opacity-100">
          <Image
            src={closeButtonNew}
            alt='Picture of the author'
            width={30}
            height={30}
          />
        </button>

        <div className='grid justify-items-center'>
          <Image
            src={DR_Logo_02}
            alt='Picture of the author'
            width={90}
            height={90}
          />
          {verify_token ? (

            <>
              <span className="emailVerifiedMainText1 mt-4 mb-4 text-center">
                Your email successfully verified.
              </span>
              <div className="mt-"></div>
              <span className="emailVerifiedMainText2 mt-4 mb-4 text-center">
                Please continue.
              </span>

              <div className="signUpText mt-6 mb-6 text-center" >
                <button
                  className='loginMainBTN rounded-full align-middle'
                  onClick={() => setSignUpStageCount(4)}
                >
                  Continue
                </button>
              </div>
            </>
          ) : (
            <>
              <span className="almostDoneText mt-4 mb-4">
                Almost done!
              </span>

              <div className="signUpText mt-6 mb-6 text-center" >
                Please check your inbox. We have just sent an<br />email to your email address.<br />
                You must click the button in that email to finish<br />signing up.
              </div>
            </>
          )}
        </div>

      </div>
    </React.Fragment>
  );
};

export default CheckEmailCard;
