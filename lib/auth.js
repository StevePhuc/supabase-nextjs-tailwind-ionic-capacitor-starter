/* eslint-disable react/display-name */
// https://github.com/dijonmusters/feature-wish-list/blob/main/pages/index.tsx
import { useState, useEffect } from 'react';
import supabase from './supabase';
import Login from '../components/ui/auth/Login';
import { useHistory } from 'react-router-dom';
import { App } from '@capacitor/app';
import { getSessionFromUrl } from './helpers';

export const withAuth = (Component, options = { shouldRedirect: true }) => {
  return () => {
    let history = useHistory();
    const [isLoading, setIsLoading] = useState(true);
    const [session, setSession] = useState(null);

    useEffect(() => {
      App.addListener('appUrlOpen', async event => {
        const session = getSessionFromUrl(event.url);
        const { data, error } = await supabase.auth.getUser(session.access_token);
        setSession({ ...session, user: data.user });
        history.push('/auth');
      });
    }, [history]);

    useEffect(() => {
      let mounted = true;

      async function getInitialSession() {
        const {
          data: { session },
        } = await supabase.auth.getSession();

        // only update the react state if the component is still mounted
        if (mounted) {
          if (session) {
            setSession(session);
          }

          setIsLoading(false);
        }
      }

      getInitialSession();

      const { subscription } = supabase.auth.onAuthStateChange((_event, session) => {
        setSession(session);
      });

      return () => {
        mounted = false;

        subscription?.unsubscribe();
      };
    }, []);

    if (isLoading) {
      return <div className="flex flex-1 items-center justify-center">Loading</div>;
    }

    if (options?.shouldRedirect) {
      return !session ? <Login /> : <Component session={session} />;
    }

    return <Component session={session} />;
  };
};
