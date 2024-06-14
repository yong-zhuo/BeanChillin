export default interface Data {
    sender_id: string;
    receiver_id: string;
    status: string; //Should only be Friend/Pending/NotFriend
    id: string; //friend request id
}

