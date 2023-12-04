import { placeholderImage } from "@/assetsLayer";
import {
  getTimeDifference,
  getTimeDifferenceWithOneLetter,
} from "@/helpers/dateHelpers";
import { stringCrop } from "@/helpers/stringCrop";
import { SectionColumn } from "@/layouts/section";
import React from "react";

export interface UserThreadProps {}

const UserThread: React.FC<UserThreadProps> = () => {
  return (
    <React.Fragment>
      <div
        className="card-message cursor-pointer"
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
            <SectionColumn className="">
              <div className="flex flex-row justify-between">
                <span className="partnershipGrayText-600">
                  {stringCrop(
                    "In publishing and graphic design, Lorem ipsum is a placeholdertext",
                    25
                  )}
                </span>
                <p className="partnershipGrayText">
                  {getTimeDifferenceWithOneLetter(String(new Date()))}
                </p>
              </div>
            </SectionColumn>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};
export default UserThread;
