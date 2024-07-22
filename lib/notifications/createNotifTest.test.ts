import prisma from '../prisma';
import createNotifs from './createNotif';

jest.mock('../prisma', () => ({
    notification: {
        create: jest.fn(),
    },
}));

describe('Create Notification',  () => {

    it('creates notification successfully', async () => {
        const data = { fromId: 'user1', toId: 'user2' };
        const notifType = 'friendRequest';

        await createNotifs(data, notifType);

        expect(prisma.notification.create).toHaveBeenCalledWith({
            data: {
                fromId: data.fromId,
                userId: data.toId,
                type: 'friendRequest',
                isRead: false,
            },
        });
    });

});