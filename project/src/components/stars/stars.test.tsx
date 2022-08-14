import { render, screen } from '@testing-library/react';
import { RATING_VALUE } from '../../const';
import Stars from './stars';
import userEvent from '@testing-library/user-event';

describe('Component: Stars', () => {
  it('should render correctly', () => {
    render(
      <Stars
        id={2}
        value={RATING_VALUE[3]}
        onChangeStar={jest.fn()}
        rating={''}
      />
    );

    expect(screen.getByRole('radio')).toBeInTheDocument();
    expect(screen.getByRole('radio')).not.toBeChecked();
  });

  it('should call "onChangeStar" when user click on input', async () => {
    const onChangeStar = jest.fn();
    render(
      <Stars
        id={2}
        value={RATING_VALUE[3]}
        onChangeStar={onChangeStar}
        rating={''}
      />
    );

    await userEvent.click(screen.getByRole('radio'));

    expect(onChangeStar).toBeCalledTimes(1);
  });
});
