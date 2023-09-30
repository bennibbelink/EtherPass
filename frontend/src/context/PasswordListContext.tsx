import { createContext, useState } from "react";
import { Password, testPasswords } from "../testData";
import * as EthAPI from "../Eth_API";

interface PasswordListContextValue {
  passwordList: Password[];
  initialPasswordList: Password[];
  setPasswordList: React.Dispatch<React.SetStateAction<Password[]>>;
  setInitialPasswordList: React.Dispatch<React.SetStateAction<Password[]>>;
}

const PasswordListContext = createContext<PasswordListContextValue>({
  passwordList: testPasswords,
  initialPasswordList: testPasswords,
  setPasswordList: () => {},
  setInitialPasswordList: () => {},
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

  function commitChanges() {
    const adds: Password[] = [];
    const updates: Password[] = [];
    const deletes: Password[] = [];

    passwordList.forEach((p: Password) => {
      // first find the password with the same id
      const initialP = initialPasswordList.find((p: Password) => p.id === p.id);
      if (initialP !== undefined) {
        // this id exists
        if (!isEqual(p, initialP)) {
          // this password has been updated
          updates.push(p);
        }
      } else {
        // this id does not exist already, so it must be a new password
        adds.push(p);
      }
    });

    // check the persisted paswords for any that have been deleted
    initialPasswordList.forEach((p: Password) => {
      if (passwordList.find((p: Password) => p.id === p.id) === undefined) {
        deletes.push(p);
      }
    });

    EthAPI.batchUpdate(adds, deletes, updates);
  }

  function isEqual(a: Password, b: Password) {
    return (
      a.id === b.id &&
      a.nickname === b.nickname &&
      a.username === b.username &&
      a.passwordText === b.passwordText &&
      a.domain === b.domain &&
      a.tag === b.tag
    );
  }

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
