import { createContext, useState } from "react";
import { Password, testPasswords } from "../testData";

interface PasswordListContextValue {
  passwordList: Password[];
  initialPasswordList: Password[];
  setPasswordList?: React.Dispatch<React.SetStateAction<Password[]>>;
  setInitialPasswordList?: React.Dispatch<React.SetStateAction<Password[]>>;
}

const PasswordListContext = createContext<PasswordListContextValue>({
  passwordList: testPasswords,
  initialPasswordList: testPasswords,
});

const PasswordListContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [passwordList, setPasswordList] = useState<Password[]>([]);
  const [initialPasswordList, setInitialPasswordList] = useState<Password[]>(
    []
  );
  return (
    <PasswordListContext.Provider
      value={{
        initialPasswordList,
        passwordList,
        setPasswordList,
        setInitialPasswordList,
      }}>
      {children}
    </PasswordListContext.Provider>
  );
};

export { PasswordListContext, PasswordListContextProvider };
