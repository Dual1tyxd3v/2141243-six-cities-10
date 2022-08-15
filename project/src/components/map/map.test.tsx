import { render, screen } from '@testing-library/react';
import { makeFakeOffers } from '../../utils/mocks';
import Map from './map';

const mockOffers = makeFakeOffers();

describe('Component: Map', () => {
  it('should render correctly', () => {
    render(<Map offers={mockOffers}/>);

    expect(screen.getByTestId('mapContainer')).toBeInTheDocument();
  });
});
