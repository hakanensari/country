import globals from "globals"
import path from "node:path"
import { fileURLToPath } from "node:url"
import js from "@eslint/js"
import { FlatCompat } from "@eslint/eslintrc"

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const compat = new FlatCompat({
  baseDirectory: __dirname,
  recommendedConfig: js.configs.recommended,
  allConfig: js.configs.all,
})

export default [
  {
    ignores: ["docs/**/*.js"],
  },
  ...compat.extends("eslint:recommended", "plugin:prettier/recommended"),
  {
    languageOptions: {
      globals: {
        ...globals.jest,
        ...globals.node,
      },
      ecmaVersion: 2020,
      sourceType: "module",
    },
    rules: {
      "no-console": "off",
      "no-unused-vars": ["error", { args: "none" }],
    },
  },
]
