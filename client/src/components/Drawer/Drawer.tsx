import { PropsWithChildren, useEffect, useState } from 'react';
import { IconButton } from '../Button/Button';
import { IconType } from '../Icon/Icon';
import styles from './Drawer.module.scss';
import { createPortal } from 'react-dom';
import classnames from 'classnames';

type DrawerProps = PropsWithChildren<{
  classes: string[];
}>;

export const Drawer: React.FC<DrawerProps> = ({
  classes,
  children
}): JSX.Element => {
  const [isOpened, setIsOpened] = useState(false);
  const [isClosing, setIsClosing] = useState(false);

  useEffect(() => {
    if (isOpened) document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'scroll';
    };
  }, [isOpened]);

  return (
    <>
      {isClosing && (
        <div
          className={classnames(styles.drawer, { [styles.closing]: !isOpened })}
        />
      )}
      {!isOpened && (
        <IconButton
          buttonAction={() => {
            setIsOpened(true);
          }}
          icon={IconType.menu}
          classes={[styles.menuIcon]}
        />
      )}
      {isOpened &&
        createPortal(
          <div className={styles.underlay}>
            <div
              className={classnames(styles.drawer, ...classes, {
                [styles.closing]: !isOpened
              })}
            >
              <IconButton
                buttonAction={() => {
                  setIsOpened(false);
                  setIsClosing(true);
                }}
                icon={IconType.close}
                lightVariant
                classes={[styles.closeDrawerIcon]}
              />
              {children}
            </div>
          </div>,
          document.getElementById('portal-root')!
        )}
    </>
  );
};
