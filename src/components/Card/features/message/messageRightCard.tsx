import React, { useState } from "react";
import MessageUserHead from "./components/messageUserHead";
import OppositeUserContent from "./components/oppositeUserContent";
import SendMessageContent from "./components/sendMessageContent";
import UserMessageContent from "./components/userMessageContent";

export interface MessageRightCardProps {}

const MessageRightCard: React.FC<MessageRightCardProps> = () => {
  const [message, setMessage] = useState();

  return (
    <React.Fragment>
      <div className="message-right-card-container">
        <MessageUserHead />

        <div className="right-inner-container-message">
          <OppositeUserContent />
          <UserMessageContent />
          <OppositeUserContent />
          <UserMessageContent />
          <OppositeUserContent />
          <UserMessageContent />
          <OppositeUserContent />
          <UserMessageContent />
          <UserMessageContent />
          <OppositeUserContent />
          <OppositeUserContent />
        </div>

        <SendMessageContent message={message} setMessage={setMessage} />
      </div>
    </React.Fragment>
  );
};
export default MessageRightCard;
