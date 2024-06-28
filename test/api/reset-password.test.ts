import { createMocks } from "node-mocks-http";
import { prismaMock } from "../../__mocks__/prisma";
import { POST } from "@/app/api/reset-password/route";
import bcrypt from 'bcrypt';

jest.mock('bcrypt');

describe('GET request to search API', () => {
    beforeEach(() => {
        jest.clearAllMocks(); // Clear mocks before each test
    });

    it('check if password reset is successful', async () => {

        const { req } = createMocks({
            method: 'POST',
            url: 'localhost:3000/api/reset-password',
            body: {
                password: 'password',
                userId: 'test1'
            }
        }) as any;

        req.json = jest.fn().mockResolvedValue(req.body);

        const hashedPassword = 'password';
        (bcrypt.hash as jest.Mock).mockResolvedValue(hashedPassword);

        const mockUpdatedValue = {
            id: 'test1',
            name: 'John Doe',
            password: hashedPassword,
            signinType: false,
            bio: null,
            email: 'test@gmail.com',
            emailVerified: null,
            imageUrl: null,
            imagePublicId: null,
            isOnboard: false
        }
        prismaMock.user.update.mockResolvedValueOnce(mockUpdatedValue);

        const response = await POST(req);
        expect(response.status).toBe(200);
    });
});