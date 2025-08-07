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
import { StyledBadge } from './StyledBadge';
import { BookLesson } from "../BookLesson/BookLesson";
import styles from './TeachersCard.module.css';

export const TeachersMarkup = ({ item }) => {
  const [visibility, setVisibility] = useState({});
  const [teacher, setTeacher] = useState();
  const { isOpen, openModal, closeModal } = useModal();
  const authUser = useSelector(state => state.authUser.token);
  const favorite = useFavorite(database);

  const onClickModal = id => {
    const detailsTeacher = item.find(teacher => teacher.id === id);
    if (!detailsTeacher) return;
    setTeacher(detailsTeacher);
    openModal('bookLesson');
    // visibility güncellemesini kaldırdım çünkü modal açılmasıyla ilgisi yok
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
    if (!authUser) return openModal('notAuth');
    const isFavorite = favorite.find(item => item.id === id);
    return isFavorite ? deleteFavorite(id) : addFavorite(id);
  };

  return (
    <>
      <ul className={styles.listTeacher}>
        {item.map((teacher, index) => {
          const {
            name,
            surname,
            languages,
            levels = [],
            rating,
            reviews,
            price_per_hour,
            lessons_done,
            avatar_url,
            lesson_info,
            conditions,
            experience,
            id,
          } = teacher;

          const keyId = id || `${name}-${surname}-${index}`;

          return (
            <li key={keyId} className={styles.itemTeacher}>
              <div className={styles.wrapperImg}>
                <StyledBadge
                  overlap="circular"
                  anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
                  variant="dot"
                >
                  <Avatar
                    src={avatar_url}
                    alt={experience}
                    width="96"
                    height="96"
                    style={{ width: '100%', height: '100%' }}
                  />
                </StyledBadge>
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

                {!visibility[keyId] && (
                  <button
                    type="button"
                    className={styles.buttonRM}
                    onClick={() => setVisibility({ ...visibility, [keyId]: true })}
                  >
                    Read more
                  </button>
                )}

                {visibility[keyId] && (
                  <ReviewerComponent
                    experience={experience}
                    reviews={reviews}
                  />
                )}

                <ul className={styles.listLevels}>
                  {levels.map((level, i) => (
                    <li key={`${level}-${i}`} className={styles.itemLevels}>
                      <p>{level}</p>
                    </li>
                  ))}
                </ul>

                {visibility[keyId] && (
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
        })}
      </ul>

      {isOpen.open && isOpen.name === 'bookLesson' && teacher && (
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
