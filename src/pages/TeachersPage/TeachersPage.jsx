import { Filter } from "../../components/Filter/Filter";
import { useSelector, useDispatch } from "react-redux";
import { ref, child, get } from "firebase/database";
import { database } from "../../firebaseconfig/config";
import styles from "./TeachersPage.module.css";
import { useEffect, useState } from "react";
import { TeachersCard } from "../../components/TeachersCard/TeachersCard";
import { deleteFilter, setSelectedLevel } from "../../redux/sliceFilter";
import { useLocation } from "react-router-dom";

const TEACHERS_COLLECTION = 'teachers';
const TEACHERS_PER_PAGE = 4;

const TeachersPage = () => {
  const [teachers, setTeachers] = useState([]);
  const filter = useSelector(state => state.filter.filterTeachers);
  const filterName = useSelector(state => state.filter.name);
  const selectedLevel = useSelector(state => state.filter.selectedLevel);
  const [count, setCount] = useState(TEACHERS_PER_PAGE);
  const dbRef = ref(database);
  const dispatch = useDispatch();
  const location = useLocation();

  useEffect(() => {
    async function fetchTeachers() {
      try {
        const data = await get(child(dbRef, TEACHERS_COLLECTION));
        if (data.exists()) {
          const teachersData = data.val();
          // id'yi string yap
          const teachersArray = Object.entries(teachersData || {}).map(([key, value]) => ({
            id: String(key),
            ...value,
          }));
          setTeachers(teachersArray);
        } else {
        }
      } catch (error) {
        console.error('Error fetching teachers:', error);
      }
    }
    fetchTeachers();
  }, [dbRef]);

  useEffect(() => {
    if (filter && filter.length > 0) {
      setCount(TEACHERS_PER_PAGE);
    } else if (filter && filter.length === 0) {
      setCount(TEACHERS_PER_PAGE);
    }
  }, [filter]);

  useEffect(() => {
    dispatch(deleteFilter());
  }, [location.pathname, dispatch]);

  const handleMoreButtonClick = () => {
    const currentTotal = filter && filter.length > 0 ? filter : teachers;
    if (count >= currentTotal.length) return;
    setCount(prevCount => prevCount + TEACHERS_PER_PAGE);
  };

  const limitedTeachers = teachers.slice(0, count);
  const limitedFilteredTeachers = filter.slice(0, count);

  const displayTeachers = (filter && filter.length > 0 ? filter : teachers).slice(0, count);
  const totalTeachers = filter && filter.length > 0 ? filter : teachers;

  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <Filter />
        {teachers.length === 0 ? (
          <div>Loading...</div>
        ) : (
          <>
            <TeachersCard key={`teachers-${count}-${filter?.length || 0}`} item={displayTeachers} selectedLevel={selectedLevel} />
            {count < totalTeachers.length && (
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