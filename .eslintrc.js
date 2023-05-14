module.exports = {
    env: {
        browser: true,
        commonjs: true,
        es2021: true
    },
    parser: '@typescript-eslint/parser',
    plugins: ['@typescript-eslint'],
    extends: [
        // ,
        'standard',
        'prettier',
        'eslint:recommended',
        'eslint-config-prettier',
        'plugin:@typescript-eslint/eslint-recommended',
        'plugin:@typescript-eslint/recommended'
    ],

    parserOptions: {
        ecmaVersion: 12,
        ecmaFeatures: {
            jsx: false,
            experimentalObjectRestSpread: true
        }
    },
    rules: {
        semi: ['error', 'always'],
        quotes: ['error', 'single'],
        indent: ['error', 4],
        'global-require': ['error'],
        'handle-callback-err': ['error'],
        'no-useless-escape': 'warn',
        'no-unused-vars': ['error', {}],

        // enforce camelCase
        camelcase: ['error', { properties: 'always' }],
        // enforce no var use
        'no-var': ['error'],
        // enforce documentation
        'require-jsdoc': [
            'error',
            {
                require: {
                    FunctionDeclaration: true,
                    MethodDefinition: false,
                    ClassDeclaration: false,
                    ArrowFunctionExpression: false,
                    FunctionExpression: true
                }
            }
        ],
        'no-use-before-define': ['error'],
        'no-var': ['error'],
        'prefer-const': ['error'],
        'no-implicit-globals': ['error']
    },
    overrides: [
        {
            files: ['*.spec.js'],
            rules: {
                'no-unused-expressions': 'off'
            }
        }
    ]
};
