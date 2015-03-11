var fs = require("fs")
var dirname = require("../config").dirname
var rimraf = require("rimraf")

module.exports = function (cb) {
  cb = typeof cb === "function" ? cb : false
  rimraf.sync(dirname.src)
  rimraf.sync(dirname.npm)
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
