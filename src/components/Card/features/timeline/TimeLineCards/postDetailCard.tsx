import Image from "next/image";
import React from "react";

export interface EventProps {
  post: any;
  handleImageLoad: Function;
  isLoading: any;
}

const TimeLinePostCard: React.FC<EventProps> = (props) => {
  return (
    <div className="">
      <div className="flex w-full flex-row"></div>
      <span className="PostDisText mt-2">
        {props.post?.description ? props.post?.description : ""}
      </span>

      {props.post.imagePathList[0] !== '' && (
        <div className="py-4">
          <Image
            // loader ={() => LoginPageImage}
            src={props.post.imagePathList[0]}
            alt="Picture of the author"
            width={800}
            height={350}
            onLoad={props.handleImageLoad()}
            style={{ opacity: props.isLoading ? 0 : 1 }}
            className="timeline-img"
          />
        </div>
      )}
    </div>
  );
};
export default TimeLinePostCard;
