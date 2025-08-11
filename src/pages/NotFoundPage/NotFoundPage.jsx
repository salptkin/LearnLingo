import { useNavigate } from "react-router-dom";
import img from "/notfound.png";
import styles from "./NotFoundPage.module.css";

const NotFoundPage = () => {
  const navigate = useNavigate();

  const goHome = () => {
    navigate("/");
  };

  const goTeachers = () => {
    navigate("/teachers");
  };

  return (
    <div className={styles.section}>
      <img className={styles.img} src={img} alt="Page not found" />
      <div className={styles.notFoundPage__textContainer}>
        <h1 className={styles.notFoundPage__title}>404 Not Found</h1>
        <p className={styles.notFoundPage__description}>
          The page you are looking for does not exist.
        </p>
        <div className={styles.buttonGroup}>
          <button onClick={goHome} className={styles.notFoundPage__button}>
            Go to Homepage
          </button>
          <button onClick={goTeachers} className={styles.notFoundPage__button}>
            Go to Teachers
          </button>
        </div>
      </div>
    </div>
  );
};

export default NotFoundPage;
