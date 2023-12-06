import { setActiveTabToLocalStorage } from "./authHelper";
import {
  facebookIcon,
  linkedinIcon,
  twitterIcon,
  websiteIcon,
} from "@/assetsLayer";

export const categoryTypeEnumChangeHelper = (category: string) => {
  switch (category) {
    case "HUMAN_RIGHTS":
      return "Human Rights";
    case "FOOD_RIGHTS":
      return "Food Rights";
    case "ANIMAL_RIGHTS":
      return "Animal Rights";
    case "POLITICAL_CAMPAIGNS":
      return "Political Campaigns";
    case "LABOUR_RIGHTS":
      return "Labor Rights";
    default:
      break;
  }
};

export const handleButtonClickedHelper = (buttonName: string) => {
  setActiveTabToLocalStorage(buttonName);

  switch (buttonName) {
    case "Dashboard":
      return "/dashboard";
    case "Create Event":
      return "/dashboard/createEvent";
    case "Create Organization":
      return "/dashboard/createOrganization";
    case "Create Public Profile":
      return "/dashboard/createPublicProfile";
    case "View Partnerships":
      return "/dashboard/viewPartnershipList";
    case "View Organizations":
      return "/dashboard/organizationListView";
    case "View Events":
      return "/dashboard/eventListView";
    case "Partnerships":
      return "/dashboard/partnershipDashboard";
    case "View Public Profiles":
      return "/dashboard/publicProfileListView";
    case "Saved Items":
      return "/dashboard/savedItems";
    case "Message":
      return "/dashboard/message";
    case "View Users":
      return "/dashboard/viewUsersList";
    case "View Post":
      return "/dashboard/viewPostList";
    //break;
    default:
      return "/dashboard";
  }
};

export const formatEnumValue = (enumValue: any) => {
  // Split the string by underscores and capitalize each word
  const words = enumValue.toLowerCase().split("_");
  const formattedWords = words.map(
    (word) => word.charAt(0).toUpperCase() + word.slice(1)
  );
  return formattedWords.join(" ");
};

export const handleSwitchNetworkIcons = (networkType: string) => {
  switch (networkType) {
    case "FACEBOOK":
      return facebookIcon.src;
    case "LINKEDIN":
      return linkedinIcon.src;
    case "TWITTER":
      return twitterIcon.src;
    case "WEBSITE":
      return websiteIcon.src;
    default:
      return websiteIcon.src;
  }
};
