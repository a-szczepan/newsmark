import React from 'react';
import { IconButton } from '../Button/Button';
import { IconType } from '../Icon/Icon';
import styles from './Footer.module.scss';
import { Typography } from '../Typography/Typography';

export const Footer: React.FC = ({}): JSX.Element => {
  return (
    <footer className={styles.footer}>
      <IconButton
        buttonAction={'https://github.com/a-szczepan'}
        icon={IconType.github}
        lightVariant
      />
    </footer>
  );
};
