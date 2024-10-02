// src/supabase.js
import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://calkjvhdomxcayjnuwlx.supabase.co";
const supabaseAnonKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNhbGtqdmhkb214Y2F5am51d2x4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3Mjc3ODIwMDUsImV4cCI6MjA0MzM1ODAwNX0.31Hb6eQ48vvgyYk_bl9Q4xxtxZ366XXViOgQPfWs9yI";

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
