/* eslint-disable import/no-named-as-default-member */
import pluginJs from "@eslint/js";
import pluginPrettier from "eslint-plugin-prettier/recommended";
import pluginSolid from "eslint-plugin-solid";
import globals from "globals";
import pluginTs from "typescript-eslint";
import pluginImport from "eslint-plugin-import";

/** @type {import('eslint').Linter.Config[]} */
export default [
  { files: ["**/*.{js,mjs,cjs,ts,jsx,tsx}"] },
  { ignores: ["**/*/node_modules", "**/*/dist"] },
  { languageOptions: { globals: { ...globals.browser, ...globals.node } } },
  pluginJs.configs.recommended,
  ...pluginTs.configs.recommended,
  pluginSolid.configs["flat/recommended"],
  pluginImport.flatConfigs.recommended,
  pluginImport.flatConfigs.typescript,
  pluginPrettier,
  {
    rules: {
      "import/no-unresolved": "off",
      "import/named": "off",
      "import/order": [
        "error",
        { groups: ["external", "builtin", "internal", "sibling", "parent", "index"] },
      ],
    },
    settings: {
      "import/resolver": {
        typescript: true,
        node: true,
      },
    },
  },
];
