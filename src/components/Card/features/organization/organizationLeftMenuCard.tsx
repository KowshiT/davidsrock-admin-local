import {
  AllIcon,
  animalRights,
  blackLArrow,
  blackPlusIcon,
  DR_Logo_04,
  foodRight,
  HumanRight,
  laberRightss,
  politicalCampain,
  whiteRArrow,
} from "@/assetsLayer";
import { OrganizationCreateStageContext } from "@/contexts/organizationContext/organizationCreateStageContext";
import Section, { SectionColumn, SectionRow } from "@/layouts/section";
import Image from "next/image";
import { useRouter } from "next/router";
import React, { useContext } from "react";

export interface OrganizationLeftMenuCardProps {}

const OrganizationLeftMenuCard: React.FC<OrganizationLeftMenuCardProps> = (
  props
) => {
  const router = useRouter();
  const { setOrganizationCreateStageCount } = useContext(
    OrganizationCreateStageContext
  );

  const handleCreateOrganization = () => {
    router.push("/dashboard/createOrganization");
  };

  const handlebackArrow = () => {
    router.push("/dashboard");
    setOrganizationCreateStageCount(1);
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
            <span className="homeLeftBarMainText ml-2">Organizations</span>
          </SectionRow>
          {/* <div className='line mt-3 mb-3 w-full'></div> */}
          {/* <SectionColumn className="grid justify-items-center mt-3 ">
            <button className="createOrgnzBTN grid justify-items-center mt-3 mb-8" onClick={(e: any) => handleCreateOrganization()}>
              <SectionRow className="mt-2">
                <Image
                  // loader ={() => LoginPageImage}
                  src={blackPlusIcon}
                  alt='Picture of the author'
                  width={25}
                  height={25}
                />
                <span className="createItemText ml-4">Create an Organization</span>
              </SectionRow>
            </button>
            <Section>
              <button>
                <div className="grid justify-items-center orgnzCatBTNA pt-4 pb-4 transform transition duration-500 hover:bg-gray-300">
                  <Image
                    // loader ={() => LoginPageImage}
                    src={AllIcon}
                    alt='Picture of the author'
                    width={40}
                    height={40}
                  />
                  <span className="orgCatText">All</span>
                </div>
              </button>
              <button>
                <div className="grid justify-items-center orgnzCatBTN ml-2 mr-2 pt-2 transform transition duration-500 hover:bg-gray-300">
                  <Image
                    // loader ={() => LoginPageImage}
                    src={HumanRight}
                    alt='Picture of the author'
                    width={40}
                    height={40}
                  />
                  <span className="orgCatText">Human<br />Rights</span>
                </div>
              </button>
              <button>
                <div className="grid justify-items-center orgnzCatBTN pt-2 transform transition duration-500 hover:bg-gray-300">
                  <Image
                    // loader ={() => LoginPageImage}
                    src={foodRight}
                    alt='Picture of the author'
                    width={40}
                    height={40}
                  />
                  <span className="orgCatText">Food<br />Rights</span>
                </div>
              </button>
            </Section>
            <Section className="mt-2">
              <button>
                <div className="grid justify-items-center orgnzCatBTN pt-2 transform transition duration-500 hover:bg-gray-300">
                  <Image
                    // loader ={() => LoginPageImage}
                    src={animalRights}
                    alt='Picture of the author'
                    width={40}
                    height={40}
                  />
                  <span className="orgCatText">Animal<br />Rights</span>
                </div>
              </button>
              <button>
                <div className="grid justify-items-center orgnzCatBTN ml-2 mr-2 pt-2 transform transition duration-500 hover:bg-gray-300">
                  <Image
                    // loader ={() => LoginPageImage}
                    src={politicalCampain}
                    alt='Picture of the author'
                    width={40}
                    height={40}
                  />
                  <span className="orgCatText">Political<br />Campaigns</span>
                </div>
              </button>
              <button>
                <div className="grid justify-items-center orgnzCatBTN pt-2 transform transition duration-500 hover:bg-gray-300">
                  <Image
                    // loader ={() => LoginPageImage}
                    src={laberRightss}
                    alt='Picture of the author'
                    width={40}
                    height={40}
                  />
                  <span className="orgCatText">Labour<br />Rights</span>
                </div>
              </button>
            </Section>
          </SectionColumn> */}
        </div>
        <div className="becomeAOrg-responsive relative">
          <SectionRow className="relative z-10">
            <span className="becomeaOrgMainText">
              Become
              <br />a Organization
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

export default OrganizationLeftMenuCard;
