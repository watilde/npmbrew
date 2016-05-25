var fs = require('fs')
var path = require('path')
var spawn = require('child_process').spawn
var dirname = require('../config').dirname
var chalk = require('chalk')
var updateNotifier = require('update-notifier')
var stringLength = require('string-length')
var fill = function (str, count) {
  return Array(count + 1).join(str)
}

module.exports = function (argv, cb) {
  cb = typeof cb === 'function' ? cb : false
  argv = typeof argv === 'object' ? argv : []
  var exists = fs.existsSync(dirname.current.dir)
  if (!exists) {
    console.log('npmbrew use <version>')
    return
  }
  var pkg = require(path.join(dirname.current.npm, 'package.json'))
  var cmd = spawn(dirname.current.bin, argv)
  cmd.stdout.on('data', function (stdout) {
    process.stdout.write(stdout)
  })
  cmd.on('exit', function (code) {
    var update = updateNotifier({
      pkg: pkg
    }).update
    if (update) updateCheck(update)
    if (cb) cb(code)
  })
}

// Based on https://github.com/yeoman/update-notifier/
function updateCheck (update) {
  var line1 = ' Update available: ' + chalk.green.bold(update.latest) +
    chalk.dim(' (current: ' + update.current + ')') + ' '
  var line2 = ' Run ' + chalk.magenta('npmbrew install ' + update.latest) +
    ' to update. '
  var contentWidth = Math.max(stringLength(line1), stringLength(line2))
  var line1rest = contentWidth - stringLength(line1)
  var line2rest = contentWidth - stringLength(line2)
  var top = chalk.green('┌' + fill('─', contentWidth) + '┐')
  var bottom = chalk.green('└' + fill('─', contentWidth) + '┘')
  var side = chalk.green('│')

  var message =
    '\n\n' +
    top + '\n' +
    side + line1 + fill(' ', line1rest) + side + '\n' +
    side + line2 + fill(' ', line2rest) + side + '\n' +
    bottom + '\n'
  console.error(message)
}
