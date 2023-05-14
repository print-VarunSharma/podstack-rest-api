/** @type {import('ts-jest/dist/types').InitialOptionsTsJest} */
module.exports = {
    rootDir: '../../../',
    preset: 'ts-jest',
    testEnvironment: 'node',
    setupFiles: ['config/config'],
    testPathIgnorePatterns: ['./dist', './node_modules']
};
