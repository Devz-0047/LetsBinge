import { useMutation } from "@tanstack/react-query";
import { toast } from "react-hot-toast";
import { supabase } from "../services/supabase";
export const useAddMovieToLibrary = () => {
  return useMutation({
    mutationFn: async ({ movieId, userId, isSeries = false }) => {
      const { data, error } = await supabase
        .from("Library")
        .insert([{ content_id: movieId, users_id: userId, isSeries }])
        .select();

      if (error) throw new Error(error.message);
      return data;
    },
    onSuccess: () => {
      toast.success("Movie added to library successfully!");
    },
    onError: (error) => {
      toast.error(`Failed to add movie to library: ${error.message}`);
    },
  });
};
