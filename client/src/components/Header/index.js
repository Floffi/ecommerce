import React from 'react';
import { FaShoppingCart } from 'react-icons/fa';
import { Link, NavLink } from 'react-router-dom';
import styles from './Header.module.css';

const Header = () => {
  return (
    <header className={styles.header}>
      <Link to='/' className={styles.logo__link}>
        Logo
      </Link>
      <nav className={styles.nav}>
        <NavLink to='/shop' className={styles.nav__link}>
          Shop
        </NavLink>
        <Link to='/cart'>
          <FaShoppingCart className={styles.icon} />
        </Link>
      </nav>
    </header>
  );
};

export default Header;
