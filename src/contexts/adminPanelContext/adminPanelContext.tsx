import { createContext, useState, PropsWithChildren } from "react";

export type AdminPanelContextProps = {};

interface AdminPanelContextCtxInterface {
  hasPublicProfile: boolean;
  setHasPublicProfile: Function;

  showUserEvents: boolean;
  setShowUserEvents: Function;

  showUserOrgs: boolean;
  setShowUserOrgs: Function;

  showUserPublicProfiles: boolean;
  setShowUserPublicProfiles: Function;

  showUserPartnerships: boolean;
  setShowUserPartnerships: Function;
}

const AdminPanelContext = createContext<AdminPanelContextCtxInterface>({
  hasPublicProfile: false,
  setHasPublicProfile: (hasPublicProfile: boolean) => { },

  showUserEvents: false,
  setShowUserEvents: (showUserEvents: boolean) => { },

  showUserOrgs: false,
  setShowUserOrgs: (showUserOrgs: boolean) => { },

  showUserPublicProfiles: false,
  setShowUserPublicProfiles: (showUserPublicProfiles: boolean) => { },

  showUserPartnerships: false,
  setShowUserPartnerships: (showUserPartnerships: boolean) => { },
});

const AdminPanelContextProvider = (props: PropsWithChildren<AdminPanelContextProps>) => {
  const [hasPublicProfile, setHasPublicProfile] = useState(false);
  const [showUserEvents, setShowUserEvents] = useState(false);
  const [showUserOrgs, setShowUserOrgs] = useState(false);
  const [showUserPublicProfiles, setShowUserPublicProfiles] = useState(false);
  const [showUserPartnerships, setShowUserPartnerships] = useState(false);

  return (
    <AdminPanelContext.Provider value={{
      hasPublicProfile, setHasPublicProfile,
      showUserEvents, setShowUserEvents,
      showUserOrgs, setShowUserOrgs,
      showUserPublicProfiles, setShowUserPublicProfiles,
      showUserPartnerships, setShowUserPartnerships
    }}>
      {props.children}
    </AdminPanelContext.Provider>
  );
};

export { AdminPanelContext };
export default AdminPanelContextProvider;
