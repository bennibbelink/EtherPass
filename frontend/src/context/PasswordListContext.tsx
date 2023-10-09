import { createContext, useContext, useEffect, useState } from "react";
import { Password } from "../testData";
import { EthContext } from "./EthContext";

interface PasswordListContextValue {
  passwordList: Password[];
  initialPasswordList: Password[];
  hasRegistry: boolean;
  commitChanges: () => void;
  setHasRegistry: React.Dispatch<React.SetStateAction<boolean>>;
  setPasswordList: React.Dispatch<React.SetStateAction<Password[]>>;
  setInitialPasswordList: React.Dispatch<React.SetStateAction<Password[]>>;
}

const PasswordListContext = createContext<PasswordListContextValue>({
  passwordList: [],
  initialPasswordList: [],
  hasRegistry: false,
  setPasswordList: () => { },
  setHasRegistry: () => { },
  setInitialPasswordList: () => { },
  commitChanges: () => { },
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
  const [hasRegistry, setHasRegistry] = useState<boolean>(false);

  const { getPasswords, account, batchUpdate } = useContext(EthContext);

  useEffect(() => {
    if (account) {
      getPasswords().then((passwords: Password[]) => {
        setPasswordList(passwords);
        setHasRegistry(true);
        setInitialPasswordList(passwords);
      });
    }
  }, [account]);



  const commitChanges = async () => {
    const adds: Password[] = [];
    const updates: Password[] = [];
    const deletes: number[] = [];

    console.log("persisted", initialPasswordList);
    console.log("ephemeral", passwordList)

    passwordList.forEach((p: Password) => {
      // first find the password with the same id
      const initialP = initialPasswordList.find((pa: Password) => pa.id === p.id);
      console.log(initialP,  "initalp")
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
      if (passwordList.find((pa: Password) => pa.id === p.id) === undefined) {
        deletes.push(p.id);
      }
    });

    console.log("adds", adds)
    console.log("deletes", deletes)
    console.log("updates", updates)

    batchUpdate(adds, deletes, updates);
  };

  function isEqual(a: Password, b: Password) {
    return (
      a.id == b.id &&
      a.nickname == b.nickname &&
      a.username == b.username &&
      a.password == b.password &&
      a.domain == b.domain &&
      a.tag == b.tag
    );
  }

  return (
    <PasswordListContext.Provider
      value={{
        commitChanges,
        hasRegistry,
        setHasRegistry,
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
