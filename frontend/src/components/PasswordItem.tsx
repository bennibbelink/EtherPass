import { Password } from "../testData";
type Props = {
  password: Password;
};
const PasswordItem = ({ password }: Props) => {
  const { passwordText, domain, username, tag } = password;
  return (
    <div className="p-2 m-4 card shadow-xl bg-neutral">
      <p className="card-title">{domain}</p>
      <div className="">
        <p>{username}</p>
        <p>{passwordText}</p>
        <p>{tag}</p>
      </div>
    </div>
  );
};

export default PasswordItem;
