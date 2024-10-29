// src/hooks/useGoogleSignIn.js
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "../services/supabase";

export const useGoogleSignIn = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async () => {
      const { error } = await supabase.auth.signInWithOAuth({
        provider: "google",
      });
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["auth"] });
    },
    onError: (error) => {
      console.error("Google sign-in failed:", error.message);
    },
  });
};
