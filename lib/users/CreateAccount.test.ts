import { prismaMock } from "../context";

test('should create new user ', async () => {
    const data = {
        email: 'lol@gmail.com',
        password: 'password',
        id: 'unique_id',
        name: 'John Doe',
        signinType: true,
        bio: null,
        emailVerified: null,
        imageUrl: null,
        imagePublicId: null,
        isOnboard: false,
    }

    const res = prismaMock.user.create.mockResolvedValue(data)

    await expect(prismaMock.user.create({
        data: {
            email: "lol@gmail.com",
            password: 'password',
            signinType: true,
            isOnboard: false
        }
    })).resolves.toEqual(expect.objectContaining({
        email: 'lol@gmail.com',
        password: 'password',
        signinType: true,
        isOnboard: false
    }));
})
