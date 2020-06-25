import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { MdDelete, MdUpdate } from 'react-icons/md';
import styles from './Table.module.css';

const Table = ({ header, data, section, openDeleteModal }) => {
  return (
    <>
      <div className={styles.table}>
        <table>
          <thead>
            <tr>
              {header.map((head) => (
                <th key={head}>{head}</th>
              ))}
              <th></th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {data.map((row) => (
              <tr key={row.id}>
                {Object.values(row).map((value) => (
                  <td>{value}</td>
                ))}
                <td>
                  <Link
                    to={`/dashboard/${section}/update/${row._id}`}
                    className={styles.button}
                  >
                    <MdUpdate className={styles.icon} />
                  </Link>
                </td>
                <td>
                  <button
                    className={styles.button}
                    onClick={openDeleteModal(row._id)}
                  >
                    <MdDelete className={styles.icon} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

Table.propTypes = {
  header: PropTypes.array.isRequired,
  data: PropTypes.array.isRequired,
  section: PropTypes.string.isRequired,
};

export default Table;
