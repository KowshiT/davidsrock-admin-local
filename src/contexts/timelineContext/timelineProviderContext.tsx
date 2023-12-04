import { createContext, useContext, useState } from "react";

const TimelineContext = createContext({
  selectedCategory: [
    "HUMAN_RIGHTS",
    "FOOD_RIGHTS",
    "ANIMAL_RIGHTS",
    "POLITICAL_CAMPAIGNS",
    "LABOUR_RIGHTS",
  ],
  setSelectedCategory: (name) => {},
});

export const TimelineProviderContext = ({ children }) => {
  const [selectedCategory, setSelectedCategory] = useState<any>([]);

  return (
    <TimelineContext.Provider value={{ selectedCategory, setSelectedCategory }}>
      {children}
    </TimelineContext.Provider>
  );
};

export const useSelectedCategory = () => {
  return useContext(TimelineContext);
};
