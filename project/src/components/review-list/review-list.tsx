import ReviewItem from '../review-item/review-item';
import ReviewForm from '../review-form/review-form';
import { Comment, Comments } from '../../types/offer';
import { AuthorizationStatus, MAX_COMMENTS_TO_VIEW } from '../../const';
import { useAppSelector } from '../../hooks';
import { getAuthorizationStatus } from '../../store/user-process/selectors';

type ReviewListProps = {
  comments: Comments
};

function ReviewList({comments}: ReviewListProps): JSX.Element {
  const authorizationStatus = useAppSelector(getAuthorizationStatus);

  const lastTenSortedComments: Comments = comments.slice().sort((a, b) => {
    const dateA = new Date(a.date).getTime();
    const dateB = new Date(b.date).getTime();

    return dateB - dateA;
  }).slice(0, MAX_COMMENTS_TO_VIEW);

  return (
    <section className="property__reviews reviews">
      <h2 className="reviews__title">Reviews &middot; <span className="reviews__amount" data-testid="commentsCount">{comments.length}</span></h2>
      <ul className="reviews__list">
        {
          lastTenSortedComments.map((comment: Comment, i) => {
            const keyValue = `comment_${i}_${comment.id}`;
            return <ReviewItem key={keyValue} commentObject={comment}/>;
          })
        }
      </ul>
      {
        authorizationStatus === AuthorizationStatus.Auth ? <ReviewForm /> : null
      }
    </section>
  );
}

export default ReviewList;
