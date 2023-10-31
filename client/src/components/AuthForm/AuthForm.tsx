import React, { PropsWithChildren, useState } from 'react';
import { Formik, Form, Field } from 'formik';
import styles from './AuthForm.module.scss';
import { Input, InputType } from '../Input/Input';
import { Button, ButtonType } from '../Button/Button';
import { IconType } from '../Icon/Icon';
import { Tags, Typography } from '../Typography/Typography';
import Newspaper from '../../assets/images/Newspaper.svg';
import { Logo } from '../Logo/Logo';
import { FormValidationSchema } from '../../utils/formValidation';
import { Alert, Color } from '../Alert/Alert';

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
  submitActionWithPassword: (values: any, action: any) => void;
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
  const [loginError, setLoginError] = useState<string | null>(null);

  const EmailInput = ({ field, form: { touched, errors } }) => {
    const hasErrors = typeof errors.email !== 'undefined' ? true : false;
    return (
      <Input
        name="email"
        type={InputType.text}
        label="email"
        {...field}
        error={hasErrors && touched.email ? true : false}
        {...(hasErrors && touched.email && { errorMessage: errors.email })}
      />
    );
  };

  const PasswordInput = ({ field, form: { touched, errors } }) => {
    const hasErrors = typeof errors.password !== 'undefined' ? true : false;
    return (
      <Input
        name="password"
        type={InputType.password}
        label="password"
        {...field}
        error={hasErrors && touched.password ? true : false}
        {...(hasErrors &&
          touched.password && { errorMessage: errors.password })}
      />
    );
  };

  return (
    <FormCard {...formText}>
      <Formik
        enableReinitialize
        initialValues={{ email: '', password: '' }}
        validationSchema={FormValidationSchema}
        onSubmit={async (values) => {
          // console.log(e);
          await submitActionWithPassword(values, setLoginError);
        }}
      >
        {({ errors }) => (
          <Form>
            {loginError && (
              <Alert background={Color.red} onClose={() => setLoginError(null)}>
                {loginError}
              </Alert>
            )}
            <Field
              type="text"
              name="email"
              required
              component={EmailInput}
              error={errors.email}
            />
            <Field
              type="text"
              name="password"
              required
              component={PasswordInput}
              error={errors.password}
            />
            <Button action={() => {}} variant={ButtonType.solid} type="submit">
              Continue
            </Button>
            <h1>{loginError}</h1>
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
