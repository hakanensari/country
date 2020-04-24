module.exports = {
  env: {
    es6: true,
    jest: true,
    node: true,
  },
  extends: ["eslint:recommended", "plugin:prettier/recommended"],
  rules: {
    "no-console": "off",
  },
  parserOptions: {
    ecmaVersion: 8,
    sourceType: "module",
  },
}
