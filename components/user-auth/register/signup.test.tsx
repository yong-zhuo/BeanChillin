import React from 'react';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import SignUpForm from './SignUpForm'; 
import "@testing-library/jest-dom/";
import { useRouter } from 'next/navigation';
import CreateAccount from '@/lib/users/CreateAccount';
import { signIn } from 'next-auth/react';

jest.mock('next/navigation', () => ({
    useRouter: jest.fn(),
  }));


describe('SignUpForm', () => {
  test('renders SignUpForm component', () => {
    (useRouter as jest.Mock).mockReturnValue({
        push: jest.fn(),
      });
    render(<SignUpForm />);
    
  
    expect(screen.getByText('Create an account')).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'Login Now' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Create Account' })).toBeInTheDocument();
    expect(screen.getByTestId('email')).toBeInTheDocument();
    expect(screen.getByTestId('password')).toBeInTheDocument();
    expect(screen.getByTestId('confirm')).toBeInTheDocument();
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
      expect(passwordErrors).toHaveLength(2);
    });
   
  });
});