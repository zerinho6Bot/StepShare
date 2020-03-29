exports.run = ({ Send, FastEmbed, message }) => {
  FastEmbed.setImage(message.author.displayAvatarURL({ size: 2048 }))
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
