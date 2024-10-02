// src/auth.js
import { supabase } from "./supabase.js";

export const signup = async (email, password) => {
  const { user, error } = await supabase.auth.signUp({
    email,
    password,
  });
  return { user, error };
};

export const login = async (email, password) => {
  const { user, error } = await supabase.auth.signIn({
    email,
    password,
  });
  return { user, error };
};

export const signOut = async () => {
  await supabase.auth.signOut();
};
