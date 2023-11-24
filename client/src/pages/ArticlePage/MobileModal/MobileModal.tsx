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
import { useDispatch, useSelector } from 'react-redux';
import { closeModal } from '../../../store/slices/modalSlice';

type MobileModalProps = PropsWithChildren<{
  classes?: string[];
}>;

export const MobileModal: React.FC<MobileModalProps> = ({ children }) => {
  const dispatch = useDispatch();
  const isModalOpen = useSelector((state: ModalState) => state.modal.isOpened);

  useEffect(() => {
    if (isModalOpen) document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'scroll';
    };
  }, [isModalOpen]);

  return (
    <>
      {isModalOpen &&
        createPortal(
          <div className={styles.underlay}>
            <div
              className={classnames(styles.modal, {
                [styles.closing]: !isModalOpen
              })}
            >
              <IconButton
                buttonAction={() => {
                  dispatch(closeModal());
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
