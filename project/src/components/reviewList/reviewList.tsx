import ReviewItem from '../reviewItem/reviewItem';
import ReviewForm from '../reviewForm/reviewForm';
import { Comments } from '../../types/offer';

type ReviewListProps = {
  comments: Comments
};

function ReviewList({comments}: ReviewListProps): JSX.Element {
  const commentsSorted = comments.slice().sort((a, b) => {
    const dateA = new Date(a.date).getTime();
    const dateB = new Date(b.date).getTime();

    return dateB - dateA;
  });

  commentsSorted.slice(0, 10);
  return (
    <section className="property__reviews reviews">
      <h2 className="reviews__title">Reviews &middot; <span className="reviews__amount">{commentsSorted.length}</span></h2>
      <ul className="reviews__list">
        {
          commentsSorted.map((comment) => (
            <ReviewItem key={comment.id} commentObject={comment}/>
          ))
        }
      </ul>
      <ReviewForm />
    </section>
  );
}

export default ReviewList;
