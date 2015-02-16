var child_process = require("child_process")
var fs = require("fs")
var path = require("path")
var dirname = require("../config").dirname

module.exports = function (version) {
  if (version.substring(0, 1) !== "v") version = "v" + version
  var exists = fs.existsSync(dirname.current)
  if (exists) {
    var current = "v" + require(dirname.current + "/package.json").version
    if (version === current) fs.unlinkSync(dirname.current)
  }
  var command = "rm -rf " + path.join(dirname.npm, version)
  child_process.execSync(command)
  console.log(version + " uninstalled")
}
