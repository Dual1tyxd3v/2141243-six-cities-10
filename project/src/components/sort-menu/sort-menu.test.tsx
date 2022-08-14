import { configureMockStore } from '@jedmao/redux-mock-store';
import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { sortMenuTabs } from '../../const';
import SortMenu from './sort-menu';
import userEvent from '@testing-library/user-event';

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

  it('should change sort method to "rated" when user click tab', async () => {
    const onCloseMenu = jest.fn();
    const store = mockStore({
      APP: {sortBy: sortMenuTabs.Popular}
    });

    render(
      <Provider store={store}>
        <SortMenu onCloseMenu={onCloseMenu}/>
      </Provider>
    );

    expect(store.getActions().length).toBe(0);

    await userEvent.click(screen.getByText(sortMenuTabs.Rated));

    expect(store.getActions().length).toBe(1);
    expect(store.getActions()[0].type).toBe('APP/changeSortBy');
    expect(store.getActions()[0].payload).toBe(sortMenuTabs.Rated);
    expect(onCloseMenu).toBeCalledTimes(1);
  });
});
