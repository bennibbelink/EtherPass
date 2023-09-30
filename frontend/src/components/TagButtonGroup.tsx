import { useContext } from "react";
import { TagContext } from "../context/TagContext";
import { tagMap } from "../utils/TagMap";
import TagMenuButton from "./TagMenuButton";
const TagButtonGroup = () => {
  const { setActiveTagNumber } = useContext(TagContext);
  const handleTagClick = (tagNumber: number) => {
    if (setActiveTagNumber) setActiveTagNumber(tagNumber);
  };

  return (
    <div className="flex flex-col gap-2 my-2">
      <TagMenuButton handleTagClick={handleTagClick} tagNumber={0} />
      {Object.entries(tagMap).map((color, index) => {
        return (
          <TagMenuButton
            key={index}
            handleTagClick={handleTagClick}
            color={color[1]}
            tagNumber={Number(color[0])}
          />
        );
      })}
    </div>
  );
};

export default TagButtonGroup;
