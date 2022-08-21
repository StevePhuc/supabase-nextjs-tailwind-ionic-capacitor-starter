import { useIonRouter } from '@ionic/react';
import supabase from '../../../lib/supabase';

const UserInfo = ({ session }) => {
  const router = useIonRouter();

  const signOut = async () => {
    await supabase.auth.signOut();
    router.push('/', 'forward', 'replace');
  };

  console.log('session', session);
  const { user } = session;

  return (
    <div className="my-5 space-y-3">
      {user && (
        <div>
          <p>Email: {user.email} </p>
          <p>Aud: {user.aud} </p>
        </div>
      )}
      <div>
        <button onClick={signOut} className="px-4 py-2 bg-red-300">
          Log Out
        </button>
      </div>
    </div>
  );
};

export default UserInfo;
