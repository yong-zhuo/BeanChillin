
import type { Config } from 'jest'
const nextJest = require('next/jest')

const createJestConfig = nextJest({
  // Provide the path to your Next.js app to load next.config.js and .env files in your test environment
  dir: './',
})

// Add any custom config to be passed to Jest
/**@type {import('jest').Config}*/
const config: Config = {
  setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],
  coverageProvider: 'v8',
  testEnvironment: 'jsdom',
  preset: 'ts-jest',
  // Add more setup options before each test is run
  // setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],
  moduleNameMapper: {
    "^@/lib(.*)$": "<rootDir>/lib/$1",
    "^@/components(.*)$": "<rootDir>/components/$1",
  }
}




// createJestConfig is exported this way to ensure that next/jest can load the Next.js config which is async
module.exports = createJestConfig(config)

