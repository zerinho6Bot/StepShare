const { guildData } = require('../cache/index.js')
const { isOnGuild, Write } = require('../utils/cacheUtils/index.js')
exports.run = async (bot, env) => {
  const Guilds = Object.keys(guildData)
  let needsUpdate = false
  for (let i = 0; i < Guilds.length; i++) {
    if (isOnGuild(bot, Guilds[i])) {
      continue
    }
    StepLog.warn(`Bot isn't on guild: ${Guilds[i]} anymore, deleting data.`)
    delete guildData[Guilds[i]]
    needsUpdate = true
  }

  if (needsUpdate) {
    Write('guildConfig', guildData)
  }

  StepLog.info('System ON.')

  if (env.API_CALL_BOOT !== 'false') {
    try {
      const { ChartsManager } = require('../utils/chartsUtils/index.js')
      const ChartsApi = new ChartsManager()
      StepLog.info('Started charts api, updating charts')
      await ChartsApi.updateCharts()
      StepLog.info('Charts updated!')
    } catch (e) {
      StepLog.warn(`Google API error: ${e}`)
    }
  }

  if (env.SET_ACTIVITY !== 'false') {
    const Activity = `My prefix is "${env.PREFIX}"`
    bot.user.setActivity(Activity).then(() => {
      console.log(`Activity is now: "${Activity}"`)
    })
  }
}
