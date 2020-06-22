import React from 'react';
import PropTypes from 'prop-types';
import { FaCopyright, FaTwitter, FaInstagram, FaYoutube } from 'react-icons/fa';
import styles from './Footer.module.css';

const Footer = (props) => {
  return (
    <footer className={styles.footer}>
      <div className={styles.copyright}>
        <FaCopyright />
        <span className={styles.copyright__text}>All Rights Reserved.</span>
      </div>
      <div className={styles.socials}>
        <a
          href='https://www.twitter.com'
          target='_blank'
          rel='noopener noreferrer'
          className={styles.social__link}
        >
          <FaTwitter />
        </a>
        <a
          href='https://www.instagram.com'
          target='_blank'
          rel='noopener noreferrer'
          className={styles.social__link}
        >
          <FaInstagram />
        </a>
        <a
          href='https://www.youtube.com'
          target='_blank'
          rel='noopener noreferrer'
          className={styles.social__link}
        >
          <FaYoutube />
        </a>
      </div>
    </footer>
  );
};

Footer.propTypes = {};

export default Footer;
