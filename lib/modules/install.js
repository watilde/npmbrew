var fs = require("fs")
var http = require("http")
var path = require("path")
var url = require("../config").url
var dirname = require("../config").dirname

module.exports = function (version) {
  if (version.substring(0, 1) !== "v") version = "v" + version
  var exists = fs.existsSync(path.join(dirname.src, version))
  if (exists) {
    console.log(version +' is already installed.\n')
    return
  }
}
