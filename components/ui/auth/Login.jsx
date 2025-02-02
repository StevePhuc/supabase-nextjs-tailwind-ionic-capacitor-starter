// https://supabase.com/docs/guides/with-ionic-react
import { useIonLoading, useIonToast } from '@ionic/react';
import { useEffect, useState } from 'react';
import supabase from '../../../lib/supabase';
import PageSimple from '../PageSimple';
import { Capacitor } from '@capacitor/core';

const Login = () => {
  const redirectTo = Capacitor.isNativePlatform()
    ? process.env.NEXT_PUBLIC_REDIRECT_TO_NATIVE || 'supabasenextionic://'
    : process.env.NEXT_PUBLIC_REDIRECT_TO || 'http://localhost:3000';

  const [email, setEmail] = useState('');

  const [showLoading, hideLoading] = useIonLoading();
  const [showToast] = useIonToast();

  const handleLogin = async e => {
    e.preventDefault();
    await showLoading();
    try {
      // https://supabase.com/docs/reference/javascript/next/auth-signinwithotp
      const { user, session, error } = await supabase.auth.signInWithOtp({
        email,
        options: {
          emailRedirectTo: redirectTo,
        },
      });
      console.log('user, session, error', user, session, error);
      await showToast({ message: 'Check your email for the login link!', duration: 5000 });
    } catch (e) {
      await showToast({ message: e.error_description || e.message, duration: 5000 });
    } finally {
      await hideLoading();
    }
  };

  const handleLoginProvider = async provider => {
    await showLoading();
    try {
      // https://supabase.com/docs/guides/auth/auth-google
      const { user, session, error } = await supabase.auth.signInWithOAuth({
        provider: provider,
        options: { redirectTo },
      });

      await showToast({ message: 'Login with ' + provider, duration: 5000 });
    } catch (e) {
      await showToast({ message: e.error_description || e.message, duration: 5000 });
    } finally {
      await hideLoading();
    }
  };

  return (
    <PageSimple title="Login">
      <div className="flex min-h-full m-10 justify-center">
        <div>
          <div>
            <p>Sign in via magic link with your email below:</p>
          </div>
          <form onSubmit={handleLogin}>
            <input
              type="email"
              placeholder="jon@example.com"
              value={email}
              onChange={e => setEmail(e.target.value ?? '')}
              className="text-black border border-1 block my-5 p-2"
              style={{ minWidth: 250 }}
            />
            <button type="submit" className="px-4 py-2 bg-blue-400">
              Sign In
            </button>
          </form>
          <div>
            <p className="my-5">OR</p>
            <button
              onClick={() => handleLoginProvider('google')}
              className="px-4 py-2 bg-green-400"
            >
              Login with Google
            </button>
          </div>
        </div>
      </div>
    </PageSimple>
  );
};

export default Login;
