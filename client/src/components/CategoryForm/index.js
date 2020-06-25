import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { useParams, useHistory } from 'react-router-dom';
import { GiStack } from 'react-icons/gi';

import styles from './CategoryForm.module.css';
import Input from '../Input';
import Button from '../Button';
import validations from '../../utilities/validations';

const getCategory = async (categoryId) => {
  try {
    const response = await fetch(`/api/categories/${categoryId}`);
    const responseObject = await response.json();
    if (response.ok) {
      return responseObject;
    } else {
      return {
        status: 'failure',
        error: 'Get category failure',
      };
    }
  } catch (error) {
    console.error(error);
  }
};

const CategoryForm = ({ buttonLabel, action }) => {
  const dispatch = useDispatch();
  const history = useHistory();
  const { categoryId } = useParams();
  const {
    register,
    handleSubmit,
    errors,
    triggerValidation,
    setValue,
  } = useForm({
    validationSchema: validations.category,
  });

  useEffect(() => {
    if (categoryId) {
      const initalizeCategory = async () => {
        const res = await getCategory(categoryId);
        if (res.status === 'success') {
          setValue('name', res.data.category.name);
        }
      };
      initalizeCategory();
    }
  }, [categoryId]);

  const handleBlur = (event) => {
    triggerValidation(event.target.name);
  };

  const onSubmit = (data) => {
    if (categoryId) {
      dispatch(action(categoryId, data, history));
    } else {
      dispatch(action(data, history));
    }
  };

  return (
    <div className={styles.container}>
      <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
        <Input
          type='text'
          name='name'
          label='Name'
          onBlur={handleBlur}
          error={errors.name}
          ref={register}
        >
          <GiStack />
        </Input>
        <Button type='submit'>{buttonLabel}</Button>
      </form>
    </div>
  );
};

CategoryForm.propTypes = {
  buttonLabel: PropTypes.string.isRequired,
  callback: PropTypes.func.isRequired,
};

export default CategoryForm;
