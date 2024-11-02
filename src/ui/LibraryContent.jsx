import { useState } from "react";
import { useAuth } from "../hooks/useAuth";
import { useQuery } from "@tanstack/react-query";
import {
  fetchMoviesContentIds,
  fetchSeriesContentIds,
} from "../services/fetchAllContent";
import MovieLib from "./MovieLib";
import SeriesLib from "./SeriesLib";

function LibraryContent() {
  const [contentType, setContentType] = useState("movie");
  const { data: session, isLoading: isSessionLoading } = useAuth();

  // Check if session is loaded before accessing session.user.id
  const userId = session?.user?.id;

  const {
    data: movies,
    error: moviesError,
    isLoading: isMoviesLoading,
  } = useQuery({
    queryKey: ["userMoviesDetails", userId],
    queryFn: () => fetchMoviesContentIds(userId),
    enabled: !!userId,
  });

  const {
    data: series,
    error: seriesError,
    isLoading: isSeriesLoading,
  } = useQuery({
    queryKey: ["userSeriesDetails", userId],
    queryFn: () => fetchSeriesContentIds(userId),
    enabled: !!userId,
  });

  if (isSessionLoading || isMoviesLoading || isSeriesLoading) {
    return <div>Loading...</div>;
  }

  if (moviesError || seriesError) {
    return <div>Error loading content.</div>;
  }

  return (
    <div>
      <button
        className={`rounded-l-md ${contentType === "movie" ? "bg-orange-400" : "bg-orange-300"} px-4 py-1 text-2xl text-orange-900 hover:bg-orange-500 active:bg-orange-500`}
        onClick={() => setContentType("movie")}
      >
        Movies
      </button>
      <button
        className={`rounded-r-md ${contentType === "tv" ? "bg-orange-400" : "bg-orange-300"} px-4 py-1 text-2xl text-orange-900 hover:bg-orange-500`}
        onClick={() => setContentType("tv")}
      >
        Series
      </button>

      <ul>
        {contentType === "movie" && movies
          ? movies.map((movie) => (
              <li key={movie.id}>
                <MovieLib
                  id={movie.id}
                  title={movie.title}
                  release_date={movie.release_date}
                  vote_average={movie.vote_average}
                  poster_path={movie.poster_path}
                />
              </li>
            ))
          : series &&
            series.map((serie) => (
              <li key={serie.id} className="ml-10 grid grid-cols-6 gap-4">
                <SeriesLib
                  id={serie.id}
                  title={serie.original_name}
                  release_date={serie.first_air_date}
                  vote_average={serie.vote_average}
                  poster_path={serie.poster_path}
                />
              </li>
            ))}
      </ul>
    </div>
  );
}

export default LibraryContent;
