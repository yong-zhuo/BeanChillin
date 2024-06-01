import { render, fireEvent, screen, waitFor } from '@testing-library/react';
import OnboardingApp from './OnboardingApp';

describe('OnboardingApp', () => {
  test('shows the next form when the Next button is clicked', () => {
    render(<OnboardingApp />);

    // Assume that the Next button has the text 'Next'
    const nextButton = screen.getByRole('button', { name: 'Next' });

    // Assume that the first form has a field with the label 'First Name'
    expect(screen.getByLabelText('First Name')).toBeInTheDocument();

    // Simulate a click event
    fireEvent.click(nextButton);

    // Assume that the second form has a field with the label 'Bio'
    // Use waitFor because the form change might not happen immediately
    waitFor(() => {
      expect(screen.getByLabelText('Bio')).toBeInTheDocument();
    });
  });
});