import { Password } from "../testData";
import { CiMenuKebab } from "react-icons/ci";
import { tagMap } from "../utils/TagMap";
import { AiOutlineEye } from "react-icons/ai";
import { FiCopy } from "react-icons/fi";
import { useState } from "react";
import "../App.css";
import PasswordButton from "./PasswordButton";
type Props = {
  password: Password;
  handleEdit: (password: Password) => void;
  handleDelete: (id: number) => void;
};

const PasswordItem = ({ password, handleDelete, handleEdit }: Props) => {
  const {
    id,
    password: passwordText,
    domain,
    username,
    tag,
    nickname,
  } = password;
  const [passwordVisible, setPasswordVisible] = useState(false);

  const copyPassword = async () => {
    try {
      await navigator.clipboard.writeText(passwordText);
    } catch (e) {
      console.log(e);
    }
  };

  const togglepassword = () => {
    setPasswordVisible(!passwordVisible);
  };

  return (
    <div className="p-2 card shadow-xl bg-neutral">
      <div className="flex">
        <div className="flex flex-col flex-1 h-full">
          <div className="flex">
            <p className="w-1/2 text-lg">{nickname}</p>
            <p className="w-1/2 text-lg">{username}</p>
          </div>
          <p>{domain}</p>
          <div className="flex gap-1 items-center">
            <div className="flex gap-1 flex-1 items-center h-6">
              {passwordVisible
                ? passwordText
                : passwordText
                    .split("")
                    .map((_, index) => (
                      <div
                        key={index}
                        className="rounded-full bg-white w-2 h-2"></div>
                    ))}
            </div>
            <div className="flex gap-4 mr-4">
              <PasswordButton
                onClick={togglepassword}
                icon={<AiOutlineEye className="w-5 h-5" />}
              />
              <PasswordButton
                onClick={copyPassword}
                icon={<FiCopy className="w-5 h-5" />}
              />
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-2 justify-center items-center">
          <div className="dropdown dropdown-left">
            <div>
              <label tabIndex={0}>
                <CiMenuKebab
                  className="btn p-0 w-6 h-6 rounded-full"
                  onClick={() => {
                    console.log("menu");
                  }}
                />
              </label>
              <ul
                tabIndex={0}
                className="dropdown-content p-2 flex flex-col gap-1">
                <li className="btn btn-sm" onClick={() => handleEdit(password)}>
                  Edit
                </li>
                <li className="btn btn-sm" onClick={() => handleDelete(id)}>
                  Delete
                </li>
              </ul>
            </div>
          </div>

          <div className={`rounded-full w-4 h-4 ${tagMap[tag]}`}></div>
        </div>
      </div>
    </div>
  );
};

export default PasswordItem;
