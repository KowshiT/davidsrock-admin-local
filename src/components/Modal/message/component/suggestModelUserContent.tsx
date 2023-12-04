import { placeholderImage } from "@/assetsLayer";

import React from "react";

export interface SuggestModelUserContentProps {}

const SuggestModelUserContent: React.FC<SuggestModelUserContentProps> = () => {
  return (
    <React.Fragment>
      <div
        className="card-message cursor-pointer"
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
          <p className="partnershipMinHeader">Ernest Perera </p>
        </div>
      </div>
    </React.Fragment>
  );
};
export default SuggestModelUserContent;
