import styled from 'styled-components';

export const Section = styled.section`
  background-color: #f8f8f8;
  min-height: calc(100vh - 83px);
  padding-top: 96px;
  padding-bottom: 96px;
`;

export const ListTeacher = styled.ul`
  max-width: 1184px;
  margin: 0 auto;
`;

export const ItemTeacher = styled.li`
  background-color: #fff;
  border-radius: 24px;
  padding: 24px;

  display: flex;
  gap: 48px;
  align-items: flex-start;
  flex-direction: column;

  &:not(:last-child) {
    margin-bottom: 32px;
  }
  @media screen and (min-width: 500px) {
    flex-direction: row;
  }
`;

export const WrapperImg = styled.div`
  border-radius: 100px;
  border: 3px solid #fbe9ba;
  padding: 12px;
  background: #fff;
  overflow: hidden;
  width: 120px;
`;

export const Wrapper = styled.div`
  @media screen and (min-width: 500px) {
    width: calc(100% - 120px);
  }
`;

export const WrapperLessons = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 20px;
  margin-bottom: 8px;
`;

export const Language = styled.p`
  color: var(--color-text-content);
  font-size: 16px;
  font-style: normal;
  font-weight: 500;
  line-height: 1.5;
`;

export const ListLessons = styled.ul`
  display: flex;
  align-items: center;
  row-gap: 10px;
  column-gap: 32px;
  flex-wrap: wrap;
  justify-content: flex-end;
`;

export const ItemLessons = styled.li``;

export const DetailsLessons = styled.p`
  color: var(--main-text-color);
  font-size: 16px;
  font-weight: 500;
  line-height: 1.5;
  display: flex;
  align-items: center;
  gap: 8px;

  & span {
    display: flex;
  }

  & .rating {
    color: #ffc531;
  }

  & .price {
    color: #38cd3e;
  }
`;

export const WrapperTeacher = styled.div``;

export const NameTeacher = styled.p`
  color: var(--main-text-color);
  font-size: 24px;
  font-weight: 500;
  line-height: 1;

  margin-bottom: 32px;
`;

export const ListDetailsTeacher = styled.ul``;

export const ItemDetailsTeacher = styled.li`
  &:not(:last-child) {
    margin-bottom: 8px;
  }
`;

export const TitleDetailsTeacher = styled.p`
  color: var(--main-text-color);
  font-size: 16px;
  font-weight: 500;
  line-height: 1;

  & span {
    color: var(--color-text-content);
  }

  & .languages {
    color: var(--main-text-color);
    text-decoration-line: underline;
  }
`;

export const ButtonRM = styled.button`
  cursor: pointer;
  color: var(--main-text-color);
  font-family: 'Roboto', sans-serif;
  font-size: 16px;
  font-style: normal;
  font-weight: 500;
  line-height: 1.5;
  background-color: transparent;
  border: none;
  text-decoration-line: underline;
  margin-top: 16px;
  margin-bottom: 32px;
  transition: color var(--transition);

  &:hover,
  :focus {
    color: var(--active-color);
  }
`;

export const Reviewer = styled.div``;

export const ReviewerExperience = styled.p`
  color: var(--main-text-color);
  font-size: 16px;
  font-weight: 400;
  line-height: 1.5;

  margin-top: 16px;
  margin-bottom: 32px;
`;

export const ReviewerList = styled.ul`
  margin-bottom: 32px;
`;

export const ReviewerItem = styled.li`
  &:not(:last-child) {
    margin-bottom: 32px;
  }
`;

export const ReviewerWrapper = styled.div`
  display: flex;
  gap: 12px;
  margin-bottom: 16px;
`;

export const ReviewerImg = styled.img`
  border-radius: 100px;
`;

export const ReviewerName = styled.p`
  color: var(--color-text-content);
  font-size: 16px;
  font-weight: 500;
  line-height: 1.5;
`;

export const ReviewerRating = styled.p`
  color: var(--main-text-color);
  font-size: 14px;
  font-weight: 500;
  line-height: 1.28;
  display: flex;
  align-items: center;

  & span {
    display: flex;
    color: #ffc531;
    margin-right: 8px;
  }
`;

export const ReviewerComment = styled.p``;

export const ListLevels = styled.ul`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 8px;
`;

export const ItemLevels = styled.li`
  padding: 8px 12px;
  border-radius: 35px;
  background-color: transparent;
  border: 1px solid rgba(18, 20, 23, 0.2);

  &:first-child {
    background: #f4c550;
    border: 1px solid transparent;
  }

  & p {
    color: var(--main-text-color);
    font-size: 14px;
    font-weight: 500;
    line-height: 1.14;
  }
`;

export const ButtonBookLesson = styled.button`
  cursor: pointer;
  margin-top: 32px;
  color: var(--main-text-color);
  font-family: 'Roboto', sans-serif;
  font-size: 18px;
  font-weight: 700;
  line-height: 1.55;
  border: none;
  padding: 16px 48px;
  border-radius: 12px;
  background-color: #f4c550;
  transition: background-color var(--transition);

  &:hover,
  :focus {
    background-color: #ffdc86;
  }
`;

export const FavoriteButton = styled.button`
  cursor: pointer;
  width: 100%;
  background-color: transparent;
  border: none;
  color: #000;
  transition: color var(--transition);

  & svg {
    width: 26px;
    height: 26px;
  }

  &:hover,
  :focus {
    color: var(--active-color);
  }
`;

export const NotAuthSection = styled.div`
  padding: calc(20px + (40 - 20) * ((100vw - 390px) / (1440 - 390)));
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const TitleNotAuth = styled.p`
  margin-top: 40px;
  color: var(--main-text-color);
  font-size: 16px;
  font-weight: 500;
  line-height: 1;
  max-width: 300px;
`;