import { SlashCommandBuilder } from '@discordjs/builders';
import { MessageEmbed } from 'discord.js';
import getJSONResponse from '../util/getJSONResponse.js';
import { request } from 'undici';

export default {
	data: new SlashCommandBuilder()
		.setName('status')
		.setDescription('Replies with status of the specified server'),
	async execute(interaction) {
		const NAWest = ['Akkan', 'Bergstrom', 'Enviska', 'Mari', 'Rohendel', 'Shandi', 'Valtan'];

		const rawData = await request('http://lostarkapi.herokuapp.com/server/all');
		const res = await getJSONResponse(rawData.body);

		if (res.status !== 200) {
			return interaction.reply('Error fetching data');
		}

		let stringVal;
		NAWest.forEach((server) => {
			const status = res.data[server].split(' ')[1];

			let symbol;
			switch (status) {
			case 'Ok':
				symbol = '🟢';
				break;
			case 'Busy':
				symbol = '⚠️';
				break;
			case 'Full':
				symbol = '❌';
				break;
			case 'Maintenance':
				symbol = '🛠️';
				break;
			default:
				break;
			}

			stringVal += `${symbol} ${server}\n`;
		});

		const embed = new MessageEmbed()
			.setColor('#EFFF00')
			.setTitle('Lost Ark Server Status')
			.setDescription('\:green_circle: Online \:exclamation:  Busy ')
			.addField('NA West', stringVal, true);

		return interaction.reply({ embeds: [embed] });
	},
};
