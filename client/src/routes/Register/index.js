import React from 'react';
import { useForm } from 'react-hook-form';
import { FaUserAlt, FaEnvelope, FaUserTie, FaLock } from 'react-icons/fa';
import { useDispatch } from 'react-redux';

import styles from './Register.module.css';
import yellow from '../../media/images/yellow.jpeg';
import validations from '../../utilities/validations';
import Input from '../../components/Input';
import Button from '../../components/Button';
import { register as registerAction } from '../../redux/auth';

const Register = () => {
  const dispatch = useDispatch();

  const { register, handleSubmit, errors, triggerValidation } = useForm({
    validationSchema: validations.register,
  });

  const handleBlur = (event) => {
    triggerValidation(event.target.name);
  };

  const onSubmit = (data) => {
    dispatch(registerAction(data));
  };

  return (
    <main className={styles.container}>
      <img src={yellow} alt='yellow athletic' className={styles.side__image} />
      <div className={styles.register}>
        <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
          <Input
            type='text'
            name='firstName'
            label='First Name'
            onBlur={handleBlur}
            error={errors.firstName}
            ref={register}
          >
            <FaUserAlt />
          </Input>
          <Input
            type='text'
            name='lastName'
            label='Last Name'
            onBlur={handleBlur}
            error={errors.lastName}
            ref={register}
          >
            <FaUserTie />
          </Input>
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
          <Input
            type='password'
            name='confirmPassword'
            label='Confirm Password'
            onBlur={handleBlur}
            error={errors.confirmPassword}
            ref={register}
          >
            <FaLock />
          </Input>
          <Button type='submit'>Register</Button>
        </form>
      </div>
    </main>
  );
};

export default Register;
