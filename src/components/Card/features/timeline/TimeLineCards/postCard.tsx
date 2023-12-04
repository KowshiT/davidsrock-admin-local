import React, { useState, useEffect } from "react";
import { likePostActionHandler } from "@/actionLayer/post/postActions";
import {
  commentIcon,
  likedIcon,
  likeIcon,
  placeholderImage,
  shearIcon2,
} from "@/assetsLayer";
import { getUserAccountType } from "@/helpers/authHelper";
import { displayLikeCount } from "@/helpers/commonHelpers";
import { getId } from "@/helpers/payloadHelper";
import { useAlerts } from "@/hooks/alertHook";
import { SectionColumn, SectionRow } from "@/layouts/section";
import { Emoji } from "emoji-picker-react";
import Image from "next/image";
import { ModalOpenCloseContext } from "@/contexts/modalContext/modalOpenCloseContext";
import DisplayLikesModal from "../../../../../components/Modal/timeline/DisplayLikesModal";
import { PostContext } from "@/contexts/postContext/postContext";
import ShareModal from "../../../../../components/Modal/share/ShareModal";

export interface PostCardProps {
  post: any;
  profileName: string;
  profileImage1: string;
  profileImage2?: string;
  isUserLogged?: boolean;
}

const PostCard: React.FC<PostCardProps> = (props) => {
  const { setAlert } = useAlerts();
  const [likeCount, setLikeCount] = useState(props.post.likeCount);
  const [initLikeCount, setInitLikeCount] = useState(props.post.likeCount);
  const [isLiked, setIsLiked] = useState(props.post.isLiked);
  const [initLikedState, setInitLikedState] = useState(props.post.isLiked);
  const [loggedProfileType, setLoggedProfileType] = useState("");
  const [shareTitle, setShareTitle] = useState<string>("Check out this Post!");
  const [url, setUrl] = useState("");

  const { setShareModal, displayLikesModal, setDisplayLikesModal } = React.useContext(ModalOpenCloseContext);
  const { selectedPostId, setSelectedPostId } = React.useContext(PostContext);

  useEffect(() => {
    setLikeCount(props.post.likeCount);
    setInitLikeCount(props.post.likeCount);
    setIsLiked(props.post.isLiked);
    setInitLikedState(props.post.isLiked);
    setLoggedProfileType(getUserAccountType())
  }, [])

  const likePostHandler = () => {
    if (isLiked) setLikeCount(likeCount - 1);
    if (!isLiked) setLikeCount(likeCount + 1);
    setIsLiked(!isLiked);

    let values = {
      postId: props.post.id,
      likedReferenceProfileId: getId(),
      likedProfileType: getUserAccountType(),
      isLike: !isLiked
    }
    console.log('values :>> ', values);

    likePostActionHandler(values)
      .then((res: any) => {
        console.log('res aaaaa :>> ', res);
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
    console.log('props.post.id :>> ', props.post.id);
    setDisplayLikesModal(true);
    setSelectedPostId(props.post.id)
  }

  const handleShareButton = (publicUrl, title: string) => {
    const shareURL = origin + '/' + publicUrl;
    setUrl(shareURL);
    setShareTitle(title);
    setShareModal(true);
  };

  return (
    <div className="mb-5">
      <div className="postMainDiv">
        <div className="flex flex-row p-4">
          {props.profileImage2 ? (
            <div className="imageWrapper w-[90px]">
              <Image
                src={props.profileImage1 || placeholderImage}
                alt="Picture of the author"
                width={45}
                height={45}
                className="profileViewPostProfileImage baseImage rounded-full ring ring-white"
              />
              <Image
                src={props.profileImage2 || placeholderImage}
                alt="Second image"
                width={45}
                height={45}
                className="profileViewPostProfileImage overlayImage rounded-full ring ring-white"
              />
            </div>
          ) : (
            <Image
              src={props.profileImage1 || placeholderImage}
              alt="Picture of the author"
              width={45}
              height={45}
              className="profileViewPostProfileImage rounded-full"
            />
          )}
          <div className="ml-2 flex-1">

            <span className="eventSettingsNameText">{props?.profileName || props.post.name}</span>

            {props?.post?.feeling?.emotion && (
              // <>
              //   <span className="previewEventSubTextTxt04 mr-2 ml-2">{" is feeling"}</span>
              //   <Emoji unified={props?.post?.feeling?.emoji} size={25} />
              //   <span className="previewEventSubTextTxt04 ml-2 mr-2">
              //     {props?.post?.feeling?.emotion || ""}
              //   </span>
              // </>
              <span className="previewEventSubTextTxt04">
                {" "}
                {"is feeling"}{" "}
                {String?.fromCodePoint(parseInt(props?.post?.feeling.emoji, 16))}{" "}
                {props?.post?.feeling?.emotion?.toLowerCase()}
              </span>
            )}
            <SectionRow>
              <span className="previewEventSubTextTxt04">
                {props?.post?.createdDate.slice(0, 10) || ""}
              </span>
              <span className="previewEventSubTextTxt04">
                &nbsp;at {props.post.createdDate.slice(11, 16) || ""}
              </span>
            </SectionRow>
          </div>
        </div>
        <div className="postline01"></div>
        <SectionColumn className="mb-2 px-4 pt-4">
          <span className="PostDisText mt-4">{props.post.description}</span>
        </SectionColumn>
        {props.post?.imagePathList[0].length > 0 ? (
          <div className="p-4">
            <Image
              src={props.post?.imagePathList[0]}
              alt="Picture of the author"
              width={800}
              height={350}
            />
          </div>
        ) : null}

        <div className="postline01"></div>
        <SectionRow className="items-center justify-around pl-4 pt-2 pb-2 ">
          <div className="flex flex-row">
            {props?.isUserLogged && loggedProfileType !== "PARTNERSHIP" && (
              <button onClick={() => likePostHandler()}>
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
                    width={30}
                    height={30}
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
                {props.post.commentCount}&nbsp;Comments
              </span>
            </SectionRow>
            <span className="tooltiptext">
              This option will be available soon
            </span>
          </div>

          <button onClick={(e: any) => handleShareButton(props?.post?.postPublicUrl, "Check out this post!")}                    >
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
      <ShareModal url={url} title={shareTitle} />
      {displayLikesModal && selectedPostId === props.post.id && <DisplayLikesModal post={props.post} />}
    </div>
  );
};
export default PostCard;
