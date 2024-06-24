import React from "react";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import LoginForm from "./LoginForm";
import "@testing-library/jest-dom/";
import { useRouter } from "next/navigation";
import { SessionProvider, signIn } from "next-auth/react";

jest.mock("next/navigation", () => ({
  useRouter: jest.fn(),
}));

describe("LoginForm", () => {
  test("renders LoginForm component", async () => {
    (useRouter as jest.Mock).mockReturnValue({
      push: jest.fn(),
    });
    render(
      <SessionProvider
        session={{
          expires: "2022-12-31T23:59:59Z",
          user: {
            name: "John Doe",
            email: "johndoe@gmail.com",
            id: "1",
          },
        }}
      >
        <LoginForm />
      </SessionProvider>,
    );

    expect(screen.getByText("Login to your account")).toBeInTheDocument();
    expect(
      screen.getByRole("link", { name: "Sign up now" }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("link", { name: "Forgot your Password?" }),
    ).toBeInTheDocument();
    const signInWithGoogleButton = screen.getByTestId("Sign In with Google");
    expect(signInWithGoogleButton).toBeInTheDocument();
    expect(screen.getByTestId("Sign In")).toBeInTheDocument();
    expect(screen.getByTestId("email")).toBeInTheDocument();
    expect(screen.getByTestId("password")).toBeInTheDocument();
  });
});

describe("Login Form", () => {
  test("allows user to log in successfully", async () => {

    
    render(
      <SessionProvider
        session={{
          expires: "2022-12-31T23:59:59Z",
          user: {
            name: "John Doe",
            email: "johndoe@gmail.com",
            id: "1",
          },
        }}
      >
        <LoginForm />
      </SessionProvider>,
    );

    // Simulate form submission without providing any input
    fireEvent.click(screen.getByRole("button", { name: "Sign In" }));

    //error messages expected
    await waitFor(() => {
      expect(screen.getByText("Email is required")).toBeInTheDocument();
      // eslint-disable-next-line testing-library/no-wait-for-multiple-assertions
      expect(
        screen.getByText("At least 8 characters long"),
      ).toBeInTheDocument();
    });
  });
});

describe("Login Form", () => {
  test("displays error message when given empty fields", async () => {
    render(
      <SessionProvider
        session={{
          expires: "2022-12-31T23:59:59Z",
          user: {
            name: "John Doe",
            email: "johndoe@gmail.com",
            id: "1",
          },
        }}
      >
        <LoginForm />
      </SessionProvider>,
    );


    fireEvent.change(screen.getByTestId("email"), {target: {value: 'johndoe@gmail.com'}})
    fireEvent.change(screen.getByTestId('password'), { target: { value: 'password' } });
    // Simulate form submission without providing any input
    fireEvent.click(screen.getByRole("button", { name: "Sign In" }));

    
  
  });
});
