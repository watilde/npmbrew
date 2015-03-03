var fs = require("fs")
var dirname = require("../config").dirname
var rmrf = require("../util").rmrf

module.exports = function (cb) {
  cb = typeof cb === "function" ? cb : false
  rmrf(dirname.src)
  rmrf(dirname.npm)
  try {
    var lstat = fs.lstatSync(dirname.current)
    if (lstat.isSymbolicLink()) fs.unlinkSync(dirname.current)
  } catch (Exception) {}
  if (cb) {
    cb(null)
  } else {
    console.log("\nDone")
  }
}
