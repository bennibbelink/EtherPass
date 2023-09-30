import { testPasswords } from "../testData";
import PasswordItem from "./PasswordItem";
const PasswordsList = () => {
  return (
    <>
      {testPasswords.map((password) => (
        <PasswordItem password={password} />
      ))}
    </>
  );
};

export default PasswordsList;
