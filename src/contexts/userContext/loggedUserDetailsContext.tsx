import { createContext, useState, PropsWithChildren, useEffect } from "react";
import useLocal from "../../hooks/useLocal";

export type LoggedUserContextProps = {};
interface LoggedUserContextCtxInterface {
  loggedEmail: string | null;
  setLoggedEmail: Function;

  loggedFullname: string | null;
  setLoggedFullname: Function;

  loggedRoleID: any;
  setLoggedRoleID: Function;

  loggedUserID: string | null;
  setLoggedUserID: Function;

  refreshToken: string | null;
  setRefreshToken: Function;

  accessToken: string | null;
  setAccessToken: Function;
}

const LoggedUserContext = createContext<LoggedUserContextCtxInterface>({
  loggedEmail: "",
  setLoggedEmail: (loggedEmail: string) => { },

  loggedFullname: "",
  setLoggedFullname: (loggedFullname: string) => { },

  loggedRoleID: [],
  setLoggedRoleID: (loggedRoleID: any) => { },

  loggedUserID: "",
  setLoggedUserID: (loggedUserID: string) => { },

  accessToken: "",
  setAccessToken: (accessToken: string) => { },

  refreshToken: "",
  setRefreshToken: (refreshToken: string) => { },
});

const LoggedUserContextProvider = (props: PropsWithChildren<LoggedUserContextProps>) => {
  const [loggedEmail, setLoggedEmail] = useState<string | null>(null);
  const [loggedFullname, setLoggedFullname] = useState<string | null>(null);
  const [loggedRoleID, setLoggedRoleID] = useState<any>();
  const [loggedUserID, setLoggedUserID] = useState<string | null>(null);
  const [accessToken, setAccessToken] = useState<string | null>(null);
  const [refreshToken, setRefreshToken] = useState<string | null>(null);

  const [value, setValue] = useLocal<{ loggedEmail: string | null; loggedFullname: string | null; loggedRoleID: any; loggedUserID: string | null; accessToken: string | null; refreshToken: string | null } | null>(
    "USER",
    null
  );

  useEffect(() => {
    if (!!value) {
      setLoggedEmail(value.loggedEmail);
      setLoggedFullname(value.loggedFullname);
      setLoggedRoleID(value.loggedRoleID);
      setLoggedUserID(value.loggedUserID);
      setAccessToken(value.accessToken)
      setRefreshToken(value.refreshToken)
    }
  }, []);

  useEffect(() => {
    if (loggedEmail !== value?.loggedEmail && loggedEmail !== null && value !== null) {
      setValue({ ...value, loggedEmail: loggedEmail });
    }
    if (loggedFullname !== value?.loggedFullname && loggedFullname !== null && value !== null) {
      setValue({ ...value, loggedFullname: loggedFullname });
    }
    if (loggedRoleID !== value?.loggedRoleID && loggedRoleID !== null && value !== null) {
      setValue({ ...value, loggedRoleID: loggedRoleID });
    }
    if (loggedUserID !== value?.loggedUserID && loggedUserID !== null && value !== null) {
      setValue({ ...value, loggedUserID: loggedUserID });
    }
    if (accessToken !== value?.accessToken && accessToken !== null && value !== null) {
      setValue({ ...value, accessToken: accessToken });
    }
    if (refreshToken !== value?.refreshToken && refreshToken !== null && value !== null) {
      setValue({ ...value, refreshToken: refreshToken });
    }

    if (!value) setValue({ loggedEmail, loggedFullname, loggedRoleID, loggedUserID, accessToken, refreshToken });
  }, [loggedEmail, loggedFullname, loggedRoleID, loggedUserID, accessToken, refreshToken]);

  return (
    <LoggedUserContext.Provider
      value={{
        loggedEmail,
        setLoggedEmail,

        loggedFullname,
        setLoggedFullname,

        loggedRoleID,
        setLoggedRoleID,

        loggedUserID,
        setLoggedUserID,

        accessToken,
        setAccessToken,

        refreshToken,
        setRefreshToken
      }}
    >
      {props.children}
    </LoggedUserContext.Provider>
  );
};

export { LoggedUserContext };
export default LoggedUserContextProvider;
