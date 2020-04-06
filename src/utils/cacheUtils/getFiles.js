const Cache = require('../../cache/index.js')

/**
 * Retuns the files listed on cache/index.js
 * @function
 * @returns {Array<String>}
 */
module.exports.getFiles = () => {
  const Files = Object.keys(Cache)
  StepLog.info(`Getting files: ${Files.join(', ')}`)
  return Files
}
