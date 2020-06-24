import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';

import styles from './Shop.module.css';
import ProductCard from '../../components/ProductCard';
import { getCategories } from '../../redux/categories';

const Shop = () => {
  const dispatch = useDispatch();
  const categories = useSelector((state) => state.categories.items);

  useEffect(() => {
    dispatch(getCategories());
  }, []);

  return (
    <main className={styles.shop}>
      <aside className={styles.sidebar}>
        {categories.map((category) => (
          <div>
            <input id={category._id} type='checkbox' />
            <label htmlFor={category._id}>{category.name}</label>
          </div>
        ))}
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
