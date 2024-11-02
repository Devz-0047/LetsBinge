import axios from "axios";

const API_KEY = import.meta.env.VITE_TMDB_API_KEY;
export async function fetchTMDBDataById(contentId, isSeries) {
  const url = `https://api.themoviedb.org/3/${isSeries ? "tv" : "movie"}/${contentId}?api_key=${API_KEY}`;
  const response = await axios.get(url);
  return response.data;
}
