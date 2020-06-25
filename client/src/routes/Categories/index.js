import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import styles from './Categories.module.css';
import Loading from '../../components/Loading';
import Table from '../../components/Table';
import DeleteModal from '../../components/DeleteModal';
import { getCategories, deleteCategory } from '../../redux/categories';

const Categories = () => {
  const dispatch = useDispatch();
  const { items, isFetching } = useSelector((state) => state.categories);

  const [deleteModalIsOpen, setDeleteModalIsOpen] = useState(false);
  const [deleteId, setDeleteId] = useState(null);

  const closeDeleteModal = () => {
    setDeleteModalIsOpen(false);
    setDeleteId(null);
  };
  const openDeleteModal = (id) => () => {
    setDeleteModalIsOpen(true);
    setDeleteId(id);
  };

  useEffect(() => {
    dispatch(getCategories());
  }, []);

  if (isFetching) {
    return <Loading />;
  }

  return (
    <div className={styles.container}>
      <div className={styles.categories}>
        <Link to='/dashboard/categories/create' className={styles.create__link}>
          Create Category
        </Link>
        {items.length > 0 ? (
          <>
            <Table
              header={Object.keys(items[0])}
              data={items}
              section='categories'
              openDeleteModal={openDeleteModal}
            />
            <DeleteModal
              isOpen={deleteModalIsOpen}
              close={closeDeleteModal}
              callback={(id, close) => dispatch(deleteCategory(id, close))}
              id={deleteId}
            />
          </>
        ) : (
          <span>Empty</span>
        )}
      </div>
    </div>
  );
};

export default Categories;
