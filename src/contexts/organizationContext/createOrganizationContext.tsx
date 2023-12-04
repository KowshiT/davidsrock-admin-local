import { createContext, useState, PropsWithChildren } from "react";

export type CreateOrganizationContextProps = {};
interface CreateOrganizationContextCtxInterface {
  organizationName: string;
  setOrganizationName: Function;

  organizationCategory: string;
  setOrganizationCategory: Function;

  aboutOrganization: any;
  setAboutOrganization: Function;

  organizationImages: any;
  setOrganizationImages: Function;
}

const CreateOrganizationContext = createContext<CreateOrganizationContextCtxInterface>({
  organizationName: "",
  setOrganizationName: (organizationName: string) => { },

  organizationCategory: "",
  setOrganizationCategory: (organizationCategory: string) => { },

  aboutOrganization: {},
  setAboutOrganization: (aboutOrganization: string) => { },

  organizationImages: {},
  setOrganizationImages: (organizationImages: string) => { },
});

const CreateOrganizationContextProvider = (
  props: PropsWithChildren<CreateOrganizationContextProps>
) => {
  const [organizationName, setOrganizationName] = useState("");
  const [organizationCategory, setOrganizationCategory] = useState("");
  const [aboutOrganization, setAboutOrganization] = useState({});
  const [organizationImages, setOrganizationImages] = useState({});

  return (
    <CreateOrganizationContext.Provider
      value={{
        organizationName,
        setOrganizationName,

        organizationCategory,
        setOrganizationCategory,

        aboutOrganization,
        setAboutOrganization,

        organizationImages,
        setOrganizationImages
      }}
    >
      {props.children}
    </CreateOrganizationContext.Provider>
  );
};

export { CreateOrganizationContext };
export default CreateOrganizationContextProvider;
