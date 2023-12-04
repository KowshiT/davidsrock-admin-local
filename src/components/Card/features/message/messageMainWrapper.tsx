import React, { FC } from "react";
import MessageLeftCard from "./messageLeftCard";
import MessageRightCard from "./messageRightCard";

export interface MessageMainWrapperProps {}

const MessageMainWrapper: React.FC<MessageMainWrapperProps> = () => {
  return (
    <React.Fragment>
      <div className="sub-Wrapper-container">
        <MessageLeftCard />
        <MessageRightCard />
      </div>
    </React.Fragment>
  );
};

export default MessageMainWrapper;
