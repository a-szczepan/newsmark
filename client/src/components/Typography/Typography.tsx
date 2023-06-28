import classnames from 'classnames';
import React, { PropsWithChildren } from 'react';
import styles from './Typography.module.scss';

export const TextVariantMap = {
  h1: 'h1',
  h2: 'h2',
  h3: 'h3',
  h4: 'h4',
  body: 'p',
  textUI: 'span',
  caption: 'span'
};

export type TextVariant = keyof typeof TextVariantMap;

type TypographyProps = PropsWithChildren<{
  variant?: TextVariant;
}>;

export const Typography: React.FC<TypographyProps> = ({
  variant = 'p',
  children
}): JSX.Element => {
  const Tag = TextVariantMap[variant];
  return <Tag className={classnames(styles[variant])}>{children}</Tag>;
};
