import path from "node:path";
import { fileURLToPath } from "node:url";

import cobaltConfigs, { declareConfig, globals } from "eslint-config-cobaltt7";

export default declareConfig(
	{ files: ["**/*.ts"] },
	{ ignores: ["dist"] },
	...cobaltConfigs,
	{
		languageOptions: {
			ecmaVersion: 2025,
			globals: globals.nodeBuiltin,
			parserOptions: {
				projectService: true,
				tsconfigRootDir: path.dirname(fileURLToPath(import.meta.url)),
			},
		},
	},
	{ rules: { "no-warning-comments": "off" } }, // TODO: remove
	{ files: ["./common/typedefs/**"], rules: { "unicorn/filename-case": "off" } },
	{
		files: ["./common/constants.ts"],
		rules: { "sort-keys": ["error", "asc", { caseSensitive: false, natural: true }] },
	},
);
