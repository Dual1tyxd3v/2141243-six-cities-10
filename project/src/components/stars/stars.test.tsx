import { render, screen } from '@testing-library/react';
import { RATING_VALUE } from '../../const';
import Stars from './stars';

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
});
