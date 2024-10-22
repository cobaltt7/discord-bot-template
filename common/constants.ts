export default {
	collectorTime: 45_000,

	channels: {
		logs: "TODO",
	},


	emojis: {
		no: "<:emoji:TODO>",
	},

	env:
		process.argv.some((file) => file.endsWith(".test.js")) ? "testing"
		: process.env.NODE_ENV === "production" ? "production"
		: "development",

	testingServer: "TODO",
	themeColor: 0x00_00_00, // TODO

	users: {
		bot: "TODO",
	},
} as const;
