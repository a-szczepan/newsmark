import classnames from 'classnames';
import React, { PropsWithChildren, ReactEventHandler } from 'react';
import styles from './Button.module.scss';
import { Tags, Typography } from '../Typography/Typography';
import { Icon, IconSize, IconType } from '../Icon/Icon';

type SharedButtonProps = {
  id?: string;
  classes?: string[];
  type?: 'submit' | 'button';
  buttonAction: ((event: React.MouseEvent<MouseEvent>) => void) | string;
  disabled?: boolean;
};

export enum ButtonType {
  solid,
  lined,
  text,
  link,
  lightLink
}

type ButtonProps = SharedButtonProps &
  PropsWithChildren<{
    variant: ButtonType;
    icon?: IconType;
    iconVariant?: 'start' | 'end';
    iconStyle?: {
      size: IconSize;
      color: 'dark' | 'light';
    };
    small?: boolean;
  }>;

type IconButtonProps = SharedButtonProps & {
  icon: IconType;
  lightVariant?: boolean;
  round?: boolean;
};

export const Button: React.FC<ButtonProps> = ({
  id,
  classes = [],
  variant,
  type = 'button',
  buttonAction,
  small = false,
  disabled = false,
  icon,
  iconVariant = 'start',
  iconStyle,
  children
}): JSX.Element => {
  const Tag = typeof buttonAction === 'string' ? 'a' : 'button';

  const ButtonIcon = () => {
    return (
      <Icon
        icon={icon!}
        {...(iconStyle && { color: iconStyle.color } && {
            size: iconStyle.size
          })}
      />
    );
  };

  return (
    <Tag
      id={id}
      className={classnames(
        styles.button,
        styles[ButtonType[variant]],
        ...classes,
        {
          [styles.small]: small,
          [styles.disabled]: disabled
        }
      )}
      {...(typeof buttonAction !== 'string'
        ? { onClick: (e) => buttonAction(e) }
        : { href: buttonAction })}
      {...(Tag === 'button' && { type: type })}
      {...(disabled && { disabled } && { 'aria-disabled': true })}
    >
      {icon && iconVariant === 'start' && <ButtonIcon />}
      <Typography
        {...(variant === ButtonType.link || variant === ButtonType.lightLink
          ? { tag: Tags.span }
          : undefined)}
        styleVariant={
          variant === ButtonType.link || variant === ButtonType.lightLink
            ? 'label'
            : 'button'
        }
      >
        {children}
      </Typography>
      {icon && iconVariant === 'end' && <ButtonIcon />}
    </Tag>
  );
};

export const IconButton: React.FC<IconButtonProps> = ({
  id,
  classes = [],
  icon,
  buttonAction,
  lightVariant = false,
  type = 'button',
  round = false,
  disabled = false
}): JSX.Element => {
  const Tag = typeof buttonAction === 'string' ? 'a' : 'button';

  return (
    <Tag
      id={id}
      className={classnames(styles.iconButton, ...classes, {
        [styles.iconButtonLight]: lightVariant,
        [styles.disabled]: disabled,
        [styles.round]: round
      })}
      {...(typeof buttonAction !== 'string'
        ? { onClick: (e) => buttonAction(e) }
        : { href: buttonAction })}
      {...(disabled && { disabled } && { 'aria-disabled': true })}
    >
      <Icon icon={icon} />
    </Tag>
  );
};
