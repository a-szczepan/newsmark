import classnames from 'classnames';
import React from 'react';
import styles from './Input.module.scss';
import { Typography } from '../Typography/Typography';
import { ButtonType, Button } from '../Button/Button';
import { IconSize, IconType } from '../Icon/Icon';

export enum InputType {
  text = 'text',
  textarea = 'textarea',
  password = 'password',
  email = 'email'
}

type SharedInputProps = React.HTMLProps<HTMLInputElement> & {
  id?: string;
  placeholder?: string;
  onChange?: React.ChangeEvent;
  disabled?: boolean;
  error?: boolean;
  errorMessage?: string;
  value?: string;
  classes?: string[];
  readOnly?: boolean;
};

type InputProps = SharedInputProps & {
  type: InputType;
  label: string;
  name: string;
  reference?: React.Ref<HTMLInputElement>;
};

type SearchInputProps = SharedInputProps & {
  type?: 'search';
  onSubmitAction: any;
};

type TextAreaProps = SharedInputProps & {
  rows?: number;
  reference?: React.Ref<HTMLTextAreaElement>;
};

export const Input: React.FC<InputProps> = ({
  id,
  type = InputType.text,
  label,
  name,
  placeholder,
  onChange,
  value,
  error = false,
  errorMessage,
  disabled = false,
  reference,
  classes = []
}) => {
  return (
    <div
      className={classnames(styles.input, ...classes, {
        [styles.error]: error,
        [styles.disabled]: disabled
      })}
    >
      <label htmlFor={name} {...(disabled && { 'aria-disabled': true })}>
        <Typography styleVariant="label">{label}</Typography>
      </label>
      <input
        id={id}
        name={name}
        className={classnames(styles[InputType[type]], styles.inputField)}
        placeholder={placeholder}
        type={InputType[type]}
        aria-label={name}
        {...(disabled && { disabled: true })}
        {...(value && { value: value })}
        {...(onChange && { onChange: onChange })}
        ref={reference}
      />
      {error && errorMessage && (
        <Typography styleVariant="caption" id={`${type}-error-msg`}>
          {errorMessage}
        </Typography>
      )}
    </div>
  );
};

export const Textarea: React.FC<TextAreaProps> = ({
  id,
  label,
  name,
  value,
  error = false,
  errorMessage,
  disabled = false,
  rows = 2,
  readOnly,
  classes = [],
  reference
}) => {
  return (
    <div
      className={classnames(styles.input, ...classes, {
        [styles.error]: error,
        [styles.disabled]: disabled
      })}
    >
      <label htmlFor={name} {...(disabled && { 'aria-disabled': true })}>
        <Typography styleVariant="label">{label}</Typography>
      </label>
      <textarea
        id={id}
        name={name}
        className={classnames(styles.inputField)}
        aria-label={name}
        {...(disabled && { disabled: true })}
        {...(value && { value: value })}
        rows={rows}
        {...(readOnly && { readOnly: readOnly })}
        ref={reference}
      />
      {error && errorMessage && (
        <Typography styleVariant="caption" id={`textarea-error-msg`}>
          {errorMessage}
        </Typography>
      )}
    </div>
  );
};

export const SearchInput: React.FC<SearchInputProps> = ({
  id,
  type = 'search',
  placeholder,
  onChange,
  onSubmitAction,
  disabled = false,
  classes = [],
  ...HTMLprops
}) => {
  return (
    <form
      className={classnames(styles.input, ...classes, styles.searchInput, {
        [styles.disabled]: disabled
      })}
      onSubmit={(e) => {
        e.preventDefault();
        onSubmitAction(e.target[0].value);
      }}
    >
      <input
        id={id}
        className={classnames(styles[InputType[type]], styles.inputField)}
        type={type}
        placeholder={placeholder}
        {...(disabled && { disabled: true })}
        aria-label="search"
        {...HTMLprops}
      ></input>
      <Button
        variant={ButtonType.solid}
        icon={IconType.search}
        iconStyle={{ size: IconSize.large, color: 'light' }}
        buttonAction={() => {}}
        classes={[styles.searchButton]}
        type="submit"
        {...(disabled && { disabled: true })}
      ></Button>
    </form>
  );
};
