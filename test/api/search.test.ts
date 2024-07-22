
import { createMocks } from "node-mocks-http";
import { prismaMock } from "../../__mocks__/prisma";
import { GET } from "@/app/api/search/route";

describe('GET request to search API', () => {
    beforeEach(() => {
        jest.clearAllMocks(); // Clear mocks before each test
    });

    it('returns groups and users matching query parameter', async () => {

        const { req } = createMocks({
            method: 'GET',
            url: 'localhost:3000/api/search?p=test',
        }) as any;

        const mockDate = new Date('2024-06-28T12:06:20.494Z');
        const mockGroupData = {
            id: 'test1',
            name: 'John Doe',
            createdAt: mockDate,
            updatedAt: mockDate,
            description: null,
            picture: null,
            banner: null,
            type: null,
            creatorId: 'test1'
        };

        const mockUserData = {
            id: 'test1',
            name: 'John Doe',
            password: '',
            signinType: false,
            bio: null,
            email: 'test@gmail.com',
            emailVerified: null,
            imageUrl: null,
            imagePublicId: null,
            isOnboard: false,
            latestViewedPosts: [],
        };

        prismaMock.group.findMany.mockResolvedValueOnce([mockGroupData]);
        prismaMock.user.findMany.mockResolvedValueOnce([mockUserData]);

        const response = await GET(req);
        expect(response.status).toBe(200);


        const data = await response.json();
        expect(data[0]).toEqual([
            {
                id: 'test1',
                name: 'John Doe',
                createdAt: '2024-06-28T12:06:20.494Z',
                updatedAt: '2024-06-28T12:06:20.494Z',
                description: null,
                picture: null,
                banner: null,
                type: null,
                creatorId: 'test1'
            }
        ]);
        expect(data[1]).toEqual([mockUserData]);
    });

});