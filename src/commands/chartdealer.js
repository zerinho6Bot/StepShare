const { ChartsManager } = require('../utils/chartsUtils/index.js')
const { pagination } = require('../utils/messageUtils/index.js')
const ChartsApi = new ChartsManager()

exports.condition = () => {
  return false // No one should use this command, and the bot will directly call run.
}

exports.run = async ({ message, ArgsManager, FastEmbed, Send, i18n }, property) => {
  const Literal = ArgsManager.Flag && ArgsManager.Flag[0].toLowerCase() === '--l'
  const Chart = ChartsApi.chartsByProperty(ArgsManager.Argument.join(' '), property, Literal)
  let resolvedChart

  const ChartsStr = []

  for (let i = 0; i < Chart.length; i++) {
    const CurrentChart = Chart[i]
    ChartsStr.push(`(${CurrentChart.id}) - ${CurrentChart.name} (${CurrentChart.supports}, ${CurrentChart.author}${CurrentChart.pack === '' ? '' : `, ${CurrentChart.pack}`})`)
  }

  const PaginatedCharts = pagination(ChartsStr)
  const Time = 2
  FastEmbed.addField(i18n.__('Chartdealer_typeTheChartNumber', { time: Time, minuteWord: Time === 1 ? i18n.__('Global_minute') : i18n.__('Global_minutes') }), PaginatedCharts[0])
  FastEmbed.setFooter(`1/${PaginatedCharts.length} ${i18n.__('Global_Pages')} • ${i18n.__('Chartdealer_typeCancel', { cancel: i18n.__('Chartdealer_cancel') })}`)

  const SentMessage = await Send(FastEmbed, true)
  const Filter = (msg) => !msg.author.bot && msg.author.id === message.author.id

  if (PaginatedCharts.length > 1) {
    const ReactionFilter = (reaction, user) => user.id === message.author.id
    const Collector = SentMessage.createReactionCollector(ReactionFilter, { time: 60000 * Time })
    const MoondanceEmojis = {
      right: '434489417957376013',
      left: '434489301963898882'
    }
    let page = 0

    await SentMessage.react(MoondanceEmojis.left)
    await SentMessage.react(MoondanceEmojis.right)
    Collector.on('collect', (reaction) => {
      const EmojiName = reaction.emoji.name

      if (EmojiName === 'rightarrow') {
        if (page === PaginatedCharts.length - 1) {
          Send('Chartdealer_errorNoHigherPage')
        } else {
          page++
        }
      }

      if (EmojiName === 'leftarrow') {
        if (page === 0) {
          Send('Chartdealer_errorNoLowerPage')
        } else {
          page--
        }
      }

      FastEmbed.spliceFields(0, 1)
      FastEmbed.addField(i18n.__('Chartdealer_typeTheChartNumber', { time: Time, minuteWord: Time === 1 ? i18n.__('Global_minute') : i18n.__('Global_minutes') }), PaginatedCharts[page])
      FastEmbed.setFooter(`${page + 1}/${PaginatedCharts.length} ${i18n.__('Global_Pages')} • ${i18n.__('Chartdealer_typeCancel', { cancel: i18n.__('Chartdealer_cancel') })}`)
      SentMessage.edit(FastEmbed)
    })
  }

  try {
    const Response = await message.channel.awaitMessages(Filter, { max: 1, time: 60000 * 2, errors: ['time'] })
    const Content = Response.first().content
    const ValidNumbers = ChartsApi.propertyFromChartArray(Chart, 'id')

    if (Content.toLowerCase() === i18n.__('Chartdealer_cancel')) {
      try {
        Response.first().react('👍')
      } catch (e) {
        StepLog.warn(`Couldn't react to message, error: ${e}`)
      }
      return
    }

    if (!ValidNumbers.includes(Content)) {
      Send('Chartdealer_errorNotValidNumber')
      return
    }

    resolvedChart = ChartsApi.chartFromId(Content)
  } catch (e) {
    Send('Chartdealer_errorWaitResponse')
    StepLog.warn(`Error while waiting response from user, ${e.toString()}`)
    return
  }

  FastEmbed.setFooter(i18n.__('Chartdealer_clickTitleToDownload'))
  FastEmbed.spliceFields(0, 1)
  // FastEmbed.setAuthor(resolvedChart.author)
  FastEmbed.setTitle(resolvedChart.name)
  FastEmbed.setURL(resolvedChart.download)
  FastEmbed.setDescription(
    `${i18n.__('Chartdealer_author')}: **${resolvedChart.author}**
    ${i18n.__('Chartdealer_version')}: **${resolvedChart.supports}**
    ${i18n.__('Chartdealer_id')}: **${resolvedChart.id}**
    ${resolvedChart.pack === '' ? '' : `${i18n.__('Chartdealer_pack')}: ${resolvedChart.pack}`}`
  )
  Send(FastEmbed, true)
}
