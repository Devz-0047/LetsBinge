import { useNavigate } from "react-router-dom";
import { FaBookmark } from "react-icons/fa";
import toast from "react-hot-toast";
import { useAuth } from "../hooks/useAuth";
import { QueryClient } from "@tanstack/react-query";
import { fetchMovieInLibrary } from "../services/fetchMovieInLibrary";
import { useAddMovieToLibrary } from "../hooks/useAddMovieToLibrary";

function Movie({ id, title, release_date, vote_average, poster_path }) {
  const queryClient = new QueryClient();
  const navigate = useNavigate();
  const { data: session, isLoading: isSessionLoading } = useAuth();
  const addMovieToLibrary = useAddMovieToLibrary();
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
  return (
    <div
      className="relative max-h-[18rem] min-w-[10rem] max-w-[11rem] cursor-pointer rounded-md bg-slate-900 hover:shadow-md"
      onClick={() => {
        navigate(`/movie/${id}`);
      }}
    >
      <img
        src={`https://image.tmdb.org/t/p/w154${poster_path}`}
        alt={title}
        className="h-[14rem] w-[10rem] opacity-90 hover:opacity-100"
      />
      <p className="text-[0.95rem] font-semibold text-orange-500">{title}</p>
      <div className="flex justify-between">
        <p className="text-sm text-orange-400">{release_date}</p>
        <p className="text-sm text-orange-400">{vote_average.toFixed(1)}/10</p>
      </div>
      <button
        onClick={(event) => {
          event.stopPropagation();
          handleAddMovie(id);
        }}
      >
        <FaBookmark className="absolute right-0 top-0 cursor-pointer text-xl text-orange-500 hover:text-orange-600" />
      </button>
    </div>
  );
}

export default Movie;
