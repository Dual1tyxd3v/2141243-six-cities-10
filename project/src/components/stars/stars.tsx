import {ChangeEvent} from 'react';

type StarsProps = {
  id: number;
  value: string;
  onChangeStar: (evt: ChangeEvent<HTMLInputElement>) => void;
  rating: string;
}

function Stars({id, value, onChangeStar, rating}: StarsProps): JSX.Element {
  return (
    <>
      <input
        className="form__rating-input visually-hidden"
        name="rating"
        value={id + 1}
        id={`${id + 1}-stars`}
        type="radio"
        onChange={onChangeStar}
        checked={(id + 1) === Number(rating)}
      />
      <label htmlFor={`${id + 1}-stars`} className="reviews__rating-label form__rating-label" title={value}>
        <svg className="form__star-image" width="37" height="33">
          <use xlinkHref="#icon-star"></use>
        </svg>
      </label>
    </>
  );
}

export default Stars;
