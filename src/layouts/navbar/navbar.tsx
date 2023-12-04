import type { NextPage } from "next";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import Section, { SectionRow } from "../../layouts/section";

//images
import UserProfile from "./components/userProfile";
import { DR_Logo_03 } from "@/assetsLayer";
import { useRouter } from "next/router";
import { getUserIdFromStorage } from "@/helpers/authHelper";
import MessageNotificationModal from "../../components/Modal/message/messageNotificationModal";

const NavBar: NextPage = () => {
  const router = useRouter();
  const [isHide, setIsHide] = useState<boolean>(false);

  useEffect(() => {
    if (isNaN(getUserIdFromStorage())) {
      setIsHide(true);
    }
  });

  return (
    <React.Fragment>
      <Section>
        <SectionRow className="navbarMainSec w-full justify-between px-4">
          <SectionRow>
            <button
              className="my-auto"
              onClick={() => {
                isHide ? router.push("/auth") : router.push("/home");
              }}
            >
              <Image
                // loader ={() => LoginPageImage}
                src={DR_Logo_03}
                alt="Picture of the author"
                width={43}
                height={43}
              />
            </button>
          </SectionRow>
          {isHide ? (
            <></>
          ) : (
            <SectionRow className="my-auto">
              <UserProfile />

              {/* <div className="my-auto ml-2 flex justify-center">
                <button className="notify-icon-wrapper">
                  <img src={notifyIcon.src} alt="message" />
                </button>
              </div> */}

              {/* <div className="my-auto ml-2 flex justify-center">
                <button
                  className="notify-icon-wrapper"
                  onClick={() => setMessageNotificationModal(true)}
                >
                  <img src={messageIcon.src} alt="message" />
                </button>
              </div> */}
            </SectionRow>
          )}
        </SectionRow>
      </Section>
      <MessageNotificationModal />
    </React.Fragment>
  );
};

export default NavBar;
