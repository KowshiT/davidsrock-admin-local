import { createContext, useState, PropsWithChildren } from "react";

export type CreatePublicProfileContextProps = {};
interface CreatePublicProfileContextCtxInterface {
  publicProfileName: string;
  setPublicProfileName: Function;

  publicProfileInterests: any;
  setPublicProfileInterests: Function;

  aboutPublicProfile: any;
  setAboutPublicProfile: Function;

  publicProfileNetworks: any;
  setPublicProfileNetworks: Function;

  publicProfileImages: any;
  setPublicProfileImages: Function;
}

const CreatePublicProfileContext = createContext<CreatePublicProfileContextCtxInterface>({
  publicProfileName: "",
  setPublicProfileName: (publicProfileName: string) => { },

  publicProfileInterests: {},
  setPublicProfileInterests: (publicProfileInterests: any) => { },

  aboutPublicProfile: {},
  setAboutPublicProfile: (aboutPublicProfile: string) => { },

  publicProfileNetworks: {},
  setPublicProfileNetworks: (publicProfileNetworks: any) => { },

  publicProfileImages: {},
  setPublicProfileImages: (publicProfileImages: string) => { },
});

const CreatePublicProfileContextProvider = (
  props: PropsWithChildren<CreatePublicProfileContextProps>
) => {
  const [publicProfileName, setPublicProfileName] = useState("");
  const [publicProfileInterests, setPublicProfileInterests] = useState([]);
  const [aboutPublicProfile, setAboutPublicProfile] = useState({});
  const [publicProfileNetworks, setPublicProfileNetworks] = useState([]);
  const [publicProfileImages, setPublicProfileImages] = useState({});

  return (
    <CreatePublicProfileContext.Provider
      value={{
        publicProfileName,
        setPublicProfileName,

        publicProfileInterests,
        setPublicProfileInterests,

        aboutPublicProfile,
        setAboutPublicProfile,

        publicProfileNetworks,
        setPublicProfileNetworks,

        publicProfileImages,
        setPublicProfileImages
      }}
    >
      {props.children}
    </CreatePublicProfileContext.Provider>
  );
};

export { CreatePublicProfileContext };
export default CreatePublicProfileContextProvider;
