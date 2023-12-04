import { Form, Formik, FormikHelpers, FormikProps, FieldArray } from "formik";
import { DeleteImg, PlusImg } from "@/assetsLayer";
import RoundedButton from "../../../../../../components/Buttons/RoundedButtons";
import { SectionColumn, SectionRow } from "@/layouts/section";
import Image from "next/image";
import React, { useContext, useState, useEffect } from "react";
import { PublicProfileCreateStageContext } from "@/contexts/publicProfileContext/createPublicProfileStageContext";
import { CreatePublicProfileContext } from "@/contexts/publicProfileContext/createPublicProfileContext";
import { PublicProfileNetworkValuesInit } from "@/actionLayer/_index";
import { PublicProfileNetwokValues } from "@/types/types";
import TextField2 from "../../../../../../components/Inputs/TextField2";
import { PublicProfileNetworksValidation } from "@/helpers/validation/formikValidation";
import { networkList } from "@/helpers/selectionDropDownHelper";
import SelectionDropDown from "../../../../../../components/Inputs/SelectDropDown";

export interface CreatePublicProfileProps { }

const CreatePublicProfileStep06: React.FC<CreatePublicProfileProps> = (props) => {
  const [count2, setCount2] = useState(1);
  const [initValues, setInitValues] = useState<PublicProfileNetwokValues>(PublicProfileNetworkValuesInit);

  const { setPublicProfileCreateStageCount } = useContext(PublicProfileCreateStageContext);
  const { publicProfileNetworks, setPublicProfileNetworks } = useContext(CreatePublicProfileContext);

  useEffect(() => {
    console.log('initValues :>> ', initValues);
    console.log('publicProfileNetworks :>> ', publicProfileNetworks);
    if (publicProfileNetworks.networkRequests?.length > 0) {
      setInitValues(publicProfileNetworks);
    }
  }, [])

  const networkRequests = {
    networkType: "",
    link: "",
  };

  const handleBack = () => {
    setPublicProfileCreateStageCount(3)
  }

  const handleSubmit = (values: PublicProfileNetwokValues, actions: FormikHelpers<PublicProfileNetwokValues>) => {
    console.log('values :>> ', values);
    setPublicProfileCreateStageCount(5);
    setPublicProfileNetworks(values);
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
            Add your social media networks to display on your profile.
          </span>
          <Formik
            enableReinitialize
            initialValues={initValues}
            onSubmit={handleSubmit}
            validationSchema={PublicProfileNetworksValidation}
          >
            {(formik: FormikProps<PublicProfileNetwokValues>) => (
              <Form>
                <div className="grid justify-items-center mt-6">

                  <SectionColumn className=" mb-3 mt-2">
                    <span className="textinputtitle ml-12">Website</span>
                    <FieldArray name='networkRequests'>
                      {({ push, remove }) => (
                        <div>
                          {formik.values.networkRequests.map((_, index) => (
                            <SectionRow className='w-max mb-0 justify-center pr-2 ' key={index}>
                              {formik.values.networkRequests.length - 1 === index ? (
                                (index > 2 ? <div className="ml-10 w-1.5"></div>
                                  : <span
                                    className='mt-5 mr-4'
                                    onClick={() => {
                                      push(networkRequests);
                                      setCount2(index + 2);
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

                              <SelectionDropDown
                                placeholder='Select Network'
                                className="inputBaseInput organizationNameInputShort mr-4"
                                name={`networkRequests.${index}.networkType`}
                                type='text'
                                options={networkList}
                                value={formik.values.networkRequests[index]?.networkType}
                                error={`${formik.errors.networkRequests}.${index}.networkType}`}
                                onChange={(value: any) =>
                                  formik.setFieldValue(`networkRequests.${index}.networkType`, value)
                                }
                              />
                              <TextField2
                                placeholder='Link'
                                className="inputBaseInput organizationNameInputShort mt-1"
                                type='text'
                                name={`networkRequests.${index}.link`}
                                error={`${formik.errors.networkRequests}.${index}.link}`}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                value={formik.values.networkRequests[index]?.link}
                              />

                              {formik.values.networkRequests.length > 1 && (
                                <span
                                  className='mt-5 ml-4'
                                  onClick={() => {
                                    remove(index);
                                    setCount2(count2 - 1);
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

export default CreatePublicProfileStep06;
