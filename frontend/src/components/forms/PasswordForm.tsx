import { useEffect, useState } from "react";
import { tagMap } from "../../utils/TagMap";
import clsx from "clsx";
import { ImCancelCircle } from "react-icons/im";
import { Password } from "../../testData";
import ExitButton from "./ExitButton";

interface Props {
  onClose: () => void;
  title: string;
  handleSubmit: (e: React.FormEvent<HTMLFormElement>, data: Password) => void;
  initialData?: Password;
}

const PasswordForm = ({ onClose, title, handleSubmit, initialData }: Props) => {
  const [data, setData] = useState<Password>({
    id: -1,
    nickname: "",
    username: "",
    passwordText: "",
    domain: "",
    tag: 0,
  });

  useEffect(() => {
    if (initialData) setData(initialData);
  }, [initialData]);

  return (
    <>
      <ExitButton
        onClick={onClose}
        icon={<ImCancelCircle className="h-6 w-6" />}
      />
      <form
        onSubmit={(e) => handleSubmit(e, data)}
        className="flex flex-col gap-1 items-center">
        <h2 className="text-2xl font-bold pb-1">{title}</h2>
        <div>
          <label htmlFor="nickname" className="label py-0 font-medium">
            <span className="label-text text-base">Nickname</span>
          </label>
          <input
            className="input input-sm input-bordered w-full max-w-xs"
            type="text"
            value={data.nickname}
            onChange={(e) => setData({ ...data, nickname: e.target.value })}
          />
        </div>
        <div>
          <label htmlFor="username" className="label py-0 font-medium">
            <span className="label-text text-base">Username</span>
          </label>
          <input
            className="input input-sm input-bordered w-full max-w-xs"
            type="text"
            value={data.username}
            onChange={(e) => setData({ ...data, username: e.target.value })}
          />
        </div>
        <div>
          <label htmlFor="passwordText" className="label py-0 font-medium">
            <span className="label-text text-base">Password</span>
          </label>
          <input
            className="input input-sm input-bordered w-full max-w-xs"
            type="text"
            value={data.passwordText}
            onChange={(e) => setData({ ...data, passwordText: e.target.value })}
          />
        </div>
        <div>
          <label htmlFor="domain" className="label py-0 font-medium">
            <span className="label-text text-base">Domain</span>
          </label>
          <input
            className="input input-sm input-bordered w-full max-w-xs"
            type="text"
            value={data.domain}
            onChange={(e) => setData({ ...data, domain: e.target.value })}
          />
        </div>
        {/* <span className="label-text text-base">Tag</span> */}
        <div className="flex gap-3 py-2">
          {Object.entries(tagMap).map((color, index) => {
            if (index === 0)
              return (
                <div
                  key={index}
                  onClick={() => setData({ ...data, tag: index })}
                  className={clsx(
                    "rounded-full h-4 w-4 cursor-pointer transition-all duration-75 border-2",
                    data.tag === index ? "border-white" : "border-accent"
                  )}></div>
              );
            return (
              <div
                onClick={() => setData({ ...data, tag: index })}
                key={index}
                className={clsx(
                  "rounded-full h-4 w-4 cursor-pointer transition-all duration-75",
                  color,
                  data.tag === index && "border-2 border-white"
                )}></div>
            );
          })}
        </div>
        <button className="btn btn-accent btn-sm text-center" type="submit">
          Add
        </button>
      </form>
    </>
  );
};

export default PasswordForm;
