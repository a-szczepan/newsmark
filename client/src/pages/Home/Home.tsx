import classnames from 'classnames';
import React, { useState } from 'react';
import { Typography } from '../../components/Typography/Typography';
import styles from './Home.module.scss';
import { Header } from '../../components/Header/Header';

import { Button, ButtonType } from '../../components/Button/Button';
import hero1 from '../../assets/images/Hero1.svg';
import hero2 from '../../assets/images/Hero2.svg';

const HeroSection: React.FC = () => {
  const verbs: string[] = ['Annotate', 'Discover', 'Save'];
  const [text, setText] = useState<string>(verbs[0]);

  return (
    <section className={styles.heroSection}>
      <div className={styles.wrapper}>
        <div className={styles.heroText}>
          <Typography styleVariant="h1">
            <span className={styles.bold}>{text}</span> with Ease
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
      <div style={{height: "88px"}}>header</div>
      <HeroSection />
    </>
  );
};

export default Home;
