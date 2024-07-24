import { prismaMock } from "@/jest.setup";
import prisma from "../prisma";
import { banUser, makeModerator } from "./groupActions";

jest.mock('../prisma', () => ({
    moderator: {
        create: jest.fn(),
        findFirst: jest.fn(),
        delete: jest.fn(),
    },
    membership: {
        delete: jest.fn(),
    },
}));

describe('Moderator', () => {

    afterEach(() => {
        jest.clearAllMocks();
    });

    it('able to make moderator', async () => {
        const groupId = 'testgroup1';
        const userId = 'test1';

        await makeModerator(groupId, userId);

        expect(prisma.moderator.create).toHaveBeenCalledWith({
            data: {
                groupId,
                userId,
            },
        });
    })

});

describe('Ban User', () => {
    afterEach(() => {
        jest.clearAllMocks();
    });

    it('should delete both moderator and membership if user is a moderator', async () => {
        const groupId = 'group1';
        const userId = 'user1';

        prismaMock.moderator.findFirst.mockResolvedValue({ groupId, userId });

        await banUser(groupId, userId);

        expect(prisma.moderator.delete).toHaveBeenCalledWith({
            where: {
                groupId_userId: {
                    groupId,
                    userId,
                },
            },
        });

        expect(prisma.membership.delete).toHaveBeenCalledWith({
            where: {
                userId_groupId: {
                    groupId,
                    userId,
                },
            },
        });
    });

    it('should delete only membership if user is not a moderator', async () => {
        const groupId = 'group1';
        const userId = 'user1';

        prismaMock.moderator.findFirst.mockResolvedValue(null);

        await banUser(groupId, userId);

        expect(prisma.moderator.delete).not.toHaveBeenCalled();

        expect(prisma.membership.delete).toHaveBeenCalledWith({
            where: {
                userId_groupId: {
                    groupId,
                    userId,
                },
            },
        });
    });
})