import React from 'react';
import PropTypes from 'prop-types';
import styles from './Shop.module.css';
import ProductCard from '../../components/ProductCard';

const Shop = (props) => {
  return (
    <main className={styles.shop}>
      <aside className={styles.sidebar}>
        <span>Categories</span>
      </aside>
      <div className={styles.product__grid}>
        <ProductCard />
        <ProductCard />
        <ProductCard />
        <ProductCard />
        <ProductCard />
        <ProductCard />
      </div>
    </main>
  );
};

Shop.propTypes = {};

export default Shop;
