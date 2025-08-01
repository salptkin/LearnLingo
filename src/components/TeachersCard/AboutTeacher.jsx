import { GoBook } from 'react-icons/go';
import { FaStar, FaRegHeart, FaHeart } from 'react-icons/fa';
import styles from './AboutTeacher.module.css';

export const AboutTeacher = ({
  lessons_done,
  rating,
  price_per_hour,
  favorite,
  id,
  authUser,
  handelClick,
  name,
  surname,
  languages,
  lesson_info,
  conditions,
}) => {
  return (
    <>
      <div className={styles.wrapperLessons}>
        <p className={styles.language}>Language</p>
        <ul className={styles.listLessons}>
          <li>
            <p className={styles.detailsLessons}>
              <span className="lesson_online">
                <GoBook />
              </span>
              Lessons online
            </p>
          </li>
          <li>
            <p className={styles.detailsLessons}>Lessons done: {lessons_done}</p>
          </li>
          <li>
            <p className={styles.detailsLessons}>
              <span className="rating">
                <FaStar />
              </span>
              Rating: {rating}
            </p>
          </li>
          <li>
            <p className={styles.detailsLessons}>
              Price / 1 hour:
              <span className="price">{price_per_hour}$</span>
            </p>
          </li>
          <li>
            <button
              type="button"
              className={styles.favoriteButton}
              onClick={() => handelClick(id)}
            >
              {favorite.find(item => item.id === id) && authUser ? (
                <FaHeart color="#F4C550" />
              ) : (
                <FaRegHeart />
              )}
            </button>
          </li>
        </ul>
      </div>

      <div className={styles.wrapperTeacher}>
        <p className={styles.nameTeacher}>{`${name} ${surname}`}</p>
        <ul className={styles.listDetailsTeacher}>
          <li className={styles.itemDetailsTeacher}>
            <p className={styles.titleDetailsTeacher}>
              <span>Speaks: </span>
              <span className="languages">{languages.join(', ')}</span>
            </p>
          </li>
          <li className={styles.itemDetailsTeacher}>
            <p className={styles.titleDetailsTeacher}>
              <span>Lesson Info: </span>
              {lesson_info}
            </p>
          </li>
          <li className={styles.itemDetailsTeacher}>
            <p className={styles.titleDetailsTeacher}>
              <span>Conditions: </span>
              {conditions.join(' ')}
            </p>
          </li>
        </ul>
      </div>
    </>
  );
};
