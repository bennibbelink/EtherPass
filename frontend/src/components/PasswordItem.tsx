import { Password } from "../testData";
import { CiMenuKebab } from "react-icons/ci";
import { tagMap } from "../utils/TagMap";
type Props = {
  password: Password;
};
const PasswordItem = ({ password }: Props) => {
  const { passwordText, domain, username, tag, nickname } = password;
  return (
    <div className="p-2 m-4 card shadow-xl bg-neutral">
      <div className="flex">
        <p className="card-title">{nickname}</p>
        <div className="flex-1">
          <p>{domain}</p>
          <p>{username}</p>
          <p>{passwordText}</p>
        </div>
        <div className="flex flex-col gap-1 justify-center items-center">
          <button
            // className="btn btn-sm btn-neutral-focus p-1 m-0 rounded-full"
            className="btn p-0 rounded-full"
            onClick={() => {
              console.log("menu");
            }}>
            <CiMenuKebab className="w-6 h-6" />
          </button>
          <div className={`rounded-full w-3 h-3 ${tagMap[tag]}`}></div>
        </div>
      </div>
    </div>
  );
};

export default PasswordItem;
