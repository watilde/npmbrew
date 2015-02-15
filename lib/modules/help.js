var path = require("path")
var table = require("text-table")
var pkg = require("../config").pkg

module.exports = function () {
  var message = "", commands = []
  message += "\n"
  message += "Usage: npmbrew <command>\n"
  commands.push(["help", "Output help information"])
  commands.push(["install <version>", "Install the version passed"])
  commands.push(["ls", "List versions currently installed"])
  commands.push(["ls-remote", "List registry versions"])
  commands.push(["uninstall <version>", "Delete the install for <version>"])
  commands.push(["use <version>", "Use <version>"])

  console.log(message)
  console.log("Commands:\n" + table(commands) + "\n")
  console.log("npmbrew@" + pkg.version + " " + path.join(__dirname, "../.."))
}
