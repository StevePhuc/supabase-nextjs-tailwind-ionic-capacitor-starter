import { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { App } from '@capacitor/app';

const AppUrlListener = () => {
  let history = useHistory();
  useEffect(() => {
    App.addListener('appUrlOpen', event => {
      // Example url: https://beerswift.app/tabs/tab2
      // slug = /tabs/tab2
      const slug = event.url.split('.app').pop();
      console.log('slug', slug);
      if (slug) {
        history.push(slug);
      }
      // If no match, do nothing - let regular routing
      // logic take over
    });
  }, [history]);

  return null;
};

export default AppUrlListener;
