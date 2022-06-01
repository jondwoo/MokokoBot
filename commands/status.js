import { SlashCommandBuilder } from '@discordjs/builders'
import getJSONResponse from '../util/getJSONResponse.js'
import { request } from 'undici'

export default {
  data: new SlashCommandBuilder()
    .setName('status')
    .setDescription('Replies with status of the specified server')
    .addStringOption(option =>
      option.setName('server')
        .setDescription('The server to look up')
        .setRequired(true)
        .addChoices(
          { name: 'Rohendel', value: 'Rohendel' },
          { name: 'Enviska', value: 'Enviska' },
        )),
  async execute(interaction) {
    const server = interaction.options.getString('server');

    const rawData = await request(`http://lostarkapi.herokuapp.com/server/${server}`)
    const res = await getJSONResponse(rawData.body);

    if (res.status !== 200) {
      return interaction.reply('Error fetching data')
    }

    return interaction.reply(`${server}: ${res.data[server]}`)
  },
};
