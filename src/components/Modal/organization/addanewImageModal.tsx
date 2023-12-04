import React, { useContext, useState } from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Image from "next/image";
import { ModalOpenCloseContext } from "@/contexts/modalContext/modalOpenCloseContext";
import { SectionColumn } from "@/layouts/section";
import { closeButtonNew } from "@/assetsLayer";
import { Form, Formik, FormikHelpers, FormikProps } from "formik";
import { photoUploadValuesInit } from "@/actionLayer/_index";
import { photoUploadValues } from "@/types/types";
import TextField2 from "../../../components/Inputs/TextField2";
import { photoUploadValidation } from "@/helpers/validation/formikValidation";
import TextAreaField from "../../../components/Inputs/TextAreaField";
import RoundedButton from "../../../components/Buttons/RoundedButtons";
import AddAPhotoIcon from "@mui/icons-material/AddAPhoto";
import ImageUploadModal from "../imageUpload/ImageUploadModal";
import { ImageUploadDetailsContext } from "@/contexts/imageUploadContext/imageUploadContext";
import { uploadGalleryImageActionHandler } from "@/actionLayer/organization/organizationActions";
import { useAlerts } from "@/hooks/alertHook";
import Loader from "../LoadingModal";
import { useRouter } from "next/router";

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  borderRadius: 5,
  p: 2,
};

export interface Props {
  profileType?: string;
  profileOrPartnershipId?: any;
}

const AddaNewImageModal: React.FC<Props> = (props) => {
  const { setAlert } = useAlerts();
  const router = useRouter();

  const [loaderOpen, setLoaderOpen] = useState(false);

  const { addNewImageModal, setAddNewImageModal } = useContext(
    ModalOpenCloseContext
  );
  const { setImageUploadModal } = React.useContext(ModalOpenCloseContext);
  const { uploadImageFileId, setUploadImageFileId } = React.useContext(ImageUploadDetailsContext);

  const handleClose = () => {
    setAddNewImageModal(false);
    setUploadImageFileId("");
  };

  const handleSubmit = (values: photoUploadValues, actions: FormikHelpers<photoUploadValues>) => {
    setLoaderOpen(true);

    values.imagePath = uploadImageFileId;
    values.profileType = props.profileType;
    values.profileOrPartnershipId = props.profileOrPartnershipId;

    console.log("values :>> ", values);

    if (uploadImageFileId === null || uploadImageFileId === "" || uploadImageFileId === undefined) {
      setLoaderOpen(false);
      setAlert({
        message: "Upload image",
        severity: "error",
      });
    } else {
      uploadGalleryImageActionHandler(values)
        .then((res: any) => {
          if (res?.responseCode === "00") {
            setLoaderOpen(false);
            setAddNewImageModal(false);
            setUploadImageFileId("");
            setAlert({
              message: "Image uploaded!",
              severity: "success",
            });
            router.reload();
          } else {
            setLoaderOpen(false);
            setAlert({
              message: "Error!",
              severity: "error",
            });
          }
          return res;
        })
        .catch((error) => {
          setLoaderOpen(false);
          setAlert({
            message: error,
            severity: "error",
          });
          return error;
        });
    }
  };

  return (
    <div>
      <Modal
        open={addNewImageModal}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        sx={{
          backdropFilter: "blur(15px)",
        }}
      >
        <div>
          <Box sx={style}>
            <SectionColumn className="grid justify-items-center ">
              <div className="photoViewSecDIV relative p-5">
                <div className="photoViewSubDIV py-4">
                  <button
                    onClick={(e: any) => handleClose()}
                    className="modalcloseBTN opacity-100 duration-500 hover:rotate-90 hover:scale-110 hover:opacity-100"
                  >
                    <Image
                      src={closeButtonNew}
                      alt="Picture of the author"
                      width={30}
                      height={30}
                    />
                  </button>
                  <div className="organizationDetailsOptionText4 mt-5 mb-5 grid justify-items-center">
                    Upload a new image
                  </div>

                  <Formik
                    initialValues={photoUploadValuesInit}
                    onSubmit={handleSubmit}
                    validationSchema={photoUploadValidation}
                  >
                    {(formik: FormikProps<photoUploadValues>) => (
                      <div className="mt-6 grid justify-items-center">
                        <Form>
                          <SectionColumn className=" mb-3">
                            <span className="textinputtitle ">Title</span>
                            <TextField2
                              type="text"
                              name="imageTitle"
                              className="imageUplaodInput01"
                              placeholder="Image Title"
                              onChange={formik.handleChange}
                              onBlur={formik.handleBlur}
                              value={formik.values.imageTitle}
                            />
                          </SectionColumn>
                          <SectionColumn className=" mb-3">
                            <span className="textinputtitle ">
                              Description
                            </span>
                            <TextAreaField
                              placeholder="Describe your image. People will see this on your organization profile. Please write at least 100 characters."
                              className="inputBaseInput imageUplaodInput02"
                              name="imageDescription"
                              maxLength={200}
                              onChange={formik.handleChange}
                              onBlur={formik.handleBlur}
                              value={formik.values.imageDescription}
                            />
                          </SectionColumn>
                          <SectionColumn className=" mb-3">
                            <span className="textinputtitle ">
                              Image Upload
                            </span>
                            <div className="imageUploadInput03 d-flex justify-content-center align-items-center mt-2">
                              {uploadImageFileId ? (
                                <Image
                                  src={uploadImageFileId}
                                  alt="Picture of the author"
                                  width={150}
                                  height={100}
                                  className="orgDetailsViewAddNewImage"
                                />
                              ) : (
                                <button
                                  type="button"
                                  onClick={(e: any) => {
                                    setImageUploadModal(true);
                                  }}
                                >
                                  <AddAPhotoIcon />
                                </button>
                              )}
                            </div>
                          </SectionColumn>
                          <div className="mt-4 grid justify-items-center">
                            <RoundedButton
                              ref={undefined}
                              onClick={undefined}
                              className="addaNewButtonBTN"
                              type="submit"
                            >
                              Upload
                            </RoundedButton>
                          </div>
                        </Form>
                      </div>
                    )}
                  </Formik>
                </div>
              </div>
            </SectionColumn>
          </Box>
        </div>
      </Modal>
      <ImageUploadModal title="Upload a new image" />
      <Loader loaderText={""} open={loaderOpen} />
    </div>
  );
};

export default AddaNewImageModal;
