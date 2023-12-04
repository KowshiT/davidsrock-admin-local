import React, { useMemo, useState, useEffect, useRef } from "react";
import Modal from "@mui/material/Modal";

import Uppy from "@uppy/core";
import ImageEditor from "@uppy/image-editor";
import XHRUpload from "@uppy/xhr-upload";
import { Dashboard } from "@uppy/react";

import "@uppy/core/dist/style.min.css";
import "@uppy/dashboard/dist/style.min.css";
import "@uppy/webcam/dist/style.min.css";
import "@uppy/image-editor/dist/style.css";

import { ModalOpenCloseContext } from "@/contexts/modalContext/modalOpenCloseContext";
import { modalCloseIcon } from "@/assetsLayer";
import { SectionRow } from "@/layouts/section";
import Image from "next/image";
import { ImageUploadDetailsContext } from "@/contexts/imageUploadContext/imageUploadContext";
import { API_BASE, IMAGE_UPLOAD_API } from "@/api/api_urls";
import { getProfileUploadTypeFromStorage } from "@/helpers/authHelper";

export interface Props {
  metadata?: any;
  title: string;

  handleAPI: any;
  uploadType: any;
}

const DashboardComponent = ({ uppy, type }) => (
  <Dashboard
    proudlyDisplayPoweredByUppy={false}
    uppy={uppy}
    plugins={["ImageEditor"]}
    className={
      type === "PROFILE_IMAGE"
        ? "custom-dashboard custom-inner-dashboard"
        : "custom-dashboard custom-object-fit-dashboard"
    }
  />
);

const ImageProfileUploadModal: React.FC<Props> = (props) => {
  const { imageProfileUploadModal, setImageProfileUploadModal } =
    React.useContext(ModalOpenCloseContext);
  const { setUploadImageFileId, setUploadImageFileName } = React.useContext(
    ImageUploadDetailsContext
  );
  const [uploadType, setUploadTpe] = useState("");
  const closeButtonRef = useRef(null);

  useEffect(() => {
    setUploadTpe(props.uploadType);
  }, [props.uploadType]);

  let actions = ["crop", "resize", "rotate"];

  const uppy = useMemo(() => {
    return new Uppy({
      restrictions: {
        // maxFileSize: 1000000,
        maxNumberOfFiles: 1,
        // minNumberOfFiles: 2,
        // dimensions: { width: 1200, height: 800 },
        allowedFileTypes: [".jpg", ".jpeg", ".png"],
      },
    })

      .use(XHRUpload, {
        timeout: 60 * 1000 * 10, // 10 minutes
        endpoint: `${API_BASE}/${IMAGE_UPLOAD_API}`,
        id: "uploader",
        method: "post",
        formData: true,
        fieldName: "file",
        headers: {},
      })
      .use(ImageEditor, {
        // @ts-ignore
        target: Uppy.Dashboard,
        quality: 0.8,
        // @ts-ignore
        aspectRatio: 1,
        // @ts-ignore
        actions,
      })
      .on("file-added", (file) => {
        file.meta = { ...file.meta };
      })
      .on("upload-success", (file, response) => {
        console.log("SUCCESS....... file :>> ", file);
        console.log("SUCCESS....... response :>> ", response);

        setUploadImageFileName(file.name);
        setUploadImageFileId(response?.body?.fileUrl);

        props.handleAPI(response?.body?.fileUrl);

        setTimeout(() => {
          const doneButton = document.querySelector(
            ".uppy-StatusBar-actionBtn--done"
          );
          if (doneButton) {
            closeButtonRef.current = doneButton;
            if (closeButtonRef.current) {
              closeButtonRef.current.click();

              setImageProfileUploadModal(false);
            }
          }
        }, 1000);
      })
      .on("complete", (result) => {
        console.log("successful files:================>", result);
      })
      .on("upload-error", (file, error) => {
        console.log("UPLOAD ERROR", error);
      });
  }, []);

  const handleClose = () => setImageProfileUploadModal(false);

  return (
    <div>
      <Modal
        open={imageProfileUploadModal}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        className="modalBackDrop"
      >
        <div className="modalStructureImageUpload">
          <SectionRow className="relative">
            <span className="modalsHedingText ml-8 mt-4">{props.title}</span>
            <button
              className="absolute right-5 mt-5 duration-500 hover:rotate-90 hover:opacity-100"
              onClick={(e: any) => handleClose()}
            >
              <Image
                src={modalCloseIcon}
                alt="Picture of the author"
                width={22}
                height={22}
              />
            </button>
          </SectionRow>
          {/* <div className='line mt-4 mb-3 w-full'></div> */}
          <div className="mt-4">
            <DashboardComponent uppy={uppy} type={uploadType} />
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default ImageProfileUploadModal;
