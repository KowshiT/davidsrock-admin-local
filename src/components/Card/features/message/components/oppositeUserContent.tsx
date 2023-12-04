import { placeholderImage } from "@/assetsLayer";
import {
  getTimeDifferenceWithOneLetter,
  TimeFormatForMessage,
} from "@/helpers/dateHelpers";
import { SectionRow } from "@/layouts/section";
import React from "react";

export interface OppositeUserContentProps {}

const OppositeUserContent: React.FC<OppositeUserContentProps> = () => {
  return (
    <React.Fragment>
      <div
        className="opposite-message-container "
        //onClick={() => routeToDetailView(publicUrl)}
      >
        <div className="profile-image-container-message">
          <img
            className="profile-image"
            src={placeholderImage.src}
            alt="Profile 1"
          />
        </div>

        <div className="content">
          <div className="content-message">
            <p className="user-message-500 opposite-user-message-background w-fit">
              In publishing and graphic design, Lorem ipsum is a placeholder
              text commonly used to demonstrate the visual form of a document or
              a typeface without relying on meaningful content. Lorem ipsum may
              be used as a placeholder before final copy is available.
            </p>
            <div>
              <SectionRow className="">
                <p className="partnershipGrayText ml-3 mt-0.5">
                  Sent {TimeFormatForMessage(String(new Date()))}
                </p>
                {/* <div className="flex flex-row">
                  <span className="partnershipGrayText-600"></span>
                </div> */}
              </SectionRow>
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};
export default OppositeUserContent;
