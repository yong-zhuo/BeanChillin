import mailAuth from './mailAuth';

const data1 = {
    email: 'beanchillin3@gmail.com',
};

test('Valid Email', () => {
    expect(async () => await mailAuth(data1)).not.toThrow();
});

const data2 = {
    email: "",
};


test('Invalid Email', async () => {
    await expect(mailAuth(data2)).rejects.toThrow('Invalid email');
});