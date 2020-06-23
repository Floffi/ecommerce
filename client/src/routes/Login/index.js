import React from 'react';
import { useForm } from 'react-hook-form';
import { FaEnvelope, FaLock } from 'react-icons/fa';
import { useDispatch } from 'react-redux';

import styles from './Login.module.css';
import jacket from '../../media/images/jacket.jpeg';
import validations from '../../utilities/validations';
import Input from '../../components/Input';
import Button from '../../components/Button';
import { login } from '../../redux/auth';

const Login = () => {
  const dispatch = useDispatch();

  const { register, handleSubmit, errors, triggerValidation } = useForm({
    validationSchema: validations.login,
  });

  const handleBlur = (event) => {
    triggerValidation(event.target.name);
  };

  const onSubmit = (data) => {
    dispatch(login(data));
  };

  return (
    <main className={styles.container}>
      <div className={styles.login}>
        <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
          <Input
            type='text'
            name='email'
            label='E-mail'
            onBlur={handleBlur}
            error={errors.email}
            ref={register}
          >
            <FaEnvelope />
          </Input>
          <Input
            type='password'
            name='password'
            label='Password'
            onBlur={handleBlur}
            error={errors.password}
            ref={register}
          >
            <FaLock />
          </Input>
          <Button type='submit'>Login</Button>
        </form>
      </div>
      <img src={jacket} alt='jacket' className={styles.side__image} />
    </main>
  );
};

export default Login;
