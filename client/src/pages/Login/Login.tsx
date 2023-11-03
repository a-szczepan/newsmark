import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getGoogleOAuthURL } from '../../utils/auth';
import { useLoginWithPasswordMutation } from '../../store/api/userApi';
import styles from './Login.module.scss';
import { AuthForm } from '../../components/AuthForm/AuthForm';
import { UserFormData } from '../../types/user';
import { GOOGLE_LOGIN_URL } from '../../../config';

const Login: React.FC = () => {
  const [login, { isSuccess }] = useLoginWithPasswordMutation();
  const navigate = useNavigate();

  useEffect(() => {
    if (isSuccess) navigate('/articles');
  }, [isSuccess]);

  const onSubmitWithPassword = async (
    userData: UserFormData,
    setLoginError: any
  ) => {
    await login(userData)
      .unwrap()
      .catch((error) => setLoginError(error.data.message));
  };

  const onSubmitWithGoogle = () => {
    location.assign(getGoogleOAuthURL(GOOGLE_LOGIN_URL));
  };

  return (
    <div className={styles.underlay}>
      <div className={styles.loginPage}>
        <AuthForm
          submitActionWithGoogleAuth={onSubmitWithGoogle}
          submitActionWithPassword={onSubmitWithPassword}
          formText={{
            header: 'Sign in',
            caption: 'Get access to your articles'
          }}
        />
      </div>
    </div>
  );
};

export default Login;
