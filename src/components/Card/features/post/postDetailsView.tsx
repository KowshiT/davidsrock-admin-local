import { getPostPublicViewDetailActionHandler, likePostActionHandler } from "@/actionLayer/post/postActions";
import { commentIcon, greyBackground, likedIcon, likeIcon, placeholderImage, shearIcon2 } from "@/assetsLayer";
import DisplayLikesModal from "../../../../components/Modal/timeline/DisplayLikesModal";
import { ModalOpenCloseContext } from "@/contexts/modalContext/modalOpenCloseContext";
import { getUserAccountType, getUserIdFromStorage } from "@/helpers/authHelper";
import { displayLikeCount } from "@/helpers/commonHelpers";
import { convertDateTime, dateFormatForTimeLine, getUserTimeZone } from "@/helpers/dateHelpers";
import { useAlerts } from "@/hooks/alertHook";
import { SectionColumn, SectionRow } from "@/layouts/section";
import Image from "next/image";
import React, { useState, useEffect } from "react";
import { getId } from "@/helpers/payloadHelper";
import ShareModal from "../../../../components/Modal/share/ShareModal";
import { useRouter } from "next/router";

export interface PostDetailsViewProps {
}

const PostDetailsView: React.FC<PostDetailsViewProps> = (
  props
) => {
  const { setAlert } = useAlerts();
  const router = useRouter();

  const [postDetails, setPostDetails] = useState<any>({});
  const [url, setUrl] = useState("");
  const [userCurrentTimeZone, setUserCurrentTimeZone] = useState("");
  const [isUserLogged, setIsUserLogged] = useState(false);
  const [isDataLoading, setIsDataLoading] = useState(true);
  const [formattedTime, setFormattedTime] = useState("");
  const [likeCount, setLikeCount] = useState(0);
  const [initLikeCount, setInitLikeCount] = useState(0);
  const [isLiked, setIsLiked] = useState(false);
  const [initLikedState, setInitLikedState] = useState(false);
  const [shareTitle, setShareTitle] = useState<string>("Check out this Post!");
  const [loggedProfileType, setLoggedProfileType] = useState("");

  const { displayLikesModal, setDisplayLikesModal, setShareModal } = React.useContext(ModalOpenCloseContext);

  useEffect(() => {
    const userTimeZone = getUserTimeZone();
    setUserCurrentTimeZone(userTimeZone);
    setLoggedProfileType(getUserAccountType())

    if (getUserIdFromStorage()) {
      setIsUserLogged(true);
    } else {
      setIsUserLogged(false);
    }

    const currentUrl = window.location.href;
    setUrl(currentUrl);

    let values = {
      postPublicUrl: currentUrl,
      loggedProfileRefernceId: getId(),
      loggedProfileType: getUserAccountType()
    };

    getPostPublicViewDetailActionHandler(values)
      .then((res: any) => {
        if (res?.responseCode === "00") {
          setPostDetails(res.postsDto[0]);
          setIsDataLoading(false);
          setIsLiked(res.postsDto[0].isLiked);
          setInitLikedState(res.postsDto[0].isLiked);
          setLikeCount(res.postsDto[0].likeCount);
          setInitLikeCount(res.postsDto[0].likeCount);
          console.log('res 111:>> ', res);
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
  }, []);

  const handleShareButton = (title: string) => {
    setShareTitle(title);
    setShareModal(true);
  };

  useEffect(() => {
    if (postDetails.createdDate) {
      let dateValue = convertDateTime(postDetails?.createdDate?.slice(0, 19), userCurrentTimeZone);
      setFormattedTime(dateFormatForTimeLine(dateValue));
    }
  }, [postDetails])

  const likePostHandler = () => {
    if (isLiked) setLikeCount(likeCount - 1);
    if (!isLiked) setLikeCount(likeCount + 1);
    setIsLiked(!isLiked);

    let values = {
      postId: postDetails.id,
      likedReferenceProfileId: getId(),
      likedProfileType: getUserAccountType(),
      isLike: !isLiked
    }
    console.log('values :>> ', values);

    likePostActionHandler(values)
      .then((res: any) => {
        if (res?.responseCode === "00") {
          setIsLiked(!isLiked);
        } else if (res?.responseMessage) {
          setLikeCount(initLikeCount);
          setIsLiked(initLikedState);
          setAlert({
            message: res?.responseMessage,
            severity: "error",
          });
        } else {
          setLikeCount(initLikeCount);
          setIsLiked(initLikedState);
          setAlert({
            message: "Error!",
            severity: "error",
          });
        }
        return res;
      })
      .catch((error) => {
        setLikeCount(initLikeCount);
        setIsLiked(initLikedState);
        setAlert({
          message: "Error!",
          severity: "error",
        });
        return error;
      });
  }

  const displayLikes = () => {
    setDisplayLikesModal(true);
  }

  const handleViewProfiles = (url) => {
    window.open(`/${url}`, "_blank");
  };

  const redirectToLogin = () => {
    setAlert({
      message: "You haven't logged in to the system. Please log in or sign up!",
      severity: "error",
    });
    router.push("/auth");
  }

  const renderPostImage = () => {
    if (isDataLoading) {
      return (
        <div className="p-4">
          <Image
            src={greyBackground}
            alt="Picture of the author"
            width={800}
            height={350}
          />
        </div>
      )
    } else if (postDetails?.imagePathList[0].length > 0) {
      return (
        <div className="p-4">
          <Image
            src={postDetails?.imagePathList[0]}
            alt="Picture of the author"
            width={800}
            height={350}
          />
        </div>
      )
    } else {
      return null;
    }
  }

  return (
    <div className="mb-5 w-full">
      <div className="postPublicViewMainDiv">
        <div className="flex flex-row p-4">
          <button onClick={() => handleViewProfiles(postDetails.publicUrl)}>
            {postDetails?.createdByProfileType === "PARTNERSHIP" ? (
              <div className="imageWrapper w-[90px]">
                <Image
                  src={postDetails.participant1Image || placeholderImage}
                  alt="Picture of the author"
                  width={45}
                  height={45}
                  className="profileViewPostProfileImage baseImage rounded-full ring ring-white"
                />
                <Image
                  src={postDetails.participant2Image || placeholderImage}
                  alt="Second image"
                  width={45}
                  height={45}
                  className="profileViewPostProfileImage overlayImage rounded-full ring ring-white"
                />
              </div>
            ) : (
              <Image
                src={postDetails.createdByImage || placeholderImage}
                alt="Picture of the author"
                width={45}
                height={45}
                className="profileViewPostProfileImage rounded-full"
              />
            )}
          </button>
          <div className="ml-2 flex-1">
            <button onClick={() => handleViewProfiles(postDetails.publicUrl)}>
              <span className="eventSettingsNameText">{postDetails?.createdBy}</span>
            </button>
            {postDetails?.feeling?.emotion && (
              <span className="previewEventSubTextTxt04">
                {" "}
                {"is feeling"}{" "}
                {String?.fromCodePoint(parseInt(postDetails?.feeling.emoji, 16))}{" "}
                {postDetails?.feeling?.emotion?.toLowerCase()}
              </span>
            )}
            <SectionRow>
              <span className="previewEventSubTextTxt04">
                {formattedTime}
              </span>
            </SectionRow>
          </div>
        </div>
        <div className="postline01"></div>
        <SectionColumn className="mb-2 px-4 pt-4">
          <span className="PostDisText mt-4">{postDetails?.description}</span>
        </SectionColumn>
        {renderPostImage()}
        <div className="postline01"></div>
        <SectionRow className="items-center justify-around pl-4 pt-2 pb-2 ">
          <div className="flex flex-row">
            {loggedProfileType !== "PARTNERSHIP" && (
              <button className="cursor-pointer"
                onClick={() => isUserLogged ? likePostHandler() : redirectToLogin()}>
                {isLiked ? (
                  <Image
                    src={likedIcon}
                    alt="Picture of the author"
                    width={28}
                    height={28}
                  />
                ) : (
                  <Image
                    src={likeIcon}
                    alt="Picture of the author"
                    width={28}
                    height={28}
                  />)}
              </button>
            )}
            <button onClick={() => displayLikes()}>
              <span className="PostDisText2 mt-1.5 mr-4">{displayLikeCount(likeCount)}</span>
            </button>
          </div>
          <div className="tooltipX">
            <SectionRow className="cursor-default">
              <Image
                src={commentIcon}
                alt="Picture of the author"
                width={28}
                height={28}
              />
              <span className="PostDisText2 mt-1.5 mr-4">
                {postDetails?.commentCount}&nbsp;Comments
              </span>
            </SectionRow>
            <span className="tooltiptext">
              This option will be available soon
            </span>
          </div>

          <button
            onClick={(e: any) => handleShareButton("Check out this post!")}
          >
            <SectionRow className="cursor-pointer">
              <Image
                src={shearIcon2}
                alt="Picture of the author"
                width={28}
                height={28}
              />
              <span className="PostDisText2 mt-1.5">&nbsp;Share</span>
            </SectionRow>
          </button>
        </SectionRow>
      </div>
      {displayLikesModal && <DisplayLikesModal post={postDetails} />}
      <ShareModal url={url} title={shareTitle} />
    </div>
  );
};

export default PostDetailsView;
