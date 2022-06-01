import { SlashCommandBuilder } from '@discordjs/builders'
import { MessageEmbed } from 'discord.js'
import getJSONResponse from '../util/getJSONResponse.js'
import { request } from 'undici'
import trim from '../util/trim.js'

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

      const [answer] = list;

      const embed = new MessageEmbed()
        .setColor('#EFFF00')
        .setTitle(answer.word)
        .setURL(answer.permalink)
        .addFields(
          { name: 'Definition', value: trim(answer.definition, 1024) },
          { name: 'Example', value: trim(answer.example, 1024) },
          {
            name: 'Rating',
            value: `${answer.thumbs_up} thumbs up. ${answer.thumbs_down} thumbs down.`,
          },
        );
      return interaction.reply({ embeds: [embed] });
    }

    return interaction.reply('No option was provided!');
  },
};
