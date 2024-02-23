import classnames from 'classnames';
import React from 'react';
import styles from './Icon.module.scss';
import { ReactSVG } from 'react-svg';
import annotation from '../../assets/icons/annotation.svg';
import arrowRight from '../../assets/icons/arrow-right.svg'
import bookmark from '../../assets/icons/bookmark.svg';
import check from '../../assets/icons/check.svg';
import chevronDown from '../../assets/icons/chevron-down.svg';
import chevronUp from '../../assets/icons/chevron-up.svg';
import chevronsLeft from '../../assets/icons/chevrons-left.svg'
import chevronsRight from '../../assets/icons/chevrons-right.svg'
import close from '../../assets/icons/close.svg';
import edit from '../../assets/icons/edit.svg';
import eye from '../../assets/icons/eye.svg';
import fileText from '../../assets/icons/file-text.svg'
import github from '../../assets/icons/github.svg';
import google from '../../assets/icons/google.svg';
import logout from '../../assets/icons/log-out.svg';
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
  annotation = 'annotation',
  arrowRight = 'arrowRight',
  bookmark = 'bookmark',
  check = 'check',
  chevronDown = 'chevronDown',
  chevronUp = 'chevronUp',
  chevronsLeft = 'chevronsLeft',
  chevronsRight = 'chevronsRight',
  close = 'close',
  edit = 'edit',
  eye = 'eye',
  fileText = 'fileText',
  github = 'github',
  google = 'google',
  logout = 'logout',
  menu = 'menu',
  microsoft = 'microsoft',
  plus = 'plus',
  remove = 'remove',
  search = 'search',
  user = 'user'
}

const IconTypeMap = {
  annotation,
  arrowRight,
  bookmark,
  check,
  chevronDown,
  chevronUp,
  chevronsLeft,
  chevronsRight,
  close,
  edit,
  eye,
  fileText,
  github,
  google,
  logout,
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
      src={IconTypeMap[icon]}
      className={classnames(styles[IconSize[size]], styles[color], ...classes)}
      beforeInjection={(svg) => {
        svg.setAttribute('aria-label', IconType[icon]);
      }}
    />
  );
};
