import React, { useState, useRef } from "react";
import EmojiPicker, { EmojiStyle, EmojiClickData } from "emoji-picker-react";
import { usePopper } from "react-popper";
import RoundedButton from "../../../../../components/Buttons/RoundedButtons";
import { sendMessageIcon } from "@/assetsLayer";

export interface SendMessageContentProps {
  height?: any;
  width?: any;
  message: any; // Add the message prop
  setMessage: (value: any) => void; // Add the setMessage prop
}

const SendMessageContent: React.FC<SendMessageContentProps> = (
  { message, setMessage },
  props
) => {
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const emojiPickerRef = useRef(null);
  const [popperElement, setPopperElement] = React.useState(null);
  const [referenceElement, setReferenceElement] = React.useState(null);

  const handleEmojiSelect = (emojiData: EmojiClickData, event: MouseEvent) => {
    setMessage(
      (message) =>
        message + (emojiData.isCustom ? emojiData.unified : emojiData.emoji)
    );
  };

  const toggleEmojiPicker = () => {
    setShowEmojiPicker(!showEmojiPicker);
  };

  const { styles, attributes } = usePopper(referenceElement, popperElement, {
    placement: "top-end", // Adjust placement as needed
  });

  return (
    <div className="send-message-container">
      <div className="send-message-input-wrapper">
        <input
          placeholder="Type Your Message"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        ></input>
        <div className="flex" ref={setReferenceElement}>
          <button className="my-auto text-2xl" onClick={toggleEmojiPicker}>
            😃
          </button>
        </div>
        {showEmojiPicker && (
          <div
            ref={(e) => {
              emojiPickerRef.current = e;
              setPopperElement(e);
            }}
            style={{ ...styles.popper }}
            {...attributes.popper}
          >
            <EmojiPicker
              onEmojiClick={handleEmojiSelect}
              autoFocusSearch={false}
              emojiStyle={EmojiStyle.NATIVE}
              height={props.height || 450}
              width={props.width || "auto"}
            />
          </div>
        )}
      </div>
      <RoundedButton
        ref={undefined}
        onClick={undefined}
        className="new-message-button mx-auto"
      >
        <div className="flex flex-row">
          <p className="mr-3"> Send</p>
          <img src={sendMessageIcon.src} alt="icon" />
        </div>
      </RoundedButton>
    </div>
  );
};

export default SendMessageContent;
