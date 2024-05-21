import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { toggleMenu } from "../utils/appSlice";
import { YOUTUBE_SEARCH_API } from "../utils/constants";
import { searchCache } from "../utils/lruCache";
// import { cacheResults } from "../utils/searchSlices";

const Head = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  // const searchCache = useSelector((store) => store.search);

  const dispatch = useDispatch();

  useEffect(() => {
    const timer = setTimeout(() => {
      if (searchCache.has(searchQuery)) {
        setSuggestions(searchCache.get(searchQuery));
      } else {
        getSearchSuggestion();
      }
    }, 200);

    return () => {
      clearTimeout(timer);
    };
  }, [searchQuery]);

  const toggleMenuHandler = () => {
    dispatch(toggleMenu());
  };

  const getSearchSuggestion = async () => {
    const data = await fetch(YOUTUBE_SEARCH_API + searchQuery);
    const json = await data.json();
    // console.log(json[1]);
    setSuggestions(json[1]);

    // // update in cache
    // dispatch(
    //   cacheResults({
    //     [searchQuery]: json[1],
    //   })
    // );

    searchCache.set(searchQuery, json[1]);
  };

  const handleList = (s) => {
    setSearchQuery(s);
    setShowSuggestions(false);
  };

  return (
    <div className="grid grid-flow-col p-5 m-2 shadow-lg">
      <div className="flex col-span-1">
        <img
          onClick={() => toggleMenuHandler()}
          className="h-10 w-10 cursor-pointer"
          alt="menu"
          src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAKAAAACgCAMAAAC8EZcfAAAARVBMVEX///8AAAD19fXo6OhDQ0Pv7+9JSUkbGxu8vLzJycmMjIz4+PjBwcGCgoJRUVFzc3MmJiaZmZkgICBeXl56enplZWVWVlaT91pBAAABgElEQVR4nO3b246CMBhFYebASSkqHt7/UWeYCdaLtmK82JtkfU+wEkMtP21VAQAAAAAAAOvtP2X2z+vqITStTBOGutzXNx9iTV/qC+q8Wcj37dRt/3a5vk5dtugyz8eoDluM6SelV3dF6QfloM6KDsnAozorOiYD1VWPthk4qauiKRl4UWdF6T8Tm3U6t1LXN3XX4pbZ0gzqsMWQ7vPfLFTVSd02O+X7fv+P5WvNVNywzonX8VtmvD7L+1PLrKkDAAAA8J76S2bNnr8L50bmHDLj6bu+Vb92tsX3OovRQmGwYNG35e8k7uM3m+lbbv5mNAK+JAP5TvKCbQba/8T2D4n9MmO/UNv/1flvFkwKC33+G9bKfss/M39pAgAAAPAm76NR5ofL3I/nuR9wtBgsFEYLNvO3zCFbn/skmfGbzfQtN38zGgGnj8rLV5gofdlAXfVom4H230nsL13ZX1vzWagzF/98VuoNfydxv77rfwHa/wr5zPsSPgAAAAAAAHD3AycCPgunKl+TAAAAAElFTkSuQmCC"
        />
        <a href="#">
          <img
            className="h-10 mx-2"
            alt="youtuelogo"
            src="https://upload.wikimedia.org/wikipedia/commons/thumb/b/b8/YouTube_Logo_2017.svg/2560px-YouTube_Logo_2017.svg.png"
          />
        </a>
      </div>
      <div className="col-span-10 px-10">
        <div className="sticky top-20 z-40 w-full px-1">
          <div className="gap-1">
            <form className="relative">
              <input
                type="text"
                className="px-5 w-1/2 border border-gray-400 p-2 rounded-l-full"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onFocus={() => setShowSuggestions(true)}
              />
              <button className="border border-gray-400 px-5 py-2 rounded-r-full bg-gray-100">
                🔍
              </button>
              {showSuggestions && suggestions.length > 0 && (
                <ul className="absolute w-1/2 rounded-bl-3xl rounded-br-3xl border-r border-l border-b bg-white focus:border-blue-400 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-40 overflow-hidden">
                  {suggestions.map((s) => (
                    <li
                      key={s}
                      onClick={() => handleList(s)}
                      className="cursor-pointer border-gray-300 p-2 px-4 text-gray-700 hover:bg-blue-400"
                    >
                      🔍 {s}
                    </li>
                  ))}
                </ul>
              )}
            </form>
          </div>
        </div>
      </div>
      <div className="col-span-1">
        <img
          className="h-8"
          alt="usericon"
          src="https://www.iconpacks.net/icons/2/free-user-icon-3296-thumb.png"
        />
      </div>
    </div>
  );
};

export default Head;
