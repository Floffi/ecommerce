import React from 'react';
import PropTypes from 'prop-types';

import styles from './DeleteModal.module.css';
import Modal from '../Modal';
import Button from '../Button';

const DeleteModal = ({ isOpen, callback, id, close }) => {
  return (
    <Modal isOpen={isOpen} close={close}>
      <span className={styles.title}>
        Are you sure you want to delete this?
      </span>
      <div className={styles.buttons}>
        <Button onClick={close}>Cancel</Button>
        <Button
          onClick={() => {
            callback(id, close);
          }}
        >
          Delete
        </Button>
      </div>
    </Modal>
  );
};

DeleteModal.propTypes = {};

export default DeleteModal;
