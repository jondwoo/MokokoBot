import 'dotenv/config';
import fs from 'node:fs';
import path from 'node:path';
import { REST } from '@discordjs/rest';
import { Routes } from 'discord-api-types/v9';
import { fileURLToPath } from 'url';

const commands = [];
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const commandsPath = path.join(__dirname, 'commands');
const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));


for (const file of commandFiles) {
	const filePath = path.join(commandsPath, file);

	const command = await import(filePath);
	commands.push(command.default.data.toJSON());
}

const rest = new REST({ version: '9' }).setToken(process.env.DISCORD_TOKEN);

rest
	.put(
		Routes.applicationGuildCommands(process.env.APP_ID, process.env.GUILD_ID),
		{ body: commands },
	)
	.then(() => console.log('Successfully registered application commands.'))
	.catch(console.error);
