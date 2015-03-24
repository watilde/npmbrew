var fs = require("fs")
var test = require("tap").test
var npmbrew = require("../lib/")
var dirname = require("../lib/config").dirname
var version = "2.7.0"

test("npmbrew use v2.7.0", function (t) {
  npmbrew.use(version)
  var lstat = fs.lstatSync(dirname.current.npm)
  t.ok(lstat.isSymbolicLink(), "npmbrew has current package")
  t.end()
})
