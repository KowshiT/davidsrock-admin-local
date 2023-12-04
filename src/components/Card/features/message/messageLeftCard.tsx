import { blackLArrow } from "@/assetsLayer";
import RoundedButton from "../../../../components/Buttons/RoundedButtons";
import { SectionRow } from "@/layouts/section";
import Image from "next/image";
import React from "react";
import SearchBar from "../partnership/components/SearchBar";
import UserThread from "./components/userThread";
import { ModalOpenCloseContext } from "@/contexts/modalContext/modalOpenCloseContext";
import MessageModal from "../../../../components/Modal/message/messageModal";

export interface MessageLeftCardProps {}

const handleSearch = (searchTerm: string): void => {
  // Implement your search logic here.
  // For now, let's return the length of the search term.
  console.log("Value", searchTerm);
};

const MessageLeftCard: React.FC<MessageLeftCardProps> = () => {
  const { setMessageModal } = React.useContext(ModalOpenCloseContext);

  return (
    <React.Fragment>
      <div className="message-left-main-container">
        <div className="message-left-main-header-wrapper">
          <SectionRow className="">
            <button
            //onClick={(e: any) => handlebackArrow()}
            >
              <Image
                // loader ={() => LoginPageImage}
                src={blackLArrow}
                alt="Picture of the author"
                width={25}
                height={25}
              />
            </button>
            <p className="homeLeftBarMainText ml-2">All Messages</p>
          </SectionRow>
        </div>
        <div className="inner-container-message">
          <div className="mb-2.5">
            <SearchBar
              onSearch={handleSearch}
              className="search-bar-container-message"
            />
          </div>

          <div className="message-left-conversation-wrapper">
            <div className="message-left-inner-conversation-content">
              <div className="card-message-container">
                <UserThread />
                <UserThread />
                <UserThread />
                <UserThread />
                <UserThread />
                <UserThread />
                <UserThread />
                <UserThread />
                <UserThread />
              </div>
            </div>
          </div>
        </div>

        <div className="message-left-main-footer-wrapper">
          <RoundedButton
            ref={undefined}
            onClick={(e: any) => {
              setMessageModal(true);
            }}
            className="new-message-button mx-auto"
          >
            Create New Message
          </RoundedButton>
        </div>
      </div>
      <MessageModal />
    </React.Fragment>
  );
};
export default MessageLeftCard;
