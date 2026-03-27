import globals from "globals";
import pluginJs from "@eslint/js";

/** @type {import('eslint').Linter.Config[]} */
export default [
  {
    languageOptions: { 
      globals: {
        ...globals.node, // Bu satır 'process', 'require' ve '__dirname' gibi Node.js terimlerini tanıtır
        ...globals.browser 
      } 
    }
  },
  pluginJs.configs.recommended,
];