import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import styles from './ProductCard.module.css';
import redDress from '../../media/images/red-dress.jpeg';

const ProductCard = ({ image, name, price }) => {
  return (
    <Link to='/' className={styles.product__card}>
      <img src={redDress} alt='product' className={styles.product__image} />
      <span className={styles.product__name}>Red Dress</span>
      <span className={styles.product__price}>100 €</span>
    </Link>
  );
};

ProductCard.propTypes = {
  image: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
};

export default ProductCard;
