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
  const { activeTagNumber } = useContext(TagContext);

  const handleDelete = (id: number) => {
    setPasswordList((prev) => prev.filter((password) => password.id !== id));
  };
  const handleEditSubmit = (data: Password) => {
    console.log("edit", data);
    for (let i = 0; i < passwordList.length; i++) {
      if (passwordList[i].id === data.id) {
        passwordList[i] = data;
        break;
      }
    }
    setPasswordList(passwordList);
    setEditPasswordModalOpen(false);
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
          if (activeTagNumber === 0 || activeTagNumber === tag) {
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
