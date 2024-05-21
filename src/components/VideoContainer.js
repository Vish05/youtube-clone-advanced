import { useCallback, useEffect, useState, useRef } from "react";
import { Link } from "react-router-dom";
import { YOUTUBE_VIDEOS_API } from "../utils/constants";
import VideoCard from "./VideoCard";
import Shimmer from "./Shimmer";

const VideoContainer = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [videos, setVideos] = useState([]);
  const urlRef = useRef(YOUTUBE_VIDEOS_API);

  const getVideos = useCallback(async () => {
    setIsLoading(true);
    try {
      const data = await fetch(urlRef.current);
      if (!data.ok) {
        throw new Error("Failed to fetch data");
      }
      const json = await data.json();
      setVideos((prevVideos) => [...prevVideos, ...json.items]);
      urlRef.current = YOUTUBE_VIDEOS_API + "&pageToken=" + json.nextPageToken;
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const handleScroll = useCallback(() => {
    if (window.innerHeight + window.scrollY >= document.body.scrollHeight) {
      // you're at the bottom of the page
      getVideos();
    }
  }, []);

  useEffect(() => {
    getVideos();

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);

  return (
    <div className="container mx-auto">
      {!isLoading && (
        <div className="grid grid-cols-4 gap-2">
          {videos &&
            videos.length > 0 &&
            videos.map((video) => (
              <Link
                key={`id-${Math.random().toString(16).slice(2)}`}
                to={"/watch?v=" + video.id}
              >
                <VideoCard info={video} />
              </Link>
            ))}
        </div>
      )}
      {isLoading && <Shimmer />}
    </div>
  );
};

export default VideoContainer;
