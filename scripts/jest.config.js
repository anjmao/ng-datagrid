module.exports = {
    'rootDir': '../',
    'globals': {
        'NODE_ENV': 'test',
        '__TRANSFORM_HTML__': true,
        'ts-jest': {
            'tsConfigFile': `./tsconfig.test.json`,
            'useBabelrc': true
        }
    },
    'moduleFileExtensions': [
        'ts',
        'js',
        'html'
    ],
    'testMatch': [
        `<rootDir>/src/**/?(*.)(spec|test).ts?(x)`
    ],
    'transformIgnorePatterns': [
        '[/\\\\]node_modules[/\\\\].+\\.(js|ts)$'
    ],
    'setupTestFrameworkScriptFile': `<rootDir>/scripts/jest.init.js`,
    'transform': {
        '^.+\\.(scss|css)$': '<rootDir>/node_modules/jest-css-modules',
        '^.+\\.(ts|js|html)$': '<rootDir>/scripts/jest.preprocessor.js'
    }
};
