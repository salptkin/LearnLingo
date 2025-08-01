import { Filter } from "../../components/Filter/Filter";
import { useSelector } from 'react-redux';
import { ref, child, get } from 'firebase/database';
import { database } from '../../firebaseconfig/config';
import styles from './TeachersPage.module.css';
import { useEffect, useState } from 'react';
import {TeachersMarkup} from "../../components/TeachersCard/TeachersCard";

const TEACHERS_COLLECTION = 'teachers';
const TEACHERS_PER_PAGE = 4;

const TeachersPage = () => {
  const [teachers, setTeachers] = useState([]);
  const filter = useSelector(state => state.filter.filterTeachers);
  const [count, setCount] = useState(TEACHERS_PER_PAGE);
  const dbRef = ref(database);

  useEffect(() => {
    async function fetchTeachers() {
      try {
        const data = await get(child(dbRef, TEACHERS_COLLECTION));
        if (data.exists()) {
          setTeachers(data.val());
        } else {
          console.log('No data available for teachers');
        }
      } catch (error) {
        console.error('Error fetching teachers:', error);
      }
    }
    fetchTeachers();
  }, [dbRef]);

  const handleMoreButtonClick = () => {
    if (count >= teachers.length) return;
    setCount(prevCount => prevCount + TEACHERS_PER_PAGE);
  };

  const limitedTeachers = teachers.slice(0, count);

  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <Filter />
        {filter.length === 0 && (
          <>
            <TeachersMarkup item={limitedTeachers} allTeacher={teachers} />
            {count <= teachers.length && (
              <button
                type="button"
                className={styles.button}
                onClick={handleMoreButtonClick}
              >
                More
              </button>
            )}
          </>
        )}
      </div>
    </section>
  );
};

export default TeachersPage;