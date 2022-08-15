import { configureMockStore, MockStore } from '@jedmao/redux-mock-store';
import { render, screen } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import { Provider } from 'react-redux';
import HistoryRouter from '../history-route/history-route';
import ReviewForm from './review-form';
import userEvent from '@testing-library/user-event';
import { makeFakeText } from '../../utils/mocks';
import thunk from 'redux-thunk';
import { MAX_REVIEW_SYMBOLS } from '../../const';

const middlewares = [thunk];
const history = createMemoryHistory();
const mockStore = configureMockStore(middlewares);
let store: MockStore;

describe('Component: ReviewForm', () => {
  beforeEach(() => {
    store = mockStore({
      DATA: {isPostLoaded: false, isCommentLoaded: false}
    });
  });
  it('should render correctly', async () => {
    render(
      <Provider store={store}>
        <HistoryRouter history={history}>
          <ReviewForm />
        </HistoryRouter>
      </Provider>
    );

    expect(screen.getByText(/Your review/i)).toBeInTheDocument();
    expect(screen.getAllByRole('radio').length).toBe(5);
    expect(screen.getByRole('textbox')).toBeInTheDocument();
    expect(screen.getByText(/To submit review please make sure to set/i)).toBeInTheDocument();
    expect(screen.getByRole('button')).toBeInTheDocument();
    expect(screen.getByRole('button').textContent).toBe('Submit');

    await userEvent.type(screen.getByRole('textbox'), 'mock string');
    await userEvent.click(screen.getAllByRole('radio')[0]);

    expect(screen.getByRole('button')).toBeDisabled();
    expect(screen.getByDisplayValue(/mock string/i)).toBeInTheDocument();
    expect(screen.getAllByRole('radio')[0]).toBeChecked();
  });

  it('should call "addComment" when user submit form with correct data', async () => {
    const mockText = makeFakeText().slice(0, MAX_REVIEW_SYMBOLS);

    render(
      <Provider store={store}>
        <HistoryRouter history={history}>
          <ReviewForm />
        </HistoryRouter>
      </Provider>
    );

    expect(store.getActions().length).toBe(0);

    await userEvent.type(screen.getByRole('textbox'), mockText);
    await userEvent.click(screen.getAllByRole('radio')[0]);
    await userEvent.click(screen.getByRole('button'));

    expect(store.getActions()[0].type).toBe('DATA/addComment/pending');
    expect(store.getActions()[0].meta.arg.comment).toBe(mockText);
  }, 15000);

  it('should not call "addComment" when user submit form with incorrect data', async () => {
    render(
      <Provider store={store}>
        <HistoryRouter history={history}>
          <ReviewForm />
        </HistoryRouter>
      </Provider>
    );

    expect(store.getActions().length).toBe(0);

    await userEvent.type(screen.getByRole('textbox'), 'text');
    await userEvent.click(screen.getByRole('button'));

    expect(store.getActions().length).toBe(0);
  });
});
