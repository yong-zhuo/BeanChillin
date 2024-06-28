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