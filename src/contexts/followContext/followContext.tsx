import { createContext, useState, PropsWithChildren } from "react";

export type FollowContextProps = {};
interface FollowContextInterface {
  timelineFollowingCount: number | null;
  setTimelineFollowingCount: Function;
}

const FollowContext = createContext<FollowContextInterface>({
  timelineFollowingCount: 0,
  setTimelineFollowingCount: (count: any) => { },
});

const FollowContextProvider = (props: PropsWithChildren<FollowContextProps>) => {
  const [timelineFollowingCount, setTimelineFollowingCount] = useState<number | null>(0);

  return (
    <FollowContext.Provider value={{ timelineFollowingCount, setTimelineFollowingCount }}>
      {props.children}
    </FollowContext.Provider>
  );
};

export { FollowContext };
export default FollowContextProvider;
