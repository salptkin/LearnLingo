import { useState, useEffect } from "react";
import { set, ref, remove } from "firebase/database";
import { Avatar } from "@mui/material";
import { useModal } from "../../helpers/useModal";
import { ModalComponent } from "../Modal/Modal";
import { useSelector } from "react-redux";
import { auth, database } from "../../firebaseconfig/config";
import { useFavorite } from "../../helpers/useFavorite";
import { ReviewerComponent } from "./Rewievers";
import { TeacherInfo } from "./TeacherInfo";
import {NotAuth} from "./NotAuth";
import { StyledBadge } from "./StyledBadge";
import { BookLesson } from "../BookLesson/BookLesson";
import styles from "./TeachersCard.module.css";

export const TeachersCard = ({ item, selectedLevel = '' }) => {
  const [visibility, setVisibility] = useState({});
  const [teacher, setTeacher] = useState(null);
  const { isOpen, openModal, closeModal } = useModal();
  const authUser = useSelector(state => state.authUser.token);
  const favorite = useFavorite(database);

  useEffect(() => {
  }, [item, favorite]);

  const onClickModal = (id) => {
    const detailsTeacher = item.find(t => String(t.id) === String(id));
    if (!detailsTeacher) return;
    setTeacher(detailsTeacher);
    openModal('bookLesson');
  };

  const deleteFavorite = (id) => {
    const favRef = ref(database, `/favorite/${auth.currentUser.uid}/${id}`);
    return remove(favRef);
  };

  const addFavorite = (teacherObj) => {
    const id = teacherObj?.id;
    if (!id) return;
    const userRef = ref(database, `/favorite/${auth.currentUser.uid}/${id}`);
    set(userRef, { id, ...teacherObj });
  };

  const handelClick = (teacherObj) => {
    if (!authUser) return openModal('notAuth');
    const id = teacherObj?.id;
    if (!id) return;
    const isFavorite = favorite.some(f => String(f.id) === String(id));
    return isFavorite ? deleteFavorite(id) : addFavorite(teacherObj);
  };

  return (
    <>
      <ul className={styles.listTeacher}>
        {item.map((teacher, index) => {
          const {
            id,
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
          } = teacher;

          const keyId = id || `${name}-${surname}-${index}`;
          const isFavorited = favorite.some(f => String(f.id) === String(id));

          return (
            <li key={id || `teacher-${index}`} className={styles.itemTeacher}>
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
                  isFavorited={isFavorited}
                  id={id}
                  authUser={authUser}
                  handelClick={() => handelClick(teacher)}
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
                    onClick={() => setVisibility(prev => ({ ...prev, [keyId]: true }))}
                  >
                    Read more
                  </button>
                )}

                {visibility[keyId] && (
                  <ReviewerComponent experience={experience} reviews={reviews} />
                )}

                <ul className={styles.listLevels}>
                  {levels.map((level, i) => {
                    const isActive = selectedLevel && selectedLevel === level;
                    return (
                      <li
                        key={`${level}-${i}`}
                        className={`${styles.itemLevels} ${isActive ? styles.activeLevel : ""}`}
                      >
                        <p>{level}</p>
                      </li>
                    );
                  })}
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
          <BookLesson teacher={teacher} onClose={closeModal} />
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

export default TeachersCard;
