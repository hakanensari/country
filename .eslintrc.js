module.exports = {
  env: {
    brower: true,
  },
  extends: ["eslint:recommended", "plugin:prettier/recommended"],
  globals: {
    hljs: "readonly",
  },
  rules: {
    "no-param-reassign": ["error", { props: false }],
  },
}
