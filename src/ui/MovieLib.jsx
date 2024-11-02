import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { useAuth } from "../hooks/useAuth";
import { useMutation, useQueryClient } from "@tanstack/react-query"; // Use the global QueryClient
import { MdDelete } from "react-icons/md";
import { deleteFromLibrary } from "../services/deleteContent";

function MovieLib({ id, title, release_date, vote_average, poster_path }) {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const { data: session, isLoading: isSessionLoading } = useAuth();

  const userId = session?.user?.id;

  // Define the delete mutation
  const deleteMovieMutation = useMutation({
    mutationFn: ({ id, userId }) => deleteFromLibrary(id, userId),
    onSuccess: () => {
      toast.success("Movie removed from library!");
      queryClient.invalidateQueries(["userMoviesDetails", userId]); // Invalidate the cache for the user’s movie list
    },
    onError: () => {
      toast.error("Failed to delete movie. Please try again.");
    },
  });

  // Handler for deleting a movie
  const handleDeleteMovie = (id) => {
    if (!userId) {
      toast.error("To delete a movie, please log in.");
      return;
    }
    deleteMovieMutation.mutate({ id, userId });
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
          event.stopPropagation(); // Prevent navigation when delete button is clicked
          handleDeleteMovie(id);
        }}
      >
        <MdDelete className="absolute right-0 top-0 cursor-pointer text-2xl text-orange-500 hover:text-orange-600" />
      </button>
    </div>
  );
}

export default MovieLib;

// import { useNavigate } from "react-router-dom";
// import toast from "react-hot-toast";
// import { useAuth } from "../hooks/useAuth";
// import { QueryClient, useMutation } from "@tanstack/react-query";
// import { MdDelete } from "react-icons/md";
// import { deleteFromLibrary } from "../services/deleteContent";

// function MovieLib({ id, title, release_date, vote_average, poster_path }) {
//   const queryClient = new QueryClient();
//   const navigate = useNavigate();
//   const { data: session, isLoading: isSessionLoading } = useAuth();

//   const userId = session?.user?.id;
//   const deleteMovieMutation = useMutation({
//     mutationFn: ({ id, userId }) => deleteFromLibrary(id, userId),
//     onSuccess: () => {
//       toast.success("Movie removed from library!");
//       queryClient.invalidateQueries(["userMoviesDetails", userId]);
//     },
//     onError: () => {
//       toast.error("Failed to delete movie.Please try again");
//     },
//   });
//   const handleDeleteMovie = async (movieId) => {
//     if (!userId) {
//       toast.error("To delete movie you need to login");
//       return;
//     }
//     deleteMovieMutation.mutate({ movieId, userId });
//   };
//   return (
//     <div
//       className="relative max-h-[18rem] min-w-[10rem] max-w-[11rem] cursor-pointer rounded-md bg-slate-900 hover:shadow-md"
//       onClick={() => {
//         navigate(`/movie/${id}`);
//       }}
//     >
//       <img
//         src={`https://image.tmdb.org/t/p/w154${poster_path}`}
//         alt={title}
//         className="h-[14rem] w-[10rem] opacity-90 hover:opacity-100"
//       />
//       <p className="text-[0.95rem] font-semibold text-orange-500">{title}</p>
//       <div className="flex justify-between">
//         <p className="text-sm text-orange-400">{release_date}</p>
//         <p className="text-sm text-orange-400">{vote_average.toFixed(1)}/10</p>
//       </div>
//       <button
//         onClick={(event) => {
//           event.stopPropagation();
//           handleDeleteMovie(id);
//         }}
//       >
//         <MdDelete className="absolute top-0 right-0 text-2xl text-orange-500 cursor-pointer hover:text-orange-600" />
//       </button>
//     </div>
//   );
// }

// export default MovieLib;
