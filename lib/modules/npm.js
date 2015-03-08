var fs = require("fs")
var path = require("path")
var spawn = require("child_process").spawn
var dirname = require("../config").dirname

module.exports = function (argv, cb) {
  cb = typeof cb === "function" ? cb : false
  argv = typeof argv === "object" ? argv : []
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
  var cmd = spawn(bin, argv)
  cmd.stdout.on("data", function (stdout) {
    process.stdout.write(stdout)
  })
  cmd.on("exit", function (code) {
    if (cb) cb(code)
  })
}
