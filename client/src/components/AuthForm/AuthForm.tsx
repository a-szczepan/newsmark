import React, { PropsWithChildren } from 'react';
import { Formik, Form, Field } from 'formik';
import styles from './AuthForm.module.scss';
import { Input, InputType } from '../Input/Input';
import { Button, ButtonType } from '../Button/Button';
import { IconType } from '../Icon/Icon';
import { Tags, Typography } from '../Typography/Typography';
import Newspaper from '../../assets/images/Newspaper.svg';
import { Logo } from '../Logo/Logo';

type FormCardProps = PropsWithChildren & {
  header: string;
  caption: string;
};

const FormCard: React.FC<FormCardProps> = ({ header, caption, children }) => {
  return (
    <div className={styles.formCard}>
      <div className={styles.imageContainer}>
        <img src={Newspaper} />
      </div>
      <div className={styles.formContainer}>
        <Logo />
        <Typography styleVariant="h3" tag={Tags.h1}>
          {header}
        </Typography>
        <Typography styleVariant="body" tag={Tags.span}>
          {caption}
        </Typography>
        {children}
      </div>
    </div>
  );
};

type AuthFormProps = {
  submitActionWithPassword: () => void;
  submitActionWithGoogleAuth: () => void;
  formText: {
    header: string;
    caption: string;
  };
};

export const AuthForm: React.FC<AuthFormProps> = ({
  submitActionWithPassword,
  submitActionWithGoogleAuth,
  formText
}) => {
  return (
    <FormCard {...formText}>
      <Formik
        enableReinitialize
        initialValues={{ email: '', password: '' }}
        onSubmit={submitActionWithPassword}
      >
        {({ errors, touched }) => (
          <Form>
            <Field
              component={() => (
                <Input name="email" type={InputType.text} label="email" />
              )}
              required
            />
            <Field
              component={() => (
                <Input
                  name="password"
                  type={InputType.password}
                  label="password"
                />
              )}
              type="text"
              name="password"
              required
            />
            <Button action={() => {}} variant={ButtonType.solid}>
              Continue
            </Button>
          </Form>
        )}
      </Formik>

      <div className={styles.oauthContainer}>
        <hr />
        <Button
          action={() => {}}
          variant={ButtonType.lined}
          icon={IconType.google}
          classes={[styles.googleAuthButton]}
        >
          Continue with Google
        </Button>
      </div>
    </FormCard>
  );
};
