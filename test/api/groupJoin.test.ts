import { createMocks } from "node-mocks-http";
import { prismaMock } from "../../__mocks__/prisma";
import { Session, getServerSession } from "next-auth";
import { POST } from "@/app/api/group/join/route";
let mockedSession: Session | null = null; 
jest.mock('bcrypt');
jest.mock("next-auth/next", () => ({
    getServerSession: jest.fn(() => Promise.resolve(mockedSession)),
}));
describe('POST request to join group', () => {
    beforeEach(() => {
        jest.clearAllMocks(); // Clear mocks before each test
    });

    it('creates membership successfully', async () => {

        const { req } = createMocks({
            method: 'POST',
            url: 'localhost:3000/api/group/join',
            body: {
                groupId: 'testgroup1',
                userId: 'test1'
            },
            headers: {
                'Content-Type': 'application/json'
            }
        }) as any;
        const mockUser = {
            user: {
                email: 'test@gmail.com'
            }
        };

        (getServerSession as jest.Mock).mockResolvedValueOnce(mockUser);
        req.json = jest.fn().mockResolvedValue(req.body);
        prismaMock.membership.findFirst.mockResolvedValueOnce(null);
        prismaMock.membership.create.mockResolvedValueOnce(req.body);
        const res = await POST(req as any);
        expect(res.status).toBe(200);
        const data = await res.text();
        expect(data).toBe('testgroup1');
       
    });

    
    
});

describe('POST request to join group', () => {

    
        it('returns 400 if already a member', async () => {
            const { req } = createMocks({
                method: 'POST',
                url: 'localhost:3000/api/group/join',
                body: {
                    groupId: 'testgroup2',
                    userId: 'test2'
                }
            }) as any;
            const mockUser = {
                user: {
                    email: 'test@gmail.com'
                }
            };
            (getServerSession as jest.Mock).mockResolvedValueOnce(mockUser);
            req.json = jest.fn().mockResolvedValue(req.body);
            prismaMock.membership.findFirst.mockResolvedValue({userId: 'test2', groupId: 'testgroup2'});
            const res = await POST(req as any);
            expect(res.status).toBe(400);
          });
   
})
