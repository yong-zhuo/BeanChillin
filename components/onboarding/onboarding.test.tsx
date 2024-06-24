import { render } from '@testing-library/react';
import '@testing-library/jest-dom';
import OnboardingApp from './OnboardingApp'; // Adjust the import path as necessary
import { SessionProvider } from 'next-auth/react';

// Mock any necessary modules or hooks here
jest.mock('next-auth/react', () => ({
  useSession: jest.fn().mockReturnValue({ data: { user: { name: 'Test User' } }, status: 'authenticated' }),
}));
jest.mock('next/router', () => ({
  useRouter: jest.fn().mockReturnValue({
    push: jest.fn(),
  }),
}));

describe('OnboardingApp', () => {
  it('renders correctly and matches snapshot', () => {
    const { asFragment } = render(
      <SessionProvider session={null}>
        <OnboardingApp />
      </SessionProvider>
    );
    expect(asFragment()).toMatchSnapshot();
  });
});