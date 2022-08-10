import { configureMockStore } from '@jedmao/redux-mock-store';
import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import ErrorMessage from './error-message';

const mockStore = configureMockStore();

describe('Component: ErrorMessage', () => {
  it('should render correctly when error is not null', () => {
    const mockError = 'some error';
    const store = mockStore({
      APP: {error: mockError}
    });

    render(
      <Provider store={store}>
        <ErrorMessage />
      </Provider>
    );

    expect(screen.getByText(mockError)).toBeInTheDocument();
    expect(screen.getByTestId('errorBlock')).toBeInTheDocument();
  });

  it('should render correctly when error is null', () => {
    const store = mockStore({
      APP: {error: null}
    });

    render(
      <Provider store={store}>
        <ErrorMessage />
      </Provider>
    );

    expect(screen.queryByTestId('errorBlock')).not.toBeInTheDocument();
  });
});
