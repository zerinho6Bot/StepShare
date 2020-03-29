const Commands = require('./index.js')
exports.run = ({ ArgsManager, FastEmbed, i18n, Send, message }) => {
  if (!ArgsManager.Argument) {
    const Advanced = Commands.advanced
    const AdvancedKeys = Object.keys(Advanced)
    for (let i = 0; i < AdvancedKeys.length; i++) {
      const Value = Advanced[AdvancedKeys[i]]
      FastEmbed.addField(`**${i18n.__(`Help_${AdvancedKeys[i]}`)}** (${Value.length})`, `\`\`${Value.join('``, ``')}\`\``)
    }
    Send(FastEmbed, true)
    return
  }

  const CommandNames = Commands.commandNames
  const FixedArgument = ArgsManager.Argument[0].toLowerCase()
  if (!CommandNames.includes(FixedArgument)) {
    Send('Message_errorCommandDoesntExist')
    return
  }

  if (!Commands[FixedArgument].helpEmbed) {
    Send('Help_errorNoHelpEmbed')
    return
  }
  const { helpEmbedFactory } = require('../utils/messageUtils/index.js')
  Send(Commands[FixedArgument].helpEmbed({ ArgsManager, FastEmbed, i18n, Send, message, helpEmbed: helpEmbedFactory }))
}

exports.helpEmbed = ({ message, helpEmbed, i18n }) => {
  const Options = {
    argumentsLength: 1,
    argumentsNeeded: false,
    argumentsFormat: [i18n.__('Help_commandName')],
    imageExample: 'https://cdn.discordapp.com/attachments/688182781263609868/693823076735123456/unknown.png'
  }

  return helpEmbed(message, i18n, Options)
}
