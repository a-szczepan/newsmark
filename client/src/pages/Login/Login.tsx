import React, { PropsWithChildren, useState } from 'react';
import { getGoogleOAuthURL } from '../../utils/auth';
import { useLoginWithPasswordMutation } from '../../store/api/userApi';
import { RootState } from 'src/store/store';
import { useSelector, useDispatch } from 'react-redux';
import { userLoggedIn } from '../../store/slices/userSlice';
import styles from './Login.module.scss';
import { AuthForm } from '../../components/AuthForm/AuthForm';

const Login: React.FC<PropsWithChildren> = (props: any) => {
  const [registerData, setRegisterData] = useState<any>(
    'Register with password'
  );
  const [loginData, setLoginData] = useState<any>('Login with password');
  const [logout, setLogoutData] = useState<any>('Logout');
  const [test, setTest] = useState<any>(null);
  const [login, { isSuccess }] = useLoginWithPasswordMutation();
  // const count = useSelector((state: RootState) => state.email);
  const dispatch = useDispatch();

  type UserDataRes = {
    id: number;
    userId: number;
    userEmail: string;
    valid: boolean;
    userAgent: string;
    createdAt: string;
    updatedAt: string;
  };

  const testFun = async () => {
    console.log('test');
    const user = {
      email: 'Makayla.Smith9@hotmail.com',
      password: 'Testpassword123'
    };
    const a = await login(user).then((result: any) =>
      dispatch(
        userLoggedIn({
          id: result.data.userId!,
          email: result.data.userEmail
        })
      )
    );
  };

  const onSubmitWithPassword = () => {
    async () => {
      console.log('sumbit with a password');
      const user = {
        email: 'Makayla.Smith9@hotmail.com',
        password: 'Testpassword123'
      };
      const a = await login(user).then((result: any) =>
        dispatch(
          userLoggedIn({
            id: result.data.userId!,
            email: result.data.userEmail
          })
        )
      );
      setTest(a);
    };
  };
  const onSubmitWithGoogle = () => {};

  return (
    <div className={styles.underlay}>
      <div className={styles.loginPage}>
        <AuthForm
          submitActionWithGoogleAuth={onSubmitWithGoogle}
          submitActionWithPassword={testFun}
          formText={{
            header: 'Sign in',
            caption: 'Get access to your articles'
          }}
        />
        {/* <div
        style={{ backgroundColor: 'red' }}
        onClick={async () => {
          const user = {
            email: 'Makayla.Smith9@hotmail.com',
            password: 'Testpassword123'
          };
          const a = await login(user).then((result: any) =>
            dispatch(
              userLoggedIn({
                id: result.data.userId!,
                email: result.data.userEmail
              })
            )
          );
          setTest(a);
        }}
      >
        Login
      </div>
      <div>{test ? JSON.stringify(test.data) : null}</div> */}
        {/* <div style={{ marginTop: '100px' }}>
        <a
          href={getGoogleOAuthURL(
            'http://localhost:5000/api/users/oauth/google'
          )}
        >
          Register with oauth
        </a>
      </div>

      <div style={{ marginTop: '100px' }}>
        <a
          href={getGoogleOAuthURL(
            'http://localhost:5000/api/login/oauth/google'
          )}
        >
          Login wit oauth
        </a>
      </div>

      <div>
        <a
          onClick={async () => {
            const user = {
              email: faker.internet.email(),
              password: 'Testpassword123'
            };
            const data = await fetch('http://localhost:5000/api/register', {
              method: 'POST',
              headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
              },
              body: JSON.stringify(user)
            }).then((response) => response.json());
            setRegisterData(JSON.stringify(data));
          }}
        >
          {registerData}
        </a>{' '}
      </div>

      <div>
        <a
          onClick={async () => {
            const user = {
              email: `Makayla.Smith9@hotmail.com`,
              password: 'Testpassword123'
            };
            const data = await fetch('http://localhost:5000/api/login', {
              method: 'POST',
              credentials: 'same-origin',
              headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
              },
              body: JSON.stringify(user)
            }).then((response) => response.json());
            setLoginData(JSON.stringify(data));
          }}
        >
          {loginData}
        </a>{' '}
      </div>
      <div
        onClick={async () => {
          const user = {
            email: `Makayla.Smith9@hotmail.com`,
            password: 'Testpassword123'
          };
          const data = await fetch('http://localhost:5000/api/logout', {
            method: 'POST',
            headers: {
              Accept: 'application/json',
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(user)
          });
          setLogoutData(JSON.stringify(data));
        }}
      >
        {logout}
      </div> */}
      </div>
    </div>
  );
};

export default Login;
