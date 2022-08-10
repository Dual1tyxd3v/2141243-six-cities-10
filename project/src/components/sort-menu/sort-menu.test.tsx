import { configureMockStore } from '@jedmao/redux-mock-store';
import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { sortMenuTabs } from '../../const';
import SortMenu from './sort-menu';

const mockStore = configureMockStore();

describe('Component: SortMenu', () => {
  it('should render correctly', () => {
    const store = mockStore({
      APP: {sortBy: sortMenuTabs.Popular}
    });

    render(
      <Provider store={store}>
        <SortMenu onCloseMenu={jest.fn()}/>
      </Provider>
    );

    expect(screen.getByText(sortMenuTabs.Popular)).toBeInTheDocument();
  });
});
