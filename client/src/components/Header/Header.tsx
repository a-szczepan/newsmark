import React, { PropsWithChildren, useState } from 'react';
import { Logo } from '../Logo/Logo';
import styles from './Header.module.scss';

type HeaderProps = {
  isHomePage?: boolean;
};

export const Header: React.FC<HeaderProps> = ({
  isHomePage = false
}: HeaderProps): JSX.Element => {
  const homePageActions = (
    <>
      <div>
        <button>How to start</button>
        <button>Benefits</button>
      </div>
      <div>
        <button>Log in</button>
        <button>Sign up now</button>
      </div>
    </>
  );

  return (
    <nav className={styles.header}>
      <Logo />
      {/* {isHomePage ? homePageActions : null} */}
    </nav>
  );
};
