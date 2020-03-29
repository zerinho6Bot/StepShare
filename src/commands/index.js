exports.avatar = require('./avatar.js')
exports.chart = require('./chart.js')
exports.pack = require('./pack.js')
exports.author = require('./author.js')
exports.version = require('./version.js')
exports.help = require('./help.js')
exports.language = require('./language.js')

// Should not be included in help.
exports.chartdealer = require('./chartdealer.js')
//

exports.advanced = {
  ChartCategory: ['chart', 'pack', 'author', 'version'],
  MiscCategory: ['avatar', 'help', 'language']
}
exports.commandNames = [
  'avatar', 'chart',
  'pack', 'author',
  'version', 'help',
  'language'
]
