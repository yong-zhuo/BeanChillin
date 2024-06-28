import { prismaMock } from "../../__mocks__/prisma";
import ReadFriend from './ReadFriend';
import CreateFriend from "./CreateFriend";
import FriendData from './FriendData';
import UpdateFriend from "./UpdateFriend";

describe('UpdateFriend', () => {
    beforeEach(() => {
        jest.clearAllMocks();

        prismaMock.friendship.findFirst.mockResolvedValueOnce({
            id: '2',
            sender_id: 'dragon@gmail.com',
            receiver_id: 'admin@gmail.com',
            status: 'Pending',
            key: null,
        });
    });

    it('should update friendship status to "Friend" when the user accept the friend request', async () => {
        const data: FriendData = {
            sender_id: 'admin@gmail.com',
            receiver_id: 'dragon@gmail.com',
            status: 'Friend',
            id: '1',
        };

        const existingFriendship = {
            id: data.id,
            sender_id: data.sender_id,
            receiver_id: data.receiver_id,
            status: 'Pending',
            key: null,
        };

        prismaMock.friendship.findFirst.mockResolvedValue(existingFriendship);
        prismaMock.friendship.update.mockResolvedValueOnce({ id: data.id, sender_id: data.sender_id, receiver_id: data.receiver_id, status: 'Friend', key: null });
        prismaMock.friendship.update.mockResolvedValueOnce({ id: '2', sender_id: data.receiver_id, receiver_id: data.sender_id, status: 'Friend', key: null });

        await UpdateFriend(data);

        expect(prismaMock.friendship.findFirst).toHaveBeenCalledWith({
            where: {
                sender_id: data.sender_id,
                receiver_id: data.receiver_id,
            },
            select: {
                id: true,
            },
        });

        expect(prismaMock.friendship.update).toHaveBeenCalledTimes(2);
        expect(prismaMock.friendship.update).toHaveBeenCalledWith({
            where: {
                id: data.id,
            },
            data: {
                status: 'Friend',
            },
        });

        expect(prismaMock.friendship.update).toHaveBeenCalledWith({
            where: {
                id: '2',
            },
            data: {
                status: 'Friend',
            },
        });
    });
});
