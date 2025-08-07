import styles from './BookLesson.module.css';
import { FormComponent } from './FormComponent';

export const BookLesson = ({ teacher }) => {
  return (
    <div className={styles.section}>
      <h3 className={styles.title}>Book trial lesson</h3>
      <p className={styles.description}>
        Our experienced tutor will assess your current language level, discuss
        your learning goals, and tailor the lesson to your specific needs.
      </p>
      <div className={styles.wrapperTeacher}>
        <img
          className={styles.image}
          src={teacher?.avatar_url}
          alt={teacher?.name}
          width="44"
          height="44"
        />
        <div className={styles.wrapperName}>
          <p className={styles.titleTeacher}>Your teacher</p>
          <p className={styles.nameTeacher}>{teacher?.name}</p>
        </div>
      </div>
      <FormComponent languages={teacher?.languages} />
    </div>
  );
};

export default BookLesson;