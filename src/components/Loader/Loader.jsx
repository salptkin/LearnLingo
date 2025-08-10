import img from "/homepagegirl.png";
import styles from "./Loader.module.css";

export const Loader = () => {
  return (
    <div className={styles.section}>
      <div className={styles.wrapper}>
        <img
          className={styles.image}
          src={img}
          alt="Loader..."
          width="100"
        />
        <p className={styles.title}>LearnLingo</p>
      </div>
    </div>
  );
};
