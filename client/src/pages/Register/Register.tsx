import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from '../Login/Login.module.scss';
import { AuthForm } from '../../components/AuthForm/AuthForm';
import { getGoogleOAuthURL } from '../../utils/auth';
import { useRegisterWithPasswordMutation } from '../../store/api/userApi';
import { UserFormData } from '../../types/user';

const Register: React.FC = () => {
  const [register, { isSuccess }] = useRegisterWithPasswordMutation();
  const navigate = useNavigate();

  useEffect(() => {
    if (isSuccess) navigate('/articles');
  }, [isSuccess]);

  const onSubmitWithPassword = async (
    userData: UserFormData,
    setLoginError: any
  ) => {
    await register(userData)
      .unwrap()
      .catch((error) => setLoginError(error.data.message));
  };

  const onSubmitWithGoogle = () => {
    location.assign(getGoogleOAuthURL(process.env.REACT_APP_GOOGLE_REGISTER_URL!));
  };

  return (
    <div className={styles.underlay}>
      <div className={styles.loginPage}>
        <AuthForm
          submitActionWithGoogleAuth={onSubmitWithGoogle}
          submitActionWithPassword={onSubmitWithPassword}
          formText={{
            header: 'Sign up',
            caption: 'Create your free account'
          }}
        />
      </div>
    </div>
  );
};

export default Register;
