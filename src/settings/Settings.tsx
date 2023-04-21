import { SubmitHandler, useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { authActions, selectCurrentUser } from 'shared/data-access/auth/authSlice';
import { UpdateUser } from 'shared/data-access/common/configs/appModels';
import { useAppDispatch, useAppSelector } from 'shared/data-access/common/configs/hooks';
import { selectSettingsStatus, updateUser } from './settingsSlice';

const Settings = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const status = useAppSelector(selectSettingsStatus);
  const user = useAppSelector(selectCurrentUser);

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<UpdateUser>({ mode: 'onChange', defaultValues: user ? user : {} });
  const onSubmit: SubmitHandler<UpdateUser> = async (data) => {
    if (status === 'loading') {
      return;
    }
    await dispatch(updateUser(data)).unwrap();
    navigate('/');
  };

  return (
    <div className="settings-page">
      <div className="container page">
        <div className="row">
          <div className="col-md-6 offset-md-3 col-xs-12">
            <h1 className="text-xs-center">Your Settings</h1>

            <form onSubmit={handleSubmit(onSubmit)}>
              <fieldset>
                <fieldset className="form-group">
                  <input
                    className="form-control"
                    type="text"
                    placeholder="URL of profile picture"
                    {...register('image')}
                  />
                </fieldset>
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
                  <textarea
                    className="form-control form-control-lg"
                    rows={8}
                    placeholder="Short bio about you"
                    {...register('bio')}
                  ></textarea>
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
                    className="form-control form-control-lg"
                    type="password"
                    placeholder="Password"
                    {...register('password')}
                  />
                </fieldset>
                <button className="btn btn-lg btn-primary pull-xs-right">Update Settings</button>
              </fieldset>
            </form>
            <hr />

            <button
              className="btn btn-outline-danger"
              onClick={() => {
                dispatch(authActions.logout());
                navigate('/');
              }}
            >
              Or click here to logout.
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;
