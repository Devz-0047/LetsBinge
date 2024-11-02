import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteFromLibrary } from "../services/deleteContent";
import { MdDelete } from "react-icons/md";

function SeriesLib({ id, poster_path, title, release_date, vote_average }) {
  const navigate = useNavigate();
  const { data: session, isLoading: isSessionLoading } = useAuth();
  const queryClient = useQueryClient(); // Use a shared QueryClient

  const userId = session?.user?.id;

  // Define the delete mutation
  const deleteSeriesMutation = useMutation({
    mutationFn: ({ id, userId }) => deleteFromLibrary(id, userId),
    onSuccess: () => {
      toast.success("Series removed from library!");
      queryClient.invalidateQueries(["userSeriesDetails", userId]); // Invalidate the correct cache for the user’s series list
    },
    onError: () => {
      toast.error("Failed to delete series. Please try again.");
    },
  });

  const handleDeleteSeries = async (id) => {
    if (!userId) {
      toast.error("To delete a series, please log in.");
      return;
    }
    deleteSeriesMutation.mutate({ id, userId });
  };

  return (
    <div
      className="relative max-h-[18rem] min-w-[10rem] max-w-[10rem] cursor-pointer rounded-md bg-slate-900 hover:shadow-md"
      onClick={() => {
        navigate(`/series/${id}`);
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
          handleDeleteSeries(id);
        }}
      >
        <MdDelete className="absolute right-0 top-0 cursor-pointer text-2xl text-orange-500 hover:text-orange-600" />
      </button>
    </div>
  );
}

export default SeriesLib;
