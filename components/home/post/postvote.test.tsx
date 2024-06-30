import { render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import { SessionProvider } from "next-auth/react";
import { Session, getServerSession } from "next-auth";
import OnboardRoute from "@/app/(onboarding)/onboard/page";
import page from "@/app/(main)/groups/[slug]/post/[postId]/page";
import Page from "@/app/(main)/groups/[slug]/page";
import Post from "./Post";
import PostFeed from "./PostFeed";
import PostVote from "../post-vote/PostVote";
import { VoteType } from "@prisma/client";
import { createMocks } from "node-mocks-http";
import { group } from "console";
import { prismaMock } from "@/__mocks__/prisma";
import { PATCH } from "@/app/api/group/posts/vote/route";
import IsOnboard from "@/lib/users/IsOnboard";

let mockedSession: Session | null = null;

// Mock any necessary modules or hooks here
jest.mock("next-auth/next", () => ({
  getServerSession: jest.fn(() => Promise.resolve(mockedSession)),
}));
jest.mock("next/navigation", () => ({
  useRouter: jest.fn().mockReturnValue({
    push: jest.fn(),
  }),
}));

describe("voting post", () => {
  it("able to vote for post", async () => {
    const { req } = createMocks({
      method: "PATCH",
      url: "localhost:3000/api/group/posts/create",
      body: { voteType: VoteType.UPVOTE, postId: "test1", userId: "test1" },
    }) as any;

    const mockUser = {
      user: {
        email: "test@gmail.com",
      },
    };

    (getServerSession as jest.Mock).mockResolvedValueOnce(mockUser);
    req.json = jest.fn().mockResolvedValue(req.body);
    await prismaMock.vote.findFirst.mockResolvedValueOnce(null);
    const mockPost = {
      id: "test1",
      title: "Sample Post Title",
      content: {}, // Assuming JsonValue can be an empty object. Adjust according to your needs.
      createdAt: new Date(),
      updatedAt: new Date(),
      authorId: "test1",
      groupId: "sampleGroupId",
      author: {
        id: "test1",
        name: "test",
        email: "test@gmail.com",
        signInType: true,
        isOnboard: true,
        password: "test",
        bio: "lol",
        emailVerified: null,
        imageUrl: null,
        imagePublicId: null,
      },
      votes: [],
    };
    prismaMock.post.findUnique.mockResolvedValueOnce(mockPost);

    const res = await PATCH(req as any);
    expect(res.status).toBe(200);
  });
});

describe("Integration testing for voting post", () => {
  it("able to vote for post", async () => {
    const { req } = createMocks({
      method: "PATCH",
      url: "localhost:3000/api/group/posts/create",
      body: { voteType: VoteType.UPVOTE, postId: "test1", userId: "test1" },
    }) as any;

    const mockUser = {
      user: {
        email: "test@gmail.com",
      },
    };

    (getServerSession as jest.Mock).mockResolvedValueOnce(mockUser);
    req.json = jest.fn().mockResolvedValue(req.body);
    await prismaMock.vote.findFirst.mockResolvedValueOnce(null);
    const mockPost = {
      id: "test1",
      title: "Sample Post Title",
      content: {}, // Assuming JsonValue can be an empty object. Adjust according to your needs.
      createdAt: new Date(),
      updatedAt: new Date(),
      authorId: "test1",
      groupId: "sampleGroupId",
      author: {
        id: "test1",
        name: "test",
        email: "test@gmail.com",
        signInType: true,
        isOnboard: true,
        password: "test",
        bio: "lol",
        emailVerified: null,
        imageUrl: null,
        imagePublicId: null,
      },
      votes: [],
    };
    prismaMock.post.findUnique.mockResolvedValueOnce(mockPost);

    const res = await PATCH(req as any);
    expect(res.status).toBe(200);
    render(<PostVote postId={""} initVotesCount={0} />)
    expect(screen.getByText('0')).toBeInTheDocument();
  });
});

