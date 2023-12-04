import Section, { SectionRow } from "@/layouts/section";
import React, { useState, useEffect, useContext } from "react";
import PhotoViewModal from "../../../../../../components/Modal/organization/photoViewModal";
import { ModalOpenCloseContext } from "@/contexts/modalContext/modalOpenCloseContext";
import AddaNewImageModal from "../../../../../../components/Modal/organization/addanewImageModal";
import { getGalleryImagesActionHandler } from "@/actionLayer/organization/organizationActions";
import Loader from "../../../../../../components/Modal/LoadingModal";
import { useAlerts } from "@/hooks/alertHook";
import AddPhotoAlternateIcon from "@mui/icons-material/AddPhotoAlternate";
import { getProfileId } from "@/helpers/authHelper";
import { stringCrop } from "@/helpers/stringCrop";
import { BsFillArrowRightCircleFill } from "react-icons/bs";

export interface OrganizationPhotosProps {
  profileType?: string;
  profileOrPartnershipId?: any;
  isCreator?: any;
}

const OrganizationPhotos: React.FC<OrganizationPhotosProps> = (props) => {
  //   const [events, setEvents] = useState(props.events)
  const { setAlert } = useAlerts();

  const [clickedPhoto, setClickedPhoto] = useState();
  const [loaderOpen, setLoaderOpen] = useState(false);
  const [imageList, setImageList] = useState<any>({});

  const { setPhotoViewModal, setAddNewImageModal } = useContext(
    ModalOpenCloseContext
  );

  useEffect(() => {
    let values = {
      profileOrPartnershipId: props.profileOrPartnershipId,
      profileType: props.profileType,
    };

    getGalleryImagesActionHandler(values)
      .then((res: any) => {
        setImageList(res.galleryEntityList);
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
  }, []);

  const handlePhotoViewModalOpen = (data: any) => {
    setClickedPhoto(data);
    setPhotoViewModal(true);
  };

  const renderPhotos = (data: any) => {
    return (
      <div
        className="show-uploaded-image-container mb-5 ml-2 mr-2 mt-2 block w-3/12 max-w-[18rem] transform rounded-lg bg-white shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] transition duration-500 hover:scale-105 hover:cursor-pointer dark:bg-neutral-700"
        onClick={(e: any) => handlePhotoViewModalOpen(data)}
        onKeyDown={(e: any) => {
          if (e.key === 'Enter') {
            e.preventDefault();
            handlePhotoViewModalOpen(data);
          }
        }}
        role="button"
        tabIndex={0}
      >
        <div className="relative overflow-hidden bg-cover bg-no-repeat">
          <img
            className="show-uploaded-image rounded-t-lg"
            src={data.imagePath}
            alt=""
          />
        </div>
        <div className="pt-2 pl-2 pr-2 pb-2">
          <p className="previewEventSubTextTxt06">
            {stringCrop(data.imageDescription, 130)}
          </p>
          <div className="mt-2">
            <p className="previewEventSubTextTxt07">
              {/* {data.PostBy} | {data.postat} */}
            </p>
          </div>
        </div>
        <div className="absolute bottom-0 right-0 my-auto mb-2 mr-2 mt-3 flex flex-row items-center align-middle">
          <p className="previewEventSubTextTxt07-blue mr-1">See More</p>
          <BsFillArrowRightCircleFill
            style={{ color: "#2cd1ef", fontSize: "13px" }}
          />
        </div>
      </div>
    );
  };

  return (
    <div className="orgDownMainSec">
      <SectionRow className="flex w-full justify-end pr-8">
        {props.profileOrPartnershipId === getProfileId() && (
          <div className="">
            {imageList.length > 0 && (
              <button
                className="createNewItemsBTN grid justify-items-center"
                onClick={(e: any) => {
                  setAddNewImageModal(true);
                }}
              >
                <SectionRow className="mt-2">
                  <AddPhotoAlternateIcon color="action" />
                  <span className="createItemText ml-2">Upload Photos</span>
                </SectionRow>
              </button>
            )}
          </div>
        )}
      </SectionRow>
      <br />
      <Section className="flex justify-around">
        {imageList.length > 0 ? (
          imageList.map((data) => renderPhotos(data))
        ) : (
          <div className=" mt-8 mb-8 grid w-full justify-items-center">
            <div className=" mt-8 mb-8 grid w-full justify-items-center">
              {props.profileOrPartnershipId === getProfileId() && (
                <button
                  className="createNewItemsBTN grid justify-items-center"
                  onClick={(e: any) => {
                    setAddNewImageModal(true);
                  }}
                >
                  <SectionRow className="mt-2">
                    <AddPhotoAlternateIcon color="action" />
                    <span className="createItemText ml-2">Upload Photos</span>
                  </SectionRow>
                </button>
              )}
              <span className="eventMainText mt-4">
                {props.isCreator ? "No any uploads." : "Not yet uploads"}
              </span>
            </div>
          </div>
        )}
      </Section>
      <PhotoViewModal photoDetails={clickedPhoto} />
      <AddaNewImageModal
        profileType={props.profileType}
        profileOrPartnershipId={getProfileId()}
      />
      <Loader loaderText={""} open={loaderOpen} />
    </div>
  );
};

export default OrganizationPhotos;
