import axios from "axios";

import { useEffect, useState } from "react";
import Spinner from "./Spinner";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { useAddMovieToLibrary } from "../hooks/useAddMovieToLibrary";
import { useAuth } from "../hooks/useAuth";
import { fetchMovieInLibrary } from "../services/fetchMovieInLibrary";
import { QueryClient } from "@tanstack/react-query";
const API_KEY = import.meta.env.VITE_TMDB_API_KEY;

export default function TrendingHome() {
  const [trendingMovie, setTrendingMovie] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const addMovieToLibrary = useAddMovieToLibrary();
  const { data: session, isLoading: isSessionLoading } = useAuth();
  const queryClient = new QueryClient();

  const handleAddMovie = async (movieId) => {
    // Check if the user is logged in
    if (!session) {
      toast.error("To add movies to the library, you need to login.");
      return;
    }
    try {
      const existingMovie = await queryClient.ensureQueryData({
        queryKey: ["checkMovieInLibrary", movieId, session.user.id],
        queryFn: () => fetchMovieInLibrary(movieId, session.user.id),
      });
      if (existingMovie) {
        toast.error("This movie is already in your library.");
        return;
      }

      addMovieToLibrary.mutate(
        { movieId, userId: session.user.id },
        {
          onError: () => {
            toast.error("Failed to add movie. Please try again.");
          },
          onSuccess: () => {},
        },
      );
    } catch (error) {
      console.error(error);
      toast.error("An error occurred while checking the library.");
    }
  };
  // navigate(`/movie/${movie.id}`) =   window.location.href = `/movie/${movie.id}`;
  //https://api.themoviedb.org/3/trending/movie/week?api_key=${API_KEY}

  useEffect(() => {
    let cancel;
    const fetchMovies = async () => {
      setLoading(true); // Set loading to true when fetching
      try {
        if (cancel) cancel();
        const response = await axios.get(
          `https://api.themoviedb.org/3/trending/movie/week?api_key=${API_KEY}`,
          {
            cancelToken: new axios.CancelToken((c) => (cancel = c)),
          },
        );

        setTrendingMovie(response.data.results.slice(0, 5)); // Store movie results if needed
      } catch (err) {
        setError(err); // Set the error state
      } finally {
        setLoading(false); // Set loading to false after fetching
      }
    };

    fetchMovies(); // Call the fetchMovies function

    // Optional: Cleanup function to cancel the request when the component unmounts
    return () => {
      if (cancel) cancel();
    };
  }, [API_KEY]); // Add API_KEY as a dependency (if it changes, the effect runs again)

  return (
    <div className="x mt-[6rem] max-h-[40rem] max-w-[17.5rem] overflow-y-auto rounded-r-md bg-slate-950">
      {loading ? (
        <Spinner w="12" h="12" />
      ) : (
        <>
          <p className="bg-slate-950 pb-2 text-center text-[22px] font-semibold text-orange-600">
            Trending
          </p>
          {trendingMovie &&
            trendingMovie.length > 0 && ( // Ensure trendingMovie has items
              <ul className="bg-slate-950">
                {trendingMovie.map((movie) => (
                  <li
                    className="relative mb-[0.12rem] cursor-pointer rounded-md border border-orange-400 bg-slate-950 pl-1 font-semibold text-orange-400 shadow-md hover:bg-orange-500"
                    key={movie.id}
                    onClick={() => {
                      navigate(`/movie/${movie.id}`);
                    }}
                  >
                    <div className="flex items-center justify-center gap-2 bg-slate-950 py-2">
                      <div>
                        <img
                          src={`https://image.tmdb.org/t/p/w154${movie.poster_path}`}
                          alt={movie.title}
                          className="w-[5rem] rounded-md"
                        />
                      </div>
                      <div className="bg-slate-950">
                        <p className="font-md bg-slate-950 text-[16px] text-orange-500">
                          {movie.title.split(" ").slice(0, 3).join(" ")}
                        </p>
                        <p className="bg-slate-950 text-[14px] text-orange-400">
                          Rating: {movie.vote_average.toFixed(1)}/10
                        </p>
                        <p className="bg-slate-950 text-[14px] text-orange-400">
                          Release Date: {movie.release_date}
                        </p>
                        <button
                          className="rounded-sm bg-orange-400 px-1 py-[0.5px] hover:bg-orange-500"
                          onClick={(event) => {
                            event.stopPropagation();
                            handleAddMovie(movie.id);
                          }}
                        >
                          <p className="text-[14px] text-orange-950">
                            Add to Library
                          </p>
                        </button>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            )}
        </>
      )}
    </div>
  );
}
