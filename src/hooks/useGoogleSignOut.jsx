import { useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "../services/supabase";
import toast from "react-hot-toast";

export const useGoogleSignOut = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async () => {
      const { error } = await supabase.auth.signOut();
      if (error) {
        toast.error(
          "Couldn't sign out, unexpected error encountered, please try again",
        );
        throw error;
      }
    },
    onSuccess: () => {
      // Invalidate any queries related to auth or user data
      queryClient.invalidateQueries({ queryKey: ["auth"] });
    },
    onError: (error) => {
      toast.error("Google sign-out failed");
      console.error("Google sign-out failed:", error.message);
    },
  });
};
