CREATE OR REPLACE FUNCTION public.notify_new_content()
 RETURNS trigger
 LANGUAGE plpgsql
 SECURITY DEFINER
 SET search_path TO ''
AS $function$
DECLARE _secret text;
BEGIN
  BEGIN
    SELECT decrypted_secret INTO _secret FROM vault.decrypted_secrets WHERE name = 'cron_webhook_secret';
    PERFORM net.http_post(
      url := 'https://project--34565094-3905-4629-b19a-ad31bb8bb153.lovable.app/api/public/notify/new-content',
      headers := jsonb_build_object('Content-Type', 'application/json', 'x-cron-secret', coalesce(_secret, '')),
      body := '{}'::jsonb
    );
  EXCEPTION WHEN OTHERS THEN
    RAISE WARNING 'notify_new_content failed: %', SQLERRM;
  END;
  RETURN NULL;
END;
$function$;
REVOKE EXECUTE ON FUNCTION public.notify_new_content() FROM PUBLIC, anon, authenticated;