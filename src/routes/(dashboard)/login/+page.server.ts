import { fail, redirect } from '@sveltejs/kit';
import { supabase } from '$lib/supabase';

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
      return fail(303, {
        error: signInToAuth.error.toString(),
        message: 'Invalid email or password',
      });
    } else {

      return redirect(303, '/admin');
    }
  }
}