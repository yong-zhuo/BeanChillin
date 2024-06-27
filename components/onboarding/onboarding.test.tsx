import { render } from '@testing-library/react';
import '@testing-library/jest-dom';
import OnboardingApp from './OnboardingApp'; // Adjust the import path as necessary
import { SessionProvider } from 'next-auth/react';
import { Session } from 'next-auth';
import OnboardRoute from '@/app/(onboarding)/onboard/page';

let mockedSession: Session | null = null;


// Mock any necessary modules or hooks here
jest.mock("next-auth/next", () => ({
  getServerSession: jest.fn(() => Promise.resolve(mockedSession)),
}));
jest.mock('next/navigation', () => ({
  useRouter: jest.fn().mockReturnValue({
    push: jest.fn(),
  }),
}));

describe('OnboardingApp', () => {
  it('renders correctly and matches snapshot', () => {
    const { asFragment } = render(
      <SessionProvider session={mockedSession}>
        <OnboardingApp />
      </SessionProvider>
    );

    expect(asFragment()).toMatchSnapshot();
    
  });
});