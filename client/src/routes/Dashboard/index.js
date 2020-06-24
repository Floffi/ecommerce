import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { NavLink, Route, useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import styles from './Dashboard.module.css';
import CategoryForm from '../../components/CategoryForm';
import {
  createCategory,
  getCategories,
  updateCategory,
} from '../../redux/categories';

const Dashboard = () => {
  const dispatch = useDispatch();
  const { section } = useParams();

  useEffect(() => {
    if (section === 'categories') {
      dispatch(getCategories());
    }
  }, [section]);

  return (
    <main className={styles.dashboard}>
      <aside className={styles.sidebar}>
        <NavLink to='/dashboard/categories'>Categories</NavLink>
        <NavLink to='/dashboard/products'>Products</NavLink>
        <NavLink to='/dashboard/Orders'>Orders</NavLink>
        <NavLink to='/dashboard/users'>Users</NavLink>
      </aside>
      <div className={styles.content}>
        <Route exact path='/dashboard/categories'></Route>
        <Route exact path='/dashboard/categories/create'>
          <CategoryForm buttonLabel='Create Category' action={createCategory} />
        </Route>
        <Route exact path='/dashboard/categories/update/:categoryId'>
          <CategoryForm buttonLabel='Update Category' action={updateCategory} />
        </Route>
      </div>
    </main>
  );
};

Dashboard.propTypes = {};

export default Dashboard;
