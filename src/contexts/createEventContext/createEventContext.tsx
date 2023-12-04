import { createContext, useState, PropsWithChildren } from "react";

export type CreateEventContextProps = {};
interface CreateEventContextCtxInterface {
  organizationId: string;
  setOrganizationId: Function;

  eventType: string;
  setEventType: Function;

  eventName: string;
  setEventName: Function;

  eventDateTime: any;
  setEventDateTime: Function;

  eventStep1Details: any;
  setEventStep1Details: Function;

  eventLocation: string;
  setEventLocation: Function;

  eventLink: any;
  setEventLink: Function;

  eventDesciption: string;
  setEventDesciption: Function;

  eventSettings: any;
  setEventSettings: Function;

  eventCoverImage: string;
  setEventCoverImage: Function;
}

const CreateEventContext = createContext<CreateEventContextCtxInterface>({
  organizationId: "",
  setOrganizationId: (organizationId: string) => { },

  eventType: "",
  setEventType: (eventType: string) => { },

  eventName: "",
  setEventName: (eventName: string) => { },

  eventDateTime: {},
  setEventDateTime: (eventDateTime: any) => { },

  eventStep1Details: {},
  setEventStep1Details: (eventStep1Details: any) => { },

  eventLocation: "",
  setEventLocation: (eventLocation: string) => { },

  eventLink: "",
  setEventLink: (eventLink: any) => { },

  eventDesciption: "",
  setEventDesciption: (eventDesciption: string) => { },

  eventSettings: {},
  setEventSettings: (eventSettings: any) => { },

  eventCoverImage: "",
  setEventCoverImage: (eventCoverImage: string) => { },
});

const CreateEventContextProvider = (props: PropsWithChildren<CreateEventContextProps>) => {
  const [organizationId, setOrganizationId] = useState("");
  const [eventType, setEventType] = useState("");
  const [eventName, setEventName] = useState("");
  const [eventDateTime, setEventDateTime] = useState({});
  const [eventStep1Details, setEventStep1Details] = useState({});
  const [eventLocation, setEventLocation] = useState("");
  const [eventLink, setEventLink] = useState({});
  const [eventDesciption, setEventDesciption] = useState("");
  const [eventSettings, setEventSettings] = useState({});
  const [eventCoverImage, setEventCoverImage] = useState("");

  return (
    <CreateEventContext.Provider
      value={{
        organizationId,
        setOrganizationId,

        eventType,
        setEventType,

        eventName,
        setEventName,

        eventDateTime,
        setEventDateTime,

        eventStep1Details,
        setEventStep1Details,

        eventLocation,
        setEventLocation,

        eventLink,
        setEventLink,

        eventDesciption,
        setEventDesciption,

        eventSettings,
        setEventSettings,

        eventCoverImage,
        setEventCoverImage,
      }}
    >
      {props.children}
    </CreateEventContext.Provider>
  );
};

export { CreateEventContext };
export default CreateEventContextProvider;
