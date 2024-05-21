import { useState, useEffect } from "react";
import Chip from "./Chip";
import { YOUTUBE_CATEGORY_LIST } from "../utils/constants";
import { categoryListCache } from "../utils/lruCache";

const ChipGroup = () => {
  const [chipGroup, setChipGroup] = useState([]);
  const [selected, setSelected] = useState("All");

  const handleClick = (name) => {
    setSelected(name);
  };

  const hasSelected = (name) => {
    return selected === name;
  };

  useEffect(() => {
    if (categoryListCache.has("categoryListCache")) {
      setChipGroup(categoryListCache.get("categoryListCache"));
    } else {
      getCategoryList();
    }
  }, []);

  const getCategoryList = async () => {
    const data = await fetch(YOUTUBE_CATEGORY_LIST);
    const json = await data.json();
    setChipGroup(json.items);
    categoryListCache.set("categoryListCache", json.items);
  };

  return (
    <div className="flex w-full flex-wrap p-0 m-0 gp-2">
      <Chip
        name="All"
        isSelected={hasSelected("All")}
        onClick={() => handleClick("All")}
      />
      {chipGroup &&
        chipGroup.length > 0 &&
        chipGroup.slice(0, 10).map((chip) => {
          const { id, snippet } = chip;
          const { title } = snippet;
          return (
            <Chip
              key={id}
              name={title}
              isSelected={hasSelected(title)}
              onClick={() => handleClick(title)}
            />
          );
        })}
    </div>
  );
};

export default ChipGroup;
