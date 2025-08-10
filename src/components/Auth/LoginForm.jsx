import { useState } from "react";
import { Formik } from "formik";
import * as Yup from "yup";
import { FiEyeOff, FiEye } from "react-icons/fi";
import styles from "./LoginForm.module.css";
import { Regexp } from "../../helpers/regexp";
import { ERROR_MESSAGES } from "../../helpers/errormsg";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebaseconfig/config";
import { addToken } from "../../redux/sliceAuth";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { styleToastify } from "../../components/Toastify/Toastify";

const SignupSchema = Yup.object().shape({
  email: Yup.string()
    .matches(Regexp, ERROR_MESSAGES.INVALID_EMAIL)
    .required(ERROR_MESSAGES.REQUIRED_EMAIL),
  password: Yup.string()
    .min(6, ERROR_MESSAGES.MIN_PASSWORD)
    .required(ERROR_MESSAGES.REQUIRED_PASSWORD),
});

export const Login = ({ onClose }) => {
  const [visibility, setVisibility] = useState(false);
  const dispatch = useDispatch();

  const handelSubmit = async values => {
    const { email, password } = values;
    try {
      const credentials = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );

      dispatch(addToken(credentials.user.accessToken));
      onClose();
      return credentials.user;
    } catch {
      toast.error(
        'Oops something went wrong, check if you entered the data correctly',
        styleToastify
      );
    }
  };

  return (
    <div className={styles.formWrapper}>
      <h3 className={styles.title}>Log In</h3>
      <p className={styles.description}>
        Welcome back! Please enter your credentials to access your account and
        continue your search for an teacher.
      </p>
      <Formik
        initialValues={{
          email: '',
          password: '',
        }}
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
          <form className={styles.form} onSubmit={handleSubmit}>
            <div className={styles.inputWrapper}>
              <input
                className={styles.input}
                type="email"
                name="email"
                placeholder="Email"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.email}
              />
              {errors.email && touched.email ? (
                <p className={styles.errorMessage}>* {errors.email}</p>
              ) : null}
            </div>
            <div className={styles.inputWrapper}>
              <div className={styles.passwordWrapper}>
                <input
                  className={styles.input}
                  name="password"
                  type={visibility ? 'text' : 'password'}
                  placeholder="Password"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.password}
                />
                <button
                  type="button"
                  className={styles.passwordVisibility}
                  onClick={() => setVisibility(!visibility)}
                >
                  {visibility ? <FiEyeOff /> : <FiEye />}
                </button>
              </div>
              {errors.password && touched.password ? (
                <p className={styles.errorMessage}>* {errors.password}</p>
              ) : null}
            </div>
            <button
              className={styles.button}
              type="submit"
              disabled={isSubmitting}
            >
              Log In
            </button>
          </form>
        )}
      </Formik>
    </div>
  );
};
