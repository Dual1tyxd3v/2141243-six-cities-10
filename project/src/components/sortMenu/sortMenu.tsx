import { useAppSelector, useAppDispatch } from '../../hooks';
import { sortMenuTabs } from '../../const';
import { changeSortBy } from '../../store/action';

type SortMenuProps = {
  onCloseMenu: () => void;
}

function SortMenu({onCloseMenu}: SortMenuProps): JSX.Element {
  const {sortBy} = useAppSelector((state) => state.OTHER);
  const dispatch = useAppDispatch();

  const onSortChangeHandler = (sortTab: string) => {
    dispatch(changeSortBy({sortBy: sortTab}));
    onCloseMenu();
  };

  return (
    <ul className="places__options places__options--custom places__options--opened">
      {
        Object.values(sortMenuTabs).map((sortTab) => (
          <li
            key={sortTab}
            className={`places__option ${sortTab === sortBy ? 'places__option--active' : ''}`}
            tabIndex={0}
            onClick={() => onSortChangeHandler(sortTab)}
          >
            {sortTab}
          </li>
        ))
      }
    </ul>
  );
}

export default SortMenu;
