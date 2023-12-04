import {
  AllIcon,
  animalRights,
  blackLArrow,
  blackPlusIcon,
  cameraIcon,
  DR_Logo_04,
  foodRight,
  globel,
  HumanRight,
  laberRightss,
  LiveBW,
  politicalCampain,
  whiteRArrow,
} from "@/assetsLayer";
import { EventCreateStageContext } from "@/contexts/eventContext/eventCreateStageContext";
import Section, { SectionColumn, SectionRow } from "@/layouts/section";
import Image from "next/image";
import { useRouter } from "next/router";
import React, { useContext } from "react";

export interface EventLeftMenuCardProps {}

const EventLeftMenuCard: React.FC<EventLeftMenuCardProps> = (props) => {
  const router = useRouter();
  const { setEventCreateStageCount } = useContext(EventCreateStageContext);

  const handleCreateEvent = () => {
    router.push("/dashboard/createEvent");
  };

  const handlebackArrow = () => {
    router.push("/dashboard");
    setTimeout(() => {
      setEventCreateStageCount(1);
    }, 1000);
  };

  return (
    <React.Fragment>
      <div>
        <div className="homeOrgSideBarSec pt-4 pb-4">
          <SectionRow className=" ml-6">
            <button onClick={(e: any) => handlebackArrow()}>
              <Image
                // loader ={() => LoginPageImage}
                src={blackLArrow}
                alt="Picture of the author"
                width={25}
                height={25}
              />
            </button>
            <span className="homeLeftBarMainText ml-2">Events</span>
          </SectionRow>
          {/* <div className='line mt-3 mb-3 w-full'></div> */}
          {/* <SectionColumn className="grid justify-items-center mt-3 ">
            <button className="createOrgnzBTN grid justify-items-center mt-3 mb-8" onClick={(e: any) => handleCreateEvent()}>
              <SectionRow className="mt-2">
                <Image
                  // loader ={() => LoginPageImage}
                  src={blackPlusIcon}
                  alt='Picture of the author'
                  width={25}
                  height={25}
                />
                <span className="createItemText ml-4">Create an Event</span>
              </SectionRow>
            </button>
            <Section className="mt-2">
              <button>
                <div className="grid justify-items-center orgnzCatBTN pt-2 transform transition duration-500 hover:bg-gray-300">
                  <Image
                    // loader ={() => LoginPageImage}
                    src={globel}
                    alt='Picture of the author'
                    width={35}
                    height={35}
                  />
                  <span className="orgCatText">Global<br />Events</span>
                </div>
              </button>
              <button>
                <div className="grid justify-items-center orgnzCatBTN ml-2 mr-2 pt-2 transform transition duration-500 hover:bg-gray-300">
                  <Image
                    // loader ={() => LoginPageImage}
                    src={LiveBW}
                    alt='Picture of the author'
                    width={35}
                    height={35}
                  />
                  <span className="orgCatText">Live<br />Events</span>
                </div>
              </button>
              <button>
                <div className="grid justify-items-center orgnzCatBTN pt-2 transform transition duration-500 hover:bg-gray-300">
                  <Image
                    // loader ={() => LoginPageImage}
                    src={cameraIcon}
                    alt='Picture of the author'
                    width={40}
                    height={40}
                  />
                  <span className="orgCatText">Online<br />Events</span>
                </div>
              </button>
            </Section>
          </SectionColumn> */}
        </div>
        <div className="becomeAOrg-responsive relative">
          <SectionRow className="relative z-10">
            <span className="becomeaOrgMainText">
              Become
              <br />
              an Event
            </span>
            <div className="absolute right-0">
              <Image
                src={whiteRArrow}
                alt="Picture of the author"
                width={28}
                height={28}
              />
            </div>
          </SectionRow>
          <SectionRow className="!z-10">
            <div className="becomeaOrgSubText !z-10 mt-3">
              Set up your business account on Davids Rock
            </div>
          </SectionRow>
          <div className="absolute right-0 top-0 z-0">
            <Image
              src={DR_Logo_04}
              alt="Picture of the author"
              className="rounded-r-lg"
              width={156}
              height={156}
            />
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default EventLeftMenuCard;
