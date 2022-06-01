import 'dotenv/config';
import { Client, Intents } from 'discord.js';

// Create a new client instance
const client = new Client({ intents: [Intents.FLAGS.GUILDS] });

// When the client is ready, run this code (only once)
client.once('ready', () => {
	console.log('Ready!');
});

client.on('interactionCreate', async (interaction) => {
	if (!interaction.isCommand()) return;

	const { commandName } = interaction;

	if (commandName === 'ping') {
		await interaction.reply('Pong!');
	}
	else if (commandName === 'server') {
		await interaction.reply(
			`Server name: ${interaction.guild.name}\nTotal members: ${interaction.guild.memberCount}`,
		);
	}
	else if (commandName === 'user') {
		await interaction.reply('User info.');
	}
});

// Login to Discord with your client's token
client.login(process.env.DISCORD_TOKEN);

// const res = await axios
//   .get("http://lostarkapi.herokuapp.com/server/all")
//   .catch(function (response) {
//     console.log(response);
//   });

// console.log(res.data.data);
