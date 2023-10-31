import React, { PropsWithChildren } from 'react';
import { Typography } from '../../components/Typography/Typography';
import styles from './Home.module.scss';
import { Header } from '../../components/Header/Header';

const Home: React.FC<PropsWithChildren> = (props: any) => {
  return (
    <>
      <Header />
      <div className={styles.homePage}>
        <Typography styleVariant="h1">Home Page</Typography>
      </div>
    </>
  );
};

export default Home;
