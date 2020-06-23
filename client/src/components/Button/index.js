import React from 'react';
import PropTypes from 'prop-types';
import styles from './Button.module.css';

const Button = ({ onClick, type, children }) => (
  <button className={styles.button} onClick={onClick} type={type}>
    {children}
  </button>
);

Button.propTypes = {
  children: PropTypes.node.isRequired,
  onClick: PropTypes.func,
  type: PropTypes.string,
};

export default Button;
