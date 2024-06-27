import { prismaMock } from "../../__mocks__/prisma";

test('should update imageUrl and imagePublicId', async () => {
    const data = {
        email: 'lol@gmail.com',
        password: 'password',
        id: 'unique_id',
        name: 'John Doe',
        signinType: true,
        bio: null,
        emailVerified: null,
        imageUrl: "some value",
        imagePublicId: "Some value",
        isOnboard: false,
    }

    const res = prismaMock.user.update.mockResolvedValue(data)

    await expect(prismaMock.user.update({
        where: {
            email: data.email
        },
        data: {
            imageUrl: "some value",
            imagePublicId: "Some value",
        }
    })).resolves.toEqual(expect.objectContaining({
        imageUrl: "some value",
        imagePublicId: "Some value",
    }));
})