var path = require("path")
var table = require("text-table")
var pkg = require("../config").pkg

module.exports = function () {
  var message = "", cmds = []
  message += "\n"
  message += "Usage: npmbrew <command>\n"
  cmds.push(["clean", "Delete all installed sources"])
  cmds.push(["help", "Output help information"])
  cmds.push(["install <version>", "Install the version passed"])
  cmds.push(["ls", "List versions currently installed"])
  cmds.push(["ls-remote", "List registry versions"])
  cmds.push(["npm", "An alias of npm <command>"])
  cmds.push(["uninstall <version>", "Delete the install for <version>"])
  cmds.push(["use <version>", "Use <version>"])

  console.log(message)
  console.log("Commands:\n" + table(cmds) + "\n")
  console.log("npmbrew@" + pkg.version + " " + path.join(__dirname, "../.."))
}
