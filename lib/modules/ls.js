var fs = require("fs")
var mkdirp = require("mkdirp")
var dirname = require("../config").dirname

module.exports = function () {
  var list = ""
  var files = []
  var exists = fs.existsSync(dirname.npm)
  if (!exists) mkdirp.sync(dirname.npm)
  files = fs.readdirSync(dirname.npm)
  files = files.filter(function (item) {
    return (item.match(/^\./) === null)
  })
  list = files.join("\n")

  exists = fs.existsSync(dirname.current.npm)
  if (exists) {
    var current = "v" + require(dirname.current.npm + "/package.json").version
    list += "\n\n"
    list += "\u001b[35m"
    list += "current: " + current
    list += "\u001b[0m"
  }
  if (list === "") list = "List is empty now."

  console.log(list)
}
