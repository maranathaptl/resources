import { createBrowserClient, createServerClient, isBrowser, parse } from '@supabase/ssr';
import type { LayoutLoad } from './$types';

export const load: LayoutLoad = async ({ data, depends, fetch }) => {
  const PUBLIC_SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL;
  const PUBLIC_SUPABASE_ANON_KEY = import.meta.env.VITE_SUPABASE_KEY;

  depends('supabase:auth');

  const supabase = isBrowser()
    ? createBrowserClient(PUBLIC_SUPABASE_URL, PUBLIC_SUPABASE_ANON_KEY, {
      global: {
        fetch,
      },
      cookies: {
        get(key) {
          const cookie = parse(document.cookie)
          return cookie[key]
        },
      },
    })
    : createServerClient(PUBLIC_SUPABASE_URL, PUBLIC_SUPABASE_ANON_KEY, {
      global: {
        fetch,
      },
      cookies: {
        get() {
          return JSON.stringify(data.session)
        },
      },
    })

  const {
    data: { session },
  } = await supabase.auth.getSession()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  return { session, supabase, user }
}