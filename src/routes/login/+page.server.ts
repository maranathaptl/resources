import { fail, redirect } from '@sveltejs/kit';
import { supabase } from '$lib/supabase';
import { goto } from '$app/navigation';

export const actions = {
  default: async ({ request }) => {
    const fromForm = await request.formData();

    const email = fromForm.get('email');
    const password = fromForm.get('password');

    if (!email) return fail(400, { email, emailMissing: true });
    if (!password) return fail(400, { password, passwordMissing: true });

    const signInToAuth = await supabase.auth.signInWithPassword({
      email: email.toString(),
      password: password.toString(),
    });

    if (signInToAuth.error) {
      console.error(signInToAuth.error)
      return redirect(303, '/auth/error');
    } else {
      return redirect(303, '/admin/add-lyrics');
    }
  }
}