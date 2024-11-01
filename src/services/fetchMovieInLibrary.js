import { supabase } from "./supabase";

// Define the query function for checking if a movie exists in the library
export async function fetchMovieInLibrary(movieId, userId) {
  const { data, error } = await supabase
    .from("Library")
    .select("*")
    .eq("content_id", movieId)
    .eq("users_id", userId)
    .single();

  if (error && error.code !== "PGRST116") {
    throw new Error("Failed to check movie in library");
  }

  return data; // Will return the movie data if found, or null if not found
}
