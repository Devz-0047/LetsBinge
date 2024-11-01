import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Spinner from "./Spinner";
import { CgMoreR } from "react-icons/cg";
import { FaBookmark } from "react-icons/fa";
import toast from "react-hot-toast";
import { fetchMovieInLibrary } from "../services/fetchMovieInLibrary";
import { useAuth } from "../hooks/useAuth";
import { QueryClient } from "@tanstack/react-query";
import { useAddMovieToLibrary } from "../hooks/useAddMovieToLibrary";

const API_KEY = import.meta.env.VITE_TMDB_API_KEY;

function SeriesCard({ timeWindowSeries }) {
  const [trendingMovies, setTrendingMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const { data: session, isLoading: isSessionLoading } = useAuth();

  const queryClient = new QueryClient();
  const addMovieToLibrary = useAddMovieToLibrary();
  const handleAddSeries = async (movieId, isSeries = true) => {
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
        { movieId, userId: session.user.id, isSeries },
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

  useEffect(() => {
    const fetchMovies = async () => {
      setLoading(true); // Show loading
      try {
        const response = await axios.get(
          `https://api.themoviedb.org/3/trending/tv/${timeWindowSeries}?api_key=${API_KEY}`,
        );
        // console.log(response); // Log response for debugging
        setTrendingMovies(response.data.results.slice(0, 8)); // Set the first movie result
      } catch (err) {
        setError(err); // Capture and set any errors
      } finally {
        setLoading(false); // Stop loading
      }
    };

    fetchMovies();
  }, [timeWindowSeries]);

  // Render loading, error, or movie data
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div className="w-full max-w-full overflow-hidden">
      {trendingMovies.length > 0 ? (
        <div className="h-[20rem] w-full max-w-[100%] overflow-x-auto">
          <ul className="flex items-center justify-start gap-4">
            {trendingMovies.map((trendingMovie) => (
              <li
                className="relative min-w-[10rem] max-w-[12rem] cursor-pointer bg-slate-900 hover:shadow-md"
                key={trendingMovie.id}
                onClick={() => {
                  navigate(`/series/${trendingMovie.id}`);
                }}
              >
                <img
                  src={`https://image.tmdb.org/t/p/w154${trendingMovie.poster_path}`}
                  alt={trendingMovie.title}
                  className="h-[14rem] w-[10rem] opacity-90 hover:opacity-100"
                />
                <p className="text-[0.95rem] font-semibold text-orange-500">
                  {trendingMovie.name}
                </p>
                <div className="flex justify-between">
                  <p className="text-sm text-orange-400">
                    {trendingMovie.first_air_date}
                  </p>
                  <p className="text-sm text-orange-400">
                    {trendingMovie.vote_average.toFixed(1)}/10
                  </p>
                </div>
                <button
                  onClick={(event) => {
                    event.stopPropagation();
                    handleAddSeries(trendingMovie.id);
                  }}
                >
                  <FaBookmark className="absolute right-0 top-0 cursor-pointer text-xl text-orange-500 hover:text-orange-600" />
                </button>
              </li>
            ))}
            <button
              onClick={() => {
                navigate(`/Trending/series/${timeWindowSeries}`);
              }}
            >
              <CgMoreR className="text-2xl text-orange-500 hover:text-orange-600" />
            </button>
          </ul>
        </div>
      ) : (
        <Spinner />
      )}
    </div>
  );
}

export default SeriesCard;
