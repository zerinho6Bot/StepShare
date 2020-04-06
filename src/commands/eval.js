exports.condition = ({ message, Send, ArgsManager, env }) => {
  if (message.author.id !== env.OWNER) {
    Send('Eval_errorOnlyBotOwner')
    return false
  }

  if (!ArgsManager.Argument) {
    Send('Eval_errorNoArgument')
    return false
  }

  return true
}

exports.run = async ({ message, ArgsManager, FastEmbed, i18n, bot, discord, Send }) => {
  const FullArgs = ArgsManager.Argument.join(' ')
  const Result = async () => {
    try {
      // eslint-disable-next-line no-eval
      const Result = await eval(FullArgs)
      return Result
    } catch (e) {
      return e.toString()
    }
  }

  const FinalResult = await Result()

  FastEmbed.addField(i18n.__('Eval_code'), `\`\`\`Javascript\n${FullArgs}\n\`\`\``)
  FastEmbed.addField(i18n.__('Eval_result'), FinalResult)

  Send(FastEmbed)
}

exports.helpEmbed = ({ message, helpEmbed, i18n }) => {
  const Options = {
    argumentsLength: 1,
    argumentsNeeded: true,
    argumentsFormat: ['\'Hello World\''],
    imageExample: 'https://cdn.discordapp.com/attachments/688182781263609868/696704448214335528/unknown.png'
  }

  return helpEmbed(message, i18n, Options)
}
