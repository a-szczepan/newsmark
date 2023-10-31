import React from 'react';
import styles from './Logo.module.scss';
import { ReactSVG } from 'react-svg';
import LogoImg from '../../assets/images/Newsmark.svg';
import { redirect } from 'react-router-dom';

export const Logo: React.FC = () => {
  return (
    <a href='/' onClick={() => redirect('/')}>
      <ReactSVG src={LogoImg} className={styles.logo} />
    </a>
  );
};
