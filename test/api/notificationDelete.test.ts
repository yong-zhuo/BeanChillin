import { createMocks } from "node-mocks-http";
import { prismaMock } from "../../__mocks__/prisma";
import { Session, getServerSession } from "next-auth";
import { DELETE } from "@/app/api/notifications/route";
let mockedSession: Session | null = null; 
jest.mock('bcrypt');
jest.mock("next-auth/next", () => ({
    getServerSession: jest.fn(() => Promise.resolve(mockedSession)),
}));

describe('Delete notification', () => {
    it('deletes notification successfully', async () => {

        const { req, res } = createMocks({
            method: 'DELETE',
            url: 'localhost:3000/api/notifications?notifId=1',
        }) as any;
        const mockUser = {
            user: {
                email: 'test@gmail.com',
                id: 'test1'
            }
        };

        (getServerSession as jest.Mock).mockResolvedValueOnce(mockUser);
        await DELETE(req as any);
        expect(res._getStatusCode()).toBe(200);

    })
})