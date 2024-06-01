import React from 'react';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import LoginForm from './LoginForm'; 
import "@testing-library/jest-dom/";
import { useRouter } from 'next/navigation';
import { SessionProvider, signIn } from 'next-auth/react';

jest.mock('next/navigation', () => ({
    useRouter: jest.fn(),
  }));


  describe('LoginForm', () => {
    test('renders LoginForm component', async () => {
    (useRouter as jest.Mock).mockReturnValue({
            push: jest.fn(),
        });
    render(<SessionProvider session={{ expires: '2022-12-31T23:59:59Z' }}>
        <LoginForm />
    </SessionProvider>);
    

    expect(screen.getByText('Login to your account')).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'Sign up now' })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'Forgot your Password?' })).toBeInTheDocument();
    const signInWithGoogleButton = await screen.getByTestId('Sign In with Google');
    expect(signInWithGoogleButton).toBeInTheDocument();
    expect(screen.getByTestId('Sign In')).toBeInTheDocument();
    expect(screen.getByTestId('email')).toBeInTheDocument();
    expect(screen.getByTestId('password')).toBeInTheDocument();
    });
  });

  describe('Login Form', () => {
    test('displays error message when given empty fields', async () => {
      render(<SessionProvider session={{ expires: '2022-12-31T23:59:59Z' }}>
      <LoginForm />
  </SessionProvider>);
  
      // Simulate form submission without providing any input
      fireEvent.click(screen.getByRole('button', { name: 'Sign In' }));
  
      //error messages expected
      await waitFor(() => {
        expect(screen.getByText('Email is required')).toBeInTheDocument();
        expect(screen.getByText('At least 8 characters long')).toBeInTheDocument();
        
      });
     
    });
  });