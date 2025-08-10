import * as Yup from "yup";
import {
  FormControl,
  FormControlLabel,
  Radio,
  RadioGroup,
} from "@mui/material";
import { Regexp } from "../../helpers/regexp";

import { Formik } from "formik";
import { ERROR_MESSAGES } from "../../helpers/errormsg";
import { useSelector } from "react-redux";
import styles from "./FormComponent.module.css";

const options = [
  { name: 'Career and business', id: '1' },
  { name: 'Lesson for kids', id: '2' },
  { name: 'Living abroad', id: '3' },
  { name: 'Exams and coursework', id: '4' },
  { name: 'Culture, travel or hobby', id: '5' },
];

const SignupSchema = Yup.object().shape({
  fullName: Yup.string()
    .min(3, ERROR_MESSAGES.MIN_NAME)
    .max(50, ERROR_MESSAGES.MAX_NAME)
    .required(ERROR_MESSAGES.REQUIRED_NAME),
  email: Yup.string()
    .matches(Regexp, ERROR_MESSAGES.INVALID_EMAIL)
    .required(ERROR_MESSAGES.REQUIRED_EMAIL),
  number: Yup.string()
    .min(13, ERROR_MESSAGES.MIN_PHONE)
    .max(16, ERROR_MESSAGES.MAX_PHONE)
    .matches(/^\+90\s?0?5\d{9}$/, ERROR_MESSAGES.INVALID_PHONE)
    .required(ERROR_MESSAGES.REQUIRED_PHONE),
});


export const FormComponent = ({ languages }) => {
  const language = useSelector(state => state.filter.name);
  const learning = language === '' ? languages.join(', ') : language;

  const handelSubmit = values => {
    console.log(values);
  };

  return (
    <FormControl>
      <h4 className={styles.formTitle}>
        What is your main reason for learning {learning}?
      </h4>
      <Formik
        initialValues={{
          email: '',
          fullName: '',
          number: '',
          lesson: options[0].name,
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
            <RadioGroup
              value={values.lesson}
              onChange={handleChange}
              name="lesson"
              className={styles.radioGroup}
            >
              {options.map(({ name, id }) => (
                <FormControlLabel
                  key={id}
                  value={name}
                  name="lesson"
                  control={
                    <Radio
                      sx={{
                        color: '#12141733',
                        '&.Mui-checked': {
                          color: '#F4C550',
                        },
                      }}
                    />
                  }
                  label={name}
                />
              ))}
            </RadioGroup>

            <div>
              <div className={styles.inputWrapper}>
                <input
                  type="text"
                  name="fullName"
                  onBlur={handleBlur}
                  placeholder="Full Name"
                  value={values.fullName}
                  onChange={handleChange}
                />
                {errors.fullName && touched.fullName && (
                  <p className={styles.errorMessage}>* {errors.fullName}</p>
                )}
              </div>

              <div className={styles.inputWrapper}>
                <input
                  type="email"
                  name="email"
                  onBlur={handleBlur}
                  placeholder="Email"
                  value={values.email}
                  onChange={handleChange}
                />
                {errors.email && touched.email && (
                  <p className={styles.errorMessage}>* {errors.email}</p>
                )}
              </div>

              <div className={styles.inputWrapper}>
                <input
                    type="tel"
                    name="number"
                    placeholder="+905XXXXXXXX"
                    value={values.number}
                    onBlur={handleBlur}
                    onChange={handleChange}
                /> 

                {errors.number && touched.number && (
                  <p className={styles.errorMessage}>* {errors.number}</p>
                )}
              </div>
            </div>

            <button
              className={styles.button}
              type="submit"
              disabled={isSubmitting}
            >
              Book
            </button>
          </form>
        )}
      </Formik>
    </FormControl>
  );
};
