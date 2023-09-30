import { useState } from "react";
import clsx from "clsx";
type Props = {
  onClick: () => void;
  icon: React.ReactNode;
};

const ExitButton = ({ onClick, icon }: Props) => {
  const [hover, setHover] = useState(false);
  return (
    <button
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      className={clsx(
        "m-0 rounded-full transition-all duration-200 absolute top-3 right-3",
        hover ? "text-accent-focus" : "text-accent"
      )}
      onClick={onClick}>
      {icon}
    </button>
  );
};

export default ExitButton;
