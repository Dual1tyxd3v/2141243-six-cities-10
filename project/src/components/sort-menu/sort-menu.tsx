import { useAppSelector, useAppDispatch } from '../../hooks';
import { sortMenuTabs } from '../../const';
import { changeSortBy } from '../../store/app-process/app-process';
import { getSortMethod } from '../../store/app-process/selectors';

type SortMenuProps = {
  onCloseMenu: () => void;
}

function SortMenu({onCloseMenu}: SortMenuProps): JSX.Element {
  const sortBy = useAppSelector(getSortMethod);
  const dispatch = useAppDispatch();

  const onSortChangeHandler = (sortTab: string): void => {
    dispatch(changeSortBy(sortTab));
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
