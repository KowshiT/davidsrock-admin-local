
import { completeImage } from "@/assetsLayer";
import Image from "next/image";
import React, { useContext, useState } from "react";
import { useRouter } from "next/router";
import { setActiveTabToLocalStorage } from "@/helpers/authHelper";
import { CreateOrganizationContext } from "@/contexts/organizationContext/createOrganizationContext";

export interface CreateOrganizationProps { }

const CreateOrganizationStep06: React.FC<CreateOrganizationProps> = (props) => {
  const router = useRouter();
  const { setOrganizationName, setOrganizationCategory, setAboutOrganization, setOrganizationImages } = useContext(CreateOrganizationContext);

  const retunBtnHandler = () => {
    setActiveTabToLocalStorage("Dashboard");
    router.push('/dashboard');

    // creae event data
    setOrganizationName("")
    setOrganizationCategory("");
    setAboutOrganization({});
    setOrganizationImages({});
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
            You successfully created your<br />organization.
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

export default CreateOrganizationStep06;
