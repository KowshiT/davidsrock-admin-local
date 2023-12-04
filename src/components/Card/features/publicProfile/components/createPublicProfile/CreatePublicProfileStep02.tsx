import { Form, Formik, FormikHelpers, FormikProps, FieldArray } from "formik";
import { DeleteImg, PlusImg } from "@/assetsLayer";
import RoundedButton from "../../../../../../components/Buttons/RoundedButtons";
import { SectionColumn, SectionRow } from "@/layouts/section";
import Image from "next/image";
import React, { useContext, useState, useEffect } from "react";
import { PublicProfileCreateStageContext } from "@/contexts/publicProfileContext/createPublicProfileStageContext";
import { CreatePublicProfileContext } from "@/contexts/publicProfileContext/createPublicProfileContext";
import { PublicProfileInterestValuesInit } from "@/actionLayer/_index";
import { PublicProfileInterestValues } from "@/types/types";
import TextField2 from "../../../../../../components/Inputs/TextField2";

export interface CreatePublicProfileProps { }

const CreatePublicProfileStep02: React.FC<CreatePublicProfileProps> = (props) => {
  const [count, setCount] = useState(1);
  const [initValues, setInitValues] = useState<PublicProfileInterestValues>(PublicProfileInterestValuesInit);

  const { setPublicProfileCreateStageCount } = useContext(PublicProfileCreateStageContext);
  const { publicProfileName, publicProfileInterests, setPublicProfileInterests } = useContext(CreatePublicProfileContext);

  useEffect(() => {
    console.log('initValues :>> ', initValues);
    console.log('publicProfileInterests :>> ', publicProfileInterests);
    console.log('publicProfileInterests.length :>> ', publicProfileInterests.length);
    if (publicProfileInterests.interests?.length > 0) {
      setInitValues(publicProfileInterests);
    }
  }, [])

  const initialInterests = [""];

  const handleBack = () => {
    setPublicProfileCreateStageCount(1)
  }

  const handleSubmit = (values: PublicProfileInterestValues, actions: FormikHelpers<PublicProfileInterestValues>) => {
    console.log('values :>> ', values);
    console.log('publicProfileName :>> ', publicProfileName);
    setPublicProfileCreateStageCount(3);
    setPublicProfileInterests(values);
  }

  return (
    <React.Fragment>
      <div className="homeRightMainSec2 pb-4">
        <div className="grid justify-items-center ">
          <span className="createOrganizationTxt mt-8">
            Let's get started with a few details<br />about your Public Profile.
          </span>
          <br />
          <span className="createOrganizationTxt04 mt-8 mb-8">
            Add your interests to display on your profile.
          </span>
          <Formik
            initialValues={initValues}
            enableReinitialize
            onSubmit={handleSubmit}
          // validationSchema={PublicProfileInterestValidation}
          >
            {(formik: FormikProps<PublicProfileInterestValues>) => (
              <Form>
                <div className="grid justify-items-center mt-6">

                  <SectionColumn className='grid justify-items-start'>
                    <span className="textinputtitle ml-12">Interests</span>
                    <FieldArray name='interests'>
                      {({ push, remove }) => (
                        <div>
                          {formik.values.interests.map((_, index) => (
                            <SectionRow className='w-max mb-0 justify-center pr-2 ' key={index}>
                              {formik.values.interests.length - 1 === index ? (
                                (index > 3 ? <div className="ml-10 w-1.5"></div>
                                  : <span
                                    className='mt-5 mr-4'
                                    onClick={() => {
                                      push(initialInterests);
                                      setCount(index + 2);
                                    }}>
                                    <Image
                                      // loader ={() => LoginPageImage}
                                      src={PlusImg}
                                      alt='Picture of the author'
                                      width={30}
                                    />
                                  </span>
                                )
                              ) : (
                                <div style={{ width: "46px", height: "35px" }}></div>
                              )}

                              <TextField2
                                placeholder="Enter Your Interests"
                                className="inputBaseInput organizationNameInput"
                                type="text"
                                name={`interests.${index}`}
                                maxLength={50}
                                error={`${formik.errors.interests}}.${index}`}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                value={formik.values.interests[index]}
                              />

                              {formik.values.interests.length > 1 && (
                                <span
                                  className='mt-5 ml-4'
                                  onClick={() => {
                                    remove(index);
                                    setCount(count - 1);
                                  }}>
                                  <Image
                                    // loader ={() => LoginPageImage}
                                    src={DeleteImg}
                                    alt='Picture of the author'
                                    width={25}
                                    height={25}
                                  />
                                </span>
                              )}
                            </SectionRow>
                          ))}
                        </div>
                      )}
                    </FieldArray>
                  </SectionColumn>


                  <SectionRow className="ml-4 mt-8">
                    <RoundedButton
                      ref={undefined}
                      onClick={(e: any) => {
                        handleBack();
                      }}
                      className="BackBTN mr-3"
                    >
                      Back
                    </RoundedButton>

                    <RoundedButton
                      ref={undefined}
                      onClick={undefined}
                      className="NextBTN"
                      type="submit"
                      disabled={formik.isSubmitting}
                    >
                      Next
                    </RoundedButton>
                  </SectionRow>
                </div>
              </Form>
            )}
          </Formik>

          <br />
        </div>
      </div>
    </React.Fragment>
  );
};

export default CreatePublicProfileStep02;
