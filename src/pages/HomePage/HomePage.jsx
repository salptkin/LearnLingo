import { useNavigate } from "react-router-dom";
import { Container } from "../../globalStyles";
import girl from "/homepagegirl.png";
import computer from "/computer.png";
import styles from "./HomePage.module.css";

const HomePage = () => {
  const navigate = useNavigate();

  const options = [
    {
      number: '32,000 +',
      title: 'Experienced tutors',
    },
    {
      number: '300,000 +',
      title: '5-star tutor reviews',
    },
    {
      number: '120 +',
      title: 'Subjects taught',
    },
    {
      number: '200 +',
      title: 'Tutor nationalities',
    },
  ];

  return (
    <section className={styles.section}>
      <Container>
        <div className={styles.wrapper}>
          <div className={styles.wrapperAbout}>
            <h1 className={styles.title}>
              Unlock your potential with the best <span>language</span> tutors
            </h1>
            <p className={styles.description}>
              Embark on an Exciting Language Journey with Expert Language
              Tutors: Elevate your language proficiency to new heights by
              connecting with highly qualified and experienced tutors.
            </p>
            <button
              type="button"
              className={styles.button}
              onClick={() => navigate('teachers')}
            >
              Get started
            </button>
          </div>

          <div className={styles.wrapperImage}>
            <img
              src={girl}
              alt="girl"
              width="339"
              className={styles.imgGirl}
            />
            <img
              src={computer}
              alt="computer"
              width="391"
              className={styles.imgComputer}
            />
          </div>
        </div>

        <ul className={styles.listReviews}>
          {options.map(({ number, title }) => (
            <li className={styles.item} key={title}>
              <p className={styles.number}>{number}</p>
              <p className={styles.titleReviews}>{title}</p>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
};

export default HomePage;
