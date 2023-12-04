
import { animalRights, foodRight, HumanRight, laberRightss, politicalCampain } from "@/assetsLayer";
import RoundedButton from "../../../../../../components/Buttons/RoundedButtons";
import Section, { SectionRow } from "@/layouts/section";
import Image from "next/image";
import React, { useContext, useEffect, useState } from "react";
import { OrganizationCreateStageContext } from "@/contexts/organizationContext/organizationCreateStageContext";
import { CreateOrganizationContext } from "@/contexts/organizationContext/createOrganizationContext";
import { useAlerts } from "@/hooks/alertHook";

export interface CreateOrganizationProps { }

const CreateOrganizationStep03: React.FC<CreateOrganizationProps> = (props) => {
  const { setAlert } = useAlerts();
  const [category, setCategory] = useState<any>('');

  const { setOrganizationCreateStageCount } = useContext(OrganizationCreateStageContext);
  const { organizationCategory, setOrganizationCategory } = useContext(CreateOrganizationContext);

  useEffect(() => {
    if (organizationCategory) {
      setCategory(organizationCategory);
    }
  }, [])

  const handleNext = () => {
    if (category) {
      setOrganizationCreateStageCount(3);
      setOrganizationCategory(category);
    } else {
      setAlert({
        message: "Please select a category.",
        severity: "error",
      });
    }
  }

  const handleBack = () => {
    setOrganizationCreateStageCount(1)
  }

  return (
    <div className="homeRightMainSec2 pb-4">
      <div className="grid justify-items-center ">
        <span className="createOrganizationTxt mt-8">
          Let's get started with a few details<br />about your organization.
        </span>
        <br />
        <span className="createOrganizationTxt04 mt-8 mb-8">
          Choose a category that describes what type of business, organization or<br />topic the page represents.
        </span>
        <Section>
          <button onClick={() => setCategory('HUMAN_RIGHTS')}>
            <div className={category === 'HUMAN_RIGHTS' ? `grid justify-items-center orgnzCatBTNASelectOrgCreate ml-2 mr-2 pt-2 transform transition duration-500` : `grid justify-items-center orgnzCatBTNAOrgCreate ml-2 mr-2 pt-2 transform transition duration-500 hover:bg-gray-300`}>
              <Image
                src={HumanRight}
                alt='Picture of the author'
                width={40}
                height={40}
              />
              <span className="orgCatText">Human<br />Rights</span>
            </div>
          </button>
          <button onClick={() => setCategory('FOOD_RIGHTS')}>
            <div className={category === 'FOOD_RIGHTS' ? `grid justify-items-center orgnzCatBTNASelectOrgCreate mr-2 pt-2 transform transition duration-500` : `grid justify-items-center orgnzCatBTNAOrgCreate mr-2 pt-2 transform transition duration-500 hover:bg-gray-300`}>
              <Image
                src={foodRight}
                alt='Picture of the author'
                width={40}
                height={40}
              />
              <span className="orgCatText">Food<br />Rights</span>
            </div>
          </button>
          <button onClick={() => setCategory('ANIMAL_RIGHTS')}>
            <div className={category === 'ANIMAL_RIGHTS' ? `grid justify-items-center orgnzCatBTNASelectOrgCreate mr-2 pt-2 transform transition duration-500` : `grid justify-items-center orgnzCatBTNAOrgCreate mr-2 pt-2 transform transition duration-500 hover:bg-gray-300`}>
              {/* <div className="grid justify-items-center orgnzCatBTNA pt-2 transform transition duration-500 hover:bg-gray-300"> */}
              <Image
                src={animalRights}
                alt='Picture of the author'
                width={40}
                height={40}
              />
              <span className="orgCatText">Animal<br />Rights</span>
            </div>
          </button>
        </Section>
        <Section className="mt-2 mb-8">
          <button onClick={() => setCategory('POLITICAL_CAMPAIGNS')}>
            <div className={category === 'POLITICAL_CAMPAIGNS' ? `grid justify-items-center orgnzCatBTNASelectOrgCreate mr-2 pt-2 transform transition duration-500` : `grid justify-items-center orgnzCatBTNAOrgCreate mr-2 pt-2 transform transition duration-500 hover:bg-gray-300`}>
              {/* <div className="grid justify-items-center orgnzCatBTNA ml-2 mr-2 pt-2 transform transition duration-500 hover:bg-gray-300"> */}
              <Image
                src={politicalCampain}
                alt='Picture of the author'
                width={40}
                height={40}
              />
              <span className="orgCatText">Political<br />Campaigns</span>
            </div>
          </button>
          <button onClick={() => setCategory('LABOUR_RIGHTS')}>
            <div className={category === 'LABOUR_RIGHTS' ? `grid justify-items-center orgnzCatBTNASelectOrgCreate mr-2 pt-2 transform transition duration-500` : `grid justify-items-center orgnzCatBTNAOrgCreate mr-2 pt-2 transform transition duration-500 hover:bg-gray-300`}>
              {/* <div className="grid justify-items-center orgnzCatBTNA pt-2 transform transition duration-500 hover:bg-gray-300"> */}
              <Image
                src={laberRightss}
                alt='Picture of the author'
                width={40}
                height={40}
              />
              <span className="orgCatText">Labor<br />Rights</span>
            </div>
          </button>
        </Section>

        <SectionRow className="mt-8">
          <RoundedButton
            type="submit"
            ref={undefined}
            onClick={(e: any) => {
              handleBack()
            }}
            className='BackBTN mr-3'>
            Back
          </RoundedButton>
          <RoundedButton
            type="submit"
            ref={undefined}
            onClick={(e: any) => {
              handleNext()
            }}
            className="NextBTN"
          >
            Next
          </RoundedButton>
        </SectionRow>
        <br />
      </div>
    </div>
  );
};

export default CreateOrganizationStep03;
