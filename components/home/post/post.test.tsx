import { render } from "@testing-library/react";
import "@testing-library/jest-dom";
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
import { POST } from "@/app/api/group/posts/create/route";
import { PATCH } from "@/app/api/group/posts/comment/route";
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

describe("Post", () => {
  it("renders Post correctly and matches snapshot", () => {
    const stubData = {
      id: "post1",
      title: "Example Post Title",
      content: {
        time: 1719589689482,
        blocks: [
          {
            id: "i4DGxsAgdC",
            data: {
              text: "Please share with me where is the best lala soup",
            },
            type: "paragraph",
          },
        ],
        version: "2.29.1",
      }, // Assuming Prisma.JsonValue can be an object
      createdAt: new Date("2023-01-01T00:00:00.000Z"),
      updatedAt: new Date("2023-01-02T00:00:00.000Z"),
      authorId: "user1",
      groupId: "group1",
      author: {
        id: "user1",
        name: "John Doe",
        password: "hashed_password",
        signinType: true, // Assuming true or false represents the signinType
        bio: "This is a bio",
        email: "john.doe@example.com",
        emailVerified: new Date("2023-01-01T12:00:00.000Z"),
        imageUrl: "https://example.com/image.jpg",
        imagePublicId: "image1",
        isOnboard: true,
      },
      votes: [
        {
          userId: "user2",
          postId: "post1",
          type: VoteType.DOWNVOTE,
        },
        {
          userId: "user3",
          postId: "post1",
          type: VoteType.DOWNVOTE,
        },
      ],
    };
    const { asFragment } = render(
      <SessionProvider session={mockedSession}>
        <Post post={stubData} votesCount={1} groupName="1" commentCount={1} />
      </SessionProvider>,
    );

    expect(asFragment()).toMatchSnapshot();
  });

  it("renders PostVote correctly and matches snapshot", () => {
    const { asFragment } = render(
      <SessionProvider session={mockedSession}>
        <PostVote initVotesCount={1} postId="1" />
      </SessionProvider>,
    );

    expect(asFragment()).toMatchSnapshot();
  });
});

describe("create post", () => {
  it("cannot create post if not member", async () => {
    const mockPayload = {
      id: "post1",
      title: "Example Post Title",
      content: {
        time: 1719589689482,
        blocks: [
          {
            id: "i4DGxsAgdC",
            data: {
              text: "Please share with me where is the best lala soup",
            },
            type: "paragraph",
          },
        ],
        version: "2.29.1",
      },
      groupId: "group1",
      userId: "user1",
    }
    const { req } = createMocks({
      method: "POST",
      url: "localhost:3000/api/group/posts/create",
      body: mockPayload

    }) as any;
    const mockUser = {
      user: {
        email: "test@gmail.com",
      },
    };
    (getServerSession as jest.Mock).mockResolvedValueOnce(mockUser);
    req.json = jest.fn().mockResolvedValue(req.body);
    prismaMock.membership.findFirst.mockResolvedValueOnce(null);
    const res = await POST(req as any);
    expect(res.status).toBe(403);
  })
});

describe("create post", () => {
  it("can create post if  member", async () => {
    const mockPayload = {
      id: "post1",
      title: "Example Post Title",
      content: {
        time: 1719589689482,
        blocks: [
          {
            id: "i4DGxsAgdC",
            data: {
              text: "Please share with me where is the best lala soup",
            },
            type: "paragraph",
          },
        ],
        version: "2.29.1",
      },
      groupId: "group1",
      userId: "user1",
    }
    const { req } = createMocks({
      method: "POST",
      url: "localhost:3000/api/group/posts/create",
      body: mockPayload

    }) as any;
    const mockUser = {
      user: {
        email: "test@gmail.com",
      },
    };
    (getServerSession as jest.Mock).mockResolvedValueOnce(mockUser);
    req.json = jest.fn().mockResolvedValue(req.body);
    prismaMock.membership.findFirst.mockResolvedValueOnce({groupId: 'group1', userId: 'user1'});
    prismaMock.post.create.mockResolvedValueOnce(req.body);
    const res = await POST(req as any);
    expect(res.status).toBe(200);
  })
});

describe ('comment test', () => {
  const payload = {
    postId: "post1",
    content: "This is a comment",
    userId: "user1",
  }
  it('can post comment', async () => {
    const { req } = createMocks({
      method: "PATCH",
      url: "localhost:3000/api/group/posts/create",
      body: payload

    }) as any;
    const mockUser = {
      user: {
        email: "test@gmail.com",
      },
    };
    (getServerSession as jest.Mock).mockResolvedValueOnce(mockUser);
    req.json = jest.fn().mockResolvedValue(req.body);
    const res = await PATCH(req as any);
    expect(res.status).toBe(200);
  })
})
