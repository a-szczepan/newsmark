import { useWidthChecker } from '../../hooks/useWidthChecker';
import { Header } from '../../components/Header/Header';
import { Layout } from '../../components/Layout/Layout';
import styles from './UserPage.module.scss';
import { IconButton } from '../../components/Button/Button';
import { IconType } from '../../components/Icon/Icon';

export const UserPage: React.FC = () => {
  const isMobile = useWidthChecker() <= 768 ? true : false;

  const DesktopLayout: React.FC = () => {
    return (
      <div>
        <Layout>Desktop</Layout>
      </div>
    );
  };

  const MobileLayout: React.FC = () => {
    return (
      <div>
        <Layout>Mobile</Layout>
        <div className={styles.mobilePanel}>
          <IconButton
            icon={IconType.bookmark}
            buttonAction={() => {}}
            lightVariant
            //   classes={
            //     bookmarkOpt
            //       ? [styles.bookmarkClicked, styles.actionBtn]
            //       : [styles.actionBtn]
            //   }
          >
            Bookmarks
          </IconButton>
          <IconButton
            icon={IconType.annotation}
            buttonAction={() => {}}
            lightVariant
            //   classes={
            //     isAnnotationModalOpen
            //       ? [styles.annotationClicked, styles.actionBtn]
            //       : [styles.actionBtn]
            //   }
          >
            Annotations
          </IconButton>
        </div>
      </div>
    );
  };

  return (
    <>
      <Header />
      <div className={styles.userPage}>
        {isMobile ? <MobileLayout /> : <DesktopLayout />}
      </div>
    </>
  );
};
