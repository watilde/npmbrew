var fs = require("fs")
var dirname = require("../config").dirname
var rimraf = require("rimraf")

module.exports = function (cb) {
  cb = typeof cb === "function" ? cb : false
  rimraf.sync(dirname.src)
  rimraf.sync(dirname.npm)
  var lstat
  try {
    lstat = fs.lstatSync(dirname.current.npm)
    if (lstat.isSymbolicLink()) fs.unlinkSync(dirname.current.npm)
    lstat = fs.lstatSync(dirname.current.bin)
    if (lstat.isSymbolicLink()) fs.unlinkSync(dirname.current.bin)
  } catch (Exception) {}
  if (cb) {
    cb(null)
  } else {
    console.log("\nDone")
  }
}
