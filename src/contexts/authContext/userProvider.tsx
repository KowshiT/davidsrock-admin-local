// UserContext.js

import { createContext, useContext, useState } from "react";

const UserContext = createContext({
  userName: "",
  accountType: "",
  profilePicture: "",
  profilePicture2: "",
  setUserName: (name) => {},
  setAccountType: (name) => {},
  setProfilePicture: (name) => {},
  setProfilePicture2: (name) => {},
});

export const UserProvider = ({ children }) => {
  const [userName, setUserName] = useState("");
  const [profilePicture, setProfilePicture] = useState("");
  const [profilePicture2, setProfilePicture2] = useState("");
  const [accountType, setAccountType] = useState("");

  return (
    <UserContext.Provider
      value={{
        setUserName,
        userName,
        setAccountType,
        accountType,
        setProfilePicture,
        profilePicture,
        profilePicture2,
        setProfilePicture2,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  return useContext(UserContext);
};
