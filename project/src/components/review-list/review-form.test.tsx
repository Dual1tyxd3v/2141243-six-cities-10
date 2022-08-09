import { configureMockStore } from '@jedmao/redux-mock-store';
import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { AuthorizationStatus, MAX_COMMENTS_TO_VIEW } from '../../const';
import { makeFakeComments } from '../../utils/mocks';
import ReviewList from './review-list';

const mockStore = configureMockStore();

describe('Component: ReviewForm', () => {
  it('should render correctly', () => {
    const mockTenComments = makeFakeComments().slice(0, MAX_COMMENTS_TO_VIEW);
    const store = mockStore({
      USER: {authorizationStatus: AuthorizationStatus.NoAuth}
    });

    render(
      <Provider store={store}>
        <ReviewList comments={mockTenComments}/>
      </Provider>
    );

    expect(screen.getByText(/Reviews/i)).toBeInTheDocument();
    expect(screen.getByText(mockTenComments.length)).toBeInTheDocument();
    expect(screen.getAllByText(mockTenComments[0].comment).length > 0).toBe(true);
    expect(screen.getAllByTestId('commentItem').length === 10).toBe(true);
  });

  it('should render correctly if "comments.length = 0"', () => {
    const store = mockStore({
      USER: {authorizationStatus: AuthorizationStatus.NoAuth}
    });

    render(
      <Provider store={store}>
        <ReviewList comments={[]}/>
      </Provider>
    );

    expect(screen.getByTestId('commentsCount').textContent === '0').toBe(true);
    expect(screen.queryByTestId('commentItem')).not.toBeInTheDocument();
  });
});
