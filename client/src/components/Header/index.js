import React from 'react';
import PropTypes from 'prop-types';
import styles from './Header.module.css';

const Header = (props) => {
  return (
    <header className={styles.header}>
      <span>Header</span>
    </header>
  );
};

Header.propTypes = {};

export default Header;
