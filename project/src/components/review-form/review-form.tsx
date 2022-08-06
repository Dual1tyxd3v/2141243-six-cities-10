import { useState, ChangeEvent, FormEvent, useCallback, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { MAX_REVIEW_SYMBOLS, MIN_REVIEW_SYMBOLS, RATING_VALUE } from '../../const';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { addCommentAction } from '../../store/api-actions';
import { getCommentPostStatus, getPostLoadedStatus } from '../../store/data-process/selectors';
import Stars from '../stars/stars';

function ReviewForm(): JSX.Element {
  const dispatch = useAppDispatch();
  const postLoaded = useAppSelector(getPostLoadedStatus);
  const commentPostStatus = useAppSelector(getCommentPostStatus);

  const params = useParams();
  const paramsId = Number(params.id);

  const [formData, setFormData] = useState({rating: '', review: ''});

  const changeHandler = useCallback((evt: ChangeEvent<HTMLInputElement>) => {
    const {value} = evt.target;
    setFormData({...formData, rating: value});
  }, [formData]);

  function onTextAreaChange(evt: ChangeEvent<HTMLTextAreaElement>) {
    const {value} = evt.target;
    setFormData({...formData, review: value});
  }

  useEffect(() => {
    commentPostStatus && setFormData({rating: '', review: ''});
  },[commentPostStatus]);

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
          RATING_VALUE.map((star, i) => (
            <Stars key={star} id={i} value={star} rating={formData.rating} onChangeStar={changeHandler} />
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
        maxLength={MAX_REVIEW_SYMBOLS}
      >
      </textarea>
      <div className="reviews__button-wrapper">
        <p className="reviews__help">
                      To submit review please make sure to set <span className="reviews__star">rating</span> and describe your stay with at least <b className="reviews__text-amount">50 characters</b>.
        </p>
        <button
          className="reviews__submit form__submit button"
          type="submit"
          disabled={(postLoaded || formData.rating.length === 0 || formData.review.length < MIN_REVIEW_SYMBOLS)}
        >
          Submit
        </button>
      </div>
    </form>
  );
}

export default ReviewForm;
