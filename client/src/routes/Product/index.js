import React from 'react';
import PropTypes from 'prop-types';
import styles from './Product.module.css';

const Product = (props) => {
  return (
    <div className={styles.product}>
      <span>Product</span>
    </div>
  );
};

Product.propTypes = {};

export default Product;
