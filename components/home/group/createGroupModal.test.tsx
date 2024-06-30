import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import CreateGroupModal from './CreateGroupModal';
import { useRouter } from 'next/navigation';
import { UserContext } from '../UserContext';
import { ToastProvider } from '@radix-ui/react-toast';
import { User } from '@prisma/client';
import userEvent from '@testing-library/user-event';
import { POST } from '@/app/api/group/route';
import { createMocks } from 'node-mocks-http';
import { Session, getServerSession } from 'next-auth';
import { prismaMock } from '@/__mocks__/prisma';

let mockedSession: Session | null = null;

jest.mock('next/navigation');

jest.mock("next-auth/next", () => ({
    getServerSession: jest.fn(() => Promise.resolve(mockedSession)),
}));

describe('CreateGroupModal', () => {

    beforeEach(() => {
        const mockedUserData = {
            id: 'test1',
            name: 'john doe',
            password: 'password',
            signinType: true,
            bio: 'test',
            email: 'test@gmail.com',
            emailVerified: new Date(),
            imageUrl: null,
            imagePublicId: null,
            isOnboard: true
        } as User;
    });


    test('renders the form correctly and can post data to db before getting rerouted', async () => {
        render(
            <ToastProvider>
                <CreateGroupModal />
            </ToastProvider>
        );

        const openButton = screen.getByText('New Group');
        expect(openButton).toBeInTheDocument();
        fireEvent.click(openButton);

        //Check UI elements
        expect(screen.getByText('Create your Group')).toBeInTheDocument();
        expect(screen.getByPlaceholderText('Enter group name')).toBeInTheDocument();
        expect(screen.getByPlaceholderText('Enter group description')).toBeInTheDocument();
        expect(screen.getByText('Group Category')).toBeInTheDocument();
        expect(screen.getByText('Group Banner')).toBeInTheDocument();
        expect(screen.getByText('Group Picture')).toBeInTheDocument();

        //Fill in form
        await userEvent.type(screen.getByPlaceholderText('Enter group name'), 'Test-Group');
        await userEvent.type(screen.getByPlaceholderText('Enter group description'), 'This is a test group');
        await userEvent.click(screen.getByText('Group Category'));
        await userEvent.click(screen.getByText('Academics'));

        //Click submit button
        await userEvent.click(screen.getByRole('button', { name: /create/i }));

        //Mocked payload
        const mockPayload = {
            name: 'Test-Group',
            description: 'This is a test group',
            picture: undefined,
            banner: undefined,
            type: 'Academics',
            creatorId: 'test1',
        };

        const { req } = createMocks({
            method: 'POST',
            body: mockPayload,
        }) as any;

        const mockUser = {
            user: {
                email: 'test@gmail.com'
            }
        };

        const mockCreatedGroup = {
            id: 'test1',
            name: 'Test-Group',
            description: 'This is a test group',
            type: 'Academics',
            creatorId: 'test1',
            createdAt: new Date(),
            updatedAt: new Date(),
            picture: null,
            banner: null,
        };

        const mockMembership = {
            userId: 'test1',
            groupId: 'test1'
        };

        //Mock session
        (getServerSession as jest.Mock).mockResolvedValueOnce(mockUser);
        req.json = jest.fn().mockResolvedValue(req.body);

        //Mock db
        prismaMock.group.create.mockResolvedValueOnce(mockCreatedGroup);
        prismaMock.membership.create.mockResolvedValueOnce(mockMembership);
        const res = await POST(req);
        expect(res.status).toBe(200);

        //Check if user is rerouted
        await waitFor(() => expect(useRouter).toHaveBeenCalled());
    });
});
