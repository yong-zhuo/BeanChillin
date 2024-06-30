import { render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import GeneralFeed from './GeneralFeed';
import { prismaMock } from '@/jest.setup';
import { Session } from 'next-auth';

let mockedSession: Session | null = null;

jest.mock('next/navigation');

jest.mock("next-auth/next", () => ({
    getServerSession: jest.fn(() => Promise.resolve(mockedSession)),
}));

global.IntersectionObserver = jest.fn(
    (callback: IntersectionObserverCallback, options?: IntersectionObserverInit) => ({
        observe: jest.fn(),
        unobserve: jest.fn(),
        disconnect: jest.fn(),
        root: null,
        rootMargin: '',
        thresholds: [],
        takeRecords: jest.fn(),
    })
);

describe('GeneralFeed', () => {

    it('renders the GeneralFeed correctly', async () => {

        const content = {
            time: 1719589689482,
            blocks: [
                {
                    id: "i4DGxsAgdC",
                    data: {
                        text: "Please share with me where is the best lala soup",
                    },
                    type: "paragraph",
                },
            ],
            version: "2.29.1",
        }

        const mockedUser = {
            id: 'test1',
            name: 'John Doe',
            password: 'hashed_password',
            signinType: true,
            bio: 'This is a bio',
            email: '',
            emailVerified: new Date(),
            imageUrl: 'https://example.com/image.jpg',
            imagePublicId: 'image1',
            isOnboard: true,
        }

        const mockedGroup = {
            id: 'group1',
            name: 'Test Group',
            description: 'This is a test group',
            type: 'Public',
            creatorId: 'test1',
        }

        const mockedPostData = {
            id: 'test1',
            title: 'this is a test post',
            content: content,
            createdAt: new Date(),
            updatedAt: new Date(),
            author: mockedUser,
            authorId: 'test1',
            group: mockedGroup,
            groupId: 'group1',
            votes: [],
            comments: []
        }

        prismaMock.post.findMany.mockResolvedValue([mockedPostData]);
        render(
            await GeneralFeed()
        );

        expect(screen.getByText('Test Group')).toBeInTheDocument();
        expect(screen.getByText('John Doe')).toBeInTheDocument();
        expect(screen.getByText('this is a test post')).toBeInTheDocument();
        expect(screen.getByText('0 comments')).toBeInTheDocument();
    });
});