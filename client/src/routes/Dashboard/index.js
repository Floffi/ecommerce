import React from 'react';
import { NavLink, Route } from 'react-router-dom';
import styles from './Dashboard.module.css';
import CategoryForm from '../../components/CategoryForm';
import ProductForm from '../../components/ProductForm';
import { createCategory, updateCategory } from '../../redux/categories';
import { createProduct, updateProduct } from '../../redux/products';
import { updateOrder } from '../../redux/orders';
import { updateUser } from '../../redux/users';
import Categories from '../Categories';

const Dashboard = () => {
  return (
    <main className={styles.dashboard}>
      <aside className={styles.sidebar}>
        <NavLink to='/dashboard/categories' className={styles.sidebar__link}>
          Categories
        </NavLink>
        <NavLink to='/dashboard/products' className={styles.sidebar__link}>
          Products
        </NavLink>
        <NavLink to='/dashboard/orders' className={styles.sidebar__link}>
          Orders
        </NavLink>
        <NavLink to='/dashboard/users' className={styles.sidebar__link}>
          Users
        </NavLink>
      </aside>
      <div className={styles.content}>
        <Route exact path='/dashboard/categories'>
          <Categories />
        </Route>
        <Route exact path='/dashboard/categories/create'>
          <CategoryForm buttonLabel='Create Category' action={createCategory} />
        </Route>
        <Route exact path='/dashboard/categories/update/:categoryId'>
          <CategoryForm buttonLabel='Update Category' action={updateCategory} />
        </Route>
        <Route exact path='/dashboard/products/create'>
          <ProductForm buttonLabel='Create Product' action={createProduct} />
        </Route>
        <Route exact path='/dashboard/products/update/:categoryId'>
          <ProductForm buttonLabel='Update Product' action={updateProduct} />
        </Route>
      </div>
    </main>
  );
};

export default Dashboard;
