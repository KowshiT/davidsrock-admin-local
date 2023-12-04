import { useAlerts } from "@/hooks/alertHook";
import { useRouter } from "next/router";
import React, { createContext, useContext, useMemo, useState } from "react";

const SuccessPopupContext = createContext({
  isSuccessPopupOpen: false,
  title: "",
  subTitle: "",
  partnershipPicture1: "",
  partnershipPicture2: "",
  partnershipName: "",
  publicURL: "",

  setTitle: (title: string) => {},
  setSubTitle: (subTitle: string) => {},
  setPartnershipPicture1: (prof: string) => {},
  setPartnershipPicture2: (prof: string) => {},
  setPartnershipName: (name: string) => {},
  setPublicURL: (url: string) => {},
  openSuccessPopup: () => {},
  closeSuccessPopup: () => {},
  handleNavigation: () => {},
});

export const SuccessPopupProvider = ({ children }) => {
  const [isSuccessPopupOpen, setSuccessPopupOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [subTitle, setSubTitle] = useState("");
  const [partnershipPicture1, setPartnershipPicture1] = useState("");
  const [partnershipPicture2, setPartnershipPicture2] = useState("");
  const [partnershipName, setPartnershipName] = useState("");
  const [publicURL, setPublicURL] = useState("");
  const router = useRouter();

  const openSuccessPopup = () => {
    setSuccessPopupOpen(true);
  };

  const closeSuccessPopup = () => {
    setTitle("");
    setSubTitle("");
    setPartnershipPicture1("");
    setPartnershipPicture2("");
    setPartnershipName("");
    setSuccessPopupOpen(false);
  };

  const handleNavigation = () => {
    if (publicURL) {
      window.open(`/${publicURL}`, "_blank");
    } else {
      closeSuccessPopup();
    }
  };

  const contextValue = useMemo(
    () => ({
      isSuccessPopupOpen,
      title,
      subTitle,
      partnershipPicture1,
      partnershipPicture2,
      partnershipName,
      publicURL,

      setTitle,
      setSubTitle,
      setPartnershipPicture1,
      setPartnershipPicture2,
      setPartnershipName,
      setSuccessPopupOpen,
      setPublicURL,
      openSuccessPopup,
      closeSuccessPopup,
      handleNavigation,
    }),
    [
      isSuccessPopupOpen,
      title,
      subTitle,
      partnershipPicture1,
      partnershipPicture2,
      partnershipName,
      setTitle,
      setSubTitle,
      setPartnershipPicture1,
      setPartnershipPicture2,
      setPartnershipName,
      setSuccessPopupOpen,
      openSuccessPopup,
      closeSuccessPopup,
      handleNavigation,
    ]
  );

  return (
    <SuccessPopupContext.Provider value={contextValue}>
      {children}
    </SuccessPopupContext.Provider>
  );
};

export const useSuccessPopup = () => {
  return useContext(SuccessPopupContext);
};
