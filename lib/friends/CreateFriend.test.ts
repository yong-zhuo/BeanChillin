import { prismaMock } from "../../__mocks__/prisma";
import CreateFriend from "./CreateFriend";
import FriendData from './FriendData';

describe('CreateFriend', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('should create new friend request when no existing record', async () => {
        const data: FriendData = {
            sender_id: 'admin@gmail.com',
            receiver_id: 'dragon@gmail.com',
            status: 'Friend',
            id: '',
        };

        prismaMock.friendship.findFirst.mockResolvedValue(null);

        prismaMock.friendship.create.mockResolvedValueOnce({ id: 'friendship_id_1', sender_id: 'admin@gmail.com', receiver_id: 'dragon@gmail.com', status: 'Pending', key: null });
        prismaMock.friendship.create.mockResolvedValueOnce({ id: 'friendship_id_2', sender_id: 'dragon@gmail.com', receiver_id: 'admin@gmail.com', status: 'Confirm', key: null });

        const result = await CreateFriend(data);

        expect(prismaMock.friendship.findFirst).toHaveBeenCalledWith({
            where: {
                sender_id: data.sender_id,
                receiver_id: data.receiver_id,
            },
            select: {
                id: true,
            },
        });

        expect(prismaMock.friendship.create).toHaveBeenCalledTimes(2);
        expect(prismaMock.friendship.create).toHaveBeenCalledWith({
            data: {
                sender_id: data.sender_id,
                receiver_id: data.receiver_id,
                status: 'Pending',
                key: `${data.sender_id}-${data.receiver_id}`,
            },
        });
    });
});