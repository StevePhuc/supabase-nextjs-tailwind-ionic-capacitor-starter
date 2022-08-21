// https://github.com/dijonmusters/feature-wish-list/blob/main/pages/index.tsx
import { withAuth } from '../../lib/auth';
import UserInfo from '../ui/auth/UserInfo';

const Auth = withAuth(({ session }) => {
  return <UserInfo session={session} />;
});

export default Auth;
