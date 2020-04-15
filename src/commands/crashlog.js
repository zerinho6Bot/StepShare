exports.condition = ({ message, Send }) => {
  if (!message.attachments.size >= 1) {
    Send('Crashlog_errorNoAttachment')
    return false
  }

  const Attachment = message.attachments.first()

  if (!Attachment) {
    Send('Crashlog_errorAttachmentNotDetected')
    return false
  }

  return true
}

function includesFromArray (strCheck, strArr) {
  for (let i = 0; i < strArr.length; i++) {
    if (strCheck.includes(strArr[i])) {
      return true
    }
  }

  return false
}

const Download = require('download')
const { pageMessage } = require('../utils/messageUtils/index.js')
exports.run = async ({ message, Send }) => {
  const Attachment = message.attachments.first()
  try {
    const FileStream = await Download(Attachment.url)
    const Content = FileStream.toString('utf8')
    const Arr = Content.split('\n')
    const ReplyArr = []
    const ImportantLines = [
      'StepMania5.3-git', 'Compiled 2020',
      'Memory:', 'Video driver:',
      'Drive:', 'WaveOut software',
      'Sound driver:', 'Last seen video driver:',
      'Card matches', 'Video renderers:',
      'Renderer Found By SDL:',
      'Outfox Engine:', 'Graphics Manager:',
      'WARNING:', 'Current renderer:',
      'Theme:'
    ]
    for (let i = 0; i < Arr.length; i++) {
      let usefulContent = Arr[i].split(' ')
      usefulContent.slice(0, 1)

      usefulContent = usefulContent.join(' ')
      if (includesFromArray(usefulContent, ImportantLines)) {
        ReplyArr.push(usefulContent)
      }
    }

    const { pagination } = require('../utils/messageUtils/index.js')
    const Pages = pagination(ReplyArr, true, 1994)
    if (ReplyArr.length <= 1) {
      Send('Crashlog_errorNoContent')
      return
    }

    const SentMessage = await Send(`\`\`\`${Pages[0]}\`\`\``, true)
    const ReactFilter = (reaction, user) => !user.bot && user.id === message.author.id
    const Emotes = {
      right: {
        id: '434489417957376013',
        name: 'rightarrow'
      },
      left: {
        id: '434489301963898882',
        name: 'leftarrow'
      }
    }
    const Time = 60000 * 4

    if (Pages.length > 1) {
      pageMessage(SentMessage, ReactFilter, Pages, Emotes, { time: Time, codeblock: true })
    }
  } catch (e) {
    Send('Crashlog_errorCouldntDownload', false, { error: e.toString() })
  }
}

exports.helpEmbed = ({ message, helpEmbed, i18n }) => {
  const Options = {
    argumentsLength: 0,
    argumentsNeeded: false,
    argumentsFormat: [],
    imageExample: 'https://cdn.discordapp.com/attachments/696881817453592577/699813817038929961/unknown.png'
  }

  return helpEmbed(message, i18n, Options)
}
