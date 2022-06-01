import { SlashCommandBuilder } from '@discordjs/builders'
import getJSONResponse from '../util/getJSONResponse.js'
import { request } from 'undici'

export default {
  data: new SlashCommandBuilder()
    .setName('urban')
    .setDescription('Replies with urban dictionary definition of user term')
    .addStringOption(option =>
      option.setName('term')
        .setDescription('The word to look up')),
  async execute(interaction) {
    const term = interaction.options.getString('term');

    if (term) {
      const query = new URLSearchParams({ term });

      const dictResult = await request(`https://api.urbandictionary.com/v0/define?${query}`);
      const { list } = await getJSONResponse(dictResult.body);

      if (!list.length) {
        return interaction.reply(`No results found for **${term}**.`);
      }

      return interaction.reply(`**${term}**: ${list[0].definition}`);
    }

    return interaction.reply('No option was provided!');
  },
};
