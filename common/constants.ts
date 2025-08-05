import type { Snowflake } from "discord.js";

const env =
	process.argv.some((file) => file.endsWith(".test.js")) ? "testing"
	: process.env.NODE_ENV === "production" ? "production"
	: "development";

export default {
	channels: { logs: "TODO" },

	collectorTime: 45_000,

	emojis: { no: "<:emoji:TODO>" } satisfies Record<string, `<${"a" | ""}:emoji:${Snowflake}>`>,

	env,

	testingServer: "TODO",
	themeColor: 0x00_00_00, // TODO

	users: { bot: "TODO" },
} as const;
