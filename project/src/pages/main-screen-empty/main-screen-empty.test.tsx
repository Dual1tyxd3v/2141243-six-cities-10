import { render, screen } from '@testing-library/react';
import { CITIES } from '../../const';
import MainScreenEmpty from './main-screen-empty';

describe('Component: MainScreenEmpty', () => {
  it('should render correctly', () => {
    render(<MainScreenEmpty city={CITIES.Amsterdam} />);

    expect(screen.getByText(/No places to stay available/i)).toBeInTheDocument();
  });

  it('should rerender if props changed', () => {
    const {rerender} = render(<MainScreenEmpty city={CITIES.Amsterdam} />);

    expect(screen.getByText(new RegExp(`We could not find any property available at the moment in ${CITIES.Amsterdam}`))).toBeInTheDocument();

    rerender(<MainScreenEmpty city={CITIES.Hamburg}/>);

    expect(screen.queryByText(/amsterdam/i)).not.toBeInTheDocument();
    expect(screen.getByText(new RegExp(`We could not find any property available at the moment in ${CITIES.Hamburg}`))).toBeInTheDocument();
  });
});
