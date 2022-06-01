import { SlashCommandBuilder } from '@discordjs/builders'
import getJSONResponse from '../util/getJSONResponse.js'
import { request } from 'undici'

export default {
  data: new SlashCommandBuilder()
    .setName('status')
    .setDescription('Replies with status of all servers'),
  async execute(interaction) {
    const rawData = await request("http://lostarkapi.herokuapp.com/server/all")
    const res = await getJSONResponse(rawData.body);
    console.log(res.data)

    return interaction.reply(`Rohendel: ${res.data.Rohendel}`)
  },
};
