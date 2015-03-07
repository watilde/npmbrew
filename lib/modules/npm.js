var fs = require("fs")
var path = require("path")
var exec = require("child_process").exec
var dirname = require("../config").dirname

module.exports = function (argv, cb) {
  cb = typeof cb === "function" ? cb : false
  argv = argv.length !== 0 ? argv : "help"
  var exists = fs.existsSync(dirname.current)
  if (!exists) {
    console.log("npmbrew use <version>")
    return
  }
  var pkg = require(path.join(dirname.current, "package.json"))
  var bin = typeof pkg.bin === "string"
    ? pkg.bin : typeof pkg.bin === "object"
      ? pkg.bin.npm
      : false

  if (!bin) {
    console.log("There isn't bin prop in package.json for npmbrew")
    return
  }

  bin = path.join(dirname.current, pkg.bin)
  exec(
    bin + " " + argv, {encoding : "utf8"},
    function (error, stdout) {
      if (cb) {
        cb(error, stdout)
      } else if (error) {
        console.log(error)
      } else {
        process.stdout.write(stdout)
      }
    }
  )
}
