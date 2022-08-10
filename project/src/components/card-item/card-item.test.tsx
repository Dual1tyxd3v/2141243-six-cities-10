import { configureMockStore } from '@jedmao/redux-mock-store';
import { render, screen } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import { Provider } from 'react-redux';
import { AuthorizationStatus } from '../../const';
import { makeFakeOffer } from '../../utils/mocks';
import HistoryRouter from '../history-route/history-route';
import CardItem from './card-item';

const mockStore = configureMockStore();
const history = createMemoryHistory();

describe('Component: CardItem', () => {
  it('should render correctly', () => {
    const mockOffer = makeFakeOffer();
    mockOffer.isFavorite = true;
    const store = mockStore({
      USER: {authorizationStatus: AuthorizationStatus.Auth},
    });

    render(
      <Provider store={store}>
        <HistoryRouter history={history}>
          <CardItem
            offer={mockOffer}
            classPrefix='mockClass'
            onActiveCard={jest.fn()}
          />
        </HistoryRouter>
      </Provider>
    );

    expect(screen.getByTestId('cardContainer').classList.contains('mockClass__card')).toBe(true);
    expect(screen.getByAltText(/Place/i)).toBeInTheDocument();
    expect(screen.getByRole('button')).toBeInTheDocument();
    expect(screen.getByRole('button').classList.contains('place-card__bookmark-button--active')).toBe(true);
  });
});
