const parsArgs = require('minimist')
const handleCommand = require('./handleCommand')
const handleData = require('./handleData')


const command = parsArgs(process.argv.slice(2, 3))
delete command._

handleCommand(command)