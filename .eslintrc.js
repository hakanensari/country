module.exports = {
  env: {
    es6: true,
    jest: true,
    node: true,
  },
  extends: ["eslint:recommended", "plugin:prettier/recommended"],
  ignorePatterns: ["/docs/**/*.js"],
  rules: {
    "no-console": "off",
    "no-unused-vars": ["error", { args: "none" }],
  },
  parserOptions: {
    ecmaVersion: 8,
    sourceType: "module",
  },
}
