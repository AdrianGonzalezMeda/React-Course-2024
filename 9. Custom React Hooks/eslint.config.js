import globals from "globals";
import pluginJs from "@eslint/js";
import pluginReact from "eslint-plugin-react";


/** @type {import('eslint').Linter.Config[]} */
export default [
  {files: ["**/*.{js,mjs,cjs,jsx}"]},
  {languageOptions: { globals: globals.browser }},
  {
    plugins: [
      "react-hooks"
    ],
    rules: {
      "react-hooks/rules-of-hooks": "error", // For checking rules of hooks
      "react-hooks/exhaustive-deps": "warn" // For checking hook dependencies 
    }
  },
  pluginJs.configs.recommended,
  pluginReact.configs.flat.recommended,
];