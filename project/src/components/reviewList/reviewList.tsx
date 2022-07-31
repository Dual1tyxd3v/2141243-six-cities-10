import ReviewItem from '../reviewItem/reviewItem';
import ReviewForm from '../reviewForm/reviewForm';
import { Comments } from '../../types/offer';
import { AuthorizationStatus, MAX_COMMENTS_TO_VIEW } from '../../const';
import { useAppSelector } from '../../hooks';

type ReviewListProps = {
  comments: Comments
};

function ReviewList({comments}: ReviewListProps): JSX.Element {
  const {authorizationStatus} = useAppSelector((state) => state);
  const lastTenSortedComments = comments.slice().sort((a, b) => {
    const dateA = new Date(a.date).getTime();
    const dateB = new Date(b.date).getTime();

    return dateB - dateA;
  }).slice(0, MAX_COMMENTS_TO_VIEW);

  return (
    <section className="property__reviews reviews">
      <h2 className="reviews__title">Reviews &middot; <span className="reviews__amount">{comments.length}</span></h2>
      <ul className="reviews__list">
        {
          lastTenSortedComments.map((comment) => (
            <ReviewItem key={comment.id} commentObject={comment}/>
          ))
        }
      </ul>
      {
        authorizationStatus === AuthorizationStatus.Auth ? <ReviewForm /> : null
      }
    </section>
  );
}

export default ReviewList;
