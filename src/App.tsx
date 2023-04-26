import Footer from 'layout/footer/Footer';
import Header from 'layout/header/Header';
import { lazy, Suspense, useEffect } from 'react';
import { Navigate, Outlet, useNavigate, useRoutes } from 'react-router-dom';
import { getCurrentUser, selectAuthStatus } from 'shared/data-access/auth/authSlice';
import { useAppDispatch, useAppSelector } from 'shared/data-access/common/configs/hooks';
import GuardRoutes from 'shared/data-access/common/guards/GuardRoutes';
import NonGuardRoutes from 'shared/data-access/common/guards/NonGuardRoutes';
import { history } from 'shared/data-access/common/logic/history';

const Home = lazy(() => import('home/Home'));
const Login = lazy(() => import('auth/login/Login'));
const Register = lazy(() => import('auth/register/Register'));
const Profile = lazy(() => import('profile/Profile'));
const Settings = lazy(() => import('settings/Settings'));
const Editor = lazy(() => import('editor/Editor'));
const Article = lazy(() => import('article/Article'));
const NotFound = lazy(() => import('shared/data-ui/not-found/NotFound'));

const App = () => {
  history.navigate = useNavigate();

  const dispatch = useAppDispatch();
  const status = useAppSelector(selectAuthStatus);

  useEffect(() => {
    let ignore = false;

    const fetchUserData = async () => {
      if (!ignore) await dispatch(getCurrentUser()).unwrap();
    };

    fetchUserData();

    return () => {
      ignore = true;
    };
  }, []);

  const routes = useRoutes([
    {
      index: true,
      element: (
        <Suspense fallback={<div>Loading...</div>}>
          <Home />
        </Suspense>
      )
    },
    {
      path: 'login',
      element: (
        <Suspense fallback={<div>Loading...</div>}>
          <NonGuardRoutes>
            <Login />
          </NonGuardRoutes>
        </Suspense>
      )
    },
    {
      path: 'register',
      element: (
        <Suspense fallback={<div>Loading...</div>}>
          <NonGuardRoutes>
            <Register />
          </NonGuardRoutes>
        </Suspense>
      )
    },
    {
      path: 'profile/:username',
      element: (
        <Suspense fallback={<div>Loading...</div>}>
          <Profile />
        </Suspense>
      )
    },
    {
      path: 'settings',
      element: (
        <Suspense fallback={<div>Loading...</div>}>
          <GuardRoutes>
            <Settings />
          </GuardRoutes>
        </Suspense>
      )
    },
    {
      path: 'article/:slug',
      element: (
        <Suspense fallback={<div>Loading...</div>}>
          <Article />
        </Suspense>
      )
    },
    {
      path: 'editor/:slug?',
      element: (
        <Suspense fallback={<div>Loading...</div>}>
          <GuardRoutes>
            <Editor />
          </GuardRoutes>
        </Suspense>
      )
    },
    {
      path: '404',
      element: (
        <Suspense fallback={<div>Loading...</div>}>
          <NotFound />
        </Suspense>
      )
    },
    {
      path: '*',
      element: <Navigate to="404" />
    }
  ]);

  return (
    <>
      {(status === 'success' || status === 'error') && (
        <>
          <Header />
          {routes}
          <Outlet />
          <Footer />
        </>
      )}
    </>
  );
};

export default App;
