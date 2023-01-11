module.exports = {
  globals: {
    "AppVersion": "readonly"
  },
  plugins: ["@typescript-eslint", "react", "react-hooks", "jsx-a11y", "unused-imports", "prettier"],
  extends: ["airbnb", "airbnb-typescript", "plugin:jsx-a11y/recommended", "plugin:prettier/recommended"],
  parserOptions: {
    project: ["./tsconfig.json"],
    sourceType: "module"
  },
  rules: {
    "no-console": 0,
    "no-underscore-dangle": "off",
    "no-unused-vars": 0,
    "@typescript-eslint/no-unused-vars": 0,
    "react/require-default-props": "off",
    "react/jsx-props-no-spreading": "off",
    "unused-imports/no-unused-imports": "error",
    'import/export': 0,
    "import/order": ["error", {
      groups: ["builtin", "external", "internal"],
      pathGroups: [{
        pattern: "react*",
        group: "external",
        position: "before"
      }, {
        pattern: "@",
        group: "external",
        position: "after"
      }, {
        pattern: "@/**",
        group: "internal",
        position: "after"
      }, {
        pattern: "aecTypes",
        group: "internal",
        position: "after"
      }],
      pathGroupsExcludedImportTypes: ["react"],
      "newlines-between": "always",
      alphabetize: {
        order: "asc",
        caseInsensitive: true
      }
    }],
    "prettier/prettier": "error",
    "no-nested-ternary": "off"
  }
};