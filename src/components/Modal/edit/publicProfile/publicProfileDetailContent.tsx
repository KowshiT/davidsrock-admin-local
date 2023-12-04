import { fbIcon, linkedinIcon, twitterIcon, websiteIcon } from "@/assetsLayer";
import { SectionColumn } from "@/layouts/section";
import React from "react";
import EditPublicProfileDetailModal from "./editPublicProfileDetailModal";
import HandleNetworks from "./netwrokListContent";

export interface PublicProfileDetailContentProps {
  details: any;
}

const PublicProfileDetailContent: React.FC<PublicProfileDetailContentProps> = (
  props
) => {
  const handleNetworks = (detail: any) => {
    return (
      <React.Fragment>
        <div className="mr-2">
          <a href={detail.link} target="_blank" rel="noopener noreferrer">
            <div className="networks-icon-wrapper">
              <img
                src={handleImages(detail.networkType)}
                alt="An example image linked to a website"
              />
            </div>
          </a>
        </div>
      </React.Fragment>
    );
  };

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
      <SectionColumn className="mt-5 w-full">
        <div className="flex flex-row flex-wrap">
          <div className="edit-detail-content-left">
            <p className="h3-black-14-text-left">Profile Name</p>
          </div>
          <div className="mx-1">
            <p className="h3-black-14-text-left">:</p>
          </div>
          <div className="edit-detail-description">
            <p className="dark-gray-14-text-500-left">
              {props?.details.profile.profileName || ""}
            </p>
          </div>
        </div>

        <div className="mt-2 flex flex-row flex-wrap">
          <div className="edit-detail-content-left">
            <p className="h3-black-14-text-left">Interests</p>
          </div>
          <div className="mx-1">
            <p className="h3-black-14-text-left">:</p>
          </div>
          <div className="edit-detail-description">
            <p className="dark-gray-14-text-500-left">
              {props?.details.interest
                ?.replace(/, $/, "")
                .replace(/,/g, ", ") || ""}
            </p>
          </div>
        </div>

        <div className="mt-2 flex flex-row flex-wrap">
          <div className="edit-detail-content-left">
            <p className="h3-black-14-text-left">Tagline</p>
          </div>
          <div className="mx-1">
            <p className="h3-black-14-text-left">:</p>
          </div>
          <div className="edit-detail-description">
            <p className="dark-gray-14-text-500-left">
              {props?.details.profile.tagLine || ""}
            </p>
          </div>
        </div>

        <div className="mt-2 flex flex-row flex-wrap">
          <div className="edit-detail-content-left">
            <p className="h3-black-14-text-left">Description</p>
          </div>
          <div className="mx-1">
            <p className="h3-black-14-text-left">:</p>
          </div>
          <div className="edit-detail-description">
            <p className="dark-gray-14-text-500-left">
              {props?.details.profile.description || ""}
            </p>
          </div>
        </div>

        <div className="mt-2 flex flex-row flex-wrap">
          <div className="edit-detail-content-left">
            <p className="h3-black-14-text-left">Location</p>
          </div>
          <div className="mx-1">
            <p className="h3-black-14-text-left">:</p>
          </div>
          <div className="edit-detail-description">
            <p className="dark-gray-14-text-500-left">
              {props?.details.profile.location || ""}
            </p>
          </div>
        </div>

        <div className="mt-2 flex flex-row flex-wrap">
          <div className="edit-detail-content-left">
            <p className="h3-black-14-text-left">High School</p>
          </div>
          <div className="mx-1">
            <p className="h3-black-14-text-left">:</p>
          </div>
          <div className="edit-detail-description">
            <p className="dark-gray-14-text-500-left">
              {props?.details.highSchool || ""}
            </p>
          </div>
        </div>
        <div className="mt-2 flex flex-row flex-wrap">
          <div className="edit-detail-content-left">
            <p className="h3-black-14-text-left">University</p>
          </div>
          <div className="mx-1">
            <p className="h3-black-14-text-left">:</p>
          </div>
          <div className="edit-detail-description">
            <p className="dark-gray-14-text-500-left">
              {props?.details.university || ""}
            </p>
          </div>
        </div>
        <div className="mt-2 flex flex-row flex-wrap">
          <div className="edit-detail-content-left">
            <p className="h3-black-14-text-left">Contact Number</p>
          </div>
          <div className="mx-1">
            <p className="h3-black-14-text-left">:</p>
          </div>
          <div className="edit-detail-description">
            <p className="dark-gray-14-text-500-left">
              {props?.details.profile.mobile || ""}
            </p>
          </div>
        </div>

        <div className="mt-2 flex flex-row flex-wrap">
          <div className="edit-detail-content-left">
            <p className="h3-black-14-text-left">Work Place</p>
          </div>
          <div className="mx-1">
            <p className="h3-black-14-text-left">:</p>
          </div>
          <div className="edit-detail-description">
            <p className="dark-gray-14-text-500-left">
              {props?.details.workPlace || ""}
            </p>
          </div>
        </div>

        <div className="mt-2 flex flex-row flex-wrap">
          <div className="edit-detail-content-left">
            <p className="h3-black-14-text-left">Networks</p>
          </div>
          <div className="mx-1">
            <p className="h3-black-14-text-left">:</p>
          </div>
          <div className="edit-detail-description flex flex-row flex-wrap">
            {/* <p className="dark-gray-14-text-500-left">fdf</p> */}
            {props?.details.profile?.networkEntities?.map((data: any) => (
              //handleNetworks(data)
              <HandleNetworks detail={data} />
            ))}
          </div>
        </div>
        {/* <EditPublicProfileDetailModal details={props.details} /> */}
      </SectionColumn>
    </React.Fragment>
  );
};

export default PublicProfileDetailContent;
