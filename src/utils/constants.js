const GOOGLE_API_KEY = process.env.REACT_APP_YOUTUBE_API;

export const YOUTUBE_VIDEOS_API =
  "https://youtube.googleapis.com/youtube/v3/videos?part=snippet%2CcontentDetails%2Cstatistics&chart=mostPopular&regionCode=IN&maxResults=12&key=" +
  GOOGLE_API_KEY;

export const YOUTUBE_CATEGORY_LIST =
  "https://www.googleapis.com/youtube/v3/videoCategories?part=snippet&regionCode=IN&key=" +
  GOOGLE_API_KEY;

export const YOUTUBE_SEARCH_API =
  "http://suggestqueries.google.com/complete/search?client=firefox&ds=yt&q=";

export const SEARCH_KEY = "autosearch";

export const LIVE_CHAT_COUNT = 25;
