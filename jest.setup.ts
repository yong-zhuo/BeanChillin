import '@testing-library/jest-dom';
import { mockDeep, mockReset, DeepMockProxy } from 'jest-mock-extended';
import { PrismaClient } from '@prisma/client'; // Import the PrismaClient type from Prisma
import prisma from './lib/prisma'; // Import the actual Prisma instance

jest.mock('./lib/prisma', () => ({
    __esModule: true,
    default: mockDeep<PrismaClient>(),
}));

beforeEach(() => {
    mockReset(prismaMock);
});

export const prismaMock = prisma as unknown as DeepMockProxy<PrismaClient>;