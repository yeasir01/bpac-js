module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  moduleFileExtensions: ['ts', 'tsx', 'js', 'json', 'node'],
  collectCoverage: true,
  coverageReporters: ["text", "lcov"],
};