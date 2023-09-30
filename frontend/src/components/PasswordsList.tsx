import { useContext } from "react";
import { testPasswords } from "../testData";
import PasswordItem from "./PasswordItem";
import { TagContext } from "../context/TagContext";
const PasswordsList = () => {
  const { tagNumber } = useContext(TagContext);

  const handleDelete = (id: string) => {
    console.log("delete", id);
  };

  const handleEdit = (id: string) => {
    console.log("edit", id);
  };

  if (testPasswords.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-96">
        <p className="text-2xl">No passwords found</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-2 overflow-y-auto h-96">
      {testPasswords.map((password, index) => {
        const { tag } = password;
        if (tagNumber === 0 || tagNumber === tag) {
          return (
            <PasswordItem
              handleDelete={handleDelete}
              handleEdit={handleEdit}
              key={index}
              password={password}
            />
          );
        }
      })}
    </div>
  );
};

export default PasswordsList;
