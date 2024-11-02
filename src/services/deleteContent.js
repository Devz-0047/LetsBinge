import { supabase } from "./supabase";

export const deleteFromLibrary = async (contentId, userId) => {
  const { data, error } = await supabase
    .from("Library")
    .delete()
    .eq("content_id", contentId)
    .eq("users_id", userId);

  if (error) {
    throw new Error(error.message);
  }

  return data;
};
