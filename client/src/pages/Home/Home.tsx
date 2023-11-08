import classnames from 'classnames';
import React from 'react';
import { Tags, Typography } from '../../components/Typography/Typography';
import styles from './Home.module.scss';
import { Header } from '../../components/Header/Header';
import { TypeAnimation } from 'react-type-animation';
import { Button, ButtonType } from '../../components/Button/Button';
import hero1 from '../../assets/images/Hero1.svg';
import hero2 from '../../assets/images/Hero2.svg';
import benefit1 from '../../assets/images/Benefit1.svg';
import benefit2 from '../../assets/images/Benefit2.svg';
import benefit3 from '../../assets/images/Benefit3.svg';
import benefit4 from '../../assets/images/Benefit4.svg';
import { Layout } from '../../components/Layout/Layout';

const HeroSection: React.FC = () => {
  return (
    <section className={styles.heroSection}>
      <div className={styles.wrapper}>
        <div className={styles.heroText}>
          <Typography styleVariant="h1">
            <TypeAnimation
              sequence={['Annotate', 1000, 'Save', 1000, 'Discover', 1000]}
              wrapper="span"
              speed={1}
              className={classnames(styles.typingAnimation, styles.bold)}
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

const InfoSection: React.FC = () => {
  const infoPoints = [
    {
      heading: 'Browse Articles',
      text: "Upon logging in, you'll be presented with a curated selection of articles from the New York Times. Browse the latest news, or use the search functionality to find specific articles"
    },
    {
      heading: 'Pick an Article',
      text: 'Click on an article that catches your attention to open it in the reading view. Take your time to read the article and absorb the information'
    },
    {
      heading: 'Bookmark an Article',
      text: 'While reading an article, click on the bookmark icon to save the article to your collection. You can browse all your saved articles in the user section'
    },
    {
      heading: 'Add Annotation',
      text: 'To add an annotation or note, highlight a section of the text that you want to annotate. Write your thoughts  or key takeaways. Your annotation will be associated with the highlighted section of the article'
    }
  ];
  return (
    <div className={styles.underlay}>
      <section className={styles.infoSection}>
        <ol>
          {infoPoints.map((element, index) => (
            <li>
              <div className={styles.liHeading}>
                <Typography styleVariant="h2" classes={[styles.counter]}>
                  {index + 1}
                </Typography>
                <Typography styleVariant="h2">{element.heading}</Typography>
              </div>
              <Typography
                classes={[styles.description]}
                styleVariant="h4"
                tag={Tags.p}
              >
                {element.text}
              </Typography>
            </li>
          ))}
        </ol>
      </section>
    </div>
  );
};

const BenefitsSection: React.FC = () => {
  const benefitsList = [
    {
      img: benefit1,
      heading: '🖊️ Annotate and Highlight like a Pro',
      text: "Dive deeper into the stories that matter to you! Newsmark's powerful annotation tools let you highlight crucial details, jot down insights, and leave comments on articles for future reference."
    },
    {
      img: benefit2,
      heading: '📚 Seamlessly Save and Bookmark',
      text: 'Never lose a captivating article again! With Newsmark, you can effortlessly save your favorite articles from the New York Times and build your personal library of knowledge.'
    },
    {
      img: benefit3,
      heading: '🔎 Discover Beyond Boundaries',
      text: 'Dive into a world of knowledge! Newsmark connects you with the vast library of the New York Times API, uncovering fascinating articles across diverse topics. Expand your horizons and explore new frontiers.'
    },
    {
      img: benefit4,
      heading: '🗂️ Stay Organized and In Control',
      text: 'Say goodbye to information overload! Organize your saved articles making it a breeze to find the content you need, precisely when you need it.'
    }
  ];
  return (
    <section className={styles.benefitsSection}>
      <ul>
        {benefitsList.map((benefit, index) => (
          <li className={styles.card}>
            <div
              className={classnames(
                styles.imgWrapper,
                styles[`benefit${index + 1}`]
              )}
            >
              <img src={benefit.img} />
            </div>
            <div className={styles.text}>
              <Typography styleVariant="h2">{benefit.heading}</Typography>
              <Typography styleVariant="h4" tag={Tags.p}>
                {benefit.text}
              </Typography>
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
};

const Home: React.FC = () => {
  return (
    <div className={styles.landingPage}>
      {/* <Header /> */}
      <Layout>
        <HeroSection />
      </Layout>
      <InfoSection />
      <Layout>
        <BenefitsSection />
      </Layout>

    </div>
  );
};

export default Home;
