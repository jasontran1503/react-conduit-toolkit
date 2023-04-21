import { Navigate } from 'react-router-dom';
import { selectCurrentUser } from '../../auth/authSlice';
import { useAppSelector } from '../configs/hooks';

const NonGuardRoutes = ({ children }: { children: JSX.Element }) => {
  const user = useAppSelector(selectCurrentUser);

  if (user) {
    return <Navigate to="/" />;
  }

  return children;
};

export default NonGuardRoutes;
