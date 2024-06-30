import React from "react";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import SignUpForm from "./SignUpForm";
import "@testing-library/jest-dom/";
import { useRouter } from "next/navigation";
import CreateAccount from "@/lib/users/CreateAccount";
import { SessionProvider, signIn } from "next-auth/react";
import { Session } from "next-auth";
import * as nextAuthReact from "next-auth/react";
import { toast } from "@/components/common-ui/shadcn-ui/toast/use-toast";
let mockedSession: Session | null = null;
jest.mock("next/navigation", () => ({
  useRouter: jest.fn().mockReturnValue({
    push: jest.fn(),
  }),
}));
jest.mock("next-auth/next", () => ({
  getServerSession: jest.fn(() => Promise.resolve(mockedSession)),
}));


describe("SignUpForm", () => {
  test("snapshot matches", () => {
    (useRouter as jest.Mock).mockReturnValue({
      push: jest.fn(),
    });
    const { asFragment } = render(
      <SessionProvider session={mockedSession}>
        <SignUpForm />
      </SessionProvider>,
    );

    expect(asFragment()).toMatchSnapshot();
  });
});

describe("SignUpForm", () => {
  test("does not submit the form when the fields are empty", async () => {
    render(<SignUpForm />);

    // Simulate form submission without providing any input
    fireEvent.click(screen.getByRole("button", { name: "Create Account" }));

    //error messages expected
    await waitFor(() => {
      expect(screen.getByText("Email is required")).toBeInTheDocument();
      const passwordErrors = screen.getAllByText("At least 8 characters long");
      // eslint-disable-next-line testing-library/no-wait-for-multiple-assertions
      expect(passwordErrors).toHaveLength(2);
    });
  });
});

jest.mock("@/lib/users/CreateAccount", () => ({
  __esModule: true,
  default: jest.fn()
}));

describe("SignUpForm Create Account Test", () => {
  beforeAll(() => {
    let signInSpy: jest.SpyInstance;
    signInSpy = jest
      .spyOn(require("next-auth/react"), "signIn")
      .mockResolvedValueOnce(true);
  });

  beforeEach(() => {
    jest.clearAllMocks();
  });
  

  test("user can create a new account", async () => {
    const pushMock = jest.fn();
    (useRouter as jest.Mock).mockReturnValue({ push: pushMock });
    (CreateAccount as jest.Mock).mockImplementation(() => 'ok')
    render(
      <SessionProvider session={mockedSession}>
        <SignUpForm />
      </SessionProvider>,
    );

    // Fill the form
    fireEvent.change(screen.getByTestId(/email/i), {
      target: { value: "test@example.com" },
    });
    fireEvent.change(screen.getByTestId(/password/i), {
      target: { value: "password123" },
    });
    fireEvent.change(screen.getByTestId(/confirm/i), {
      target: { value: "password123" },
    });
    // Add more fields as necessary

    // Submit the form
    fireEvent.click(screen.getByRole("button", { name: /create account/i }));

    // Wait for CreateAccount to be called correctly
    await waitFor(() => {
      expect(CreateAccount).toHaveBeenCalledWith(
        expect.objectContaining({
          email: "test@example.com",
          password: "password123",
          // Add more fields as necessary
        }),
      );
    });

    // Wait for signIn to be called to log the user in
    await waitFor(() => {
      expect(signIn).toHaveBeenCalledWith(
        "credentials",
        expect.objectContaining({
          email: "test@example.com",
          password: "password123",
          callbackUrl: "/onboard",
        }),
      );
    });
    
  });



  test("user cannot create a new account due to duplicate email", async () => {
    (CreateAccount as jest.Mock).mockImplementation(() => 'not ok')
    const pushMock = jest.fn();
    (useRouter as jest.Mock).mockReturnValue({ push: pushMock });
   

    render(
      <SessionProvider session={mockedSession}>
        <SignUpForm />
      </SessionProvider>,
    );

    // Fill the form
    fireEvent.change(screen.getByTestId(/email/i), {
      target: { value: "test@example.com" },
    });
    fireEvent.change(screen.getByTestId(/password/i), {
      target: { value: "password123" },
    });
    fireEvent.change(screen.getByTestId(/confirm/i), {
      target: { value: "password123" },
    });
    // Add more fields as necessary

    // Submit the form
    fireEvent.click(screen.getByRole("button", { name: /create account/i }));

    // Wait for CreateAccount to be called correctly
    await waitFor(() => {
      expect(CreateAccount).toHaveBeenCalledWith(
        expect.objectContaining({
          email: "test@example.com",
          password: "password123",
          // Add more fields as necessary
        }),
      );
    });

  
    await waitFor(() => {
      expect(signIn).toHaveBeenCalledTimes(0);
    });

    
  });
});
