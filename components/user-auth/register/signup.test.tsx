import React from 'react';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import SignUpForm from './SignUpForm';
import "@testing-library/jest-dom/";
import { useRouter } from 'next/navigation';
import CreateAccount from '@/lib/users/CreateAccount';
import { SessionProvider, signIn } from 'next-auth/react';
import { Session } from 'next-auth';
import * as nextAuthReact from 'next-auth/react';
let mockedSession: Session | null = null;
jest.mock('next/navigation', () => ({
  useRouter: jest.fn().mockReturnValue({
    push: jest.fn(),
  }),
}));
jest.mock("next-auth/next", () => ({
  getServerSession: jest.fn(() => Promise.resolve(mockedSession)),
}));




describe('SignUpForm', () => {
  test('snapshot matches', () => {
    (useRouter as jest.Mock).mockReturnValue({
      push: jest.fn(),
    });
    const { asFragment } = render(
      <SessionProvider
        session={mockedSession}
      >
        <SignUpForm/>
      </SessionProvider>,
    );

    expect(asFragment()).toMatchSnapshot();
    
  });
});




describe('SignUpForm', () => {
  test('does not submit the form when the fields are empty', async () => {
    render(<SignUpForm />);

    // Simulate form submission without providing any input
    fireEvent.click(screen.getByRole('button', { name: 'Create Account' }));

    //error messages expected
    await waitFor(() => {
      expect(screen.getByText('Email is required')).toBeInTheDocument();
      const passwordErrors = screen.getAllByText('At least 8 characters long');
      // eslint-disable-next-line testing-library/no-wait-for-multiple-assertions
      expect(passwordErrors).toHaveLength(2);
    });

  });
});