import { useEffect, useState } from "react";
import { tagMap } from "../../utils/TagMap";
import clsx from "clsx";
import { ImCancelCircle } from "react-icons/im";
import { Password } from "../../testData";
import ExitButton from "./ExitButton";
import toast, { Toaster } from "react-hot-toast";

interface Props {
  onClose: () => void;
  title: string;
  handleSubmit: (data: Password) => void;
  initialData?: Password;
}
const defaultInitialData: Password = {
  id: -1,
  nickname: "",
  username: "",
  password: "",
  domain: "",
  tag: 0,
};

const PasswordForm = ({ onClose, title, handleSubmit, initialData }: Props) => {
  const [data, setData] = useState<Password>(defaultInitialData);

  useEffect(() => {
    if (initialData) setData(initialData);
  }, [initialData]);

  return (
    <>
      <Toaster />
      <ExitButton
        onClick={onClose}
        icon={<ImCancelCircle className="h-6 w-6" />}
      />
      <form
        onSubmit={(e) => {
          e.preventDefault();
          if (
            data.nickname === "" ||
            data.username === "" ||
            data.password === "" ||
            data.domain === ""
          ) {
            toast.error("Please fill out all fields");
            return;
          }
          setData(defaultInitialData);
          handleSubmit(data);
        }}
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
          <label htmlFor="password" className="label py-0 font-medium">
            <span className="label-text text-base">Password</span>
          </label>
          <input
            className="input input-sm input-bordered w-full max-w-xs"
            type="text"
            value={data.password}
            onChange={(e) => setData({ ...data, password: e.target.value })}
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
          <div
            onClick={() => setData({ ...data, tag: 0 })}
            className={clsx(
              "rounded-full h-4 w-4 cursor-pointer transition-all duration-75 border-2",
              data.tag === 0 ? "border-white" : "border-accent"
            )}></div>
          {Object.entries(tagMap).map((color, index) => {
            return (
              <div
                onClick={() => setData({ ...data, tag: Number(color[0]) })}
                key={index}
                className={clsx(
                  "rounded-full h-4 w-4 cursor-pointer transition-all duration-75",
                  color,
                  data.tag === Number(color[0]) && "border-2 border-white"
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
