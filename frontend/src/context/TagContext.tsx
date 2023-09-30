import { createContext, useState } from "react";

interface TagContextValue {
  tagNumber: number;
  setTagNumber?: React.Dispatch<React.SetStateAction<number>>;
}

const TagContext = createContext<TagContextValue>({ tagNumber: 0 });

const TagContextProvider = ({ children }: { children: React.ReactNode }) => {
  const [tagNumber, setTagNumber] = useState(0);
  return (
    <TagContext.Provider value={{ tagNumber, setTagNumber }}>
      {children}
    </TagContext.Provider>
  );
};

export { TagContext, TagContextProvider };
