import { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ref, onValue } from "firebase/database";
import { FormControl, MenuItem, Select, styled } from "@mui/material";
import { TeachersMarkup } from "../../components/TeachersCard/TeachersCard";
import { database } from "../../firebaseconfig/config";
import { languages, levels, price } from "../../helpers/optionFilter";
import { TiDelete } from "react-icons/ti";
import { addFilter, addFilterName, deleteFilter } from "../../redux/sliceFilter";
import { useLocation } from "react-router-dom";
import styles from "./Filter.module.css";

const Input = styled(Select)(() => ({
  fontFamily: '"Roboto", sans-serif',
  borderRadius: '14px',
  backgroundColor: '#fff',
  '& .MuiOutlinedInput-notchedOutline': { border: 'none' },
  '&:hover .MuiOutlinedInput-notchedOutline': { border: 'none' },
  '&.Mui-focused .MuiOutlinedInput-notchedOutline': { border: 'none' },
}));

export const Filter = () => {
  const dispatch = useDispatch();
  const filter = useSelector(state => state.filter.filterTeachers);
  const { pathname } = useLocation();

  const [allTeachers, setAllTeachers] = useState([]);
  const [options, setOptions] = useState({ language: '', levels: '', price: '' });
  const [item, setItem] = useState({ language: [], levels: [] });
  const [search, setSearch] = useState(false);

  useEffect(() => {
    const dbRef = ref(database, 'teachers');

    const unsubscribe = onValue(dbRef, snapshot => {
      const teachersData = snapshot.val();
      if (!teachersData) { setAllTeachers([]); return; }

      const teachersList = Object.entries(teachersData).map(([key, value]) => ({
        id: key,
        ...value,
      }));
      setAllTeachers(teachersList);

      if (!search) {
        dispatch(addFilter(teachersList));
      }
    });

    return () => unsubscribe();
  }, [database, dispatch, search]);

  const handelClickLanguage = useCallback(ev => {
    const selectedLanguage = ev.target.value;
    setOptions(prev => ({ ...prev, language: selectedLanguage }));
    setSearch(true);

    if (options.language !== selectedLanguage) {
      setOptions(prev => ({ ...prev, price: '', levels: '' }));
    }

    const filteredByLanguage = allTeachers.filter(t =>
      t.languages.includes(selectedLanguage)
    );

    setItem(prev => ({ ...prev, language: filteredByLanguage }));
    dispatch(addFilterName(selectedLanguage));
    dispatch(addFilter(filteredByLanguage));
  }, [allTeachers, dispatch, options.language]);

  const handelClickLanguageLevel = useCallback(ev => {
    const selectedLevels = ev.target.value;
    setOptions(prev => ({ ...prev, levels: selectedLevels }));
    setSearch(true);

    if (options.price !== '') {
      setOptions(prev => ({ ...prev, price: '' }));
    }

    const filteredByLevel = item.language.filter(t =>
      t.levels.includes(selectedLevels)
    );

    setItem(prev => ({ ...prev, levels: filteredByLevel }));
    dispatch(addFilter(filteredByLevel));
  }, [item.language, dispatch, options.price]);

  const handelClickPrice = useCallback(ev => {
    const selectedPrice = ev.target.value;
    setOptions(prev => ({ ...prev, price: selectedPrice }));
    setSearch(true);

    const filterByLevel = item.levels.length !== 0 ? item.levels : item.language;
    const filteredByPrice = filterByLevel.filter(
      t => t.price_per_hour >= Number(selectedPrice)
    );

    const sortedTeachers = [...filteredByPrice].sort(
      (a, b) => a.price_per_hour - b.price_per_hour
    );

    dispatch(addFilter(sortedTeachers));
  }, [item.levels, item.language, dispatch]);

  useEffect(() => {
    if (pathname !== '/teachers') {
      dispatch(deleteFilter());
    }
  }, [dispatch, pathname]);

  const clearFilter = () => {
    setOptions({ language: '', levels: '', price: '' });
    setSearch(false);
    dispatch(deleteFilter());
    dispatch(addFilter(allTeachers));
  };

  return (
    <>
      <div className={styles.wrapper}>
        <FormControl sx={{ marginRight: '20px', minWidth: 221 }} size="small">
          <p className={styles.title}>Languages</p>
          <Input value={options.language} onChange={handelClickLanguage}>
            {languages.map((option, index) => (
              <MenuItem value={option} key={index}>
                <em className={styles.em}>{option}</em>
              </MenuItem>
            ))}
          </Input>
        </FormControl>

        <FormControl sx={{ marginRight: '20px', minWidth: 198 }} size="small">
          <p className={styles.title}>Level of knowledge</p>
          <Input
            value={options.levels}
            onChange={handelClickLanguageLevel}
            disabled={options.language === ''}
          >
            {levels.map((option, index) => (
              <MenuItem value={option} key={index}>
                <em className={styles.em}>{option}</em>
              </MenuItem>
            ))}
          </Input>
        </FormControl>

        <FormControl sx={{ minWidth: 124 }} size="small">
          <p className={styles.title}>Price</p>
          <Input
            value={options.price}
            onChange={handelClickPrice}
            disabled={options.language === ''}
          >
            {price.map((option, index) => (
              <MenuItem value={option} key={index}>
                <em className={styles.em}>{option}</em>
              </MenuItem>
            ))}
          </Input>
        </FormControl>

        {Object.values(options).join('') !== '' && (
          <button type="button" onClick={clearFilter} className={styles.button}>
            <TiDelete />
          </button>
        )}
      </div>

      {filter.length === 0 && search && (
        <p className={styles.notFound}>
          Sorry, we could not find a teacher that fits your preferences. Feel free to browse through our available list. 😊
        </p>
      )}

      <TeachersMarkup item={filter} selectedLevel={options.levels} />
    </>
  );
};
