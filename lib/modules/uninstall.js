var fs = require('fs')
var path = require('path')
var dirname = require('../config').dirname
var rimraf = require('rimraf')

module.exports = function (version) {
  if (version.substring(0, 1) !== 'v') version = 'v' + version
  var exists = fs.existsSync(dirname.current.npm)
  if (exists) {
    var current = 'v' + require(dirname.current.npm + '/package.json').version
    if (version === current) {
      fs.unlinkSync(dirname.current.npm)
      fs.unlinkSync(dirname.current.bin)
    }
  }
  rimraf.sync(path.join(dirname.npm, version))
  console.log(version + ' uninstalled')
}
