import { commentIcon, likeIcon, shearIcon2 } from "@/assetsLayer";
import { SectionColumn, SectionRow } from "@/layouts/section";
import Image from "next/image";

const renderPosts = (res: any) => {
  return res
    ? res.map((post: any) => {
      return (
        <span key={post} className="mt-5">
          <div className="postMainDivPublicProfile">
            <SectionRow className="p-4">
              <Image
                // loader ={() => LoginPageImage}
                src={post.profilepicture}
                alt="Picture of the author"
                width={45}
                height={45}
              />
              <SectionColumn className="mt-2 ml-2">
                <span className="eventSettingsNameText">{post.name}</span>
                <SectionRow>
                  <span className="previewEventSubTextTxt04">
                    {post.cratedDate}
                  </span>
                  <span className="previewEventSubTextTxt04">
                    &nbsp;at {post.cratedTime}
                  </span>
                </SectionRow>
              </SectionColumn>
              <SectionRow className="mt-1 ml-4">
                <span className="previewEventSubTextTxt04 mt-2 mr-2">
                  is
                </span>
                <div>
                  <Image
                    // loader ={() => LoginPageImage}
                    src={post.feelingIcon}
                    alt="Picture of the author"
                    width={35}
                    height={35}
                  />
                </div>
                <span className="previewEventSubTextTxt04 mt-2 ml-2 mr-2">
                  {post.feelingText}
                </span>
              </SectionRow>
            </SectionRow>
            <div className="postline01"></div>
            <SectionColumn className="mb-8 p-4">
              <span className="PostTitleText mt-4">{post.title}</span>
              <span className="PostDisText mt-8">{post.discription}</span>
            </SectionColumn>
            {post?.postImage ? (
              <div className="p-4">
                <Image
                  // loader ={() => LoginPageImage}
                  src={post.postImage}
                  alt="Picture of the author"
                  width={800}
                  height={350}
                />
              </div>
            ) : null}

            <div className="postline01"></div>
            <SectionRow className="pl-4 pt-2 pb-2 ">
              <Image
                // loader ={() => LoginPageImage}
                src={likeIcon}
                alt="Picture of the author"
                width={30}
                height={30}
              />
              <span className="PostDisText2 mt-1.5 mr-4">
                {post.likeCount}&nbsp;Likes
              </span>
              <Image
                // loader ={() => LoginPageImage}
                src={commentIcon}
                alt="Picture of the author"
                width={28}
                height={28}
              />
              <span className="PostDisText2 mt-1.5 mr-4">
                {post.commentCount}&nbsp;Comments
              </span>
              <Image
                // loader ={() => LoginPageImage}
                src={shearIcon2}
                alt="Picture of the author"
                width={28}
                height={28}
              />
              <span className="PostDisText2 mt-1.5">&nbsp;Share</span>
            </SectionRow>
          </div>
        </span>
      );
    })
    : null;
};