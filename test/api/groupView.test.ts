import { createMocks } from "node-mocks-http";
import { prismaMock } from "../../__mocks__/prisma";
import { Session, getServerSession } from "next-auth";
import { POST } from "@/app/api/group/join/route";
import { group } from "console";
import { mock } from "node:test";
import { GET } from "@/app/api/group/find-preview/route";
let mockedSession: Session | null = null; 
jest.mock('bcrypt');
jest.mock("next-auth/next", () => ({
    getServerSession: jest.fn(() => Promise.resolve(mockedSession)),
}));

describe('POST request to join group', () => {
    beforeEach(() => {
        jest.clearAllMocks(); // Clear mocks before each test
    });

    it('GET groups successfully', async () => {

        const { req } = createMocks({
            method: 'GET',
            url: 'localhost:3000/api/group/find-preview',
        }) as any;
        const mockUser = {
            user: {
                email: 'test@gmail.com',
                id: 'test1'
            }
        };

        (getServerSession as jest.Mock).mockResolvedValueOnce(mockUser);

        const mockMembership = {
            groupId: 'testgroup1',
            userId: 'test1',
            group: {
                id: 'testgroup1',
                name: 'Test Group 1',
                createdAt: new Date(),
                updatedAt: new Date(),
                posts:[],
                description: 'lol',
                picture: null,
                members: [],
                creatorId: 'test2',
                banner: null,
                type: 'Interests'
            }
        }

        const mockGroup = {
            id: 'testgroup3',
            name: 'Test Group 3',
            createdAt: new Date(),
            updatedAt: new Date(),
            posts:[],
            description: 'lol',
            picture: null,
            members: [],
            creatorId: 'test1',
            banner: null,
            type: 'Interests'
        }
        prismaMock.membership.findMany.mockResolvedValueOnce([mockMembership])
        prismaMock.group.findMany.mockResolvedValueOnce([mockGroup])
        const res = await GET();
        expect(res.status).toBe(200);
        const data = await res.json();
        console.log(data);
        
    });

    
});