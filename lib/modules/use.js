var fs = require('fs')
var mkdirp = require('mkdirp')
var dirname = require('../config').dirname

module.exports = function (version) {
  var exists = fs.existsSync(dirname.npm)
  var files = []

  if (version.substring(0, 1) !== 'v') version = 'v' + version
  if (!exists) mkdirp.sync(dirname.npm)

  files = fs.readdirSync(dirname.npm)
  files = files.filter(function (item) {
    return (item.match(/^\./) === null)
  })
  var has = files.indexOf(version)
  if (has === -1) {
    console.log('Version: ' + version + ' has not found')
    return
  }
  var lstat
  try {
    exists = fs.existsSync(dirname.current.bindir)
    if (!exists) mkdirp.sync(dirname.current.bindir)
    lstat = fs.lstatSync(dirname.current.npm)
    if (lstat.isSymbolicLink()) fs.unlinkSync(dirname.current.npm)
    lstat = fs.lstatSync(dirname.current.bin)
    if (lstat.isSymbolicLink()) fs.unlinkSync(dirname.current.bin)
  } catch (Exception) {}
  fs.symlinkSync(dirname.npm + '/' + version, dirname.current.npm)
  fs.symlinkSync(dirname.current.npm + '/bin/npm-cli.js', dirname.current.bin)
  console.log('Using ' + version)
}
