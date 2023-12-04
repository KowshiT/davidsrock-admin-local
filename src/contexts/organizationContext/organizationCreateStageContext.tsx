import { createContext, useEffect, useState, PropsWithChildren } from "react";

export type OrganizationCreateStageContextProps = {};
interface OrganizationCreateStageContextCtxInterface {
	organizationCreateStageCount: number | null;
	setOrganizationCreateStageCount: Function;

	userOwnOrganization: boolean;
	setUserOwnOrganization: Function;
}

const OrganizationCreateStageContext = createContext<OrganizationCreateStageContextCtxInterface>({
	organizationCreateStageCount: 1,
	setOrganizationCreateStageCount: (count: string) => { },

	userOwnOrganization: false,
	setUserOwnOrganization: (userOwnOrganization: boolean) => { },
});

const OrganizationCreateStageContextProvider = (props: PropsWithChildren<OrganizationCreateStageContextProps>) => {
	const [organizationCreateStageCount, setOrganizationCreateStageCount] = useState<number | null>(1);
	const [userOwnOrganization, setUserOwnOrganization] = useState(false);

	return (
		<OrganizationCreateStageContext.Provider value={{
			organizationCreateStageCount, setOrganizationCreateStageCount,
			userOwnOrganization, setUserOwnOrganization,
		}}>
			{props.children}
		</OrganizationCreateStageContext.Provider>
	);
};

export { OrganizationCreateStageContext };
export default OrganizationCreateStageContextProvider;
