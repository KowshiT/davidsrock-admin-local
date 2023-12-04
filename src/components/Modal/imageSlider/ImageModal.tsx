import React, { useEffect, useState } from "react";
import Modal from "@mui/material/Modal";
import { useImageSliderModal } from "@/contexts/modalContext/imageModalProvider";
import { BsChevronCompactLeft, BsChevronCompactRight } from "react-icons/bs";
import { AiOutlineClose, AiOutlineExpand } from "react-icons/ai";

const ImageModal = ({ images }) => {
  const { isModalOpen, closeModal, currentIndex, nextSlide, prevSlide } =
    useImageSliderModal();

  const handleKeyDown = (event) => {
    if (event.key === "ArrowLeft") {
      prevSlide();
    } else if (event.key === "ArrowRight") {
      nextSlide();
    }
  };

  useEffect(() => {
    const handleKeyPress = (event) => {
      handleKeyDown(event);
    };

    window.addEventListener("keydown", handleKeyPress);

    return () => {
      window.removeEventListener("keydown", handleKeyPress);
    };
  }, [prevSlide, nextSlide]);

  return (
    <Modal
      open={isModalOpen}
      onClose={closeModal}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
      sx={{
        backdropFilter: "blur(10px)",
      }}
    >
      <div className="image-slider-container">
        <div className="image-slider-wrapper group">
          <img
            src={images[currentIndex]?.imagePath || ""}
            className={` image-fade h-full w-full rounded-2xl object-cover`}
            alt={`Image ${currentIndex + 1}`}
            style={{
              transition: "opacity 0.5s ease-in-out",
              opacity: 1,
            }}
          />
          {/*left Arrow */}
          {currentIndex !== 0 && (
            <div className="">
              <BsChevronCompactLeft
                size={40}
                className="absolute top-[50%] left-5 hidden -translate-x-0 translate-y-[-50%] cursor-pointer rounded-full bg-black/30 p-2 text-2xl text-white group-hover:block"
                onClick={(e: any) => {
                  prevSlide();
                }}
              />
            </div>
          )}
          {/*right Arrow */}
          {images.length !== 1 && (
            <div className="">
              <BsChevronCompactRight
                size={40}
                className="absolute right-5 top-[50%] hidden -translate-x-0 translate-y-[-50%] cursor-pointer rounded-full bg-black/30 p-2 text-2xl text-white group-hover:block"
                onClick={(e: any) => {
                  nextSlide();
                }}
              />
            </div>
          )}
          {/*close button */}
          <div className="">
            <AiOutlineClose
              size={40}
              className="absolute left-5 top-5 hidden cursor-pointer rounded-full bg-black/30 p-2 text-2xl text-white group-hover:block"
              onClick={(e: any) => {
                closeModal();
              }}
            />
          </div>

          <div className="absolute top-5 right-5 flex flex-row">
            {/*expand button */}
            <div className="">
              <AiOutlineExpand
                size={40}
                className="hidden cursor-pointer rounded-full bg-black/30 p-2 text-2xl text-white group-hover:block"
                onClick={(e: any) => {
                  window.open(images[currentIndex]?.imagePath, "_blank");
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default ImageModal;
