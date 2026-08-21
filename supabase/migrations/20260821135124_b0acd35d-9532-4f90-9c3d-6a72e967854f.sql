INSERT INTO public.user_roles (user_id, role)
SELECT id, 'admin'::app_role FROM auth.users WHERE email = 'bobby@honest.money'
ON CONFLICT (user_id, role) DO NOTHING;