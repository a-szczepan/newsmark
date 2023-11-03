import React from 'react';
import styles from './Logo.module.scss';
import { ReactSVG } from 'react-svg';
import LogoImg from '../../assets/images/Newsmark.svg';
import { useNavigate } from 'react-router-dom';

export const Logo: React.FC = () => {
  const navigate = useNavigate();
  return (
    <a href='/' onClick={() => navigate('/')}>
      <ReactSVG src={LogoImg} className={styles.logo} />
    </a>
  );
};
