import '@testing-library/jest-dom';
import { mockDeep, mockReset, DeepMockProxy } from 'jest-mock-extended';
import { PrismaClient } from '@prisma/client'; // Import the PrismaClient type from Prisma
import prisma from './lib/prisma'; // Import the actual Prisma instance
import fetchMock from 'jest-fetch-mock';
import { TextEncoder, TextDecoder } from "node:util";

global.TextEncoder = TextEncoder;
global.TextDecoder = TextDecoder as any;

fetchMock.enableMocks();

jest.mock('./lib/prisma', () => ({
    __esModule: true,
    default: mockDeep<PrismaClient>(),
}));

beforeEach(() => {
    mockReset(prismaMock);
});

export const prismaMock = prisma as unknown as DeepMockProxy<PrismaClient>;