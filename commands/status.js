import { SlashCommandBuilder } from '@discordjs/builders'

export default {
  data: new SlashCommandBuilder()
    .setName('status')
    .setDescription('Replies with status of all servers'),
  async execute(interaction) {
    const res = await axios
      .get("http://lostarkapi.herokuapp.com/server/all")
      .catch(function(response) {
        console.log(response);
      });

    await interaction.reply(res.data.data);
  },
};
