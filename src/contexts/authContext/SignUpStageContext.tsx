import { createContext, useEffect, useState, PropsWithChildren } from "react";

export type SignUpStageContextProps = {};
interface SignUpStageContextCtxInterface {
  signUpStageCount: number | null;
  setSignUpStageCount: Function;

  signUpType: string;
  setSignUpType: Function;
}

const SignUpStageContext = createContext<SignUpStageContextCtxInterface>({
  signUpStageCount: 1,
  setSignUpStageCount: (count: string) => { },

  signUpType: "",
  setSignUpType: (count: string) => { },
});

const SignUpStageContextProvider = (props: PropsWithChildren<SignUpStageContextProps>) => {
  const [signUpStageCount, setSignUpStageCount] = useState<number | null>(1);
  const [signUpType, setSignUpType] = useState("");

  return (
    <SignUpStageContext.Provider value={{
      signUpStageCount, setSignUpStageCount,
      signUpType, setSignUpType,
    }}>
      {props.children}
    </SignUpStageContext.Provider>
  );
};

export { SignUpStageContext };
export default SignUpStageContextProvider;
