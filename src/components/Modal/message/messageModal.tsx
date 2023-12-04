import { closeButtonNew } from "@/assetsLayer";
import { ModalOpenCloseContext } from "@/contexts/modalContext/modalOpenCloseContext";
import SendMessageContent from "../../Card/features/message/components/sendMessageContent";

import { Modal } from "@mui/material";
import Image from "next/image";

import React, { useState } from "react";
import SuggestUserModel from "./suggestUserModel";

export interface MessageModalProps {}

const MessageModal: React.FC<MessageModalProps> = (props) => {
  const { messageModal, setMessageModal, setSuggestUserModel } =
    React.useContext(ModalOpenCloseContext);
  const [message, setMessage] = useState();
  const [searchValue, setSearchValue] = useState<string>("");
  const [suggestions, setSuggestions] = useState<string[]>([]);

  const suggestedUsers = [
    "User 1",
    "User 2",
    "User 3",
    "User 4",
    // Add more suggested users as needed
  ];

  const handleCloseMenuBar = () => setMessageModal(false);

  const handleSearchValue = (value: string): void => {
    setSearchValue(value);
    if (value.trim() !== "") {
      // Show suggestions and filter them based on input value
      setSuggestions(
        suggestedUsers.filter((user) =>
          user.toLowerCase().includes(value.toLowerCase())
        )
      );
    } else {
      // Hide suggestions when input is empty
      setSuggestions([]);
    }
  };

  return (
    <React.Fragment>
      <Modal
        open={messageModal}
        onClose={handleCloseMenuBar}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        sx={{
          backdropFilter: "blur(10px)",
        }}
      >
        <div className="message-modal-main-Wrapper-container pt-3">
          <button
            onClick={(e: any) => handleCloseMenuBar()}
            className="modalcloseBTN opacity-100 duration-500 hover:rotate-90 hover:scale-110 hover:opacity-100"
          >
            <Image
              src={closeButtonNew}
              alt="Picture of the author"
              width={30}
              height={30}
            />
          </button>

          <div className="inner-container-message h-full">
            <div className="send-message-container">
              <p>To : </p>
              <div className="find-user-input-container">
                <input
                  className="find-user-input"
                  placeholder="Search"
                  value={searchValue}
                  onChange={(e) => handleSearchValue(e.target.value)}
                ></input>
                {suggestions.length > 0 && <SuggestUserModel />}
              </div>
            </div>
            <div className="flex-1"></div>
            <div className="mb-2.5">
              <SendMessageContent
                height={350}
                width={250}
                message={message}
                setMessage={setMessage}
              />
            </div>
          </div>
        </div>
      </Modal>
    </React.Fragment>
  );
};

export default MessageModal;
