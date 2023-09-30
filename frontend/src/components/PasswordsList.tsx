import { useContext, useState } from "react";
import { Password } from "../testData";
import PasswordItem from "./PasswordItem";
import { TagContext } from "../context/TagContext";
import Modal from "./forms/Modal";
import PasswordForm from "./forms/PasswordForm";
import { PasswordListContext } from "../context/PasswordListContext";

const PasswordsList = () => {
  const { setPasswordList } = useContext(PasswordListContext);
  const { passwordList } = useContext(PasswordListContext);
  const [editPasswordModalOpen, setEditPasswordModalOpen] = useState(false);
  const [currPasswordData, setCurrPasswordData] = useState<
    Password | undefined
  >(undefined);
  const { tagNumber } = useContext(TagContext);

  const handleDelete = (id: number) => {
    console.log("delete", id);
  };
  const handleEditSubmit = (
    e: React.FormEvent<HTMLFormElement>,
    data: Password
  ) => {
    e.preventDefault();
    console.log("edit", data);
    for (let i = 0; i < passwordList.length; i++) {
      if (passwordList[i].id === data.id) {
        passwordList[i] = data;
        break;
      }
    }
    setPasswordList(passwordList);
  };

  const handleEdit = (password: Password) => {
    setEditPasswordModalOpen(true);
    setCurrPasswordData(password);
  };

  if (passwordList.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-96">
        <p className="text-2xl">No passwords found</p>
      </div>
    );
  }

  return (
    <>
      <div className="flex flex-col gap-2 overflow-y-auto h-96">
        {passwordList.map((password, index) => {
          const { tag } = password;
          if (tagNumber === 0 || tagNumber === tag) {
            return (
              <PasswordItem
                handleDelete={() => handleDelete(password.id)}
                handleEdit={() => handleEdit(password)}
                key={index}
                password={password}
              />
            );
          }
        })}
      </div>
      <Modal
        open={editPasswordModalOpen}
        onClose={() => setEditPasswordModalOpen(false)}>
        <PasswordForm
          onClose={() => setEditPasswordModalOpen(false)}
          title="Edit a Password"
          handleSubmit={handleEditSubmit}
          initialData={currPasswordData}
        />
      </Modal>
    </>
  );
};

export default PasswordsList;
