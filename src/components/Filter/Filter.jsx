import { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ref, query, orderByChild, onValue } from 'firebase/database';
import { FormControl, MenuItem, Select, styled } from '@mui/material';
import { TeachersMarkup } from "../../components/TeachersCard/TeachersCard"
import { database } from '../../firebaseconfig/config';
import { languages, levels, price } from "../../helpers/optionFilter";
import { TiDelete } from 'react-icons/ti';
import { addFilter, addFilterName, deleteFilter } from "../../redux/sliceFilter";
import { useLocation } from 'react-router-dom';
import { Button, Em, NotFound, Title, Wrapper } from './Filter.styled';

const Input = styled(Select)(() => ({
  fontFamily: '"Roboto", sans-serif',
  borderRadius: '14px',
  backgroundColor: '#fff',
  '& .MuiOutlinedInput-notchedOutline': {
    border: 'none',
  },
  '&:hover .MuiOutlinedInput-notchedOutline': {
    border: 'none',
  },
  '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
    border: 'none',
  },
}));

export const Filter = () => {
  const dispatch = useDispatch();
  const filter = useSelector(state => state.filter.filterTeachers);
  const { pathname } = useLocation();

  const dbRef = ref(database, 'teachers');

  const [options, setOptions] = useState({
    language: '',
    levels: '',
    price: '',
  });
  const [item, setItem] = useState({
    language: [],
    levels: [],
  });
  const [search, setSearch] = useState(false);

  const handelClickLanguage = useCallback(
    ev => {
      const selectedLanguage = ev.target.value;
      setOptions(prev => ({ ...prev, language: selectedLanguage }));
      setSearch(true);

      const q = query(dbRef, orderByChild('languages'));

      if (options.language !== selectedLanguage) {
        setOptions(prev => ({ ...prev, price: '', levels: '' }));
      }

      onValue(q, snapshot => {
        const teachers = snapshot.val();

        const language = Object.keys(teachers)
          .filter(key => teachers[key].languages.includes(selectedLanguage))
          .map(key => ({ ...teachers[key] }));

        setItem(prev => ({ ...prev, language }));

        dispatch(addFilterName(selectedLanguage));
        return dispatch(addFilter(language));
      });
    },
    [dbRef, dispatch, options.language]
  );

  const handelClickLanguageLevel = useCallback(
    ev => {
      const selectedLevels = ev.target.value;
      setOptions(prev => ({ ...prev, levels: selectedLevels }));
      setSearch(true);

      if (options.price !== '') {
        setOptions(prev => ({ ...prev, price: '' }));
      }

      const levels = item.language.filter(teacher =>
        teacher.levels.includes(selectedLevels)
      );

      setItem(prev => ({ ...prev, levels }));

      return dispatch(addFilter(levels));
    },
    [options.price, item, dispatch]
  );

  const handelClickPrice = useCallback(
    ev => {
      const selectedPrice = ev.target.value;
      setOptions(prev => ({ ...prev, price: selectedPrice }));
      setSearch(true);

      const filterByLevel =
        item.levels.length !== 0 ? item.levels : item.language;

      const teachers = filterByLevel.filter(
        teacher => teacher.price_per_hour >= Number(selectedPrice)
      );

      const teacherSort = [...teachers].sort(
        (a, b) => a.price_per_hour - b.price_per_hour
      );

      return dispatch(addFilter(teacherSort));
    },
    [item, dispatch]
  );

  useEffect(() => {
    if (pathname !== '/teachers') {
      dispatch(deleteFilter());
    }
  }, [dispatch, pathname]);

  const clearFilter = () => {
    setOptions({
      language: '',
      levels: '',
      price: '',
    });

    setSearch(false);
    return dispatch(deleteFilter());
  };

  return (
    <>
      <Wrapper>
        <FormControl sx={{ marginRight: '20px', minWidth: 221 }} size="small">
          <Title>Languages</Title>
          <Input value={options.language} onChange={handelClickLanguage}>
            {languages.map((options, index) => (
              <MenuItem value={options} key={index}>
                <Em>{options}</Em>
              </MenuItem>
            ))}
          </Input>
        </FormControl>
        <FormControl sx={{ marginRight: '20px', minWidth: 198 }} size="small">
          <Title>Level of knowledge</Title>
          <Input
            value={options.levels}
            onChange={handelClickLanguageLevel}
            disabled={options.language === ''}
          >
            {levels.map((options, index) => (
              <MenuItem value={options} key={index}>
                <Em>{options}</Em>
              </MenuItem>
            ))}
          </Input>
        </FormControl>
        <FormControl sx={{ minWidth: 124 }} size="small">
          <Title>Price</Title>
          <Input
            value={options.price}
            onChange={handelClickPrice}
            disabled={options.language === ''}
          >
            {price.map((options, index) => (
              <MenuItem value={options} key={index}>
                <Em>{options}</Em>
              </MenuItem>
            ))}
          </Input>
        </FormControl>
        {Object.values(options).join('') !== '' && (
          <Button type="button" onClick={clearFilter}>
            <TiDelete />
          </Button>
        )}
      </Wrapper>
      {filter.length === 0 && search && (
        <NotFound>
          Sorry, we could not find a teacher that fits your preferences. Feel free to browse through our available list. 😊
        </NotFound>
      )}
      <TeachersMarkup item={filter} />
    </>
  );
};