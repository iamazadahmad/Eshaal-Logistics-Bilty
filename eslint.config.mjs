import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,
  // Override default ignores of eslint-config-next.
  globalIgnores([
    // Default ignores of eslint-config-next:
    ".next/**",
    "out/**",
    "build/**",
    "next-env.d.ts",
    {
      rules: {
        // Example: allow "any"
        "@typescript-eslint/no-explicit-any": "off",

        // Example: disable Next.js <img> rule
        "@next/next/no-img-element": "off",

        // Add any rule you want to disable
      },
    },
  ]),
]);

export default eslintConfig;
