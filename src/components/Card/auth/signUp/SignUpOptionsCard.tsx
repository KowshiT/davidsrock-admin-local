import { SignUpStageContext } from "@/contexts/authContext/SignUpStageContext";
import React, { useContext } from "react";
import SignUpFormCard from "./SignUpFormCard";
import Image from "next/image";
import { DR_Logo_02, email } from "@/assetsLayer";
import { SectionRow } from "@/layouts/section";
import { AuthCardControlContext } from "@/contexts/authContext/authCardControlContext";

export interface HomeProps { }

const SignUpOptionsCard: React.FC<HomeProps> = (props) => {
  const { setSignUpStageCount, setSignUpType } = useContext(SignUpStageContext);
  const { authCard, setauthCard } = useContext(AuthCardControlContext);

  return (
    <React.Fragment>
      <div className='grid justify-items-center'>
        <Image
          src={DR_Logo_02}
          alt='Picture of the author'
          width={80}
          height={80}
        />
        <span className="loginMainText mt-4 mb-4">
          Sign Up to Davids Rock
        </span>

        <button className="signUpText mt-6 mb-6 duration-500 hover:scale-105" onClick={(e: any) => setauthCard("LOGIN_CARD")}>
          Already have an account? <span className="loginWordBtn">Login</span>
        </button>

        <button className="email-sign-up-button"
          onClick={() => {
            setSignUpStageCount(2);
            setSignUpType("EMAIL");
          }}>
          <SectionRow className="items-center pl-2">
            <Image
              src={email}
              alt='Picture of the author'
              width={80}
              height={80}
            />
            <p className="signUpBlackText pr-8">Sign Up with Email</p>
          </SectionRow>
        </button>

      </div>
    </React.Fragment>
  );
};

export default SignUpOptionsCard;
