import clsx from "clsx";
import { useState } from "react";
import { FcCancel } from "react-icons/fc";
type Props = {
  color: string;
  tagNumber: number;
  isAll?: boolean;
  handleTagClick: (tagNumber: number) => void;
};

const TagMenuButton = ({ color, isAll, handleTagClick, tagNumber }: Props) => {
  const [hover, setHover] = useState(false);

  return (
    <div
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      onClick={() => handleTagClick(tagNumber)}
      className={clsx(
        "rounded-full w-6 h-6 cursor-pointer transition-all duration-75",
        color,
        hover ? "border-2 border-white" : "border-0"
      )}>
      {isAll && <FcCancel className="w-6 h-6" />}
    </div>
  );
};

export default TagMenuButton;
