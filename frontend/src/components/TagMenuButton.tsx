import clsx from "clsx";
import { useContext, useState } from "react";
import { FcCancel } from "react-icons/fc";
import { TagContext } from "../context/TagContext";
type Props = {
  color?: string;
  tagNumber: number;
  isAll?: boolean;
  handleTagClick: (tagNumber: number) => void;
};

const TagMenuButton = ({ color, isAll, handleTagClick, tagNumber }: Props) => {
  const [hover, setHover] = useState(false);
  const { activeTagNumber } = useContext(TagContext);

  return (
    <div
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      onClick={() => handleTagClick(tagNumber)}
      className={clsx(
        "rounded-full w-6 h-6 cursor-pointer transition-all duration-75",
        color ? color : "bg-base-300 border-2 border-accent",
        (hover || activeTagNumber === tagNumber) && "border-2 border-white"
      )}>
      {isAll && <FcCancel className="w-6 h-6" />}
    </div>
  );
};

export default TagMenuButton;
