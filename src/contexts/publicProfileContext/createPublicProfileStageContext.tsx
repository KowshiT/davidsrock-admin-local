import { createContext, useEffect, useState, PropsWithChildren } from "react";

export type PublicProfileCreateStageContextProps = {};
interface PublicProfileCreateStageContextCtxInterface {
  publicProfileCreateStageCount: number | null;
  setPublicProfileCreateStageCount: Function;

  userOwnPublicProfile: boolean;
  setUserOwnPublicProfile: Function;
}

const PublicProfileCreateStageContext = createContext<PublicProfileCreateStageContextCtxInterface>({
  publicProfileCreateStageCount: 1,
  setPublicProfileCreateStageCount: (count: string) => { },

  userOwnPublicProfile: false,
  setUserOwnPublicProfile: (userOwnPublicProfile: boolean) => { },
});

const PublicProfileCreateStageContextProvider = (props: PropsWithChildren<PublicProfileCreateStageContextProps>) => {
  const [publicProfileCreateStageCount, setPublicProfileCreateStageCount] = useState<number | null>(1);
  const [userOwnPublicProfile, setUserOwnPublicProfile] = useState(false);

  return (
    <PublicProfileCreateStageContext.Provider value={{
      publicProfileCreateStageCount, setPublicProfileCreateStageCount,
      userOwnPublicProfile, setUserOwnPublicProfile,
    }}>
      {props.children}
    </PublicProfileCreateStageContext.Provider>
  );
};

export { PublicProfileCreateStageContext };
export default PublicProfileCreateStageContextProvider;
