module.exports = {
  env: {
    brower: true,
  },
  extends: ["eslint:recommended", "plugin:prettier/recommended"],
  rules: {
    "no-param-reassign": ["error", { props: false }],
  },
}
