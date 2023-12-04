import { createContext, useState, PropsWithChildren } from 'react';


export type AuthCardControlContextProps = {};
interface AuthCardControlContextCtxInterface {
    authCard: string;
    setauthCard: Function;
}

const AuthCardControlContext = createContext<AuthCardControlContextCtxInterface>({
    authCard: "",
    setauthCard: (count: string) => { },
});

const AuthCardControlContextProvider = (props : PropsWithChildren<AuthCardControlContextProps>) => {
    const [authCard, setauthCard] = useState("LOGIN_CARD");

    return (
      <AuthCardControlContext.Provider value={{
        authCard, setauthCard
    }}>
        {props.children}
      </AuthCardControlContext.Provider>
    );
  };

export { AuthCardControlContext };
export default AuthCardControlContextProvider;