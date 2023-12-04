import { createContext, useEffect, useState, PropsWithChildren } from "react";

export type EventCreateStageContextProps = {};
interface EventCreateStageContextCtxInterface {
	eventCreateStageCount: number | null;
    setEventCreateStageCount: Function;
}

const EventCreateStageContext = createContext<EventCreateStageContextCtxInterface>({
	eventCreateStageCount: 1,
    setEventCreateStageCount: (count: string) => { },
});

const EventCreateStageContextProvider = (props: PropsWithChildren<EventCreateStageContextProps>) => {
	const [eventCreateStageCount, setEventCreateStageCount] = useState<number | null>(1);

	return (
		<EventCreateStageContext.Provider value={{ eventCreateStageCount, setEventCreateStageCount }}>
			{props.children}
		</EventCreateStageContext.Provider>
	);
};

export { EventCreateStageContext };
export default EventCreateStageContextProvider;
