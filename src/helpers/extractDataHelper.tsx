import React from "react";

export const extractProfileDetails = (partnershipDetailEntityList: any) => {
  return partnershipDetailEntityList.map((detail) => ({
    profileName: detail.profile.profileName,
    profileId: detail.profile.profileId,
  }));
};

export const extractProfileImages = (galleryEntityList: any) => {
  return galleryEntityList.map((detail: any, index: any) => ({
    id: index,
    galleryId: detail.galleryId,
    imagePath: detail.imagePath,
    imageTitle: detail.imageTitle,
  }));
};

export const extractNetworkDetails = (networkEntities: any) => {
  return networkEntities?.map((detail) => ({
    networkType: detail.networkType,
    link: detail.link,
  }));
};

export const createInterestArray = (list: any) => {
  // Remove the opening and closing brackets
  const strippedList = list.replace(/\[|\]/g, "");

  const interestsArray = strippedList
    .split(",")
    .map((interest) => interest.trim());

  return interestsArray;
};

export const arrayFormatInterests = (interests: any) => {
  const list = interests?.map((interestEntity: any) => interestEntity.interest);

  return list;
};

export const extractOrganizationDetails = (organizationEntities: any) => {
  return organizationEntities?.map((detail) => ({
    organizationId: detail.organizationId,
    organizationCategory: detail.organizationCategory,

    profile: {
      profileId: detail.profile.profileId,
      profileName: detail.profile.profileName,

      profileImagePath: detail.profile.profileImagePath,
      coverImagePath: detail.profile.coverImagePath,

      profileType: detail.profile.profileType,
      publicUrl: detail.profile.publicUrl,

      isFollower: detail.profile.isFollower,
      followerCount: detail.profile.followerCount,
    },
  }));
};

export const extractPublicProfileDetails = (publicEntities: any) => {
  return publicEntities?.map((detail) => ({
    publicProfileId: detail.publicProfileId,

    profile: {
      profileId: detail.profile.profileId,
      profileName: detail.profile.profileName,

      profileImagePath: detail.profile.profileImagePath,
      coverImagePath: detail.profile.coverImagePath,

      profileType: detail.profile.profileType,
      publicUrl: detail.profile.publicUrl,

      isFollower: detail.profile.isFollower,
      followerCount: detail.profile.followerCount,
    },
  }));
};

export const formatInterestsWithSpaces = (payload) => {
  if (!payload || typeof payload !== "string") {
    return "";
  }

  let formattedInterests = payload.replace(/\[|\]/g, ""); // Remove square brackets

  // Add spaces after each comma
  formattedInterests = formattedInterests.replace(/,/g, ", ");

  return formattedInterests;
};

// Example usage:
const payload = {
  interest:
    "\uD83D\uDC68‍\uD83D\uDCBBCreative Arts,\uD83D\uDE80 Space Exploration,\uD83C\uDFAE Gaming,⚽ Sports,\uD83C\uDFF9 Outdoor Adventure",
};
