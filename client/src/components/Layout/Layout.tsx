import * as React from 'react';
import classnames from 'classnames';
import styles from './Layout.module.scss';

type LayoutProps = {
  children: React.ReactNode;
};

export const Layout: React.FC<LayoutProps> = ({ children }): JSX.Element => {
  return <div className={classnames(styles.layout)}>{children}</div>;
};
