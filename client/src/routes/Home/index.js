import React from 'react';
import PropTypes from 'prop-types';
import styles from './Home.module.css';
import { Link } from 'react-router-dom';
import ProductCard from '../../components/ProductCard';
// Images
import whiteDress from '../../media/images/white-dress.jpeg';
import casual from '../../media/images/casual.jpeg';
import accessories from '../../media/images/accessories.jpeg';
import redDress from '../../media/images/red-dress.jpeg';

const Home = (props) => {
  return (
    <main className={styles.home}>
      <div className={styles.image__container}>
        <img
          src={whiteDress}
          alt='white dress'
          className={styles.main__image}
        />
        <span className={styles.image__text}>
          Maturity begins when you can be right without having to prove the
          other person wrong.
        </span>
      </div>
      <section className={styles.section}>
        <span className={styles.title}>Latest Products</span>
        <ul className={styles.product__list}>
          <li>
            <ProductCard />
          </li>
          <li>
            <ProductCard />
          </li>
          <li>
            <ProductCard />
          </li>
          <li>
            <ProductCard />
          </li>
        </ul>
      </section>
      <section className={styles.section}>
        <span className={styles.title}>2020 Summer Collection</span>
        <div className={styles.grid}>
          <Link to='/' className={styles.casual__link}>
            <img
              src={casual}
              alt='female casual summer clothing'
              className={styles.image}
            />
            <span className={`${styles.image__sign} ${styles.shorts__sign}`}>
              Shorts
            </span>
          </Link>
          <Link to='/' className={styles.dresses__link}>
            <img src={redDress} alt='red dress' className={styles.image} />
            <span className={`${styles.image__sign} ${styles.dresses__sign}`}>
              Dresses
            </span>
          </Link>
          <Link to='/' className={styles.accessories__link}>
            <img src={accessories} alt='accessories' className={styles.image} />
            <span
              className={`${styles.image__sign} ${styles.accessories__sign}`}
            >
              Accessories
            </span>
          </Link>
        </div>
      </section>
    </main>
  );
};

Home.propTypes = {};

export default Home;
