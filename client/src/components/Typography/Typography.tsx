import classnames from 'classnames';
import React, { PropsWithChildren } from 'react';

export enum TextVariant {
  H1 = 'h1',
  H2 = 'h2',
  H3 = 'h3',
  H4 = 'h4',
  Body = 'p',
  TextUI = 'span',
  Caption = 'span'
}

type TypographyProps = PropsWithChildren<{
  variant?: TextVariant;
}>;

export const Typography: React.FC<TypographyProps> = ({
  variant,
  children
}): JSX.Element => {
  const Tag = variant ? variant : 'p';
  return <Tag>{children}</Tag>;
};
