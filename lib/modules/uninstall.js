var fs = require("fs")
var path = require("path")
var dirname = require("../config").dirname
var rmrf = require("../util").rmrf

module.exports = function (version) {
  if (version.substring(0, 1) !== "v") version = "v" + version
  var exists = fs.existsSync(dirname.current)
  if (exists) {
    var current = "v" + require(dirname.current + "/package.json").version
    if (version === current) fs.unlinkSync(dirname.current)
  }
  rmrf(path.join(dirname.npm, version))
  console.log(version + " uninstalled")
}
