import React from "react";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom/";
import { useRouter } from "next/navigation";
import CreateAccount from "@/lib/users/CreateAccount";
import { SessionProvider, signIn } from "next-auth/react";
import { Session } from "next-auth";
import Page from "@/app/(main)/groups/[slug]/page";
import CreateGroupModal from "./CreateGroupModal";
import MembershipButton from "./MembershipButton";
import GroupPage from "@/app/(main)/groups/page";
import GroupPreview from "./GroupPreview";
import { groupCloudUpload } from "@/lib/cloudinary/CloudinaryUpload";
let mockedSession: Session | null = null;
jest.mock("next/navigation", () => ({
  useRouter: jest.fn().mockReturnValue({
    push: jest.fn(),
  }),
}));
jest.mock("next-auth/next", () => ({
  getServerSession: jest.fn(() => Promise.resolve(mockedSession)),
}));

jest.mock("@/lib/cloudinary/CloudinaryUpload", () => ({
  __esModule: true,
  groupCloudUpload: jest.fn(),
}));

describe("group test", () => {
  test("test if user can create group", async () => {
    render(
      <SessionProvider
        session={{
          user: { id: "1", name: "test", email: "example@example.com" },
          expires: new Date().toISOString(),
        }}
      >
        <CreateGroupModal />
      </SessionProvider>,
    );
  });
});
