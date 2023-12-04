import { createContext, useState, PropsWithChildren } from "react";

export type ImageUploadDetailsContextProps = {};
interface ImageUploadDetailsContextCtxInterface {
  uploadImageFileId: string | null;
  setUploadImageFileId: Function;

  uploadImageFileName: string | null;
  setUploadImageFileName: Function;

  uploadType: string | null;
  setUploadType: Function;
}

const ImageUploadDetailsContext = createContext<
  ImageUploadDetailsContextCtxInterface
>({
  uploadImageFileId: "",
  setUploadImageFileId: (uploadImageFileId: string) => {},

  uploadImageFileName: "",
  setUploadImageFileName: (uploadImageFileName: string) => {},

  uploadType: "",
  setUploadType: (uploadImageFileName: string) => {},
});

const ImageUploadDetailsContextProvider = (
  props: PropsWithChildren<ImageUploadDetailsContextProps>
) => {
  const [uploadImageFileId, setUploadImageFileId] = useState<string | null>("");
  const [uploadImageFileName, setUploadImageFileName] = useState<string | null>(
    ""
  );
  const [uploadType, setUploadType] = useState<string | null>("");

  return (
    <ImageUploadDetailsContext.Provider
      value={{
        uploadImageFileId,
        setUploadImageFileId,
        uploadImageFileName,
        setUploadImageFileName,
        uploadType,
        setUploadType,
      }}
    >
      {props.children}
    </ImageUploadDetailsContext.Provider>
  );
};

export { ImageUploadDetailsContext };
export default ImageUploadDetailsContextProvider;
