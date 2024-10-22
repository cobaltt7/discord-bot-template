import { GatewayIntentBits } from "discord.js";
import mongoose from "mongoose";
import dns from "node:dns";
import { fileURLToPath } from "node:url";
import { client, login, logError } from "strife.js";
import constants from "./common/constants.js";
import pkg from "./package.json" assert { type: "json" };
import assert from "node:assert";

dns.setDefaultResultOrder("ipv4first");

if (
	process.env.BOT_TOKEN.startsWith(Buffer.from(constants.users.bot).toString("base64") + ".") &&
	!process.argv.includes("--production")
)
	throw new Error("Refusing to run on the production bot without `--production` flag");

await mongoose.connect(process.env.MONGO_URI);

await login({
	modulesDirectory: fileURLToPath(new URL("./modules", import.meta.url)),
	handleError: { channel: constants.channels.logs, emoji: constants.emojis.no },
	clientOptions: {
		intents: GatewayIntentBits.Guilds, // TODO
		presence: { status: "dnd" },
	},
	commandErrorMessage: `${constants.emojis.no} An error occurred.`,
});

const channel = await client.channels.fetch(constants.channels.logs);
assert(channel?.isTextBased());
process
	.on(
		"uncaughtException",
		async (error, event) =>
			await logError({ error, event, channel, emoji: constants.emojis.no }),
	)
	.on(
		"warning",
		async (error) =>
			await logError({ error, event: "warning", channel, emoji: constants.emojis.no }),
	);

client.user.setStatus("online");

if (constants.env === "production")
	await channel.send(`🤖 Restarted bot on version **v${pkg.version}**`);
