import React, { useState, useEffect, useContext } from "react";
import { SectionColumn, SectionRow } from "@/layouts/section";
import Image from "next/image";
import { greyBackground, save, threeDots } from "@/assetsLayer";
import { getSavedPostsActionHandler, savePostActionHandler } from "@/actionLayer/save/saveActions";
import { useAlerts } from "@/hooks/alertHook";
import { getId } from "@/helpers/payloadHelper";
import { getUserAccountType } from "@/helpers/authHelper";
import { sinceDateConverter } from "@/helpers/dateHelpers";
import { useRouter } from "next/router";
import { stringCrop } from "@/helpers/stringCrop";
import { ModalOpenCloseContext } from "@/contexts/modalContext/modalOpenCloseContext";
import SavedPostViewModal from "../../../../../components/Modal/adminDashboard/SavedPostViewModal";

export interface SavedPostsProps {
}

const SavedPosts: React.FC<SavedPostsProps> = (props) => {
  const [showOptionPopup, setShowOptionPopup] = useState(false);
  const [savePostDetails, setSavePostDetails] = useState<any>({});
  const [isLoading, setIsLoading] = useState(true);
  const [postId, setPostId] = useState("");
  const [selectedPost, setSelectedPost] = useState<any>({});

  const { savedPostViewModal, setSavedPostViewModal } = useContext(ModalOpenCloseContext);

  const { setAlert } = useAlerts();
  const router = useRouter();

  useEffect(() => {
    let values = {
      saveEntityId: getId(),
      saveType: getUserAccountType(),
      page: 0,
      size: 1000
    }

    getSavedPostsActionHandler(values)
      .then((res: any) => {
        if (res?.responseCode === "00") {
          console.log('res :>> ', res);
          setSavePostDetails(res?.postList);
          setIsLoading(false);
        } else {
          setAlert({
            message: "Error!",
            severity: "error",
          });
        }
        return res;
      })
      .catch((error) => {
        setAlert({
          message: "Error!",
          severity: "error",
        });
        return error;
      });
  }, [])

  const handleUnsavePost = (id) => {
    let values = {
      postId: id,
      saveEntityId: getId(),
      saveType: getUserAccountType(),
      isSave: false
    }
    console.log('values :>> ', values);

    savePostActionHandler(values)
      .then((res: any) => {
        if (res?.responseCode === "00") {
          setShowOptionPopup(!showOptionPopup);
          router.reload();
          setAlert({
            message: "Event unsaved!",
            severity: "success",
          });
        } else if (res?.responseMessage) {
          setShowOptionPopup(!showOptionPopup);
          setAlert({
            message: res?.responseMessage,
            severity: "error",
          });
        } else {
          setShowOptionPopup(!showOptionPopup);
          setAlert({
            message: "Error!",
            severity: "error",
          });
        }
        return res;
      })
      .catch((error) => {
        setAlert({
          message: "Error!",
          severity: "error",
        });
        return error;
      });
  }

  const handleOptionsPopup = (post) => {
    console.log('post.id :>> ', post.id);
    setPostId(post.id);
    setShowOptionPopup(!showOptionPopup);
  }

  const viewPostHandler = (post) => {
    window.open(`/${post.postPublicUrl}`, "_blank");
  }

  const renderSavePost = (detail) => {
    return (
      <button className="savedItemCard relative" onClick={() => viewPostHandler(detail)}>
        <div className="relative">
          <Image
            src={detail.imagePathList[0] || greyBackground}
            alt='Picture of the author'
            width={150}
            height={90}
            className="savedItemsImage"
          />
        </div>
        <SectionColumn className="mt-4 w-[50%]">
          <div className="savedItemCardMainText">{stringCrop(detail.description, 25)}</div>
          <div className="savedPostCardEventText mt-2">
            {detail.createdBy}
          </div>
          <div className="savedItemCardSaveTimeText mt-2">
            <SectionRow>
              <div className="blueDot mr-1"></div>{sinceDateConverter(detail?.createdDate)}
            </SectionRow>
          </div>
        </SectionColumn>
        <button className="absolute top-2 right-0 pr-2"
          onClick={(e) => {
            e.stopPropagation();
            handleOptionsPopup(detail);
          }}>
          <Image
            src={threeDots}
            alt='Picture of the author'
            width={35}
            height={35}
          />
        </button>
        {(showOptionPopup && postId === detail?.id) && (
          <div className="optionsPopup">
            <SectionColumn className="mt-5 ml-5 mr-5">
              <button className="mb-4" onClick={(e) => {
                e.stopPropagation();
                handleUnsavePost(detail?.id);
              }}>
                <SectionRow>
                  <Image
                    src={save}
                    alt='Picture of the author'
                    width={15}
                    height={15}
                  />
                  <p className="previewEventSubTextTxt04 ml-4">Unsave</p>
                </SectionRow>
              </button>

            </SectionColumn>
          </div>
        )}
      </button>
    )
  }

  const renderSavePostSkeleton = () => {
    return (
      <div className="savedItemCard relative">
        <div className="relative">
          <div className="savedItemsImage skeleton"></div>
        </div>
        <SectionColumn className="ml-2 mt-2 w-[200px]">
          <div className="savedItemCardMainText skeleton"></div>
          <div className="savedItemCardEventText mt-2 skeleton skeleton-full-width"></div>
          <div className="savedItemCardEventText mt-2 skeleton skeleton-full-width"></div>
          <div className="savedItemCardEventText mt-2 skeleton skeleton-full-width"></div>
        </SectionColumn>
      </div>
    )
  }

  const isPostsAvailableChecker = () => {
    return (savePostDetails.length > 0 ?
      savePostDetails?.map((detail) =>
        renderSavePost(detail)
      ) : (
        <div className="noSavedItemsSec">
          <span className="eventMainText mt-4">
            You don't have any saved Posts.
          </span>
        </div>
      )
    )
  }

  return (
    <div className="saveItemsDownMainSec">
      <div className="savedItemCardList">
        {isLoading ? (
          renderSavePostSkeleton()
        ) : (
          isPostsAvailableChecker()
        )}
      </div>
      {savedPostViewModal && (
        <SavedPostViewModal post={selectedPost} />
      )}
    </div>
  );
};

export default SavedPosts;
