import React, { PropsWithChildren } from 'react';
import classnames from 'classnames';
import styles from './Alert.module.scss';
import { Icon, IconType } from '../Icon/Icon';

export enum Color {
  red = 'red',
  blue = 'blue',
  yellow = 'yellow'
}

type AlertProps = PropsWithChildren & {
  background: Color;
  onClose: () => any;
};

export const Alert: React.FC<AlertProps> = ({
  background,
  onClose,
  children
}) => {
  return (
    <div
      className={classnames(styles.alert, {
        [styles[Color[background]]]: Color[background]
      })}
    >
      {children}
      <div onClick={() => onClose()}>
        <Icon icon={IconType.close} />
      </div>
    </div>
  );
};
