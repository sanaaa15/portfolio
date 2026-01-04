-- Create a table for game leaderboard
CREATE TABLE public.game_leaderboard (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  player_name TEXT NOT NULL,
  score INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.game_leaderboard ENABLE ROW LEVEL SECURITY;

-- Create policy for anyone to view scores
CREATE POLICY "Anyone can view scores" 
ON public.game_leaderboard 
FOR SELECT 
USING (true);

-- Create policy for anyone to insert scores
CREATE POLICY "Anyone can add scores" 
ON public.game_leaderboard 
FOR INSERT 
WITH CHECK (true);