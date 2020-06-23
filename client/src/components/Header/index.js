import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { FaShoppingCart, FaBalanceScale } from 'react-icons/fa';
import { Link, NavLink } from 'react-router-dom';
import styles from './Header.module.css';
import Button from '../Button';
import { logout } from '../../redux/auth';

const Header = () => {
  const dispatch = useDispatch();
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

  const nav = isAuthenticated ? (
    <Button onClick={() => dispatch(logout())}>Logout</Button>
  ) : (
    <>
      {' '}
      <NavLink to='/register' className={styles.nav__link}>
        Register
      </NavLink>
      <NavLink to='/login' className={styles.nav__link}>
        Login
      </NavLink>
    </>
  );

  return (
    <header className={styles.header}>
      <Link to='/' className={styles.logo__link}>
        <FaBalanceScale className={styles.icon} />
      </Link>
      <nav className={styles.nav}>
        <NavLink to='/shop' className={styles.nav__link}>
          Shop
        </NavLink>
        {nav}
        <Link to='/cart'>
          <FaShoppingCart className={styles.icon} />
        </Link>
      </nav>
    </header>
  );
};

export default Header;
