import React, { useState, useEffect } from "react";
import Modal from "@mui/material/Modal";
import Image from "next/image";
import { ModalOpenCloseContext } from "@/contexts/modalContext/modalOpenCloseContext";
import { SectionColumn, SectionRow } from "@/layouts/section";
import { likedIcon, modalCloseIcon, placeholderImage } from "@/assetsLayer";
import { useAlerts } from "@/hooks/alertHook";
import { getLikeDetailsActionHandler } from "@/actionLayer/post/postActions";
import { stringCrop } from "@/helpers/stringCrop";
import { PostContext } from "@/contexts/postContext/postContext";

export interface Props {
  post: any;
}

const DisplayLikesModal: React.FC<Props> = (props) => {

  const [likes, setLikes] = useState<any>({});
  const [isLoading, setIsLoading] = useState(true);

  const { displayLikesModal, setDisplayLikesModal } = React.useContext(ModalOpenCloseContext);
  const { setSelectedPostId } = React.useContext(PostContext);

  const { setAlert } = useAlerts();

  useEffect(() => {
    setIsLoading(true);
    console.log('props.post :>> ', props.post);
    let values = {
      postId: props.post.id,
      likesDetailSize: 1000000
    }

    getLikeDetailsActionHandler(values)
      .then((res: any) => {
        console.log('res :>> ', res);
        if (res?.responseCode === "00") {
          setIsLoading(false);
          setLikes(res?.postsDto);
        } else if (res?.responseMessage) {
          setIsLoading(false);
          setAlert({
            message: res?.responseMessage,
            severity: "error",
          });
        }
        return res;
      })
      .catch((error) => {
        setIsLoading(false);
        console.log('error :>> ', error);
        setAlert({
          message: "Error!",
          severity: "error",
        });
        return error;
      });
  }, []);

  const handleCloseMenuBar = () => {
    setDisplayLikesModal(false);
    setSelectedPostId(0);
  }

  const renderLikedProfileSkeleton = () => {
    return (
      <div className="flex w-full flex-col items-start px-2">
        <div className="w-full">
          <div className="grid w-full transform rounded-md py-2 transition duration-1000 hover:bg-gray-200">
            <SectionRow className="w-full items-center px-2">
              <Image
                src={placeholderImage}
                alt="Picture of the author"
                width={30}
                height={30}
                className="menubarProfileImage rounded-full ring ring-white mr-3"
              />
              <div className="skeleton skeleton-title rounded mt-2"></div>
            </SectionRow>
          </div>
          <div className="grid w-full transform rounded-md py-2 transition duration-1000 hover:bg-gray-200">
            <SectionRow className="w-full items-center px-2">
              <Image
                src={placeholderImage}
                alt="Picture of the author"
                width={30}
                height={30}
                className="menubarProfileImage rounded-full ring ring-white mr-3"
              />
              <div className="skeleton skeleton-title rounded mt-2"></div>
            </SectionRow>
          </div>
        </div>
      </div>
    )
  }

  const renderLikedProfiles = () => {
    return (
      likes?.length > 0 ? (
        <div className="">
          <div className="flex w-full flex-col items-start px-2">
            {likes?.map((like, i) => (
              <div key={like.publicUrl} className="w-full">
                <button
                  className="grid w-full transform rounded-md py-2 transition duration-1000 hover:bg-gray-200 "
                  onClick={undefined}
                >
                  <SectionRow className="w-full items-center px-2">
                    <Image
                      src={like?.createdByImage || placeholderImage}
                      alt="Picture of the author"
                      width={30}
                      height={30}
                      className="menubarProfileImage rounded-full ring ring-white"
                    />
                    <span className="h3-black-12-text ml-3">
                      {stringCrop(like?.createdBy, 30)}
                    </span>
                  </SectionRow>
                </button>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div className="mt-4 mb-8 grid w-full justify-items-center">
          <span className="landingPageText03 text-center mt-4">No Likes</span>
        </div>
      )
    )
  }

  return (
    <div>
      <Modal
        open={displayLikesModal}
        onClose={handleCloseMenuBar}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        className="modalShadow"
      >
        <div className="modalStructureSelectProfie modalShadow p-4">
          <div className="modalContent">
            <SectionColumn>
              <SectionRow className="MenuHeaderContainer w-full items-center justify-between">
                <div className="flex flex-row items-center">
                  <div className="mr-2">
                    <Image
                      src={likedIcon}
                      alt="Picture of the author"
                      width={25}
                      height={25}
                    />
                  </div>
                  <span className="h3-black-13-text">Likes</span>
                </div>
                <button
                  className="right-0 duration-500 hover:rotate-90 hover:opacity-100"
                  onClick={(e: any) => handleCloseMenuBar()}
                >
                  <Image
                    src={modalCloseIcon}
                    alt="Picture of the author"
                    width={15}
                    height={15}
                  />
                </button>
              </SectionRow>
              {isLoading ? (
                renderLikedProfileSkeleton()
              ) : (
                renderLikedProfiles()
              )}
            </SectionColumn>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default DisplayLikesModal;
