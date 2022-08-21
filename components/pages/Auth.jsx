// https://github.com/dijonmusters/feature-wish-list/blob/main/pages/index.tsx
import { withAuth } from '../../lib/auth';
import Login from '../ui/auth/Login';
import UserInfo from '../ui/auth/UserInfo';
import PageSimple from '../ui/PageSimple';

const Auth = withAuth(
  ({ session }) => {
    return (
      <PageSimple>
        <div className="flex min-h-full m-10 justify-center">
          {session ? <UserInfo session={session} /> : <Login />}
        </div>
      </PageSimple>
    );
  },
  {
    shouldRedirect: false,
  }
);

export default Auth;
