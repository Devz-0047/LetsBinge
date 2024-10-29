import { useQuery } from "@tanstack/react-query";
import { supabase } from "../services/supabase";

export const useAuth = () => {
  return useQuery({
    queryKey: ["auth"],
    queryFn: async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession();
      return session;
    },
    refetchOnWindowFocus: false,
    staleTime: Infinity,
  });
};
