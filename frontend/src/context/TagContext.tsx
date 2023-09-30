import { createContext, useState } from "react";

interface TagContextValue {
  activeTagNumber: number;
  setActiveTagNumber?: React.Dispatch<React.SetStateAction<number>>;
}

const TagContext = createContext<TagContextValue>({ activeTagNumber: 0 });

const TagContextProvider = ({ children }: { children: React.ReactNode }) => {
  const [activeTagNumber, setActiveTagNumber] = useState(0);
  return (
    <TagContext.Provider value={{ activeTagNumber, setActiveTagNumber }}>
      {children}
    </TagContext.Provider>
  );
};

export { TagContext, TagContextProvider };
