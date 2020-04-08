exports.condition = ({ message, Send }) => {
  if (!message.attachments.size >= 1) {
    Send('Attachment size is lower than 1.', true)
    return false
  }

  const Attachment = message.attachments.first()

  if (!Attachment) {
    Send('Attachment not detected.', true)
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
exports.run = async ({ message, Send }) => {
  const Attachment = message.attachments.first()
  try {
    console.log(Attachment.url)
    const FileStream = await Download(Attachment.url)
    const Content = FileStream.toString('utf8')
    const Arr = Content.split('\n')
    const ReplyArr = []
    const ImportantLines = [
      'StepMania5.3-git', 'Compiled 2020',
      'Memory:', 'Video driver:',
      'Drive:', 'WaveOut software',
      'Sound driver:', 'songs in',
      'Last seen video driver:',
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
      Send('No content', true)
      return
    }
    Send(`\`\`\`${Pages[0]}\`\`\``, true)
  } catch (e) {
    Send(`Couldn't download file, error: ${e.toString()}`, true)
  }
}
