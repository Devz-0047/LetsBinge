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
    data: moviesAll,
    error: moviesError,
    isLoading: isMoviesLoading,
  } = useQuery({
    queryKey: ["userMoviesDetails", userId],
    queryFn: () => fetchMoviesContentIds(userId),
    enabled: !!userId,
  });

  const {
    data: seriesAll,
    error: seriesError,
    isLoading: isSeriesLoading,
  } = useQuery({
    queryKey: ["userSeriesDetails", userId],
    queryFn: () => fetchSeriesContentIds(userId),
    enabled: !!userId,
  });

  const [currentPageMovie, setCurrentPageMovie] = useState(1);
  const moviesPerPage = 12;
  const movieList = Array.isArray(moviesAll) ? moviesAll : [];
  const startIndexMovie = (currentPageMovie - 1) * moviesPerPage;
  const paginatedMovies = movieList.slice(
    startIndexMovie,
    startIndexMovie + moviesPerPage,
  );
  const handlePageChangeMovie = (pageNumber) => {
    setCurrentPageMovie(pageNumber);
  };

  const totalPagesMovie = Math.ceil(movieList.length / moviesPerPage);

  const [currentPageSeries, setCurrentPageSeries] = useState(1);
  const seriesPerPage = 12;
  const seriesList = Array.isArray(seriesAll) ? seriesAll : [];
  const startIndexSeries = (currentPageSeries - 1) * seriesPerPage;
  const paginatedSeries = seriesList.slice(
    startIndexSeries,
    startIndexSeries + seriesPerPage,
  );
  const handlePageChangeSeries = (pageNumber) => {
    setCurrentPageSeries(pageNumber);
  };

  const totalPagesSeries = Math.ceil(seriesList.length / seriesPerPage);

  if (isSessionLoading || isMoviesLoading || isSeriesLoading) {
    return <div>Loading...</div>;
  }

  if (moviesError || seriesError) {
    return <div>Error loading content.</div>;
  }

  return (
    <div>
      <button
        className={`rounded-l-md ${
          contentType === "movie" ? "bg-orange-400" : "bg-orange-300"
        } px-4 py-1 text-2xl text-orange-900 hover:bg-orange-500 active:bg-orange-500`}
        onClick={() => setContentType("movie")}
      >
        Movies
      </button>
      <button
        className={`rounded-r-md ${
          contentType === "tv" ? "bg-orange-400" : "bg-orange-300"
        } px-4 py-1 text-2xl text-orange-900 hover:bg-orange-500`}
        onClick={() => setContentType("tv")}
      >
        Series
      </button>

      {contentType === "movie" ? (
        <>
          <ul className="ml-4 grid grid-cols-6 gap-4 pt-4">
            {paginatedMovies.map((movie) => (
              <li key={movie.id}>
                <MovieLib
                  id={movie.id}
                  title={movie.title}
                  release_date={movie.release_date}
                  vote_average={movie.vote_average}
                  poster_path={movie.poster_path}
                />
              </li>
            ))}
          </ul>
          <div className="mt-4 flex justify-center space-x-2">
            {Array.from({ length: totalPagesMovie }, (_, index) => (
              <button
                onClick={() => handlePageChangeMovie(index + 1)}
                key={index}
                className={`mb-4 rounded-md border px-3 py-1 ${
                  currentPageMovie === index + 1
                    ? "bg-orange-500 text-slate-950 hover:bg-orange-600"
                    : "bg-orange-300 text-slate-950 hover:bg-orange-400"
                }`}
              >
                {index + 1}
              </button>
            ))}
          </div>
        </>
      ) : (
        <>
          <ul className="ml-4 grid grid-cols-6 gap-4 pt-4">
            {paginatedSeries.map((series) => (
              <li key={series.id}>
                <SeriesLib
                  id={series.id}
                  title={series.original_name}
                  release_date={series.first_air_date}
                  vote_average={series.vote_average}
                  poster_path={series.poster_path}
                />
              </li>
            ))}
          </ul>
          <div className="mt-4 flex justify-center space-x-2">
            {Array.from({ length: totalPagesSeries }, (_, index) => (
              <button
                onClick={() => handlePageChangeSeries(index + 1)}
                key={index}
                className={`mb-4 rounded-md border px-3 py-1 ${
                  currentPageSeries === index + 1
                    ? "bg-orange-500 text-slate-950 hover:bg-orange-600"
                    : "bg-orange-300 text-slate-950 hover:bg-orange-400"
                }`}
              >
                {index + 1}
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  );
}

export default LibraryContent;
