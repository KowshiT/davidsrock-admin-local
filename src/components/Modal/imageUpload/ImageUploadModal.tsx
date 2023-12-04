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
import { useAlerts } from "@/hooks/alertHook";
// import { getTokenApi } from '@/api/imageUpload/imageUpload';

export interface Props {
  metadata?: any;
  uploadType?: string;
  title: string;
}

const ImageUploadModal: React.FC<Props> = (props) => {
  const closeButtonRef = useRef(null);
  const { setAlert } = useAlerts();

  const { imageUploadModal, setImageUploadModal } = React.useContext(
    ModalOpenCloseContext
  );
  const { setUploadImageFileId, setUploadImageFileName } = React.useContext(
    ImageUploadDetailsContext
  );

  const [token, setToken] = useState("");

  let actions = ["crop", "resize", "rotate"];

  // const handleTokenGet = async () => {
  //   const response = await getTokenApi();
  //   console.log('response :>> ', response?.access_token);
  //   setToken(response?.access_token)
  //   return response;
  // }

  const uppy = useMemo(() => {
    return new Uppy({
      restrictions: {
        // maxFileSize: 1000000,
        maxNumberOfFiles: 1,
        // minNumberOfFiles: 2,
        // dimensions: { width: 1200, height: 800 },
        allowedFileTypes: [".jpg", ".jpeg", ".png"],
      },
      // @ts-ignore
      // onBeforeUpload: () => {
      //   handleTokenGet()
      // }
    })
      .use(XHRUpload, {
        timeout: 60 * 1000 * 10, // 10 minutes
        endpoint: `${API_BASE}/${IMAGE_UPLOAD_API}`,
        id: "uploader",
        method: "post",
        formData: true,
        fieldName: "file",
        headers: {
          // authorization: `${sessionStorage.getItem('ACCESSTOKEN')}`,
          // authorization: token,
          // authorization: `Bearer eyJhbGciOiJIUzM4NCJ9.eyJzdWIiOiJ3b2JlbXlwaUBseWZ0LmxpdmUiLCJhdXRob3JpdGllcyI6W3siYXV0aG9yaXR5IjoiRU5EX1VTRVIifV0sImlhdCI6MTY5Mzk0ODU2MywiZXhwIjoxNjkzOTQ4NjgzfQ.b_tuLDTR2nToZDWkqWWX6jbVfH-seELOM_zSgACnJNH5QF7AQjrK-uAG_BDEkmZN`
        },
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
        file.meta = { ...file.meta, ...props.metadata };
      })
      .on("upload-success", (file, response) => {
        console.log("SUCCESS....... file :>> ", file);
        console.log("SUCCESS....... response :>> ", response);

        setUploadImageFileName(file.name);
        setUploadImageFileId(response?.body?.fileUrl);

        // setTimeout(() => {
        //   const btn_done = document.querySelector('.uppy-StatusBar-actionBtn--done');
        //   if (btn_done) {
        //     console.log('aaaaaa :>> ');
        //     btn_done.addEventListener('click', function () {
        //       alert('Button clicked!');
        //     });
        //   }
        // }, 500);

        // setImageUploadModal(false);

        setTimeout(() => {
          const doneButton = document.querySelector(
            ".uppy-StatusBar-actionBtn--done"
          );
          if (doneButton) {
            closeButtonRef.current = doneButton;
            if (closeButtonRef.current) {
              closeButtonRef.current.click();
              setAlert({
                message: "Image Uploaded Successfully.",
                severity: "success",
              });
              setImageUploadModal(false);
            }
          }
        }, 1000);
      })
      .on("complete", (result) => {
        console.log("successful files:", result);
        // setTimeout(() => {
        //   const btn_done = document.querySelector('.uppy-StatusBar-actionBtn--done');
        //   if (btn_done) {
        //     btn_done.addEventListener('click', () => { console.log("btn_done clicked. complete") });
        //   }
        // }, 500);
      })
      .on("upload-error", (file, error) => {
        console.log("UPLOAD ERROR", error);
      });
  }, []);

  const handleClose = () => setImageUploadModal(false);

  return (
    <div>
      <Modal
        open={imageUploadModal}
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
            <Dashboard
              proudlyDisplayPoweredByUppy={false}
              uppy={uppy}
              plugins={["ImageEditor"]}
              className="custom-dashboard"
            />
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default ImageUploadModal;
