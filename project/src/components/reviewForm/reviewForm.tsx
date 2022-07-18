import { useState, ChangeEvent, FormEvent } from 'react';
import { ratingValue } from '../../const';

function ReviewForm(): JSX.Element {
  const [formData, setFormData] = useState({rating: '', review: ''});

  function onChangeHandler(evt: ChangeEvent<HTMLInputElement>) {
    const {value} = evt.target;
    setFormData({...formData, rating: value});
  }

  function onTextAreaChange(evt: ChangeEvent<HTMLTextAreaElement>) {
    const {value} = evt.target;
    setFormData({...formData, review: value});
  }

  function onSubmitHandler(evt: FormEvent) {
    evt.preventDefault();
  }

  return (
    <form className="reviews__form form" action="#" method="post" onSubmit={onSubmitHandler}>
      <label className="reviews__label form__label" htmlFor="review">Your review</label>
      <div className="reviews__rating-form form__rating">

        {ratingValue.map((star, i) => (
          <>
            <input className="form__rating-input visually-hidden" name="rating" value={i + 1} id={`${i + 1}-stars`} type="radio" onChange={onChangeHandler}/>
            <label htmlFor={`${i + 1}-stars`} className="reviews__rating-label form__rating-label" title={star}>
              <svg className="form__star-image" width="37" height="33">
                <use xlinkHref="#icon-star"></use>
              </svg>
            </label>
          </>
        )).reverse()}

      </div>
      <textarea className="reviews__textarea form__textarea" id="review" name="review" placeholder="Tell how was your stay, what you like and what can be improved" onChange={onTextAreaChange}></textarea>
      <div className="reviews__button-wrapper">
        <p className="reviews__help">
                      To submit review please make sure to set <span className="reviews__star">rating</span> and describe your stay with at least <b className="reviews__text-amount">50 characters</b>.
        </p>
        <button className="reviews__submit form__submit button" type="submit" disabled={(formData.review.length < 50)}>Submit</button>
      </div>
    </form>
  );
}

export default ReviewForm;
