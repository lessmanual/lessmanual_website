import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,
  {
    rules: {
      "react-hooks/set-state-in-effect": "warn",
      "react-hooks/purity": "warn",
    },
  },
  // Override default ignores of eslint-config-next.
  globalIgnores([
    // Default ignores of eslint-config-next:
    ".next/**",
    "out/**",
    "build/**",
    "next-env.d.ts",
    "**/* 2.{js,jsx,ts,tsx,mjs,cjs}",
    "**/* 3.{js,jsx,ts,tsx,mjs,cjs}",
    "**/* 4.{js,jsx,ts,tsx,mjs,cjs}",
  ]),
]);

export default eslintConfig;
