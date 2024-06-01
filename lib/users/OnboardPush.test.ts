import { prismaMock } from "../context";

test('should update user information ', async () => {
    const data = {
        email: 'lol@gmail.com',
        password: 'password',
        id: 'unique_id',
        name: 'John Doe',
        signinType: true,
        bio: "MY MAN!",
        emailVerified: null,
        imageUrl: null,
        imagePublicId: null,
        isOnboard: true
    }

    const res = prismaMock.user.update.mockResolvedValue(data)

    await expect(prismaMock.user.update({
        where: {
            email: data.email
        },
        data: {
            name: 'John Doe',
            bio: "MY MAN!",
            isOnboard: true
        }
    })).resolves.toEqual(expect.objectContaining({
        name: 'John Doe',
        bio: "MY MAN!",
        isOnboard: true
    }));
})
