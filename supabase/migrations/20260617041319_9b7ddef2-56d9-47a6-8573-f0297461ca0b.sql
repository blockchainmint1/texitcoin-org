ALTER PUBLICATION supabase_realtime ADD TABLE public.zoom_calls;
ALTER TABLE public.zoom_calls REPLICA IDENTITY FULL;