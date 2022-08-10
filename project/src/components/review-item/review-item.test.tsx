import { render, screen } from '@testing-library/react';
import { makeFakeComment } from '../../utils/mocks';
import ReviewItem from './review-item';

const mockComment = makeFakeComment();

describe('Component: ReviewItem', () => {
  it('should render correctly', () => {
    render(<ReviewItem commentObject={mockComment}/>);

    expect(screen.getByAltText(/Reviews avatar/i)).toBeInTheDocument();
    expect(screen.getByText(mockComment.comment)).toBeInTheDocument();
  });
});
