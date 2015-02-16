var fs = require("fs")
var dirname = require("../config").dirname

module.exports = function () {
  var list = ""
  var files = []
  var exists = fs.existsSync(dirname.npm)
  if (!exists) fs.mkdirSync(dirname.npm)
  files = fs.readdirSync(dirname.npm)
  files = files.filter(function (item) {
    return (item.match(/^\./) === null)
  })
  list = files.join("\n")

  exists = fs.existsSync(dirname.current)
  if (exists) {
    var current = "v" + require(dirname.current + "/package.json").version
    list += "\n"
    list += "\u001b[35m"
    list += "current: " + current
    list += "\u001b[0m"
  }
  if (list === "") list = "List is empty now.\n"

  console.log(list)
}
