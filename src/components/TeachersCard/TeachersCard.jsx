import { useState } from 'react';
import { set, ref, remove } from 'firebase/database';
import { Avatar } from '@mui/material';
import { useModal } from '../../helpers/useModal';
import { ModalComponent } from '../Modal/Modal';
import { useSelector } from 'react-redux';
import { auth, database } from '../../firebaseconfig/config';
import { useFavorite } from '../../helpers/useFavorite';
import { ReviewerComponent } from './Rewievers';
import { TeacherInfo } from './TeacherInfo';

import styles from './TeachersCard.module.css';  // CSS Modules import

export const TeachersMarkup = ({ item }) => {
  const [visibility, setVisibility] = useState({});
  const [teacher, setTeacher] = useState();
  const { isOpen, openModal, closeModal } = useModal();
  const authUser = useSelector(state => state.authUser.token);
  const favorite = useFavorite(database);

  const onClickModal = id => {
    const detailsTeacher = item.find(teacher => teacher.id === id);
    setTeacher(detailsTeacher);
    openModal('bookLesson');

    setVisibility({ ...visibility, [id]: false });
  };

  const deleteFavorite = id => {
    const favRef = ref(database, `/favorite/${auth.currentUser.uid}/${id}`);
    return remove(favRef);
  };

  const addFavorite = id => {
    const favoriteTeacher = item.find(teacher => teacher.id === id);

    const userRef = ref(database, `/favorite/${auth.currentUser.uid}/${id}`);

    set(userRef, favoriteTeacher);
  };

  const handelClick = id => {
    if (!authUser) {
      return openModal('notAuth');
    }

    const isFavorite = favorite.find(item => item.id === id);

    if (isFavorite) {
      return deleteFavorite(id);
    } else {
      return addFavorite(id);
    }
  };

  return (
    <>
      <ul className={styles.listTeacher}>
        {item.map(
          ({
            name,
            surname,
            languages,
            levels,
            rating,
            reviews,
            price_per_hour,
            lessons_done,
            avatar_url,
            lesson_info,
            conditions,
            experience,
            id,
          }) => {
            return (
              <li key={id} className={styles.itemTeacher}>
                <div className={styles.wrapperImg}>
                  <Avatar
                    src={avatar_url}
                    alt={experience}
                    style={{
                      width: '100%',
                      height: '100%',
                      borderRadius: '100px',
                      border: '3px solid #fbe9ba',
                      padding: '12px',
                      background: '#fff',
                      overflow: 'hidden',
                      boxSizing: 'border-box',
                    }}
                  />
                </div>
                <div className={styles.wrapper}>
                  <TeacherInfo
                    lessons_done={lessons_done}
                    rating={rating}
                    price_per_hour={price_per_hour}
                    favorite={favorite}
                    id={id}
                    authUser={authUser}
                    handelClick={handelClick}
                    name={name}
                    surname={surname}
                    languages={languages}
                    lesson_info={lesson_info}
                    conditions={conditions}
                  />
                  {!visibility[id] && (
                    <button
                      type="button"
                      className={styles.buttonRM}
                      onClick={() =>
                        setVisibility({ ...visibility, [id]: true })
                      }
                    >
                      Read more
                    </button>
                  )}
                  {visibility[id] && (
                    <ReviewerComponent
                      experience={experience}
                      reviews={reviews}
                    />
                  )}
                  <ul className={styles.listLevels}>
                    {levels.map((i, index) => (
                      <li key={index} className={styles.itemLevels}>
                        <p>{i}</p>
                      </li>
                    ))}
                  </ul>
                  {visibility[id] && (
                    <button
                      type="button"
                      className={styles.buttonBookLesson}
                      onClick={() => onClickModal(id)}
                    >
                      Book trial lesson
                    </button>
                  )}
                </div>
              </li>
            );
          }
        )}
      </ul>
      {isOpen.open && isOpen.name === 'bookLesson' && (
        <ModalComponent onClose={closeModal}>
          <BookLesson teacher={teacher} />
        </ModalComponent>
      )}
      {isOpen.open && isOpen.name === 'notAuth' && (
        <ModalComponent onClose={closeModal}>
          <NotAuth />
        </ModalComponent>
      )}
    </>
  );
};

export default TeachersMarkup;