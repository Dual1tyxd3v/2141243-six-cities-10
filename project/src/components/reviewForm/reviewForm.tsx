import { useState, ChangeEvent, FormEvent, useCallback } from 'react';
import { useParams } from 'react-router-dom';
import { ratingValue } from '../../const';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { addCommentAction } from '../../store/api-actions';
import Stars from '../stars/stars';

function ReviewForm(): JSX.Element {
  const dispatch = useAppDispatch();
  const {postLoaded} = useAppSelector((state) => state);

  const params = useParams();
  const paramsId = Number(params.id);

  const [formData, setFormData] = useState({rating: '', review: ''});

  const memoChangeHandler = useCallback((evt: ChangeEvent<HTMLInputElement>) => {
    const {value} = evt.target;
    setFormData({...formData, rating: value});
  }, [formData]);

  function onTextAreaChange(evt: ChangeEvent<HTMLTextAreaElement>) {
    const {value} = evt.target;
    setFormData({...formData, review: value});
  }

  function onSubmitHandler(evt: FormEvent) {
    evt.preventDefault();

    dispatch(addCommentAction({
      comment: formData.review,
      rating: Number(formData.rating),
      id: paramsId,
    }));
  }

  return (
    <form
      className="reviews__form form"
      action="#" method="post"
      onSubmit={onSubmitHandler}
    >
      <label className="reviews__label form__label" htmlFor="review">Your review</label>
      <div className="reviews__rating-form form__rating">

        {
          ratingValue.map((star, i) => (
            <Stars key={star} id={i} value={star} onChangeStar={memoChangeHandler} />
          )).reverse()
        }

      </div>
      <textarea
        className="reviews__textarea form__textarea"
        id="review" name="review"
        placeholder="Tell how was your stay, what you like and what can be improved"
        onChange={onTextAreaChange}
        disabled={postLoaded}
        value={formData.review}
      >
      </textarea>
      <div className="reviews__button-wrapper">
        <p className="reviews__help">
                      To submit review please make sure to set <span className="reviews__star">rating</span> and describe your stay with at least <b className="reviews__text-amount">50 characters</b>.
        </p>
        <button className="reviews__submit form__submit button" type="submit" disabled={(postLoaded || formData.rating.length === 0 || formData.review.length < 50 )}>Submit</button>
      </div>
    </form>
  );
}

export default ReviewForm;
