var fs = require("fs")
var test = require("tap").test
var npmbrew = require("../lib/")
var dirname = require("../lib/config").dirname
var version = "2.6.1"

test("npmbrew uninstall v2.6.1", function (t) {
  npmbrew.uninstall(version)
  var npmFile = dirname.src + "/v" + version
  t.notOk(fs.existsSync(npmFile), "v" + version + " src file has uninstalled")
  t.end()
})
