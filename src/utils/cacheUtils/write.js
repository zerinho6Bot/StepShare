/**
 * Writes in a cache file.
 * @param {String} file - One of the files listed on cache/index.js
 * @param {Object} content - The content that'll be writen to the file.
 * @returns {Boolean} - If the action had success.
 */
exports.write = (file, content) => {
  const CacheUtils = require('./index.js')
  const Files = CacheUtils.getFiles()
  const Path = require('path')

  if (!Files.includes(file)) {
    StepLog.info(`${file} does not exist on cache directory, files that exist: ${Files.join(', ')}`)
    return false
  }

  const Fs = require('fs')
  Fs.writeFile(Path.join(__dirname, `../../cache/${file}.json`), JSON.stringify(content, null, 2), (e) => {
    StepLog.info(`Trying to get file ${file}`)
    if (e) {
      StepLog.warn(`Couldn't get file, error: ${e.toString()}`)
      return
    }

    try {
      StepLog.info('Trying to delete file cache.')
      Object.keys(require.cache[require.resolve(Path.join(__dirname, `../../cache/${file}.json`))]).forEach((key) => { delete require.cache[key] })
      // delete require.cache[require.resolve(Path.join(__dirname, `../../cache/${file}.json`))]
    } catch (e) {
      StepLog.warn(`"Could clear cache, error: ${e.toString()}`)
    }
  })
  return true
}
