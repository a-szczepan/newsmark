import React, { PropsWithChildren, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getGoogleOAuthURL } from '../../utils/auth';
import {
  useLoginWithGoogeQuery,
  useLoginWithPasswordMutation
} from '../../store/api/userApi';
import { RootState } from 'src/store/store';
import { useSelector, useDispatch } from 'react-redux';
import { userLoggedIn } from '../../store/slices/userSlice';
import styles from './Login.module.scss';
import { AuthForm } from '../../components/AuthForm/AuthForm';
import { UserFormData } from '../../types/user';
import { GOOGLE_LOGIN_URL } from '../../../config';

const Login: React.FC<PropsWithChildren> = (props: any) => {
  const [userData, setUserData] = useState<UserFormData | null>(null);
  const [login, { data, isSuccess }] = useLoginWithPasswordMutation();
  // const { data } = useLoginWithGoogeQuery({});
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onSubmitWithPassword = async (
    userData: UserFormData,
    setLoginError: any
  ) => {
    // console.log(userData)
    // await login(userData);
    // if (isSuccess) {
    //   console.log(data);
    //   // dispatch(
    //   //   userLoggedIn({
    //   //     sessionId: data.id,
    //   //     email: data.email
    //   //   })
    //   // );
    //   navigate('/');
    // }
    await login(userData).then((result: any) => {
      if (isSuccess) {
        console.log(result);
        dispatch(
          userLoggedIn({
            sessionId: result.data.userId,
            email: result.data.userEmail
          })
        );
        navigate('/');
      }
    });
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
