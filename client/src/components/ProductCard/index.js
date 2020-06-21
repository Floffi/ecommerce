import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import styles from './ProductCard.module.css';
import redDress from '../../media/images/red-dress.jpeg';

const ProductCard = () => {
  return (
    <Link to='/' className={styles.product__card}>
      <img
        src={redDress}
        alt='product image'
        className={styles.product__image}
      />
      <span className={styles.product__name}>Red Dress</span>
      <span className={styles.product__price}>100 €</span>
    </Link>
  );
};

ProductCard.propTypes = {};

export default ProductCard;
