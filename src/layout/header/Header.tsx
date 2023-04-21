import { loginActions } from 'auth/login/loginSlice';
import { registerActions } from 'auth/register/registerSlice';
import { NavLink } from 'react-router-dom';
import { selectCurrentUser } from 'shared/data-access/auth/authSlice';
import { useAppDispatch, useAppSelector } from 'shared/data-access/common/configs/hooks';

const Header = () => {
  const dispatch = useAppDispatch();
  const currentUser = useAppSelector(selectCurrentUser);

  return (
    <nav className="navbar navbar-light">
      <div className="container">
        <NavLink className="navbar-brand" to="/">
          conduit
        </NavLink>
        <ul className="nav navbar-nav pull-xs-right">
          <li className="nav-item">
            <NavLink className="nav-link" to="/">
              Home
            </NavLink>
          </li>
          {currentUser && (
            <>
              <li className="nav-item">
                <NavLink className="nav-link" to="/editor">
                  <i className="ion-compose"></i>&nbsp;New Article
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" to="/settings">
                  <i className="ion-gear-a"></i>&nbsp;Settings
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" to={`/profile/${currentUser.username}`}>
                  {currentUser.username}
                </NavLink>
              </li>
            </>
          )}

          {!currentUser && (
            <>
              <li className="nav-item" onClick={() => dispatch(loginActions.resetError())}>
                <NavLink className="nav-link" to="login">
                  Sign in
                </NavLink>
              </li>
              <li className="nav-item" onClick={() => dispatch(registerActions.resetError())}>
                <NavLink className="nav-link" to="register">
                  Sign up
                </NavLink>
              </li>
            </>
          )}
        </ul>
      </div>
    </nav>
  );
};

export default Header;
