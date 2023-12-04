import React, { useState, useEffect } from "react";
import Image from "next/image";
import { likedIcon, likeIcon } from "@/assetsLayer";
import { displayLikeCount } from "@/helpers/commonHelpers";
import { likePostActionHandler } from "@/actionLayer/post/postActions";
import { getId } from "@/helpers/payloadHelper";
import { getUserAccountType } from "@/helpers/authHelper";
import { useAlerts } from "@/hooks/alertHook";
import { ModalOpenCloseContext } from "@/contexts/modalContext/modalOpenCloseContext";
import DisplayLikesModal from "../../../../../components/Modal/timeline/DisplayLikesModal";
import { PostContext } from "@/contexts/postContext/postContext";

export interface TimelinePostLikeButtonProps {
  post: any;
}

const TimelinePostLikeButton: React.FC<TimelinePostLikeButtonProps> = (props) => {
  const { setAlert } = useAlerts();
  const [likeCount, setLikeCount] = useState(props.post.likeCount);
  const [initLikeCount, setInitLikeCount] = useState(props.post.likeCount);
  const [isLiked, setIsLiked] = useState(props.post.isLiked);
  const [initLikedState, setInitLikedState] = useState(props.post.isLiked);
  const [loggedProfileType, setLoggedProfileType] = useState("");

  const { displayLikesModal, setDisplayLikesModal } = React.useContext(ModalOpenCloseContext);
  const { selectedPostId, setSelectedPostId } = React.useContext(PostContext);

  useEffect(() => {
    setLikeCount(props.post.likeCount);
    setInitLikeCount(props.post.likeCount);
    setIsLiked(props.post.isLiked);
    setInitLikedState(props.post.isLiked);
    setLoggedProfileType(getUserAccountType())
  }, [])

  const likePostHandler = (post) => {
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
        console.log('res :>> ', res);
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
    console.log('props.post :>> ', props.post);
    setDisplayLikesModal(true);
    setSelectedPostId(props.post.id)
  }

  return (
    <>
      <div className="flex flex-row">
        {loggedProfileType !== "PARTNERSHIP" && (
          <button className="cursor-pointer"
            onClick={() => likePostHandler(props.post)}>
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
          <span className="PostDisText2 mt-1.5">&nbsp;{displayLikeCount(likeCount)}</span>
        </button>
      </div>
      {displayLikesModal && selectedPostId === props.post.id && <DisplayLikesModal post={props.post} />}
    </>
  );
};

export default TimelinePostLikeButton;
