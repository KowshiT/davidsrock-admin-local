import React, { useState, useContext, useEffect } from "react";
import "swiper/css";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import { ModalOpenCloseContext } from "@/contexts/modalContext/modalOpenCloseContext";
import { SectionColumn } from "@/layouts/section";
import Image from "next/image";
import { closeButtonNew, placeholderImage } from "@/assetsLayer";

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  borderRadius: 5,
  p: 2,
};
export interface Props {
  imageList: any;
  selectedImageId: any;
}

const ImageSliderPopup: React.FC<Props> = (props) => {
  const { imageSlider, setImageSlider } = useContext(ModalOpenCloseContext);
  const [selectedImage, setSelectedImage] = useState(null);

  const handleCloseImageSlider = () => setImageSlider(false);

  const image = props.imageList.find(
    (detail: any) => detail.imageId === props.selectedImageId
  );

  useEffect(() => {
    setSelectedImage(image);
  }, [])

  useEffect(() => { }, [props.imageList]);

  return (
    <Modal
      open={imageSlider}
      onClose={handleCloseImageSlider}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
      sx={{
        backdropFilter: "blur(15px)",
      }}
    >
      <div>
        <Box sx={style}>
          <SectionColumn className="grid justify-items-center ">
            <div className="large-dialog-success relative pt-4">
              <button
                onClick={(e: any) => handleCloseImageSlider()}
                className="modalcloseBTN opacity-100 duration-500 hover:rotate-90 hover:scale-110 hover:opacity-100"
              >
                <div className="">
                  <Image
                    src={closeButtonNew}
                    alt="Picture of the author"
                    width={30}
                    height={30}
                  />
                </div>
              </button>
              <SectionColumn className="h-full w-full items-center justify-between p-5">
                <div className="bg-gif flex w-full">
                  <div className="mx-auto justify-center align-middle">
                    <Image
                      src={selectedImage || placeholderImage}
                      alt="Picture of the author"
                      width={110}
                      height={110}
                      className="baseImage orgListViewProfileImage ml-5 rounded-full ring ring-white"
                    />
                  </div>
                </div>
              </SectionColumn>
            </div>
          </SectionColumn>
        </Box>
      </div>
    </Modal>
  );
};

export default ImageSliderPopup;
