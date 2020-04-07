const { ChartsManager } = require('../utils/chartsUtils/index.js')
exports.run = async (bot, env) => {
  const Activity = `My prefix is ${env.PREFIX}`
  StepLog.info('System ON.')
  bot.user.setActivity(Activity).then(() => {
    console.log(`Activity is now: "${Activity}"`)
  })

  try {
    const ChartsApi = new ChartsManager()
    StepLog.info('Started charts api, updating charts')
    await ChartsApi.updateCharts()
    StepLog.info('Charts updated!')
  } catch (e) {
    StepLog.warn(`Google API error: ${e}`)
  }
}
