var fs = require("fs")
var mkdirp = require("mkdirp")
var dirname = require("../config").dirname

module.exports = function (version) {
  var exists = fs.existsSync(dirname.npm)
  var list_files = []

  if (version.substring(0, 1) !== "v") version = "v" + version
  if (!exists) mkdirp.sync(dirname.npm)

  list_files = fs.readdirSync(dirname.npm)
  list_files = list_files.filter(function (item) {
    return (item.match(/^\./) === null)
  })
  var has = list_files.indexOf(version)
  if (has === -1) {
    console.log("Version: " + version + " has not found")
    return
  }
  try {
    var lstat = fs.lstatSync(dirname.current)
    if (lstat.isSymbolicLink()) fs.unlinkSync(dirname.current)
  } catch (Exception) {}
  fs.symlinkSync(dirname.npm + "/" + version, dirname.current)
  console.log("Using " + version)
}
