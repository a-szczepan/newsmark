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

type SharedInputProps = {
  id?: string;
  placeholder?: string;
  onChange?: React.ChangeEvent;
  disabled?: boolean;
  error?: boolean;
  errorMessage?: string;
};

type InputProps = SharedInputProps & {
  type: InputType;
  label: string;
  name: string;
};

type SearchInputProps = SharedInputProps & {
  type?: 'search';
};

export const Input: React.FC<InputProps> = ({
  id,
  type = InputType.text,
  label,
  name,
  placeholder,
  onChange,
  error = false,
  errorMessage,
  disabled = false
}) => {
  return (
    <div
      className={classnames(styles.input, {
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
        aria-label={`${name}`}
        {...(disabled && { disabled: true })}
        // {...(onChange && { onChange: onChange })}
      />
      {error && errorMessage && (
        <Typography styleVariant="caption" id={`${type}-error-msg`} >
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
  disabled = false
}) => {
  return (
    <div
      className={classnames(styles.input, styles.searchInput, {
        [styles.disabled]: disabled
      })}
    >
      <input
        id={id}
        className={classnames(styles[InputType[type]], styles.inputField)}
        type={type}
        placeholder={placeholder}
        {...(disabled && { disabled: true })}
        aria-label="search"
        // {...(onChange && { onChange: onChange })}
      ></input>
      <Button
        variant={ButtonType.solid}
        icon={IconType.search}
        iconStyle={{ size: IconSize.large, color: 'light' }}
        action={() => {}}
        classes={[styles.searchButton]}
        {...(disabled && { disabled: true })}
      ></Button>
    </div>
  );
};
