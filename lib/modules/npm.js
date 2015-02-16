var fs = require("fs")
var path = require("path")
var child_process = require("child_process")
var dirname = require("../config").dirname

module.exports = function (argv) {
  var exists = fs.existsSync(dirname.current);
  if (!exists) {
    console.log("npmbrew use <version>")
    return
  }
  var pkg = require(path.join(dirname.current, "package.json"))
  var bin = typeof pkg.bin === "string" ?
    pkg.bin : typeof pkg.bin === "object" ?
    pkg.bin.npm : false
  if (!bin) {
    console.log("There isn't bin prop in package.json for npmbrew")
    return
  }
  bin = path.join(dirname.current, pkg.bin)
  try {
    var result = child_process.execSync(bin + " " + argv, {encoding : "utf8"})
    if (result) process.stdout.write(result)
  } catch(e) {
    argv = "help"
    var result = child_process.execSync(bin + " " + argv, {encoding : "utf8"})
    if (result) process.stdout.write(result)./
  }
}
