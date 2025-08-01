import { useState } from 'react';
import { set, ref, remove } from 'firebase/database';
import { Avatar } from '@mui/material';
import { useModal } from '../../helpers/useModal';
import { ModalComponent } from '../Modal/Modal';
import { useSelector } from 'react-redux';
import { auth, database } from '../../firebaseconfig/config';
import { useFavorite } from '../../helpers/useFavorite';
import { ReviewerComponent } from './Rewievers';
import { AboutTeacher } from './AboutTeacher';
import {
  ButtonBookLesson,
  ButtonRM,
  ItemLevels,
  ItemTeacher,
  ListLevels,
  ListTeacher,
  Wrapper,
  WrapperImg,
} from './TeachersMarkup.styled';


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
      <ListTeacher>
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
              <ItemTeacher key={id}>
                <WrapperImg>
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
                      style={{
                        width: '100%',
                        height: '100%',
                      }}
                    />
                  </StyledBadge>
                </WrapperImg>
                <Wrapper>
                  <AboutTeacher
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
                    <ButtonRM
                      type="button"
                      onClick={() =>
                        setVisibility({ ...visibility, [id]: true })
                      }
                    >
                      Read more
                    </ButtonRM>
                  )}
                  {visibility[id] && (
                    <ReviewerComponent
                      experience={experience}
                      reviews={reviews}
                    />
                  )}
                  <ListLevels>
                    {levels.map((i, index) => (
                      <ItemLevels key={index}>
                        <p>{i}</p>
                      </ItemLevels>
                    ))}
                  </ListLevels>
                  {visibility[id] && (
                    <ButtonBookLesson
                      type="button"
                      onClick={() => onClickModal(id)}
                    >
                      Book trial lesson
                    </ButtonBookLesson>
                  )}
                </Wrapper>
              </ItemTeacher>
            );
          }
        )}
      </ListTeacher>
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