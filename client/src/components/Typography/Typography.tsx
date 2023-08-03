import classnames from 'classnames';
import React, { PropsWithChildren } from 'react';
import styles from './Typography.module.scss';

export enum Tags {
  h1,
  h2,
  h3,
  h4,
  h5,
  h6,
  p,
  span,
  label
}

export const TextVariantMap = {
  h1: 'h1',
  h2: 'h2',
  h3: 'h3',
  h4: 'h4',
  h5: 'h5',
  body: 'p',
  button: 'span',
  label: 'label',
  caption: 'span',
  footnote: 'span'
};

export type TextVariant = keyof typeof TextVariantMap;

type TypographyProps = PropsWithChildren<{
  id?: string;
  styleVariant?: TextVariant;
  tag?: Tags;
}>;

export const Typography: React.FC<TypographyProps> = ({
  id,
  styleVariant = 'p',
  tag,
  children
}): JSX.Element => {
  const Tag = tag ? Tags[tag] : TextVariantMap[styleVariant];
  return (
    <Tag id={id} className={classnames(styles[styleVariant])}>
      {children}
    </Tag>
  );
};
