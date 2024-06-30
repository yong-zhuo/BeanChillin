import { createMocks } from "node-mocks-http";
import { prismaMock } from "../../__mocks__/prisma";
import { Session, getServerSession } from "next-auth";
import { POST } from "@/app/api/group/route";
let mockedSession: Session | null = null; 
jest.mock('bcrypt');
jest.mock("next-auth/next", () => ({
    getServerSession: jest.fn(() => Promise.resolve(mockedSession)),
}));

describe('POST /api/group/join', () => {
    beforeEach(() => {
        jest.clearAllMocks(); // Clear mocks before each test
    });
    it('able to create new group', async () => {
    const { req } = createMocks({
        method: 'POST',
        url: 'localhost:3000/api/group',
        body: {
                name: 'Test Group 1',
                description: 'lol',
                banner:null,
                picture:null,
                type: 'Interests',
                creatorId: 'test1'
        }
    }) as any;
    const mockUser = {
        user: {
            email: 'test@gmail.com'
        }
    };
    (getServerSession as jest.Mock).mockResolvedValueOnce(mockUser);
    req.json = jest.fn().mockResolvedValue(req.body);
    prismaMock.group.findFirst.mockResolvedValueOnce(null);
    prismaMock.group.create.mockResolvedValueOnce(req.body);
    prismaMock.membership.create.mockResolvedValueOnce({userId: 'test1', groupId: 'testgroup1'});
    const res = await POST(req as any);
    expect(res.status).toBe(200);
    const data = await res.json();
    expect(data).toBe('Test Group 1');
})
    
})

describe('POST /api/group/join', () => {
    it('unable to create new group', async () => {
        const { req } = createMocks({
            method: 'POST',
            url: 'localhost:3000/api/group',
            body: {
                name: 'Test Group 1',
                description: 'lol',
                type: 'Interests',
                creatorId: 'test1'
            }
        }) as any;
        const mockUser = {
            user: {
                email: 'test@gmail.com'
            }
        };
        const mockGroup = {
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
        };
        (getServerSession as jest.Mock).mockResolvedValueOnce(mockUser);
        req.json = jest.fn().mockResolvedValue(req.body);
        prismaMock.group.findFirst.mockResolvedValue(mockGroup);
        const res = await POST(req as any);
        expect(res.status).toBe(409);
        
    })
})