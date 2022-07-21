import { Comments } from '../../types/offer';
import ReviewItem from '../reviewItem/reviewItem';
import ReviewForm from '../reviewForm/reviewForm';

type ReviewListProps = {
  comments: Comments;
}

function ReviewList({comments}: ReviewListProps): JSX.Element {

  comments.sort((a, b) => {
    const dateA = new Date(a.date).getTime();
    const dateB = new Date(b.date).getTime();

    return dateB - dateA;
  });

  return (
    <section className="property__reviews reviews">
      <h2 className="reviews__title">Reviews &middot; <span className="reviews__amount">{comments.length}</span></h2>
      <ul className="reviews__list">
        {
          comments.map((comment) => (
            <ReviewItem key={comment.id} commentObject={comment}/>
          ))
        }
      </ul>
      <ReviewForm />
    </section>
  );
}

export default ReviewList;
