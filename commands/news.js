import { SlashCommandBuilder } from '@discordjs/builders';
import getJSONResponse from '../util/getJSONResponse.js';
import { request } from 'undici';
import trim from '../util/trim.js';

export default {
	data: new SlashCommandBuilder()
		.setName('news')
		.setDescription('Replies with Lost Ark news')
		.addSubcommand(subcommand =>
			subcommand
				.setName('updates')
				.setDescription('Info about the latest update'))
		.addSubcommand(subcommand =>
			subcommand
				.setName('events')
				.setDescription('Info about the latest event'))
		.addSubcommand(subcommand =>
			subcommand
				.setName('release')
				.setDescription('Info about the latest release notes'))
		.addSubcommand(subcommand =>
			subcommand
				.setName('general')
				.setDescription('Info about the latest general news')),
	async execute(interaction) {
		let rawData;
		let res;

		const embeddedMsg = {
			color: '#C3B1E1',
			title: '',
			url: '',
			author: {
				name: 'Lost Ark News',
				icon_url: 'https://cdn2.steamgriddb.com/file/sgdb-cdn/icon_thumb/d77314b5c23c087d9b5ed587e88800d2.png',
				url: 'https://www.playlostark.com/en-us/news',
			},
			description: '',
			image: {
				url: '',
			},
		};

		const subCommand = interaction.options.getSubcommand();
		switch (subCommand) {
		case 'updates':
			rawData = await request('http://lostarkapi.herokuapp.com/news/updates');
			res = await getJSONResponse(rawData.body);

			if (res.status !== 200) {
				return interaction.reply('Error fetching data');
			}

			embeddedMsg.title = `${res.data[0].title}`;
			embeddedMsg.url = `${res.data[0].url}`;
			embeddedMsg.description = trim(res.data[0].excerpt, 1024) + '...';
			embeddedMsg.image.url = `${res.data[0].thumbnail}`;


			break;
		case 'events':
			rawData = await request('http://lostarkapi.herokuapp.com/news/events');
			res = await getJSONResponse(rawData.body);

			if (res.status !== 200) {
				return interaction.reply('Error fetching data');
			}

			embeddedMsg.title = `${res.data[0].title}`;
			embeddedMsg.url = `${res.data[0].url}`;
			embeddedMsg.description = trim(res.data[0].excerpt, 1024) + '...';
			embeddedMsg.image.url = `${res.data[0].thumbnail}`;

			break;
		case 'release':
			rawData = await request('http://lostarkapi.herokuapp.com/news/release-notes');
			res = await getJSONResponse(rawData.body);

			if (res.status !== 200) {
				return interaction.reply('Error fetching data');
			}

			embeddedMsg.title = `${res.data[0].title}`;
			embeddedMsg.url = `${res.data[0].url}`;
			embeddedMsg.description = trim(res.data[0].excerpt, 1024) + '...';
			embeddedMsg.image.url = `${res.data[0].thumbnail}`;


			break;
		case 'general':
			rawData = await request('http://lostarkapi.herokuapp.com/news/general');
			res = await getJSONResponse(rawData.body);

			if (res.status !== 200) {
				return interaction.reply('Error fetching data');
			}

			embeddedMsg.title = `${res.data[0].title}`;
			embeddedMsg.url = `${res.data[0].url}`;
			embeddedMsg.description = trim(res.data[0].excerpt, 1024) + '...';
			embeddedMsg.image.url = `${res.data[0].thumbnail}`;

			break;
		default:
			break;
		}

		return interaction.reply({ embeds: [embeddedMsg] });
	},
};
