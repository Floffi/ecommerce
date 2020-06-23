import React, { useState, forwardRef } from 'react';
import PropTypes from 'prop-types';
import styles from './Input.module.css';
import { FaEye, FaEyeSlash } from 'react-icons/fa';

const Input = forwardRef(
  ({ type, name, label, error, onBlur, children }, ref) => {
    const [showPassword, setShowPassword] = useState(false);

    return (
      <div>
        <div
          className={`${styles.container} ${error && styles.container__error}`}
        >
          <div className={styles.icon__container}>{children}</div>
          <div className={styles.input__container}>
            <input
              id={label}
              type={showPassword ? 'text' : type}
              name={name}
              className={styles.input}
              onBlur={onBlur}
              placeholder=' '
              ref={ref}
            />
            <label htmlFor={label} className={styles.label}>
              {label}
            </label>
          </div>
          {type === 'password' &&
            (showPassword ? (
              <FaEye
                className={styles.icon}
                onClick={() => setShowPassword(false)}
              />
            ) : (
              <FaEyeSlash
                className={styles.icon}
                onClick={() => setShowPassword(true)}
              />
            ))}
        </div>
        <span className={styles.error}>{error && error.message}</span>
      </div>
    );
  }
);

Input.propTypes = {
  type: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  onBlur: PropTypes.func.isRequired,
  children: PropTypes.node.isRequired,
  error: PropTypes.object,
};

export default Input;
