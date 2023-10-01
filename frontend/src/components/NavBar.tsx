import { IoAddCircleOutline } from "react-icons/io5";
import clsx from "clsx";
import { useContext, useState } from "react";
import { PasswordListContext } from "../context/PasswordListContext";
import { getPasswordListsEqual } from "../utils/comparePasswords";
import Modal from "./forms/Modal";
import PasswordForm from "./forms/PasswordForm";
import { Password } from "../testData";

const NavBar = () => {
  const { setPasswordList } = useContext(PasswordListContext);
  const [addPasswordModalOpen, setAddPasswordModalOpen] = useState(false);
  const { initialPasswordList, passwordList, commitChanges } =
    useContext(PasswordListContext);
  const handleOpenAddPassword = () => {
    setAddPasswordModalOpen(true);
  };
  const onSaveClick = async () => {
    await commitChanges();
    console.log("updated data and make request");
  };

  const handleCancel = () => {
    setPasswordList(initialPasswordList);
  };

  const handleSubmit = (data: Password) => {
    setAddPasswordModalOpen(false);
    setPasswordList((prev) => [...prev, data]);
    console.log(data);
  };

  return (
    <>
      <div className="sticky z-50 top-0 w-full h-10 bg-base-300 flex px-4 items-center">
        <h1 className="prose p-2 flex-1">Ether Pass</h1>
        <div className="flex gap-2">
          {!getPasswordListsEqual(initialPasswordList, passwordList) && (
            <>
              <button
                className={clsx("btn btn-sm btn-accent")}
                onClick={handleCancel}>
                Cancel
              </button>
              <button
                className={clsx("btn btn-sm btn-accent")}
                onClick={onSaveClick}>
                Save
              </button>
            </>
          )}

          <button onClick={handleOpenAddPassword}>
            <IoAddCircleOutline className="w-6 h-6" />
          </button>
        </div>
      </div>
      <Modal
        open={addPasswordModalOpen}
        onClose={() => setAddPasswordModalOpen(false)}>
        <PasswordForm
          onClose={() => setAddPasswordModalOpen(false)}
          title="Add a Password"
          handleSubmit={handleSubmit}
        />
      </Modal>
    </>
  );
};

export default NavBar;
