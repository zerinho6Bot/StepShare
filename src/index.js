/* globals StepLog */
'use strict'
require('dotenv').config()
const Discord = require('discord.js')
const Bot = new Discord.Client()
const Env = process.env
const Path = require('path')
global.StepLog = require('simple-node-logger').createSimpleLogger({ logFilePath: Path.join(__dirname, './cache/log.txt') })
const { Ready, Message } = require('./events/index.js')

Bot.on('message', (msg) => {
  if (!Message.condition(Bot, msg, Env)) {
    return
  }
  StepLog.info(`Message id(${msg.id}) from ${msg.author.tag} in server ${msg.guild.name}(${msg.guild.id}) with the content: ${msg.content}`)
  Message.run(Bot, Discord, Env, msg)
})

Bot.on('ready', () => {
  StepLog.trace('Firing ready event.')
  Ready.run(Bot, Env)
})
StepLog.info('Logging...')
Bot.login(Env.TOKEN)
