import React, {
  createContext,
  useState,
  useContext,
  SetStateAction,
} from "react";

const ModalContext = createContext({
  isModalOpen: false,
  currentIndex: 0,
  images: [],
  setImages: (list: any) => {},
  openModal: (index) => {},
  closeModal: () => {},
  prevSlide: () => {},
  nextSlide: () => {},
});

export const ModalProvider = ({ children }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [images, setImages] = useState<any>({});

  const openModal = (index) => {
    setCurrentIndex(index);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const prevSlide = () => {
    setCurrentIndex(
      (prevIndex) => (prevIndex - 1 + images.length) % images.length
    );
  };

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  return (
    <ModalContext.Provider
      value={{
        isModalOpen,
        currentIndex,
        images,
        setImages,
        openModal,
        closeModal,
        prevSlide,
        nextSlide,
      }}
    >
      {children}
    </ModalContext.Provider>
  );
};

export const useImageSliderModal = () => useContext(ModalContext);
