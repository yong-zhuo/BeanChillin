/**
 * @jest-environment node
 */

import { Session } from 'next-auth';
import { prismaMock } from "../../__mocks__/prisma";
import { createMocks } from 'node-mocks-http'; // Import the necessary module
import { getServerSession } from 'next-auth';
import { DetailedPost } from '@/types/post';
import { GET } from '@/app/api/posts/route';

let mockedSession: Session | null = null;

// Mock any necessary modules or hooks here
jest.mock("next-auth/next", () => ({
    getServerSession: jest.fn(() => Promise.resolve(mockedSession)),
}));

describe('GET /api/posts', () => {
    afterEach(() => {
        jest.clearAllMocks();
    });

    it('should fetch posts successfully', async () => {
        const { req, res } = createMocks({
            method: 'GET',
            url: 'localhost:3000/api/post?limit=1&offset=0&groupName=test',
            query: {
                limit: '1',
                offset: '0',
                feedType: 'group',
                groupName: 'test'
            }
        }) as any;

        const mockUser = {
            user: {
                email: 'test@gmail.com'
            }
        };

        (getServerSession as jest.Mock).mockResolvedValueOnce(mockUser);

        prismaMock.user.findUnique.mockResolvedValueOnce({
            id: 'author1',
            name: null,
            password: '',
            signinType: false,
            bio: null,
            email: 'test@gmail.com',
            emailVerified: null,
            imageUrl: null,
            imagePublicId: null,
            isOnboard: false
        });

        prismaMock.membership.findMany.mockResolvedValueOnce([{
            userId: 'author1',
            groupId: 'test',
        }]);

        prismaMock.post.findMany.mockResolvedValueOnce([{
            id: 'post1',
            title: 'Test Post',
            content: {
                "time": 1718885511672,
                "blocks": [
                    {
                        "id": "-dZHtFzaye",
                        "data": {
                            "file": {
                                "url": "https://res.cloudinary.com/beanchillin/image/upload/v1718885507/post_image/cqs0oqezdzlb8wuplsqf.jpg"
                            },
                            "caption": "",
                            "stretched": false,
                            "withBorder": false,
                            "withBackground": false
                        },
                        "type": "image"
                    }
                ],
                "version": "2.29.1"
            },
            createdAt: new Date(),
            updatedAt: new Date(),
            authorId: 'author1',
            groupId: 'test',
        }]);

        const result = await GET(req);
        expect(result.status).toBe(200);

        const responseData = await result.json() as DetailedPost[];
        expect(responseData).toEqual([
            {
                id: 'post1',
                title: 'Test Post',
                content: {
                    "time": 1718885511672,
                    "blocks": [
                        {
                            "id": "-dZHtFzaye",
                            "data": {
                                "file": {
                                    "url": "https://res.cloudinary.com/beanchillin/image/upload/v1718885507/post_image/cqs0oqezdzlb8wuplsqf.jpg"
                                },
                                "caption": "",
                                "stretched": false,
                                "withBorder": false,
                                "withBackground": false
                            },
                            "type": "image"
                        }
                    ],
                    "version": "2.29.1"
                },
                createdAt: expect.any(String),
                updatedAt: expect.any(String),
                authorId: 'author1',
                groupId: 'test',
            }
        ]);
    });
});

