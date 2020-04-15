const { LanguageUtils } = require('../utils/index.js')
exports.run = ({ Send, FastEmbed, message, i18n, bot, env }) => {
  FastEmbed.addField(i18n.__('Info_DiscordJS'), require('discord.js').version, true)
  FastEmbed.addField(i18n.__('Info_Guilds'), bot.guilds.cache.size, true)
  FastEmbed.addField(i18n.__('Info_Users'), bot.users.cache.size, true)
  FastEmbed.addField(i18n.__('Info_DefaultLanguage'), LanguageUtils.fallbackLanguage, true)
  FastEmbed.addField(i18n.__('Info_RamUsage'), `${Math.round(process.memoryUsage().rss / 1024 / 1024)}${i18n.__('Info_MBRSS')}`, true)
  FastEmbed.addField(i18n.__('Info_Uptime'), `${Math.floor(process.uptime() / 3600 % 24)}:${Math.floor(process.uptime() / 60 % 60)}:${Math.floor(process.uptime() % 60)}`, true)
  FastEmbed.addField(i18n.__('Info_Owner'), env.OWNER, true)

  Send(FastEmbed, true)
}

exports.helpEmbed = ({ message, helpEmbed, i18n }) => {
  const Options = {
    argumentsLength: 0,
    argumentsNeeded: false,
    argumentsFormat: [],
    imageExample: 'https://cdn.discordapp.com/attachments/688182781263609868/693831187864617000/unknown.png'
  }

  return helpEmbed(message, i18n, Options)
}
