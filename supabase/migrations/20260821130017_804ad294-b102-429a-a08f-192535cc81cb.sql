GRANT INSERT ON public.screenplay_contributions TO anon, authenticated;

CREATE POLICY "Anyone can submit a pitch"
ON public.screenplay_contributions
FOR INSERT
TO anon, authenticated
WITH CHECK (
  status = 'pending'
  AND kind IN ('scene','note','character','detail','media')
  AND length(contributor_name) BETWEEN 2 AND 80
  AND length(pitch) BETWEEN 10 AND 4000
  AND (contributor_email IS NULL OR length(contributor_email) <= 254)
  AND (ai_draft IS NULL OR length(ai_draft) <= 12000)
  AND (final_body IS NULL OR length(final_body) <= 12000)
  AND (media_url IS NULL OR length(media_url) <= 500)
  AND reviewer_note IS NULL
  AND reviewed_at IS NULL
);