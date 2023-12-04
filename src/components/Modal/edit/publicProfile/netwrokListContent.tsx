import { fbIcon, linkedinIcon, twitterIcon, websiteIcon } from "@/assetsLayer";
import React from "react";

export interface HandleNetworksProps {
  detail: any;
}

const HandleNetworks: React.FC<HandleNetworksProps> = (props) => {
  const handleImages = (type: any) => {
    switch (type) {
      case "FACEBOOK": {
        return fbIcon.src;
      }
      case "LINKEDIN": {
        return linkedinIcon.src;
      }
      case "TWITTER": {
        return twitterIcon.src;
      }
      case "WEBSITE": {
        return websiteIcon.src;
      }
      default: {
        return websiteIcon.src;
      }
    }
  };
  return (
    <React.Fragment>
      <div className="mr-2">
        <a href={props.detail.link} target="_blank" rel="noopener noreferrer">
          <div className="networks-icon-wrapper">
            <img
              src={handleImages(props.detail.networkType)}
              alt="An example image linked to a website"
            />
          </div>
        </a>
      </div>
    </React.Fragment>
  );
};

export default HandleNetworks;
