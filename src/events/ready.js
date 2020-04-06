const { ChartsManager } = require('../utils/chartsUtils/index.js')
exports.run = async () => {
  StepLog.info('System ON.')
  const ChartsApi = new ChartsManager()
  StepLog.info('Started charts api, updating charts')
  await ChartsApi.updateCharts()
  StepLog.info('Charts updated!')
}
