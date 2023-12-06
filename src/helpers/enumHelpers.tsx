export const buttonConfig = {
  INITIAL: [
    "Dashboard",
    "Create Organization",
    "Create Public Profile",
    "View Partnerships",
    "View Organizations",
    "View Public Profiles",
    "View Events",
    "Saved Items",
    // "Message",
  ],
  INITIAL_WITHOUT_PUBLIC_PROFILE: [
    "Dashboard",
    "View Users",
    "View Public Profiles",
    "View Organizations",
    "View Partnerships",
    "View Events",
    "View Post",
  ],
  ORGANIZATION: [
    "Dashboard",
    "Create Event",
    "Partnerships",
    "View Partnerships",
    "View Organizations",
    "View Public Profiles",
    "View Events",
    "Saved Items",
    // "Message",
  ],
  PUBLIC_PROFILE: [
    "Dashboard",
    "Create Event",
    "Partnerships",
    "View Partnerships",
    "View Organizations",
    "View Public Profiles",
    "View Events",
    "Saved Items",
    // "Message",
  ],
  PARTNERSHIP: [
    "Dashboard",
    "Create Event",
    "View Partnerships",
    "View Organizations",
    "View Public Profiles",
    "View Events",
    "Saved Items",
    // "Message",
  ],
};

export enum AccountType {
  INITIAL = "INITIAL",
  ORGANIZATION = "ORGANIZATION",
  PUBLIC_PROFILE = "PUBLIC_PROFILE",
  PARTNERSHIP = "PARTNERSHIP",
}

export enum Status {
  APPROVED = "APPROVED",
}

export const restrictURLsForOrganization = [
  "/dashboard/createOrganization",
  "/dashboard/createPublicProfile",
  "/dashboard/createPublicProfile",
];

export const tabViewData = [
  { label: "About", state: "ABOUT" },
  { label: "Post", state: "POST" },
  { label: "Event", state: "EVENT" },
  { label: "Followers", state: "FOLLOWERS" },
  { label: "Photos", state: "PHOTOS" },
  // Add more buttons as needed
];
