const { guildData } = require('../cache/index.js')
const { MessageUtils, LanguageUtils } = require('../utils/index.js')
const Commands = require('../commands/index.js')

exports.condition = (bot, message, env) => {
  if (message.author.bot || !message.content.toLowerCase().startsWith(env.PREFIX) || message.channel.type !== 'text' || !message.channel.permissionsFor(bot.user.id).has('SEND_MESSAGES')) {
    return false
  }

  const GuildDefinedLanguage = guildData[message.guild.id] && guildData[message.guild.id].language ? guildData[message.guild.id].language : ''
  const Send = MessageUtils.ConfigSender(message.channel, LanguageUtils.init(GuildDefinedLanguage === '' ? LanguageUtils.fallbackLanguage : GuildDefinedLanguage))

  if (!message.channel.permissionsFor(bot.user.id).has('EMBED_LINKS')) {
    Send('Message_errorMissingEmbedLinks')
    return false
  }

  const ArgsManager = MessageUtils.argsManager(message, env.PREFIX)

  if (!ArgsManager.CommandName) {
    Send('Message_errorMissingCommandName')
    return false
  }

  if (!Object.keys(Commands).includes(ArgsManager.CommandName[0])) {
    StepLog.info(`${message.author.id} tried to execute a command that doesn't exist, command: ${ArgsManager.CommandName[0]}`)
    Send('Message_errorCommandDoesntExist')
    return
  }

  if (message.author.id !== env.OWNER) {
    const UserCooldown = MessageUtils.applyCooldown(message.author.id)

    if (UserCooldown > 0) {
      if (UserCooldown === 4) {
        Send('Message_errorCooldownWarning', false, { amount: 3 })
      }
      return
    }
  }

  return true
}

exports.run = async (bot, discord, env, message) => {
  const GuildDefinedLanguage = guildData[message.guild.id] && guildData[message.guild.id].language ? guildData[message.guild.id].language : ''
  const I18n = await LanguageUtils.init(GuildDefinedLanguage === '' ? LanguageUtils.fallbackLanguage : GuildDefinedLanguage)
  const Send = MessageUtils.ConfigSender(message.channel, I18n)
  const ArgsManager = MessageUtils.argsManager(message, env.PREFIX)
  const FastEmbed = MessageUtils.FastEmbed(message)
  const Arguments = {
    message,
    bot,
    discord,
    env,
    i18n: I18n,
    Send,
    FastEmbed,
    ArgsManager
  }
  const Command = Commands[ArgsManager.CommandName[0]]
  if (ArgsManager.Flag && ArgsManager.Flag.includes('--d')) {
    try {
      Send(JSON.stringify(ArgsManager, null, 2), true)
    } catch (e) {
      StepLog.warn(`Couldn't send ArgsManager, error: ${e}`)
    }
  }
  if (Command.condition) {
    try {
      const Condition = await Command.condition(Arguments)

      if (!Condition) {
        StepLog.info(`Failed condition for command ${ArgsManager.CommandName[0]}`)
        return
      }
    } catch (e) {
      StepLog.warn(`Error while running condition on command ${ArgsManager.CommandName[0]}, error: ${e}`)
    }
  }

  StepLog.info(`User ${message.author.id} executed command ${ArgsManager.CommandName[0]}`)
  try {
    Command.run(Arguments)
  } catch (e) {
    StepLog.warn(`Error while trying to run command ${ArgsManager.CommandName[0]}, error : ${e}`)
  }
}
