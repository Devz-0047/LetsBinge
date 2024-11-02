import { useAuth } from "../hooks/useAuth";
import { fetchTMDBDataById } from "./fetchTMDBData";
import { supabase } from "./supabase";

export async function fetchMoviesContentIds(userId) {
  const { data: movieContentIds, error } = await supabase
    .from("Library")
    .select("content_id")
    .eq("isSeries", false)
    .eq("users_id", userId);
  if (error) {
    throw new Error("Error fetching movie content Ids");
  }
  const movies = await Promise.all(
    movieContentIds.map(({ content_id }) =>
      fetchTMDBDataById(content_id, false),
    ),
  );

  return movies;
}
export async function fetchSeriesContentIds(userId) {
  const { data: seriesContentIds, error } = await supabase
    .from("Library")
    .select("content_id")
    .eq("isSeries", true)
    .eq("users_id", userId);
  if (error) {
    throw new Error("Error fetching series content IDs");
  }
  const series = await Promise.all(
    seriesContentIds.map(({ content_id }) =>
      fetchTMDBDataById(content_id, true),
    ),
  );
  return series;
}
