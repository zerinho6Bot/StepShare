/**
 * Retuns a object with the Args with their categories.
 * @param  {Object} message
 * @param  {String} prefix - The bot prefix.
 * @returns {Object}
 */
exports.ArgsManager = (message, prefix) => {
  const Args = message.content.split(' ')
  const DetectedArgs = {}
  const PushAgr = (argType, value) => {
    if (DetectedArgs[argType]) {
      DetectedArgs[argType].push(value)
      return
    }
    DetectedArgs[argType] = [value]
  }

  /*
  const ArgsForFullArgument = message.content.split(' ').splice(0, 1)

  for (let i = 0; i < ArgsForFullArgument.length; i++) {
    const Current = ArgsForFullArgument[i]

    if (!Current.startsWith('--')) {
      continue
    }
    ArgsForFullArgument.splice(i, 1)
  }

  PushAgr('FullArgument', ArgsForFullArgument.join(' '))
  */
  for (let i = 0; i < Args.length; i++) {
    const Current = Args[i]

    if (Current.toLowerCase().startsWith(prefix)) {
      PushAgr('CommandCaller', Current.toLowerCase())

      const UnsafeCommandName = Current.substring(prefix.length).toLowerCase()
      if (UnsafeCommandName.length === 0) {
        continue
      }
      PushAgr('CommandName', UnsafeCommandName) // Don't worry, it's safe here.
      continue
    }

    if (Current.startsWith('--') && Current.substring(2).length >= 1) {
      PushAgr('Flag', Current.toLowerCase())
      continue
    }

    if (Current.length >= 16 && Current.length <= 18 && !isNaN(Current)) {
      PushAgr('Id', Current)
      continue
    }

    PushAgr('Argument', Current)
  }

  return DetectedArgs
}
