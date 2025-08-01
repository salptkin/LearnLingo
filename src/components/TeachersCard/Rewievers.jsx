import { FaStar } from 'react-icons/fa';
import {
  Reviewer,
  ReviewerComment,
  ReviewerExperience,
  ReviewerImg,
  ReviewerItem,
  ReviewerList,
  ReviewerName,
  ReviewerRating,
  ReviewerWrapper,
} from './TeachersMarkup.styled';

export const ReviewerComponent = ({ experience, reviews }) => {
  return (
    <Reviewer>
      <ReviewerExperience>{experience}</ReviewerExperience>
      <ReviewerList>
        {reviews.map(({ reviewer_name, reviewer_rating, comment }, index) => (
          <ReviewerItem key={index}>
            <ReviewerWrapper>
              <ReviewerImg
                src="https://cdn-icons-png.flaticon.com/512/878/878516.png"
                alt="reviews"
                width="44"
                height="44"
                loading="lazy"
              />
              <div>
                <ReviewerName>{reviewer_name}</ReviewerName>
                <ReviewerRating>
                  <span>
                    <FaStar />
                  </span>
                  {reviewer_rating}
                </ReviewerRating>
              </div>
            </ReviewerWrapper>
            <ReviewerComment>{comment}</ReviewerComment>
          </ReviewerItem>
        ))}
      </ReviewerList>
    </Reviewer>
  );
};