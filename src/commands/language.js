const { CacheUtils, LanguageUtils } = require('../utils/index.js')
const { guildData } = require('../cache/index.js')

exports.condition = ({ ArgsManager, FastEmbed, Send, message, i18n }) => {
  if (!message.guild.member(message.author.id).hasPermission('MANAGE_GUILD')) {
    Send('Global_errorMissingPermission', false, { who: i18n.__('Global_You'), permission: 'MANAGE_GUILD' })
    return false
  }

  const AvailableLanguages = LanguageUtils.acceptableLanguages

  if (!ArgsManager.Argument) {
    FastEmbed.addField(i18n.__('Language_availableLanguages'), `\`\`${AvailableLanguages.join('``, ``')}\`\``)
    FastEmbed.setFooter(i18n.__('Language_typeLanguageToDefine'))
    Send(FastEmbed, true)
    return false
  }

  const FixedArgument = ArgsManager.Argument[0].toLowerCase()
  if (!AvailableLanguages.includes(FixedArgument)) {
    Send('Language_errorLanguageIsntAvailable')
    return false
  }

  const GuildStorage = guildData[message.guild.id]

  if (GuildStorage && GuildStorage[message.guild.id].language && guildData[message.guild.id].language === FixedArgument) {
    Send('Language_errorLanguageAlreadyDefined')
    return false
  }

  return true
}

exports.run = ({ Send, message, ArgsManager }) => {
  const GuildStorage = guildData[message.guild.id]
  const FixedArgument = ArgsManager.Argument[0].toLowerCase()

  if (FixedArgument === LanguageUtils.fallbackLanguage && GuildStorage && GuildStorage.language) {
    if (Object.keys(GuildStorage).length === 1) {
      delete guildData[message.guild.id]
    } else {
      delete guildData[message.guild.id].language
    }
  } else {
    if (!GuildStorage) {
      guildData[message.guild.id] = CacheUtils.defaultGuildProperties
    }
    guildData[message.guild.id].language = FixedArgument
  }

  try {
    CacheUtils.Write('guildData', guildData)
    Send('Language_languageDefined')
  } catch (e) {
    Send('Language_errorWhileDefingLanguage')
    StepLog.warn(`Error while defining language, error: ${e.toString()}`)
  }
}

exports.helpEmbed = ({ message, helpEmbed, i18n }) => {
  const Options = {
    argumentsLength: 1,
    argumentsNeeded: false,
    argumentsFormat: ['pt-br'],
    imageExample: 'https://cdn.discordapp.com/attachments/688182781263609868/693844940643500033/unknown.png'
  }

  return helpEmbed(message, i18n, Options)
}
