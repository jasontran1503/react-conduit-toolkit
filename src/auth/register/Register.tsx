import { SubmitHandler, useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import { NewUser } from 'shared/data-access/common/configs/appModels';
import { useAppDispatch, useAppSelector } from 'shared/data-access/common/configs/hooks';
import ErrorsForm from 'shared/data-ui/errors-form/ErrorsForm';
import Auth from '../Auth';
import {
  register as registerAction,
  registerActions,
  selectRegisterErrors,
  selectRegisterStatus
} from './registerSlice';

const Register = () => {
  const dispatch = useAppDispatch();
  const errorsForm = useAppSelector(selectRegisterErrors);
  const status = useAppSelector(selectRegisterStatus);
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<NewUser>({ mode: 'onChange' });
  const onSubmit: SubmitHandler<NewUser> = async (data) => {
    if (status === 'loading') {
      return;
    }
    await dispatch(registerAction(data)).unwrap();
    navigate('/');
  };

  return (
    <Auth>
      <>
        <h1 className="text-xs-center">Sign up</h1>
        <p className="text-xs-center">
          <Link to="/login" onClick={() => dispatch(registerActions.resetError())}>
            Have an account?
          </Link>
        </p>

        <ErrorsForm errors={errorsForm} />

        <form onSubmit={handleSubmit(onSubmit)}>
          <fieldset className="form-group">
            <input
              className={`form-control form-control-lg ${errors.username && 'is-invalid'}`}
              type="text"
              placeholder="Your Name"
              {...register('username', { required: 'Username is required' })}
            />
            <small className="invalid-feedback">{errors.username?.message}</small>
          </fieldset>
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
          <button className="btn btn-lg btn-primary pull-xs-right">Sign up</button>
        </form>
      </>
    </Auth>
  );
};

export default Register;
