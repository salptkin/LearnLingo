import { useState } from 'react';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { FiEyeOff, FiEye } from 'react-icons/fi';
import styles from './RegisterForm.module.css';
import { Regexp } from '../../helpers/regexp';
import { ERROR_MESSAGES } from '../../helpers/errormsg';
import { auth } from '../../firebaseconfig/config';
import { useDispatch } from 'react-redux';
import { addToken } from '../../redux/sliceAuth';

const SignupSchema = Yup.object().shape({
  name: Yup.string()
    .min(3, ERROR_MESSAGES.MIN_NAME)
    .max(50, ERROR_MESSAGES.MAX_NAME)
    .required(ERROR_MESSAGES.REQUIRED_NAME),
  email: Yup.string()
    .matches(Regexp, ERROR_MESSAGES.INVALID_EMAIL)
    .required(ERROR_MESSAGES.REQUIRED_EMAIL),
  password: Yup.string()
    .min(6, ERROR_MESSAGES.MIN_PASSWORD)
    .required(ERROR_MESSAGES.REQUIRED_PASSWORD),
});

export const Register = ({ onClose }) => {
  const [visibility, setVisibility] = useState(false);
  const dispatch = useDispatch();

  const handelSubmit = async values => {
    const { email, password } = values;
    try {
      const result = await createUserWithEmailAndPassword(auth, email, password);
      dispatch(addToken(result.user.accessToken));
      onClose();
      return result;
    } catch (error) {
      throw error;
    }
  };

  return (
    <div className={styles.formWrapper}>
      <h3 className={styles.title}>Registration</h3>
      <p className={styles.description}>
        Thank you for your interest in our platform! In order to register, we
        need some information. Please provide us with the following information
      </p>
      <Formik
        initialValues={{ name: '', email: '', password: '' }}
        validationSchema={SignupSchema}
        onSubmit={handelSubmit}
      >
        {({
          errors,
          touched,
          handleSubmit,
          isSubmitting,
          handleBlur,
          handleChange,
          values,
        }) => (
          <form onSubmit={handleSubmit} className={styles.form}>
            <div className={styles.inputWrapper}>
              <input
                type="text"
                name="name"
                placeholder="Name"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.name}
                className={styles.input}
              />
              {errors.name && touched.name && (
                <p className={styles.errorMessage}>* {errors.name}</p>
              )}
            </div>

            <div className={styles.inputWrapper}>
              <input
                type="email"
                name="email"
                placeholder="Email"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.email}
                className={styles.input}
              />
              {errors.email && touched.email && (
                <p className={styles.errorMessage}>* {errors.email}</p>
              )}
            </div>

            <div className={styles.inputWrapper}>
              <div className={styles.passwordWrapper}>
                <input
                  type={visibility ? 'text' : 'password'}
                  name="password"
                  placeholder="Password"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.password}
                  className={styles.input}
                />
                <button
                  type="button"
                  className={styles.passwordVisibility}
                  onClick={() => setVisibility(!visibility)}
                >
                  {visibility ? <FiEyeOff /> : <FiEye />}
                </button>
              </div>
              {errors.password && touched.password && (
                <p className={styles.errorMessage}>* {errors.password}</p>
              )}
            </div>

            <button
              type="submit"
              className={styles.button}
              disabled={isSubmitting}
            >
              Submit
            </button>
          </form>
        )}
      </Formik>
    </div>
  );
};
