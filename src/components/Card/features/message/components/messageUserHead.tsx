import { placeholderImage } from "@/assetsLayer";
import { getTimeDifferenceWithOneLetter } from "@/helpers/dateHelpers";
import { SectionRow } from "@/layouts/section";
import React from "react";

export interface MessageUserHeadProps {}

const MessageUserHead: React.FC<MessageUserHeadProps> = () => {
  return (
    <React.Fragment>
      <div
        className="message-header "
        //onClick={() => routeToDetailView(publicUrl)}
      >
        <div className="profile-image-container-follow">
          <img
            className="profile-image"
            src={placeholderImage.src}
            alt="Profile 1"
          />
        </div>

        <div className="content">
          <p className="partnershipMinHeader">Ernest Perera </p>
          <div>
            <SectionRow className="">
              <div className="flex flex-row">
                <span className="partnershipGrayText-600"></span>
                <p className="partnershipGrayText">
                  {"Active "}
                  {getTimeDifferenceWithOneLetter(String(new Date()))}
                </p>
              </div>
            </SectionRow>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default MessageUserHead;
