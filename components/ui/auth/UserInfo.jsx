import { useIonRouter } from '@ionic/react';
import supabase from '../../../lib/supabase';
import PageSimple from '../PageSimple';

const UserInfo = ({ session }) => {
  const router = useIonRouter();

  const signOut = async () => {
    await supabase.auth.signOut();
    router.push('/auth', 'forward', 'replace');
  };

  const { user } = session;

  return (
    <PageSimple title="User Info">
      <div className="flex min-h-full m-10 justify-center">
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
      </div>
    </PageSimple>
  );
};

export default UserInfo;
