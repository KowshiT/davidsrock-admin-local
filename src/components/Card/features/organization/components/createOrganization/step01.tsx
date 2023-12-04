import {
  image11,
  image12,
  image13,
  image14,
  image15,
  image16,
} from "@/assetsLayer";
import RoundedButton from "../../../../../../components/Buttons/RoundedButtons";
import Section, { SectionRow } from "@/layouts/section";
import Image from "next/image";
import React, { useContext } from "react";
import { OrganizationCreateStageContext } from "@/contexts/organizationContext/organizationCreateStageContext";

export interface CreateOrganizationProps {}

const CreateOrganizationStep01: React.FC<CreateOrganizationProps> = (props) => {
  const { setOrganizationCreateStageCount } = useContext(
    OrganizationCreateStageContext
  );

  const handleNext = () => {
    setOrganizationCreateStageCount(6);
  };

  return (
    <React.Fragment>
      <div className="homeRightMainSec pb-4">
        <span className="createOrganizationTxt mt-8 grid justify-items-center">
          Choose the best plan for your
          <br />
          organization.
        </span>
        <section className="bg-white dark:bg-gray-900">
          <div className="max-w-screen-xl mx-auto py-8 px-4 lg:py-16 lg:px-6">
            <div className="space-y-8 sm:gap-6 lg:grid lg:grid-cols-3 lg:space-y-0 xl:gap-10">
              <div className="mx-auto flex max-w-lg flex-col rounded-lg border border-gray-100 bg-white p-6 text-center text-gray-900 shadow dark:border-gray-600 dark:bg-gray-800 dark:text-white xl:p-8">
                <h3 className="createOrganizationTxt02 !mt-3 !mb-4 text-2xl font-semibold">
                  Basic
                </h3>
                <div className="createOrganizationTxt03 mt-4">
                  Best option for personal use & for your next project.
                </div>
                <div className="my-8 flex items-baseline justify-center">
                  <span className="mr-2 text-4xl font-extrabold">$6.99</span>
                  <span className="text-gray-500 dark:text-gray-400">
                    /month
                  </span>
                </div>
                <ul role="list" className="mb-8 space-y-4 text-left">
                  <li className="flex items-center space-x-3">
                    <svg
                      className="h-5 w-5 flex-shrink-0 text-green-500 dark:text-green-400"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fill-rule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clip-rule="evenodd"
                      ></path>
                    </svg>
                    <span className="createOrganizationTxt03">
                      Groups : <span className="font-semibold">3</span>
                    </span>
                  </li>
                  <li className="flex items-center space-x-3">
                    <svg
                      className="h-5 w-5 flex-shrink-0 text-green-500 dark:text-green-400"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fill-rule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clip-rule="evenodd"
                      ></path>
                    </svg>
                    <span className="createOrganizationTxt03">
                      Unlimited Events
                    </span>
                  </li>
                  <li className="flex items-center space-x-3">
                    <svg
                      className="h-5 w-5 flex-shrink-0 text-green-500 dark:text-green-400"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fill-rule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clip-rule="evenodd"
                      ></path>
                    </svg>
                    <span className="createOrganizationTxt03">
                      Group & Event Promotion
                    </span>
                  </li>
                  <li className="flex items-center space-x-3">
                    <svg
                      className="h-5 w-5 flex-shrink-0 text-green-500 dark:text-green-400"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fill-rule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clip-rule="evenodd"
                      ></path>
                    </svg>
                    <span className="createOrganizationTxt03">
                      Assign Unlimited co-hosts
                    </span>
                  </li>
                  <li className="flex items-center space-x-3">
                    <svg
                      className="h-5 w-5 flex-shrink-0 text-green-500 dark:text-green-400"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fill-rule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clip-rule="evenodd"
                      ></path>
                    </svg>
                    <span className="createOrganizationTxt03">
                      Ticket fee and Group dues
                    </span>
                  </li>
                </ul>
                <button
                  className="createOrgnzGSBTN mt-3 mb-8 grid justify-items-center"
                  onClick={(e: any) => handleNext()}
                >
                  <SectionRow className="mt-2">
                    <span className="createOrgnzGSBTNText ml-4">
                      Get Started
                    </span>
                  </SectionRow>
                </button>
              </div>
              <div className="mx-auto flex max-w-lg flex-col rounded-lg border border-gray-100 bg-white p-6 text-center text-gray-900 shadow dark:border-gray-600 dark:bg-gray-800 dark:text-white xl:p-8">
                <h3 className="createOrganizationTxt02 !mt-3 !mb-4  text-2xl font-semibold">
                  Standard
                </h3>
                <div className="createOrganizationTxt03 mt-4">
                  Best option for personal use & for your next project.
                </div>
                <div className="my-8 flex items-baseline justify-center">
                  <span className="mr-2 text-4xl font-extrabold">$12.99</span>
                  <span className="text-gray-500 dark:text-gray-400">
                    /month
                  </span>
                </div>
                <ul role="list" className="mb-8 space-y-4 text-left">
                  <li className="flex items-center space-x-3">
                    <svg
                      className="h-5 w-5 flex-shrink-0 text-green-500 dark:text-green-400"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fill-rule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clip-rule="evenodd"
                      ></path>
                    </svg>
                    <span className="createOrganizationTxt03">
                      Groups : <span className="font-semibold">8</span>
                    </span>
                  </li>
                  <li className="flex items-center space-x-3">
                    <svg
                      className="h-5 w-5 flex-shrink-0 text-green-500 dark:text-green-400"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fill-rule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clip-rule="evenodd"
                      ></path>
                    </svg>
                    <span className="createOrganizationTxt03">
                      Unlimited Events
                    </span>
                  </li>
                  <li className="flex items-center space-x-3">
                    <svg
                      className="h-5 w-5 flex-shrink-0 text-green-500 dark:text-green-400"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fill-rule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clip-rule="evenodd"
                      ></path>
                    </svg>
                    <span className="createOrganizationTxt03">
                      Group & Event Promotion
                    </span>
                  </li>
                  <li className="flex items-center space-x-3">
                    <svg
                      className="h-5 w-5 flex-shrink-0 text-green-500 dark:text-green-400"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fill-rule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clip-rule="evenodd"
                      ></path>
                    </svg>
                    <span className="createOrganizationTxt03">
                      Assign Unlimited co-hosts
                    </span>
                  </li>
                  <li className="flex items-center space-x-3">
                    <svg
                      className="h-5 w-5 flex-shrink-0 text-green-500 dark:text-green-400"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fill-rule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clip-rule="evenodd"
                      ></path>
                    </svg>
                    <span className="createOrganizationTxt03">
                      Ticket fee and Group dues
                    </span>
                  </li>
                </ul>
                <button
                  className="createOrgnzGSBTN mt-3 mb-8 grid justify-items-center"
                  onClick={(e: any) => handleNext()}
                >
                  <SectionRow className="mt-2">
                    <span className="createOrgnzGSBTNText ml-4">
                      Get Started
                    </span>
                  </SectionRow>
                </button>
              </div>
              <div className="mx-auto flex max-w-lg flex-col rounded-lg border border-gray-100 bg-white p-6 text-center text-gray-900 shadow dark:border-gray-600 dark:bg-gray-800 dark:text-white xl:p-8">
                <h3 className="createOrganizationTxt02 !mt-3 !mb-4  text-2xl font-semibold">
                  Premium
                </h3>
                <div className="createOrganizationTxt03 mt-4">
                  Best option for personal use & for your next project.
                </div>
                <div className="my-8 flex items-baseline justify-center">
                  <span className="mr-2 text-4xl font-extrabold">$16.99</span>
                  <span className="text-gray-500 dark:text-gray-400">
                    /month
                  </span>
                </div>
                <ul role="list" className="mb-8 space-y-4 text-left">
                  <li className="flex items-center space-x-3">
                    <svg
                      className="h-5 w-5 flex-shrink-0 text-green-500 dark:text-green-400"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fill-rule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clip-rule="evenodd"
                      ></path>
                    </svg>
                    <span className="createOrganizationTxt03">
                      Groups : <span className="font-semibold">Unlimited</span>
                    </span>
                  </li>

                  <li className="flex items-center space-x-3">
                    <svg
                      className="h-5 w-5 flex-shrink-0 text-green-500 dark:text-green-400"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fill-rule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clip-rule="evenodd"
                      ></path>
                    </svg>
                    <span className="createOrganizationTxt03">
                      Unlimited Events
                    </span>
                  </li>
                  <li className="flex items-center space-x-3">
                    <svg
                      className="h-5 w-5 flex-shrink-0 text-green-500 dark:text-green-400"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fill-rule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clip-rule="evenodd"
                      ></path>
                    </svg>
                    <span className="createOrganizationTxt03">
                      Group & Event Promotion
                    </span>
                  </li>
                  <li className="flex items-center space-x-3">
                    <svg
                      className="h-5 w-5 flex-shrink-0 text-green-500 dark:text-green-400"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fill-rule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clip-rule="evenodd"
                      ></path>
                    </svg>
                    <span className="createOrganizationTxt03">
                      Assign Unlimited co-hosts
                    </span>
                  </li>
                  <li className="flex items-center space-x-3">
                    <svg
                      className="h-5 w-5 flex-shrink-0 text-green-500 dark:text-green-400"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fill-rule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clip-rule="evenodd"
                      ></path>
                    </svg>
                    <span className="createOrganizationTxt03">
                      Ticket fee and Group dues
                    </span>
                  </li>
                </ul>
                <button
                  className="createOrgnzGSBTN mt-3 mb-8 grid justify-items-center"
                  onClick={(e: any) => handleNext()}
                >
                  <SectionRow className="mt-2">
                    <span className="createOrgnzGSBTNText ml-4">
                      Get Started
                    </span>
                  </SectionRow>
                </button>
              </div>
            </div>
          </div>
        </section>
      </div>
    </React.Fragment>
  );
};

export default CreateOrganizationStep01;
