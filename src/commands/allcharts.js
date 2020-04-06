exports.run = async ({ ArgsManager, Send, FastEmbed, i18n, message }) => {
  ArgsManager.Argument = []
  ArgsManager.Argument[0] = ''
  require('./index.js').chartdealer.run({ message, ArgsManager, FastEmbed, Send, i18n })
}

exports.helpEmbed = ({ message, helpEmbed, i18n }) => {
  const Options = {
    argumentsLength: 0,
    argumentsNeeded: false,
    argumentsFormat: [],
    imageExample: 'https://cdn.discordapp.com/attachments/688182781263609868/696693494332522536/unknown.png'
  }

  return helpEmbed(message, i18n, Options)
}
