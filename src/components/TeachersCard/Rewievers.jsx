import { FaStar } from 'react-icons/fa';
import styles from './TeachersCard.module.css';

export const ReviewerComponent = ({ experience, reviews }) => {
  return (
    <div className={styles.reviewer}>
      <p className={styles.reviewerExperience}>{experience}</p>
      <ul className={styles.reviewerList}>
        {reviews.map(({ reviewer_name, reviewer_rating, comment }, index) => (
          <li className={styles.reviewerItem} key={index}>
            <div className={styles.reviewerWrapper}>
              <img
                className={styles.reviewerImg}
                src="https://cdn-icons-png.flaticon.com/512/878/878516.png"
                alt="reviews"
                width="44"
                height="44"
                loading="lazy"
              />
              <div>
                <p className={styles.reviewerName}>{reviewer_name}</p>
                <p className={styles.reviewerRating}>
                  <span>
                    <FaStar />
                  </span>
                  {reviewer_rating}
                </p>
              </div>
            </div>
            <p className={styles.reviewerComment}>{comment}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};
