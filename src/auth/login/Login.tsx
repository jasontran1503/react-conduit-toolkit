import { SubmitHandler, useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import { LoginUser } from 'shared/data-access/common/configs/appModels';
import { useAppDispatch, useAppSelector } from 'shared/data-access/common/configs/hooks';
import ErrorsForm from 'shared/data-ui/errors-form/ErrorsForm';
import Auth from '../Auth';
import { login, loginActions, selectLoginErrors, selectLoginStatus } from './loginSlice';

const Login = () => {
  const dispatch = useAppDispatch();
  const errorsForm = useAppSelector(selectLoginErrors);
  const status = useAppSelector(selectLoginStatus);
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<LoginUser>({ mode: 'onChange' });
  const onSubmit: SubmitHandler<LoginUser> = async (data) => {
    if (status === 'loading') {
      return;
    }

    await dispatch(login(data)).unwrap();
    navigate('/');
  };

  return (
    <Auth>
      <>
        <h1 className="text-xs-center">Sign in</h1>
        <p className="text-xs-center">
          <Link to="/register" onClick={() => dispatch(loginActions.resetError())}>
            Need an account?
          </Link>
        </p>

        <ErrorsForm errors={errorsForm} />

        <form onSubmit={handleSubmit(onSubmit)}>
          <fieldset className="form-group">
            <input
              className={`form-control form-control-lg ${errors.email && 'is-invalid'}`}
              type="text"
              placeholder="Email"
              {...register('email', { required: 'Email is required' })}
            />
            <small className="invalid-feedback">{errors.email?.message}</small>
          </fieldset>
          <fieldset className="form-group">
            <input
              className={`form-control form-control-lg ${errors.password && 'is-invalid'}`}
              type="password"
              placeholder="Password"
              {...register('password', { required: 'Password is required' })}
            />
            <small className="invalid-feedback">{errors.password?.message}</small>
          </fieldset>
          <button className="btn btn-lg btn-primary pull-xs-right" type="submit">
            Sign in
          </button>
        </form>
      </>
    </Auth>
  );
};

export default Login;
