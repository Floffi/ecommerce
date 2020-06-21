import React from 'react';
import PropTypes from 'prop-types';
import styles from './Layout.module.css';
import Header from '../Header';
import Footer from '../Footer';

const Layout = ({ children }) => {
  return (
    <div className={styles.layout}>
      <Header />
      {children}
      <Footer />
    </div>
  );
};

Layout.propTypes = {};

export default Layout;
