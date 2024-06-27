import { prismaMock } from "../../__mocks__/prisma";
import ReadFriend from './ReadFriend';
import FriendData from './FriendData';

describe('ReadFriend', () => {
    afterEach(() => {
        jest.clearAllMocks();
    });

    it('should return undefined if sender_id is not in the record', async () => {
        const data: FriendData = {
            sender_id: '',
            receiver_id: 'receiver_id',
            status: 'Pending',
            id: '',
        };

        const result = await ReadFriend(data);

        expect(result).toBeUndefined();
        expect(prismaMock.friendship.findFirst).toHaveBeenCalled();
    });

    it('should return undefined if receiver_id is not in the record', async () => {
        const data: FriendData = {
            sender_id: 'sender_id',
            receiver_id: '',
            status: 'Pending',
            id: '',
        };

        const result = await ReadFriend(data);

        expect(result).toBeUndefined();
        expect(prismaMock.friendship.findFirst).toHaveBeenCalled();
    });

    it('should return friendship data if found', async () => {
        const data: FriendData = {
            id: '',
            sender_id: 'sender_id',
            receiver_id: 'receiver_id',
            status: 'Pending',
        };

        const mockFriendship = {
            id: 'friendship_id',
            sender_id: data.sender_id,
            receiver_id: data.receiver_id,
            status: 'Pending',
            key: null,
        };

        prismaMock.friendship.findFirst.mockResolvedValue(mockFriendship);
        const result = await ReadFriend(data);

        expect(prismaMock.friendship.findFirst).toHaveBeenCalledWith({
            where: {
                sender_id: data.receiver_id,
                receiver_id: data.sender_id,
            },
            select: {
                id: true,
                sender_id: true,
                receiver_id: true,
                status: true,
            },
        });
        expect(result).toEqual(mockFriendship);

    });

});