import img from "/pleaselogin.jpg";
import styles from "./TeachersCard.module.css";

export const NotAuth = () => {
  return (
    <div className={styles.notAuthSection}>
      <img src={img} alt="please login" width="250" height="250" />
      <p className={styles.titleNotAuth}>
        Looks like you’re not signed up yet! Join us to enjoy more features on the site.
      </p>
    </div>
  );
};
