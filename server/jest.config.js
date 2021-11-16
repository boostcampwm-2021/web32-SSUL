module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  moduleNameMapper: {
    '^@domains/(.*)$': '<rootDir>/src/domains/$1',
    '^@utils/(.*)$': '<rootDir>/src/utils/$1',
    '^@root/(.*)$': '<rootDir>/src/server/$1',
  },
};
