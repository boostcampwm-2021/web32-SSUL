module.exports = {
  preset: 'ts-jest',
  moduleNameMapper: {
    '^@domains/(.*)$': '<rootDir>/src/domains/$1',
    '^@utils/(.*)$': '<rootDir>/src/utils/$1',
    '^@root/(.*)$': '<rootDir>/$1',
    '^@common/(.*)$': '<rootDir>/src/common/$1',
    '^@config/(.*)$': '<rootDir>/src/config/$1',
    '^@error/(.*)$': '<rootDir>/src/common/error/$1',
  },
};
