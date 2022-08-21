/* eslint-disable react/display-name */
// https://github.com/dijonmusters/feature-wish-list/blob/main/pages/index.tsx
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import supabase from './supabase';

const Redirect = () => {
  const router = useRouter();

  useEffect(() => {
    router.replace('/');
  }, [router]);

  return <div className="flex flex-1 items-center justify-center">Redirecting...</div>;
};

export const withAuth = (Component, { shouldRedirect = true }) => {
  return () => {
    const [isLoading, setIsLoading] = useState(true);
    const [session, setSession] = useState(null);

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

    if (shouldRedirect) {
      return !session ? <Redirect /> : <Component session={session} />;
    }

    return <Component session={session} />;
  };
};
