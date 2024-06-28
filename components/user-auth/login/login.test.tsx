/* eslint-disable testing-library/no-wait-for-side-effects */
import React from "react";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import LoginForm from "./LoginForm";
import "@testing-library/jest-dom/";
import { useRouter } from "next/navigation";
import { SessionProvider, signIn } from "next-auth/react";
import { Session } from "next-auth";

let mockedSession: Session | null = null;

jest.mock("next/navigation", () => ({
  useRouter: jest.fn().mockReturnValue({
    push: jest.fn(),
  }),
}));
jest.mock("next-auth/next", () => ({
  getServerSession: jest.fn(() => Promise.resolve(mockedSession)),
}));

describe("LoginForm", () => {
  test("snapshot matches", async () => {
    (useRouter as jest.Mock).mockReturnValue({
      push: jest.fn(),
    });
    const { asFragment } = render(
      <SessionProvider session={mockedSession}>
        <LoginForm />
      </SessionProvider>,
    );
    expect(asFragment()).toMatchSnapshot();
  });
});



describe("Login Form", () => {
  test("displays error message when given empty fields", async () => {
    render(
      <SessionProvider session={mockedSession}>
        <LoginForm />
      </SessionProvider>,
    );


    // Simulate form submission without providing any input
    fireEvent.click(screen.getByRole("button", { name: "Sign In" }));

    //error messages expected
    await waitFor(() => {
      expect(screen.getByText('Email is required')).toBeInTheDocument();
      const passwordErrors = screen.getAllByText('At least 8 characters long');
      // eslint-disable-next-line testing-library/no-wait-for-multiple-assertions
      expect(passwordErrors).toHaveLength(1);
    });
  });
});

describe("Login Form", () => {
  let signInSpy: jest.SpyInstance;

  beforeAll(() => {
    signInSpy = jest.spyOn(require('next-auth/react'), 'signIn').mockResolvedValueOnce(true);
  });
  test("Integration testing for login form", async () => {
    render(
      <SessionProvider session={mockedSession}>
        <LoginForm />
      </SessionProvider>,
    );

    fireEvent.change(screen.getByTestId('email'), { target: { value: 'test@example.com' } });
    fireEvent.change(screen.getByTestId('password'), { target: { value: 'password123' } });

    fireEvent.click(screen.getByRole('button', { name: 'Sign In' }));
    await waitFor(() => expect(signInSpy).toHaveBeenCalledTimes(1));
  });
});

