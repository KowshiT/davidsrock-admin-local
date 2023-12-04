import { placeholderImage } from "@/assetsLayer";
import { useImageSliderModal } from "@/contexts/modalContext/imageModalProvider";
import SectionRow from "@/layouts/section";
import Image from "next/image";
import React from "react";

export interface Props {
  imageList: any;
}

const ImagesWrapperCard: React.FC<Props> = (props) => {
  const { openModal, setImages } = useImageSliderModal();
  setImages(props.imageList);

  const renderEventList = (detail: any, index: number) => {
    return (
      <SectionRow className="image-margin w-1/3">
        <div
          className="image-container-all cursor-pointer"
          onClick={(e: any) => openModal(index)}
        >
          <img
            src={detail.imagePath || placeholderImage}
            alt="Picture of the author"
            className="image-styles"
          />
        </div>
      </SectionRow>
    );
  };

  const imageListLength = props.imageList.length;

  return (
    <React.Fragment>
      <span className="timelineText01 pl-2">Photos</span>
      <div
        className={
          props.imageList && props.imageList.length > 0
            ? "imagesCard mt-4"
            : "imagesCard mt-4 flex"
        }
      >
        {props.imageList && props.imageList.length > 0 ? (
          <div className="flex h-full flex-row flex-wrap ">
            {props.imageList
              .slice(0, 8)
              .map((detail: any, index: number) =>
                renderEventList(detail, index)
              )}

            {imageListLength > 8 && (
              <div
                className="image-margin w-1/3 cursor-pointer bg-[#ebeef4]"
                onClick={(e: any) => openModal(0)}
              >
                <div className="image-container-all flex justify-center">
                  <p className="h3-dark-gray-13-text-500 m-auto">View All</p>
                </div>
              </div>
            )}
          </div>
        ) : (
          <span className="h3-dark-gray-13-text mx-auto my-auto items-center justify-center">
            No Photos
          </span>
        )}
      </div>
    </React.Fragment>
  );
};
export default ImagesWrapperCard;
