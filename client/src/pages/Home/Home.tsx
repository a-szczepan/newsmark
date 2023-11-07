import classnames from 'classnames';
import React, { useEffect, useState } from 'react';
import { Typography } from '../../components/Typography/Typography';
import styles from './Home.module.scss';
import { Header } from '../../components/Header/Header';
import { TypeAnimation } from 'react-type-animation';
import { Button, ButtonType } from '../../components/Button/Button';
import hero1 from '../../assets/images/Hero1.svg';
import hero2 from '../../assets/images/Hero2.svg';

const HeroSection: React.FC = () => {
  return (
    <section className={styles.heroSection}>
      <div className={styles.wrapper}>
        <div className={styles.heroText}>
          <Typography styleVariant="h1">
            <TypeAnimation
              sequence={[
                'Annotate',
                1000,
                'Save',
                1000,
                'Discover',
                1000
              ]}
              wrapper="span"
              speed={1}
              className={styles.bold}
              repeat={Infinity}
            />
            with Ease
          </Typography>
          <Typography styleVariant="h4">
            The ultimate bookmarking and annotation tool for{' '}
            <span className={styles.bold}>The New York Times</span> is now
            available. To improve reading experience, take charge of your
            research, save key articles, and add your own insights.
          </Typography>
        </div>
        <Button variant={ButtonType.solid} buttonAction={() => {}}>
          Create free account
        </Button>
      </div>
      <div className={styles.heroImages}>
        <div className={classnames(styles.imgWrapper, styles.hero1img)}>
          <img src={hero1} />
        </div>
        <div className={classnames(styles.imgWrapper, styles.hero2img)}>
          <img src={hero2} />
        </div>
      </div>
    </section>
  );
};

const Home: React.FC = () => {
  return (
    <>
      {/* <Header /> */}
      <div style={{ height: '88px' }}>header</div>
      <HeroSection />
    </>
  );
};

export default Home;
