
import { completeImage } from "@/assetsLayer";
import { CreatePublicProfileContext } from "@/contexts/publicProfileContext/createPublicProfileContext";
import { setActiveTabToLocalStorage } from "@/helpers/authHelper";
import Image from "next/image";
import { useRouter } from "next/router";
import React, { useContext } from "react";

export interface CreatePublicProfileProps { }

const CreatePublicProfileStep05: React.FC<CreatePublicProfileProps> = (props) => {
  const router = useRouter();
  const { setPublicProfileName, setPublicProfileInterests,
    setAboutPublicProfile, setPublicProfileNetworks, setPublicProfileImages } = useContext(CreatePublicProfileContext);

  const retunBtnHandler = () => {
    setActiveTabToLocalStorage("Dashboard");
    router.push('/dashboard');

    setPublicProfileName("")
    setPublicProfileInterests([]);
    setAboutPublicProfile({});
    setPublicProfileNetworks([]);
    setPublicProfileImages({});
  }

  return (
    <React.Fragment>
      <div className="homeRightMainSec2 pb-4">
        <div className="grid justify-items-center">
          <br />
          <br />

          <Image
            // loader ={() => LoginPageImage}
            src={completeImage}
            alt='Picture of the author'
            width={150}
            height={150}
          />
          <span className="createOrganizationTxt mt-8">
            You successfully created your<br />Public Profile.
          </span>
          <span className="createOrganizationTxt06 mt-8">
            You will get the email notification.<br />Please check your email.
          </span>
          <button onClick={(e: any) => retunBtnHandler()} className="returnBTN">
            Return to Admin Panel
          </button>
        </div>
      </div>
    </React.Fragment>
  );
};

export default CreatePublicProfileStep05;
