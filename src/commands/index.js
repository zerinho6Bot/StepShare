exports.avatar = require('./avatar.js')
exports.chart = require('./chart.js')
exports.pack = require('./pack.js')
exports.author = require('./author.js')
exports.version = require('./version.js')
exports.help = require('./help.js')
exports.language = require('./language.js')
exports.allcharts = require('./allcharts.js')
exports.updatecharts = require('./updatecharts.js')
exports.eval = require('./eval.js')
exports.crashlog = require('./crashlog.js')
exports.id = require('./id.js')
exports.random = require('./random.js')
exports.fullcrashlog = require('./fullcrashlog.js')
exports.chartlist = require('./allcharts.js')
exports.info = require('./info.js')

// Should not be included in help.
exports.chartdealer = require('./chartdealer.js')
//

exports.advanced = {
  ChartCategory: ['chart', 'pack', 'author', 'version', 'allcharts', 'chartlist', 'id', 'random'],
  MiscCategory: ['avatar', 'crashlog', 'fullcrashlog'],
  BotCategory: ['help', 'eval', 'info', 'language', 'updatecharts']
}
exports.commandNames = [
  'avatar', 'chart',
  'pack', 'author',
  'version', 'help',
  'language', 'allcharts',
  'updatecharts', 'eval',
  'crashlog', 'id',
  'random', 'fullcrashlog',
  'chartlist', 'info'
]
