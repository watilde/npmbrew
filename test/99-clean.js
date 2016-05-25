var fs = require('fs')
var test = require('tap').test
var npmbrew = require('../lib/')
var dirname = require('../lib/config').dirname
var versions = ['2.6.1', '2.7.0']

test('last: npmbrew clean', function (t) {
  npmbrew.clean(function () {
    versions.forEach(function (version) {
      var srcFile = dirname.src + '/npm-' + version
      var npmFile = dirname.src + '/v' + version
      t.notOk(fs.existsSync(srcFile), 'v' + version + ' src file has cleaned')
      t.notOk(fs.existsSync(npmFile), 'v' + version + ' src file has cleaned')
    })
    t.end()
  })
})
