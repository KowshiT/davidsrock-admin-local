import { createContext, useState, PropsWithChildren } from "react";

export type PostContextProps = {};

interface PostContextCtxInterface {
  selectedPostId: number | null;
  setSelectedPostId: Function;
}

const PostContext = createContext<PostContextCtxInterface>({
  selectedPostId: 0,
  setSelectedPostId: (selectedPostId: any) => { },
});

const PostContextProvider = (props: PropsWithChildren<PostContextProps>) => {
  const [selectedPostId, setSelectedPostId] = useState<number | null>(0);

  return (
    <PostContext.Provider value={{ selectedPostId, setSelectedPostId }}>
      {props.children}
    </PostContext.Provider>
  );
};

export { PostContext };
export default PostContextProvider;
