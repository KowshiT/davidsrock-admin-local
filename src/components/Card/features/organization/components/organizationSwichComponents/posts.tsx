import React, { useState, useEffect } from "react";
import { getPostsInProfileActionHandler } from "@/actionLayer/post/postActions";
import PostCard from "../../../timeline/TimeLineCards/postCard";
import { useAlerts } from "@/hooks/alertHook";
import { SectionColumn, SectionRow } from "@/layouts/section";
import { placeholderImage } from "@/assetsLayer";
import Image from "next/image";
import { getId } from "@/helpers/payloadHelper";
import { getUserAccountType } from "@/helpers/authHelper";

export interface PostsProps {
  referenceId: any;
  profileType: string;
  profileName: string;
  profileImage1: string;
  profileImage2?: string;
  isCreator?: any;
  isUserLogged?: boolean;
}

const Posts: React.FC<PostsProps> = (props) => {
  const [postDetails, setPostDetails] = useState<any>({});
  const [isLoading, setIsLoading] = useState(true);

  const { setAlert } = useAlerts();

  useEffect(() => {
    let values = {
      referenceId: props.referenceId,
      profileType: props.profileType,
      loggedProfileRefernceId: getId(),
      loggedProfileType: getUserAccountType()
    }

    getPostsInProfileActionHandler(values)
      .then((res: any) => {
        if (res?.responseCode === "00") {
          console.log("posts res :>> ", res);
          setPostDetails(res?.postResponseDto);
          setIsLoading(false);
        } else {
          setAlert({
            message: "Network Error!",
            severity: "error",
          });
        }
        return res;
      })
      .catch((error) => {
        setAlert({
          message: error,
          severity: "error",
        });
        return error;
      });

  }, [])

  const isPostAvailableChecker = () => {
    return (
      postDetails.length > 0 ?
        postDetails?.map((detail) =>
          <PostCard
            post={detail}
            key={detail.id}
            profileName={props?.profileName}
            profileImage1={props?.profileImage1}
            profileImage2={props?.profileImage2}
            isUserLogged={props?.isUserLogged}
          />
        ) : (
          <div className="follower-wrapper">
            <div className=" mt-8 mb-8 grid w-full justify-items-center">
              <span className="eventMainText mt-4">{props.isCreator ? "You don't have any posts created." : "Not yet any posts."}</span>
            </div>
          </div>
        )
    )
  }

  return (
    <div className="postCardScroll">
      {isLoading ? (
        <div className="postMainDiv">
          <SectionRow className="p-4">
            <Image
              src={placeholderImage}
              alt="Picture of the author"
              width={45}
              height={45}
              className="rounded-full"
            />
            <SectionColumn className="mt-2 ml-2">
              <span className="eventSettingsNameText">
              </span>
              <SectionRow>
                <span className="previewEventSubTextTxt04">
                </span>
                <span className="previewEventSubTextTxt04">
                </span>
              </SectionRow>
            </SectionColumn>
            <SectionRow className="mt-1 ml-4">
              <div className="skeleton skeleton-title rounded mt-1"></div>
              <div className="skeleton skeleton-text rounded text-white">
                ut labore et dolore magna aliqua.Aliquet lectus proin nibh nisl
              </div>
            </SectionRow>
          </SectionRow>
          <div className="postline01"></div>
          <SectionColumn className="mb-8 p-4">
            <span className="skeleton skeleton-text rounded mt-8"></span>
            <span className="skeleton skeleton-text rounded mt-1"></span>
            <span className="skeleton skeleton-text rounded mt-1"></span>
            <span className="skeleton skeleton-text rounded mt-1"></span>
          </SectionColumn>
          <div className="postline01"></div>
          <SectionRow className="pl-4 pt-2 pb-2 ">
            <div className="skeleton skeleton-title rounded mt-1"></div>
          </SectionRow>
        </div>
      ) : (
        isPostAvailableChecker()
      )}
    </div>
  );
};

export default Posts;
