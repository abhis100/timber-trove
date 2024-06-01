import { createClient } from "@supabase/supabase-js";
export const supabaseUrl = "https://fximcowheipaoewomyiw.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZ4aW1jb3doZWlwYW9ld29teWl3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTI3MzA3NjgsImV4cCI6MjAyODMwNjc2OH0.FrJhY3Tkk6SrrTqsxB7Hl30KW7Ko_SQQnl5KphD_1gU";
const supabase = createClient(supabaseUrl, supabaseKey);
export default supabase;
