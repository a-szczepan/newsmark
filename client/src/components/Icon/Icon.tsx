import classnames from 'classnames';
import React, { PropsWithChildren } from 'react';
import styles from './Icon.module.scss';
import { ReactSVG } from 'react-svg';
import annotation from '../../assets/icons/annotation.svg';
import bookmark from '../../assets/icons/bookmark.svg';
import chevronDown from '../../assets/icons/chevron-down.svg';
import chevronUp from '../../assets/icons/chevron-up.svg';
import close from '../../assets/icons/close.svg';
import edit from '../../assets/icons/edit.svg';
import eye from '../../assets/icons/eye.svg';
import google from '../../assets/icons/google.svg';
import menu from '../../assets/icons/menu.svg';
import microsoft from '../../assets/icons/microsoft.svg';
import plus from '../../assets/icons/plus.svg';
import remove from '../../assets/icons/remove.svg';
import search from '../../assets/icons/search.svg';
import user from '../../assets/icons/user.svg';

export enum IconSize {
  small = 16,
  medium = 24,
  large = 32
}

export enum IconType {
  annotation,
  bookmark,
  chevronDown,
  chevronUp,
  close,
  edit,
  eye,
  google,
  menu,
  microsoft,
  plus,
  remove,
  search,
  user
}

const IconTypeMap = {
  annotation,
  bookmark,
  chevronDown,
  chevronUp,
  close,
  edit,
  eye,
  google,
  menu,
  microsoft,
  plus,
  remove,
  search,
  user
};

type IconProps = {
  classes?: string[];
  icon: IconType;
  size?: IconSize;
  color?: 'dark' | 'light';
};

export const Icon: React.FC<IconProps> = ({
  classes = [],
  icon,
  size = IconSize.medium,
  color = 'dark'
}): JSX.Element => {
  return (
    <ReactSVG
      src={IconTypeMap[IconType[icon]]}
      className={classnames(styles[IconSize[size]], styles[color], ...classes)}
      beforeInjection={(svg) => {
        svg.setAttribute('aria-label', IconType[icon]);
      }}
    />
  );
};
