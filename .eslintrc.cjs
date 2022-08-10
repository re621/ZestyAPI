module.exports = {
    extends: ['eslint:recommended', 'plugin:@typescript-eslint/recommended'],
    parser: '@typescript-eslint/parser',
    plugins: ['@typescript-eslint'],
    root: true,
    env: {
        "node": true,
    },
    ignorePatterns: ["/test/*.js", "/dist/*", "webpack.config.js"],
    rules: {
        "@typescript-eslint/no-namespace": "off",
        "@typescript-eslint/no-explicit-any": "off",
    }
};