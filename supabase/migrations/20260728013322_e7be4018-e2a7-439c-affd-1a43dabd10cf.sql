ALTER TABLE public.blog_posts ADD COLUMN IF NOT EXISTS telegram_notified_at timestamptz;
ALTER TABLE public.zoom_calls ADD COLUMN IF NOT EXISTS telegram_notified_at timestamptz;

-- Backfill existing content so we don't spam the group with the whole archive
UPDATE public.blog_posts SET telegram_notified_at = now() WHERE telegram_notified_at IS NULL;
UPDATE public.zoom_calls SET telegram_notified_at = now() WHERE telegram_notified_at IS NULL;

CREATE OR REPLACE FUNCTION public.notify_new_content()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path TO ''
AS $$
BEGIN
  BEGIN
    PERFORM net.http_post(
      url := 'https://project--34565094-3905-4629-b19a-ad31bb8bb153.lovable.app/api/public/notify/new-content',
      headers := jsonb_build_object('Content-Type', 'application/json'),
      body := '{}'::jsonb
    );
  EXCEPTION WHEN OTHERS THEN
    RAISE WARNING 'notify_new_content failed: %', SQLERRM;
  END;
  RETURN NULL;
END;
$$;

DROP TRIGGER IF EXISTS blog_posts_notify_telegram ON public.blog_posts;
CREATE TRIGGER blog_posts_notify_telegram
AFTER INSERT OR UPDATE OF published ON public.blog_posts
FOR EACH ROW
WHEN (NEW.published = true AND NEW.telegram_notified_at IS NULL)
EXECUTE FUNCTION public.notify_new_content();

DROP TRIGGER IF EXISTS zoom_calls_notify_telegram ON public.zoom_calls;
CREATE TRIGGER zoom_calls_notify_telegram
AFTER INSERT OR UPDATE OF status ON public.zoom_calls
FOR EACH ROW
WHEN (NEW.status = 'recorded' AND NEW.telegram_notified_at IS NULL)
EXECUTE FUNCTION public.notify_new_content();