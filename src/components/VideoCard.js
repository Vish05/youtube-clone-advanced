const VideoCard = ({ info }) => {
  const { snippet, statistics } = info;
  const { channelTitle, title, thumbnails } = snippet;
  return (
    <div className="p-2 m-2 shadow-lg">
      <img
        className="rounded-lg"
        alt="thumbnails"
        src={thumbnails.medium.url}
      />
      <ul className="p-2">
        <li className="font-bold line-clamp-2">{title}</li>
        <li>{channelTitle}</li>
        <li>{statistics.viewCount} Million views</li>
      </ul>
    </div>
  );
};

export default VideoCard;
