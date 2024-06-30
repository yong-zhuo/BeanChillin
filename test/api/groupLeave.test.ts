import { createMocks } from "node-mocks-http";
import { prismaMock } from "../../__mocks__/prisma";
import { Session, getServerSession } from "next-auth";
import { POST } from "@/app/api/group/join/route";
let mockedSession: Session | null = null; 
jest.mock('bcrypt');
jest.mock("next-auth/next", () => ({
    getServerSession: jest.fn(() => Promise.resolve(mockedSession)),
}));

describe('POST request to leave group', () => {
    it('leaves group successfully', async () => {

        const { req, res } = createMocks({
            method: 'POST',
            url: 'localhost:3000/api/group/leave',
            body: {
                groupId: 'testgroup1',
                userId: 'test1'
            },
        }) as any;
        const mockUser = {
            user: {
                email: 'test@gmail.com',
                id: 'test1'
            }
        };

        (getServerSession as jest.Mock).mockResolvedValueOnce(mockUser);
        await POST(req as any);
        expect(res._getStatusCode()).toBe(200);

    })
})