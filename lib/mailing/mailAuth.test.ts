import { prismaMock } from '../../__mocks__/prisma';
import mailAuth from './mailAuth';

const data1 = {
    email: 'beanchillin3@gmail.com',
    password: 'password',
    id: 'unique_id',
    name: 'John Doe',
    signinType: true,
    bio: "MY MAN!",
    emailVerified: null,
    imageUrl: null,
    imagePublicId: null,
    isOnboard: true,
    latestViewedPosts: []
};

const email = data1.email;

test('Valid Email', async () => {

    //if email is undefined
    if (!email || typeof email !== 'string' || email === '') {
        throw new Error("Invalid email");
    }

    const res = prismaMock.user.findUnique.mockResolvedValue(data1)

    await expect(prismaMock.user.findUnique({
        where: {
            email
        }
    })).resolves.toEqual(expect.objectContaining({
        email: 'beanchillin3@gmail.com',
    }));
});

const data2 = {
    email: "",
    password: 'password',
    id: 'unique_id',
    name: 'John Doe',
    signinType: true,
    bio: "MY MAN!",
    emailVerified: null,
    imageUrl: null,
    imagePublicId: null,
    isOnboard: true
};


test('Invalid Email', async () => {

    //if email is undefined
    if (!email || typeof email !== 'string' || email === '') {
        throw new Error("Invalid email");
    }

    const res = prismaMock.user.findUnique.mockRejectedValue(new Error('Invalid email'))

    await expect(prismaMock.user.findUnique({
        where: {
            email
        }
    })).rejects.toThrow('Invalid email');
});