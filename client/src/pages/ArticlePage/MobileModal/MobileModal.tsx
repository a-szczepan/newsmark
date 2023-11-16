import { createPortal } from 'react-dom';
import classnames from 'classnames';
import {
  Dispatch,
  PropsWithChildren,
  SetStateAction,
  useEffect,
  useState
} from 'react';
import styles from './MobileModal.module.scss';
import { IconButton } from '../../../components/Button/Button';
import { IconType } from '../../../components/Icon/Icon';

type MobileModalProps = PropsWithChildren<{
  isOpened: boolean;
  setIsOpened: Dispatch<SetStateAction<boolean>>;
  classes?: string[];
}>;

export const MobileModal: React.FC<MobileModalProps> = ({
  isOpened,
  setIsOpened,
  children
}) => {
  useEffect(() => {
    if (isOpened) document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'scroll';
    };
  }, [isOpened]);

  return (
    <>
      {isOpened &&
        createPortal(
          <div className={styles.underlay}>
            <div
              className={classnames(styles.modal, {
                [styles.closing]: !isOpened
              })}
            >
              <IconButton
                buttonAction={() => {
                  setIsOpened(false);
                }}
                icon={IconType.close}
                lightVariant
                classes={[styles.closeModalIcon]}
              />
              {children}
            </div>
          </div>,
          document.getElementById('portal-root')!
        )}
    </>
  );
};
