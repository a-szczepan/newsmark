import classnames from 'classnames';
import React, { PropsWithChildren } from 'react';

export const TextVariantMap = {
  H1: 'h1',
  H2: 'h2',
  H3: 'h3',
  H4: 'h4',
  Body: 'p',
  TextUI: 'span',
  Caption: 'span'
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
  return <Tag className={classnames(variant.toLowerCase())}>{children}</Tag>;
};
